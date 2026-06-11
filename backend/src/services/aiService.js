/**
 * aiService.js — OpenRouter AI Service  (ESM, streaming)
 *
 * Model:  google/gemma-4-31b-it:free  (reasoning model)
 * SDK:    openai (OpenAI-compatible)
 * Stream: true  — we consume the full stream server-side,
 *                 separate reasoning details from content,
 *                 then return parsed JSON to the Express handler.
 */

import OpenAI from "openai";

// ── System prompt ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Gemly's AI Vedic Gemologist — a master of classical Jyotish (Vedic astrology) and Ratna Shastra (gemstone science). You have deep knowledge of:
- Navagraha (9 planets) and their gemstone correspondences
- Parashari rules for benefic/malefic planet assessment
- Vimshottari Dasha system and its implications for gemstone selection
- Traditional wearing procedures, metal correspondences, and contraindications
- The WHY behind every recommendation — you never give generic advice

Your task: Given a person's enriched planetary profile, recommend 2–3 gemstones that will most benefit them, with a focus on their stated life concern.

CRITICAL RULES:
1. Your response must be ONLY valid JSON — no markdown, no prose before or after, no code fences
2. Explain WHY each gemstone specifically for THIS person's chart — not generic descriptions
3. Reference their Dasha lord, weak planets, and rashi ruler in your reasoning
4. The personal_message should feel warm, personal, and profound — address them by name
5. Never recommend contradicting gemstones for incompatible chart combinations
6. caution must be honest — if a stone carries risk for this person, state it clearly

Response format — strict JSON only, nothing else:
{
  "gemstones": [
    {
      "name": "string (English gem name, e.g. Ruby)",
      "sanskrit": "string (Sanskrit name, e.g. Manikya)",
      "planet": "string (ruling planet)",
      "color": "string (hex color, e.g. #e11d48)",
      "tagline": "string (one poetic line)",
      "why_recommended": "string (2–3 sentences specific to THIS person's chart)",
      "properties": ["string", "string", "string"],
      "how_to_wear": "string (metal, finger, day, time, minimum weight, mantra)",
      "best_day": "string",
      "caution": "string (honest contraindications for this person)"
    }
  ],
  "personal_message": "string (3–4 warm sentences addressing them by name)"
}`;

// ── User prompt ─────────────────────────────────────────────────────
function buildUserPrompt(profile) {
  return `Provide a Vedic gemstone recommendation for:

Name: ${profile.name}
Date of Birth: ${profile.dob}
Birth Time: ${profile.birthTime}
Birth Place: ${profile.birthPlace}
Rashi (Moon sign): ${profile.rashi}
Ascendant (Lagna): ${profile.ascendant}
Rashi Ruler: ${profile.rashiRuler}
Ascendant Ruler: ${profile.ascendantRuler}
Current Dasha Lord: ${profile.dashaLord} (${profile.dashaYearsRemaining} years remaining)
Dominant Planet: ${profile.dominantPlanet}
Weak Planets: ${profile.weakPlanets.join(", ")}
Benefic Planets for Lagna: ${profile.benefics.join(", ")}
Life Concern: ${profile.concern}
Relevant Planets for concern: ${profile.relevantPlanets.join(", ")}

Recommend 2–3 gemstones for ${profile.name}. Be specific to their chart, reference their Dasha and weak planets. Return ONLY valid JSON — no markdown, no explanation outside the JSON.`;
}

// ── Strip JSON from any accidental markdown fences ──────────────────
function extractJSON(raw) {
  const cleaned = raw
    .replace(/^```json\s*/im, "")
    .replace(/^```\s*/im, "")
    .replace(/\s*```$/im, "")
    .trim();
  return JSON.parse(cleaned);
}

// ── Main export ─────────────────────────────────────────────────────
export async function getGemstoneRecommendation(profile) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NVIDIA_API_KEY;
  const model  = process.env.OPENROUTER_MODEL ?? "google/gemma-4-31b-it:free";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set. Add it to your backend/.env file.");
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://gemly.app",
      "X-Title": "Gemly",
    }
  });

  console.log(`[AI] OpenRouter → model: ${model}`);
  console.log(`[AI] Streaming response for: ${profile.name}`);

  // ── Stream request ────────────────────────────────────────────────
  const stream = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user",   content: buildUserPrompt(profile) },
    ],
    temperature: 1,
    top_p: 0.95,
    reasoning: {
      enabled: true,
      exclude: false
    },
    stream: true,
  });

  // ── Collect chunks ────────────────────────────────────────────────
  let contentBuffer   = "";
  let reasoningBuffer = "";
  let inputTokens     = 0;
  let outputTokens    = 0;

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta;
    if (!delta) continue;

    // Reasoning extraction with fallback support for different provider schema
    let reasoningChunk = "";
    if (delta.reasoning_content) {
      reasoningChunk = delta.reasoning_content;
    } else if (delta.reasoning) {
      reasoningChunk = delta.reasoning;
    } else if (delta.reasoning_details) {
      if (typeof delta.reasoning_details === "string") {
        reasoningChunk = delta.reasoning_details;
      } else if (Array.isArray(delta.reasoning_details)) {
        for (const item of delta.reasoning_details) {
          if (typeof item === "string") {
            reasoningChunk += item;
          } else if (item && typeof item === "object") {
            reasoningChunk += item.text || item.content || item.reasoning || "";
          }
        }
      } else if (typeof delta.reasoning_details === "object") {
        reasoningChunk = delta.reasoning_details.text || delta.reasoning_details.content || delta.reasoning_details.reasoning || "";
      }
    }

    if (reasoningChunk) {
      reasoningBuffer += reasoningChunk;
      process.stdout.write("\x1b[2m"); // dim
      process.stdout.write(reasoningChunk);
      process.stdout.write("\x1b[0m");
    }

    // Regular content tokens — this is the JSON answer
    if (delta.content) {
      contentBuffer += delta.content;
    }

    // Usage (arrives on the last chunk with stream_options)
    if (chunk.usage) {
      inputTokens  = chunk.usage.prompt_tokens     ?? 0;
      outputTokens = chunk.usage.completion_tokens ?? 0;
    }
  }

  console.log(`\n[AI] Stream complete.`);
  console.log(`[AI] Reasoning tokens: ${reasoningBuffer.length} chars`);
  console.log(`[AI] Content tokens:   ~${outputTokens} (in: ${inputTokens})`);

  if (!contentBuffer.trim()) {
    throw new Error("OpenRouter returned empty content. Check model name and API key.");
  }

  const result = extractJSON(contentBuffer);
  return { result, model, reasoning: reasoningBuffer };
}
