const express = require("express");
const router = express.Router();
const SymptomCheck = require("../models/SymptomCheck");
const { getSymptomAnalysis } = require("../services/groq");

// Analyze symptoms
router.post("/check", async (req, res) => {
  try {
    const { age, gender, symptoms, duration } = req.body;

    if (!age || !gender || !symptoms || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (typeof age !== "number" || age < 0 || age > 150) {
      return res.status(400).json({ error: "Invalid age" });
    }

    const aiResponse = await getSymptomAnalysis(
      age,
      gender,
      symptoms,
      duration,
    );

    const symptomCheck = new SymptomCheck({
      age,
      gender,
      symptoms,
      duration,
      aiResponse,
    });

    await symptomCheck.save();

    res.json({
      id: symptomCheck._id,
      analysis: aiResponse,
      timestamp: symptomCheck.createdAt,
    });
  } catch (error) {
    console.error("Symptom check error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to analyze symptoms. Please try again." });
  }
});

// Get symptom check history
router.get("/history", async (req, res) => {
  try {
    const checks = await SymptomCheck.find().sort({ createdAt: -1 }).limit(20);
    res.json(checks);
  } catch (error) {
    console.error("Symptom history error:", error.message);
    res.status(500).json({ error: "Failed to fetch symptom history" });
  }
});

module.exports = router;
