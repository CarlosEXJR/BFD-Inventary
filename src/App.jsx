// Importa o hook useState do React
// useState serve para criar e controlar estados (valores que mudam na tela)
import { useState } from "react"

// Importa o componente de Login
import Login from "./components/Login"

// Importa o componente do Menu principal
import Menu from "./components/menu"

// Importa o componente da tela de Inventário
import Inventario from "./components/inventario"

import Importar from "./components/importar"

import Exportar from "./components/exportar"

import Home from "./components/home"

// Componente principal da aplicação
function App() {

  // Cria um estado chamado "tela"
  // "tela" guarda qual tela deve ser exibida
  // "setTela" é a função que muda o valor de "tela"
  // O valor inicial é "login"
  const [tela, setTela] = useState("login")

  // O return define o que será renderizado na tela
  return (
        
    // Div principal que envolve toda a aplicação
    <div>
      {tela !== "login" && (
        <Menu mudarTela={setTela} />
      )}

      {/* 
        Se o valor de "tela" for "login",
        o componente Login será exibido
        onLogin recebe uma função que muda a tela para "menu"
      */}
      {tela === "login" && (
        <Login onLogin={() => setTela("home")} />
      )}

      {/*
        Se o valor de "tela" for "menu",
        o componente Menu será exibido
        mudarTela recebe a função setTela
      */}
      

      {/*
        Se o valor de "tela" for "inventario",
        o componente Inventario será exibido
      */}
      {tela === "inventario" && (
        <Inventario />
      )}

      {tela === "importar" && (
        <Importar />
      )}


       {tela === "exportar" && (
        <Exportar />
      )}

      {tela === "home" && (
        <Home mudarTela={setTela} />
      )}

      

    </div> // Fecha a div principal
  )
}

// Exporta o componente App para que o React possa usá-lo
export default App
