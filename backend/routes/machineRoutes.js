const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Machine = require('../models/machineModel');

// --- Configuración de Multer para FOTOS de máquinas ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `machine-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// --- Configuración de Multer para GIFS de ejercicios ---
const exerciseStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/gifs/');
  },
  filename(req, file, cb) {
    cb(null, `exercise-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const uploadGif = multer({ storage: exerciseStorage });


// --- RUTAS ---

// RUTA PARA OBTENER TODAS LAS MÁQUINAS
router.get('/', async (req, res) => {
  try {
    const machines = await Machine.find({}).lean();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// RUTA PARA OBTENER UNA MÁQUINA POR SU ID
router.get('/:id', async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
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
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : '';
    if (!name || !description) {
      return res.status(400).json({ message: 'Por favor, completa todos los campos' });
    }
    const newMachine = await Machine.create({ name, description, image, exercises: [] });
    res.status(201).json(newMachine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// RUTA PARA AÑADIR UN EJERCICIO A UNA MÁQUINA
router.post('/:id/exercises', uploadGif.single('gif'), async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (machine) {
      const { name } = req.body;
      const gifUrl = req.file ? req.file.path.replace(/\\/g, "/") : '';
      if (!name || !gifUrl) {
        return res.status(400).json({ message: 'Falta el nombre o el GIF del ejercicio.' });
      }
      const newExercise = { name, gifUrl };
      machine.exercises.push(newExercise);
      await machine.save();
      res.status(201).json(machine);
    } else {
      res.status(404).json({ message: 'Máquina no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
