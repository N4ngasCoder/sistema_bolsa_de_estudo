import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { NOME_COOKIE, verificarToken, type Sessao } from "./jwt";

/** Lê o cookie e confirma no banco (role sempre atualizada). */
export async function obterSessao(): Promise<Sessao | null> {
  const cookieStore = await cookies();
  const dados = await verificarToken(cookieStore.get(NOME_COOKIE)?.value);
  if (!dados) return null;
  const user = await prisma.user.findUnique({
    where: { id: dados.id },
    select: { id: true, nome: true, email: true, role: true },
  });
  return user;
}

export async function exigirLogin() {
  const s = await obterSessao();
  if (!s) redirect("/entrar");
  return s;
}

export async function exigirAdmin() {
  const s = await obterSessao();
  if (!s) redirect("/entrar");
  if (s.role !== "ADMIN") redirect("/dashboard");
  return s;
}

/** Para rotas API: devolve a sessão de admin ou null. */
export async function adminDaApi() {
  const s = await obterSessao();
  return s && s.role === "ADMIN" ? s : null;
}
