
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
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

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        score: {
          type: Number,
          required: true,
          min: 0,
          max: 10,
        },

        verdict: {
          type: String,
          required: true,
        },

        strengths: {
          type: [String],
          default: [],
        },

        missingPoints: {
          type: [String],
          default: [],
        },

        suggestions: {
          type: [String],
          default: [],
        },
      },
    ],

    averageScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    report: {
      overallSummary: {
        type: String,
        default: "",
      },

      strongAreas: {
        type: [String],
        default: [],
      },

      weakAreas: {
        type: [String],
        default: [],
      },

      revisionTopics: {
        type: [String],
        default: [],
      },

      actionPlan: {
        type: [String],
        default: [],
      },

      finalFeedback: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Interview ||
  mongoose.model("Interview", interviewSchema);
