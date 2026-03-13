const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const { getAIResponse } = require("../services/groq");

// Send message and get AI response
router.post("/send", async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ error: "Message is required" });
    }

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
    } else {
      conversation = new Conversation();
    }

    // Add user message
    conversation.messages.push({ role: "user", content: message.trim() });

    // Build message history for AI context (last 10 messages)
    const recentMessages = conversation.messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Get AI response
    const aiResponse = await getAIResponse(recentMessages);

    // Add AI response
    conversation.messages.push({ role: "assistant", content: aiResponse });

    await conversation.save();

    res.json({
      conversationId: conversation._id,
      response: aiResponse,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Chat error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Handle specific error cases
    if (error.message === "INVALID_API_KEY") {
      return res.status(401).json({
        error: "AI service configuration error. Please contact support.",
      });
    }
    if (error.message === "RATE_LIMITED") {
      return res.status(429).json({
        error: "The AI service is temporarily rate limited. Please try again.",
      });
    }

    res.status(500).json({
      error: "Failed to get AI response. Please try again.",
    });
  }
});

// Get all conversations
router.get("/history", async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .select("title messages createdAt updatedAt")
      .limit(50);
    res.json(conversations);
  } catch (error) {
    console.error("History error:", error.message);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// Get single conversation
router.get("/history/:id", async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    console.error("Fetch conversation error:", error.message);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});

// Delete conversation
router.delete("/history/:id", async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ message: "Conversation deleted" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

module.exports = router;
