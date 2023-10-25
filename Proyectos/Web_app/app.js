const express = require('express');
const app = express();
const port = 4000;
const { connectToDatabase } = require('./database/db'); // Importa la función de conexión a MongoDB
const routes = require('./routes/routes.js'); // Importa las rutas


app.use(express.urlencoded({ extended: true }));
// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname);

// Servir archivos estáticos (como tu archivo CSS)
app.use(express.static(__dirname + '/public'));

// Conectar a la base de datos MongoDB
connectToDatabase();

// Usar las rutas definidas en routes.js
app.use('/', routes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});