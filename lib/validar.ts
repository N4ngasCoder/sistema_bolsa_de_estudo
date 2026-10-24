const txt = (v: unknown) => String(v ?? "").trim();

export function dadosBolsa(b: Record<string, unknown>) {
  const d = {
    titulo: txt(b.titulo), pais: txt(b.pais), instituicao: txt(b.instituicao),
    descricao: txt(b.descricao), requisitos: txt(b.requisitos), linkOficial: txt(b.linkOficial),
    status: txt(b.status) === "ENCERRADA" ? "ENCERRADA" : "ATIVA",
  };
  return Object.values(d).every(Boolean) ? d : null;
}

export function dadosMentoria(b: Record<string, unknown>) {
  const d = {
    titulo: txt(b.titulo), descricao: txt(b.descricao), preco: Number(b.preco),
    mentorNome: txt(b.mentorNome), mentorWhatsapp: txt(b.mentorWhatsapp).replace(/\D/g, ""), bolsaId: txt(b.bolsaId),
  };
  const ok = d.titulo && d.descricao && d.mentorNome && d.mentorWhatsapp.length >= 8 && d.bolsaId && d.preco > 0;
  return ok ? d : null;
}
