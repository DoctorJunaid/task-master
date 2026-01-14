// importing module and packages
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// importing routes
const allRoutes = require("./routes/index");

require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setting up routes
app.use("/", allRoutes);

// starting server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
