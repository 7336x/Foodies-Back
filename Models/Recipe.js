const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }],
  instructions: { type: String, required: true },
  madeBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = model("Recipe", RecipeSchema);
