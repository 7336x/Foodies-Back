const express = require("express");
const morgan = require("morgan");

const { handleErrors, currentUser } = require("./middleware");
const { NotFoundError } = require("./errors");

const { authRouter } = require("./api/auth");
const { categoryRouter } = require("./api/category/category.routers");
const {
  ingredientRouter,
} = require("./api/ingrediants/ingrediants.controller");
const { recipeRouter } = require("./api/recipe/recipe.controllers");

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(currentUser);

app.use("/category", categoryRouter);
app.use("/ingredients", ingredientRouter);
app.use("/recipes", recipeRouter);

/**
 * Routers
 */
app.use("/auth", authRouter);
// app.use("/posts", postsRouter);

/**
 * Not Found Catchall
 */
app.all("*", (req) => {
  throw NotFoundError(`${req.method} ${req.url}: Route not found`);
});

/**
 * Error Handling
 */
app.use(handleErrors);

module.exports = app;
