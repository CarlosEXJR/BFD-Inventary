import '../csscomponents/importar.css'

import { useState } from "react";

function Importar() {
  return (
    <div className="importar-container">

      <div className="importar-card">

        {/* LADO ESQUERDO */}
        <div className="importar-esquerda">
          <div className="importar-logo">logo</div>

          <h2>
            Atualize seu estoque<br />
            enviando uma planilha
          </h2>

          <label className="btn-upload">
            Upload
            <input type="file" hidden />
          </label>

          <small>Apenas arquivos “.xls”. Tamanho máximo: 10MB</small>
        </div>

        {/* LADO DIREITO */}
        <div className="importar-direita">
          <div className="arquivo">
            <strong>Inventario_Ciclico.xls</strong>
            <span>Arquivo carregado com sucesso</span>
          </div>

          <div className="arquivo">
            <strong>Atualizacao_Estoque_202512.xls</strong>
            <span>Arquivo carregado com sucesso</span>
          </div>

          <button className="btn-processar">
            Processar Arquivo
          </button>
        </div>

      </div>

    </div>
  );
}

export default Importar;
