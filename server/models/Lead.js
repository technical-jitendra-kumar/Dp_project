const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    program: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
