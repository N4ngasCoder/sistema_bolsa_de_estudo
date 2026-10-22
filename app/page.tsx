



import Link from "next/link";
import type { CSSProperties } from "react";
import Image from "next/image";
//definicao de cores 
const c = {
  bg: "#FFFFFF",     // fundo da página
  card: "#F5F8FF",   // fundo dos cartões
  chip: "#E8EFFD",   // etiquetas e caixas de imagem
  line: "#D5DEEF",   // linhas e bordas
  text: "#0F1B33",   // texto principal (azul quase preto)
  muted: "#5B6B87",  // texto secundário
  gold: "#1D4ED8",   // AGORA É O AZUL DOS BOTÕES
  teal: "#1D4ED8",   // etiquetas azuis
};

const wrap: CSSProperties = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "56px clamp(16px, 4vw, 48px)",
  boxSizing: "border-box",
};

const card: CSSProperties = {
  background: c.card,
  border: `1px solid ${c.line}`,
  borderRadius: 16,
};

const btnGold: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "0 22px",
  borderRadius: 10,
  background: c.gold,
  color: c.bg,
  fontWeight: 700,
  textDecoration: "none",
};

const field: CSSProperties = {
  minHeight: 48,
  boxSizing: "border-box",
  borderRadius: 10,
  border: "1px solid #3A4F7A",
  background: c.bg,
  color: c.text,
  padding: "0 14px",
  fontSize: 15,
  fontFamily: "inherit",
};

const passos = [
  { n: "1", titulo: "Explore as bolsas", texto: "Filtre por nível, país, área e prazo e guarde as que lhe interessam." },
  { n: "2", titulo: "Escolha um mentor", texto: "Veja perfis, bolsas conquistadas e preços e agende uma sessão." },
  { n: "3", titulo: "Candidate-se com confiança", texto: "Revise documentos, treine a entrevista e submeta dentro do prazo." },
];

const bolsas = [
  { id: 1, nivel: "Mestrado", fin: "Integral", titulo: "Bolsa de Mestrado em Engenharia", pais: "[País]", prazo: "[dd/mm/aaaa]" },
  { id: 2, nivel: "Licenciatura", fin: "Parcial", titulo: "Bolsa de Licenciatura em Saúde", pais: "[País]", prazo: "[dd/mm/aaaa]" },
  { id: 3, nivel: "Doutoramento", fin: "Integral", titulo: "Bolsa de Doutoramento em Ciências", pais: "[País]", prazo: "[dd/mm/aaaa]" },
];

const mentores = [
  { id: 1, nome: "[Nome do mentor]", area: "Mestrado · Engenharia" },
  { id: 2, nome: "[Nome do mentor]", area: "Licenciatura · Saúde" },
  { id: 3, nome: "[Nome do mentor]", area: "Doutoramento · Ciências" },
  { id: 4, nome: "[Nome do mentor]", area: "Intercâmbio · Gestão" },
];

const atalhos = ["Licenciatura", "Mestrado", "Doutoramento", "Intercâmbio"];

export default function HomePage() {
  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", fontSize: 16, lineHeight: 1.5 }}>
      {/* Cabeçalho */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px clamp(16px, 4vw, 48px)",
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 20, color: c.text, textDecoration: "none" }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: c.gold, display: "inline-block" }} />
          BolsaMentor
        </Link>
        
        {/* NAVbar  */}
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 28, fontWeight: 500 }}>
          <Link href="/bolsas" style={{ color: c.text, textDecoration: "none" }}>Bolsas</Link>
          <Link href="/mentores" style={{ color: c.text, textDecoration: "none" }}>Mentores</Link>
          <a href="#como" style={{ color: c.text, textDecoration: "none" }}>Como funciona</a>
          <a href="#mentores" style={{ color: c.text, textDecoration: "none" }}>Para mentores</a>
        </nav>

     
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
  <Link
    href="/entrar"
    style={{
      display: "inline-flex",
      alignItems: "center",
      minHeight: 44,
      padding: "0 14px",
      fontWeight: 500,
      color: c.text,
      textDecoration: "none",
    }}
  >
    Entrar
  </Link>

  <Link href="/cadastro" style={btnGold}>
    Criar conta
  </Link>
