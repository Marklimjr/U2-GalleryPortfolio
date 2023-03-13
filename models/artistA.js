const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artist_1", artistASchema);
