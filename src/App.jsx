// Importa o hook 'useState' do React para gerenciar a navegação interna (SPA)
import { useState } from "react"

// --- IMPORTAÇÃO DOS COMPONENTES (Páginas do Sistema) ---
import Login from "./components/Login"      // Tela de acesso e recuperação
import Menu from "./components/menu"        // Barra superior de navegação e tema
import Inventario from "./components/inventario" // Tabela e gerenciamento de itens
import Importar from "./components/importar"   // Tela de upload de Excel
import Exportar from "./components/exportar"   // Tela de download de Excel
import Home from "./components/home"           // Dashboard com os cards principais

// Componente principal que coordena toda a aplicação
function App() {

  // Estado 'tela' controla qual página o usuário está vendo no momento.
  // Começa em "login" para garantir que o sistema seja protegido.
  const [tela, setTela] = useState("login")

  return (
    // Div principal: serve como o container raiz para todos os elementos
    <div>
      
      {/* LÓGICA DO MENU:
        Se a tela NÃO for "login", o Menu deve aparecer no topo.
        Passamos a função 'setTela' para o Menu como a prop 'mudarTela'.
      */}
      {tela !== "login" && (
        <Menu mudarTela={setTela} />
      )}

      {/* NAVEGAÇÃO CONDICIONAL:
        O React verifica o valor de 'tela' e renderiza apenas o componente correspondente.
      */}

      {/* Tela de Login: Quando o login é bem-sucedido, muda o estado para "home" */}
      {tela === "login" && (
        <Login onLogin={() => setTela("home")} />
      )}

      {/* Tela Inicial (Home): Exibe os cards de atalho para outras funções */}
      {tela === "home" && (
        <Home mudarTela={setTela} />
      )}

      {/* Tela de Inventário: Onde a tabela de produtos é exibida */}
      {tela === "inventario" && (
        <Inventario />
      )}

      {/* Tela de Importação: Local para upload de planilhas XLSX */}
      {tela === "importar" && (
        <Importar />
      )}

      {/* Tela de Exportação: Local para gerar relatórios XLSX */}
      {tela === "exportar" && (
        <Exportar />
      )}

    </div> // Fecha a div principal
  )
}

// Exporta o App para que o arquivo index.js possa renderizá-lo no navegador
export default App