const { parseInput } = require("../services/ocr.service");

const handleOCR = async (req, res) => {
  try {
    let input = {};

    if (req.file) {
      // file uploaded via FormData
      input.imagePath = req.file.path;
    } else if (req.body.text) {
      // plain text sent
      input.text = req.body.text;
    } else if (req.body.imagePath) {
      // manual server path (useful for curl)
      input.imagePath = req.body.imagePath;
    } else {
      return res.status(400).json({ error: "Provide text or file/imagePath" });
    }

    const result = await parseInput(input);

    // guardrail
    if (result.missing_fields.length > 2) {
      return res.status(200).json({
        status: "incomplete_profile",
        reason: ">50% fields missing",
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { handleOCR };
