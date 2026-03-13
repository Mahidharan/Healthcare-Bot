const mongoose = require("mongoose");

const symptomCheckSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptoms: { type: String, required: true },
  duration: { type: String, required: true },
  aiResponse: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SymptomCheck", symptomCheckSchema);
