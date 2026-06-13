import { Router } from "express";
import { recommend } from "../controllers/recommendController.js";
import { requireAuth } from "@clerk/express";

const router = Router();

// POST /api/recommend
router.post("/", requireAuth(), recommend);

export default router;
