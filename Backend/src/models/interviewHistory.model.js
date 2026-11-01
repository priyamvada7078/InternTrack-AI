const mongoose = require("mongoose");

/**
 * InterviewHistory – stores each AI-generated interview preparation session.
 * A session captures the parameters used, the questions + answers that were
 * generated, and a reference to the authenticated user who generated them.
 *
 * This is distinct from the Interview model (which stores completed mock
 * interviews with scores and reports).
 */
const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    category: { type: String, default: "" },
    difficulty: { type: String, default: "" },
    expectedPoints: { type: [String], default: [] },
  },
  { _id: false }
);

const interviewHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    interviewType: {
      type: String,
      enum: ["Technical", "HR", "Mixed"],
      default: "Mixed",
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    generatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    aiGenerated: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index for fast user + date queries
interviewHistorySchema.index({ user: 1, generatedAt: -1 });

module.exports =
  mongoose.models.InterviewHistory ||
  mongoose.model("InterviewHistory", interviewHistorySchema);
