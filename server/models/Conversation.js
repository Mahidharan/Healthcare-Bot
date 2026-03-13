const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "New Conversation",
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  if (this.messages.length > 0 && this.title === "New Conversation") {
    this.title = this.messages[0].content.substring(0, 60) + "...";
  }
  next();
});

module.exports = mongoose.model("Conversation", conversationSchema);
