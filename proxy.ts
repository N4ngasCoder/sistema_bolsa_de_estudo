// Next.js 16: "middleware.ts" passou a chamar-se "proxy.ts".
import { NextResponse, type NextRequest } from "next/server";
import { NOME_COOKIE, verificarToken } from "@/lib/jwt";

export async function proxy(req: NextRequest) {
  const sessao = await verificarToken(req.cookies.get(NOME_COOKIE)?.value);
  const { pathname } = req.nextUrl;
  if (!sessao) return NextResponse.redirect(new URL("/entrar", req.url));
  if (pathname.startsWith("/admin") && sessao.role !== "ADMIN")
    return NextResponse.redirect(new URL("/dashboard", req.url));
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
