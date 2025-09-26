// routes/risk.routes.js
const express = require('express');
const router = express.Router();

const { handleRisk } = require('../controllers/risk.controller');

// POST /risk
router.post('/', handleRisk);

module.exports = router;
