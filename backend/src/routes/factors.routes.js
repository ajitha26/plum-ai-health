const express = require('express');
const router = express.Router();
const factorsController = require('../controllers/factors.controller');

router.post('/', factorsController.handleFactors);

module.exports = router; 
