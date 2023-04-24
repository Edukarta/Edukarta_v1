import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

//LOGIN ADMIN
router.post("/login", loginAdmin);

export default router;