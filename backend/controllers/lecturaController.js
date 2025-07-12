const Lectura = require('../models/lecturaModel');

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

module.exports = {
  crearLectura,
  obtenerLecturas
};