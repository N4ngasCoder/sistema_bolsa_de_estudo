import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminDaApi } from "@/lib/auth";
import { dadosBolsa } from "@/lib/validar";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const { id } = await params;
  const d = dadosBolsa(await req.json());
  if (!d) return NextResponse.json({ erro: "Preenche todos os campos." }, { status: 400 });
  return NextResponse.json(await prisma.bolsa.update({ where: { id }, data: d }));
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const { id } = await params;
  await prisma.bolsa.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
