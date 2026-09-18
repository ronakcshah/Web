/// <reference types="node" />
import * as path from "node:path";
import { Agent, CursorAgentError } from "@cursor/sdk";

const apiKey = process.env.CURSOR_API_KEY;
if (!apiKey) {
  console.error("CURSOR_API_KEY is not set in this shell.");
  process.exit(1);
}

const cwd = path.resolve(process.cwd(), "..", "..");
console.log("Starting local agent in", cwd);

try {
  await using agent = await Agent.create({
    apiKey,
    model: { id: "composer-2.5" },
    local: { cwd },
  });

  console.log("Agent id:", agent.agentId);

  const run = await agent.send(
    "In one sentence, what does this repository do? Use the README and source files.",
  );
  console.log("Run id:", run.id);

  const result = await run.wait();
  console.log("Status:", result.status);
  console.log("Result:", result.result);
} catch (err) {
  if (err instanceof CursorAgentError) {
    console.error("Startup failed:", err.message, "retryable=", err.isRetryable);
    process.exit(1);
  }
  throw err;
}
