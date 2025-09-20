const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    username: {
      type: String,
      default: null,
    },

    userFullname: { type: String, default: null },

    profilePicture: {
      type: String,
      default: "default-user-profile",
    },

    userRole: {
      type: String,
      required: false,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("User", userSchema, "users");
