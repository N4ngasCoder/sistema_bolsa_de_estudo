
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Ano from "@/components/Ano";

export default function EntrarPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [manterSessao, setManterSessao] = useState(false);
  const [erro, setErro] = useState("");
  const [aCarregar, setACarregar] = useState(false);
  const router = useRouter();

  async function submeterFormulario(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setErro("");

    if (!email.trim() || !password) {
      setErro("Preenche o email e a palavra-passe.");
      return;
    }

    setACarregar(true);
    try {
      const res = await fetch("/api/entrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password, manterSessao }),
      });
      const dados = await res.json();
      if (!res.ok) {
        setErro((dados.erro ?? "Não foi possível entrar.") + (dados.detalhe ? ` — ${dados.detalhe}` : ""));
        return;
      }
      router.push(dados.role === "ADMIN" ? "/admin/solicitacoes" : "/dashboard");
      router.refresh();
    } catch {
      setErro("Erro de ligação. Tenta novamente.");
    } finally {
      setACarregar(false);
    }
  }

  const estiloCampo: React.CSSProperties = {
    width: "100%",
    minHeight: 48,
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #D5DEEF",
    borderRadius: 10,
    background: "#FFFFFF",
    color: "#0F1B33",
    fontSize: 15,
    fontFamily: "inherit",
    outlineColor: "#1D4ED8",
  };

  const estiloLabel: React.CSSProperties = {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#0F1B33",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#F5F8FF",
        color: "#0F1B33",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navegação */}
      <header
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "22px 6%",
          borderBottom: "1px solid #E2E8F5",
          background: "#FFFFFF",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#1D4ED8",
            fontSize: 21,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          BolsaMentor
        </Link>
      </header>

      {/* Formulário */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: 440,
            padding: "clamp(24px, 5vw, 36px)",
            boxSizing: "border-box",
            border: "1px solid #E2E8F5",
            borderRadius: 18,
            background: "#FFFFFF",
            boxShadow: "0 12px 40px rgba(15, 27, 51, 0.06)",
          }}
        >
          {/* Cabeçalho do formulário */}
          <div style={{ marginBottom: 30 }}>
            <div
              style={{
                display: "inline-block",
                marginBottom: 16,
                padding: "7px 12px",
                borderRadius: 8,
                background: "#E8EFFD",
                color: "#1D4ED8",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              BEM-VINDO DE VOLTA
            </div>

            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(28px, 5vw, 34px)",
                lineHeight: 1.2,
              }}
            >
              Entrar na tua conta
            </h1>

            <p
              style={{
                margin: 0,
                color: "#5B6B87",
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              Acede à tua conta e continua a explorar
              oportunidades académicas.
            </p>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div
              role="alert"
              style={{
                marginBottom: 20,
                padding: 14,
                border: "1px solid #FECACA",
                borderRadius: 10,
                background: "#FEF2F2",
                color: "#B91C1C",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {erro}
            </div>
          )}

          <form
            onSubmit={submeterFormulario}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Email */}
            <div>
              <label htmlFor="email" style={estiloLabel}>
                Endereço de email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErro("");
                }}
                placeholder="exemplo@email.com"
                autoComplete="email"
                required
                style={estiloCampo}
              />
            </div>

            {/* Palavra-passe */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <label
                  htmlFor="password"
                  style={{ ...estiloLabel, marginBottom: 0 }}
                >
                  Palavra-passe
                </label>

                <Link
                  href="/recuperar-password"
                  style={{
                    color: "#1D4ED8",
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Esqueceste-te?
                </Link>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  name="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErro("");
                  }}
                  placeholder="Introduz a tua palavra-passe"
                  autoComplete="current-password"
                  required
                  style={{
                    ...estiloCampo,
                    paddingRight: 85,
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                  aria-label={
                    mostrarPassword
                      ? "Ocultar palavra-passe"
                      : "Mostrar palavra-passe"
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    padding: "6px 0",
                    border: "none",
                    background: "transparent",
                    color: "#1D4ED8",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {mostrarPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            {/* Manter sessão */}
            <label
              htmlFor="manterSessao"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#475569",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <input
                id="manterSessao"
                name="manterSessao"
                type="checkbox"
                checked={manterSessao}
                onChange={(e) =>
                  setManterSessao(e.target.checked)
                }
                style={{ accentColor: "#1D4ED8" }}
              />

              Manter sessão iniciada
            </label>

            {/* Botão de entrada */}
            <button
              type="submit"
              disabled={aCarregar}
              style={{
                width: "100%",
                minHeight: 50,
                padding: "14px 20px",
                border: "none",
                borderRadius: 10,
                background: "#1D4ED8",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {aCarregar ? "A entrar..." : "Entrar"}
            </button>
          </form>

          {/* Separador */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "26px 0",
              color: "#94A3B8",
              fontSize: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "#E2E8F5",
              }}
            />

            OU

            <div
              style={{
                flex: 1,
                height: 1,
                background: "#E2E8F5",
              }}
            />
          </div>

          {/* Cadastro */}
          <p
            style={{
              margin: 0,
              textAlign: "center",
              color: "#5B6B87",
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            Ainda não tens uma conta?{" "}
            <Link
              href="/cadastro"
              style={{
                color: "#1D4ED8",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Criar conta
            </Link>
          </p>

          <Link
            href="/"
            style={{
              display: "block",
              marginTop: 24,
              textAlign: "center",
              color: "#64748B",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            ← Voltar à página inicial
          </Link>
        </section>
      </div>

      {/* Rodapé */}
      <footer
        style={{
          padding: "20px 16px",
          textAlign: "center",
          color: "#64748B",
          fontSize: 13,
        }}
      >
        © <Ano /> BolsaMentor. Todos os
        direitos reservados.
      </footer>
    </main>
  );
}