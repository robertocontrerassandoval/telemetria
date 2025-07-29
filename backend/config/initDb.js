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

const crearTablaUsuarios = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(query);
    console.log('Tabla users creada o ya existe.');
  } catch (error) {
    console.error('Error creando tabla users:', error);
  }
};

const inicializarBD = async () => {
  await crearTablaLecturas();
  await crearTablaUsuarios();
};

module.exports = inicializarBD;

