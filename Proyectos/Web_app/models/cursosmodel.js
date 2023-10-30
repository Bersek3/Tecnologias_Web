const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Otros campos relacionados con el curso
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;