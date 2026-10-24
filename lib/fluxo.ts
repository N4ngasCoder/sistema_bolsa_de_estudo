export const FLUXO = [
  "PAGAMENTO_PENDENTE",
  "MENTORIA_PAGA",
  "EM_ANDAMENTO",
  "CONCLUIDA",
] as const;

export type StatusSolicitacao = (typeof FLUXO)[number];

export const ROTULOS: Record<string, string> = {
  PAGAMENTO_PENDENTE: "Pagamento pendente",
  MENTORIA_PAGA: "Mentoria paga",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída",
};

export const ACAO_SEGUINTE: Record<string, string> = {
  PAGAMENTO_PENDENTE: "Confirmar pagamento",
  MENTORIA_PAGA: "Iniciar mentoria",
  EM_ANDAMENTO: "Marcar como concluída",
};

/** Só é permitido avançar exatamente um passo. */
export function proximoStatus(atual: string): StatusSolicitacao | null {
  const i = FLUXO.indexOf(atual as StatusSolicitacao);
  if (i === -1 || i === FLUXO.length - 1) return null;
  return FLUXO[i + 1];
}

export function linkWhatsapp(numero: string, bolsa: string, mentoria: string, nome: string) {
  const limpo = numero.replace(/\D/g, "");
  const texto = `Olá, me interessei pela bolsa ${bolsa} e quero a mentoria ${mentoria}. Meu nome é ${nome}.`;
  return `https://wa.me/${limpo}?text=${encodeURIComponent(texto)}`;
}
