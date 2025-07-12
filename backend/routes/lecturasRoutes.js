const express = require('express');
const router = express.Router();
const lecturaController = require('../controllers/lecturaController');

router.post('/temperatura', lecturaController.crearLectura);
router.get('/temperaturas', lecturaController.obtenerLecturas);

module.exports = router;
