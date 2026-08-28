const express = require("express");

const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  getDashboardStats,
} = require("../controllers/internship.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Public Routes
router.get("/", getAllInternships);

router.get("/stats/dashboard", authMiddleware, getDashboardStats);

router.get("/:id", getInternshipById);

router.post("/", authMiddleware, createInternship);

router.put("/:id", authMiddleware, updateInternship);

router.delete("/:id", authMiddleware, deleteInternship);

module.exports = router;
