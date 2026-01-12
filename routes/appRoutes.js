const express = require("express");
const router = express.Router();
// importation of controler is in progress unitl they are being created

router.get("/", dashboardController);
router.get("/login", loginController);
router.get("/signup", signupController);
router.get("/*", unexpectedRouteController);

module.exports = router;
