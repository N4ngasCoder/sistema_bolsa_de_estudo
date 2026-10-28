import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";

export default async function BarraEstado() {
  const s = await obterSessao();
  if (!s) return null;

  const user = await prisma.user.findUnique({
    where: { id: s.id },
    select: { nome: true, email: true, pais: true, cidade: true, tipoConta: true },
  });
  if (!user) return null;

  const local = [user.cidade, user.pais].filter(Boolean).join(", ");

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-blue-100 bg-blue-50 px-[6%] py-2 text-sm text-slate-700">
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold text-slate-900">{user.nome}</span>
        <span className="text-blue-700">{user.email}</span>
        {local && <span>{local}</span>}
        <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-slate-600">{user.tipoConta}</span>
      </p>
      <Link href="/dashboard" className="font-semibold text-blue-700 hover:underline">
        Minhas solicitações
      </Link>
    </div>
  );
}