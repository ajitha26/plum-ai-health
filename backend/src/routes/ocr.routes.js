const express = require("express");
const multer = require("multer");
const { handleOCR } = require("../controllers/ocr.controller");

const router = express.Router();

// ✅ Use memory storage to avoid disk writes
const upload = multer({ storage: multer.memoryStorage() });

// POST /ocr
// Accepts either { text: "..."} JSON or a file upload
router.post("/", upload.single("file"), handleOCR);

module.exports = router;
