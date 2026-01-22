import * as XLSX from 'xlsx';
import '../csscomponents/exportar.css';

function Exportar() {
  
  const baixarPlanilha = () => {
    const dadosSalvos = localStorage.getItem("meu_inventario");
    
    if (!dadosSalvos) {
      alert("Não há dados para exportar!");
      return;
    }

    const listaProdutos = JSON.parse(dadosSalvos);
    const folha = XLSX.utils.json_to_sheet(listaProdutos);
    const livro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(livro, folha, "Inventário Atual");

    XLSX.writeFile(livro, "Relatorio_Inventario.xlsx");
  };

  return (
    <div className="exportar-container">
      <h1 className="titulo-sessao">Exportar Dados</h1>
      
      <div className="exportar-wrapper">
        <button className="card-exportar" onClick={baixarPlanilha}>
          <div className="card-header-exportar">
            <h3>Exportar XLS</h3>
            <span className="subtitulo-card">Relatórios de estoque</span>
          </div>
          <p className="descricao-card">
            Gere e baixe relatórios de estoque personalizados (inventário, entradas, saídas e movimentações) para análise e auditoria externa.
          </p>
          <div className="linha-decorativa"></div>
        </button>
      </div>
    </div>
  );
}

export default Exportar;