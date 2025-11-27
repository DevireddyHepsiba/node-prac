const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// ⭐ ADD CORS - THIS IS THE FIX ⭐
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Employee routes
app.use("/employees", employeeRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server start
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
