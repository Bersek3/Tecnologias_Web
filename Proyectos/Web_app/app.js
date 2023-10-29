const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session'); // Importa express-session
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const port = 5000;
const { connectToDatabase } = require('./database/db');
const routes = require('./routes/routes.js');
const User = require('./models/usermodel');
const userRoutes = require('./routes/userRoutes');


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'Bersek', // Cambia esto a una clave secreta segura
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectToDatabase();


app.use('/', routes);


// Registra la solicitud y muestra detalles en la consola
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

// Muestra mensajes en la consola para verificar que las rutas se están activando
app.post('/registro', (req, res) => {
  console.log('Ruta POST /registro activada');
  const { username, email, password } = req.body;
  console.log('Datos del formulario:', username, email, password);
  
  const newUser = new User({
    username,
    email,
    password
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



app.post('/login', (req, res) => {
  const { email, password } = req.body;


  User.findOne({ email, password }, (err, user) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      return res.status(500).send('Error al iniciar sesión');
    }
  
    if (user) {
      // Credenciales válidas, redirige al usuario a la página de perfil
      console.log('Credenciales válidas, redirige al usuario a la página de perfil');
      res.redirect('/profile');
    } else {
      // Credenciales inválidas, muestra un mensaje de error y redirige de nuevo a la página de inicio de sesión
      res.status(401).send('Credenciales inválidas');
      res.redirect('/');
    }
  });
});

router.get('/profile', isLoggedIn, (req, res) => {
  // Esta ruta solo se ejecutará si el usuario está autenticado
  res.render('profile'); // Renderiza la página de perfil
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Si el usuario está autenticado, continúa con la siguiente ruta o middleware
  }
  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  res.redirect('/login');
}

router.get('/logout', (req, res) => {
  req.logout(); // Cerrar sesión del usuario
  res.redirect('/'); // Redirige al inicio o a la página que desees
});

router.post('/admin/agregar-curso', (req, res) => {
  if (req.user.role === 'admin') {
    const newCourse = new Course({
      title: req.body.title,
      description: req.body.description,
      // Otros campos del curso
    });

    newCourse.save((err) => {
      if (err) {
        // Manejo de errores
        res.status(500).send('Error al agregar el curso');
      } else {
        // Curso agregado con éxito
        res.redirect('/admin/dashboard'); // Otra página para administradores
      }
    });
  } else {
    // El usuario no tiene permisos de administrador
    res.status(403).send('Acceso no autorizado');
  }
});


app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});
