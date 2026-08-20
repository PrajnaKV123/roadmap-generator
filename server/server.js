// server/server.js

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

// ===============================
// CORS CONFIGURATION
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://roadmap-generator-ruddy.vercel.app",
    ],
    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());

// ===============================
// HEALTH CHECK ROUTE
// ===============================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
  });
});

// ===============================
// MONGODB CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ===============================
// API ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/chatbot", chatbotRoutes);

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  if (!res.headersSent) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message || "An unexpected error occurred",
      timestamp: new Date(),
    });
  }
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});