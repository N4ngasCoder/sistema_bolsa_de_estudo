import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminDaApi } from "@/lib/auth";
import { dadosMentoria } from "@/lib/validar";

export async function GET() {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  return NextResponse.json(await prisma.mentoria.findMany({ include: { bolsa: true }, orderBy: { createdAt: "desc" } }));
}

export async function POST(req: Request) {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const d = dadosMentoria(await req.json());
  if (!d) return NextResponse.json({ erro: "Preenche todos os campos (preço > 0)." }, { status: 400 });
  return NextResponse.json(await prisma.mentoria.create({ data: d }), { status: 201 });
}
