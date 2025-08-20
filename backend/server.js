import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Configuración de uploads ---
const uploadDir = path.join(process.cwd(), "backend/uploads");

// Crear carpeta si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// --- Rutas API ---
// Ejemplo GET
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde Express en Vercel 🚀" });
});

// Ejemplo POST con subida de archivo
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "Archivo subido correctamente",
    filename: req.file.filename,
  });
});

// Exportar app para que Vercel lo use como Serverless Function
export default app;
