const express = require("express");
const router = express.Router();
const Content = require("../models/contents_models.js");
const auth = require('../middleware/auth.js');

// Get all contents
router.get('/course/:courseId', async (req, res) => {
  try {
    const contents = await Content.find({ course_id: req.params.courseId }).sort({ createdAt: 1 });
    res.json(contents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/', async (req, res) => {
  try {
    const contents = await Content.find()
      .populate('course_id', 'course_name')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
