export interface Finding {
  id: string;
  title: string;
  filePath: string;
  description: string;
  severity: "low" | "medium" | "high";
  standard: string;
}

export type AgentStatus =
  | "pending"
  | "running"
  | "awaiting-approval"
  | "done"
  | "failed";

export interface AgentReport {
  agentName: string;
  status: AgentStatus;
  summary: string;
}
