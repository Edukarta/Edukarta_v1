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
router.get("/institutions", getAllInstitutions);

//SHOW ONE INSTITUTION
router.get("/institutions/:id", getInstitutionById);

//CREATE AN INSTITUTION
router.post("/institutions", addInstitution);

//UPDATE AN INSTITUTION
router.put("/institutions", updateInstitution)

//DELETE AN INSTITUTION
router.delete("/institutions", deleteInstitution)

export default router;
