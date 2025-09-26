const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleOCR } = require("../controllers/ocr.controller");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../uploads");
const fs = require("fs");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer: save files to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /ocr
router.post("/", upload.single("file"), handleOCR);

module.exports = router;
