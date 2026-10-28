
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
<<<<<<< HEAD
    termos: false,
=======
    // termos: false, // (antigo, comentado)
    termos: true, // a caixa dos termos está comentada, por isso já vem aceite
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
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
<<<<<<< HEAD
    minHeight: 48,
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #D5DEEF",
    borderRadius: 10,
    background: "#FFFFFF",
    color: "#0F1B33",
    fontSize: 15,
=======
    minHeight: 46,
    boxSizing: "border-box",
    padding: "12px 14px",
    // border: "1px solid #D5DEEF", // (antigo, comentado)
    border: "1px solid #E6ECF8",
    borderRadius: 10,
    background: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(15, 35, 71, 0.10)", // sombra suave como na imagem
    color: "#0F1B33",
    fontSize: 14,
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
    fontFamily: "inherit",
    outlineColor: "#1D4ED8",
  };

  const estiloLabel: React.CSSProperties = {
    display: "block",
<<<<<<< HEAD
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#0F1B33",
=======
    // marginBottom: 8, // (antigo, comentado)
    marginBottom: 6,
    // fontSize: 14, // (antigo, comentado)
    fontSize: 12,
    fontWeight: 700,
    // color: "#0F1B33", // (antigo, comentado)
    color: "#0F2347",
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
  };

  const estiloGrupo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

<<<<<<< HEAD
=======
  /* Secção antiga (cartão com borda própria) — comentada
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
  const estiloSecao: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 24,
    border: "1px solid #E2E8F5",
    borderRadius: 16,
    background: "#FFFFFF",
  };
<<<<<<< HEAD
=======
  */

  // Secção nova: sem cartão próprio, separada por uma linha fina (tudo dentro do cartão único)
  const estiloSecao: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    padding: "22px 0 0",
    borderTop: "1px solid #E8EDF7",
    background: "transparent",
  };
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2

  const estiloGrelha: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: 18,
