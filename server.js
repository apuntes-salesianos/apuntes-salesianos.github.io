const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors({
  origin: '*', // Puedes restringir esto a dominios específicos si lo deseas
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ninguna imagen');
  }
  const imgUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.send(imgUrl);
});

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});