import { prisma } from "@/lib/prisma";
import { obterSessao } from "@/lib/auth";
import IconeUser from "./IconeUser";

export default async function IconeUserSessao() {
  const s = await obterSessao();
  if (!s) return null;

  const user = await prisma.user.findUnique({
    where: { id: s.id },
    select: {
      nome: true,
      email: true,
      telefone: true,
      pais: true,
      cidade: true,
      instituicao: true,
      nivel: true,
      area: true,
      tipoConta: true,
    },
  });
  if (!user) return null;

  return <IconeUser user={user} />;
}