import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addRemoveSchool,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.patch("/:id/:schoolId", addRemoveSchool);
router.delete("/:id", deleteUser);

export default router;
