# Project Notes — Gemly

> Internal notes for development, deployment, tooling, and ongoing decisions.  
> Keep this updated as the project evolves.

**Last updated:** June 2026  
**Author:** Naman

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Deployment](#3-deployment)
4. [Environment Variables Master List](#4-environment-variables-master-list)
5. [MCP Servers (AI Tools)](#5-mcp-servers-ai-tools)
6. [Key Dependencies](#6-key-dependencies)
7. [AI & Model Notes](#7-ai--model-notes)
8. [Gemstone Data & Slugs](#8-gemstone-data--slugs)
9. [Auth — Clerk](#9-auth--clerk)
10. [CDN — Image Hosting](#10-cdn--image-hosting)
11. [Known Issues & Gotchas](#11-known-issues--gotchas)
12. [Development Workflow](#12-development-workflow)
13. [Design Decisions](#13-design-decisions)
14. [Future TODOs](#14-future-todos)

---

## 1. Project Overview

**Gemly** is an AI-powered Vedic gemstone recommendation platform.

- Users enter their birth details (name, DOB, birth time, birth place, zodiac, life concern)
- A deterministic Vedic astrology engine (`vedicEngine.js`) computes their planetary profile
- An AI (via OpenRouter) acts as a Vedic gemologist and recommends 2–3 gemstones specific to their chart
- Results are shown as interactive cards linking to full gemstone detail pages

**Domain:** [gemly.app](https://gemly.app)  
**Tagline:** *"Your gemstone, written in the stars."*

---

## 2. Repository Structure

```
gemly/                          ← Monorepo root
├── frontend/                   ← Next.js 16 app (deployed to Vercel)
├── backend/                    ← Express API (deployed to Render)
├── docs/
│   └── landing.png             ← Landing page screenshot for README
├── README.md                   ← Public-facing project documentation
├── AI_USAGE.md                 ← AI model disclosure & data handling
├── PROJECT_NOTES.md            ← This file — internal dev notes
├── .mcp.json                   ← MCP server config for AI tooling
├── .gitignore
└── skills-lock.json            ← Antigravity agent skills
```

---

## 3. Deployment

### Frontend — Vercel

| Field | Value |
|---|---|
| **Platform** | [Vercel](https://vercel.com) |
| **Framework preset** | Next.js |
| **Root directory** | `frontend/` |
| **Build command** | `next build` (auto-detected) |
| **Output** | `.next/` |
| **Production URL** | `https://gemly.app` (or Vercel preview URL) |
| **Branch** | `main` (auto-deploys on push) |

**Vercel env vars to configure** (in Vercel dashboard → Project → Settings → Environment Variables):

```
NEXT_PUBLIC_API_URL=https://gemly-backend.onrender.com
NEXT_PUBLIC_CDN_URL=https://humarapandit.com/cdn/shop/files
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

---

### Backend — Render

| Field | Value |
|---|---|
| **Platform** | [Render](https://render.com) |
| **Service type** | Web Service |
| **Root directory** | `backend/` |
| **Build command** | `npm install` |
| **Start command** | `npm start` (`node src/index.js`) |
| **Port** | `4000` (set `PORT` env var on Render) |
| **Production URL** | `https://gemly-backend.onrender.com` (example) |
| **Plan** | Free tier (spins down after inactivity — note cold start ~30s) |
| **Node version** | ≥ 18 (ESM modules required) |

**Render env vars to configure** (in Render dashboard → Service → Environment):

```
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemma-4-31b-it:free
CLERK_SECRET_KEY=sk_live_...
FRONTEND_URL=https://gemly.app
PORT=4000
```

> ⚠️ **Cold start note:** Render free tier services spin down after 15 minutes of inactivity. The first request after inactivity will take ~20–30 seconds. Consider upgrading to a paid plan or using a cron ping to keep it warm.

---

## 4. Environment Variables Master List

### Backend (`backend/.env`)

| Variable | Required | Description | Where to get |
|---|---|---|---|
| `OPENROUTER_API_KEY` | ✅ | OpenRouter API key | [openrouter.ai/keys](https://openrouter.ai/keys) |
| `OPENROUTER_MODEL` | Optional | Model override | Default: `google/gemma-4-31b-it:free` |
| `CLERK_SECRET_KEY` | ✅ | Clerk server secret | Clerk Dashboard → API Keys |
| `FRONTEND_URL` | Optional | CORS origin(s), comma-separated | e.g. `https://gemly.app` |
| `PORT` | Optional | HTTP port | Default: `4000` |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description | Where to get |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend base URL | Render service URL |
| `NEXT_PUBLIC_CDN_URL` | ✅ | CDN base for gemstone images | Current: `https://humarapandit.com/cdn/shop/files` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret (server-side Next.js routes) | Clerk Dashboard → API Keys |

---

## 5. MCP Servers (AI Tools)

MCPs (Model Context Protocol servers) are configured in [`.mcp.json`](file:///d:/gemly/.mcp.json) and used by the Antigravity AI coding agent during development.

### Configured MCPs

#### 1. `@21st-dev/magic`
| Field | Value |
|---|---|
| **Package** | `@21st-dev/magic@latest` |
| **Run via** | `npx -y @21st-dev/magic@latest` |
| **Purpose** | UI component generation — generates polished React/Next.js UI components and design patterns from natural language descriptions |
| **Auth** | `API_KEY` in `.mcp.json` env block |
| **Use cases** | Generating new page layouts, component variants, design system elements |

#### 2. `clerk`
| Field | Value |
|---|---|
| **Package** | `mcp-remote` → `https://mcp.clerk.com/mcp` |
| **Run via** | `npx -y mcp-remote https://mcp.clerk.com/mcp` |
| **Purpose** | Clerk authentication management — allows the AI agent to query and manage Clerk users, organizations, sessions, and API keys directly from the IDE |
| **Auth** | Uses active Clerk session / Clerk Dashboard credentials |
| **Use cases** | Checking auth configuration, managing test users, viewing session data |

> 💡 MCPs extend the AI coding agent's capabilities beyond just reading/writing files. They give the agent direct access to external services during development sessions.

---

## 6. Key Dependencies

### Frontend (`frontend/package.json`)

| Package | Version | Purpose |
|---|---|---|
| `next` | `16.2.9` | App framework (App Router) |
| `react` / `react-dom` | `19.2.4` | UI library |
| `@clerk/nextjs` | `^7.5.2` | Authentication (sign in, user sessions) |
| `framer-motion` | `^12.40.0` | Page and component animations |
| `motion` | `^12.40.0` | Motion primitives (paired with framer-motion) |
| `lucide-react` | `^1.17.0` | Icon library |
| `tailwindcss` | `^4` | CSS utility framework (v4 CSS-first config) |
| `tailwind-merge` | `^3.6.0` | Merge Tailwind classes without conflicts |
| `clsx` | `^2.1.1` | Conditional className utility |
| `class-variance-authority` | `^0.7.1` | Component variant styling (shadcn pattern) |
| `shadcn` | `^4.11.0` | Component library CLI / primitives |
| `@base-ui/react` | `^1.5.0` | Unstyled accessible UI primitives |
| `tw-animate-css` | `^1.4.0` | CSS animations for Tailwind |

### Backend (`backend/package.json`)

| Package | Version | Purpose |
|---|---|---|
| `express` | `^4.21.2` | HTTP server framework |
| `@clerk/express` | `^2.1.26` | Clerk middleware for Express |
| `openai` | `^4.80.1` | OpenAI-compatible SDK (used for OpenRouter) |
| `zod` | `^3.23.8` | Request body validation |
| `cors` | `^2.8.5` | CORS middleware |
| `dotenv` | `^16.4.5` | Environment variable loading |

---

## 7. AI & Model Notes

### Current Model

- **Provider:** OpenRouter (`https://openrouter.ai/api/v1`)
- **Default model:** `google/gemma-4-31b-it:free`
- **Streaming:** Yes — response is fully streamed, reasoning tokens logged server-side only
- **Temperature:** `1`, `top_p: 0.95`
- **Reasoning:** Extended thinking enabled via `reasoning: { enabled: true, exclude: false }`

### Slug Whitelist (Anti-Hallucination)

The AI is explicitly instructed via system prompt to only use slugs from the `VALID_GEMSTONE_SLUGS` array in `backend/src/services/aiService.js`. A server-side post-process filter also removes any gem whose slug isn't in the valid set.

**To add a new gemstone:** Update both:
1. `frontend/src/app/gemstones/page.tsx` — add to the `GEMSTONES` array
2. `frontend/src/app/gemstones/[slug]/page.tsx` — add to the `GEMSTONES` record
3. `backend/src/services/aiService.js` — add to `VALID_GEMSTONE_SLUGS`

### Changing the Model

Set `OPENROUTER_MODEL` in backend `.env`. Any OpenRouter-supported model works. Examples:
```
OPENROUTER_MODEL=google/gemma-4-31b-it:free       # Default (free)
OPENROUTER_MODEL=anthropic/claude-sonnet-4-5       # Claude
OPENROUTER_MODEL=openai/gpt-4o                     # GPT-4o
OPENROUTER_MODEL=deepseek/deepseek-r1              # DeepSeek R1
```

---

## 8. Gemstone Data & Slugs

All 24 valid gemstone slugs (must be in sync across frontend and backend):

```
cats-eye, pearl, white-pukhraj, ceylon-pukhraj, peetambari-neelam,
ceylon-neelam, neelam, emerald, burmese-ruby, ruby, australian-fire-opal,
fire-opal, blue-topaz, white-topaz, natural-zircon, zirconia,
garnet, lapis-lazuli, turquoise, moonstone, amethyst, citrine,
tiger-eye, african-ruby
```

**Images** are served from CDN: `NEXT_PUBLIC_CDN_URL/{filename}`

Image naming convention: `1img0_{Name}_composed_1080x.png` (primary) and `img0_{Name}_composed.png` (secondary)

---

## 9. Auth — Clerk

- **Frontend:** `@clerk/nextjs` v7 — wraps the app in `<ClerkProvider>`. Sign in modal, user button in navbar.
- **Backend:** `@clerk/express` v2 — `clerkMiddleware()` applied globally. Routes are currently public (no `requireAuth()` enforced on `/api/recommend`).
- **Clerk Dashboard:** [dashboard.clerk.com](https://dashboard.clerk.com)
- **Application name:** Gemly

> 📝 The recommendation endpoint (`POST /api/recommend`) is currently **not** protected by Clerk auth. If you want to gate it to signed-in users only, add `requireAuth()` middleware to `backend/src/routes/recommend.js`.

---

## 10. CDN — Image Hosting

- Gemstone images are hosted externally on `humarapandit.com/cdn/shop/files/`
- The base URL is controlled by `NEXT_PUBLIC_CDN_URL` env var
- The `getCdnUrl(path)` helper in `frontend/src/lib/utils.ts` handles prepending the base URL
- Images that start with `http://`, `https://`, or `/` are returned as-is (absolute URLs pass through)

---

## 11. Known Issues & Gotchas

### Render Cold Start
Free tier Render services sleep after ~15 min of inactivity. First request after sleep takes 20–30s. The frontend shows a loading state during the AI call, so this is partially masked.

### Gemma Reasoning Tokens
The Gemma model on OpenRouter returns reasoning in `delta.reasoning_content` (or `delta.reasoning`). The backend handles multiple fallback paths. If a new model is used and reasoning is missing, it will just be an empty string — not an error.

### Tailwind v4 Config
The project uses Tailwind v4's CSS-first configuration (`@import "tailwindcss"` in `globals.css`, not a `tailwind.config.js`). Custom tokens are defined as CSS variables directly in `globals.css`. Don't add a `tailwind.config.js` — it won't be picked up.

### ESM-only Backend
The backend uses `"type": "module"` in `package.json`. All imports must use ESM `import/export` syntax. No `require()`. File extensions must be explicit (`.js`).

### `next` version
Currently on `next@16.2.9` (React 19 compatible). Double-check if upgrading — breaking changes in App Router can occur between minor versions.

---

## 12. Development Workflow

### Local Dev (3 terminals)

```bash
# Terminal 1 — Backend
cd gemly/backend
npm run dev          # http://localhost:4000

# Terminal 2 — Frontend
cd gemly/frontend
npm run dev          # http://localhost:3000

# Terminal 3 — AI Agent (optional)
cd gemly
agy                  # Antigravity agent
```

### Frontend → Backend connection locally

`frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Health check
```
GET http://localhost:4000/health
```
Should return `{ status: "ok", ai: { key: "configured ✓" } }`.

---

## 13. Design Decisions

| Decision | Rationale |
|---|---|
| OpenRouter over direct Anthropic/OpenAI | Single key, model-agnostic, free tier for Gemma |
| Gemma 4 31B as default | Free, reasoning-capable, good at structured JSON |
| Slug whitelist in system prompt | Prevents AI hallucinating non-existent gem URLs |
| Aceternity Lens effect on gem cards | Premium feel, matches the mystical brand aesthetic |
| No Tailwind config file (v4 CSS-first) | Simpler, co-located with globals.css, no JS overhead |
| Render for backend (free tier) | No cost for MVP; cold starts acceptable at this stage |
| Vercel for frontend | Zero-config Next.js deploy, auto preview URLs per branch |
| Clerk for auth | Fast integration with Next.js, handles sessions, UI components |
| CDN images (external) | Avoids repo bloat; images already hosted on vendor CDN |
| 2-column grid for AI result cards | More readable than 3-col on mobile; cards have a lot of content |

---

## 14. Future TODOs

- [ ] **Protect `/api/recommend`** with Clerk auth (require sign-in to get a reading)
- [ ] **Keep-alive ping** for Render backend (cron job every 10 min to prevent cold starts)
- [ ] **Persist readings** — save user's past recommendations to a DB (Supabase / PlanetScale)
- [ ] **Price / buy flow** — integrate payment (Razorpay or Stripe) for gemstone ordering
- [ ] **More gemstones** — expand catalog beyond 24; sync slug whitelist each time
- [ ] **Proper ascendant calculation** — replace the birth time estimate with a full ephemeris library (e.g. `astronomia`)
- [ ] **Mobile nav** — hamburger menu for smaller screens
- [ ] **OG image** — add dynamic Open Graph images per gemstone page for social sharing
- [ ] **Analytics** — Vercel Analytics or Plausible for page views and conversion tracking
- [ ] **Webhook for Clerk events** — sync user data on sign-up for personalization
- [ ] **Rate limiting** — add `express-rate-limit` to `/api/recommend` to prevent abuse
