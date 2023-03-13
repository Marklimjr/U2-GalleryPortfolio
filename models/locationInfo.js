const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
      required: true,
    },
    nextLocation: {
      type: String,
      required: true,
    },

    dateToMove: {
      type: Date,
      required: true,
    },

    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationInfoSchema);
