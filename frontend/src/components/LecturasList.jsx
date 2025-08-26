import React from 'react';

export default function LecturasList({ lecturas }) {
  const ultimas10 = [...lecturas].slice(-10).reverse(); // Las últimas 10, más recientes primero

  return (
    <ul>
      {ultimas10.map((l, i) => (
        <li key={i}>
          {new Date(l.fecha).toLocaleString()} — Temp: {l.temperatura}°C — Humedad: {l.humedad}%
        </li>
      ))}
    </ul>
  );
}