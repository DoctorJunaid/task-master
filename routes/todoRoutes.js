const express = require("express");
const router = express.Router();
// importation of controler is in progress unitl they are being created

router.post("/", createTodoController);
router.delete("/:id", deleteTodoController);
router.delete("/", deleteAllTodoController);
router.patch("/:id", updateTodoController);
router.get("/:id", getTodoController);
router.get("/", getAllTodoController);

module.exports = router;
