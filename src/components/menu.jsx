// Importamos os Hooks necessários: useState para o estado do tema e useEffect para aplicar as mudanças
import { useState, useEffect } from 'react';

function Menu({ mudarTela }) {
  // Inicializamos o estado 'dark'. Ele tenta ler a preferência salva no navegador; 
  // se não houver nada (primeiro acesso), ele começa como 'true' (Modo Escuro)
  const [dark, setDark] = useState(() => {
    const salvo = localStorage.getItem("tema_preferido");
    return salvo ? JSON.parse(salvo) : true;
  });

  // O useEffect executa toda vez que a variável 'dark' sofrer uma alteração
  useEffect(() => {
    // Aplica o atributo 'data-theme' na tag <html> do site. 
    // É isso que faz o CSS trocar as variáveis :root pelas [data-theme='dark']
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    
    // Grava a escolha atual no LocalStorage para que o site "lembre" na próxima visita
    localStorage.setItem("tema_preferido", JSON.stringify(dark));
  }, [dark]);

  return (
    // Barra superior com posicionamento fixo e cores baseadas em var(--bg-menu)
    <header className="menu-topo">
      
      {/* Lado Esquerdo: Identificação da empresa ou logo do sistema */}
      <h2 className="menu-titulo">Solutions</h2>

      {/* Centro: Navegação principal. Cada botão chama a função de troca de tela */}
      <nav className="menu-central">
        <button onClick={() => mudarTela("home")}>Home</button>
        <button onClick={() => mudarTela("inventario")}>Inventário</button>
        <button onClick={() => mudarTela("importar")}>Importar</button>
        <button onClick={() => mudarTela("exportar")}>Exportar</button>
      </nav>

      {/* Lado Direito: Utilitários de sistema */}
      <div className="menu-direita">
        {/* Botão de Alternância de Tema: Inverte o valor de 'dark' (true vira false e vice-versa) */}
        <button className="btn-tema" onClick={() => setDark(!dark)}>
          {/* Renderização condicional do texto e ícone baseada no tema atual */}
          {dark ? '🌙 Escuro' : '☀️ Claro'}
        </button>
        
        {/* Botão Sair: Geralmente redireciona o usuário de volta para a tela de Login */}
        <button className="btn-sair" onClick={() => mudarTela("login")}>Sair</button>
      </div>
    </header>
  );
}

export default Menu;