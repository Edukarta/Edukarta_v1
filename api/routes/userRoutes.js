import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addRemoveFavorite,
  getUserFavorite,
  recoveryPassword,
  resetPasswordByToken,
} from "../controllers/userControllers.js";


const router = express.Router();

router.patch("/PasswordRecovery/:token",resetPasswordByToken) 
router.post("/send_recovery_email",recoveryPassword) 
router.patch("/:id/:schoolId", verifyToken, addRemoveFavorite);
router.get("/:id/favorite", getUserFavorite);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;