</div>

      </header>

      {/* Hero */}
      <section style={{ ...wrap, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, paddingTop: 72 }}>
        <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column", gap: 24 }}>
          
          <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.1 }}>
            Encontre a bolsa certa. Candidate-se com um mentor ao seu lado.
          </h1>
          <p style={{ margin: 0, color: c.muted, fontSize: 18, maxWidth: 560 }}>
            Publicamos bolsas de estudo e ligamos você a mentores que já passaram pelo processo, para preparar carta de motivação, CV e entrevista.
          </p>

          <form
            action="/bolsas"
            style={{ ...card, display: "flex", flexWrap: "wrap", gap: 12, padding: 12 }}
          >
            <label htmlFor="q" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Pesquisar bolsa, curso ou país
            </label>
            <input id="q" name="q" type="text" placeholder="Pesquisar bolsa, curso ou país" style={{ ...field, flex: "2 1 220px" }} />
            <label htmlFor="nivel" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Nível de estudo
            </label>
            <select id="nivel" name="nivel" style={{ ...field, flex: "1 1 140px" }}>
              <option value="">Todos os níveis</option>
              <option>Licenciatura</option>
              <option>Mestrado</option>
              <option>Doutoramento</option>
            </select>
            <button type="submit" style={{ ...btnGold, minHeight: 48, padding: "0 26px", border: "none", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
              Procurar
            </button>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", color: c.muted, fontSize: 14 }}>
            <span>Atalhos:</span>
            {atalhos.map((a) => (
              <Link key={a} href={`/bolsas?nivel=${encodeURIComponent(a)}`} style={{ padding: "6px 12px", borderRadius: 999, border: `1px solid ${c.line}`, color: "inherit", textDecoration: "none" }}>
                {a}
              </Link>
            ))}
          </div>
        </div>

<div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 16 }}>

  {/* Imagem principal */}
  <div style={{ position: "relative", width: "100%", height: 340, borderRadius: 20, overflow: "hidden" }}>
    <Image
      src="/imagem_principal.jpg"
      alt="Estudantes a preparar candidaturas a bolsas"
      fill
      priority
      style={{ objectFit: "cover" }}
    />
  </div>

  

