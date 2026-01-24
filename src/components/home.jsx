// Importa o arquivo CSS externo para aplicar os estilos e cores (incluindo as variáveis de tema)
import '../csscomponents/home.css'

// Define o componente funcional Home, recebendo a função 'mudarTela' como propriedade (prop)
function Home({ mudarTela }) {
    return (
        // Container principal da tela inicial, utilizado para centralização absoluta no CSS
        <div className="btshome"> 
            {/* Título principal da página de boas-vindas */}
            <h1>Escolha uma ação para iniciar</h1>
            
            {/* Container flexível que organiza os três botões (cards) lado a lado ou em coluna */}
            <div className="buttons-container">
                
                {/* Botão/Card de Inventário: executa a função mudarTela passando o destino "inventario" */}
                <button onClick={() => mudarTela("inventario")}>
                    {/* Título interno do card */}
                    <h2>Inventário</h2>
                    {/* Subtítulo curto para identificação rápida */}
                    <p className="subtitle">Produtos em estoque</p>
                    {/* Texto descritivo sobre as funcionalidades da tela de inventário */}
                    <p>Visualize, pesquise e edite a lista completa de produtos em estoque. 
                       Acompanhe a quantidade e o status de cada item em tempo real.</p>
                    {/* Linha horizontal decorativa no rodapé do card */}
                    <hr className="divider" />
                </button>

                {/* Botão/Card de Importação: executa a função mudarTela passando o destino "importar" */}
                <button onClick={() => mudarTela("importar")}>
                    {/* Título interno do card */}
                    <h2>Importar XLS</h2>
                    {/* Subtítulo curto indicando a ação de upload */}
                    <p className="subtitle">Upload de planilhas</p>
                    {/* Descrição explicando a facilidade de atualização em massa via Excel */}
                    <p>Realize o upload de planilhas (XLS) para adicionar novos produtos ou 
                       atualizar grandes volumes de dados de estoque de uma só vez.</p>
                    {/* Linha horizontal decorativa no rodapé do card */}
                    <hr className="divider" />
                </button>

                {/* Botão/Card de Exportação: executa a função mudarTela passando o destino "exportar" */}
                <button onClick={() => mudarTela("exportar")}>
                    {/* Título interno do card */}
                    <h2>Exportar XLS</h2>
                    {/* Subtítulo focado em relatórios e auditoria */}
                    <p className="subtitle">Relatórios de estoque</p>
                    {/* Explicação sobre a geração de arquivos para análise externa */}
                    <p>Gere e baixe relatórios de estoque personalizados (inventário, entradas, 
                       saídas e movimentações) para análise e auditoria externa.</p>
                    {/* Linha horizontal decorativa no rodapé do card */}
                    <hr className="divider" />
                </button>
            </div>
        </div>
    )
}

// Exporta o componente para ser renderizado como a tela principal após o login
export default Home