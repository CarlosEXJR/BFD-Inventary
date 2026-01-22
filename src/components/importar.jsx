import { useState } from 'react';
import * as XLSX from 'xlsx'; 
import '../csscomponents/importar.css';

function Importar() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const selecionarArquivo = (e) => {
    if (e.target.files.length > 0) {
      setArquivoSelecionado(e.target.files[0]);
      setMensagem(""); 
    }
  };

  const processarEnvio = () => {
    if (!arquivoSelecionado) return;
    const leitor = new FileReader();
    leitor.onload = (evento) => {
      try {
        const dadosBinarios = evento.target.result;
        const livro = XLSX.read(dadosBinarios, { type: 'binary' });
        const planilha = livro.Sheets[livro.SheetNames[0]];
        const dadosJson = XLSX.utils.sheet_to_json(planilha);

        const novosItens = dadosJson.map((linha) => ({
          id: Number(linha.ID) || Date.now() + Math.random(),
          codigo: String(linha.CODIGO || "S/C"),
          nome: String(linha.NOME || "Item sem Nome"),
          quantidade: Number(linha.QTD) || 0
        }));

        const listaAntiga = JSON.parse(localStorage.getItem("meu_inventario") || "[]");
        localStorage.setItem("meu_inventario", JSON.stringify([...listaAntiga, ...novosItens]));
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
      <h1 className="titulo-sessao">Importar Inventário</h1>
      
      <div className="importar-wrapper">
        <div className="card-importar">
          <div className="card-header-importar">
            <h3>Selecionar Planilha</h3>
            <span className="subtitulo-card">Formatos aceitos: .xlsx, .xls</span>
          </div>

          <input 
            type="file" 
            id="arquivo-input"
            accept=".xlsx, .xls" 
            onChange={selecionarArquivo} 
            style={{ display: 'none' }} 
          />
          
          <label htmlFor="arquivo-input" className="label-upload">
            {arquivoSelecionado ? "📄 " + arquivoSelecionado.name : "📁 Escolher Arquivo Excel"}
          </label>

          <p className="descricao-card">
            Selecione o arquivo exportado ou sua planilha padrão para atualizar o banco de dados local.
          </p>

          <div className="linha-decorativa"></div>

          <button 
            onClick={processarEnvio}
            disabled={!arquivoSelecionado}
            className="btn-confirmar-import"
          >
            Confirmar e Enviar Dados
          </button>
        </div>
      </div>

      {mensagem && (
        <p className={mensagem.includes("Erro") ? "msg-erro" : "msg-sucesso"}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default Importar;