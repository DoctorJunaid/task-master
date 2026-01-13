const express = require("express");
const router = express.Router();
const { dashboardController,
    loginController,
    signupController,
    unexpectedRouteController
} = require("../controllers/appControllers");

router.get("/" , dashboardController);
router.get("/login", loginController);
router.get("/signup", signupController);
router.use( unexpectedRouteController);



module.exports = router;
