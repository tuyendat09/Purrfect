const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const clustersSchema = new Schema(
  {
    clusterName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    elementIds: [
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

clustersSchema.index({ createdBy: 1 });
clustersSchema.index({ imageIds: 1 });

module.exports = mongoose.model("Clusters", clustersSchema, "clusters");
