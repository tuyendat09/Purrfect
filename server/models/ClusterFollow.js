const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const clusterFollowSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    albumId: {
      type: ObjectId,
      ref: "Clusters",
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

albumFollowSchema.index({ userId: 1, albumId: 1 }, { unique: true });
albumFollowSchema.index({ userId: 1 });
albumFollowSchema.index({ albumId: 1 });

module.exports = mongoose.model(
  "AlbumFollow",
  clusterFollowSchema,
  "albumFollows"
);
