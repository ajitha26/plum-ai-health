const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleOCR } = require("../controllers/ocr.controller");

const router = express.Router();

// configure multer: save files to /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /ocr
// accepts either { text: "..."} JSON or a file upload
router.post("/", upload.single("file"), handleOCR);

module.exports = router;
