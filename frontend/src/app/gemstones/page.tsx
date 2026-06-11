import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
      <main className="pt-20">
        {/* Hero */}
        <section className="px-6 py-20 text-center relative overflow-hidden">
          <div className="hero-gradient" />
          <div className="dot-grid absolute inset-0 opacity-30" />
          <div className="relative max-w-3xl mx-auto z-10">
            <Badge
              variant="outline"
              className="mb-6 px-3.5 py-1.5 rounded-full border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] font-normal tracking-wider uppercase"
            >
              Ratna Shastra Encyclopedia
            </Badge>
            <h1 className="display-xl text-[#f8f8ff] mb-6 font-light">
              The Nine Sacred
              <span className="gradient-text font-medium"> Navaratna</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              The classical Vedic gemstones corresponding to the nine planets.
              Each one a channel for specific cosmic energies.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 py-10 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GEMSTONES.map((gem) => (
                <Link
                  key={gem.slug}
                  href={`/gemstones/${gem.slug}`}
                  className="no-underline group h-full block"
                >
                  <Card
                    className="relative overflow-hidden h-full border-purple-500/10 hover:border-purple-500/30 bg-purple-950/5 hover:bg-purple-950/10 transition-all duration-300 flex flex-col justify-between"
                    style={{
                      boxShadow: `0 0 30px ${gem.color}08`,
                    }}
                  >
                    <CardContent className="p-8 flex flex-col h-full justify-between">
                      <div>
                        {/* Planet badge */}
                        <div className="flex justify-between items-start mb-6">
                          <span
                            className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded bg-[#a855f7]/10 text-purple-300 border border-[#a855f7]/20"
                          >
                            {gem.planet}
                          </span>
                        </div>

                        {/* Gem icon + name */}
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-inner"
                            style={{
                              background: `radial-gradient(circle at 35% 35%, ${gem.color}cc, ${gem.color}44)`,
                              boxShadow: `0 0 15px ${gem.color}35`,
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.85" />
                              <path d="M3 9h18" stroke="white" strokeWidth="0.5" opacity="0.4" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-lg font-light text-[#f8f8ff] m-0 tracking-tight leading-none group-hover:text-purple-300 transition-colors">
                              {gem.name}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">{gem.sanskrit}</p>
                          </div>
                        </div>

                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light italic mb-6">
                          "{gem.tagline}"
                        </p>
                      </div>

                      <div>
                        {/* Properties */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {gem.properties.map((p) => (
                            <span
                              key={p}
                              className="text-[10px] px-2 py-0.5 rounded-full text-slate-300 border border-slate-700/50"
                              style={{
                                background: `${gem.color}08`,
                                borderColor: `${gem.color}20`,
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* View detail arrow */}
                        <div
                          className="flex items-center gap-1 text-xs font-normal transition-colors group-hover:opacity-100 opacity-80"
                          style={{ color: gem.color }}
                        >
                          View full details
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 text-center">
          <div className="max-w-xl mx-auto">
            <Card className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md">
              <CardContent className="p-10">
                <h2 className="display-lg text-[#f8f8ff] mb-3 font-light">
                  Which one is yours?
                </h2>
                <p className="text-sm md:text-base text-slate-400 font-light mb-8">
                  Don't guess — let your birth chart and AI determine your perfect gemstone.
                </p>
                <Button
                  render={<Link href="/#recommend" />}
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] text-white border-0 px-8 py-6 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] transition-all duration-300"
                >
                  Get My Personalized Reading
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
