const express = require("express");
const Ingredient = require("../../Models/Ingredients");

const router = express.Router();

// Create a new ingredient
router.post("/", async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).send(ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all ingredients
router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).send(ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single ingredient by ID
router.get("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      return res.status(404).send({ msg: "Ingredient not found" });
    }
    res.status(200).send(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an ingredient by ID
router.put("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ingredient) {
      return res.status(404).send({ msg: "Ingredient not found" });
    }
    res.status(200).send(ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an ingredient by ID
router.delete("/:id", async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return res.status(404).send({ msg: "Ingredient not found" });
    }
    res.status(200).send({ msg: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = { ingredientRouter: router };
