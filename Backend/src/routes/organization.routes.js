const express = require("express");

const {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
} = require("../controllers/organization.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Public Routes
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);

// Protected Routes
router.post("/", authMiddleware, createOrganization);
router.put("/:id", authMiddleware, updateOrganization);
router.delete("/:id", authMiddleware, deleteOrganization);

module.exports = router;