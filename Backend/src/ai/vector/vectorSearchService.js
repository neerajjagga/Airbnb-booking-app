const { Place } = require("../../models/place.model");

const searchSimilarPlaces = async (queryEmbedding) => {
  const results = await Place.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5,
      },
    },
  ]);

  return results;
};

module.exports = { searchSimilarPlaces };