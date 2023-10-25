const { MongoClient } = require('mongodb');

class UserModel {
  constructor() {
    const uri = 'mongodb+srv://Berserk:Bersek1106@cluster0.krd1u.mongodb.net/Cursos'; // Cambia esto según tu configuración
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('Cursos'); // Reemplaza 'miBasedeDatos' con el nombre de tu base de datos
    this.collection = this.db.collection('cursos'); // Reemplaza 'usuarios' con el nombre de tu colección
  }

  // Función para validar la contraseña
  validarContraseña(contraseña) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(contraseña);
  }

  async createUser(nombre, correo, contraseña) {
    console.log('Contraseña proporcionada:', contraseña); // Agregado para depuración
    console.log('Validación de contraseña:', this.validarContraseña(contraseña)); // Agregado para depuración

    if (!this.validarContraseña(contraseña)) {
      throw new Error('La contraseña no cumple con los requisitos.');
    }

    await this.connect();
    const newUser = {
      nombre,
      correo,
      contraseña, // Asegúrate de aplicar hash a la contraseña antes de guardarla en la base de datos
    };
    const result = await this.collection.insertOne(newUser);
    return result.insertedId;
  }

  async findUserByEmail(correo) {
    await this.connect();
    return this.collection.findOne({ correo });
  }
}

module.exports = UserModel;
