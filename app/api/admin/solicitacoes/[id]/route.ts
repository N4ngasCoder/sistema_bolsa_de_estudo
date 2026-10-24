import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminDaApi } from "@/lib/auth";
import { proximoStatus } from "@/lib/fluxo";

/** Só ADMIN avança o status, sempre um passo: PENDENTE -> PAGA -> EM_ANDAMENTO -> CONCLUIDA. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const { id } = await params;
  const { status } = await req.json();

  const atual = await prisma.solicitacaoMentoria.findUnique({ where: { id } });
  if (!atual) return NextResponse.json({ erro: "Solicitação não encontrada." }, { status: 404 });

  const esperado = proximoStatus(atual.status);
  if (!esperado || status !== esperado)
    return NextResponse.json({ erro: `Transição inválida: ${atual.status} → ${status}.` }, { status: 400 });

  // updateMany com o status atual evita corrida entre dois admins.
  const r = await prisma.solicitacaoMentoria.updateMany({ where: { id, status: atual.status }, data: { status: esperado } });
  if (r.count === 0) return NextResponse.json({ erro: "Status já foi alterado. Atualiza a página." }, { status: 409 });
  return NextResponse.json({ ok: true, status: esperado });
}
