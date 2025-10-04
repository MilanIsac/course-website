const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ debug : false });

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log('MongoDB connected');
  }
  catch (err) {
    console.log('MongoDB connection error:', err);
  }
})();

const courseRoutes = require('./routes/course_routes.js');
const userRoutes = require('./routes/user_routes.js');
const contentRoutes = require('./routes/content_routes.js');
const adminRoutes = require('./routes/admin_routes.js');

app.use('/api/courses', courseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});