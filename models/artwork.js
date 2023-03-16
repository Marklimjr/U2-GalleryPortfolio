const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    artworkUrl: {
      type: String,
      required: true,
    },

    artistName: {
      type: String,
      required: true,
    },

    artworkDate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artwork", artworkSchema);
