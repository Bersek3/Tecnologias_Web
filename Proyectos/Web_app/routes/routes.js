const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// Función para validar la contraseña
function validarContraseña(contraseña) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(contraseña);
}

router.get('/', (req, res) => {
  res.render('views/index.ejs'); // Ruta completa a la plantilla
});

router.get('/login', (req, res) => {
  res.render('views/login.ejs'); // Ruta completa a la plantilla
});

router.get('/profile', (req, res) => {
  res.render('views/profile.ejs'); // Ruta completa a la plantilla
});

router.get('/registro', (req, res) => {
  res.render('views/registro.ejs'); // Ruta completa a la plantilla
});

router.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña, contraseña_2 } = req.body;

  // Validar que las contraseñas coincidan
  if (contraseña !== contraseña_2) {
    return res.render('views/registro.ejs', { error: 'Las contraseñas no coinciden' });
  }

  // Validar que la contraseña cumple con los requisitos
  if (!validarContraseña(contraseña)) {
    return res.render('views/registro.ejs', { error: 'La contraseña no cumple con los requisitos' });
  }

  const userModel = new UserModel();

  try {
    const userExists = await userModel.findUserByEmail(correo);
    if (userExists) {
      res.status(400).send('El correo ya está registrado');
      return;
    }

    const newUser = { nombre, correo, contraseña };
    const userId = await userModel.createUser(newUser);
    console.log(`Usuario registrado con ID: ${userId}`);

    res.redirect('/profile'); // Redirige a la página principal u otra página después del registro
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  } finally {
    userModel.client.close();
  }
});


module.exports = router;
