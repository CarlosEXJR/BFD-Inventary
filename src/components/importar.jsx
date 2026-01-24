// Importa o Hook 'useState' para gerenciar o estado do arquivo e das mensagens
import { useState } from 'react';
// Importa a biblioteca 'xlsx' para ler e processar o conteúdo das planilhas Excel
import * as XLSX from 'xlsx'; 
// Importa os estilos CSS específicos para a tela de importação
import '../csscomponents/importar.css';

function Importar() {
  // Estado para armazenar o arquivo físico selecionado pelo usuário
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  // Estado para exibir mensagens de sucesso ou erro na tela
  const [mensagem, setMensagem] = useState("");

  // Função disparada quando o usuário escolhe um arquivo no explorador de arquivos
  const selecionarArquivo = (e) => {
    // Verifica se pelo menos um arquivo foi de fato selecionado
    if (e.target.files.length > 0) {
      // Guarda o primeiro arquivo da lista no estado
      setArquivoSelecionado(e.target.files[0]);
      // Limpa qualquer mensagem de erro ou sucesso anterior
      setMensagem(""); 
    }
  };

  // Função responsável por ler o arquivo Excel e salvar os dados no sistema
  const processarEnvio = () => {
    // Se não houver arquivo selecionado, interrompe a função
    if (!arquivoSelecionado) return;
    
    // Cria um objeto nativo do navegador para ler o conteúdo de arquivos
    const leitor = new FileReader();

    // Evento disparado assim que a leitura do arquivo termina com sucesso
    leitor.onload = (evento) => {
      try {
        // Obtém o conteúdo bruto (binário) do arquivo
        const dadosBinarios = evento.target.result;
        // Transforma os dados binários em um objeto de "livro" do Excel
        const livro = XLSX.read(dadosBinarios, { type: 'binary' });
        // Seleciona a primeira aba/planilha do arquivo Excel
        const planilha = livro.Sheets[livro.SheetNames[0]];
        // Converte o conteúdo da planilha em um Array de Objetos JSON
        const dadosJson = XLSX.utils.sheet_to_json(planilha);

        // Mapeia os dados do Excel para o formato padrão do seu sistema
        const novosItens = dadosJson.map((linha) => ({
          // Garante um ID numérico, ou gera um aleatório caso não exista na planilha
          id: Number(linha.ID) || Date.now() + Math.random(),
          // Converte o código para texto ou define "S/C" (Sem Código) por padrão
          codigo: String(linha.CODIGO || "S/C"),
          // Define o nome do item ou um texto padrão de erro
          nome: String(linha.NOME || "Item sem Nome"),
          // Garante que a quantidade seja um número válido
          quantidade: Number(linha.QTD) || 0
        }));

        // Busca a lista atual de produtos que já está no LocalStorage (ou um array vazio se não houver)
        const listaAntiga = JSON.parse(localStorage.getItem("meu_inventario") || "[]");
        // Une os itens antigos com os novos e salva tudo de volta no LocalStorage
        localStorage.setItem("meu_inventario", JSON.stringify([...listaAntiga, ...novosItens]));
        
        // Exibe mensagem de sucesso com a contagem de itens
        setMensagem(`Sucesso! ${novosItens.length} itens importados.`);
        // Reseta o estado do arquivo para limpar o campo de seleção
        setArquivoSelecionado(null);
      } catch (err) {
        // Caso ocorra algum erro na leitura ou conversão, avisa o usuário
        setMensagem("Erro ao ler o arquivo. Verifique se é um Excel válido.");
      }
    };
    // Inicia a leitura do arquivo selecionado como uma string binária
    leitor.readAsBinaryString(arquivoSelecionado);
  };

  return (
    // Container principal que respeita o background-color das suas variáveis de tema
    <div className="importar-container">
      <h1 className="titulo-sessao">Importar Inventário</h1>
      
      <div className="importar-wrapper">
        {/* Card centralizado que mudará de cor no hover conforme configuramos */}
        <div className="card-importar">
          <div className="card-header-importar">
            <h3>Selecionar Planilha</h3>
            <span className="subtitulo-card">Formatos aceitos: .xlsx, .xls</span>
          </div>

          {/* Input de arquivo escondido para permitir estilização customizada através da label */}
          <input 
            type="file" 
            id="arquivo-input"
            accept=".xlsx, .xls" 
            onChange={selecionarArquivo} 
            style={{ display: 'none' }} 
          />
          
          {/* Label estilizada que funciona como o botão de seleção visível */}
          <label htmlFor="arquivo-input" className="label-upload">
            {/* Se houver arquivo, mostra o nome dele; caso contrário, mostra o texto padrão */}
            {arquivoSelecionado ? "📄 " + arquivoSelecionado.name : "📁 Escolher Arquivo Excel"}
          </label>

          <p className="descricao-card">
            Selecione o arquivo exportado ou sua planilha padrão para atualizar o banco de dados local.
          </p>

          {/* Div para efeitos visuais de borda ou separação no card */}
          <div className="linha-decorativa"></div>

          {/* Botão de envio que só fica habilitado se houver um arquivo selecionado */}
          <button 
            onClick={processarEnvio}
            disabled={!arquivoSelecionado}
            className="btn-confirmar-import"
          >
            Confirmar e Enviar Dados
          </button>
        </div>
      </div>

      {/* Renderização condicional da mensagem de feedback */}
      {mensagem && (
        <p className={mensagem.includes("Erro") ? "msg-erro" : "msg-sucesso"}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default Importar;