const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  discreption: { type: String, required: true },
  madeBy: { type: Schema.Types.ObjectId, ref: "User" },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredients",
    },
  ],
});

module.exports = model("Recipe", RecipeSchema);
