// routes/recommend.routes.js
const express = require('express');
const router = express.Router();

const { handleRecommend } = require('../controllers/recommend.controller');

// POST /recommend
router.post('/', handleRecommend);

module.exports = router;
