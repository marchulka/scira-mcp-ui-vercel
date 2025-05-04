// tools/terraform_snapshot.ts

export default async function run() {
  const response = await fetch("https://model-context-protocol-mcp-with-vercel-functions.vercel.app/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tool: "terraform_snapshot" }),
  });

  const result = await response.json();
  return JSON.stringify(result, null, 2);
}
