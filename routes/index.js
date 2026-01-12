// ./routes/index.js
const express = require("express");
const router = express.Router();


const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const appRoutes = require("./routes/appRoutes");

app.use("/user/api/", userRoutes);
app.use("/user/api/todo/", todoRoutes);
app.use("/", appRoutes); 
module.exports = router;  