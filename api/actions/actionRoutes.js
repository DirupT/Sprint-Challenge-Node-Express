const express = require('express');
const actions = require('../../data/helpers/actionModel');

const router = express.Router();

router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
    try {
        const response = await actions.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve actions information" });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await actions.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: "Couldn't retrieve action information" });
    }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        const removeResponse = await actions.remove(req.params.id);
        if (removeResponse === 0) return res.status(404).json({ error: "The action with the specified ID does not exist." });
        res.status(200).json(removeResponse);
    } catch (err) {
        return res.status(500).json({ error: "The action could not be removed" });
    }
})

module.exports = router;