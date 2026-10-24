"use client";

export default function BotaoSair() {
  async function sair() {
    await fetch("/api/sair", { method: "POST" });
    window.location.href = "/";
  }
  return <button onClick={sair} className="text-red-600">Sair</button>;
}
