// server/server.js

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Global error handler middleware
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

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});