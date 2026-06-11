/**
 * vedicEngine.js — Classical Vedic Astrology planetary calculation (ESM)
 *
 * Uses simplified Parashari rules to derive:
 * - Ascendant (Lagna) estimate from DOB + birth time
 * - Moon sign (Rashi)
 * - Dominant planet (Dasha lord)
 * - Weak planets (needing gemstone support)
 * - Current Vimshottari Dasha period
 */

// ── Planet ↔ Gemstone correspondences (Ratna Shastra) ──────────────
export const PLANET_GEMSTONE = {
  Sun:     { gem: "Ruby",            sanskrit: "Manikya" },
  Moon:    { gem: "Pearl",           sanskrit: "Moti" },
  Mars:    { gem: "Red Coral",       sanskrit: "Moonga" },
  Mercury: { gem: "Emerald",         sanskrit: "Panna" },
  Jupiter: { gem: "Yellow Sapphire", sanskrit: "Pukhraj" },
  Venus:   { gem: "Diamond",         sanskrit: "Heera" },
  Saturn:  { gem: "Blue Sapphire",   sanskrit: "Neelam" },
  Rahu:    { gem: "Hessonite",       sanskrit: "Gomed" },
  Ketu:    { gem: "Cat's Eye",       sanskrit: "Lehsuniya" },
};

// ── Zodiac → ruling planet ──────────────────────────────────────────
const RASHI_RULER = {
  Aries:       "Mars",
  Taurus:      "Venus",
  Gemini:      "Mercury",
  Cancer:      "Moon",
  Leo:         "Sun",
  Virgo:       "Mercury",
  Libra:       "Venus",
  Scorpio:     "Mars",
  Sagittarius: "Jupiter",
  Capricorn:   "Saturn",
  Aquarius:    "Saturn",
  Pisces:      "Jupiter",
};

// ── Vimshottari Dasha sequence (120-year cycle) ─────────────────────
const DASHA_SEQUENCE = [
  { planet: "Sun",     years: 6  },
  { planet: "Moon",    years: 10 },
  { planet: "Mars",    years: 7  },
  { planet: "Rahu",    years: 18 },
  { planet: "Jupiter", years: 16 },
  { planet: "Saturn",  years: 19 },
  { planet: "Mercury", years: 17 },
  { planet: "Ketu",    years: 7  },
  { planet: "Venus",   years: 20 },
];

const TOTAL_DASHA_YEARS = 120;

// ── Debilitation signs (weakens planet) ─────────────────────────────
const DEBILITATION_SIGN = {
  Sun:     "Libra",
  Moon:    "Scorpio",
  Mars:    "Cancer",
  Mercury: "Pisces",
  Jupiter: "Capricorn",
  Venus:   "Virgo",
  Saturn:  "Aries",
};

// ── Classical benefics per ascendant (simplified Parashari) ─────────
const BENEFICS_BY_LAGNA = {
  Aries:       ["Jupiter", "Sun", "Moon"],
  Taurus:      ["Saturn", "Mercury", "Venus"],
  Gemini:      ["Venus", "Saturn"],
  Cancer:      ["Moon", "Mars", "Jupiter"],
  Leo:         ["Mars", "Jupiter", "Sun"],
  Virgo:       ["Mercury", "Venus"],
  Libra:       ["Saturn", "Mercury", "Venus"],
  Scorpio:     ["Moon", "Jupiter"],
  Sagittarius: ["Mars", "Sun", "Jupiter"],
  Capricorn:   ["Venus", "Mercury", "Saturn"],
  Aquarius:    ["Venus", "Saturn"],
  Pisces:      ["Moon", "Mars", "Jupiter"],
};

// ── Concern → relevant planets mapping ──────────────────────────────
const CONCERN_PLANETS = {
  career:     ["Sun", "Mars", "Saturn"],
  love:       ["Venus", "Moon"],
  health:     ["Sun", "Mars"],
  wealth:     ["Jupiter", "Mercury", "Venus"],
  protection: ["Mars", "Ketu", "Saturn"],
  spiritual:  ["Jupiter", "Ketu", "Saturn"],
};

/**
 * Extract rashi name from zodiac string.
 * e.g. "Aries (Mesh)" → "Aries"
 */
function parseRashi(zodiacStr) {
  return zodiacStr.split(" ")[0].trim();
}

/**
 * Estimate ascendant from birth time.
 * Each sign rises ~every 2 hours.
 */
function estimateAscendant(birthTime, rashiList) {
  if (!birthTime) return rashiList[0];
  const [h, m] = birthTime.split(":").map(Number);
  const totalMin = h * 60 + (m || 0);
  const idx = Math.round(totalMin / 120) % 12;
  return rashiList[idx];
}

/**
 * Calculate current Vimshottari Dasha from DOB.
 */
function getCurrentDasha(dob) {
  const birthDate = new Date(dob);
  const now = new Date();
  const ageYears = (now - birthDate) / (1000 * 60 * 60 * 24 * 365.25);
  let elapsed = ageYears % TOTAL_DASHA_YEARS;

  for (const dash of DASHA_SEQUENCE) {
    if (elapsed < dash.years) {
      return {
        lord: dash.planet,
        yearsRemaining: Math.round((dash.years - elapsed) * 10) / 10,
      };
    }
    elapsed -= dash.years;
  }
  return { lord: "Venus", yearsRemaining: 5 };
}

/**
 * Determine planets weakened by debilitation in rashi or ascendant.
 */
function getWeakPlanets(rashi, ascendant) {
  const weak = [];
  for (const [planet, debSign] of Object.entries(DEBILITATION_SIGN)) {
    if (debSign === rashi || debSign === ascendant) weak.push(planet);
  }
  return weak.length > 0 ? weak : ["Saturn"];
}

/**
 * Main export — calculates enriched planetary profile.
 */
export function calculatePlanetaryProfile({ name, dob, birthTime, birthPlace, zodiac, concern }) {
  const rashiList = Object.keys(RASHI_RULER);
  const rashi = parseRashi(zodiac);
  const rashiRuler = RASHI_RULER[rashi] ?? "Jupiter";
  const ascendant = estimateAscendant(birthTime, rashiList);
  const ascendantRuler = RASHI_RULER[ascendant] ?? rashiRuler;
  const dasha = getCurrentDasha(dob);
  const weakPlanets = getWeakPlanets(rashi, ascendant);
  const benefics = BENEFICS_BY_LAGNA[rashi] ?? ["Jupiter", "Venus"];
  const relevantPlanets = CONCERN_PLANETS[concern] ?? ["Jupiter"];

  return {
    name,
    rashi,
    ascendant,
    rashiRuler,
    ascendantRuler,
    dominantPlanet: dasha.lord,
    dashaLord: dasha.lord,
    dashaYearsRemaining: dasha.yearsRemaining,
    weakPlanets,
    benefics,
    concern,
    birthPlace,
    dob,
    birthTime: birthTime || "unknown",
    relevantPlanets,
    planetGemstoneMap: PLANET_GEMSTONE,
  };
}
