const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    album: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    }],
    isFavorite: {
      type: Boolean,
      default: false,
    },
    urlKey: {
      type: String,
      required: true,
    },
    storageArgs: {
      type: Object,
      default: {},
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
