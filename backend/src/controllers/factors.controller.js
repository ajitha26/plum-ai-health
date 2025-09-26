// controllers/factors.controller.js
const { extractFactors } = require('../services/factors.service');

const handleFactors = (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers) return res.status(400).json({ error: "Answers required" });

        const { factors, confidence } = extractFactors(answers);
        res.json({ factors, confidence });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handleFactors };
