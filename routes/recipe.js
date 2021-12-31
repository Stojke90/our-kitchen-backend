import express from "express";

import {
  getAllRecipes,
  newRecipe,
  getAllUserRecipes,
  getAllImageAndIdOfRecipes,
  getRecipeById,
  getAllUserRecipesFilter,
  getUserNumberOfRecipes,
  deleteUserRecipes,
  editUserRecipe,
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", newRecipe);
router.post("/userRecipes", getAllUserRecipes);
router.get("/foodGalery", getAllImageAndIdOfRecipes);
router.post("/filter", getAllUserRecipesFilter);
router.post("/length", getUserNumberOfRecipes);
router.get("/recipeById/:id", getRecipeById);
router.delete("/deleteRecipe/:id", deleteUserRecipes);
router.put("/editRecipe", editUserRecipe);

export default router;
