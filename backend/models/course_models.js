// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  desc: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
