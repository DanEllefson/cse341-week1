const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1');

// Define a routes
app.get('/', lesson1Controller.maryRoute);
app.get('/dan', lesson1Controller.danRoute);

// Set the port value
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
