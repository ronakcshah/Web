/// <reference types="node" />
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import type { AgentReport } from "./types.js";

export async function requestApproval(report: AgentReport): Promise<boolean> {
  console.log(`Agent: ${report.agentName}`);
  console.log(report.summary);

  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question("Approve this change? (y/n) ");
    return answer.trim().toLowerCase() === "y";
  } finally {
    rl.close();
  }
}
