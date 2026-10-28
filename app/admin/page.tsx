import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  // Para SQLite + Supabase depois: troca para dbLocal e dbSupabase

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a3a]">Usuários</h1>
          <p className="text-gray-500">Gerencie os usuários do sistema</p>
        </div>
        <button className="bg-[#2e2e8a] text-white px-5 py-2.5 rounded-xl text-sm">
          + Novo Usuário
        </button>
      </div>

      {/* CARDS - igual imagem */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600">Total Usuários</p>
          <p className="text-4xl font-bold mt-2">{users.length}</p>
          <p className="text-xs text-green-600 mt-3">↑ Banco: prisma/dev.db</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600">Bolsas</p>
          <p className="text-4xl font-bold mt-2">0</p>
          <p className="text-xs text-gray-500 mt-3">↑ Em breve</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-600">Mentores</p>
          <p className="text-4xl font-bold mt-2">0</p>
          <p className="text-xs text-gray-500 mt-3">↑ Em breve</p>
        </div>
      </div>

      {/* TABELA - a que você já tem funcionando */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Usuários - Tabela User ({users.length} registros)</h2>
        
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">ID</th>
              <th className="pb-3">Nome</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Papel</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b text-sm">
                <td className="py-3 text-xs">{u.id.slice(0,8)}...</td>
                <td className="py-3 font-medium">{u.nome}</td>
                <td className="py-3">{u.email}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${u.papel === 'estudante' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {u.papel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && <p className="text-center py-8 text-gray-400">Nenhum usuário</p>}
        
        <p className="text-xs text-gray-400 mt-4">Arquivo: prisma/dev.db (12 KB) - Caminho: file:./prisma/dev.db</p>
      </div>
    </>
  );
}