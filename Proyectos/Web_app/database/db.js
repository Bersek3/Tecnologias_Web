const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Berserk:Bersek1106@cluster0.krd1u.mongodb.net/Cursos'; // Cambia esto según tu configuración

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conexión a MongoDB establecida');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
}

module.exports = {
  connectToDatabase,
  getClient: () => client, // Devuelve el cliente MongoDB para su uso en las rutas
};