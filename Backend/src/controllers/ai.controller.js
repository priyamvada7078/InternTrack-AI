const Internship = require("../models/internship.model");

const {
  generateCareerInsights,
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewReport,
} = require("../services/ai.service");

const { createInterviewHistory } = require("../controllers/interviewHistory.controller");

// ==========================================
// 1. GET CAREER INSIGHTS
// ==========================================

const getCareerInsights = async (req, res) => {
  try {
    // Fetch only the logged-in user's applications
    const internships = await Internship.find({
      appliedBy: req.user.id,
    })
      .select("title company role status mode appliedDate")
      .sort({ appliedDate: -1 })
      .limit(100)
      .lean();

    if (internships.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          insights:
            "You haven't added any applications yet. Add your first internship application to receive personalized career insights.",
        },
      });
    }

    // Ask Gemini to analyze the actual application data
    const insights = await generateCareerInsights(internships);

    return res.status(200).json({
      success: true,
      data: {
        insights,
        applicationsAnalyzed: internships.length,
      },
    });
  } catch (error) {
    console.error("Career insights error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate career insights right now.",
    });
  }
};

// ==========================================
// 2. GENERATE INTERVIEW QUESTIONS
// ==========================================

const generateInterviewQuestionsController = async (req, res) => {
  try {
    const {
      role,
      company = "",
      interviewType = "Mixed",
      difficulty = "Intermediate",
    } = req.body;

    // Validate required role
    if (!role || typeof role !== "string" || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a job role.",
      });
    }

    // Validate company
    if (typeof company !== "string") {
      return res.status(400).json({
        success: false,
        message: "Company must be a valid string.",
      });
    }

    // Validate interview type
    const allowedTypes = ["Technical", "HR", "Mixed"];

    if (!allowedTypes.includes(interviewType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview type.",
      });
    }

    // Validate difficulty
    const allowedDifficulties = ["Beginner", "Intermediate", "Advanced"];

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level.",
      });
    }

    // Generate questions using Gemini
    const output = await generateInterviewQuestions({
      role: role.trim(),
      company: company.trim(),
      interviewType,
      difficulty,
    });

    // Remove Markdown code fences if Gemini returns them
    const cleanedOutput = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    // Convert Gemini JSON string into JavaScript object
    const result = JSON.parse(cleanedOutput);

    // Validate response structure
    if (
      !result ||
      !Array.isArray(result.questions) ||
      result.questions.length === 0
    ) {
      throw new Error("Invalid interview questions format.");
    }

    // Persist the generated session to MongoDB (non-blocking for the response)
    createInterviewHistory(
      {
        role: role.trim(),
        company: company.trim(),
        interviewType,
        difficulty,
        questions: result.questions,
      },
      req.user.id
    ).catch((err) =>
      console.error("Failed to save interview history:", err.message)
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Interview question generation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate interview questions right now.",
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

// 3. Evaluate Interview Answer
const evaluateInterviewAnswerController = async (req, res) => {
  try {
    const {
      question,
      expectedPoints = [],
      answer,
      role,
      difficulty = "Intermediate",
    } = req.body;

    // Validate required fields
    if (!question?.trim() || !answer?.trim() || !role?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question, answer and job role are required.",
      });
    }

    if (
      !Array.isArray(expectedPoints) ||
      !expectedPoints.every((point) => typeof point === "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "Expected points must be a valid array.",
      });
    }

    const allowedDifficulties = ["Beginner", "Intermediate", "Advanced"];

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level.",
      });
    }

    // Call Gemini evaluation service
    const output = await evaluateInterviewAnswer({
      question: question.trim(),
      expectedPoints,
      answer: answer.trim(),
      role: role.trim(),
      difficulty,
    });

    // Remove Markdown code fences if Gemini includes them
    const cleanedOutput = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const evaluation = JSON.parse(cleanedOutput);

    // Validate basic response structure
    if (
      typeof evaluation.score !== "number" ||
      evaluation.score < 0 ||
      evaluation.score > 10 ||
      !Array.isArray(evaluation.strengths) ||
      !Array.isArray(evaluation.missingPoints) ||
      !Array.isArray(evaluation.suggestions) ||
      typeof evaluation.improvedAnswer !== "string"
    ) {
      throw new Error("Invalid evaluation response format.");
    }

    return res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    console.error("Interview evaluation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to evaluate your answer right now.",
    });
  }
};

const generateInterviewReportController = async (req, res) => {
  try {
    const {
      role,
      company = "",
      difficulty = "Intermediate",
      evaluations,
    } = req.body;

    // Validate job role
    if (typeof role !== "string" || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid job role.",
      });
    }

    // Validate company
    if (typeof company !== "string") {
      return res.status(400).json({
        success: false,
        message: "Company must be a valid string.",
      });
    }

    // Validate difficulty
    const allowedDifficulties = ["Beginner", "Intermediate", "Advanced"];

    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level.",
      });
    }

    // Validate evaluations
    if (
      !Array.isArray(evaluations) ||
      evaluations.length === 0 ||
      evaluations.length > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid interview evaluations.",
      });
    }

    // Validate each evaluation
    const isValid = evaluations.every((item) => {
      return (
        item &&
        typeof item.question === "string" &&
        item.question.trim() &&
        Number.isInteger(item.score) &&
        item.score >= 0 &&
        item.score <= 10 &&
        typeof item.verdict === "string" &&
        Array.isArray(item.strengths) &&
        Array.isArray(item.missingPoints) &&
        Array.isArray(item.suggestions)
      );
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "One or more interview evaluations are invalid.",
      });
    }

    // Send only relevant evaluation data to Gemini
    const cleanEvaluations = evaluations.map((item) => ({
      question: item.question.trim(),
      score: item.score,
      verdict: item.verdict,
      strengths: item.strengths,
      missingPoints: item.missingPoints,
      suggestions: item.suggestions,
    }));

    // Generate AI performance report
    const output = await generateInterviewReport({
      role: role.trim(),
      company: company.trim(),
      difficulty,
      evaluations: cleanEvaluations,
    });

    // Remove Markdown code fences if Gemini includes them
    const cleanedOutput = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const report = JSON.parse(cleanedOutput);

    // Validate report structure
    if (
      !report ||
      typeof report.overallSummary !== "string" ||
      !Array.isArray(report.strongAreas) ||
      !Array.isArray(report.weakAreas) ||
      !Array.isArray(report.revisionTopics) ||
      !Array.isArray(report.actionPlan) ||
      typeof report.finalFeedback !== "string"
    ) {
      throw new Error("Invalid interview report format.");
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Interview report error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate interview report right now.",
    });
  }
};

module.exports = {
  getCareerInsights,
  generateInterviewQuestionsController,
  evaluateInterviewAnswerController,
  generateInterviewReportController,
};
