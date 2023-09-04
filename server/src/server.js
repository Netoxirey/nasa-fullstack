const http = require('http');
const app = require('./app');

// Load planet data into the local database
const {loadPlanetsData} = require('./models/planets.model');

// Connect to the MongoDB database
const {mongoConnect} = require('./services/mongo');

// Load launch data into the local database
const {loadLaunchData} = require('./models/launches.model');

// Load environment variables from .env file
require('dotenv').config;

// Set the port for the server
const PORT = process.env.PORT || 8000;

// Create the server
const server = http.createServer(app);

// Start the server
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}

startServer();