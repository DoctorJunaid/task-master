const express = require("express");
const router = express.Router();
// importation of controler is in progress unitl they are being created 

// for admins
router.get("/", getAllUserController);

router.post("/", createUserController);
router.delete("/:id", deleteUserController);
router.patch("/:id", updateUserController);
router.get("/:id", getUserController);


module.exports = router;