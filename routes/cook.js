import express from "express";
import {
  getAllCooks,
  createCook,
  logInCook,
  cooksEmailsAndNames,
  findCookById,
  cooksImgAndName,
} from "../controllers/cook.js";

const router = express.Router();

router.get("/", getAllCooks);
router.post("/", createCook);
router.post("/login", logInCook);
router.get("/check", cooksEmailsAndNames);
router.get("/cookGalery", cooksImgAndName);
router.get("/:id", findCookById);

export default router;
