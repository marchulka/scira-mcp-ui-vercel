import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tool } = req.query;

  try {
    const response = await fetch(`https://scira-mcp-chat-production-2904.up.railway.app/api/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tool })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to connect to external MCP",
      details: error.message
    });
  }
}