<<<<<<< HEAD
=======
    alignItems: "start",
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "36px 16px 60px",
<<<<<<< HEAD
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
=======
        // background: "#F5F8FF", // (antigo, comentado)
        background: "linear-gradient(180deg, #253757 0%, #909eba 100%)", // paleta escura igual às outras páginas
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Efeito hover escuro nos botões */}
      <style>{`
        .btn-escuro { transition: background .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease; }
        .btn-escuro:hover:not(:disabled) {
          background: #374151 !important;
          color: #FFFFFF !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35);
        }
        .link-voltar { transition: color .2s ease; }
        .link-voltar:hover { color: #FFFFFF !important; }
      `}</style>

      <div
        style={{
          width: "100%",
          // maxWidth: 760, // (antigo, comentado)
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {/* Navegação — "Voltar" antigo (comentado, agora está ao lado do botão Entrar)
        <Link
          href="/"
          className="link-voltar"
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
<<<<<<< HEAD
            color: "#1D4ED8",
=======
            // color: "#1D4ED8", // (antigo, comentado)
            color: "#74cee9",
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Voltar à página inicial
        </Link>
<<<<<<< HEAD

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
=======
        */}

        {/* Cartão único do formulário (como na imagem) */}
        <div
          style={{
            boxSizing: "border-box",
            padding: "clamp(22px, 5vw, 36px)",
            borderRadius: 20,
            background: "#3A4F7A",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Cabeçalho */}
          <header
            style={{
              marginBottom: 24,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ flex: "1 1 260px", minWidth: 0 }}>
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
              
              </div>

              <h1
                style={{
                  margin: "0 0 12px",
                  fontSize: "clamp(30px, 5vw, 40px)",
                  lineHeight: 1.2,
                  // sublinhado curto na cor do botão, como na imagem
                  paddingBottom: 10,
                  backgroundImage: "linear-gradient(#74cee9, #74cee9)",
                  backgroundSize: "56px 4px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  display: "inline-block",
                }}
              >
                Cadastra-se
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#5B6B87",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              >
              
              </p>
            </div>

            {/* Botões "Voltar" e "Entrar" lado a lado, no canto superior direito */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 10,
              }}
            >
              {/* Botão Voltar (mesma cor, borda e hover do botão Entrar) */}
              <Link
                href="/"
                className="btn-escuro"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 36,
                  padding: "0 18px",
                  borderRadius: 8,
                  background: "#74cee9",
                  color: "#0A1428",
                  fontSize: 13,
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
<<<<<<< HEAD
                Entrar
              </Link>
            </p>
          </section>
        </form>
=======
                ← Voltar
              </Link>

              {/* Botão "Entrar" */}
              <Link
                href="/entrar"
                className="btn-escuro"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 36,
                  padding: "0 18px",
                  borderRadius: 8,
                  background: "#74cee9",
                  color: "#0A1428",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
              Entrar
              </Link>
            </div>
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
             
            </div>
          )}

          <form
            onSubmit={submeterFormulario}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {/* 1. Dados pessoais */}
            <section style={estiloSecao}>
              <div>
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: 16, // antes: 21
                  }}
                >
                 
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#5B6B87",
                    fontSize: 13,
                  }}
                >
                
                </p>
              </div>

              <div style={estiloGrelha}>
                <div style={estiloGrupo}>
                  <label htmlFor="nome" style={estiloLabel}>
                  
                  </label>

                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formulario.nome}
                    onChange={atualizarCampo}
                    placeholder="Nome"
                    autoComplete="given-name"
                    required
                    style={estiloCampo}
                  />
                </div>

                <div style={estiloGrupo}>
                  <label htmlFor="apelido" style={estiloLabel}>
                   
                  </label>

                  <input
                    id="apelido"
                    name="apelido"
                    type="text"
                    value={formulario.apelido}
                    onChange={atualizarCampo}
                    placeholder="Apelido"
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

                {/* Género em botões de opção (como na imagem) */}
                <div style={{ ...estiloGrupo, gridColumn: "1 / -1" }}>
                  <span id="genero-label" style={estiloLabel}>
                   
                  </span>

                  <div
                    role="radiogroup"
                    aria-labelledby="genero-label"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px 24px",
                      marginTop: 4,
                    }}
                  >
                    {[
                      { v: "feminino", t: "Feminino" },
                      { v: "masculino", t: "Masculino" },
                     
                   
                    ].map((o) => (
                      <label
                        key={o.t}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="genero"
                          value={o.v}
                          checked={formulario.genero === o.v}
                          onChange={atualizarCampo}
                          style={{ accentColor: "#4abde0" }}
                        />
                        {o.t}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Género em lista (antigo, comentado)
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
                */}
              </div>
            </section>

            {/* 2. Contactos */}
            <section style={estiloSecao}>
              <div>
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: 16, // antes: 21
                  }}
                >
              
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#5B6B87",
                    fontSize: 13,
                  }}
                >
                 
                </p>
              </div>

              {/* Email e telefone lado a lado (como na imagem) */}
              <div style={estiloGrelha}>
                <div style={estiloGrupo}>
                  <label htmlFor="email" style={estiloLabel}>
                    
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={atualizarCampo}
                    placeholder="Digite o seu email"
                    autoComplete="email"
                    required
                    style={estiloCampo}
                  />
                </div>

                <div style={estiloGrupo}>
                  <label htmlFor="telefone" style={estiloLabel}>
                  
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
              </div>

              <div style={estiloGrelha}>
                <div style={estiloGrupo}>
                  <label htmlFor="pais" style={estiloLabel}>
                   
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
                 
                  </label>

                  <input
                    id="cidade"
                    name="cidade"
                    type="text"
                    value={formulario.cidade}
                    onChange={atualizarCampo}
                    placeholder="Digite a sua cidade"
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
                    margin: "0 0 4px",
                    fontSize: 16, // antes: 21
                  }}
                >
                
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#5B6B87",
                    fontSize: 13,
                  }}
                >
                 
                </p>
              </div>

              <div style={estiloGrupo}>
                <label htmlFor="papel" style={estiloLabel}>
                
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
                    <option value="licenciatura">Licenciatura </option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutoramento">Doutoramento</option>
                     
                   
                    <option value="outro"></option>
                  </select>
                </div>

                <div style={estiloGrupo}>
                  <label htmlFor="area" style={estiloLabel}>
                   
                  </label>

                  <input
                    id="area"
                    name="area"
                    type="text"
                    value={formulario.area}
                    onChange={atualizarCampo}
                    placeholder=""
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
                
                </div>
              )}
            </section>

            {/* 4. Segurança */}
            <section style={estiloSecao}>
              <div>
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: 16, // antes: 21
                  }}
                >
                 
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#5B6B87",
                    fontSize: 13,
                  }}
                >
                 
                </p>
              </div>

              {/* Palavra-passe e confirmação lado a lado (como na imagem) */}
              <div style={estiloGrelha}>
                <div style={estiloGrupo}>
                  <label
                    htmlFor="password"
                    style={estiloLabel}
                  >
                   
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
                   
                  </small>
                </div>

                <div style={estiloGrupo}>
                  <label
                    htmlFor="confirmarPassword"
                    style={estiloLabel}
                  >
                   
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
              </div>
            </section>

            {/* 5. Termos e criação da conta */}
            <section style={estiloSecao}>
              {/* Termos de utilização (comentado)
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
              */}

              <button
                type="submit"
                disabled={aCarregar || sucesso}
                className="btn-escuro"
                style={{
                  width: "100%",
                  minHeight: 50,
                  padding: "14px 20px",
                  border: "none",
                  borderRadius: 10,
                  // background: "#1D4ED8", // (antigo, comentado)
                  // color: "#FFFFFF", // (antigo, comentado)
                  background: "#74cee9",
                  color: "#0A1428",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {aCarregar ? "A criar conta..." : "Criar a minha conta"}
              </button>

              {/* "Já tens uma conta? Entrar" (antigo, comentado — o botão Entrar está agora no topo do cartão)
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
              */}
            </section>
          </form>
        </div>
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2

        {/* Rodapé */}
        <footer
          style={{
            marginTop: 28,
            textAlign: "center",
<<<<<<< HEAD
            color: "#5B6B87",
            fontSize: 13,
          }}
        >
          © <Ano /> BolsaMentor
=======
            // color: "#5B6B87", // (antigo, comentado)
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: 13,
          }}
        >
          © <Ano /> BEESTUDO
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 03e784d2230009cb9581d5ba6e665f82a445c4f2
