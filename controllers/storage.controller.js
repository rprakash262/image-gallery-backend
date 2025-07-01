const Image = require("../models/image.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { supabaseClient, supabaseAdminClient } = require("../db/supabase/index");
const bucket = process.env.SUPABASE_BUCKET;

const createPresignedUploadUrl = asyncHandler(async (req, res) => {
  const { imageName } = req.params;

  const { data, error } = await supabaseAdminClient.storage
    .from(bucket)
    .createSignedUploadUrl(imageName);

  if (error) {
    throw new ApiError(500, String(error));
  } else {
    res.status(200).json(new ApiResponse(200, data));
  }
});

const createPresignedDownloadUrls = asyncHandler(async (req, res) => {
  const { urlKeys } = req.body;

  const { data, error } = await supabaseAdminClient.storage
    .from(bucket)
    .createSignedUrls(urlKeys, 60);

  if (error) {
    throw new ApiError(500, String(error));
  } else {
    res.status(200).json(new ApiResponse(200, data));
  }
});

module.exports = { createPresignedUploadUrl, createPresignedDownloadUrls };
