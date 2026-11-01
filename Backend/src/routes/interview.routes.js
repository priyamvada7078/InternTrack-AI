
const express = require("express");

const {
  saveInterview,
  getInterviewHistory,
  getInterviewById,
} = require("../controllers/interview.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Save a completed interview
router.post("/", authMiddleware, saveInterview);

// Get all interviews of the logged-in user
router.get("/", authMiddleware, getInterviewHistory);

// Get one interview by ID
router.get("/:id", authMiddleware, getInterviewById);

module.exports = router;
