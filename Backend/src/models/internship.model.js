const mongoose = require("mongoose");

// Internship Schema – stores each internship application record
const internshipSchema = new mongoose.Schema(
  {
    // Basic identifiers
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: "Remote", trim: true },
    // Optional but useful metadata
    type: { type: String, default: "Internship", trim: true },
    mode: { type: String, default: "Remote", trim: true },
    stipend: { type: String, default: "0", trim: true },
    applicationLink: { type: String, default: "" },
    appliedDate: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
    status: { type: String, default: "Applied", trim: true },
    // Reference to the user who added this record
    appliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
