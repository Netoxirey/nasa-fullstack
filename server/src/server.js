const http = require('http');
const app = require('./app');
const {loadPlanetsData} = require('./models/planets.model');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://ernestoserna94:TVfTvooV5pmp8r8I@nasa.axwr7wc.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (error) => {
console.error(error)
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
}

startServer();