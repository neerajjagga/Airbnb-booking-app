import { getEmbedding } from "../embedding/embeddingService.js";
import { searchSimilarListings } from "../vector/vectorSearchService.js";
import { buildChatPrompt } from "../prompts/chatPrompt.js";
import { generateResponse } from "../llm/llmService.js";

export const chatPipeline = async (query) => {
  try {
    // 1. (optional for now)
    const embedding = await getEmbedding(query);

    // 2. Search listings
    const listings = await searchSimilarListings(query);

    // 3. Build prompt
    const prompt = buildChatPrompt(query, listings);

    // 4. LLM call
    const response = await generateResponse(prompt);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("PIPELINE ERROR:", error.message);

    return {
      success: false,
      data: "Something went wrong. Try again.",
    };
  }
};