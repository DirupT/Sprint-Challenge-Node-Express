const express = require('express');
const actionRoutes = require('./actions/actionRoutes');
const projectRoutes = require('./projects/projectRoutes');

const router = express.Router();

router.use('/projects', projectRoutes); 
router.use('/actions', actionRoutes);

module.exports = router;