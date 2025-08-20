// backend/routes/lecturaRoutes.js
const express = require('express');
const router = express.Router();
const {
  obtenerLecturas,
  crearLectura,
  probarConexion
} = require('../controllers/lecturaController');

const verificarToken = require('../middleware/authMiddleware');

// Ruta pública para testear la conexión
router.get('/probar', probarConexion);

// Rutas protegidas
router.get('/', verificarToken, obtenerLecturas);
router.post('/', verificarToken, crearLectura);

module.exports = router;
