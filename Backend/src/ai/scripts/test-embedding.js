import mongoose from "mongoose";
import { getEmbedding } from "../../ai/embedding/embeddingService.js";
import { searchSimilarPlaces } from "../../ai/vector/vectorSearchService.js";

const test = async () => {
    await mongoose.connect("");
  
  const query = "cheap stay near beach";

  const embedding = await getEmbedding(query);

  const results = await searchSimilarPlaces(embedding);

  console.log(results.map(r => ({
    title: r.title,
    price: r.price,
    address: r.address
  })));
};

test();