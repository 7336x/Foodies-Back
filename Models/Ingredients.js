const { model, Schema } = require("mongoose");

const IngredientsSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = model("Ingredients", IngredientsSchema);
