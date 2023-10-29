// usermodel.js
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const db = require('../database/db');; // Importa la configuración de la base de datos

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Puede ser 'admin' o 'user'
  }
  // Otros campos que desees almacenar
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
