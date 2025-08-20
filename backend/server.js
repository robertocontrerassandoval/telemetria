require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lecturaRoutes = require('./routes/lecturasRoutes');
const inicializarBD = require('./config/initDb');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
     'http://192.168.1.12:5173',
     'https://frontend-telemetria.onrender.com'
    ]
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/lecturas', lecturaRoutes); // puedes cambiar esto si ya tenías montado así

const iniciarServidor = async () => {
  await inicializarBD();  // Crea la tabla si no existe

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();

