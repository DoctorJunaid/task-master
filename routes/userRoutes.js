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
  getProfileController,
  changePasswordController,
  verifyEmailController,
} = require("../controllers/userControllers");
const passport = require("../config/passport");
const googleCallbackController = require("../controllers/googleCallbackController");

// for users google login

// google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// google auth redirect
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController,
);

// for users
router.post("/signup", createUserController);
router.post("/login", getUserController);
router.post("/logout", logoutController);
router.patch("/password", resetPasswordUserController);
router.post("/forgot-password", forgotPasswordController);

router.get("/me", verifyUser, getProfileController);
router.patch("/change-password", verifyUser, changePasswordController);
router.get("/verify-email", verifyEmailController);

router.patch("/:username", verifyUser, updateUserController);

module.exports = router;
