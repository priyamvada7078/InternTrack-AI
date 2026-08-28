const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
    getDashboard,
} = require("../controllers/admin.controller");

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboard
);

module.exports = router;