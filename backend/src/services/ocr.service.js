const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ocrFromImage = async (imagePath) => {
  if (!fs.existsSync(imagePath)) throw new Error("Image file not found");

  const imageData = fs.readFileSync(imagePath, { encoding: "base64" });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: "Extract text from this image. Provide plain text, line by line." },
          { inlineData: { data: imageData, mimeType: "image/png" } },
        ],
      },
    ],
  });

  return response.output?.[0]?.content?.[0]?.text || response.text || "";
};

const parseOCRText = (text) => {
  const answers = {};
  const missing_fields = [];

  const ageMatch = text.match(/Age:\s*(\d+)/i);
  answers.age = ageMatch ? parseInt(ageMatch[1]) : null;
  if (!ageMatch) missing_fields.push("age");

  const smokerMatch = text.match(/Smoker:\s*(yes|no)/i);
  answers.smoker = smokerMatch ? smokerMatch[1].toLowerCase() === "yes" : null;
  if (!smokerMatch) missing_fields.push("smoker");

  const exerciseMatch = text.match(/Exercise:\s*(\w+)/i);
  answers.exercise = exerciseMatch ? exerciseMatch[1] : null;
  if (!exerciseMatch) missing_fields.push("exercise");

  const dietMatch = text.match(/Diet:\s*(.+)/i);
  answers.diet = dietMatch ? dietMatch[1].trim() : null;
  if (!dietMatch) missing_fields.push("diet");

  return { answers, missing_fields, confidence: 0.9, text };
};

const parseInput = async ({ text, imagePath }) => {
  let inputText = text || (imagePath ? await ocrFromImage(imagePath) : null);
  if (!inputText) throw new Error("No input provided");
  return parseOCRText(inputText);
};

module.exports = { parseInput, parseOCRText };
