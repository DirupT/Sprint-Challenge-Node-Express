const express = require('express');
const projects = require('./data/helpers/projectModel');

const server = express();
server.use(express.json());

server.post('/api/projects', async (req, res) => {
    const { name, description, completed } = req.body;
    const project = { name, description, completed };
    if (!name || !description) return res.status(400).json({ error: 'Please provide name, description and completed information.' });
    if (name.length > 128) return res.status(400).json({ error: 'Name provided is too long!' });
    try {
        const response = await projects.insert(project);
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the project to the database.' });
    }
})

server.get('/api/projects', async (req, res) => {
    try {
        const response = await projects.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve projects information." })
    }
});

server.get('/api/projects/:id', async (req, res) => {
    try {
        const response = await projects.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve project information." })
    }
})

server.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const project = { name, description, completed };
    if (!name || !description) return res.status(400).json({ error: 'Please provide name, description and completed information.' });
    if (name.length > 128) return res.status(400).json({ error: 'Name provided is too long!' });
    try {
        const updateResponse = await projects.update(id, project);
        if (!updateResponse) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(updateResponse);
    } catch (err) {
        return res.status(500).json({ error: "The project information could not be modified." })
    }
})

server.listen(8000, () => console.log('API is running on port 8000...'));