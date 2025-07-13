import React, { useState, useEffect } from 'react';
import LecturasList from './components/LecturasList.jsx';


const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [lecturas, setLecturas] = useState([]);
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/temperaturas`)
      .then(res => res.json())
      .then(data => setLecturas(data))
      .catch(console.error);
  }, []);

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

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Lecturas de Temperatura y Humedad</h1>

      <LecturasList lecturas={lecturas} />

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Temperatura"
          value={temperatura}
          onChange={e => setTemperatura(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Humedad"
          value={humedad}
          onChange={e => setHumedad(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">Enviar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h2>Últimas lecturas:</h2>
      <ul>
        {lecturas.map((l, i) => (
          <li key={i}>
            {new Date(l.fecha).toLocaleString()} — Temp: {l.temperatura}°C — Humedad: {l.humedad}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
