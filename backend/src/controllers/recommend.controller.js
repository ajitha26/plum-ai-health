// controllers/recommend.controller.js
import { generateRecommendations } from "../services/recommend.service.js";

export const handleRecommend = async (req, res) => {
  try {
    const { risk_level, factors } = req.body;

    if (!risk_level || !factors) {
      return res.status(400).json({ error: "Provide risk_level and factors" });
    }

    const recommendations = await generateRecommendations(risk_level, factors);

    // Wrap into expected output structure
    res.json({
      risk_level,
      factors,
      recommendations,
      status: "ok",
    });
  } catch (err) {
    console.error("Recommendation Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
