const express = require('express');

// const db = require('./data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(express.json());


const vehicleRouter = require('./vehicles/vehicles-router.js');
server.use('/api/vehicles', vehicleRouter)


server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda WEP DB Challenge :)</h>
      <p>Let's get started... </p>
    `);
});

module.exports = server;