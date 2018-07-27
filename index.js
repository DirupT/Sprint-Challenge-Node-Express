const express = require('express');
const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const server = express();
server.use(express.json());

server.post('/api/projects', async (req, res) => {
    const { name, description, completed } = req.body;
    const project = { name, description, completed };
    if (!name || !description) return res.status(400).json({ error: 'Please provide a name and description.' });
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

server.get('/api/projects/actions/:id', async (req, res) => {
    try {
        const response = await projects.getProjectActions(req.params.id);
        if (response.length === 0) return res.status(400).json({ error: "The project with the specified ID does not exist or project has no actions!" });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve project information." })
    }
})

server.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const project = { name, description, completed };
    if (!name || !description) return res.status(400).json({ error: 'Please provide a name and description' });
    if (name.length > 128) return res.status(400).json({ error: 'Name provided is too long!' });
    try {
        const updateResponse = await projects.update(id, project);
        if (!updateResponse) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(updateResponse);
    } catch (err) {
        return res.status(500).json({ error: "The project information could not be modified." })
    }
})

server.delete('/api/projects/:id', async (req, res) => {
    try {
        const removeResponse = await projects.remove(req.params.id);
        if (removeResponse === 0) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(removeResponse);
    } catch (err) {
        return res.status(500).json({ error: "The project could not be removed" });
    }
})

// ================================== END OF PROJECTS ================================== //

server.post('/api/actions', async (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    const action = { project_id, description, notes, completed };
    if (!project_id || !description || !notes) return res.status(400).json({ error: 'Please provide project id, description and notes information.' });
    if (description.length > 128) return res.status(400).json({ error: 'Description provided is too long!' });
    try {
        const findResponse = await projects.get();
        for (let i = 0; i < findResponse.length; i++) {
            if (findResponse[i].id == project_id) {
                try {
                    const response = await actions.insert(action);
                    return res.status(200).json(response);
                } catch (err) {
                    return res.status(500).json({ error: "There was an error while saving the action to the database." });
                }
            }
            return res.status(500).json({ error: "Please provide a project id that matches an existing project's id." })
        }
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve actions information" });
    }
})


server.get('/api/actions', async (req, res) => {
    try {
        const response = await actions.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve actions information" });
    }
})

server.get('/api/actions/:id', async (req, res) => {
    try {
        const response = await actions.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve action information" });
    }
})

server.put('/api/actions/:id', async (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const action = { project_id, description, notes, completed };
    if (!project_id || !description || !notes) return res.status(400).json({ error: 'Please provide project id, description and notes information.' });
    if (description.length > 128) return res.status(400).json({ error: 'Description provided is too long!' });
    try {
        const findResponse = await projects.get();
        for (let i = 0; i < findResponse.length; i++) {
            if (findResponse[i].id == project_id) {
                try {
                    const response = await actions.update(id, action);
                    return res.status(200).json(response);
                } catch (err) {
                    return res.status(500).json({ error: "There was an error while saving the action to the database." });
                }
            }
            return res.status(500).json({ error: "Please provide a project id that matches an existing project's id." })
        }
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve actions information" });
    }
})


server.listen(8000, () => console.log('API is running on port 8000...'));