/// <reference types="node" />
import { Agent, type SDKAgent } from "@cursor/sdk";
import * as path from "node:path";
import type { AgentReport, Finding } from "./types.js";
import type { Board } from "./board.js";

export async function runFixAgent(
  finding: Finding,
  board: Board,
): Promise<{ report: AgentReport; agent: SDKAgent }> {
  const repoRoot = path.resolve(process.cwd(), "..", "..");
  const agentName = `fix-agent:${finding.id}`;

  board.update({
    agentName,
    status: "running",
    summary: `Proposing a fix for ${finding.title}.`,
  });

  // Keep the agent alive after this function returns so the caller can send a
  // follow-up. `await using` would call SDKAgent[Symbol.asyncDispose]() at
  // scope exit; use a plain create() and let the caller close() later.
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: { cwd: repoRoot },
  });

  const run = await agent.send(`A modernization finding needs a proposed fix. Do not apply any change yet — only propose it.

Finding:
- id: ${finding.id}
- title: ${finding.title}
- filePath: ${finding.filePath}
- standard: ${finding.standard}
- severity: ${finding.severity}
- description: ${finding.description}

Propose a minimal, correct fix:
1. A short paragraph explaining the fix.
2. The exact change (file path and the code to add/replace).`);

  const result = await run.wait();
  const summary =
    result.result ?? `Proposed a fix for ${finding.title} (${finding.filePath}).`;

  const report: AgentReport = {
    agentName,
    status: "awaiting-approval",
    summary,
  };
  board.update(report);

  return { report, agent };
}
