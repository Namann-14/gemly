import { Router } from "express";
import { getAllGemstones, getGemstoneBySlug } from "../controllers/gemstoneController.js";

const router = Router();

// GET /api/gemstones
router.get("/", getAllGemstones);

// GET /api/gemstones/:slug
router.get("/:slug", getGemstoneBySlug);

export default router;
