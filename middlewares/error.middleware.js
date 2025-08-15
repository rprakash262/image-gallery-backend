const { ApiError } = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  console.error(err); // Optional: log full error for debugging

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // Fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
