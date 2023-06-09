import express from "express";
import {
  createEvent,
  getEventsBySchoolId,
  deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

//CREATE EVENT
router.post("/:id", createEvent);
router.get("/:id", getEventsBySchoolId );
router.delete("/:id", deleteEvent );

export default router;
