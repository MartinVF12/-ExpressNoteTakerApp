// Import necessary modules
const express = require('express'); // Express framework for handling server-side logic
const path = require('path'); // Module to work with file paths
const apiRoutes = require('./routes/apiRoutes'); // API routes module
const htmlRoutes = require('./routes/htmlRoutes'); // HTML routes module

// Initialize express application
const app = express();
const PORT = process.env.PORT || 3000; // Define the port to run the server on

// Middleware to handle data parsing
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.use('/api', apiRoutes); // API routes for handling data operations
app.use('/', htmlRoutes); // HTML routes for serving pages

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); // Log the server's running status
});
