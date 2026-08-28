const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createUser,getAllUsers ,getUserById,updateUser,deleteUser} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);
router.get("/",  getAllUsers);
router.get("/:id",authMiddleware, getUserById);
router.put("/:id",authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;