const express = require('express');
const router = express.Router();
const Course = require('../models/cursosmodel');
const { isAuthenticated } = require('../middleware/authMiddleware');
const passport = require('passport');
const User = require('../models/usermodel');


const app = express();







router.get('/', (req, res) => {
  res.render('views/index.ejs'); // Ruta completa a la plantilla
});

router.get('/login', (req, res) => {
  res.render('views/login.ejs'); // Ruta completa a la plantilla
});

router.get('/registro', (req, res) => {
  res.render('views/registro.ejs'); // Ruta completa a la plantilla
});


router.get('/profile', (req, res) => {
  // Verifica si el usuario es admin (puedes ajustar esta comprobación)
  const isAdmin = req.user && req.user.role === 'admin';

  console.log('El usuario es administrador:', isAdmin);

  // Renderiza el perfil con isAdmin
  res.render('profile', { isAdmin });
});

router.get('/ingresarcurso', isAuthenticated, (req, res) => {
  // Verificar si el usuario es un administrador
  if (req.user.role !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  // Renderizar la vista 'ingresar-curso.ejs'
  res.render('ingresarcurso');
});

// Ruta para procesar el formulario de ingreso del curso
router.post('/ingresarcurso', isAuthenticated, (req, res) => {
  // Verificar si el usuario es un administrador
  if (req.user.role !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }

  // Crear un nuevo curso con los datos del formulario
  const newCourse = new Course(req.body);

  // Guardar el nuevo curso en la base de datos
  newCourse.save((err) => {
    if (err) {
      console.error('Error al guardar el curso en la base de datos:', err);
      return res.status(500).send('Error al guardar el curso en la base de datos');
    }

    console.log('Curso guardado en la base de datos');
    res.redirect('/cursos'); // Redirigir al usuario a la página de cursos
  });
});

module.exports = router;
