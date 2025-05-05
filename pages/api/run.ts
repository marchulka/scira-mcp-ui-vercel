import type { NextApiRequest, NextApiResponse } from "next";
import terraform_snapshot from "../../tools/terraform_snapshot";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { tool } = req.body;

  if (tool === "terraform_snapshot") {
    const result = await terraform_snapshot();
    res.status(200).json(result);
    return;
  }

  res.status(400).json({ error: "Unknown tool" });
}
