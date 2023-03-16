const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Artwork = require("../models/artwork")

const exhibitionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    synopsis: {
      type: String,
      required: true,
    },

    artworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exhibition", exhibitionsSchema);
