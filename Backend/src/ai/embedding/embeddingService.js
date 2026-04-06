export const getEmbedding = async (text) => {
  // TEMP: fake embedding (replace later with real API)
  return text.split("").map((c) => c.charCodeAt(0) % 10);
};