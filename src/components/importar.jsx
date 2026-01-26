import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; 
import '../csscomponents/importar.css';

/**
 * Componente Importar
 * Permite ao usuário carregar arquivos Excel (.xls, .xlsx) para popular o inventário.
 */
function Importar() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [historicoImport, setHistoricoImport] = useState([]);

  // Carrega o histórico de importações do LocalStorage ao montar o componente
  useEffect(() => {
    const salvo = localStorage.getItem("historico_importacao");
    if (salvo) setHistoricoImport(JSON.parse(salvo));
  }, []);

  // Manipula a seleção do arquivo através do input file
  const selecionarArquivo = (e) => {
    if (e.target.files.length > 0) {
      setArquivoSelecionado(e.target.files[0]);
      setMensagem(""); 
    }
  };

  /**
   * Função processarEnvio
   * Utiliza a biblioteca XLSX para converter o arquivo Excel em um objeto JSON utilizável.
   */
  const processarEnvio = () => {
    if (!arquivoSelecionado) return;
    const leitor = new FileReader();

    leitor.onload = (evento) => {
      try {
        const dadosBinarios = evento.target.result;
        // Lê o arquivo como binário
        const livro = XLSX.read(dadosBinarios, { type: 'binary' });
        // Captura a primeira planilha do arquivo
        const planilha = livro.Sheets[livro.SheetNames[0]];
        const dadosJson = XLSX.utils.sheet_to_json(planilha);

        /**
         * Mapeamento e Limpeza:
         * Normaliza os nomes das colunas para letras maiúsculas e remove espaços.
         * Tenta identificar campos comuns como 'CODIGO' ou 'REF'.
         */
        const novosItens = dadosJson.map((linha) => {
          const linhaLimpa = {};
          Object.keys(linha).forEach(chave => {
            linhaLimpa[chave.trim().toUpperCase()] = linha[chave];
          });

          return {
            id: Number(linhaLimpa.ID) || Date.now() + Math.random(),
            codigo: String(linhaLimpa.CODIGO || linhaLimpa.COD || linhaLimpa.REF || "S/C"),
            nome: String(linhaLimpa.NOME || linhaLimpa.DESCRICAO || linhaLimpa.DESCRIÇÃO || linhaLimpa.PRODUTO || "Item sem Nome"),
            quantidade: Number(linhaLimpa.QTD || linhaLimpa.QUANTIDADE || linhaLimpa.ESTOQUE) || 0
          };
        });

        // Atualiza o inventário principal no LocalStorage
        const listaAntiga = JSON.parse(localStorage.getItem("meu_inventario") || "[]");
        localStorage.setItem("meu_inventario", JSON.stringify([...listaAntiga, ...novosItens]));
        
        // Cria e armazena o registro da importação no histórico
        const novaImportacao = {
          id: Date.now(),
          nomeArquivo: arquivoSelecionado.name,
          data: new Date().toLocaleString(),
          qtdItens: novosItens.length
        };
        const novoHistorico = [novaImportacao, ...historicoImport].slice(0, 5); // Mantém apenas os últimos 5
        setHistoricoImport(novoHistorico);
        localStorage.setItem("historico_importacao", JSON.stringify(novoHistorico));

        setMensagem(`Sucesso! ${novosItens.length} itens importados.`);
        setArquivoSelecionado(null);
      } catch (err) {
        setMensagem("Erro ao ler o arquivo. Verifique se é um Excel válido.");
      }
    };
    leitor.readAsBinaryString(arquivoSelecionado);
  };

  return (
    <div className="importar-container">
      <h1 className="titulo-sessao">Importação de Dados</h1>
      
      <div className="importar-flex-layout">
        
        {/* LADO ESQUERDO: Interface de seleção de arquivo */}
        <div className="importar-sidebar">
          <div className="grupo-upload">
            <p className="legenda-grande">Atualize seu estoque. Carregue um arquivo xls.</p>
            
            <input 
              type="file" 
              id="arquivo-input"
              accept=".xlsx, .xls" 
              onChange={selecionarArquivo} 
              style={{ display: 'none' }} 
            />
            
            <label 
              htmlFor="arquivo-input" 
              className={`area-upload-lateral ${arquivoSelecionado ? 'ativo' : ''}`}
            >
              <span className="icon-upload">📁</span>
              <span className="text-upload">
                {arquivoSelecionado ? "Alterar Arquivo" : "Selecionar arquivo xls"}
              </span>
            </label>

            <p className="legenda-pequena">Apenas arquivos (.xls). Tamanho máximo 50MB</p>
            
            {arquivoSelecionado && (
              <div className="arquivo-info">
                <span className="nome-arquivo-badge">{arquivoSelecionado.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* LADO DIREITO: Botões de ação e resumo das últimas atividades */}
        <div className="card-importar-compacto">
          <div className="secao-confirmacao">
            <h3>Ações</h3>
            <button 
              onClick={processarEnvio}
              disabled={!arquivoSelecionado}
              className="btn-confirmar-import"
            >
              Confirmar e Enviar
            </button>
            {mensagem && (
              <p className={mensagem.includes("Erro") ? "msg-erro-small" : "msg-sucesso-small"}>
                {mensagem}
              </p>
            )}
          </div>

          <div className="linha-divisor"></div>

          <div className="secao-historico">
            <h3>Últimos Uploads</h3>
            {historicoImport.length === 0 ? (
              <p className="txt-vazio">Nenhuma importação recente.</p>
            ) : (
              <ul className="lista-historico">
                {historicoImport.map(item => (
                  <li key={item.id}>
                    <div className="hist-info">
                      <strong>{item.nomeArquivo}</strong>
                      <span>{item.data}</span>
                    </div>
                    <span className="hist-qtd">+{item.qtdItens}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Importar;