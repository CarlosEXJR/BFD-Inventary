import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import '../csscomponents/exportar.css';

/**
 * Componente Exportar
 * Responsável por gerenciar o download de dados do inventário e histórico de buscas salvas.
 */
function Exportar() {
  // Estado que armazena a lista de buscas/relatórios salvos no histórico
  const [historico, setHistorico] = useState([]);

  // useEffect: Carrega o histórico salvo no LocalStorage assim que o componente é montado
  useEffect(() => {
    const dados = localStorage.getItem("historico_exportacao");
    if (dados) setHistorico(JSON.parse(dados));
  }, []);

  /**
   * Função exportarTudo
   * Recupera o inventário completo do LocalStorage e gera um arquivo .xlsx
   */
  const exportarTudo = () => {
    const todosOsDados = localStorage.getItem("meu_inventario");
    if (!todosOsDados) return alert("Inventário vazio!");
    
    // Converte os dados JSON para uma planilha (Sheet)
    const folha = XLSX.utils.json_to_sheet(JSON.parse(todosOsDados));
    // Cria um novo livro (Workbook)
    const livro = XLSX.utils.book_new();
    // Adiciona a folha ao livro com o nome "Geral"
    XLSX.utils.book_append_sheet(livro, folha, "Geral");
    // Aciona o download do arquivo no navegador
    XLSX.writeFile(livro, `Inventario_Completo.xlsx`);
  };

  /**
   * Função baixarRelatorio
   * Gera um arquivo .xlsx a partir de um relatório específico do histórico
   */
  const baixarRelatorio = (relatorio) => {
    const folha = XLSX.utils.json_to_sheet(relatorio.dados);
    const livro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(livro, folha, "Busca");
    XLSX.writeFile(livro, `${relatorio.nome}.xlsx`);
  };

  /**
   * Função excluirRelatorio
   * Remove um item do histórico tanto no estado (UI) quanto no LocalStorage
   */
  const excluirRelatorio = (id) => {
    const novo = historico.filter(h => h.id !== id);
    setHistorico(novo);
    localStorage.setItem("historico_exportacao", JSON.stringify(novo));
  };

  return (
    <div className="exportar-container">
      <h1 className="titulo-sessao">Exportar Dados</h1>

      {/* Seção Principal: Download do Inventário Completo */}
      <div className="banner-exportar-geral">
        <div className="banner-texto">
          <h2>📦 Inventário Completo</h2>
          <p>Gere uma planilha com todos os itens cadastrados no sistema.</p>
        </div>
        <button className="btn-geral" onClick={exportarTudo}>
          🚀 Baixar Tudo (XLS)
        </button>
      </div>

      <h2 className="titulo-historico">Buscas Salvas</h2>
      
      {/* Grid de Relatórios Salvos */}
      <div className="exportar-grid">
        {historico.length === 0 ? (
          <p className="aviso-vazio">Nenhuma pesquisa salva encontrada.</p>
        ) : (
          historico.map((item) => (
            <div key={item.id} className="card-relatorio">
              <div className="card-header-mini">
                <span>📄 Relatório</span>
                <span>{item.data}</span>
              </div>
              
              <div className="card-body-mini">
                <h3>{item.nome}</h3>
                <div className="acoes">
                  <button 
                    className="btn-baixar-mini" 
                    onClick={() => baixarRelatorio(item)}
                  >
                    Baixar
                  </button>
                  <button 
                    className="btn-excluir-mini" 
                    onClick={() => excluirRelatorio(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Exportar;