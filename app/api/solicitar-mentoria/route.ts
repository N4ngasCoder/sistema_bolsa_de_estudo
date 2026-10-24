import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";
import { linkWhatsapp } from "@/lib/fluxo";

/**
 * REGRA PRINCIPAL: primeiro grava no banco (PAGAMENTO_PENDENTE, foiParaWhatsapp=true).
 * Só devolve o link do WhatsApp se a gravação tiver sucesso.
 */
export async function POST(req: Request) {
  const sessao = await obterSessao();
  if (!sessao) return NextResponse.json({ erro: "Precisas de entrar na tua conta." }, { status: 401 });

  try {
    const { mentoriaId } = await req.json();
    const mentoria = await prisma.mentoria.findUnique({
      where: { id: String(mentoriaId ?? "") },
      include: { bolsa: true },
    });
    if (!mentoria || mentoria.bolsa.status !== "ATIVA")
      return NextResponse.json({ erro: "Mentoria indisponível." }, { status: 404 });

    const solicitacao = await prisma.solicitacaoMentoria.create({
      data: {
        userId: sessao.id,
        mentoriaId: mentoria.id,
        bolsaId: mentoria.bolsaId,
        status: "PAGAMENTO_PENDENTE",
        foiParaWhatsapp: true,
      },
    });

    return NextResponse.json({
      ok: true,
      id: solicitacao.id,
      whatsappUrl: linkWhatsapp(mentoria.mentorWhatsapp, mentoria.bolsa.titulo, mentoria.titulo, sessao.nome),
    }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ erro: "Não foi possível registar a solicitação. Tenta novamente." }, { status: 500 });
  }
}
