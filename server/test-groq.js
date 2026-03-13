require("dotenv").config();
const axios = require("axios");

const testAPI = async () => {
  try {
    const apiUrl =
      process.env.GROQ_API_URL ||
      "https://api.groq.com/openai/v1/chat/completions";
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    console.log("Testing Groq API...");
    console.log("URL:", apiUrl);
    console.log("Model:", model);
    console.log("Key:", process.env.GROQ_API_KEY?.substring(0, 10) + "...");

    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      },
    );

    console.log("Success!");
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error Details:");
    console.error("- Message:", error.message);
    console.error("- Status:", error.response?.status);
    console.error("- Data:", JSON.stringify(error.response?.data, null, 2));
  }
};

testAPI();
