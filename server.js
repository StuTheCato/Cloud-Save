const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 80

// Konfiguration für Multer (Datei-Upload)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Statische Dateien im 'uploads' Ordner bereitstellen
app.use('/uploads', express.static('uploads'));

// Routen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).send('Error reading upload directory');
    }
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
