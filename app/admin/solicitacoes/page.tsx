import { prisma } from "@/lib/prisma";
import { FLUXO, ROTULOS } from "@/lib/fluxo";
import Status from "@/components/Status";
import BotaoAvancar from "./BotaoAvancar";


export default async function AdminSolicitacoes({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const filtro = FLUXO.includes(status as (typeof FLUXO)[number]) ? status : undefined;
  const lista = await prisma.solicitacaoMentoria.findMany({
    where: filtro ? { status: filtro } : {},
    include: { user: true, mentoria: true, bolsa: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h1 className="text-2xl font-extrabold">Solicitações de mentoria</h1>
      <p className="mt-1 text-sm text-slate-600">Confirma o pagamento só depois de receberes o comprovativo encaminhado pelo mentor.</p>
      <div className="my-5 flex flex-wrap gap-2 text-sm">
        <a href="/admin/solicitacoes" className={`rounded-full px-3 py-1 ${!filtro ? "bg-blue-700 text-white" : "bg-white border"}`}>Todas</a>
        {FLUXO.map((f) => (
          <a key={f} href={`?status=${f}`} className={`rounded-full px-3 py-1 ${filtro === f ? "bg-blue-700 text-white" : "bg-white border"}`}>{ROTULOS[f]}</a>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr><th className="p-3">Data</th><th className="p-3">Aluno</th><th className="p-3">Bolsa / Mentoria</th><th className="p-3">Mentor</th><th className="p-3">Valor</th><th className="p-3">Estado</th><th className="p-3" /></tr>
          </thead>
          <tbody>
            {lista.length === 0 && <tr><td colSpan={7} className="p-3 text-slate-500">Sem solicitações.</td></tr>}
            {lista.map((x) => (
              <tr key={x.id} className="border-t align-top">
                <td className="p-3 whitespace-nowrap">{x.createdAt.toLocaleString("pt-PT")}</td>
                <td className="p-3">{x.user.nome}<br /><span className="text-slate-500">{x.user.email}</span></td>
                <td className="p-3">{x.bolsa.titulo}<br /><span className="text-slate-500">{x.mentoria.titulo}</span></td>
                <td className="p-3">{x.mentoria.mentorNome}<br /><span className="text-slate-500">{x.mentoria.mentorWhatsapp}</span></td>
                <td className="p-3 whitespace-nowrap">{x.mentoria.preco.toLocaleString("pt-PT")} Kz</td>
                <td className="p-3"><Status valor={x.status} /></td>
                <td className="p-3"><BotaoAvancar id={x.id} status={x.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
