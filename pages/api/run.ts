export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tool } = req.body;

  if (tool === "terraform_snapshot") {
    return res.status(200).json({ status: "Terraform snapshot executed (stub)" });
  }

  return res.status(400).json({ error: "Unknown tool" });
}
