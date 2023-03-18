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
      validate: {
        validator: function (v) {
          return (v.toString().length = 4);
        },
        message: "Year created must be 4 digits long",
      },
    },
  },
  {
    timestamps: true,
  }
);

artworkSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

artworkSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

module.exports = mongoose.model("Artwork", artworkSchema);
