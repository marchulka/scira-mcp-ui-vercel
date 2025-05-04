import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tool } = req.query;

  try {
    const response = await fetch(`https://model-context-protocol-mcp-with-vercel-functions-gules-ten.vercel.app/api/run?tool=${tool}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to connect to external MCP",
      details: error.message
    });
  }
}