import { prisma } from "@/lib/prisma";
import FormularioCrud from "@/components/FormularioCrud";


export default async function AdminBolsas() {
  const bolsas = await prisma.bolsa.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <h1 className="mb-6 text-2xl font-extrabold">Bolsas</h1>
      <FormularioCrud
        endpoint="/api/admin/bolsas"
        itens={bolsas.map((b) => ({ ...b, createdAt: b.createdAt.toISOString() }))}
        campos={[
          { nome: "titulo", rotulo: "Título" },
          { nome: "pais", rotulo: "País" },
          { nome: "instituicao", rotulo: "Instituição" },
          { nome: "linkOficial", rotulo: "Link oficial", tipo: "url" },
          { nome: "status", rotulo: "Estado", tipo: "select", opcoes: [{ valor: "ATIVA", texto: "Ativa" }, { valor: "ENCERRADA", texto: "Encerrada" }] },
          { nome: "descricao", rotulo: "Descrição", tipo: "textarea" },
          { nome: "requisitos", rotulo: "Requisitos", tipo: "textarea" },
        ]}
        colunas={[{ nome: "titulo", rotulo: "Título" }, { nome: "pais", rotulo: "País" }, { nome: "instituicao", rotulo: "Instituição" }, { nome: "status", rotulo: "Estado" }]}
      />
    </>
  );
}
