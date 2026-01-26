import { useState } from 'react'; 
import '../csscomponents/login.css';

/**
 * Componente Login
 * Gerencia a autenticação do usuário e a interface de recuperação de senha.
 * Recebe 'onLogin' como prop para disparar a entrada no sistema.
 */
function Login({ onLogin }) {
  // Estado para alternar entre a tela de login e a de recuperação de senha
  const [verRecuperar, setVerRecuperar] = useState(false);

  /**
   * Renderização Condicional: Tela de Recuperação
   * Exibida quando 'verRecuperar' for verdadeiro.
   */
  if (verRecuperar) {
    return (
      <div className="login">
        <h2>Recuperar Senha</h2>
        <p style={{ fontSize: '12px', color: 'var(--texto-secundario)', marginBottom: '15px' }}>
          Insira seu e-mail para receber as instruções.
        </p>
        
        <input type="email" placeholder="E-mail cadastrado" />
        
        <button 
          className="btn-entrar" 
          style={{ marginTop: '20px' }}
        >
          Enviar Link
        </button>
        
        {/* Link para retornar ao estado inicial de login */}
        <h6 
          onClick={() => setVerRecuperar(false)} 
          style={{ cursor: 'pointer', marginTop: '20px', color: 'var(--azul-destaque)' }}
        >
          Voltar para o Login
        </h6>
      </div>
    );
  }

  /**
   * Renderização Principal: Tela de Acesso
   * Interface padrão contendo campos de usuário, senha e ação de entrar.
   */
  return (
    <div className="login">
      <h2>Acessar Sistema</h2>
      
      <div className="form-grupo">
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
      </div>

      {/* Aciona a troca de estado para ver a recuperação */}
      <h6 
        onClick={() => setVerRecuperar(true)} 
        style={{ cursor: 'pointer', margin: '10px 0' }}
      >
        Esqueci minha senha
      </h6>

      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}

export default Login;