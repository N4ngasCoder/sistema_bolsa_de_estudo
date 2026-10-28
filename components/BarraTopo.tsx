import Link from "next/link";
import { obterSessao } from "@/lib/auth";
<<<<<<< HEAD
import BotaoSair from "./BotaoSair";
=======
import IconeUserSessao from "./IconeUserSessao";
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2

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
<<<<<<< HEAD
          <BotaoSair />
=======
          <IconeUserSessao />
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
        ) : (
          <>
            <Link href="/entrar">Entrar</Link>
            <Link href="/cadastro" className="rounded-lg bg-blue-700 px-4 py-2 text-white">Criar conta</Link>
          </>
        )}
      </nav>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
