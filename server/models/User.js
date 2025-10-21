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

    userBio: { type: String, required: false, default: null },
    userCountry: { type: String, required: false, default: null },
    userBirthdate: { type: Date, required: false, default: null },
    userFullname: { type: String, default: null },

    profilePicture: {
      type: String,
      default: "default-user-picture",
    },

    userRole: {
      type: String,
      required: false,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = mongoose.model("User", userSchema, "users");
