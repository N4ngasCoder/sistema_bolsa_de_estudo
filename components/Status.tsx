import { ROTULOS } from "@/lib/fluxo";

const CORES: Record<string, string> = {
  PAGAMENTO_PENDENTE: "bg-amber-100 text-amber-800",
  MENTORIA_PAGA: "bg-blue-100 text-blue-800",
  EM_ANDAMENTO: "bg-indigo-100 text-indigo-800",
  CONCLUIDA: "bg-green-100 text-green-800",
};

export default function Status({ valor }: { valor: string }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${CORES[valor] ?? "bg-slate-100"}`}>{ROTULOS[valor] ?? valor}</span>;
}
