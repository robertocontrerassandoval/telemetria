const db = require('../config/db');

const Lectura = {
  async insertar(temperatura, humedad) {
    const sql = 'INSERT INTO lecturas (temperatura, humedad) VALUES ($1, $2)';
    await db.query(sql, [temperatura, humedad]);
  },

  async obtenerUltimas(limit = 10) {
    const sql = 'SELECT * FROM lecturas ORDER BY fecha DESC LIMIT $1';
    const resultado = await db.query(sql, [limit]);
    return resultado.rows;
  }
};

module.exports = Lectura;
