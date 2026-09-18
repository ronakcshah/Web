import type { SDKAgent } from "@cursor/sdk";
import type { Finding } from "./types.js";

export async function draftCommitMessage(
  agent: SDKAgent,
  finding: Finding,
): Promise<string> {
  const run = await agent.send(`Write a concise conventional-commit-style message for the fix you just proposed. Do not apply the fix.

Format:
- A type prefix such as fix: or chore:
- A short summary line under about 70 characters
- A body line referencing which modernization standard this addresses: ${finding.standard}

Return only the commit message text.`);

  const result = await run.wait();
  return (
    result.result ??
    `fix: ${finding.title}\n\nAddresses modernization standard: ${finding.standard}`
  );
}
