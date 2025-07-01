const Image = require("../models/image.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const insertNewImage = asyncHandler(async (req, res) => {
  const { title, urlKey, storageArgs } = req.body;
  const { _id } = req.user;

  const newImage = Image({
    title,
    urlKey,
    storageArgs,
    owner: _id,
  });

  const response = await newImage.save();

  res
    .status(200)
    .json(new ApiResponse(200, response, "Images saved successfully."));
});

const getAllImages = asyncHandler(async (req, res) => {
  const { skip, count } = req.params;
  const { _id } = req.user;

  const response = await Image.find({ owner: _id }).limit(count).skip(skip);

  res.status(200).json(new ApiResponse(200, response));
});

const getImageById = asyncHandler(async (req, res) => {
  const { imageId } = req.params;
  const { _id } = req.user;

  const response = await Image.findOne({ _id: imageId, owner: _id });

  res.status(200).json(new ApiResponse(200, response));
});

const getAllFavoriteImages = asyncHandler(async (req, res) => {
  const { skip, count } = req.params;
  const { _id } = req.user;

  const response = await Image.find({ owner: _id, isFavorite: true })
    .limit(count)
    .skip(skip);

  res.status(200).json(new ApiResponse(200, response));
});

const getImagesForAlbum = asyncHandler(async (req, res) => {
  const { albumId, skip, count } = req.params;
  const { _id } = req.user;

  const response = await Image.find({ owner: _id, album: albumId })
    .limit(count)
    .skip(skip);

  res.status(200).json(new ApiResponse(200, response));
});

const updateImageData = asyncHandler(async (req, res) => {
  const { imageId } = req.params;
  const { fieldName, fieldVal } = req.body;
  const { _id } = req.user;

  const image = await Image.findById(imageId);

  if (!image) {
    throw new ApiError(400, "Invalid image.");
  }

  if (image.owner.toString() !== _id.toString()) {
    throw new ApiError(400, "Unauthorized request.");
  }

  const response = await Image.findOneAndUpdate(
    { _id: imageId },
    { [fieldName]: fieldVal }
  );

  res
    .status(200)
    .json(new ApiResponse(200, response, "Image updated successfully."));
});

module.exports = {
  insertNewImage,
  getAllImages,
  updateImageData,
  getAllFavoriteImages,
  getImageById,
  getImagesForAlbum,
};
