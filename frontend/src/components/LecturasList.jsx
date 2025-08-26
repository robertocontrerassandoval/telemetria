// src/components/LecturasList.jsx
import React from 'react';
export default function LecturasList({ lecturas }) {
  return (
    <ul>
      {lecturas.map((l, i) => (
        <li key={i}>
          {new Date(l.fecha).toLocaleString()} — Temp: {l.temperatura}°C — Humedad: {l.humedad}%
        </li>
      ))}
    </ul>
  );
}
