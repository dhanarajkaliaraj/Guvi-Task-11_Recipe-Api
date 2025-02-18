const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");

const URL = process.env.DB;
mongoose.connect(URL);

const { Recipe } = require("./model/recipe");
console.log("mongoose connected");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Landing page
app.get("/", (req, res) => {
  res.send("<h3>Port listening</h3>");
});

// Gets all items from database
app.get("/recipes", async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

// Gets single item from database using ID
app.get("/recipe/:id", async (req, res) => {

  try {
    let recipe = await Recipe.findOne({ _id: req.params.id });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

// Adds recipe in DB
app.post("/add-recipe", (req, res) => {
  try {
    let recipe = new Recipe({
      name: req.body.name,
      instructions: req.body.instructions,
      prepTime: req.body.prepTime,
    });

    recipe.save();
    res.status(200).json({ message: "recipe added successfully" });

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

// Updates existing item in database
app.put("/update-recipe/:id", async (req, res) => {
  try {
    let recipe = await Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json(recipe);

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

// Deletes item from database using ID
app.delete("/remove-recipe/:id", async (req, res) => {
  try {
    await Recipe.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

app.listen(3000);
