import express from "express";
import {
  getAllSchools,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/schoolsControllers.js";

const router = express.Router();

//SHOW ALL SCHOOLS
router.get("/", getAllSchools);


//SHOW ONE SCHOOL
router.get("/:id", getSchoolById);

//CREATE AN SCHOOL
router.post("/", addSchool);

//UPDATE AN SCHOOL
router.patch("/:id", updateSchool)

//DELETE AN SCHOOL
router.delete("/:id", deleteSchool)

export default router;
