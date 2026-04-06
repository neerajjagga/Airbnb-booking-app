export const buildChatPrompt = (query, listings) => {
  if (!listings.length) {
    return `
User asked: "${query}"

No listings found.

Respond politely and ask user to refine search.
`;
  }

  const context = listings
    .map(
      (l, i) => `
Listing ${i + 1}:
Title: ${l.title}
Price: ₹${l.price}
Location: ${l.location}
Amenities: ${l.amenities?.join(", ")}
Description: ${l.description}
`
    )
    .join("\n");

  return `
You are an AI assistant for a rental platform.

Use ONLY the listings below to answer.

${context}

User Question:
${query}

Give helpful suggestions.
`;
};