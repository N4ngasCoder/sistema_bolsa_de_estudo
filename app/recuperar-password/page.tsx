import Link from "next/link";
import BarraTopo from "@/components/BarraTopo";

export default function RecuperarPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <section className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-extrabold">Recuperar palavra-passe</h1>
        <p className="mt-4 text-slate-600">
          A recuperação automática ainda não está disponível. Para repor a tua palavra-passe,
          contacta o administrador da plataforma com o email da tua conta.
        </p>
        <Link href="/entrar" className="mt-6 inline-block font-semibold text-blue-700">← Voltar a entrar</Link>
      </section>
    </main>
  );
}
