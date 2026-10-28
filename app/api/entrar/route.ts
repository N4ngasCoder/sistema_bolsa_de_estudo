import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { criarToken, NOME_COOKIE } from "@/lib/jwt";

const emDev = process.env.NODE_ENV !== "production";

export async function POST(req: Request) {
  try {
    const { email, senha, manterSessao } = await req.json();
    const emailNorm = String(email ?? "").trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: emailNorm } });

    // bcrypt.compare(senhaDigitada, hashGuardado) — nesta ordem e sempre com await.
    const valida = user ? await bcrypt.compare(String(senha ?? ""), user.senha) : false;
    if (!user || !valida)
      return NextResponse.json({ erro: "Email ou palavra-passe incorretos." }, { status: 401 });

    const dias = manterSessao ? 30 : 1;
    const token = await criarToken({ id: user.id, nome: user.nome, email: user.email, role: user.role }, dias);

    // "secure" só quando o pedido realmente chegou por HTTPS (diretamente ou via proxy).
    // Antes dependia de NODE_ENV=production, e em HTTP o browser descartava o cookie.
    const https =
      req.headers.get("x-forwarded-proto")?.split(",")[0].trim() === "https" ||
      new URL(req.url).protocol === "https:";

    const cookieStore = await cookies();
    cookieStore.set(NOME_COOKIE, token, {
      httpOnly: true,
      secure: https,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * dias,
    });
    return NextResponse.json({ ok: true, role: user.role });
  } catch (e) {
    console.error("[entrar]", e);
    return NextResponse.json(
      { erro: "Erro ao entrar.", ...(emDev && { detalhe: e instanceof Error ? e.message.split("\n").filter(Boolean).pop() : String(e) }) },
      { status: 500 },
    );
  }
}
