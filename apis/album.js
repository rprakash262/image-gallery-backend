const express = require("express");

const {
  createNewAlbum,
  getAllAlbums,
} = require("../controllers/album.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", verifyJWT, createNewAlbum);
router.get("/", verifyJWT, getAllAlbums);

module.exports = router;
