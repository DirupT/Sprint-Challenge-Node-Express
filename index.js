const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api', apiRoutes);

server.listen(8000, () => console.log('API is running on port 8000...'));