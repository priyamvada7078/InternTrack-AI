const express = require("express");

const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  getDashboardStats,
  getAnalytics,
} = require("../controllers/internship.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/stats/dashboard", authMiddleware, getDashboardStats);
router.get("/stats/analytics", authMiddleware, getAnalytics);

router.get("/", authMiddleware, getAllInternships);
router.get("/:id", authMiddleware, getInternshipById);
router.post("/", authMiddleware, createInternship);
router.put("/:id", authMiddleware, updateInternship);
router.delete("/:id", authMiddleware, deleteInternship);

module.exports = router;
