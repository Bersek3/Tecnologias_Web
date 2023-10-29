// db.js
const mongoose = require('mongoose');

function connectToDatabase() {
  mongoose.connect('mongodb+srv://Berserk:Bersek1106@cluster0.krd1u.mongodb.net/Cursos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
  db.once('open', () => {
    console.log('Conectado a la base de datos');
  });
}

module.exports = { connectToDatabase };