/**
 * src/index.js — Gemly Backend API Server  (ESM)
 *
 * Express REST API:
 *   POST /api/recommend        AI + Vedic gemstone recommendation (OpenRouter)
 *   GET  /api/gemstones        Gemstone encyclopedia list
 *   GET  /api/gemstones/:slug  Single gemstone detail
 *   GET  /health               Health + config check
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import recommendRoutes from "./routes/recommend.js";
import gemstoneRoutes from "./routes/gemstones.js";

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",")
    : ["http://localhost:3000", "https://gemly.app"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "1mb" }));
app.use(clerkMiddleware());

// ── Request logger ─────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Health check ───────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Gemly API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    ai: {
      provider: "OpenRouter",
      model: process.env.OPENROUTER_MODEL ?? "google/gemma-4-31b-it:free",
      key: (process.env.OPENROUTER_API_KEY || process.env.NVIDIA_API_KEY) ? "configured ✓" : "MISSING — set OPENROUTER_API_KEY",
    },
  });
});

// ── API Routes ─────────────────────────────────────────────────────
app.use("/api/recommend", recommendRoutes);
app.use("/api/gemstones", gemstoneRoutes);

// ── 404 ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.path} not found` });
});

// ── Global error handler ───────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[Error]", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Boot ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✨ Gemly API  →  http://localhost:${PORT}`);
  console.log(`   Health     →  GET  http://localhost:${PORT}/health`);
  console.log(`   Recommend  →  POST http://localhost:${PORT}/api/recommend`);
  console.log(`   Gemstones  →  GET  http://localhost:${PORT}/api/gemstones\n`);
});
