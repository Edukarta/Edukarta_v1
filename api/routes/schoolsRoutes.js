import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllSchools,
  getAllPopularSchools,
  getSchoolById,
  addSchool,
  deleteSchool,
  searchSchools,
  filterSchools,
  schoolApply,
  getUserApply
} from "../controllers/schoolsControllers.js";

const router = express.Router();

//SHOW ALL SCHOOLS
router.get("/", getAllSchools);
router.get('/popular', getAllPopularSchools);
router.get("/search", searchSchools);
router.get("/filter", filterSchools);
router.get("/:id", getSchoolById);
router.patch("/:id/apply/:userId", verifyToken, schoolApply);
router.get("/:id/apply", getUserApply);
router.post("/", addSchool);

//SHOW SCHOOL ON SELECTED CONTINENT
// router.get("/:continent", getSchoolsByContinent);

 //SHOW SCHOOL ON SELECTED COUNTRY
// router.get("/:continent/:country", getSchoolsByContinentAndCountry)


//DELETE A SCHOOL
router.delete("/:id", deleteSchool)

export default router;
