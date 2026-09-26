const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // admin  -> Dashboard + Fee System + Result System
    // teacher -> Result System only (view + add/edit records)
    role: {
      type: String,
      enum: ["admin", "teacher"],
      default: "teacher",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;