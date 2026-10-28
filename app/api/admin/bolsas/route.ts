import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminDaApi } from "@/lib/auth";
import { dadosBolsa } from "@/lib/validar";

export async function GET() {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  return NextResponse.json(await prisma.bolsa.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(req: Request) {
  if (!(await adminDaApi())) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const d = dadosBolsa(await req.json());
  if (!d) return NextResponse.json({ erro: "Preenche todos os campos." }, { status: 400 });
  return NextResponse.json(await prisma.bolsa.create({ data: d }), { status: 201 });
}
