const express = require('express');
const cors = require('cors');
const ocrRoutes = require('./routes/ocr.routes');
const factorRoutes = require('./routes/factors.routes');
const riskRoutes = require('./routes/risk.routes');
const recommendRoutes = require('./routes/recommend.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/ocr', ocrRoutes);
app.use('/factors', factorRoutes);
app.use('/risk', riskRoutes);
app.use('/recommend', recommendRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
