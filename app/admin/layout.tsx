import Link from "next/link";
import { exigirAdmin } from "@/lib/auth";
import BarraTopo from "@/components/BarraTopo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await exigirAdmin();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <BarraTopo />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-8 flex flex-wrap gap-2 text-sm font-semibold">
          {[["solicitacoes", "Solicitações"], ["bolsas", "Bolsas"], ["mentorias", "Mentorias"], ["usuarios", "Utilizadores"]].map(([h, t]) => (
            <Link key={h} href={`/admin/${h}`} className="rounded-lg border border-slate-300 bg-white px-4 py-2">{t}</Link>
          ))}
        </nav>
        {children}
      </div>
    </main>
  );
}

export const instant = false;
