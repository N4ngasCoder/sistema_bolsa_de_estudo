import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { exigirLogin } from "@/lib/auth";
import { linkWhatsapp } from "@/lib/fluxo";
import BarraTopo from "@/components/BarraTopo";
import Status from "@/components/Status";


export default async function DashboardPage() {
  const s = await exigirLogin();
  const lista = await prisma.solicitacaoMentoria.findMany({
    where: { userId: s.id },
    include: { mentoria: true, bolsa: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-extrabold">Olá, {s.nome}</h1>
        <p className="mt-2 text-slate-600">As tuas solicitações de mentoria. Envia o comprovativo de pagamento ao mentor pelo WhatsApp; o estado muda depois de o administrador validar.</p>
        {lista.length === 0 ? (
          <p className="mt-8">Ainda não pediste nenhuma mentoria. <Link href="/bolsas" className="text-blue-700">Ver bolsas</Link></p>
        ) : (
          <div className="mt-8 grid gap-4">
            {lista.map((x) => (
              <div key={x.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
                <div>
                  <p className="font-bold">{x.mentoria.titulo}</p>
                  <p className="text-sm text-slate-600">{x.bolsa.titulo} · Mentor {x.mentoria.mentorNome} · {x.mentoria.preco.toLocaleString("pt-PT")} Kz</p>
                  <p className="text-xs text-slate-400">{x.createdAt.toLocaleString("pt-PT")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Status valor={x.status} />
                  <a href={linkWhatsapp(x.mentoria.mentorWhatsapp, x.bolsa.titulo, x.mentoria.titulo, s.nome)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700">WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export const instant = false;
