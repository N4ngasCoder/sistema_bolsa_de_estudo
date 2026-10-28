import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const txt = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);
const emDev = process.env.NODE_ENV !== "production";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const nome = txt(b.nome, 120);
    const emailNorm = txt(b.email, 200).toLowerCase();
    const senha = String(b.senha ?? "");

    if (!nome || !emailNorm || !/^\S+@\S+\.\S+$/.test(emailNorm) || senha.length < 8)
      return NextResponse.json({ erro: "Dados inválidos. Verifica o email e usa uma palavra-passe com 8+ caracteres." }, { status: 400 });

    const existe = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (existe) return NextResponse.json({ erro: "Este email já está registado." }, { status: 409 });

    // Guardamos SÓ o hash (nunca a senha em texto).
    const hash = await bcrypt.hash(senha, 10);
    await prisma.user.create({
      data: {
        nome,
        email: emailNorm,
        senha: hash,
        // "role" fica sempre USER aqui: ninguém ganha permissões de admin a partir do formulário.
        tipoConta: txt(b.papel, 20).toLowerCase() === "mentor" ? "MENTOR" : "ESTUDANTE",
        telefone: txt(b.telefone, 30),
        dataNascimento: txt(b.dataNascimento, 10),
        genero: txt(b.genero, 20),
        pais: txt(b.pais, 80),
        cidade: txt(b.cidade, 80),
        instituicao: txt(b.instituicao, 160),
        nivel: txt(b.nivel, 40),
        area: txt(b.area, 120),
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[cadastro]", e);
    // Corrida: dois pedidos ao mesmo tempo com o mesmo email.
    if (typeof e === "object" && e && (e as { code?: string }).code === "P2002")
      return NextResponse.json({ erro: "Este email já está registado." }, { status: 409 });
    return NextResponse.json(
      { erro: "Erro ao criar conta.", ...(emDev && { detalhe: e instanceof Error ? e.message.split("\n").filter(Boolean).pop() : String(e) }) },
      { status: 500 },
    );
  }
}
