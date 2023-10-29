const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('views/index.ejs'); // Ruta completa a la plantilla
});

router.get('/login', (req, res) => {
  res.render('views/login.ejs'); // Ruta completa a la plantilla
});

router.get('/profile', (req, res) => {
  res.render('views/profile.ejs');
});

router.get('/registro', (req, res) => {
  res.render('views/registro.ejs'); // Ruta completa a la plantilla
});


module.exports = router;
