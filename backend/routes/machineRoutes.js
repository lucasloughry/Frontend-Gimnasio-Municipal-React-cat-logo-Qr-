const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Machine = require('../models/machineModel');

// --- Configuración de Multer (esto está bien, no cambia) ---
const storage = multer.diskStorage({ /* ... */ });
const upload = multer({ storage });
const exerciseStorage = multer.diskStorage({ /* ... */ });
const uploadGif = multer({ storage: exerciseStorage });


// --- RUTAS ---

// RUTA PARA OBTENER TODAS LAS MÁQUINAS
router.get('/', async (req, res) => {
  try {
    const machines = await Machine.find({}).lean(); // Correcto con .lean()
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// RUTA PARA OBTENER UNA MÁQUINA POR SU ID
router.get('/:id', async (req, res) => {
  try {
    // APLICAMOS LA MISMA SOLUCIÓN AQUÍ
    const machine = await Machine.findById(req.params.id).lean(); // <-- CORRECCIÓN
    
    if (machine) {
      res.json(machine);
    } else {
      res.status(404).json({ message: 'Máquina no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// RUTA PARA CREAR UNA MÁQUINA
router.post('/', upload.single('image'), async (req, res) => { /* ...código existente... */ });

// RUTA PARA AÑADIR UN EJERCICIO A UNA MÁQUINA
router.post('/:id/exercises', uploadGif.single('gif'), async (req, res) => { /* ...código existente... */ });

// RUTA PARA BORRAR UN EJERCICIO DE UNA MÁQUINA
router.delete('/:machineId/exercises/:exerciseId', async (req, res) => { /* ...código existente... */ });


module.exports = router;