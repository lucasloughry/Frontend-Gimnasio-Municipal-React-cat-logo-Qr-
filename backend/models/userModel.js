// backend/models/userModel.js - ACTUALIZADO

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, añade un nombre'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, añade un email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor, añade una contraseña'],
    },
    // --- LÍNEA NUEVA ---
    role: {
      type: String,
      required: true,
      default: 'user', // 'user' o 'admin'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);