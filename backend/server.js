const express = require('express');
const cors = require('cors');
const lecturaRoutes = require('./routes/lecturaRoutes');
const crearTablaLecturas = require('./config/initDb');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/', lecturaRoutes);

const iniciarServidor = async () => {
  await crearTablaLecturas();  // Crea la tabla si no existe

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();

