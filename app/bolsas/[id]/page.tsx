import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";
import BarraTopo from "@/components/BarraTopo";
import BotaoMentoria from "./BotaoMentoria";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bolsa = await prisma.bolsa.findUnique({ where: { id }, include: { mentorias: { orderBy: { preco: "asc" } } } });
  if (!bolsa) notFound();
  const sessao = await obterSessao();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <article className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/bolsas" className="text-sm text-blue-700">← Voltar às bolsas</Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-blue-700">{bolsa.pais} · {bolsa.instituicao}</p>
        <h1 className="mt-1 text-3xl font-extrabold">{bolsa.titulo}</h1>
        {bolsa.status !== "ATIVA" && <p className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">Esta bolsa está encerrada.</p>}

        <h2 className="mt-8 text-xl font-bold">Descrição</h2>
        <p className="mt-2 whitespace-pre-line text-slate-700">{bolsa.descricao}</p>
        <h2 className="mt-6 text-xl font-bold">Requisitos</h2>
        <p className="mt-2 whitespace-pre-line text-slate-700">{bolsa.requisitos}</p>

        <a href={bolsa.linkOficial} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-lg border border-blue-700 px-5 py-3 font-semibold text-blue-700">
          Site oficial da bolsa ↗
        </a>
        <p className="mt-2 text-sm text-slate-500">A candidatura é feita apenas no site oficial — não neste sistema.</p>

        <h2 className="mt-10 text-xl font-bold">Mentorias pagas para esta bolsa</h2>
        {bolsa.mentorias.length === 0 ? (
          <p className="mt-2 text-slate-500">Ainda não há mentorias para esta bolsa.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {bolsa.mentorias.map((m) => (
              <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{m.titulo}</h3>
                    <p className="text-sm text-slate-600">Mentor: {m.mentorNome}</p>
                  </div>
                  <p className="text-xl font-extrabold text-amber-600">{m.preco.toLocaleString("pt-PT")} Kz</p>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm text-slate-700">{m.descricao}</p>
                <div className="mt-4">
                  {bolsa.status !== "ATIVA" ? null : sessao ? (
                    <BotaoMentoria mentoriaId={m.id} />
                  ) : (
                    <Link href="/entrar" className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white">Entra para pedir mentoria</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}

export const instant = false;
