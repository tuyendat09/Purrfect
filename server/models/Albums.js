const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const albumsSchema = new Schema(
  {
    albumName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    imageIds: [
      {
        type: ObjectId,
        ref: "Element",
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

albumSchema.index({ createdBy: 1 });
albumSchema.index({ imageIds: 1 });

module.exports = mongoose.model("Albums", albumsSchema, "albums");
