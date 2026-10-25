"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  user: {
    nome: string;
    email: string;
    telefone: string;
    pais: string;
    cidade: string;
    instituicao: string;
    nivel: string;
    area: string;
    tipoConta: string;
  };
};

export default function IconeUser({ user }: Props) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function fora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    }
    document.addEventListener("mousedown", fora);
    return () => document.removeEventListener("mousedown", fora);
  }, []);

  async function sair() {
    await fetch("/api/sair", { method: "POST" });
    router.push("/entrar");
    router.refresh();
  }

  const iniciais = user.nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const linha = (rotulo: string, valor: string) =>
    valor ? (
      <p className="mt-1.5 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{rotulo}:</span> {valor}
      </p>
    ) : null;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      <button
        onClick={() => setAberto(!aberto)}
        aria-label="Informações do utilizador"
        aria-expanded={aberto}
        className="grid h-10 w-10 place-items-center rounded-full bg-blue-700 text-sm font-bold text-white hover:bg-blue-800"
      >
        {iniciais}
      </button>

      {aberto && (
        <div className="absolute right-0 top-full z-50 w-72 pt-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <p className="font-bold text-slate-900">{user.nome}</p>
            <p className="text-sm text-blue-700">{user.email}</p>
            <hr className="my-3 border-slate-200" />
            {linha("Tipo de conta", user.tipoConta)}
            {linha("Telefone", user.telefone)}
            {linha("País", user.pais)}
            {linha("Cidade", user.cidade)}
            {linha("Instituição", user.instituicao)}
            {linha("Nível", user.nivel)}
            {linha("Área", user.area)}
            <hr className="my-3 border-slate-200" />
            <button
              onClick={sair}
              className="w-full rounded-lg border border-red-200 bg-red-50 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}