const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    internshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
    companyName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "Application",
  applicationSchema
);