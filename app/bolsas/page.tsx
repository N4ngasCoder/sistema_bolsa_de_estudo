import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BarraTopo from "@/components/BarraTopo";


export default async function BolsasPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const bolsas = await prisma.bolsa.findMany({
    where: {
      status: "ATIVA",
      ...(q ? { OR: [{ titulo: { contains: q } }, { pais: { contains: q } }, { instituicao: { contains: q } }] } : {}),
    },
    include: { _count: { select: { mentorias: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-extrabold">Bolsas de estudo</h1>
        <p className="mt-2 text-slate-600">A candidatura é feita no site oficial. Aqui podes pedir mentoria paga para te preparares.</p>
        <form className="mt-6 flex gap-2">
          <input name="q" defaultValue={q} placeholder="Pesquisar por título, país ou instituição" className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3" />
          <button className="rounded-lg bg-blue-700 px-5 font-semibold text-white">Pesquisar</button>
        </form>
        {bolsas.length === 0 ? (
          <p className="mt-10 text-slate-500">Nenhuma bolsa encontrada.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bolsas.map((b) => (
              <Link key={b.id} href={`/bolsas/${b.id}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{b.pais}</p>
                <h2 className="mt-1 text-lg font-bold">{b.titulo}</h2>
                <p className="text-sm text-slate-600">{b.instituicao}</p>
                <p className="mt-3 line-clamp-3 text-sm text-slate-700">{b.descricao}</p>
                <p className="mt-4 text-sm font-semibold text-amber-600">{b._count.mentorias} mentoria(s) disponível(eis)</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export const instant = false;
