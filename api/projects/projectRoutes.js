const express = require('express');
const projects = require('../../data/helpers/projectModel');

const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const response = await projects.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve projects information." })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await projects.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve project information." })
    }
})

router.get('/actions/:id', async (req, res) => {
    try {
        const response = await projects.getProjectActions(req.params.id);
        if (response.length === 0) return res.status(400).json({ error: "The project with the specified ID does not exist or project has no actions!" });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve project information." })
    }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        const removeResponse = await projects.remove(req.params.id);
        if (removeResponse === 0) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(removeResponse);
    } catch (err) {
        return res.status(500).json({ error: "The project could not be removed" });
    }
})

module.exports = router;