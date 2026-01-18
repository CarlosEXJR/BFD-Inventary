function Menu({ mudarTela }) {
  return (
    <header className="menu-topo">
      <h2 className="menu-titulo"></h2>

      <nav className="menu-botoes">
        <button onClick={() => mudarTela("home")}>Home</button>
        <button onClick={() => mudarTela("inventario")}>Inventário</button>
        <button onClick={() => mudarTela("importar")}>Importar</button>
        <button onClick={() => mudarTela("exportar")}>Exportar</button>
        <button className="btn-sair" onClick={() => mudarTela("login")}>Sair</button>
      </nav>
    </header>
    

  )
}

export default Menu
