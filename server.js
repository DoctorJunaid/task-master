// importing module and packages
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors")



// importing routes
const allRoutes = require("./routes/index");

require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 3000;

// Handle CORS - MUST be before all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const corsOptions = {
  origin: "*",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());






// database connecting 
app.use(async (req, res, next) => {
  
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Database connection failed" });
  }
});
// setting up routes
app.use("/", allRoutes);
// starting server
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });


// for vercel 

module.exports = app;
