
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Ano from "@/components/Ano";

function CadastroFormulario() {
  const searchParams = useSearchParams();

  const [formulario, setFormulario] = useState({
    nome: "",
    apelido: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    genero: "",
    pais: "Angola",
    cidade: "",
    papel:
      searchParams.get("papel") === "mentor"
        ? "mentor"
        : "estudante",
    instituicao: "",
    nivel: "",
    area: "",
    password: "",
    confirmarPassword: "",
    termos: false,
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [aCarregar, setACarregar] = useState(false);

  function atualizarCampo(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    const novoValor =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: novoValor,
    }));

    setErro("");
    setSucesso(false);
  }

  async function submeterFormulario(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErro("");
    setSucesso(false);

    if (formulario.password.length < 8) {
      setErro(
        "A palavra-passe deve ter pelo menos 8 caracteres."
      );
      return;
    }

    if (
      formulario.password !== formulario.confirmarPassword
    ) {
      setErro("As palavras-passe não coincidem.");
      return;
    }

    if (!formulario.termos) {
      setErro(
        "Deves aceitar os termos de utilização e a política de privacidade."
      );
      return;
    }

    setACarregar(true);
    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: `${formulario.nome} ${formulario.apelido}`.trim(),
          email: formulario.email,
          senha: formulario.password,
          papel: formulario.papel,
          telefone: formulario.telefone,
          dataNascimento: formulario.dataNascimento,
          genero: formulario.genero,
          pais: formulario.pais,
          cidade: formulario.cidade,
          instituicao: formulario.instituicao,
          nivel: formulario.nivel,
          area: formulario.area,
        }),
      });
      const dados = await res.json();
      if (!res.ok) {
        setErro((dados.erro ?? "Não foi possível criar a conta.") + (dados.detalhe ? ` — ${dados.detalhe}` : ""));
        return;
      }
      setSucesso(true);
      setTimeout(() => (window.location.href = "/entrar"), 1500);
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

  const estiloGrupo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const estiloSecao: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 24,
    border: "1px solid #E2E8F5",
    borderRadius: 16,
    background: "#FFFFFF",
  };

  const estiloGrelha: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: 18,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "36px 16px 60px",
        background: "#F5F8FF",
        color: "#0F1B33",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* Navegação */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            color: "#1D4ED8",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Voltar à página inicial
        </Link>

        {/* Cabeçalho */}
        <header style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "inline-block",
              marginBottom: 12,
              padding: "7px 12px",
              borderRadius: 8,
              background: "#E8EFFD",
              color: "#1D4ED8",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            BolsaMentor
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(30px, 5vw, 40px)",
              lineHeight: 1.2,
            }}
          >
            Cria a tua conta
          </h1>

          <p
            style={{
              margin: 0,
              color: "#5B6B87",
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            Regista-te para descobrires bolsas de estudo,
            oportunidades académicas e serviços de mentoria.
          </p>
        </header>

        {/* Mensagem de erro */}
        {erro && (
          <div
            role="alert"
            style={{
              marginBottom: 20,
              padding: 16,
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

        {/* Mensagem de sucesso */}
        {sucesso && (
          <div
            role="status"
            style={{
              marginBottom: 20,
              padding: 16,
              border: "1px solid #A7F3D0",
              borderRadius: 10,
              background: "#ECFDF5",
              color: "#047857",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <strong>Conta criada com sucesso!</strong>
            <br />
            Vais ser redirecionado para a página de entrada...
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
          {/* 1. Dados pessoais */}
          <section style={estiloSecao}>
            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: 21,
                }}
              >
                1. Dados pessoais
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#5B6B87",
                  fontSize: 14,
                }}
              >
                Informa-nos sobre ti.
              </p>
            </div>

            <div style={estiloGrelha}>
              <div style={estiloGrupo}>
                <label htmlFor="nome" style={estiloLabel}>
                  Nome próprio *
                </label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  placeholder="O teu nome"
                  autoComplete="given-name"
                  required
                  style={estiloCampo}
                />
              </div>

              <div style={estiloGrupo}>
                <label htmlFor="apelido" style={estiloLabel}>
                  Apelido *
                </label>

                <input
                  id="apelido"
                  name="apelido"
                  type="text"
                  value={formulario.apelido}
                  onChange={atualizarCampo}
                  placeholder="O teu apelido"
                  autoComplete="family-name"
                  required
                  style={estiloCampo}
                />
              </div>

              <div style={estiloGrupo}>
                <label
                  htmlFor="dataNascimento"
                  style={estiloLabel}
                >
                  Data de nascimento
                </label>

                <input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  value={formulario.dataNascimento}
                  onChange={atualizarCampo}
                  autoComplete="bday"
                  style={estiloCampo}
                />
              </div>

              <div style={estiloGrupo}>
                <label htmlFor="genero" style={estiloLabel}>
                  Género (opcional)
                </label>

                <select
                  id="genero"
                  name="genero"
                  value={formulario.genero}
                  onChange={atualizarCampo}
                  style={estiloCampo}
                >
                  <option value="">
                    Prefiro não indicar
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </section>

          {/* 2. Contactos */}
          <section style={estiloSecao}>
            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: 21,
                }}
              >
                2. Contactos
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#5B6B87",
                  fontSize: 14,
                }}
              >
                Como poderemos entrar em contacto contigo?
              </p>
            </div>

            <div style={estiloGrupo}>
              <label htmlFor="email" style={estiloLabel}>
                Endereço de email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formulario.email}
                onChange={atualizarCampo}
                placeholder="exemplo@email.com"
                autoComplete="email"
                required
                style={estiloCampo}
              />
            </div>

            <div style={estiloGrupo}>
              <label htmlFor="telefone" style={estiloLabel}>
                Número de telefone
              </label>

              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={formulario.telefone}
                onChange={atualizarCampo}
                placeholder="+244 9XX XXX XXX"
                autoComplete="tel"
                style={estiloCampo}
              />
            </div>

            <div style={estiloGrelha}>
              <div style={estiloGrupo}>
                <label htmlFor="pais" style={estiloLabel}>
                  País *
                </label>

                <input
                  id="pais"
                  name="pais"
                  type="text"
                  value={formulario.pais}
                  onChange={atualizarCampo}
                  autoComplete="country-name"
                  required
                  style={estiloCampo}
                />
              </div>

              <div style={estiloGrupo}>
                <label htmlFor="cidade" style={estiloLabel}>
                  Cidade
                </label>

                <input
                  id="cidade"
                  name="cidade"
                  type="text"
                  value={formulario.cidade}
                  onChange={atualizarCampo}
                  placeholder="Ex.: Luanda"
                  autoComplete="address-level2"
                  style={estiloCampo}
                />
              </div>
            </div>
          </section>

          {/* 3. Perfil académico e profissional */}
          <section style={estiloSecao}>
            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: 21,
                }}
              >
                3. Perfil da conta
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#5B6B87",
                  fontSize: 14,
                }}
              >
                Escolhe como pretendes utilizar a plataforma.
              </p>
            </div>

            <div style={estiloGrupo}>
              <label htmlFor="papel" style={estiloLabel}>
                Tipo de conta *
              </label>

              <select
                id="papel"
                name="papel"
                value={formulario.papel}
                onChange={atualizarCampo}
                required
                style={estiloCampo}
              >
                <option value="estudante">Estudante</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <div style={estiloGrupo}>
              <label
                htmlFor="instituicao"
                style={estiloLabel}
              >
                Universidade ou instituição
              </label>

              <input
                id="instituicao"
                name="instituicao"
                type="text"
                value={formulario.instituicao}
                onChange={atualizarCampo}
                placeholder="Nome da instituição"
                style={estiloCampo}
              />
            </div>

            <div style={estiloGrelha}>
              <div style={estiloGrupo}>
                <label htmlFor="nivel" style={estiloLabel}>
                  Nível académico
                </label>

                <select
                  id="nivel"
                  name="nivel"
                  value={formulario.nivel}
                  onChange={atualizarCampo}
                  style={estiloCampo}
                >
                  <option value="">Selecionar nível</option>
                  <option value="medio">Ensino médio</option>
                  <option value="licenciatura">
                    Licenciatura
                  </option>
                  <option value="mestrado">Mestrado</option>
                  <option value="doutoramento">
                    Doutoramento
                  </option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div style={estiloGrupo}>
                <label htmlFor="area" style={estiloLabel}>
                  Área de estudo ou especialidade
                </label>

                <input
                  id="area"
                  name="area"
                  type="text"
                  value={formulario.area}
                  onChange={atualizarCampo}
                  placeholder="Ex.: Informática"
                  style={estiloCampo}
                />
              </div>
            </div>

            {formulario.papel === "mentor" && (
              <div
                style={{
                  padding: 16,
                  borderRadius: 10,
                  background: "#EFF6FF",
                  color: "#1E40AF",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                <strong>Perfil de mentor</strong>
                <br />
                Poderás adicionar posteriormente a tua
                experiência, as bolsas conquistadas, os preços
                e os horários das sessões de mentoria.
              </div>
            )}
          </section>

          {/* 4. Segurança */}
          <section style={estiloSecao}>
            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: 21,
                }}
              >
                4. Segurança da conta
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#5B6B87",
                  fontSize: 14,
                }}
              >
                Cria uma palavra-passe para proteger a tua conta.
              </p>
            </div>

            <div style={estiloGrupo}>
              <label
                htmlFor="password"
                style={estiloLabel}
              >
                Palavra-passe *
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formulario.password}
                onChange={atualizarCampo}
                placeholder="Mínimo de 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                required
                style={estiloCampo}
              />

              <small
                style={{
                  marginTop: 5,
                  color: "#5B6B87",
                }}
              >
                Recomendamos uma combinação de letras,
                números e símbolos.
              </small>
            </div>

            <div style={estiloGrupo}>
              <label
                htmlFor="confirmarPassword"
                style={estiloLabel}
              >
                Confirmar palavra-passe *
              </label>

              <input
                id="confirmarPassword"
                name="confirmarPassword"
                type="password"
                value={formulario.confirmarPassword}
                onChange={atualizarCampo}
                placeholder="Introduz novamente a palavra-passe"
                autoComplete="new-password"
                minLength={8}
                required
                style={estiloCampo}
              />
            </div>
          </section>

          {/* 5. Termos e criação da conta */}
          <section style={estiloSecao}>
            <label
              htmlFor="termos"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              <input
                id="termos"
                name="termos"
                type="checkbox"
                checked={formulario.termos}
                onChange={atualizarCampo}
                required
                style={{
                  marginTop: 5,
                  accentColor: "#1D4ED8",
                }}
              />

              <span>
                Aceito os termos de utilização e a política de
                privacidade do BolsaMentor. *
              </span>
            </label>

            <button
              type="submit"
              disabled={aCarregar || sucesso}
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
              {aCarregar ? "A criar conta..." : "Criar a minha conta"}
            </button>

            <p
              style={{
                margin: 0,
                textAlign: "center",
                fontSize: 14,
                color: "#5B6B87",
              }}
            >
              Já tens uma conta?{" "}
              <Link
                href="/entrar"
                style={{
                  color: "#1D4ED8",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Entrar
              </Link>
            </p>
          </section>
        </form>

        {/* Rodapé */}
        <footer
          style={{
            marginTop: 28,
            textAlign: "center",
            color: "#5B6B87",
            fontSize: 13,
          }}
        >
          © <Ano /> BolsaMentor
        </footer>
      </div>
    </main>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={null}>
      <CadastroFormulario />
    </Suspense>
  );
}
