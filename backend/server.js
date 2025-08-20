import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar la conexión a la DB y las rutas
import connectDB from './config/db.js';
import machineRoutes from './routes/machineRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Asumimos que tienes este archivo
import attendanceRoutes from './routes/attendanceRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Servir archivos estáticos (imágenes) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Rutas del API ---
app.get('/api', (req, res) => {
  res.send('API del Gimnasio funcionando...');
});

app.use('/api/machines', machineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);


// Exportar la app para Vercel
export default app;ra que Vercel lo use como Serverless Function
export default app;
