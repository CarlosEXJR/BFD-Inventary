// Importa o hook 'useState' do React para gerenciar a navegação interna
import { useState } from "react"

// --- IMPORTAÇÃO DOS COMPONENTES (Páginas do Sistema) ---
import Login from "./components/Login"      
import Menu from "./components/menu"        
import Inventario from "./components/inventario" 
import Importar from "./components/importar"   
import Exportar from "./components/exportar"   
import Home from "./components/home"           

/**
 * Componente Principal App
 * Gerencia o estado global de navegação e a renderização condicional dos componentes.
 */
function App() {

  // Estado 'tela' controla qual página o usuário está vendo no momento.
  // Começa em "login" para garantir a segurança no acesso inicial.
  const [tela, setTela] = useState("login")

  return (
    <div>
      
      {/* LÓGICA DO MENU:
        O Menu só é renderizado se o usuário NÃO estiver na tela de login.
        Enviamos 'setTela' para permitir navegação e 'tela' para destacar o botão ativo.
      */}
      {tela !== "login" && (
        <Menu mudarTela={setTela} telaAtual={tela} />
      )}

      {/* SISTEMA DE NAVEGAÇÃO CONDICIONAL:
        Dependendo do valor de 'tela', renderizamos o componente correspondente.
      */}

      {/* Tela de Login: Recebe a função onLogin para mudar para a home após o acesso */}
      {tela === "login" && (
        <Login onLogin={() => setTela("home")} />
      )}

      {/* Tela Inicial (Dashboard): Onde o usuário escolhe as ações principais */}
      {tela === "home" && (
        <Home mudarTela={setTela} />
      )}

      {/* Tela de Gerenciamento: Lista e filtros de produtos */}
      {tela === "inventario" && (
        <Inventario />
      )}

      {/* Tela de Upload: Processamento de arquivos Excel */}
      {tela === "importar" && (
        <Importar />
      )}

      {/* Tela de Download: Exportação do estoque e histórico de buscas */}
      {tela === "exportar" && (
        <Exportar />
      )}

    </div> 
  )
}

export default App