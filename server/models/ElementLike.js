const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const elementLikeSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    elementId: {
      type: ObjectId,
      ref: "Element",
      required: true,
    },
    followedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

elementLikeSchema.index({ userId: 1, elementId: 1 }, { unique: true });
elementLikeSchema.index({ userId: 1 });
elementLikeSchema.index({ elementId: 1 });

module.exports = mongoose.model(
  "ElementLike",
  elementLikeSchema,
  "elementLike"
);
