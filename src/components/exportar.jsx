import '../csscomponents/exportar.css'
import { useState } from "react";

function Exportar() {
  return (
    <div className="exportar-container">

      <div className="exportar-card">

        <h2>Últimas movimentações</h2>

        <div className="exportar-tabela">

          <div className="exportar-header">
            <span>Nome</span>
            <span>Data</span>
            <span>Download</span>
          </div>

          <div className="exportar-linha">
            <span>Inventario_Geral_Dezembro.xls</span>
            <span>16/12/2025</span>
            <button className="btn-download">⬇</button>
          </div>

          <div className="exportar-linha">
            <span>Relatorio_Perdas_2025.xls</span>
            <span>12/12/2025</span>
            <button className="btn-download">⬇</button>
          </div>

          <div className="exportar-linha">
            <span>Entradas_Saidas_Semana42.xls</span>
            <span>08/12/2025</span>
            <button className="btn-download">⬇</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Exportar;
