"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function CadastroFormContent() {
  const searchParams = useSearchParams();
  const [carregando, setCarregando] = useState(false);
  const [formulario, setFormulario] = useState({
    nome: "", apelido: "", email: "", telefone: "",
    dataNascimento: "", genero: "", pais: "Angola", cidade: "",
    papel: searchParams.get("papel") === "mentor" ? "mentor" : "estudante",
    instituicao: "", nivel: "", area: "",
    password: "", confirmarPassword: "", termos: false,
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function atualizarCampo(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const novoValor = type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value;
    setFormulario((a) => ({ ...a, [name]: novoValor }));
    setErro(""); setSucesso(false);
  }

  async function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(""); setSucesso(false);
    if (formulario.password.length < 8) return setErro("A palavra-passe deve ter pelo menos 8 caracteres.");
    if (formulario.password !== formulario.confirmarPassword) return setErro("As palavras-passe não coincidem.");
    if (!formulario.termos) return setErro("Deves aceitar os termos.");

    setCarregando(true);
    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erro || "Erro ao criar conta");
      setSucesso(true);
      setTimeout(() => { window.location.href = "/entrar"; }, 1500);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  const estiloCampo: React.CSSProperties = { width:"100%", minHeight:48, padding:"12px 14px", border:"1px solid #D5DEEF", borderRadius:10, background:"#FFF", color:"#0F1B33", fontSize:15, outlineColor:"#1D4ED8" };
  const estiloLabel: React.CSSProperties = { display:"block", marginBottom:8, fontSize:14, fontWeight:600, color:"#0F1B33" };
  const estiloGrupo: React.CSSProperties = { display:"flex", flexDirection:"column", minWidth:0 };
  const estiloSecao: React.CSSProperties = { display:"flex", flexDirection:"column", gap:20, padding:24, border:"1px solid #E2E8F5", borderRadius:16, background:"#FFF" };
  const estiloGrelha: React.CSSProperties = { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap:18 };

  return (
    <>
      {erro && <div style={{marginBottom:20, padding:16, border:"1px solid #FECACA", borderRadius:10, background:"#FEF2F2", color:"#B91C1C", fontSize:14}}>{erro}</div>}
      {sucesso && <div style={{marginBottom:20, padding:16, border:"1px solid #A7F3D0", borderRadius:10, background:"#ECFDF5", color:"#047857", fontSize:14}}><strong>Conta criada com sucesso!</strong> Guardada no dev.db offline. Redirecionando...</div>}
      
      <form onSubmit={submeterFormulario} style={{display:"flex", flexDirection:"column", gap:20}}>
        <section style={estiloSecao}>
          <div><h2 style={{margin:"0 0 6px", fontSize:21}}>1. Dados pessoais</h2></div>
          <div style={estiloGrelha}>
            <div style={estiloGrupo}><label style={estiloLabel}>Nome *</label><input name="nome" value={formulario.nome} onChange={atualizarCampo} required style={estiloCampo}/></div>
            <div style={estiloGrupo}><label style={estiloLabel}>Apelido *</label><input name="apelido" value={formulario.apelido} onChange={atualizarCampo} required style={estiloCampo}/></div>
            <div style={estiloGrupo}><label style={estiloLabel}>Data nascimento</label><input name="dataNascimento" type="date" value={formulario.dataNascimento} onChange={atualizarCampo} style={estiloCampo}/></div>
            <div style={estiloGrupo}><label style={estiloLabel}>Género</label><select name="genero" value={formulario.genero} onChange={atualizarCampo} style={estiloCampo}><option value="">Não indicar</option><option value="masculino">Masculino</option><option value="feminino">Feminino</option></select></div>
          </div>
        </section>
        <section style={estiloSecao}>
          <div><h2 style={{margin:"0 0 6px", fontSize:21}}>2. Contactos</h2></div>
          <div style={estiloGrupo}><label style={estiloLabel}>Email *</label><input name="email" type="email" value={formulario.email} onChange={atualizarCampo} required style={estiloCampo}/></div>
          <div style={estiloGrupo}><label style={estiloLabel}>Telefone</label><input name="telefone" value={formulario.telefone} onChange={atualizarCampo} style={estiloCampo}/></div>
          <div style={estiloGrelha}>
            <div style={estiloGrupo}><label style={estiloLabel}>País *</label><input name="pais" value={formulario.pais} onChange={atualizarCampo} required style={estiloCampo}/></div>
            <div style={estiloGrupo}><label style={estiloLabel}>Cidade</label><input name="cidade" value={formulario.cidade} onChange={atualizarCampo} style={estiloCampo} placeholder="Luanda"/></div>
          </div>
        </section>
        <section style={estiloSecao}>
          <div><h2 style={{margin:"0 0 6px", fontSize:21}}>3. Perfil</h2></div>
          <div style={estiloGrupo}><label style={estiloLabel}>Tipo conta *</label><select name="papel" value={formulario.papel} onChange={atualizarCampo} required style={estiloCampo}><option value="estudante">Estudante</option><option value="mentor">Mentor</option></select></div>
          <div style={estiloGrupo}><label style={estiloLabel}>Instituição</label><input name="instituicao" value={formulario.instituicao} onChange={atualizarCampo} style={estiloCampo}/></div>
          <div style={estiloGrelha}>
            <div style={estiloGrupo}><label style={estiloLabel}>Nível</label><select name="nivel" value={formulario.nivel} onChange={atualizarCampo} style={estiloCampo}><option value="">Selecionar</option><option value="licenciatura">Licenciatura</option><option value="mestrado">Mestrado</option><option value="doutoramento">Doutoramento</option></select></div>
            <div style={estiloGrupo}><label style={estiloLabel}>Área</label><input name="area" value={formulario.area} onChange={atualizarCampo} style={estiloCampo} placeholder="Informática"/></div>
          </div>
        </section>
        <section style={estiloSecao}>
          <h2 style={{margin:"0 0 6px", fontSize:21}}>4. Segurança</h2>
          <div style={estiloGrupo}><label style={estiloLabel}>Senha *</label><input name="password" type="password" value={formulario.password} onChange={atualizarCampo} required style={estiloCampo}/></div>
          <div style={estiloGrupo}><label style={estiloLabel}>Confirmar senha *</label><input name="confirmarPassword" type="password" value={formulario.confirmarPassword} onChange={atualizarCampo} required style={estiloCampo}/></div>
        </section>
        <section style={estiloSecao}>
          <label style={{display:"flex", gap:12}}><input name="termos" type="checkbox" checked={formulario.termos} onChange={atualizarCampo} required/> Aceito os termos *</label>
          <button disabled={carregando} type="submit" style={{width:"100%", minHeight:50, border:"none", borderRadius:10, background: carregando ? "#93A5D0" : "#1D4ED8", color:"#FFF", fontWeight:700, cursor:"pointer"}}>
            {carregando ? "A criar conta..." : "Criar a minha conta"}
          </button>
          <p style={{textAlign:"center", fontSize:14}}>Já tens conta? <Link href="/entrar" style={{color:"#1D4ED8", fontWeight:700}}>Entrar</Link></p>
        </section>
      </form>
    </>
  );
}

export default function CadastroPage() {
  return (
    <main style={{minHeight:"100vh", padding:"36px 16px 60px", background:"#F5F8FF", color:"#0F1B33"}}>
      <div style={{maxWidth:760, margin:"0 auto"}}>
        <Link href="/" style={{display:"inline-flex", marginBottom:28, color:"#1D4ED8", fontWeight:600, textDecoration:"none"}}>← Voltar</Link>
        <Suspense fallback={<div>A carregar...</div>}><CadastroFormContent /></Suspense>
      </div>
    </main>
  );
}