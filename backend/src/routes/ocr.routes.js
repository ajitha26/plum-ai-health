const express = require("express");
const multer = require("multer");
const { handleOCR } = require("../controllers/ocr.controller");

const router = express.Router();

// Memory storage (no disk)
const upload = multer({ storage: multer.memoryStorage() });

// POST /ocr
// Accepts JSON { text: "..."} or file upload
router.post("/", upload.single("file"), handleOCR);

module.exports = router;
