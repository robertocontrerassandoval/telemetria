import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

function ChartPanel({ lecturas }) {
  const data = {
    labels: lecturas.map(l => new Date(l.fecha).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: lecturas.map(l => l.temperatura),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
      },
      {
        label: 'Humedad (%)',
        data: lecturas.map(l => l.humedad),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div style={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Tendencia de Lecturas</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartPanel;
