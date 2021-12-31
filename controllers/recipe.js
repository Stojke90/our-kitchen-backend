import Recipe from "../models/recipeSchema.js";
import mongoose from "mongoose";

// get all Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create new Recipes
export const newRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new Recipe(recipe);
  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all user recipes
export const getAllUserRecipes = async (req, res) => {
  const { id } = req.body;

  try {
    const userRecipes = await Recipe.find({
      cook_id: id,
    });

    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get number of all recipes by user id
export const getUserNumberOfRecipes = async (req, res) => {
  const { id } = req.body;

  try {
    const userRecipes = await Recipe.find({
      cook_id: id,
    });

    res.status(200).json(userRecipes.length);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all user recipes,few props
export const getAllUserRecipesFilter = async (req, res) => {
  const { id } = req.body;

  try {
    const userRecipes = await Recipe.find(
      {
        cook_id: id,
      },
      { meal_name: 1, createdAt: 1 }
    );

    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all recipe image and id
export const getAllImageAndIdOfRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find();
    const imgAndId = recipe.map((obj) => {
      const data = {};
      data.image_meal = obj.image_meal;
      data.recipe_id = obj._id;
      data.meal_name = obj.meal_name;
      data.cook_name = obj.cook_name;
      return data;
    });
    res.status(200).json(imgAndId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// find recipe by id
export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recipe with id: ${id}`);
  try {
    const userRecipes = await Recipe.findById(id);
    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// delete user recipes find by id
export const deleteUserRecipes = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No recipe with id: ${id}`);
  try {
    const userRecipes = await Recipe.findByIdAndDelete(id);

    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// edit recipe

export const editUserRecipe = async (req, res) => {
  const { data } = req.body;

  try {
    const editRecipe = await Recipe.findByIdAndUpdate(
      data._id,
      { ...data },
      { new: true }
    );

    res.status(201).json(editRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
