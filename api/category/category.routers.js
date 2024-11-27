const express = require("express");
const categoryController = require("./category.controller");

const router = express.Router();

// Get all categories
router.get("/", categoryController.getCategories);

// Get a single category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", categoryController.createCategory);

// Update a category by ID
router.put("/:id", categoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategory);

router.post("/:recipeId/:categoryId", categoryController.addRecipeToCategory);

module.exports = { categoryRouter: router };
