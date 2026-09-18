import type { AgentReport } from "./types.js";

export class Board {
  private readonly reports = new Map<string, AgentReport>();

  update(report: AgentReport): void {
    this.reports.set(report.agentName, report);
    this.print();
  }

  private print(): void {
    const rows = [...this.reports.values()];
    const nameWidth = Math.max(10, ...rows.map((r) => r.agentName.length));
    const statusWidth = Math.max(8, ...rows.map((r) => r.status.length));

    const header =
      "Agent".padEnd(nameWidth) +
      "  " +
      "Status".padEnd(statusWidth) +
      "  Summary";
    const divider = "-".repeat(header.length);

    console.log("");
    console.log(header);
    console.log(divider);
    for (const report of rows) {
      console.log(
        report.agentName.padEnd(nameWidth) +
          "  " +
          report.status.padEnd(statusWidth) +
          "  " +
          report.summary,
      );
    }
    console.log("");
  }
}
