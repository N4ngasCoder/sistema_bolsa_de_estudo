import { prisma } from "@/lib/prisma";

export default async function Visualizar() {
  const users = await prisma.user.findMany();
  // const bolsas = await prisma.bolsa.findMany(); // descomenta quando criar model Bolsa
  // const mentores = await prisma.mentor.findMany();

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Bancos Criados - sistema_bolsa_de_estudo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Arquivo: prisma/dev.db (12 KB)</h2>
        <p className="text-sm text-gray-600">Caminho: file:./prisma/dev.db</p>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3">Tabela: User ({users.length} registros)</h3>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nome</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Papel</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="border p-2 text-xs">{u.id.slice(0,8)}...</td>
                <td className="border p-2">{u.nome}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.papel}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={4} className="p-4 text-center">Nenhum usuário ainda - banco vazio após reset</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}