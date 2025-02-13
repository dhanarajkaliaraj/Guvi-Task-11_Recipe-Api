const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");

const URL = "mongodb://localhost:27017/recipeDB";
mongoose.connect(URL);

const { Recipe } = require("./model/recipe");

const app = express();
app.use(express.json());

console.log("mongoose connected");

app.use(
  cors({
    origin: "*",
  })
);

// Landing page
app.get("/", (req, res) => {
  res.send("<h3>Listening port 3000</h3>");
});

// Gets all items from database
app.get("/recipes", async (req, res) => {
  let recipes = await Recipe.find();
  res.json(recipes);
});

// Gets single item from database using ID
app.get("/recipe/:id", async (req, res) => {
  let recipe = await Recipe.findOne({ _id: req.params.id });
  res.json(recipe);
});

// Adds recipe in DB
app.post("/add-recipe", (req, res) => {
  let recipe = new Recipe({
    name: req.body.name,
    instructions: req.body.instructions,
    prepTime: req.body.prepTime,
  });

  recipe.save();
  res.json({ message: "recipe added successfully" });
});

// Updates existing item in database
app.put("/update-recipe/:id", async (req, res) => {
  let recipe = await Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);

  res.json(recipe);
});

// Deletes item from database using ID
app.delete("/remove-recipe/:id", async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Deleted" });
});

app.listen(3000);
