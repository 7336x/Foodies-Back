const { model, Schema } = require("mongoose");

const RecipeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  discreption: { type: String, required: true },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredients",
    },
  ],
});

module.exports = model("Recipe", RecipeSchema);
