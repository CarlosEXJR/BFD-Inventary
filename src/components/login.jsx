// 1. Importa o Hook 'useState' para controlar qual tela deve ser exibida
import { useState } from 'react'; 
// Importa o arquivo CSS para estilizar os campos e botões do login
import '../csscomponents/login.css';

// O componente recebe 'onLogin' como propriedade, que é a função que valida o acesso no App.js
function Login({ onLogin }) {
  // 2. Criamos um estado booleano (true/false). Se for true, mostra recuperação; se false, mostra login
  const [verRecuperar, setVerRecuperar] = useState(false);

  // --- TELA DE RECUPERAÇÃO (Bloco condicional) ---
  // Se 'verRecuperar' for verdadeiro, o React interrompe aqui e desenha esta tela
  if (verRecuperar) {
    return (
      <div className="login">
        <h2>Recuperar Senha</h2>
        <input type="email" placeholder="E-mail cadastrado" />
        <br /><br />
        <button className="btn-entrar">Enviar Link</button>
        <br /><br />
        {/* Ao clicar, mudamos o estado para 'false', fazendo o React redesenhar a tela de Login */}
        <h6 onClick={() => setVerRecuperar(false)} style={{ cursor: 'pointer', color: 'blueviolet' }}>
          Voltar para o Login
        </h6>
      </div>
    );
  }

  // --- TELA DE LOGIN (Interface padrão) ---
  // Este bloco só é lido se 'verRecuperar' for falso
  return (
    <div className="login">
      <h2>Acessar Sistema</h2>

      {/* Campos de entrada para as credenciais do usuário */}
      <input placeholder="Usuário" />
      <br /><br />
      <input type="password" placeholder="Senha" />

      {/* 3. Ao clicar aqui, mudamos o estado para 'true', ativando a tela de recuperação acima */}
      <h6 onClick={() => setVerRecuperar(true)} style={{ cursor: 'pointer' }}>
        Esqueci minha senha
      </h6>

      <br /><br />

      {/* 4. Este botão dispara a função de login que vem lá do componente pai (App.js) */}
      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}

// Exporta o componente para ser usado no controle de rotas principal
export default Login;