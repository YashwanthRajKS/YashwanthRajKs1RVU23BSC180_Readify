// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

// 🧠 Connect to MongoDB Atlas
connectDB();

// 🔧 Middleware setup
app.use(helmet());
app.use(
  cors({
    origin: "*", // ✅ Change to your frontend domain after deployment
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// 📂 Serve PDFs (works on Render too)
app.use("/pdfs", express.static("uploads/pdfs"));

// 📦 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/history", historyRoutes);

// 🩺 Health check route
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "📚 Readify Backend is running smoothly!",
    version: "v1.0.0",
  });
});

// ❗ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Server Error" });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
