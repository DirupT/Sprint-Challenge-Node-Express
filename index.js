const express = require('express');
const projects = require('./data/helpers/projectModel');

const server = express();

server.get('/api/projects', async (req, res) => {
    try {
        const response = await projects.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve projects information." })
    }
});

server.listen(8000, () => console.log('API is running on port 8000...'));