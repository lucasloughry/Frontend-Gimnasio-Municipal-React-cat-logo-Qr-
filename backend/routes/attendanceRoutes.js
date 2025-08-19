const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel'); // Necesitamos verificar que el usuario exista

// RUTA PARA REGISTRAR UN CHECK-IN
// POST /api/attendance/checkin
router.post('/checkin', async (req, res) => {
  try {
    const { userId } = req.body; // Recibimos el ID del usuario desde el scanner

    // Verificamos que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Creamos el nuevo registro de asistencia
    const newAttendance = await Attendance.create({
      user: userId,
    });

    // Enviamos una respuesta exitosa con el nombre del usuario
    res.status(201).json({
      message: 'Check-in registrado exitosamente',
      userName: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
