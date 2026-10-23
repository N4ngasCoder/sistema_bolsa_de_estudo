import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f6f7]">
      {/* SIDEBAR - igual da imagem */}
      <aside className="w-[280px] bg-[#0f0f1e] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#2e2e8a] p-2 rounded-lg">🎓</div>
          <span className="font-semibold text-sm">sistema_bolsa_de_estudo</span>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          <p className="text-xs text-gray-500 px-3 mb-3">MENU</p>
          <Link href="/admin" className="flex gap-3 px-3 py-2.5 bg-[#1e1e4a] rounded-lg text-sm">📊 Dashboard</Link>
          <Link href="/admin" className="flex gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm">👥 Usuários</Link>
          <Link href="/admin" className="flex gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm">🎓 Bolsas</Link>
          <Link href="/admin" className="flex gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm">👨‍🏫 Mentores</Link>
          <Link href="/visualizar" className="flex gap-3 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm">🗄️ Bancos</Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs">AD</div>
            <div>
              <p className="text-sm">Admin</p>
              <p className="text-xs text-gray-400">admin@sistema.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTEUDO */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}