import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BarraTopo from "@/components/BarraTopo";

export default async function MentoresPage() {
  // Só mostra mentorias de bolsas ativas. O WhatsApp NÃO é mostrado aqui:
  // só é usado depois de o aluno registar o pedido na página da bolsa.
  const mentorias = await prisma.mentoria.findMany({
    where: { bolsa: { status: "ATIVA" } },
    include: { bolsa: { select: { id: true, titulo: true, pais: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-extrabold">Mentores e mentorias</h1>
        <p className="mt-2 text-slate-600">Escolhe uma mentoria, abre a bolsa correspondente e faz o pedido.</p>
        {mentorias.length === 0 ? (
          <p className="mt-10 text-slate-500">Ainda não há mentorias disponíveis.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mentorias.map((m) => (
              <Link key={m.id} href={`/bolsas/${m.bolsa.id}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{m.bolsa.pais}</p>
                <h2 className="mt-1 text-lg font-bold">{m.titulo}</h2>
                <p className="text-sm text-slate-600">Mentor: {m.mentorNome}</p>
                <p className="mt-2 text-sm text-slate-500">Bolsa: {m.bolsa.titulo}</p>
                <p className="mt-3 line-clamp-3 text-sm text-slate-700">{m.descricao}</p>
                <p className="mt-4 text-sm font-semibold text-amber-600">{m.preco.toLocaleString("pt-PT")} Kz</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export const instant = false;
