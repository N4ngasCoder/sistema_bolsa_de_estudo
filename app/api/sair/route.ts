import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NOME_COOKIE } from "@/lib/jwt";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(NOME_COOKIE);
  return NextResponse.json({ ok: true });
}
