const express = require("express");

const {
  createNewAlbum,
  getAllAlbums,
  getAlbumDetailsById,
} = require("../controllers/album.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", verifyJWT, createNewAlbum);
router.get("/", verifyJWT, getAllAlbums);
router.get("/:albumId", verifyJWT, getAlbumDetailsById);

module.exports = router;
