import express from "express";
import {
  getAllSchools,
  getSchoolById,
  addSchool,
  deleteSchool,
  searchSchools
} from "../controllers/schoolsControllers.js";

const router = express.Router();

//SHOW ALL SCHOOLS
router.get("/", getAllSchools);
router.get("/search", searchSchools);
router.get("/:id", getSchoolById);
router.post("/", addSchool);

//SHOW SCHOOL ON SELECTED CONTINENT
// router.get("/:continent", getSchoolsByContinent);

 //SHOW SCHOOL ON SELECTED COUNTRY
// router.get("/:continent/:country", getSchoolsByContinentAndCountry)


//DELETE A SCHOOL
router.delete("/:id", deleteSchool)

export default router;
