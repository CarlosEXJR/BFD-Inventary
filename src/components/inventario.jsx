import '../csscomponents/inventario.css'
import { useState } from "react"

function Inventario() {
  const [modo, setModo] = useState("lista")

  const locaisPredefinidos = [
    "Almoxarifado A",
    "Almoxarifado B",
    "Almoxarifado C",
    "Sala de Servidores",
    "Recepção"
  ]

  const [itens, setItens] = useState([
    {
      id: 1,
      codigo: "A001",
      nome: "Teclado Mecânico",
      categoria: "Periféricos",
      quantidade: 10,
      localizacao: "Almoxarifado A",
      atualizado_em: "2025-01-10 14:30"
    },
    {
      id: 2,
      codigo: "M015",
      nome: "Monitor LED 24\"",
      categoria: "Monitores",
      quantidade: 5,
      localizacao: "Almoxarifado B",
      atualizado_em: "2025-01-12 09:15"
    },
    {
      id: 3,
      codigo: "C203",
      nome: "CPU Dell i5",
      categoria: "Computadores",
      quantidade: 3,
      localizacao: "Sala de Servidores",
      atualizado_em: "2025-01-09 16:45"
    },
    {
      id: 4,
      codigo: "R042",
      nome: "Roteador Wi-Fi",
      categoria: "Redes",
      quantidade: 8,
      localizacao: "Almoxarifado C",
      atualizado_em: "2025-01-11 11:20"
    },
    {
      id: 5,
      codigo: "I789",
      nome: "Impressora Multifuncional",
      categoria: "Impressão",
      quantidade: 2,
      localizacao: "Almoxarifado A",
      atualizado_em: "2025-01-08 13:10"
    }
  ])

  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [categoria, setCategoria] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [localizacao, setLocalizacao] = useState("")

  function abrirFormulario() {
    const proximoNumero = itens.length + 1
    const novoCodigo = "A" + proximoNumero.toString().padStart(3, "0")
    setCodigo(novoCodigo)
    setModo("formulario")
  }

  function adicionarItem() {
    const novoItem = {
      id: itens.length + 1,
      codigo,
      nome,
      categoria,
      quantidade: Number(quantidade),
      localizacao,
      atualizado_em: new Date().toLocaleString()
    }

    setItens([...itens, novoItem])

    setCodigo("")
    setNome("")
    setCategoria("")
    setQuantidade("")
    setLocalizacao("")
    setModo("lista")
  }

  return (
    <div className="inventario-container">

      {/* TOPO */}
      <div className="inventario-topo">
        <label>Insira o código da mercadoria</label>

        <div className="inventario-busca">
          <input placeholder="Busque por nome ou código" />
          <button>🔍 Pesquisar</button>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="inventario-acoes">
        <button onClick={abrirFormulario}>➕ Adicionar Item</button>
        <button>Editar</button>
        <button>Salvar</button>
      </div>

      {/* TABELA */}
      {modo === "lista" && (
        <table className="inventario-tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>COD.</th>
              <th>DESCRIÇÃO</th>
              <th>CAT.</th>
              <th>QTD</th>
              <th>LOC</th>
              <th>ATUALIZADO EM</th>
            </tr>
          </thead>

          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.codigo}</td>
                <td>{item.nome}</td>
                <td>{item.categoria}</td>
                <td>{item.quantidade}</td>
                <td>{item.localizacao}</td>
                <td>{item.atualizado_em}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* FORMULÁRIO */}
      {modo === "formulario" && (
        <div className="formulario">
          <h3>Adicionar Item</h3>

          <input
            placeholder="Código"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
          />

          <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <input
            placeholder="Categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          />

          <input
            placeholder="Quantidade"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
          />

          <select
            value={localizacao}
            onChange={e => setLocalizacao(e.target.value)}
          >
            {locaisPredefinidos.map((local, index) => (
              <option key={index} value={local}>
                {local}
              </option>
            ))}
          </select>

          <div className="formulario-botoes">
            <button className="salvar" onClick={adicionarItem}>Salvar</button>
            <button className="cancelar" onClick={() => setModo("lista")}>Cancelar</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Inventario
