const mongoose = require("mongoose");
const internshipSchema = new mongoose.Schema(
{
  companyName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  requirements: String,
  deadline: Date,
},
{ timestamps: true }
);
module.exports = mongoose.model(
  "Internship",
  internshipSchema
);