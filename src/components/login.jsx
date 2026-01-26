import { useState } from 'react'; 
import '../csscomponents/login.css';

function Login({ onLogin }) {
  const [verRecuperar, setVerRecuperar] = useState(false);
  
  // Estados para Login
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estado para E-mail de Recuperação
  const [email, setEmail] = useState("");

  /**
   * Validação de Login: Simula acesso com '123'
   */
  const handleEntrar = () => {
    if (usuario === "123" && senha === "123") {
      onLogin();
    } else {
      alert("Usuário ou senha incorretos!\nDica: Use '123' para ambos.");
    }
  };

  /**
   * Validação de E-mail: Verifica se existe o caractere '@'
   */
  const handleRecuperar = () => {
    if (!email.includes("@")) {
      alert("Por favor, insira um e-mail válido (deve conter @).");
    } else {
      alert(`Link de recuperação enviado para: ${email}`);
      setVerRecuperar(false); // Volta para o login após sucesso
    }
  };

  // --- TELA DE RECUPERAÇÃO ---
  if (verRecuperar) {
    return (
      <div className="login">
        <h2>Recuperar Senha</h2>
        <p style={{ fontSize: '12px', color: 'var(--texto-secundario)', marginBottom: '15px' }}>
          Insira seu e-mail para receber as instruções.
        </p>
        
        <input 
          type="email" 
          placeholder="E-mail cadastrado" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button 
          className="btn-entrar" 
          style={{ marginTop: '20px' }}
          onClick={handleRecuperar}
        >
          Enviar Link
        </button>
        
        <h6 
          onClick={() => setVerRecuperar(false)} 
          style={{ cursor: 'pointer', marginTop: '20px', color: 'var(--azul-destaque)' }}
        >
          Voltar para o Login
        </h6>
      </div>
    );
  }

  // --- TELA DE ACESSO (LOGIN) ---
  return (
    <div className="login">
      <h2>Acessar Sistema</h2>
      
      <div className="form-grupo">
        <input 
          type="text" 
          placeholder="Usuário" 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <h6 
        onClick={() => setVerRecuperar(true)} 
        style={{ cursor: 'pointer', margin: '10px 0' }}
      >
        Esqueci minha senha
      </h6>

      <button onClick={handleEntrar}>Entrar</button>
    </div>
  );
}

export default Login;