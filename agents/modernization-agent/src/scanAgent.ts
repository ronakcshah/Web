/// <reference types="node" />
import { Agent } from "@cursor/sdk";
import * as path from "node:path";
import { readFile } from "node:fs/promises";
import type { Finding } from "./types.js";
import type { Board } from "./board.js";

const AGENT_NAME = "scan-agent";

export async function runScanAgent(board: Board): Promise<Finding[]> {
  const repoRoot = path.resolve(process.cwd(), "..", "..");
  const findingsPath = path.resolve(process.cwd(), "findings.json");

  board.update({
    agentName: AGENT_NAME,
    status: "running",
    summary: "Auditing the codebase against modernization standards.",
  });

  await using agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: { cwd: repoRoot },
  });

  const run = await agent.send(`Read docs/MODERNIZATION_STANDARDS.md.

Audit the actual codebase against each numbered standard:
- Java / Spring Boot under src/main/java (and tests under src/test/java where the standard applies)
- Angular under web/src/app

Write any violations as a JSON array to agents/modernization-agent/findings.json (relative to the repository root). Each finding must use this shape:
{
  "id": string,
  "title": string,
  "filePath": string,
  "description": string,
  "severity": "low" | "medium" | "high",
  "standard": string
}

Do not invent findings for standards that are actually complied with.
Do not fix anything yet. Only write the findings file.
If there are no violations, write an empty JSON array [].`);

  const result = await run.wait();
  if (result.status !== "finished") {
    board.update({
      agentName: AGENT_NAME,
      status: "failed",
      summary: `Scan run ended with status ${result.status}.`,
    });
    return [];
  }

  try {
    const raw = await readFile(findingsPath, "utf8");
    const findings = JSON.parse(raw) as Finding[];
    if (!Array.isArray(findings)) {
      throw new Error("findings.json is not a JSON array");
    }
    board.update({
      agentName: AGENT_NAME,
      status: "done",
      summary: `Found ${findings.length} finding(s).`,
    });
    return findings;
  } catch {
    board.update({
      agentName: AGENT_NAME,
      status: "failed",
      summary: "Could not read or parse findings.json.",
    });
    return [];
  }
}
