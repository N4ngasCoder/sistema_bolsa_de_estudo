import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";
import AlterarPerfil from "./AlterarPerfil";


export default async function AdminUsuarios() {
  const eu = await obterSessao();
  const users = await prisma.user.findMany({
    select: { id: true, nome: true, email: true, role: true, createdAt: true, _count: { select: { solicitacoes: true } } },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <h1 className="mb-6 text-2xl font-extrabold">Utilizadores</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100"><tr><th className="p-3">Nome</th><th className="p-3">Email</th><th className="p-3">Solicitações</th><th className="p-3">Registo</th><th className="p-3">Perfil</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.nome}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u._count.solicitacoes}</td>
                <td className="p-3">{u.createdAt.toLocaleDateString("pt-PT")}</td>
                <td className="p-3">{u.id === eu?.id ? <b>{u.role} (tu)</b> : <AlterarPerfil id={u.id} role={u.role} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
