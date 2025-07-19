import React, { useState, useEffect } from 'react';
import LecturasList from './components/LecturasList.jsx';
import Login from './components/Login.jsx'; // 👉 Importa el nuevo componente

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 👈 Autenticación
  const [lecturas, setLecturas] = useState([]);
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [mensaje, setMensaje] = useState('');

    // Si no está autenticado, muestra el formulario de login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  
  useEffect(() => {
    fetch(`${API_URL}/temperaturas`)
      .then(res => res.json())
      .then(data => setLecturas(data))
      .catch(console.error);
  }, []);

  //actualizar la lista cada 10 segundos

  useEffect(() => {
  const intervalo = setInterval(() => {
    fetch(`${API_URL}/temperaturas`)
      .then(res => res.json())
      .then(data => {
        setLecturas(data);
      })
      .catch(console.error);
  }, 100000); //aqui va el tiempo de la medicion

  return () => clearInterval(intervalo);
}, []);  // <-- solo se ejecuta una vez, sin dependencias


 const descargarExcel = () => {
  // Convierte lecturas a formato de tabla (array de objetos)
  const datos = lecturas.map(({ id, temperatura, humedad, createdAt }) => ({
    ID: id,
    Temperatura: temperatura,
    Humedad: humedad,
    Fecha: new Date(createdAt).toLocaleString()
  }));

  // Crea una hoja de Excel con los datos
  const ws = XLSX.utils.json_to_sheet(datos);

  // Crea un libro y agrega la hoja
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Lecturas');

  // Genera un archivo binario de Excel
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Crea un blob y descarga el archivo
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'lecturas_telemetria.xlsx');
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempNum = parseFloat(temperatura);
    const humNum = parseFloat(humedad);

    if (isNaN(tempNum) || isNaN(humNum)) {
      setMensaje('Por favor ingresa valores numéricos válidos.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/temperaturas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ temperatura: tempNum, humedad: humNum })
      });
      const data = await res.json();
      setMensaje(data.mensaje || 'Lectura enviada');

      const res2 = await fetch(`${API_URL}/temperaturas`);
      const nuevasLecturas = await res2.json();
      setLecturas(nuevasLecturas);

      setTemperatura('');
      setHumedad('');
    } catch {
      setMensaje('Error enviando la lectura');
    }
  };

  // 👇 Este código debe ir arriba del `return`, dentro del componente
const ultimaLectura = lecturas.length > 0 ? lecturas[lecturas.length - 1] : null;


  return (
  <div style={{
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
}}>
  <h1 style={{ textAlign: 'center', color: '#333' }}>
    Lecturas de Temperatura y Humedad
  </h1>

  <form
    onSubmit={handleSubmit}
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem'
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
      Enviar
    </button>
  </form>

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

  {/* 🔥 Recuadros con última lectura */}
  <div style={{
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    justifyContent: 'space-between'
  }}>
    <div style={{
      flex: 1,
      backgroundColor: '#ffebee',
      borderLeft: '6px solid #f44336',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '1.2rem'
    }}>
      🌡️ <strong>Temperatura:</strong><br />
      {ultimaLectura ? `${ultimaLectura.temperatura} °C` : 'Sin lectura'}
    </div>

    <div style={{
      flex: 1,
      backgroundColor: '#e3f2fd',
      borderLeft: '6px solid #2196F3',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      fontSize: '1.2rem'
    }}>
      💧 <strong>Humedad:</strong><br />
      {ultimaLectura ? `${ultimaLectura.humedad} %` : 'Sin lectura'}
    </div>
  </div>

  <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>
    Últimas lecturas:
  </h2>

  <LecturasList lecturas={lecturas} />

  <button
  onClick={descargarExcel}
  style={{
    marginBottom: '1rem',
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

export default App;
