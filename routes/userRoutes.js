const express = require("express");
const router = express.Router();
const {
    getAllUserController,
    createUserController,
    updateUserController,
    resetPasswordUserController,
    getUserController,
    deleteUserController
} = require("../controllers/userControllers");

// for admins
router.get("/", getAllUserController);
router.delete("/:username", deleteUserController);


// for users
router.post("/", createUserController);
router.patch("/:username", updateUserController);
router.patch("/:username/password", resetPasswordUserController);
router.get("/:username", getUserController);


module.exports = router;