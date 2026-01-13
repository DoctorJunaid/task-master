const express = require("express");
const router = express.Router();
const {
  getAllUserController,
  deleteUserController,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  loginAdmin,
} = require("../controllers/adminControllers");

const { verifyToken, adminRoleAuth } = require("../middlewares/authMiddleware");

// Admin login (public)
router.post("/login", loginAdmin);

// Admin creation (internal only)
router.post("/", verifyToken, adminRoleAuth, createAdmin);

// Get all admins
router.get("/", verifyToken, adminRoleAuth, getAllAdmins);

// Get all users (admin-only)
router.get("/users", verifyToken, adminRoleAuth, getAllUserController);

// Delete normal user (admin-only)
router.delete("/user/:username", verifyToken, adminRoleAuth, deleteUserController);

// Delete admin (admin-only)
router.delete("/admin/:username", verifyToken, adminRoleAuth, deleteAdmin);

module.exports = router;
