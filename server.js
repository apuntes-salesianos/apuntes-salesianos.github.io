const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // <-- Importar CORS

const app = express();
const port = 3000;

// Habilitar CORS para permitir peticiones desde otros orígenes
app.use(cors());

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Servir imágenes estáticas
app.use("/uploads", express.static("uploads"));

// Ruta para subir imágenes
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen." });
  }
  console.log("Archivo recibido:", req.file);
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Iniciar servidor
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
