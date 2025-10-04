// models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",   // Link to Course
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  video_link: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);
