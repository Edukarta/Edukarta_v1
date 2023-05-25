import express from "express";
import { order } from "../controllers/orderController.js";


const router = express.Router();

router.post("/:schoolId/:id", order);


export default router;