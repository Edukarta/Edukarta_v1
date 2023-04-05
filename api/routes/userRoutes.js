import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addRemoveSchool,
  getUserFavorite
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:id/favorite", getUserFavorite);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.patch("/:id/:schoolId", addRemoveSchool);

export default router;
