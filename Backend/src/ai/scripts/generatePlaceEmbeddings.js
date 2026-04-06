const mongoose = require("mongoose");
const { Place } = require("../../models/place.model");
const { getEmbedding } = require("../../ai/embedding/embeddingService");
const { createPlaceText } = require("../../ai/utils/createPlaceText");

require("dotenv").config();

const run = async () => {
  await mongoose.connect("");

  const places = await Place.find();

  for (let place of places) {
    const text = createPlaceText(place);

    const embedding = await getEmbedding(text);

    place.embedding = embedding;
    await place.save();

    console.log("✅ Updated:", place.title);
  }

  console.log("🎉 All embeddings generated");
  process.exit();
};

run();