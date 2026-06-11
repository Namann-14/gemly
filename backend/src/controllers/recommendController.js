/**
 * recommendController.js — POST /api/recommend  (ESM)
 *
 * Validates input → Vedic engine → AI → response
 */

import { z } from "zod";
import { calculatePlanetaryProfile } from "../services/vedicEngine.js";
import { getGemstoneRecommendation } from "../services/aiService.js";

const RecommendSchema = z.object({
  name:       z.string().min(1).max(100),
  dob:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be YYYY-MM-DD"),
  birthTime:  z.string().optional().default(""),
  birthPlace: z.string().min(1).max(200),
  zodiac:     z.string().min(1),
  concern:    z.enum(["career", "love", "health", "wealth", "protection", "spiritual"]),
});

export async function recommend(req, res) {
  try {
    const parsed = RecommendSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const input = parsed.data;
    console.log(`[Recommend] ${input.name} | ${input.zodiac} | ${input.concern}`);

    const profile = calculatePlanetaryProfile(input);
    console.log(`[Vedic] Rashi: ${profile.rashi} | Dasha: ${profile.dashaLord} | Weak: ${profile.weakPlanets.join(", ")}`);

    const { result, model, reasoning } = await getGemstoneRecommendation(profile);

    return res.status(200).json({
      ...result,
      _meta: {
        model,
        reasoningChars: reasoning?.length ?? 0,
        profile: {
          rashi:       profile.rashi,
          ascendant:   profile.ascendant,
          dashaLord:   profile.dashaLord,
          weakPlanets: profile.weakPlanets,
        },
      },
    });
  } catch (err) {
    console.error("[Recommend] Error:", err.message);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
