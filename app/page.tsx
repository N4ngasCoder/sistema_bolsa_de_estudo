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
  gold: "#34789f",   // AGORA É O AZUL DOS BOTÕES
  teal: "#1D4ED8",   // etiquetas azuis
};

// cores só do cabeçalho + hero (azul marinho)
const navy = {
  bg: "#0A1428",
  bg2: "#0F2347",
  accent: "#2563EB",
  border: "rgba(255,255,255,0.28)",
  soft: "rgba(255,255,255,0.78)",
};

// efeitos de hover (cabeçalho + hero)
const hoverCss = `
  #q::placeholder { color: rgba(255,255,255,0.6); opacity: 1; }

  .logo-link { transition: opacity .2s ease; }
  .logo-link:hover { opacity: .82; }

  .nav-link { transition: color .2s ease; }
  .nav-link:hover { color: #FFFFFF !important; }

  .btn-outline { transition: background .2s ease, border-color .2s ease; }
  .btn-outline:hover {
    background: rgba(255,255,255,0.12) !important;
    border-color: #FFFFFF !important;
  }

  .btn-pill { transition: transform .2s ease, background .2s ease, box-shadow .2s ease, color .2s ease; }
  .btn-pill:hover {
    background: #374151 !important;
    color: #FFFFFF !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35) !important;
  }

  .chip { transition: background .2s ease, border-color .2s ease; }
  .chip:hover {
    background: rgba(255,255,255,0.18) !important;
    border-color: #FFFFFF !important;
  }
`;

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

// botão arredondado (cabeçalho + hero) — mesma cor do botão "Explorar bolsas"
const btnPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "0 24px",
  borderRadius: 999,
  background: "#74d8e9",
  color: "#0A1428",
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 6px 20px rgba(116, 216, 233, 0.35)",
};

const navLink: CSSProperties = {
  color: navy.soft,
  textDecoration: "none",
  fontSize: 15,
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
      <style>{hoverCss}</style>

      {/* Cabeçalho */}
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px clamp(16px, 4vw, 48px)",
          background: navy.bg,
          borderBottom: "1px solid rgba(127, 205, 239, 0.06)",
        }}
      >
        <Link href="/" className="logo-link" style={{ display: "flex", alignItems: "center", gap: 10, color: "#FFFFFF", textDecoration: "none" }}>
          {/* Logotipo antigo (comentado)
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, #60A5FA, ${navy.accent})`, display: "inline-block", boxShadow: "0 4px 14px rgba(37, 99, 235, 0.45)" }} />
          */}
          {/* Logotipo igual ao do canto esquerdo do footer */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E9BE74" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9l10-5 10 5-10 5L2 9z" />
            <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
            <path d="M22 9v6" />
          </svg>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <strong style={{ fontSize: 20, letterSpacing: "-0.01em" }}>BEESTUDO</strong>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Bolsas que transformam vidas</span>
          </span>
        </Link>
        
        {/* NAVbar  */}
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 32, fontWeight: 500 }}>
          <Link href="/bolsas" className="nav-link" style={navLink}>Bolsas</Link>
          <Link href="/mentores" className="nav-link" style={navLink}>Mentores</Link>
          <a href="#como" className="nav-link" style={navLink}>Como funciona</a>
          <a href="#mentores" className="nav-link" style={navLink}>Para mentores</a>
        </nav>

     
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
  <Link
    href="/entrar"
    className="btn-outline"
    style={{
      display: "inline-flex",
      alignItems: "center",
      minHeight: 44,
      padding: "0 24px",
      fontWeight: 500,
      color: "#FFFFFF",
      textDecoration: "none",
      borderRadius: 999,
      border: `1px solid ${navy.border}`,
    }}
  >
    Entrar
  </Link>

  <Link href="/cadastro" className="btn-pill" style={btnPill}>
    Criar conta
  </Link>
