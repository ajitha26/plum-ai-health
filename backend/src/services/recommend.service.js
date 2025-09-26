// services/recommend.service.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateRecommendations = async (riskLevel, factors) => {
  try {
    const prompt = `Provide exactly 5 worded, actionable, non-diagnostic health recommendations for a person with risk level: ${riskLevel} and risk factors: ${factors.join(
      ", "
    )}. Return only a JSON array of strings. Each recommendation should be concise (one line).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Remove Markdown code block formatting if present
    let text = response.text.replace(/```json|```/g, "").trim();

    let recommendations;
    try {
      recommendations = JSON.parse(text);
    } catch (err) {
      // fallback: split by newlines and clean each line
      recommendations = text
        .split("\n")
        .map((line) => line.replace(/^-?\s*/, "").trim())
        .filter((line) => line.length > 0)
        .slice(0, 5); // Ensure max 5 recommendations
    }

    return recommendations;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return ["Could not fetch recommendations at this time"];
  }
};
