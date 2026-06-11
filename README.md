# Gemly ✨ — Your Gemstone, Written in the Stars

**AI-powered Vedic gemstone recommendation platform.**  
Enter your birth details → Vedic engine calculates your planetary profile → Claude AI recommends your sacred gemstones and explains exactly why.

🌐 **Domain:** [gemly.app](https://gemly.app)  
📖 **Tagline:** *"Your gemstone, written in the stars."*

---

## Overview

Gemly solves the core problem with existing Vedic gemstone tools:

| Problem (competitors) | Solution (Gemly) |
|---|---|
| Static rule-based logic | AI reasoning with Claude |
| No explanation of WHY | Personalized "why this gem for you" |
| Same result for same DOB | Concern-based + Dasha-aware personalization |
| Cluttered outdated UI | Stripe-inspired dark glassmorphic design |
| Not mobile optimized | Fully responsive Next.js app |

---

## Architecture

```
gemly/
├── frontend/          Next.js 15 (App Router) + Tailwind v4 + Framer Motion
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Homepage — hero + form
│   │   │   ├── gemstones/
│   │   │   │   ├── page.tsx             # Gemstone encyclopedia
│   │   │   │   └── [slug]/page.tsx      # Individual gemstone detail
│   │   │   ├── how-it-works/page.tsx    # Process explanation
│   │   │   └── about/page.tsx           # Brand story
│   │   ├── components/
│   │   │   ├── Navbar.tsx               # Sticky glassmorphic nav
│   │   │   ├── Footer.tsx               # Site footer
│   │   │   ├── RecommendationForm.tsx   # Main form + result cards
│   │   │   └── FeaturesSection.tsx      # Competitor comparison
│   │   └── app/globals.css              # Full design system (Tailwind v4)
│   └── .env.local                       # NEXT_PUBLIC_API_URL
│
└── backend/           Node.js + Express REST API
    ├── index.js                         # Server entry point
    ├── routes/
    │   ├── recommend.js                 # POST /api/recommend
    │   └── gemstones.js                 # GET /api/gemstones[/:slug]
    ├── controllers/
    │   ├── recommendController.js       # Validation + orchestration
    │   └── gemstoneController.js        # Encyclopedia data
    ├── services/
    │   ├── vedicEngine.js               # Vedic planetary calculation
    │   └── aiService.js                 # Claude + OpenAI fallback
    └── .env.example                     # Environment variables template
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion |
| Language | TypeScript |
| Backend | Node.js + Express |
| Primary AI | Anthropic Claude (claude-sonnet-4-20250514) |
| Fallback AI | OpenAI GPT-4o |
| Validation | Zod |
| Font | Inter (300, 400 weights via Google Fonts) |

---

## Running Locally

### Prerequisites

- Node.js ≥ 18
- An Anthropic API key (required) and/or OpenAI API key (fallback)

### 1. Backend

```bash
cd gemly/backend

# Copy and fill in your API keys
cp .env.example .env
# Edit .env — add ANTHROPIC_API_KEY

# Install dependencies
npm install

# Start development server (port 4000)
npm run dev
```

Backend will be available at `http://localhost:4000`  
Health check: `GET http://localhost:4000/health`

### 2. Frontend

```bash
cd gemly/frontend

# Install dependencies
npm install

# Start development server (port 3000)
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | Claude API key from console.anthropic.com |
| `OPENAI_API_KEY` | Optional | GPT-4o fallback key |
| `PORT` | Optional | Server port (default: 4000) |
| `FRONTEND_URL` | Optional | CORS allowed origin (default: localhost:3000) |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Backend API URL (default: http://localhost:4000) |

---

## API Documentation

### `POST /api/recommend`

Returns AI-powered gemstone recommendations based on birth data.

**Request body:**
```json
{
  "name": "Arjun Sharma",
  "dob": "1990-05-15",
  "birthTime": "14:30",
  "birthPlace": "Mumbai, India",
  "zodiac": "Taurus (Vrishabha)",
  "concern": "career"
}
```

| Field | Type | Required | Values |
|---|---|---|---|
| `name` | string | ✅ | 1-100 chars |
| `dob` | string | ✅ | `YYYY-MM-DD` |
| `birthTime` | string | Optional | `HH:MM` (24h) |
| `birthPlace` | string | ✅ | City, Country |
| `zodiac` | string | ✅ | Any zodiac sign string |
| `concern` | string | ✅ | `career` `love` `health` `wealth` `protection` `spiritual` |

**Response `200 OK`:**
```json
{
  "gemstones": [
    {
      "name": "Emerald",
      "sanskrit": "Panna",
      "planet": "Mercury",
      "color": "#059669",
      "tagline": "...",
      "why_recommended": "...",
      "properties": ["Intelligence", "Business", "Communication"],
      "how_to_wear": "...",
      "best_day": "Wednesday",
      "caution": "..."
    }
  ],
  "personal_message": "Arjun, your Taurus...",
  "_meta": {
    "model": "claude-sonnet-4-20250514",
    "profile": { "rashi": "Taurus", "dashaLord": "Mercury", ... }
  }
}
```

### `GET /api/gemstones`

Returns the full Navaratna gemstone encyclopedia.

### `GET /api/gemstones/:slug`

Returns a single gemstone by slug (e.g. `ruby`, `blue-sapphire`, `yellow-sapphire`).

### `GET /health`

Returns API status and AI configuration.

---

## Design System

Stripe-inspired dark aesthetic:

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Surface cards | `rgba(255,255,255,0.04)` frosted glass |
| Primary accent | `linear-gradient(135deg, #7c3aed, #a855f7)` |
| Text primary | `#f8f8ff` |
| Text muted | `#94a3b8` |
| Border | `rgba(139,92,246,0.2)` |
| Font | Inter 300/400 |
| Hero detail | Radial dot-grid background |

---

## AI Usage

See [AI_USAGE.md](./AI_USAGE.md) for full AI disclosure.

**Summary:**
- Primary: Anthropic Claude `claude-sonnet-4-20250514`
- Fallback: OpenAI `gpt-4o`  
- Purpose: Vedic gemstone reasoning and personalized recommendation generation
- Input: Enriched planetary profile from Vedic engine
- Output: Structured JSON with gemstone recommendations + personal message

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, recommendation form, features |
| `/gemstones` | Gemstone encyclopedia grid |
| `/gemstones/[slug]` | Individual gemstone detail page |
| `/how-it-works` | Process explanation |
| `/about` | Brand story + AI disclosure |
