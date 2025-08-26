// src/components/LecturasList.jsx
import React from 'react';

export default function LecturasList({ lecturas }) {
  const ultimas10 = lecturas
    .slice(-10) // toma las últimas 10 (del final)
    .reverse(); // las pone de la más reciente a la más antigua

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
