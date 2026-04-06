import { chatPipeline } from "../ai/index.js";

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const result = await chatPipeline(message);

  res.json(result);
};