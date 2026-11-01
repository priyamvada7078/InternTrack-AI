const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllHistories,
  getHistoryById,
  deleteHistory,
} = require("../controllers/interviewHistory.controller");

const router = express.Router();

// All routes require a valid JWT
router.use(authMiddleware);

// GET  /api/interview-history          – paginated list with filters
router.get("/", getAllHistories);

// GET  /api/interview-history/:id      – full session detail
router.get("/:id", getHistoryById);

// DELETE /api/interview-history/:id   – remove a session (owner only)
router.delete("/:id", deleteHistory);

module.exports = router;
