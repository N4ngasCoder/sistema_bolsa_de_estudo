import { prisma } from "@/lib/prisma";
import FormularioCrud from "@/components/FormularioCrud";


export default async function AdminMentorias() {
  const [mentorias, bolsas] = await Promise.all([
    prisma.mentoria.findMany({ include: { bolsa: true }, orderBy: { createdAt: "desc" } }),
    prisma.bolsa.findMany({ orderBy: { titulo: "asc" } }),
  ]);
  if (bolsas.length === 0) return <p>Cria primeiro uma bolsa em <a className="text-blue-700" href="/admin/bolsas">Bolsas</a>.</p>;

  return (
    <>
      <h1 className="mb-6 text-2xl font-extrabold">Mentorias</h1>
      <FormularioCrud
        endpoint="/api/admin/mentorias"
        itens={mentorias.map(({ bolsa, createdAt, ...m }) => ({ ...m, preco: String(m.preco), bolsaTitulo: bolsa.titulo, createdAt: createdAt.toISOString() }))}
        campos={[
          { nome: "titulo", rotulo: "Título" },
          { nome: "bolsaId", rotulo: "Bolsa", tipo: "select", opcoes: bolsas.map((b) => ({ valor: b.id, texto: b.titulo })) },
          { nome: "preco", rotulo: "Preço (Kz)", tipo: "number" },
          { nome: "mentorNome", rotulo: "Nome do mentor" },
          { nome: "mentorWhatsapp", rotulo: "WhatsApp do mentor (com indicativo, ex: 244923000000)" },
          { nome: "descricao", rotulo: "Descrição", tipo: "textarea" },
        ]}
        colunas={[{ nome: "titulo", rotulo: "Título" }, { nome: "bolsaTitulo", rotulo: "Bolsa" }, { nome: "mentorNome", rotulo: "Mentor" }, { nome: "mentorWhatsapp", rotulo: "WhatsApp" }, { nome: "preco", rotulo: "Preço" }]}
      />
    </>
  );
}