</div>

      </header>

      {/* Hero */}
      <section
        style={{
          ...wrap,
          maxWidth: "none",
          margin: 0,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 48,
          paddingTop: 72,
          paddingBottom: 88,
          paddingLeft: "max(clamp(16px, 4vw, 48px), calc((100% - 1280px) / 2 + 48px))",
          paddingRight: "max(clamp(16px, 4vw, 48px), calc((100% - 1280px) / 2 + 48px))",
          minHeight: 560,
          // background: `linear-gradient(100deg, ${navy.bg} 0%, ${navy.bg2} 60%, ${navy.bg} 100%)`, // (antigo, comentado)
          background: navy.bg, // mesma cor do footer e dos cards escuros (#0A1428)
        }}
      >
        <div style={{ flex: "1 1 520px", maxWidth: 640, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          
          <span style={{ color: navy.soft, fontSize: 13, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" }}>
            Sonha • Estuda • Conquista
          </span>

          <h1 style={{ margin: 0, color: "#FFFFFF", fontSize: "clamp(36px, 5.2vw, 60px)", lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 800 }}>
  O seu futuro começa com uma <span style={{ color: "#74cee9" }}>bolsa de estudo</span>
</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: 18, lineHeight: 1.65, maxWidth: 560 }}>
           Conectamos estudantes a oportunidades reais de bolsas de estudo, no país e no estrangeiro. Estude o que ama, construa o amanhã.
          </p>

         

          <form
            action="/bolsas"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              padding: 6,
              maxWidth: 620,
              borderRadius: 32,
              border: `1px solid ${navy.border}`,
              background: "rgba(10, 20, 40, 0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <label htmlFor="q" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Pesquisar bolsa, curso ou país
            </label>
            <input
              id="q"
              name="q"
              type="text"
              placeholder="Pesquisar bolsa, curso ou país"
              style={{ ...field, flex: "2 1 220px", background: "transparent", border: "none", color: "#FFFFFF", borderRadius: 999, paddingLeft: 20 }}
            />
            

            <label htmlFor="nivel" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              Nível de estudo
            </label>
            {/*<select
              id="nivel"
              name="nivel"
              style={{ ...field, flex: "1 1 140px", background: "transparent", border: "none", borderLeft: `1px solid ${navy.border}`, borderRadius: 0, color: navy.soft, colorScheme: "dark" }}
            >
              <option value="">Todos os níveis</option>
              <option>Licenciatura</option>
              <option>Mestrado</option>
              <option>Doutoramento</option>
            </select>*/}
            <button type="submit" className="btn-pill" style={{ ...btnPill, minHeight: 48, padding: "0 30px", border: "none", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
              Procurar
            </button>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
            {/*<span>Atalhos:</span>*/}
            {atalhos.map((a) => (
              <Link key={a} href={`/bolsas?nivel=${encodeURIComponent(a)}`} className="chip" style={{ padding: "6px 14px", borderRadius: 999, border: `1px solid ${navy.border}`, background: "rgba(255,255,255,0.05)", color: "#FFFFFF", textDecoration: "none" }}>
                {a}
              </Link>
            ))}
          </div>
        </div>

<div
  style={{
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(62%, 820px)",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
    maskImage: "linear-gradient(to right, transparent 0%, #000 38%)",
  }}
>

  {/* Imagem principal */}
  <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 0, overflow: "hidden" }}>
    <Image
      src="/imagem_principal.jpg"
      alt="Estudantes a preparar candidaturas a bolsas"
      fill
      priority
      style={{ objectFit: "cover", objectPosition: "70% center" }}
    />
  </div>

  

</div>
      </section>

      {/* ================= NOVO CÓDIGO: INÍCIO (igual à imagem) ================= */}
      <style>{`
        .nv-btn { transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease, color .2s ease; }
        .nv-btn-dark:hover { background: #16263F !important; transform: translateY(-2px); }
        .nv-btn-outline:hover { background: rgba(255,255,255,0.12) !important; border-color: #FFFFFF !important; transform: translateY(-2px); }
        .nv-btn-gold:hover { background: #374151 !important; color: #FFFFFF !important; transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,0,0,0.35) !important; }
        .nv-feature { transition: transform .2s ease, box-shadow .2s ease; }
        .nv-feature:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(10,20,40,0.08); }
        .nv-card { transition: transform .2s ease, box-shadow .2s ease; }
        .nv-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(0,0,0,0.35); }
        .nv-foot-link { transition: color .2s ease; }
        .nv-foot-link:hover { color: #E9BE74 !important; }
        .nv-social { transition: color .2s ease, transform .2s ease; }
        .nv-social:hover { color: #687979 !important; transform: translateY(-2px); }
      `}</style>

      {/* Por que escolher */}
      <section style={{ background: "#FBFAF7" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px clamp(16px, 4vw, 48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 56 }}>
          <div style={{ flex: "1 1 340px", maxWidth: 440, display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0A1428" }}>
              Porque escolher a BEESTUDO?
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 3.6vw, 40px)", lineHeight: 1.15, fontWeight: 800, letterSpacing: "-0.01em", color: "#0A1428" }}>
              Mais do que uma bolsa,<br />é um novo horizonte.
            </h2>
            <p style={{ margin: 0, color: "#4A5568", fontSize: 15, lineHeight: 1.7 }}>
              Acreditamos no poder da educação para mudar vidas. Por isso, oferecemos uma plataforma completa, segura e fácil de usar, com as melhores oportunidades de bolsas de estudo, nacionais e internacionais.
            </p>
            <Link
              href="/bolsas"
              className="nv-btn nv-btn-dark"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, minHeight: 46, padding: "0 24px", borderRadius: 999, background: "#0A1428", color: "#FFFFFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              Saiba mais
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>

          <div style={{ flex: "1 1 520px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                titulo: "Várias oportunidades",
                texto: "Acesso a bolsas de estudo em diversas áreas e países.",
                icone: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                ),
              },
              {
                titulo: "Processo seguro",
                texto: "Informações verificadas e parceiros confiáveis.",
                icone: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z" /></svg>
                ),
              },
              {
                titulo: "Orientação personalizada",
                texto: "Receba recomendações de acordo com o seu perfil e objetivos.",
                icone: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-6-4-6 4V3z" /></svg>
                ),
              },
              {
                titulo: "Suporte completo",
                texto: "Tire dúvidas e receba ajuda do início ao fim.",
                icone: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="2" /><rect x="17" y="14" width="4" height="6" rx="2" /><path d="M19 20c0 1.5-2 2-5 2" /></svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.titulo}
                className="nv-feature"
                style={{ background: "#FFFFFF", border: "1px solid #E8E4DC", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FBEBD0", color: "#0A1428", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f.icone}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0A1428" }}>{f.titulo}</h3>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#5B6572" }}>{f.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bolsas em destaque (escuro) */}
      <section style={{ background: "#0A1428" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px clamp(16px, 4vw, 48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "1 1 260px", maxWidth: 300, display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFFFFF" }}>
              Bolsas em destaque
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(26px, 3vw, 32px)", lineHeight: 1.2, fontWeight: 700, color: "#FFFFFF" }}>
              Encontre a bolsa ideal para o seu perfil
            </h2>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>
              Explore algumas das oportunidades mais recentes e comece a sua jornada rumo ao futuro.
            </p>
            <Link
              href="/bolsas"
              className="nv-btn nv-btn-outline"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, minHeight: 44, padding: "0 22px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.6)", color: "#FFFFFF", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              Ver todas as bolsas
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>

          <div style={{ flex: "1 1 640px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { img: "/alemanha.webp", fundo: "linear-gradient(135deg, #C9B79A, #7C8AA5)", tag: "Internacional", tagCor: "#2F5DBE", titulo: "Bolsas de Mestrado na Alemanha", inst: "Universidade de Munique", nivel: "Mestrado", area: "Todas as áreas", prazo: "30 Abr 2026" },
              { img: "/agostinho.webp", fundo: "linear-gradient(135deg, #9DB7C9, #5E7F6A)", tag: "Nacional", tagCor: "#5FAE86", titulo: "Bolsa de Estudo para Licenciatura", inst: "Universidade Agostinho Neto", nivel: "Licenciatura", area: "Engenharia Informática", prazo: "15 Mai 2026" },
              { img: "/coimbra.webp", fundo: "linear-gradient(135deg, #A8C4A0, #6F8FA8)", tag: "Internacional", tagCor: "#2F5DBE", titulo: "Bolsas de Doutoramento no Canadá", inst: "University of Toronto", nivel: "Doutoramento", area: "Ciências e Tecnologia", prazo: "20 Fev 2026" },
            ].map((b) => (
              <Link
                key={b.titulo}
                href="/bolsas"
                className="nv-card"
                style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: 10, overflow: "hidden", color: "#0A1428", textDecoration: "none" }}
              >
                <div style={{ position: "relative", height: 150, background: b.fundo }}>
                  <Image src={b.img} alt="" fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: 0, right: 0, padding: "4px 12px", borderRadius: "0 0 0 8px", background: b.tagCor, color: "#FFFFFF", fontSize: 11, fontWeight: 600 }}>
                    {b.tag}
                  </span>
                </div>
                <div style={{ padding: "14px 14px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0A1428" }}>{b.titulo}</h3>
                  <span style={{ fontSize: 12, color: "#6B7686" }}>{b.inst}</span>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 6, fontSize: 12, color: "#3F4A5A" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" /></svg>
                      {b.nivel}
                    </span>
                    <span style={{ width: 1, height: 12, background: "#D5D9E0" }} />
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 21c0-4 3-6 7-6s7 2 7 6" /></svg>
                      {b.area}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "auto", borderTop: "1px solid #EDEFF3", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "#6B7686" }}>
                  <span>
                    Candidaturas até <strong style={{ color: "#0A1428", fontWeight: 600 }}>{b.prazo}</strong>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section style={{ background: "#FBF6EF", display: "flex", flexWrap: "wrap", alignItems: "stretch", overflow: "hidden" }}>
        <div style={{ flex: "1 1 420px", padding: "48px clamp(16px, 4vw, 64px)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
          {/* Círculo da foto à esquerda (comentado)
          <div style={{ position: "relative", width: 82, height: 82, flex: "0 0 82px", borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg, #E9C9A8, #B98A62)" }}>
            <Image src="/ana-silva.jpg" alt="Ana Silva" fill sizes="82px" style={{ objectFit: "cover" }} />
          </div>
          */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 340 }}>
            <span style={{ color: "", fontSize: 44, lineHeight: 1, height: 24, fontFamily: "Georgia, serif", fontWeight: 700 }}>“</span>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#1F2937" }}>
              “Graças à BEestudo, consegui uma bolsa para estudar fora do país. Foi a melhor decisão da minha vida!”
            </p>
            <div>
              <strong style={{ fontSize: 13, color: "#0A1428" }}></strong>
              <div style={{ fontSize: 12, color: "#6B7686" }}></div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A1428" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9CED6" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9CED6" }} />
            </div>
          </div>
        </div>

        <div style={{ flex: "1 1 420px", position: "relative", minHeight: 260, borderTopLeftRadius: "70% 100%", overflow: "hidden", background: "linear-gradient(135deg, #08465c 0%, #6ec4e3 45%, #2A3550 100%)" }}>
          <Image src="/de costa.webp" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center bottom" }} />
          <div style={{ position: "absolute", top: 32, right: "clamp(16px, 4vw, 48px)", textAlign: "right", color: "#fff", fontFamily: "'Segoe Script', 'Brush Script MT', cursive", fontStyle: "italic", fontSize: 22, lineHeight: 1.2, maxWidth: 240 }}>
            Grandes sonhos<br />começam com<br />boas oportunidades.
            <svg width="190" height="12" viewBox="0 0 190 12" style={{ display: "block", marginLeft: "auto", marginTop: 6 }}>
              <path d="M2 8 C 50 2, 120 2, 188 6" fill="none" stroke="#4395bd" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Chamada final */}
      <section
        style={{
          textAlign: "center",
          padding: "64px 24px 72px",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 220' preserveAspectRatio='none'%3E%3Cpath fill='%2317243D' d='M0 120 L140 70 L300 110 L460 50 L620 100 L780 60 L940 105 L1100 55 L1260 100 L1440 70 L1440 220 L0 220 Z'/%3E%3Cpath fill='%230F1A30' d='M0 160 L180 120 L340 150 L520 105 L700 145 L880 115 L1060 150 L1240 120 L1440 155 L1440 220 L0 220 Z'/%3E%3C/svg%3E"), linear-gradient(180deg, #1C2A45 0%, #0A1428 100%)`,
          backgroundSize: "100% 75%, 100% 100%",
          backgroundPosition: "bottom, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFFFFF" }}>
            Pronto para dar o próximo passo?
          </span>
          <h2 style={{ margin: 0, fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF" }}>
            O seu futuro não espera.
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
            Explore as bolsas disponíveis e comece hoje a construir a vida que sempre quis.
          </p>
          <Link
            href="/bolsas"
            className="nv-btn nv-btn-gold"
            style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 10, minHeight: 46, padding: "0 28px", borderRadius: 999, background: "#74d8e9", color: "#0A1428", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
          >
            Explorar bolsas
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>

      {/* Rodapé novo */}
      <footer style={{ background: "#0A1428", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px clamp(16px, 4vw, 48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "#FFFFFF", textDecoration: "none" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E9BE74" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9l10-5 10 5-10 5L2 9z" />
              <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
              <path d="M22 9v6" />
            </svg>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <strong style={{ fontSize: 16 }}>BEESTUDO</strong>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Bolsas que transformam vidas</span>
            </span>
          </Link>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: 36 }}>
            {[
              { t: "Início", h: "/" },
              { t: "Bolsas", h: "/bolsas" },
              { t: "Sobre nós", h: "/sobre" },
              { t: "Recursos", h: "/recursos" },
              { t: "FAQ", h: "/faq" },
            ].map((l) => (
              <Link key={l.t} href={l.h} className="nv-foot-link" style={{ color: "#FFFFFF", fontSize: 12, textDecoration: "none" }}>
                {l.t}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <div style={{ display: "flex", gap: 14, color: "#FFFFFF" }}>
              <a href="#" aria-label="Instagram" className="nv-social" style={{ color: "inherit", display: "inline-flex" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="nv-social" style={{ color: "inherit", display: "inline-flex" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .8 2 2.2V16" /></svg>
              </a>
              <a href="#" aria-label="YouTube" className="nv-social" style={{ color: "inherit", display: "inline-flex" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" /></svg>
              </a>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
              © {new Date().getFullYear()} BEESTUDO. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </footer>
      {/* ================= NOVO CÓDIGO: FIM ================= */}

      {/* ===== A PARTIR DAQUI ESTÁ TUDO COMENTADO (de "Como funciona" até ao footer) ===== */}

      {/* Como funciona */}
      {/*
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
      */}

      {/* Bolsas em destaque */}
      {/*
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
      */}
      {/* Bolsas em destaque */}
      {/*
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
      */}

      {/* Mentores em destaque */}
      {/*
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
      */}

      {/* CTA para mentores */}
      {/*
      <section id="mentores" style={{ ...wrap, paddingTop: 32, paddingBottom: 72 }}>
        <div style={{ ...card, border: `1px solid ${c.gold}`, borderRadius: 20, padding: 40, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 28 }}>É mentor? Ofereça mentorias e ajude outros candidatos.</h2>
            <p style={{ margin: 0, color: c.muted }}>Crie o seu perfil, defina preços e horários e receba pedidos de sessões pagas.</p>
          </div>
          <Link href="/entrar?papel=mentor" style={{ ...btnGold, minHeight: 48, padding: "0 26px" }}>Tornar-se mentor</Link>
        </div>
      </section>
      */}

      {/* Rodapé */}
      {/*
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
      */}
    </div>
  );
}