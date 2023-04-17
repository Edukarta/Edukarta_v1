import express from "express";
import {
  getAllSchools,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
  getSchoolsByContinent,
  getSchoolsByContinentAndCountry,
} from "../controllers/schoolsControllers.js";

const router = express.Router();

//SHOW ALL SCHOOLS
router.get("/", getAllSchools);


//SHOW ONE SCHOOL
router.get("/:id", getSchoolById);

// //SHOW SCHOOL ON SELECTED CONTINENT
router.get("/:continent", getSchoolsByContinent);

// //SHOW SCHOOL ON SELECTED COUNTRY
router.get("/:continent/:country", getSchoolsByContinentAndCountry)



//CREATE A SCHOOL
router.post("/", addSchool);

//UPDATE A SCHOOL
router.patch("/:id", updateSchool)

//DELETE A SCHOOL
router.delete("/:id", deleteSchool)

export default router;
