# AI Usage Declaration — Gemly

**Project:** Gemly — AI-powered Vedic Gemstone Recommendation Platform  
**Domain:** [gemly.app](https://gemly.app)  
**Date:** June 2026

---

## AI Provider & Model

| Field | Value |
|---|---|
| **Provider** | [OpenRouter](https://openrouter.ai) |
| **Default Model** | `google/gemma-4-31b-it:free` (Gemma 4 31B Instruct) |
| **Model Override** | Set `OPENROUTER_MODEL` env var to use any OpenRouter model |
| **SDK** | `openai` npm package (OpenAI-compatible API) |
| **Integration file** | `backend/src/services/aiService.js` |
| **Streaming** | Yes — response is streamed server-side, reasoning tokens separated from content |

> The model is configurable via the `OPENROUTER_MODEL` environment variable. The default is `google/gemma-4-31b-it:free` which includes extended thinking/reasoning capability.

---

## How AI is Used

### Role: Vedic Gemologist

The AI receives an enriched planetary profile computed by `vedicEngine.js` — a deterministic classical Vedic astrology engine — and acts as a **master Vedic gemologist**. It reasons across:

1. The person's **Rashi** (Moon sign) and estimated **Lagna** (Ascendant)
2. Their current **Vimshottari Dasha** period (active planetary ruler + years remaining)
3. Their **weak planets** (determined by debilitation rules)
4. Their **benefic planets** for their Lagna (Parashari rules)
5. Their stated **life concern** (`career`, `love`, `health`, `wealth`, `protection`, `spiritual`)
6. Classical **Ratna Shastra** gemstone–planet correspondences

### Pipeline

```
vedicEngine.js  →  enriched profile  →  aiService.js  →  OpenRouter streaming
```

1. `vedicEngine.js` runs deterministic calculations (no AI involved)
2. `aiService.js` builds a system prompt + user prompt with the profile
3. The AI streams back a JSON response with 2–3 gemstone recommendations
4. The server post-processes the response (slug validation, JSON extraction)
5. The frontend renders result cards that link to real `/gemstones/[slug]` pages

### Slug Integrity (Anti-Hallucination)

The AI is constrained to only recommend gemstones that actually exist on the platform:

- **System prompt injection:** All 24 valid slugs are listed in the system prompt. The AI is instructed to set the `slug` field to one of these exact values.
- **Server-side filtering:** After parsing the AI response, `aiService.js` removes any gemstone whose `slug` is not in the `VALID_GEMSTONE_SLUGS` set and logs a warning.

### Output Format

The AI returns structured JSON:

```json
{
  "gemstones": [
    {
      "slug": "emerald",
      "name": "Emerald",
      "sanskrit": "Panna",
      "planet": "Mercury",
      "color": "#059669",
      "tagline": "...",
      "why_recommended": "2–3 sentences specific to THIS person's chart",
      "properties": ["Intelligence", "Business", "Communication"],
      "how_to_wear": "metal, finger, day, time, minimum weight, mantra",
      "best_day": "Wednesday",
      "caution": "honest contraindications for this person"
    }
  ],
  "personal_message": "3–4 warm sentences addressing them by name"
}
```

---

## What the AI Does NOT Do

- The AI does **not** perform astrological calculations — those are handled entirely by the deterministic `vedicEngine.js`
- The AI does **not** have access to personal data beyond what is submitted in the current request
- The AI output is **not** stored persistently — it is computed fresh for every request
- The AI does **not** have access to the internet, user history, or any other context

---

## Reasoning / Extended Thinking

The model is called with `reasoning: { enabled: true, exclude: false }`. The reasoning tokens are streamed separately from the content tokens and logged server-side (not sent to the frontend). This allows the model to think through Vedic chart nuances before forming its recommendation.

---

## Limitations & Disclaimers

> Gemly's recommendations are based on traditional Vedic gemstone principles (Ratna Shastra) interpreted by AI. They are intended for **spiritual exploration and personal reflection only**. They do **not** constitute medical, legal, or financial advice. Always consult a qualified human Jyotishi for serious life decisions.

---

## Data Handling

- User birth data is sent to the backend via HTTPS
- Data is used only for the single request and is **not stored or logged persistently**
- OpenRouter may retain API input/output per their [privacy policy](https://openrouter.ai/privacy)
- No personal data is sent to the frontend AI provider directly

---

## API Key Management

| Variable | Location | Notes |
|---|---|---|
| `OPENROUTER_API_KEY` | Backend `.env` only | Never exposed to frontend |
| `OPENROUTER_MODEL` | Backend `.env` | Optional override |
| `CLERK_SECRET_KEY` | Backend + Frontend `.env` | Server-side only |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Frontend `.env.local` | Public, safe to expose |

No AI API keys are exposed to the browser or included in client-side bundles.
