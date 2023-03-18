const mongoose = require("mongoose");
const validator = require("validator");

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userid: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (password) {
          return validator.isStrongPassword(password, { minLength: 3 });
        },
        message: "Password must be at least 3 characters long",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      lowercase: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

usersSchema.virtual("createdAtFormatted").get(function () {
  // to convert date into cleaner form
  return this.created_at.toLocaleString("en-UK");
});

usersSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

const User = mongoose.model("users", usersSchema);
module.exports = User;
