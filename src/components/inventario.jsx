// Importa o CSS específico para a tabela e o formulário de inventário
import '../csscomponents/inventario.css'
// Importa os Hooks para gerenciar estados (useState) e efeitos colaterais (useEffect)
import { useState, useEffect } from "react"

function Inventario() {
  // Estado que controla se o usuário vê a "lista" de produtos ou o "formulario" de cadastro
  const [modo, setModo] = useState("lista")
  // Estado que armazena o texto digitado no campo de busca para filtrar a tabela
  const [busca, setBusca] = useState("");

  // Inicializa o estado 'itens' buscando dados do LocalStorage ou usando valores padrão caso esteja vazio
  const [itens, setItens] = useState(() => {
    const dadosSalvos = localStorage.getItem("meu_inventario");
    // Se existirem dados, converte de volta para objeto; se não, inicia com 2 itens de exemplo
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
      { id: 1, codigo: "A001", nome: "Teclado Mecânico", quantidade: 10 },
      { id: 2, codigo: "M015", nome: "Monitor LED 24\"", quantidade: 5 }
    ];
  });

  // useEffect: Sempre que a lista de 'itens' mudar, salva a nova versão no LocalStorage automaticamente
  useEffect(() => {
    localStorage.setItem("meu_inventario", JSON.stringify(itens));
  }, [itens]);

  // Estados locais para os campos do formulário de novo item
  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")

  // Prepara o formulário: gera um código automático baseado no tamanho da lista e muda a tela
  function abrirFormulario() {
    const proximoNumero = itens.length + 1
    const novoCodigo = "A" + proximoNumero.toString().padStart(3, "0")
    setCodigo(novoCodigo)
    setModo("formulario")
  }

  // Cria um novo objeto de produto e adiciona à lista de itens existente
  function adicionarItem() {
    const novoItem = {
      id: itens.length + 1,
      codigo,
      nome,
      quantidade: Number(quantidade),
      atualizado_em: new Date().toLocaleString() // Adiciona data e hora da criação
    }
    // Atualiza a lista espalhando os itens antigos e adicionando o novo ao final
    setItens([...itens, novoItem])
    // Limpa os campos do formulário após salvar
    setCodigo(""); setNome(""); setQuantidade("");
    // Retorna para a visualização da tabela
    setModo("lista")
  }

  // Lógica de filtro: cria uma lista temporária apenas com itens que batem com a busca (nome ou código)
  const itensFiltrados = itens.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase()) || 
    item.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="inventario-container">
      {/* Cabeçalho com barra de pesquisa e botão de adicionar */}
      <div className="inventario-header-flex">
        <div className="inventario-busca">
          <input 
            placeholder="Busque por nome ou código" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)} 
          />
          <button className="btn-pesquisar">🔍</button>
        </div>

        <div className="inventario-acoes">
          <button className="btn-adicionar" onClick={abrirFormulario}>➕ Novo Item</button>
        </div>
      </div>

      {/* Renderização condicional: Só mostra a tabela se o modo for "lista" */}
      {modo === "lista" && (
        <div className="tabela-wrapper">
          <table className="inventario-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>COD.</th>
                <th>DESCRIÇÃO</th>
                <th>QTD</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeia os itens filtrados para gerar as linhas da tabela (tr) */}
              {itensFiltrados.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Renderização condicional: Só mostra o formulário (modal) se o modo for "formulario" */}
      {modo === "formulario" && (
        <div className="formulario-overlay">
          <div className="formulario-card">
            <h3>Novo Cadastro</h3>
            <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} />
            <input placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} />
            <input placeholder="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
            
            <div className="formulario-botoes">
              <button className="salvar" onClick={adicionarItem}>Confirmar</button>
              <button className="cancelar" onClick={() => setModo("lista")}>Voltar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventario