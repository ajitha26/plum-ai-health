// backend/src/services/ocr.service.js
const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

// Gemini client setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// OCR helper
const ocrFromImage = async (imagePath) => {
  if (!fs.existsSync(imagePath)) {
    throw new Error("Image file not found");
  }

  const imageData = fs.readFileSync(imagePath, { encoding: "base64" });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: "Extract the text from this image. Provide plain text, line by line." },
          {
            inlineData: {
              data: imageData,
              mimeType: "image/png", // or "image/jpeg"
            },
          },
        ],
      },
    ],
  });

  // @google/genai: safest extraction
  const text =
    response.output?.[0]?.content?.[0]?.text ||
    response.text ||
    "";

  return text;
};

// Parse OCR text into structured answers
const parseOCRText = (text) => {
  if (typeof text !== "string") {
    throw new Error("parseOCRText: input must be a string");
  }

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

// Main parser
const parseInput = async ({ text, imagePath }) => {
  let inputText = "";

  if (text) {
    inputText = text;
  } else if (imagePath) {
    inputText = await ocrFromImage(imagePath);
  } else {
    throw new Error("No input provided");
  }

  return parseOCRText(inputText);
};

module.exports = { parseInput, parseOCRText };
