import '../csscomponents/inventario.css';
import { useState, useEffect } from "react";

/**
 * Componente Inventario
 * Exibe a lista de produtos, permite filtragem em tempo real e 
 * salvamento de buscas específicas no histórico.
 */
function Inventario() {
  const [busca, setBusca] = useState("");

  // 1. Estado dos Itens: Inicializa buscando do LocalStorage ou um array vazio
  const [itens, setItens] = useState(() => {
    const dadosSalvos = localStorage.getItem("meu_inventario");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Estado do Histórico: Armazena os filtros salvos pelo usuário
  const [historico, setHistorico] = useState(() => {
    const salvos = localStorage.getItem("historico_exportacao");
    return salvos ? JSON.parse(salvos) : [];
  });

  /**
   * Persistência Automática:
   * Sempre que o estado de 'itens' ou 'historico' mudar, atualiza o LocalStorage.
   */
  useEffect(() => {
    localStorage.setItem("historico_exportacao", JSON.stringify(historico));
    localStorage.setItem("meu_inventario", JSON.stringify(itens));
  }, [historico, itens]);

  /**
   * Lógica de Filtro Global:
   * Transforma todos os valores de cada item em uma string única para busca rápida.
   */
  const resultadosDaBusca = itens.filter(item => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return true; // Se a busca está vazia, exibe todos os itens

    // Junta os valores do objeto (ID, Código, Nome) para comparar com o termo buscado
    const conteudoLinha = Object.values(item).join(" ").toLowerCase();
    return conteudoLinha.includes(termo);
  });

  /**
   * salvarPesquisaNoHistorico:
   * Pega os resultados atuais filtrados na tela e salva como um "relatório" nomeado.
   */
  const salvarPesquisaNoHistorico = () => {
    if (!busca.trim() || resultadosDaBusca.length === 0) {
      alert("Digite algo na busca antes de salvar!");
      return;
    }
    
    const nomeRelatorio = prompt("Nome do relatório:");
    if (!nomeRelatorio) return; 

    const novaEntrada = {
      id: Date.now(),
      nome: nomeRelatorio,
      data: new Date().toLocaleString(),
      dados: [...resultadosDaBusca] 
    };

    setHistorico([...historico, novaEntrada]);
    alert("Resultados salvos!");
  };

  return (
    <div className="inventario-container">
      
      {/* Cabeçalho de Ações: Busca e Botão de Salvar */}
      <div className="inventario-header-flex">
        <div className="inventario-busca">
          <input 
            type="text"
            placeholder="Digite para filtrar..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)} 
          />
          {/* Botão de limpar (X) aparece apenas se houver texto */}
          {busca && (
            <button className="btn-clear" onClick={() => setBusca("")}>✕</button>
          )}
        </div>

        <button className="btn-salvar-busca" onClick={salvarPesquisaNoHistorico}>
          💾 Salvar Filtro
        </button>
      </div>

      {/* Contador dinâmico de resultados */}
      <div className="inventario-contador">
        <p>
          {busca.trim() === "" 
            ? `Mostrando total de ${itens.length} itens` 
            : `Exibindo ${resultadosDaBusca.length} resultado(s) para sua busca`}
        </p>
      </div>

      {/* Wrapper da Tabela: Permite rolagem horizontal se necessário */}
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
            {resultadosDaBusca.length > 0 ? (
              resultadosDaBusca.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id || index + 1}</td>
                  <td>{String(item.codigo || item.CODIGO || "S/C")}</td>
                  <td>{item.nome || item.NOME || item.descricao || "---"}</td>
                  <td>{item.quantidade ?? item.QUANTIDADE ?? 0}</td>
                </tr>
              ))
            ) : (
              // Mensagem caso a busca não retorne nada
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  Nenhum item encontrado para "{busca}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;