import React from 'react';
import '../styles/style.css'; 

const KpiCards = ({ lectura }) => {
  return (
    <div className="kpi-container">
      <div className="kpi-card temperature">
        🌡️ <strong>Temperatura:</strong><br />
        {lectura && lectura.temperatura !== 0
          ? `${lectura.temperatura} °C`
          : 'Sin lectura'}
      </div>

      <div className="kpi-card humidity">
        💧 <strong>Humedad:</strong><br />
        {lectura ? `${lectura.humedad} %` : 'Sin lectura'}
      </div>
    </div>
  );
};

export default KpiCards;
