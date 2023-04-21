import express from 'express';
import { getAllRequest, changeRequestStatus, getRequestById} from '../controllers/requestControllers.js';

const router = express.Router();

router.get("/", getAllRequest);
router.get("/:id", getRequestById);
router.patch("/:id/status", changeRequestStatus);

export default router