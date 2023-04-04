import express from "express";
import { register, login } from "../controllers/authControllers.js";

const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);


export default router;