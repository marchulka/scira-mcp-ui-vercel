// /api/run.ts — в проекте model-context-protocol-mcp-with-vercel-functions

export default async function handler(req, res) {
  const { tool } = req.body;

  if (tool === "terraform_snapshot") {
    return res.status(200).json({ status: "Terraform snapshot executed (stub)" });
  }

  return res.status(400).json({ error: "Unknown tool" });
}
