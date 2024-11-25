// const express = require("express");
// const { body } = require("express-validator");
// const Recipe = require("../../Models/Recipe");
// const User = require("../../models/User");
// const { requireAuth, validateRequest } = require("../../middleware");
// const { NotFoundError } = require("../../errors");

// const findRecipe = async function (req, res, next, id) {
//   const foundRecipe = await Post.findById(id);

//   if (!foundPost) return next(NotFoundError("Recipe not found"));

//   req.post = foundPost;

//   next();
// };

// const router = express.Router();

// router.use(recipeGetRouter);
// router.use(recipeGetRouter);
// router.use(recipeCreateRouter);
// router.use(recipeDeleteRouter);
// router.use(recipeUpdateRouter);

// module.exports = { recipeRouter: router };

// module.exports = findRecipe;
