
const express = require("express");

const {
  getCareerInsights,
  generateInterviewQuestionsController,
  evaluateInterviewAnswerController,
  generateInterviewReportController,
} = require("../controllers/ai.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected: Career Insights
router.get("/insights", authMiddleware, getCareerInsights);

// Protected: Generate Interview Questions
router.post(
  "/interview/questions",
  authMiddleware,
  generateInterviewQuestionsController
);

// Protected: Evaluate Interview Answers
router.post(
  "/interview/evaluate",
  authMiddleware,
  evaluateInterviewAnswerController
);

// Protected: Generate Interview Performance Report
router.post(
  "/interview/report",
  authMiddleware,
  generateInterviewReportController
);

module.exports = router;
