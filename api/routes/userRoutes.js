import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addRemoveFavorite,
  getUserFavorite,
} from "../controllers/userControllers.js";


const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:id/favorite", getUserFavorite);
router.delete("/:id", deleteUser);
router.patch("/:id/:schoolId", verifyToken, addRemoveFavorite);

export default router;
