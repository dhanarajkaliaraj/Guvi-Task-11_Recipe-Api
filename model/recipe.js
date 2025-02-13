const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  prepTime: String,
});

const Recipe = mongoose.model("recipes", RecipeSchema);

module.exports = { Recipe };
