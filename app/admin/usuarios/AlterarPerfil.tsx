"use client";

import { useRouter } from "next/navigation";

export default function AlterarPerfil({ id, role }: { id: string; role: string }) {
  const router = useRouter();
  async function mudar(novo: string) {
    if (!confirm(`Mudar perfil para ${novo}?`)) return;
    const res = await fetch(`/api/admin/usuarios/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: novo }),
    });
    if (!res.ok) alert((await res.json()).erro ?? "Erro.");
    router.refresh();
  }
  return (
    <select value={role} onChange={(e) => mudar(e.target.value)} className="rounded border px-2 py-1">
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
}
