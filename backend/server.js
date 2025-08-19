// backend/server.js - ACTUALIZADO

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- 1. IMPORTAR JWT
const User = require('./models/userModel');
const path = require('path');

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.get('/api', (req, res) => {
  res.json({ message: "¡El backend del gimnasio está funcionando!" });
});

app.post('/api/register', async (req, res) => {
  // ... (esta ruta de registro se queda como está)
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        message: 'Usuario registrado exitosamente',
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// --- 2. NUEVA RUTA DE LOGIN ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await User.findOne({ email });

    // Si el usuario existe y la contraseña coincide...
    if (user && (await bcrypt.compare(password, user.password))) {
  // Generar el token (la credencial)
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { // <-- Añadir role al token
    expiresIn: '1h',
  });

  // Enviar la respuesta con los datos del usuario y el token
  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role, // <-- Añadir role a la respuesta
    token: token,
  });
} else {
      // Si no, enviar un error de credenciales inválidas
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Usar las rutas de las máquinas
app.use('/api/machines', require('./routes/machineRoutes'));

// Usar las rutas de asistencia
app.use('/api/attendance', require('./routes/attendanceRoutes'));

// Poner el servidor a escuchar
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});