"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Campo = {
  nome: string;
  rotulo: string;
  tipo?: "text" | "textarea" | "number" | "url" | "select";
  opcoes?: { valor: string; texto: string }[];
};

type Item = Record<string, unknown> & { id: string };

/** CRUD genérico: lista + formulário de criar/editar. */
export default function FormularioCrud({ endpoint, campos, itens, colunas }: {
  endpoint: string;
  campos: Campo[];
  itens: Item[];
  colunas: { nome: string; rotulo: string }[];
}) {
  const router = useRouter();
  const vazio = Object.fromEntries(campos.map((c) => [c.nome, c.opcoes?.[0]?.valor ?? ""]));
  const [form, setForm] = useState<Record<string, string>>(vazio);
  const [editando, setEditando] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    const res = await fetch(editando ? `${endpoint}/${editando}` : endpoint, {
      method: editando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const d = await res.json();
    if (!res.ok) return setErro(d.erro ?? "Erro ao guardar.");
    setForm(vazio);
    setEditando(null);
    router.refresh();
  }

  async function apagar(id: string) {
    if (!confirm("Apagar este registo? As solicitações ligadas também serão apagadas.")) return;
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (!res.ok) return setErro("Erro ao apagar.");
    router.refresh();
  }

  function editar(item: Item) {
    setEditando(item.id);
    setForm(Object.fromEntries(campos.map((c) => [c.nome, String(item[c.nome] ?? "")])));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

  return (
    <div className="grid gap-8">
      <form onSubmit={guardar} className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <h2 className="text-lg font-bold sm:col-span-2">{editando ? "Editar" : "Novo registo"}</h2>
        {campos.map((c) => (
          <label key={c.nome} className={c.tipo === "textarea" ? "sm:col-span-2" : ""}>
            <span className="mb-1 block text-sm font-semibold">{c.rotulo}</span>
            {c.tipo === "textarea" ? (
              <textarea rows={4} className={cls} value={form[c.nome]} onChange={(e) => setForm({ ...form, [c.nome]: e.target.value })} required />
            ) : c.tipo === "select" ? (
              <select className={cls} value={form[c.nome]} onChange={(e) => setForm({ ...form, [c.nome]: e.target.value })} required>
                {c.opcoes?.map((o) => <option key={o.valor} value={o.valor}>{o.texto}</option>)}
              </select>
            ) : (
              <input type={c.tipo ?? "text"} step="any" className={cls} value={form[c.nome]} onChange={(e) => setForm({ ...form, [c.nome]: e.target.value })} required />
            )}
          </label>
        ))}
        {erro && <p className="text-sm text-red-600 sm:col-span-2">{erro}</p>}
        <div className="flex gap-2 sm:col-span-2">
          <button className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white">{editando ? "Guardar alterações" : "Criar"}</button>
          {editando && <button type="button" onClick={() => { setEditando(null); setForm(vazio); }} className="rounded-lg border px-5 py-2">Cancelar</button>}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>{colunas.map((c) => <th key={c.nome} className="p-3">{c.rotulo}</th>)}<th className="p-3" /></tr>
          </thead>
          <tbody>
            {itens.length === 0 && <tr><td className="p-3 text-slate-500" colSpan={colunas.length + 1}>Sem registos.</td></tr>}
            {itens.map((i) => (
              <tr key={i.id} className="border-t">
                {colunas.map((c) => <td key={c.nome} className="p-3">{String(i[c.nome] ?? "")}</td>)}
                <td className="whitespace-nowrap p-3 text-right">
                  <button onClick={() => editar(i)} className="mr-3 text-blue-700">Editar</button>
                  <button onClick={() => apagar(i.id)} className="text-red-600">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
