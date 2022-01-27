import express from "express";
import {
  getAllCooks,
  createCook,
  logInCook,
  cooksEmailsAndNames,
  findCookById,
  cooksImgAndName,
  findCookByIdAndDelete,
  approvUser,
  editUserData,
} from "../controllers/cook.js";

const router = express.Router();

router.get("/", getAllCooks);
router.post("/", createCook);
router.post("/login", logInCook);
router.get("/check", cooksEmailsAndNames);
router.get("/cookGalery", cooksImgAndName);
router.get("/:id", findCookById);
router.delete("/deleteCook/:id", findCookByIdAndDelete);
router.patch("/approve", approvUser);
router.put("/changeUserData", editUserData);

export default router;
