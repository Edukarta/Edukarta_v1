import express from "express";
import { register, login } from "../controllers/authControllers.js";

const router = express.Router();

//LOGIN
router.post("/login", login);


export default router;