import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");

  const runSnapshot = async () => {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tool: "terraform_snapshot" }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🧠 Scira MCP UI (Vercel Edition)</h1>
      <p>Управляй инфраструктурой с одной кнопки</p>
      <button onClick={runSnapshot}>📦 Запустить terraform_snapshot</button>
      <pre>{result}</pre>
    </div>
  );
}
