// backend/routes/lecturaRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerLecturas, crearLectura, probarConexion } = require('../controllers/lecturaController');

router.get('/temperaturas', obtenerLecturas);
router.post('/temperaturas', crearLectura);

// Ruta opcional para probar conexión
router.get('/probar', probarConexion);

module.exports = router;
