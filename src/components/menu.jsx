import { useState, useEffect } from 'react';
import logoMarca from '../assets/img/logo1.png';

/**
 * Componente Menu
 * Barra de navegação fixa que gerencia a troca de telas e o tema (Dark/Light).
 */
function Menu({ mudarTela, telaAtual }) {
  // Estado do tema: false = Light Mode (Padrão), true = Dark Mode
  const [dark, setDark] = useState(false);

  /**
   * Efeito de Tema:
   * Sempre que 'dark' mudar, altera o atributo 'data-theme' no elemento raiz (HTML).
   * Isso ativa as variáveis de cores correspondentes definidas no CSS.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <header className="menu-topo">
      {/* Lado Esquerdo: Identidade Visual */}
      <div className="menu-titulo">
        <img src={logoMarca} alt="Solutions Company" className="logo-menu" />
      </div>

      {/* Centro: Navegação Principal */}
      <nav className="menu-central">
        <button 
          className={telaAtual === "home" ? "botao-ativo" : ""} 
          onClick={() => mudarTela("home")}
        >
          Home
        </button>
        
        <button 
          className={telaAtual === "inventario" ? "botao-ativo" : ""} 
          onClick={() => mudarTela("inventario")}
        >
          Inventário
        </button>
        
        <button 
          className={telaAtual === "importar" ? "botao-ativo" : ""} 
          onClick={() => mudarTela("importar")}
        >
          Importar
        </button>
        
        <button 
          className={telaAtual === "exportar" ? "botao-ativo" : ""} 
          onClick={() => mudarTela("exportar")}
        >
          Exportar
        </button>
      </nav>

      {/* Lado Direito: Ferramentas e Logout */}
      <div className="menu-direita">
        {/* Alternador de Tema */}
        <button className="btn-tema" onClick={() => setDark(!dark)}>
          {dark ? '🌙 Escuro' : '☀️ Claro'}
        </button>
        
        {/* Botão Sair: Retorna o usuário para a tela de Login */}
        <button className="btn-sair" onClick={() => mudarTela("login")}>
          Sair
        </button>
      </div>
    </header>
  );
}

export default Menu;