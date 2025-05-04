import { NextApiRequest, NextApiResponse } from 'next';
import runTerraformSnapshot from '../../tools/terraform_snapshot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tool } = req.query;
  if (tool === "terraform_snapshot") {
    const result = await runTerraformSnapshot();
    return res.status(200).json(result);
  }
  return res.status(404).json({ error: "Tool not found" });
}