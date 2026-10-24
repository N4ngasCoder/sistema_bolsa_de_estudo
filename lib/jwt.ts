import { SignJWT, jwtVerify } from "jose";

export const NOME_COOKIE = "sessao";

export type Sessao = { id: string; nome: string; email: string; role: string };

function chave() {
  const segredo = process.env.JWT_SECRET;
  if (!segredo) throw new Error("JWT_SECRET não definido no .env");
  return new TextEncoder().encode(segredo);
}

export async function criarToken(sessao: Sessao, dias = 1) {
  return new SignJWT({ ...sessao })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(sessao.id)
    .setIssuedAt()
    .setExpirationTime(`${dias}d`)
    .sign(chave());
}

export async function verificarToken(token?: string): Promise<Sessao | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, chave());
    return {
      id: String(payload.id),
      nome: String(payload.nome),
      email: String(payload.email),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}
