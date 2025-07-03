import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerEmiTool(server: McpServer) {
  server.tool(
    "emi",
    "Calculate EMI for a loan",
    {
      principal: z.number().describe("Principal amount"),
      interest: z.number().describe("Interest rate"),
      tenure: z.number().describe("Tenure in months"),
    },
    async ({ principal, interest, tenure }) => {
      const emi =
        (principal * interest * Math.pow(1 + interest, tenure)) /
        (Math.pow(1 + interest, tenure) - 1);
      const totalAmount = emi * tenure;
      const totalInterest = totalAmount - principal;
      return {
        content: [
          {
            type: "text" as const,
            text: `EMI: ${emi}, Total Amount: ${totalAmount}, Total Interest: ${totalInterest}`,
          },
        ],
      };
    }
  );
}
