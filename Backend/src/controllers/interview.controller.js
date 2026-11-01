
const Interview = require("../models/interview.model");

// Save completed interview
const saveInterview = async (req, res) => {
  try {
    const {
      role,
      company,
      interviewType,
      difficulty,
      evaluations,
      averageScore,
      report,
    } = req.body;

    // Basic validation
    if (
      !role ||
      !Array.isArray(evaluations) ||
      evaluations.length === 0 ||
      !report
    ) {
      return res.status(400).json({
        success: false,
        message: "Required interview details are missing.",
      });
    }

    if (
      typeof averageScore !== "number" ||
      averageScore < 0 ||
      averageScore > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid average score.",
      });
    }

    // Save only the required evaluation fields
    const questions = evaluations.map((item) => ({
      question: item.question,
      score: item.score,
      verdict: item.verdict,
      strengths: item.strengths || [],
      missingPoints: item.missingPoints || [],
      suggestions: item.suggestions || [],
    }));

    const interview = await Interview.create({
      user: req.user.id,
      role,
      company: company || "",
      interviewType: interviewType || "Mixed",
      difficulty: difficulty || "Intermediate",
      questions,
      averageScore,
      report,
    });

    return res.status(201).json({
      success: true,
      message: "Interview saved successfully.",
      data: interview,
    });
  } catch (error) {
    console.error("Save interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save interview.",
    });
  }
};

// Get logged-in user's interview history
const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: interviews.length,
      data: interviews,
    });
  } catch (error) {
    console.error("Get interview history error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview history.",
    });
  }
};

// Get one interview by ID
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.error("Get interview details error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview details.",
    });
  }
};

module.exports = {
  saveInterview,
  getInterviewHistory,
  getInterviewById,
};
