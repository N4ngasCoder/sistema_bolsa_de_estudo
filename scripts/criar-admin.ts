// Uso: npm run criar-admin -- email@exemplo.com "Nome" senhaForte123
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const [email, nome = "Administrador", senha] = process.argv.slice(2);

async function main() {
  if (!email || !senha || senha.length < 8) {
    console.log('Uso: npm run criar-admin -- email "Nome" senha(8+)');
    process.exit(1);
  }
  const hash = await bcrypt.hash(senha, 10);
  const e = email.toLowerCase();
  await prisma.user.upsert({
    where: { email: e },
    update: { role: "ADMIN", senha: hash, nome },
    create: { email: e, nome, senha: hash, role: "ADMIN" },
  });
  console.log(`Admin pronto: ${e}`);
}
main().finally(() => prisma.$disconnect());
