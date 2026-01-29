const express = require("express");
const { verifyUser } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getUserController,
  createUserController,
  updateUserController,
  resetPasswordUserController,
  logoutController,
  forgotPasswordController,
} = require("../controllers/userControllers");

// for users
router.post("/signup", createUserController);
router.post("/login", getUserController);
router.post("/logout", logoutController);
router.patch("/password", resetPasswordUserController);
router.post("/forgot-password", forgotPasswordController);
router.patch("/:username", verifyUser, updateUserController);

module.exports = router;
