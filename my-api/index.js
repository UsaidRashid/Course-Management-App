// server.js
const express = require('express');
const cors = require('cors');
const generateCourses = require('./dataGenerator');

const app = express();
const port = 3002;

app.use(cors());

app.get('/courses', (req, res) => {
  const courses = generateCourses();
  res.json(courses);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
