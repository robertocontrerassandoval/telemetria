const db = require('./db');

const crearTablaLecturas = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS lecturas (
      id SERIAL PRIMARY KEY,
      temperatura REAL NOT NULL,
      humedad REAL NOT NULL,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(query);
    console.log('Tabla lecturas creada o ya existe.');
  } catch (error) {
    console.error('Error creando tabla lecturas:', error);
  }
};

module.exports = crearTablaLecturas;
