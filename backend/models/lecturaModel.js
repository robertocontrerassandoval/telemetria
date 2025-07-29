const pool = require('../config/db');

const insertar = async (temperatura, humedad) => {
  const fecha = new Date();
  const query = `
    INSERT INTO lecturas (fecha, temperatura, humedad)
    VALUES ($1, $2, $3)
  `;
  const values = [fecha, temperatura, humedad];
  await pool.query(query, values);
};

const obtenerUltimas = async () => {
  const query = `
    SELECT fecha, temperatura, humedad
    FROM lecturas
    ORDER BY fecha DESC

  `;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  insertar,
  obtenerUltimas
};
