import axios from "axios";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generateResponse = async (prompt) => {
  try {
    const res = await axios.post(
      OPENROUTER_URL,
      {
        model: "qwen/qwen-3.6-plus",
        temperature: 0.7,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant for an Airbnb-like rental platform.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("LLM ERROR:", err.response?.data || err.message);
    throw new Error("LLM failed");
  }
};