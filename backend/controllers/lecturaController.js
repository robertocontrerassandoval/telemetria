const Lectura = require('../models/lecturaModel');
const pool = require('../config/db');

const crearLectura = async (req, res) => {
  const { temperatura, humedad } = req.body;

  if (typeof temperatura !== 'number' || typeof humedad !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    await Lectura.insertar(temperatura, humedad);
    res.status(201).json({ mensaje: 'Lectura guardada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const obtenerLecturas = async (req, res) => {
  try {
    const datos = await Lectura.obtenerUltimas();
    res.json(datos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const probarConexion = async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ ok: true, mensaje: 'Conexión exitosa con PostgreSQL' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fallo de conexión a la base de datos' });
  }

};

 const obtenerTodas = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM lecturas ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener todas las lecturas' });
  }
}
module.exports = {
  crearLectura,
  obtenerTodas,
  obtenerLecturas,
  probarConexion
};