import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userControllers.js";


const router = express.Router();


router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;