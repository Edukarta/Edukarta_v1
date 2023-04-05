import express from "express";
import {
  getAllInstitutions,
  getInstitutionById,
  addInstitution,
  updateInstitution,
  deleteInstitution,
} from "../controllers/InstituControllers.js";

const router = express.Router();

//SHOW ALL INSTITUTIONS
router.get("/", getAllInstitutions);

//SHOW ONE INSTITUTION
router.get("/:id", getInstitutionById);

//CREATE AN INSTITUTION
router.post("/", addInstitution);

//UPDATE AN INSTITUTION
router.patch("/:id", updateInstitution)

//DELETE AN INSTITUTION
router.delete("/:id", deleteInstitution)

export default router;
