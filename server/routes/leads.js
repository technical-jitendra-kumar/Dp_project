const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// POST /api/leads — create a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, program, message, source } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });

    const lead = new Lead({ name, email, phone, program, message, source });
    await lead.save();
    res.status(201).json({ success: true, message: "Lead saved!", id: lead._id });
  } catch (err) {
    console.error("Lead save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/leads — list all leads (admin use)
router.get("/", async (_req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(100);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
