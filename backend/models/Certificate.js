const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
    },
    certificateLink: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Verified",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "Certificate",
  certificateSchema
);