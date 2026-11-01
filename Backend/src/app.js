const express = require("express");
const cors = require("cors");

const internshipRoutes = require("./routes/internship.routes");
const logger = require("./middleware/logger.middleware");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./middleware/error.middleware");
const healthRoutes = require("./routes/health.routes");
const aiRoutes = require("./routes/ai.routes");
const interviewRoutes = require("./routes/interview.routes");
const interviewHistoryRoutes = require("./routes/interviewHistory.routes");
const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5175",
    credentials: true,
  })
);

app.use(express.json());

app.use(logger);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/interview-history", interviewHistoryRoutes);

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Middleware
app.use(errorHandler);

module.exports = app;