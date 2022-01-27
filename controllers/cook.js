import Cook from "../models/cookSchema.js";
import mongoose from "mongoose";

// get all Cooks
export const getAllCooks = async (req, res) => {
  try {
    const cooks = await Cook.find();
    res.status(200).json(cooks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get cooks email and names
export const cooksEmailsAndNames = async (req, res) => {
  try {
    const cooks = await Cook.find();
    const email = cooks.map((data) => data.email);
    const name = cooks.map((data) => data.cook_name);
    res.status(200).json({ email, name });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// log in Cook
export const logInCook = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const cook = await Cook.findOne({
      email: email,
      password: password,
    });
    if (!cook) {
      res.status(204).json({
        message: "Cook's not found",
      });
    } else {
      res.status(200).json(cook);
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// find cook by id
export const findCookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  try {
    const userById = await Cook.findById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// create new Cook's
export const createCook = async (req, res) => {
  const cook = req.body;

  const newCook = new Cook(cook);

  try {
    await newCook.save();
    res.status(201).json(newCook);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get all Cooks with base data for galery of cook's
export const cooksImgAndName = async (req, res) => {
  try {
    const cooks = await Cook.find();
    const activeCooks = cooks
      .filter((cooks) => cooks.role !== 0)
      .map((cooks) => {
        const cookGalery = {};
        cookGalery.image = cooks.image;
        cookGalery.cook_name = cooks.cook_name;
        cookGalery._id = cooks._id;
        return cookGalery;
      });

    res.status(200).json(activeCooks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// find cook by id and delete
export const findCookByIdAndDelete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  try {
    const userById = await Cook.findByIdAndDelete(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// approv user request
export const approvUser = async (req, res) => {
  const { data } = req.body;
  const { _id, role } = data;
  try {
    const approveCook = await Cook.findByIdAndUpdate(
      { _id },
      { role: 1 },
      { new: true }
    );

    res.status(200).json(approveCook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit user data
export const editUserData = async (req, res) => {
  const { data } = req.body;

  try {
    const changeUserData = await Cook.findByIdAndUpdate(
      data._id,
      { ...data },
      { new: true }
    );

    res.status(201).json(changeUserData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
