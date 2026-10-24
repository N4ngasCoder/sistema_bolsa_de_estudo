"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACAO_SEGUINTE, proximoStatus } from "@/lib/fluxo";

export default function BotaoAvancar({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [aCarregar, setACarregar] = useState(false);
  const proximo = proximoStatus(status);
  if (!proximo) return <span className="text-xs text-slate-400">Finalizada</span>;

  async function avancar() {
    const aviso = status === "PAGAMENTO_PENDENTE" ? "Confirmas que validaste o comprovativo de pagamento?" : `Avançar para ${proximo}?`;
    if (!confirm(aviso)) return;
    setACarregar(true);
    const res = await fetch(`/api/admin/solicitacoes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: proximo }),
    });
    setACarregar(false);
    if (!res.ok) alert((await res.json()).erro ?? "Erro.");
    router.refresh();
  }

  return (
    <button onClick={avancar} disabled={aCarregar} className="whitespace-nowrap rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">
      {aCarregar ? "..." : ACAO_SEGUINTE[status]}
    </button>
  );
}
