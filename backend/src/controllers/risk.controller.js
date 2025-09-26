// controllers/risk.controller.js
const { calculateRisk } = require('../services/risk.service');

const handleRisk = (req, res) => {
    try {
        const { factors } = req.body;
        if (!factors) return res.status(400).json({ error: "Factors required" });

        const riskResult = calculateRisk(factors);
        res.json(riskResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handleRisk };
