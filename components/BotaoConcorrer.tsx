"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  bolsaId: string;
  linkOficial: string;
  logado: boolean;
  jaConcorreu: boolean;
};

export default function BotaoConcorrer({ bolsaId, linkOficial, logado, jaConcorreu }: Props) {
  const [concorreu, setConcorreu] = useState(jaConcorreu);
  const [aCarregar, setACarregar] = useState(false);
  const router = useRouter();

  async function concorrer() {
    if (!logado) {
      router.push("/entrar");
      return;
    }
    // abre o site antes do await, para o navegador não bloquear o separador
    window.open(linkOficial, "_blank", "noopener,noreferrer");

    setACarregar(true);
    try {
      const res = await fetch("/api/candidaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bolsaId }),
      });
      if (res.ok) {
        setConcorreu(true);
        router.refresh();
      }
    } finally {
      setACarregar(false);
    }
  }

  async function cancelar() {
    setACarregar(true);
    try {
      const res = await fetch("/api/candidaturas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bolsaId }),
      });
      if (res.ok) {
        setConcorreu(false);
        router.refresh();
      }
    } finally {
      setACarregar(false);
    }
  }

  if (concorreu) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          ✓ Estás a concorrer a esta bolsa
        </span>
        <a
          href={linkOficial}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-blue-700 px-4 py-3 text-sm font-semibold text-blue-700"
        >
          Abrir site oficial ↗
        </a>
        <button
          onClick={cancelar}
          disabled={aCarregar}
          className="text-sm text-slate-500 underline"
        >
          Remover
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={concorrer}
      disabled={aCarregar}
      className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
    >
      {aCarregar ? "A guardar..." : "Concorrer a esta bolsa ↗"}
    </button>
  );
}