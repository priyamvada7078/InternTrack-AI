const InterviewHistory = require("../models/interviewHistory.model");

// ─────────────────────────────────────────────────────────────────
// Internal helper – called from ai.controller after generating Q&A
// ─────────────────────────────────────────────────────────────────
/**
 * Persist a newly generated interview session.
 * @param {Object} sessionData  - { role, company, interviewType, difficulty, questions }
 * @param {string} userId       - req.user.id from auth middleware
 * @returns {Promise<Document>}
 */
const createInterviewHistory = async (sessionData, userId) => {
  const doc = await InterviewHistory.create({
    user: userId,
    role: sessionData.role,
    company: sessionData.company || "",
    interviewType: sessionData.interviewType || "Mixed",
    difficulty: sessionData.difficulty || "Intermediate",
    questions: sessionData.questions || [],
    aiGenerated: true,
    generatedAt: new Date(),
  });
  return doc;
};

// ─────────────────────────────────────────────────────────────────
// GET /api/interview-history
// Paginated list with search, type/difficulty/date filters, sort
// ─────────────────────────────────────────────────────────────────
const getAllHistories = async (req, res) => {
  try {
    const {
      search = "",
      interviewType = "All",
      difficulty = "All",
      dateFrom,
      dateTo,
      page = 1,
      limit = 9,
      sort = "newest",
    } = req.query;

    // Build the base query – always scoped to the logged-in user
    const query = { user: req.user.id };

    // Full-text search on role and company
    if (search.trim()) {
      query.$or = [
        { role: { $regex: search.trim(), $options: "i" } },
        { company: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (interviewType !== "All") query.interviewType = interviewType;
    if (difficulty !== "All") query.difficulty = difficulty;

    // Date range filter
    if (dateFrom || dateTo) {
      query.generatedAt = {};
      if (dateFrom) query.generatedAt.$gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        query.generatedAt.$lte = end;
      }
    }

    const sortOption = sort === "oldest" ? { generatedAt: 1 } : { generatedAt: -1 };
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [total, histories] = await Promise.all([
      InterviewHistory.countDocuments(query),
      InterviewHistory.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);

    // Aggregate summary stats from the filtered result set
    const totalQuestions = histories.reduce(
      (sum, h) => sum + (h.questions?.length ?? 0),
      0
    );
    const mostRecent = histories.length > 0 ? histories[0].generatedAt : null;

    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: histories,
      summary: {
        totalSessions: total,
        totalQuestions,
        mostRecent,
      },
    });
  } catch (error) {
    console.error("Get interview histories error:", {
      name: error.name,
      message: error.message,
    });
    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview history.",
    });
  }
};

// ─────────────────────────────────────────────────────────────────
// GET /api/interview-history/:id
// Full session detail – user isolation enforced
// ─────────────────────────────────────────────────────────────────
const getHistoryById = async (req, res) => {
  try {
    const history = await InterviewHistory.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).lean();

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Interview history not found.",
      });
    }

    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error("Get history by id error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch this interview session.",
    });
  }
};

// ─────────────────────────────────────────────────────────────────
// DELETE /api/interview-history/:id
// Hard delete – only owner can delete
// ─────────────────────────────────────────────────────────────────
const deleteHistory = async (req, res) => {
  try {
    const history = await InterviewHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Interview history not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview session deleted successfully.",
    });
  } catch (error) {
    console.error("Delete history error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to delete this interview session.",
    });
  }
};

module.exports = {
  createInterviewHistory,
  getAllHistories,
  getHistoryById,
  deleteHistory,
};
