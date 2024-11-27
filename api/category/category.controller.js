const Category = require("../../Models/Category"); // Import the Category model
const { validationResult } = require("express-validator");

// Create a new category
exports.createCategory = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    // Check if category already exists
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: "Category already exists" });
    }

    // Create new category
    category = new Category({ name });
    await category.save();

    res.status(201).json({ msg: "Category created successfully", category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    category.name = name;
    await category.save();

    res.status(200).json({ msg: "Category updated successfully", category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    console.log(category);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.addRecipeToCategory = async (req, res) => {
  const { recipeId, categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ msg: "Recipe not found" });
    }

    category.recipe.push(recipeId);
    await category.save();

    res
      .status(200)
      .json({ msg: "Recipe added to category successfully", category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
