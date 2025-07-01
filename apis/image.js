const express = require("express");

const {
  insertNewImage,
  getAllImages,
  updateImageData,
  getAllFavoriteImages,
  getImageById,
  getImagesForAlbum,
} = require("../controllers/image.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", verifyJWT, insertNewImage);

router.get("/favorite", verifyJWT, getAllFavoriteImages);

router.get("/album/:albumId", verifyJWT, getImagesForAlbum);

router.get("/:imageId", verifyJWT, getImageById);

router.get("/", verifyJWT, getAllImages);

router.post("/:imageId", verifyJWT, updateImageData);

module.exports = router;
