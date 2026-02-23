require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const leadsRouter = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// ── MongoDB ──────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/datapreneur";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.warn("⚠️  MongoDB not connected (running without DB):", err.message));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/leads", leadsRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 DataPreneur server running on http://localhost:${PORT}`);
});
