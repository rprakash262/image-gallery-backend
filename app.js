const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());

//cors
app.use(
  cors({
    origin: "http://localhost:3000,https://image-gallery-frontend-8a73.onrender.com",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization"
  })
);

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cookieParser());

// routes
const storageRoutes = require("./apis/storage");
const imagesRoutes = require("./apis/image");
const userRoutes = require("./apis/user");
const albumRoutes = require("./apis/album");
const errorHandler = require("./middlewares/error.middleware");

app.use("/api/v1/storage", storageRoutes);
app.use("/api/v1/images", imagesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/albums", albumRoutes);

// Use Error handler middleware
app.use(errorHandler);

module.exports = app;
