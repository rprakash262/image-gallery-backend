const express = require("express");

const {
  createPresignedUploadUrl,
  createPresignedDownloadUrls,
} = require("../controllers/storage.controller");

const router = express.Router();

router.get("/presigned-url/:imageName", createPresignedUploadUrl);

router.post("/presigned-url", createPresignedDownloadUrls);

module.exports = router;