</div>
      </section>

      {/* Como funciona */}
      <section id="como" style={wrap}>
        <h2 style={{ margin: "0 0 8px", fontSize: 30 }}>Como funciona</h2>
        <p style={{ margin: "0 0 32px", color: c.muted }}>Três passos entre descobrir a bolsa e submeter a candidatura.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {passos.map((p) => (
            <div key={p.n} style={{ ...card, flex: "1 1 280px", padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.gold, color: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {p.n}
              </div>
              <h3 style={{ margin: 0, fontSize: 20 }}>{p.titulo}</h3>
              <p style={{ margin: 0, color: c.muted }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bolsas em destaque */}
      <section style={wrap}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 30 }}>Bolsas em destaque</h2>
          <Link href="/bolsas" style={{ color: c.gold, fontWeight: 500, textDecoration: "none" }}>Ver todas as bolsas</Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {bolsas.map((b) => (
            <article key={b.id} style={{ ...card, flex: "1 1 300px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {b.imagem && (
                <div style={{ position: "relative", height: 120, borderBottom: `1px solid ${c.line}` }}>
                  <Image src={b.imagem} alt={b.titulo} fill style={{ objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ padding: "4px 10px", borderRadius: 999, background: c.chip, color: c.teal, fontSize: 12, fontWeight: 500 }}>{b.nivel}</span>
                  <span style={{ padding: "4px 10px", borderRadius: 999, background: c.chip, color: c.gold, fontSize: 12, fontWeight: 500 }}>{b.fin}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{b.titulo}</h3>
                <div style={{ color: c.muted, fontSize: 14 }}>{b.pais} · Prazo {b.prazo}</div>
                <Link href={b.link ?? `/bolsas/${b.id}`} style={{ color: c.gold, fontWeight: 700, textDecoration: "none" }}>Ver detalhes</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Bolsas em destaque */}
      <section style={wrap}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 30 }}>Bolsas em destaque</h2>
          <Link href="/bolsas" style={{ color: c.gold, fontWeight: 500, textDecoration: "none" }}>Ver todas as bolsas</Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {bolsas.map((b) => (
            <article key={b.id} style={{ ...card, flex: "1 1 300px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {b.imagem && (
                <div style={{ position: "relative", height: 120, borderBottom: `1px solid ${c.line}` }}>
                  <Image src={b.imagem} alt={b.titulo} fill style={{ objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ padding: "4px 10px", borderRadius: 999, background: c.chip, color: c.teal, fontSize: 12, fontWeight: 500 }}>{b.nivel}</span>
                  <span style={{ padding: "4px 10px", borderRadius: 999, background: c.chip, color: c.gold, fontSize: 12, fontWeight: 500 }}>{b.fin}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{b.titulo}</h3>
                <div style={{ color: c.muted, fontSize: 14 }}>{b.pais} · Prazo {b.prazo}</div>
                <Link href={b.link ?? `/bolsas/${b.id}`} style={{ color: c.gold, fontWeight: 700, textDecoration: "none" }}>Ver detalhes</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mentores em destaque */}
      <section style={wrap}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 30 }}>Mentores em destaque</h2>
          <Link href="/mentores" style={{ color: c.gold, fontWeight: 500, textDecoration: "none" }}>Ver todos os mentores</Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {mentores.map((m) => (
            <article key={m.id} style={{ ...card, flex: "1 1 240px", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.chip, border: "1px dashed #3A4F7A", display: "flex", alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 11 }}>
                Foto
              </div>
              <h3 style={{ margin: 0, fontSize: 17 }}>{m.nome}</h3>
              <div style={{ color: c.teal, fontSize: 14 }}>{m.area}</div>
              <div style={{ color: c.muted, fontSize: 14 }}>Bolsa conquistada: [programa]</div>
              <div style={{ fontWeight: 700 }}>[preço] Kz / sessão</div>
              <Link href={`/mentores/${m.id}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, borderRadius: 10, border: "1px solid #3A4F7A", fontWeight: 500, color: c.text, textDecoration: "none" }}>
                Ver perfil
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA para mentores */}
      <section id="mentores" style={{ ...wrap, paddingTop: 32, paddingBottom: 72 }}>
        <div style={{ ...card, border: `1px solid ${c.gold}`, borderRadius: 20, padding: 40, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 28 }}>É mentor? Ofereça mentorias e ajude outros candidatos.</h2>
            <p style={{ margin: 0, color: c.muted }}>Crie o seu perfil, defina preços e horários e receba pedidos de sessões pagas.</p>
          </div>
          <Link href="/entrar?papel=mentor" style={{ ...btnGold, minHeight: 48, padding: "0 26px" }}>Tornar-se mentor</Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer style={{ borderTop: `1px solid ${c.line}`, padding: "48px clamp(16px, 4vw, 48px) 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 40 }}>
          <div style={{ flex: "2 1 280px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>BolsaMentor</div>
            <p style={{ margin: 0, color: c.muted, maxWidth: 320 }}>Bolsas de estudo e mentorias para candidatos em Angola e além.</p>
          </div>
          <div style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 8, color: c.muted }}>
            <strong style={{ color: c.text }}>Explorar</strong>
            <Link href="/bolsas" style={{ color: "inherit", textDecoration: "none" }}>Bolsas</Link>
            <Link href="/mentores" style={{ color: "inherit", textDecoration: "none" }}>Mentores</Link>
          </div>
          <div style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 8, color: c.muted }}>
            <strong style={{ color: c.text }}>Conta</strong>
            <Link href="/entrar" style={{ color: "inherit", textDecoration: "none" }}>Entrar</Link>
            <Link href="/entrar" style={{ color: "inherit", textDecoration: "none" }}>Criar conta</Link>
            <Link href="/painel" style={{ color: "inherit", textDecoration: "none" }}>Painel</Link>
          </div>
          <div style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 8, color: c.muted }}>
            <strong style={{ color: c.text }}>Contacto</strong>
            <span>[email de contacto]</span>
            <span>[telefone]</span>
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: "32px auto 0", color: c.muted, fontSize: 13 }}>
          © {new Date().getFullYear()} BolsaMentor. Nome provisório do projeto.
        </div>
      </footer>
    </div>
  );
}


