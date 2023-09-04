// ./db/mongo.js
const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
    console.error(error)
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}