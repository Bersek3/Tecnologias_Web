const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const port = 5000;
const { connectToDatabase } = require('./database/db');
const routes = require('./routes/routes.js');
const User = require('./models/usermodel');
const userRoutes = require('./routes/userRoutes');

const initializePassport = require('./passport-config');

initializePassport(passport);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Rutas definidas en el archivo routes.js
app.use('/', routes);

// Middleware para el registro de solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redirige a la página de inicio de sesión si el usuario no está autenticado
}

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({ email: email, password: password }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Credenciales inválidas' });
      }

            // Agrega un console.log para verificar el usuario y su rol aquí
            console.log('Usuario encontrado:', user);
            console.log('Rol del usuario:', user.role);

      // Aquí consultamos el rol del usuario desde la base de datos y lo asignamos al objeto user
      // Esto asume que la propiedad "role" existe en el modelo User
      // Ajusta esta parte según la estructura real de tu base de datos
      User.findOne({ email: email }, (err, userData) => {
        if (err) {
          return done(err);
        }
        if (!userData) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
        user.role = userData.role; // Asignamos el rol del usuario al objeto user

        return done(null, user);
      });
    });
  }
));

// Conexión a la base de datos
connectToDatabase();

app.get('/profile', isAuthenticated, (req, res) => {
  // Esta ruta requiere autenticación, por lo que verifica si el usuario está autenticado
  if (req.isAuthenticated()) {
    // El usuario está autenticado, puedes acceder a req.user para obtener información del usuario
    console.log('Usuario autenticado:', req.user.username);
    console.log('Correo electrónico:', req.user.email);
    console.log('Rol del usuario:', req.user.role);
  }
  res.render('profile');
});

app.get('/cursos', isAuthenticated, (req, res) => {
  // Esta ruta también requiere autenticación
  // ...
});

app.post('/registro', (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
    role: 'user' // Asegúrate de que el rol sea "user" al registrar un usuario
  });

  newUser.save((err) => {
    if (err) {
      console.error('Error al guardar el usuario en la base de datos:', err);
      return res.status(500).send('Error al guardar el usuario en la base de datos');
    }

    console.log('Usuario guardado en la base de datos');
    res.redirect('/');
  });
});












app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // ... (código de autenticación)

    req.logIn(user, async (err) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).send('Error al iniciar sesión');
      }

      const userFromDB = await User.findOne({ email: user.email }).exec();
      if (!userFromDB) {
        console.error('Usuario no encontrado en la base de datos');
        return res.status(404).send('Usuario no encontrado en la base de datos');
      }

      user.role = userFromDB.role; // Asignamos el rol del usuario al objeto user

      console.log('Autenticación exitosa, redirigiendo a /profile');

      // Asegúrate de pasar isAdmin como parte del objeto al renderizar la vista
      return res.render(__dirname + '/views/profile', { isAdmin: user.role === 'admin' });
    });
  })(req, res, next);
});

// Ruta para el registro de usuarios
app.get('/registro', (req, res) => {
  // Verificar si la solicitud proviene de una ruta específica
  if (!req.headers.referer || !req.headers.referer.endsWith('/')) {
    // Si no proviene de una ruta específica, redirigir al usuario al inicio
    return res.redirect('/');
  }
  // Si la solicitud proviene de una ruta específica, continuar con la carga de registro
  res.render('registro'); // Reemplaza 'registro' con la plantilla correcta
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  // Cerrar sesión
  req.logout();

  // Limpiar las cookies (opcional)
  console.log('Limpiando cookies');
  res.clearCookie('connect.sid');

  // Redirigir al usuario a la página de inicio
  console.log('Sesión cerrada');
  res.redirect('/');
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // Si el usuario está autenticado, redirige al perfil o a otras rutas protegidas
    res.redirect('/profile');
  } else {
    // Si el usuario no está autenticado, muestra la página de inicio
    res.render('/'); // Reemplaza 'index' con la plantilla de tu página de inicio
  }
});

app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});
