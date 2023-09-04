const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// Allow all CORS requests.
app.use(cors());

// Log all requests.
app.use(morgan('combined'));

// Parse JSON request bodies.
app.use(express.json());

// Host static files.
app.use(express.static(path.join(__dirname, '..', 'public')));

// Add API routes.
app.use('/v1', api);

// Serve the SPA.
app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
