const express = require("express");
const verifyToken = require('../middlewares/authMiddleware')
const router = express.Router();


const todoRoutes = require("./todoRoutes");
const userRoutes = require("./userRoutes");
const appRoutes = require("./appRoutes");


router.use("/api/users", userRoutes);
router.use("/api/users/:user/todo",verifyToken, todoRoutes);
router.use("/", appRoutes);

module.exports = router;