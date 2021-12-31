import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  meal_name: String,
  image_meal: String,
  food_ingredients: Array,
  cooking: String,
  preparation_time: Number,
  cook_id: String,
  cook_name: String,
  rating: String,
  createdAt: String,
});

const Recipe = mongoose.model("recipes", recipeSchema);

export default Recipe;
