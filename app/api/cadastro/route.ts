import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/app/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  try {
    const dados = await req.json();

    if (!dados.email || !dados.password || !dados.nome) {
      return NextResponse.json({ erro: "Faltam campos obrigatórios" }, { status: 400 });
    }

    const existe = await prisma.user.findUnique({ where: { email: dados.email } });
    if (existe) {
      return NextResponse.json({ erro: "Este email já existe" }, { status: 400 });
    }

    const hash = await bcrypt.hash(dados.password, 10);

    await prisma.user.create({
      data: {
        nome: dados.nome,
        apelido: dados.apelido || "",
        email: dados.email,
        telefone: dados.telefone || null,
        genero: dados.genero || null,
        pais: dados.pais || "Angola",
        cidade: dados.cidade || null,
        papel: dados.papel || "estudante",
        password: hash,
        dataNascimento: dados.dataNascimento ? new Date(dados.dataNascimento) : null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("ERRO CADASTRO:", error);
    return NextResponse.json({ erro: error.message || "Erro interno" }, { status: 500 });
  }
}