import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gemstone Encyclopedia",
  description:
    "Explore our complete encyclopedia of Vedic gemstones — their ruling planets, properties, and astrological significance.",
};

const GEMSTONES = [
  {
    slug: "ruby",
    name: "Ruby",
    sanskrit: "Manikya",
    planet: "Sun",
    color: "#e11d48",
    tagline: "The stone of kings, solar vitality, and divine authority.",
    properties: ["Leadership", "Confidence", "Vitality", "Success"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats",
    metal: "Gold",
    finger: "Ring finger",
    day: "Sunday",
  },
  {
    slug: "pearl",
    name: "Pearl",
    sanskrit: "Moti",
    planet: "Moon",
    color: "#94a3b8",
    tagline: "Emotional balance, intuition, and lunar grace.",
    properties: ["Calm", "Intuition", "Relationships", "Memory"],
    rashi: ["Cancer", "Scorpio", "Pisces"],
    weight: "4–6 carats",
    metal: "Silver",
    finger: "Little finger",
    day: "Monday",
  },
  {
    slug: "red-coral",
    name: "Red Coral",
    sanskrit: "Moonga",
    planet: "Mars",
    color: "#ea580c",
    tagline: "Courage, ambition, and the fire of Mars.",
    properties: ["Courage", "Energy", "Protection", "Determination"],
    rashi: ["Aries", "Scorpio"],
    weight: "6–12 carats",
    metal: "Gold or Copper",
    finger: "Ring finger",
    day: "Tuesday",
  },
  {
    slug: "emerald",
    name: "Emerald",
    sanskrit: "Panna",
    planet: "Mercury",
    color: "#059669",
    tagline: "Intelligence, communication, and Mercury's brilliance.",
    properties: ["Intelligence", "Creativity", "Business", "Communication"],
    rashi: ["Gemini", "Virgo"],
    weight: "3–5 carats",
    metal: "Gold",
    finger: "Little finger",
    day: "Wednesday",
  },
  {
    slug: "yellow-sapphire",
    name: "Yellow Sapphire",
    sanskrit: "Pukhraj",
    planet: "Jupiter",
    color: "#d97706",
    tagline: "Wisdom, prosperity, and Jupiter's boundless grace.",
    properties: ["Wisdom", "Prosperity", "Luck", "Spirituality"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats",
    metal: "Gold",
    finger: "Index finger",
    day: "Thursday",
  },
  {
    slug: "diamond",
    name: "Diamond",
    sanskrit: "Heera",
    planet: "Venus",
    color: "#e2e8f0",
    tagline: "Love, luxury, artistic beauty, and Venusian allure.",
    properties: ["Love", "Luxury", "Creativity", "Harmony"],
    rashi: ["Taurus", "Libra"],
    weight: "0.5–1 carat",
    metal: "White Gold or Platinum",
    finger: "Middle finger",
    day: "Friday",
  },
  {
    slug: "blue-sapphire",
    name: "Blue Sapphire",
    sanskrit: "Neelam",
    planet: "Saturn",
    color: "#2563eb",
    tagline: "Discipline, karmic acceleration, and Saturn's iron will.",
    properties: ["Discipline", "Focus", "Career", "Justice"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats",
    metal: "Silver or Gold",
    finger: "Middle finger",
    day: "Saturday",
  },
  {
    slug: "hessonite",
    name: "Hessonite",
    sanskrit: "Gomed",
    planet: "Rahu",
    color: "#92400e",
    tagline: "Protection from illusion, clarity, and Rahu's liberation.",
    properties: ["Clarity", "Protection", "Focus", "Ambition"],
    rashi: ["Gemini", "Virgo"],
    weight: "6–8 carats",
    metal: "Silver",
    finger: "Middle finger",
    day: "Saturday",
  },
  {
    slug: "cats-eye",
    name: "Cat's Eye",
    sanskrit: "Lehsuniya",
    planet: "Ketu",
    color: "#ca8a04",
    tagline: "Spiritual liberation, intuition, and Ketu's mystical power.",
    properties: ["Intuition", "Spirituality", "Liberation", "Protection"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats",
    metal: "Gold or Silver",
    finger: "Little finger",
    day: "Thursday",
  },
];

export default function GemstonesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: "80px 24px 48px", textAlign: "center", position: "relative" }}>
          <div className="hero-gradient" />
          <div className="dot-grid absolute inset-0" style={{ opacity: 0.3 }} />
          <div className="relative max-w-3xl mx-auto" style={{ zIndex: 1 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 400,
                color: "#a855f7",
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.25)",
                borderRadius: 9999,
                padding: "5px 14px",
                marginBottom: 24,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Ratna Shastra Encyclopedia
            </span>
            <h1 className="display-xl" style={{ color: "#f8f8ff", marginBottom: 16 }}>
              The Nine Sacred
              <span className="gradient-text"> Navaratna</span>
            </h1>
            <p style={{ fontSize: 16, color: "#94a3b8" }}>
              The classical Vedic gemstones corresponding to the nine planets.
              Each one a channel for specific cosmic energies.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: "40px 24px 96px" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GEMSTONES.map((gem) => (
                <Link
                  key={gem.slug}
                  href={`/gemstones/${gem.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="gemstone-card relative overflow-hidden h-full"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${gem.color}35`,
                      borderRadius: 16,
                      padding: "28px",
                      cursor: "pointer",
                      boxShadow: `0 0 40px ${gem.color}12`,
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="shimmer-overlay" />

                    {/* Planet badge */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                      <span className="planet-badge">{gem.planet}</span>
                    </div>

                    {/* Gem icon + name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          background: `radial-gradient(circle at 35% 35%, ${gem.color}cc, ${gem.color}55)`,
                          boxShadow: `0 0 20px ${gem.color}50, inset 0 1px 0 rgba(255,255,255,0.25)`,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.85" />
                          <path d="M3 9h18" stroke="white" strokeWidth="0.5" opacity="0.4" />
                        </svg>
                      </div>
                      <div>
                        <h2 style={{ fontSize: 20, fontWeight: 300, color: "#f8f8ff", margin: 0, letterSpacing: "-0.2px" }}>
                          {gem.name}
                        </h2>
                        <p style={{ fontSize: 13, color: "#94a3b8", margin: "3px 0 0" }}>{gem.sanskrit}</p>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, fontStyle: "italic", marginBottom: 16 }}>
                      "{gem.tagline}"
                    </p>

                    {/* Properties */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                      {gem.properties.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: 11,
                            padding: "3px 10px",
                            background: `${gem.color}15`,
                            border: `1px solid ${gem.color}30`,
                            borderRadius: 9999,
                            color: "#cbd5e1",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* View detail arrow */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 16, fontSize: 13, color: gem.color }}>
                      View full details
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 24px 96px", textAlign: "center" }}>
          <div className="max-w-xl mx-auto">
            <div className="glass-card" style={{ padding: "40px" }}>
              <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 12 }}>
                Which one is yours?
              </h2>
              <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 28 }}>
                Don't guess — let your birth chart and AI determine your perfect gemstone.
              </p>
              <Link href="/#recommend" className="btn-primary" style={{ fontSize: 15, padding: "13px 32px" }}>
                Get My Personalized Reading
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
