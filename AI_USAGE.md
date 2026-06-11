# AI Usage Declaration — Gemly

**Project:** Gemly — AI-powered Vedic Gemstone Recommendation Platform  
**Domain:** gemly.app  
**Date:** June 2026

---

## AI Models Used

### Primary: Anthropic Claude

- **Model:** `claude-sonnet-4-20250514`
- **Provider:** Anthropic
- **Purpose:** Gemstone recommendation reasoning
- **Integration file:** `backend/services/aiService.js`

### Fallback: OpenAI GPT-4o

- **Model:** `gpt-4o`
- **Provider:** OpenAI
- **Purpose:** Fallback when Claude is unavailable
- **Integration file:** `backend/services/aiService.js`

---

## How AI is Used

### Role: Vedic Gemologist

The AI receives an enriched planetary profile computed by `vedicEngine.js` (a classical Vedic astrology calculation engine) and acts as a **master Vedic gemologist**. It reasons across:

1. The person's Rashi (Moon sign) and Lagna (Ascendant)
2. Their current Vimshottari Dasha period (planetary cycle)
3. Their weak and dominant planets
4. Their stated life concern (career, love, health, wealth, protection, spiritual)
5. Classical Ratna Shastra (gemstone scripture) correspondences

### Output

The AI returns structured JSON with 2–3 gemstone recommendations, each including:
- Why the gemstone was chosen for **this specific person's chart**
- Traditional wearing instructions (metal, finger, day, mantra)
- Properties and contraindications (cautions)
- A personalized message addressing the person by name

---

## What the AI Does NOT Do

- The AI does **not** perform astrological calculations — that is handled by the deterministic `vedicEngine.js`
- The AI does **not** have access to personal data beyond what is submitted in the session
- The AI output is **not** stored persistently

---

## Limitations & Disclaimers

> Gemly's recommendations are based on traditional Vedic gemstone principles (Ratna Shastra) interpreted by AI. They are intended for spiritual exploration and personal reflection only. They do not constitute medical, legal, or financial advice. Always consult a qualified human Jyotishi for serious life decisions.

---

## Data Handling

- User birth data is sent to the backend via HTTPS
- Data is used only for the single request and is not stored
- AI providers (Anthropic / OpenAI) may retain API input/output per their respective privacy policies

---

## API Key Management

- `ANTHROPIC_API_KEY` is stored as a server-side environment variable
- `OPENAI_API_KEY` is optional, also server-side only
- No API keys are exposed to the frontend
