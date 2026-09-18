/// <reference types="node" />
import { Board } from "./board.js";
import { runScanAgent } from "./scanAgent.js";
import { runFixAgent } from "./fixAgent.js";
import { draftCommitMessage } from "./commitMessageAgent.js";
import { requestApproval } from "./approvalGate.js";

async function main(): Promise<void> {
  if (!process.env.CURSOR_API_KEY) {
    console.error("CURSOR_API_KEY is not set in this shell.");
    process.exit(1);
  }

  const board = new Board();
  const findings = await runScanAgent(board);

  if (findings.length === 0) {
    console.log("The codebase is compliant with all documented standards.");
    return;
  }

  for (const finding of findings) {
    board.update({
      agentName: `fix-agent:${finding.id}`,
      status: "pending",
      summary: `Waiting to propose a fix for ${finding.title}.`,
    });
  }

  const results = await Promise.all(
    findings.map(async (finding) => {
      const { report, agent } = await runFixAgent(finding, board);
      return { report, agent, finding };
    }),
  );

  for (const { report, agent, finding } of results) {
    try {
      const approved = await requestApproval(report);
      if (approved) {
        const commitMessage = await draftCommitMessage(agent, finding);
        console.log(commitMessage);
        board.update({
          agentName: report.agentName,
          status: "done",
          summary: "Fix approved.",
        });
      } else {
        board.update({
          agentName: report.agentName,
          status: "failed",
          summary: "Fix rejected",
        });
      }
    } finally {
      agent.close();
    }
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
