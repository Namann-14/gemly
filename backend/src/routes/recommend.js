import { Router } from "express";
import { recommend } from "../controllers/recommendController.js";

const router = Router();

// POST /api/recommend
router.post("/", recommend);

export default router;
