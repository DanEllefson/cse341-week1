// Import express
const express = require('express');

// Create an express app
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Testing......');
});

// Set the port value
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
