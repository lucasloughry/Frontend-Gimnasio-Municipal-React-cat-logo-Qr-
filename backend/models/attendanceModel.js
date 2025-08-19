const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  // Guardamos una referencia al usuario que hizo check-in
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Esto conecta con nuestro modelo de Usuario
  },
  checkinTime: {
    type: Date,
    default: Date.now, // La hora se registra automáticamente
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
