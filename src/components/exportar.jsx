// Importa a biblioteca 'xlsx', responsável por converter dados em arquivos de Excel
import * as XLSX from 'xlsx';

// Importa o arquivo CSS específico desta tela
import '../csscomponents/exportar.css';

function Exportar() {
  
  // Função que será executada quando o usuário clicar no card de exportação
  const baixarPlanilha = () => {
    // Busca a string de dados que está guardada no navegador sob a chave "meu_inventario"
    const dadosSalvos = localStorage.getItem("meu_inventario");
    
    // Verifica se o localStorage está vazio. Se estiver, avisa o usuário e para a execução
    if (!dadosSalvos) {
      alert("Não há dados para exportar!");
      return;
    }

    // Converte a string (texto) do localStorage de volta para um Objeto/Array de JavaScript
    const listaProdutos = JSON.parse(dadosSalvos);

    // Cria uma 'folha' (sheet) de Excel a partir dos dados em formato JSON
    const folha = XLSX.utils.json_to_sheet(listaProdutos);

    // Cria um 'livro' (workbook) novo, que é o arquivo Excel propriamente dito
    const livro = XLSX.utils.book_new();

    // Adiciona a 'folha' criada anteriormente dentro do 'livro' com o nome "Inventário Atual"
    XLSX.utils.book_append_sheet(livro, folha, "Inventário Atual");

    // Gera o arquivo final e inicia o download automático no navegador com o nome escolhido
    XLSX.writeFile(livro, "Relatorio_Inventario.xlsx");
  };

  // Retorno visual do componente (JSX)
  return (
    // Container principal que utiliza 'var(--bg-fundo)' no CSS para se adaptar ao tema
    <div className="exportar-container">
      {/* Título da página que utiliza 'var(--azul-destaque)' ou 'var(--texto-cor)' */}
      <h1 className="titulo-sessao">Exportar Dados</h1>
      
      {/* Wrapper para organizar o posicionamento do card na tela */}
      <div className="exportar-wrapper">
        {/* O card principal. Ao ser clicado, chama a função de download definida acima */}
        <button className="card-exportar" onClick={baixarPlanilha}>
          
          {/* Cabeçalho interno do card com título e subtítulo */}
          <div className="card-header-exportar">
            <h3>Exportar XLS</h3>
            {/* Texto secundário que usa 'var(--texto-secundario)' para não ofuscar */}
            <span className="subtitulo-card">Relatórios de estoque</span>
          </div>

          {/* Parágrafo com a explicação detalhada da funcionalidade */}
          <p className="descricao-card">
            Gere e baixe relatórios de estoque personalizados (inventário, entradas, saídas e movimentações) para análise e auditoria externa.
          </p>

          {/* Div usada apenas para o detalhe visual da linha no rodapé do card */}
          <div className="linha-decorativa"></div>
        </button>
      </div>
    </div>
  );
}

// Exporta o componente para que ele possa ser importado e usado no App.js ou nas Rotas
export default Exportar;