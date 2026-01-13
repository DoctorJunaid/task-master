const express = require("express");
const {
  verifyUser,
} = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getUserController,
  createUserController,
  updateUserController,
  resetPasswordUserController,
} = require("../controllers/userControllers");

// for users
router.post("/signup", createUserController);
router.post("/login", getUserController);
router.patch("/:username", verifyUser, updateUserController);
router.patch("/:username/password", verifyUser, resetPasswordUserController);

module.exports = router;
