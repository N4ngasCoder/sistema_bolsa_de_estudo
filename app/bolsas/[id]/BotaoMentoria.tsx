"use client";

import { useState } from "react";

export default function BotaoMentoria({ mentoriaId }: { mentoriaId: string }) {
  const [aCarregar, setACarregar] = useState(false);
  const [erro, setErro] = useState("");

  async function pedir() {
    setErro("");
    setACarregar(true);
    try {
      const res = await fetch("/api/solicitar-mentoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentoriaId }),
      });
      const dados = await res.json();
      // Só vai para o WhatsApp se a solicitação foi GRAVADA com sucesso.
      if (!res.ok || !dados.ok || !dados.whatsappUrl) {
        setErro(dados.erro ?? "Não foi possível registar. Não foste redirecionado.");
        return;
      }
      window.location.href = dados.whatsappUrl;
    } catch {
      setErro("Erro de ligação. A solicitação não foi registada.");
    } finally {
      setACarregar(false);
    }
  }

  return (
    <div>
      <button onClick={pedir} disabled={aCarregar} className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white disabled:opacity-60">
        {aCarregar ? "A registar..." : "Quero Mentoria Paga desta Bolsa"}
      </button>
      {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
    </div>
  );
}
