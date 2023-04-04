import express from "express";
import { list } from "../controllers/InstituControllers.js";

const router = express.Router();

router.post("/list", list);

export default router;
