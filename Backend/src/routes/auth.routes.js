const express = require("express");

const { register, login, getProfile, getMe } = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const { registerValidation } = require("../validators/auth.validator");

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validate,
    register
);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);
router.get("/me", authMiddleware, getMe);

module.exports = router;