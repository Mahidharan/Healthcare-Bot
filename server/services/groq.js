const axios = require("axios");

const SYSTEM_PROMPT = `You are a professional AI healthcare assistant. You provide helpful, accurate, and empathetic health information and guidance.

Important guidelines:
- Always remind users that your advice is for informational purposes only and does not replace professional medical consultation.
- Be empathetic and supportive in your responses.
- Provide evidence-based health information.
- If symptoms sound serious or life-threatening, strongly advise seeking immediate medical attention.
- Never diagnose conditions definitively - suggest possibilities and recommend consulting a healthcare provider.
- Format responses clearly with bullet points or numbered lists when appropriate.`;

const DEFAULT_GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

async function getAIResponse(messages) {
  const apiKey = process.env.GROQ_API_KEY;
  const apiUrl = process.env.GROQ_API_URL || DEFAULT_GROQ_API_URL;
  const model = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;

  if (!apiKey) {
    throw new Error("Groq API key is not configured");
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid response format from Groq API");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      throw new Error("INVALID_API_KEY");
    }

    if (error.response?.status === 429) {
      throw new Error("RATE_LIMITED");
    }

    throw error;
  }
}

async function getSymptomAnalysis(age, gender, symptoms, duration) {
  const prompt = `A ${age}-year-old ${gender} is experiencing the following symptoms: ${symptoms}. These symptoms have lasted for ${duration}.

Please provide:
1. Possible conditions that could cause these symptoms
2. Recommended immediate actions
3. When to seek emergency medical care
4. General self-care tips

Remember to include a disclaimer that this is not a medical diagnosis.`;

  return getAIResponse([{ role: "user", content: prompt }]);
}

module.exports = { getAIResponse, getSymptomAnalysis };