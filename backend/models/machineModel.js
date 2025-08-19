const mongoose = require('mongoose');

const machineSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // <-- AÑADE ESTA LÍNEA
  exercises: [
    {
      name: String,
      gifUrl: String, // Aquí irá el enlace al GIF del ejercicio
    },
  ],
});

module.exports = mongoose.model('Machine', machineSchema);