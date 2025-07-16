require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lecturaRoutes = require('./routes/lecturasRoutes');
const crearTablaLecturas = require('./config/initDb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
     'http://192.168.1.12:5173',
     'https://front-telemetria.onrender.com'
    ]
}));

app.use(express.json());
app.use('/', lecturaRoutes);

const iniciarServidor = async () => {
  await crearTablaLecturas();  // Crea la tabla si no existe

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();

