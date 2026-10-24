import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminDaApi } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await adminDaApi();
  if (!admin) return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
  const { id } = await params;
  const { role } = await req.json();
  if (role !== "USER" && role !== "ADMIN") return NextResponse.json({ erro: "Perfil inválido." }, { status: 400 });
  if (id === admin.id) return NextResponse.json({ erro: "Não podes alterar o teu próprio perfil." }, { status: 400 });
  await prisma.user.update({ where: { id }, data: { role } });
  return NextResponse.json({ ok: true });
}
