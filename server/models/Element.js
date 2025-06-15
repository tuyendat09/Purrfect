const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const elementSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    autoTags: [
      {
        type: String,
        required: true,
      },
    ],
    embedding: [{ type: String, required: true }],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

elementSchema.index({ autoTags: 1 });
