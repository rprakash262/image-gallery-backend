const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const Album = require("../models/album.model");

const createNewAlbum = asyncHandler(async (req, res) => {
  const { albumName } = req.body;
  const { _id } = req.user;

  if (!albumName) {
    throw new ApiError(400, "Album name is required.");
  }

  const isAlreadyExists = await Album.findOne({
    albumName: albumName.toLowerCase().trim(),
    owner: _id
  });

  if (!!isAlreadyExists) {
    throw new ApiError(400, `Album with name "${albumName}" already exists.`);
  }

  const newAlbum = Album({ albumName, owner: _id });

  const response = await newAlbum.save();

  res
    .status(200)
    .json(new ApiResponse(200, response, "Album created successfully."));
});

const getAllAlbums = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const { _id } = req.user;

  if (query) {
    const response = await Album.find({
      owner: _id,
      albumName: { $regex: query },
      // $text: { $search: query },
    });

    res.status(200).json(new ApiResponse(200, response));
  } else {
    const response = await Album.find({ owner: _id });

    res.status(200).json(new ApiResponse(200, response));
  }
});

const getAlbumDetailsById = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const { _id } = req.user;

  if (albumId) {
    const response = await Album.findOne({
      owner: _id,
      _id: albumId,
    });

    res.status(200).json(new ApiResponse(200, response));
  } else {
    throw new ApiError(400, "Album Id required.");
  }
})

module.exports = { createNewAlbum, getAllAlbums, getAlbumDetailsById };
