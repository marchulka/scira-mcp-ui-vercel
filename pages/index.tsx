import React, { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState("Нажми кнопку для запуска terraform_snapshot");

  const handleClick = async () => {
    const res = await fetch("/api/run?tool=terraform_snapshot");
    const data = await res.json();
    setOutput(data.message || JSON.stringify(data));
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🚀 Scira MCP UI (Vercel Edition)</h1>
      <p>Управляй инфраструктурой с одной кнопки</p>
      <button onClick={handleClick}>📦 Запустить terraform_snapshot</button>
      <pre>{output}</pre>
    </div>
  );
}