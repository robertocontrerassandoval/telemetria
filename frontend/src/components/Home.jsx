import React, { useState, useEffect } from 'react';
import LecturasList from './LecturasList.jsx';
import Login from './Login.jsx'; 
import ChartPanel from './ChartPanel.jsx';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import KpiCards from './KpiCard.jsx';

//Api//
const API_URL = import.meta.env.VITE_API_URL;


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 👈 Autenticación
  const [lecturas, setLecturas] = useState([]); //arreglo
  const [temperatura, setTemperatura] = useState(''); //string
  const [humedad, setHumedad] = useState('');
  const [mensaje, setMensaje] = useState('');

   
  
const fetchLecturas = () => {
    fetch(`${API_URL}/api/lecturas`)
      .then(res => res.json())
      .then((data) => {
        console.log("Lecturas recibidas:", data);
        setLecturas(data);
      })
      .catch(console.error);
  };

  // 🕒 Actualización automática en horarios programados
  useEffect(() => {
    const horariosPermitidos = [
      { hora: 8, minuto: 0 },
      { hora: 16, minuto: 45 }
    ];

    let actualizadoHoy = {};

    const verificarHorario = () => {
      const ahora = new Date();
      const hora = ahora.getHours();
      const minuto = ahora.getMinutes();
      const hoy = ahora.toDateString();

      horariosPermitidos.forEach(({ hora: h, minuto: m }) => {
        const clave = `${h}:${m}-${hoy}`;
        if (hora === h && minuto === m && !actualizadoHoy[clave]) {
          console.log(`⏰ Hora coincidente: ${h}:${m}, actualizando lecturas`);
          fetchLecturas();
          actualizadoHoy[clave] = true;
        }
      });
    };

    const intervalo = setInterval(verificarHorario, 30000);
    return () => clearInterval(intervalo);
  }, []);




const descargarExcel = (lecturas) => {

  // Convierte lecturas a un array de objetos para la tabla
  const datos = lecturas.map(({ id, temperatura, humedad, fecha }) => {
    const fechaObj = new Date(fecha);
    const fechaValida = !isNaN(fechaObj.getTime());

    return {
      ID: id,
      Temperatura: temperatura,
      Humedad: humedad,
      Fecha: fechaValida ? fechaObj : null // ⬅️ Usa Date real, no string
    };
  });

  // Crea la hoja de cálculo
  const ws = XLSX.utils.json_to_sheet(datos);

  // ⏱️ Aplica formato a la columna "Fecha" (columna D)
  Object.keys(ws).forEach((cell) => {
    if (cell.startsWith('D') && cell !== 'D1') {
      ws[cell].z = 'dd/mm/yyyy hh:mm:ss'; // ⬅️ Formato con hora
    }
  });

  // Crea el libro de Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Lecturas');

  // Genera un archivo binario de Excel
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Descarga el archivo
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'lecturas_telemetria.xlsx');
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempNum = parseFloat(temperatura); //de string a numero
    const humNum = parseFloat(humedad);

    if (isNaN(tempNum) || isNaN(humNum)) {
      setMensaje('Por favor ingresa valores numéricos válidos.');
      return;
    }

    try {
      // const token = localStorage.getItem('token');

const res = await fetch(`${API_URL}/api/lecturas`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${token}`  // 👈 Aquí agregas el token
  },
  body: JSON.stringify({ temperatura: tempNum, humedad: humNum })
});
      const data = await res.json();
      setMensaje(data.mensaje || 'Lectura enviada');

     const res2 = await fetch(`${API_URL}/api/lecturas`, {
      headers: {
       // 'Authorization': `Bearer ${token}`  // 👈 También en GET
      }
    });
    const nuevasLecturas = await res2.json();
    setLecturas(nuevasLecturas);

      setTemperatura('');
      setHumedad('');
    } catch {
      setMensaje('Error enviando la lectura');
    }
  };

  // 👇 Este código debe ir arriba del `return`, dentro del componente
const ultimaLectura = lecturas.length > 0 ? lecturas[0] : null;
 // Si no está autenticado, muestra el formulario de login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
console.log("Última lectura en dashhhhhh:", ultimaLectura);


  return (
 
<div style={{
  padding: '2rem',
  fontFamily: 'Roboto, sans-serif',
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#f4f6f8',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
}}>
  <h1 style={{ textAlign: 'center', color: '#333' }}>
    📊 Dashboard de Telemetría Ambiental
  </h1>

  {/* KPI Cards */}
<KpiCards lectura={ultimaLectura} />  

  {/* 📈 Chart */}
  <ChartPanel lecturas={lecturas} />

  {/* 📥 Formulario */}
  <form
    onSubmit={handleSubmit}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem',
      backgroundColor: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}
  >
    <input
      type="text"
      placeholder="Temperatura (°C)"
      value={temperatura}
      onChange={e => setTemperatura(e.target.value)}
      style={{
        padding: '0.6rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem'
      }}
    />
    <input
      type="text"
      placeholder="Humedad (%)"
      value={humedad}
      onChange={e => setHumedad(e.target.value)}
      style={{
        padding: '0.6rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem'
      }}
    />
    <button
      type="submit"
      style={{
        padding: '0.7rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer'
      }}
    >
      Enviar Lectura
    </button>
  </form>

  {/* 📦 Botón manual de actualización */}
      <button
        onClick={fetchLecturas}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '1rem',
          cursor: 'pointer'
        }}
      >
        🔄 Actualizar lecturas
      </button>

  {/* 🟩 Mensaje */}
  {mensaje && (
    <p style={{
      backgroundColor: '#e0ffe0',
      color: '#2e7d32',
      padding: '0.75rem',
      borderRadius: '4px',
      marginBottom: '1rem',
      fontWeight: 'bold'
    }}>
      {mensaje}
    </p>
  )}

  {/* 🧾 Lista de lecturas */}
 

  {/* 📁 Botón Excel */}
  <button
    onClick={ () => descargarExcel(lecturas)}
    style={{
      marginTop: '1rem',
      padding: '0.7rem',
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer'
    }}
  >
    Descargar Excel
  </button>
</div>

  );
}

export default Home;
