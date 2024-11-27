const express = require("express");
const Recipe = require("../../Models/Recipe"); // Import the Recipe model
const User = require("../../Models/User"); // Import the User model
const Category = require("../../Models/Category"); // Import the User model
const requireAuth = require("../../middleware/requireAuth");
const router = express.Router();

console.log(requireAuth);

// Create a new recipe
router.post("/", requireAuth, async (req, res) => {
  console.log(req.user);

  try {
    const { name, ingredients, instructions, category } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    const recipe = new Recipe({
      name,
      ingredients,
      instructions,
      madeBy: user.id,
      category,
    });
    await recipe.save();
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).send({ msg: "Category not found" });
    }
    categoryDoc.recipe.push(recipe._id);
    await categoryDoc.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("ingredients")
      .populate({ path: "madeBy", select: "username" }); // Populate madeBy with username
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("ingredients")
      .populate({ path: "madeBy", select: "username" }); // Populate madeBy with username
    if (!recipe) {
      return res.status(404).send({ msg: "Recipe not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a recipe by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, ingredients, instructions, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, ingredients, instructions, madeBy: user._id },
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).send({ msg: "Recipe not found" });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send({ msg: "Recipe not found" });
    }
    res.status(200).send({ msg: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { recipeRouter: router };
