import Link from "next/link";
import { obterSessao } from "@/lib/auth";
import BotaoSair from "./BotaoSair";

export default async function BarraTopo() {
  const s = await obterSessao();
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-[6%] py-5">
      <Link href="/" className="text-xl font-extrabold text-blue-700">BolsaMentor</Link>
      <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700">
        <Link href="/bolsas">Bolsas</Link>
        {s && <Link href="/dashboard">Minhas solicitações</Link>}
        {s?.role === "ADMIN" && <Link href="/admin/solicitacoes">Admin</Link>}
        {s ? (
          <BotaoSair />
        ) : (
          <>
            <Link href="/entrar">Entrar</Link>
            <Link href="/cadastro" className="rounded-lg bg-blue-700 px-4 py-2 text-white">Criar conta</Link>
          </>
        )}
      </nav>
    </header>
  );
}
