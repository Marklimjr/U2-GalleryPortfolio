const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Location = require("../models/locationInfo");

const artistASchema = new Schema(
  {
    workUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    location: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artist_1", artistASchema);
