import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GEMSTONES: Record<string, {
  name: string; sanskrit: string; planet: string; color: string;
  tagline: string; properties: string[]; rashi: string[];
  weight: string; metal: string; finger: string; day: string;
  description: string; caution: string; howToWear: string;
}> = {
  ruby: {
    name: "Ruby", sanskrit: "Manikya", planet: "Sun", color: "#e11d48",
    tagline: "The stone of kings, solar vitality, and divine authority.",
    properties: ["Leadership", "Confidence", "Vitality", "Success", "Courage", "Fame"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats", metal: "Gold", finger: "Ring finger (right hand)", day: "Sunday",
    description: "Ruby, or Manikya in Sanskrit, is the gemstone of the Sun (Surya) — the king of the Navagrahas. A strong Sun in one's chart blesses leadership ability, government favor, paternal relations, and self-confidence. Ruby amplifies the Sun's energy, making it ideal for those seeking career authority, visibility, or healing weak solar energy in their chart.",
    caution: "Do not wear if Saturn, Venus, or Mercury are dominant in your chart without consulting a Jyotishi. Ruby generates intense heat energy and may increase aggression or ego if worn by the wrong ascendant.",
    howToWear: "Wear a natural, unheated ruby of minimum 3 carats set in gold on the ring finger of the right hand on a Sunday morning during Surya hora after purifying with Panchgavya and chanting 'Om Hraam Hreem Hroom Sah Suryaya Namaha' 108 times.",
  },
  pearl: {
    name: "Pearl", sanskrit: "Moti", planet: "Moon", color: "#94a3b8",
    tagline: "Emotional balance, intuition, and lunar grace.",
    properties: ["Calm", "Intuition", "Relationships", "Memory", "Peace", "Creativity"],
    rashi: ["Cancer", "Scorpio", "Pisces"],
    weight: "4–6 carats", metal: "Silver", finger: "Little finger (right hand)", day: "Monday",
    description: "Pearl is the gemstone of the Moon (Chandra), governing mind, emotions, mother, and intuition. A weak or afflicted Moon can cause emotional instability, insomnia, and relationship difficulties. Pearl calms the mind, enhances emotional intelligence, and strengthens relationships — particularly the bond with one's mother.",
    caution: "Avoid wearing Pearl with Ruby (Sun) as Moon and Sun are natural enemies in Jyotish. Persons with Scorpio Moon may experience intensified emotions.",
    howToWear: "Set a natural saltwater pearl of 4+ carats in silver. Wear on the little finger on a Monday during Shukla Paksha (waxing moon phase) during Chandra hora. Chant 'Om Shraam Shreem Shroom Sah Chandraya Namaha' 108 times.",
  },
  "red-coral": {
    name: "Red Coral", sanskrit: "Moonga", planet: "Mars", color: "#ea580c",
    tagline: "Courage, ambition, and the fire of Mars.",
    properties: ["Courage", "Energy", "Protection", "Determination", "Mars energy", "Strength"],
    rashi: ["Aries", "Scorpio"],
    weight: "6–12 carats", metal: "Gold or Copper", finger: "Ring finger", day: "Tuesday",
    description: "Red Coral (Moonga) is the gemstone of Mars (Mangal), the planet of courage, energy, siblings, property, and physical vitality. Worn by warriors and leaders throughout history, Red Coral strengthens Mars's protective energy — particularly useful during Mangal Dasha or for those facing delays in marriage due to Manglik dosha.",
    caution: "Never wear Red Coral with Emerald (Mercury) as Mars and Mercury are enemies. Individuals with weak constitutions or blood pressure issues should consult a physician.",
    howToWear: "Wear Italian or Japanese coral (minimum 6 carats) in gold or copper on the ring finger on a Tuesday morning during Mangal hora. Purify with Ganga jal and chant 'Om Kraam Kreem Kroom Sah Bhaumaya Namaha'.",
  },
  emerald: {
    name: "Emerald", sanskrit: "Panna", planet: "Mercury", color: "#059669",
    tagline: "Intelligence, communication, and Mercury's brilliance.",
    properties: ["Intelligence", "Creativity", "Business", "Communication", "Wit", "Analytics"],
    rashi: ["Gemini", "Virgo"],
    weight: "3–5 carats", metal: "Gold", finger: "Little finger", day: "Wednesday",
    description: "Emerald (Panna) is the gemstone of Mercury (Budha), planet of intellect, communication, commerce, and analytical ability. Ideal for students, writers, traders, and IT professionals, Emerald sharpens the mind and enhances the ability to communicate, negotiate, and learn. A strong Mercury in the chart brings wit, adaptability, and business acumen.",
    caution: "Do not wear with Red Coral or Pearl as Mercury is inimical to Mars and Moon. Persons sensitive to skin may experience reactions to certain metal settings.",
    howToWear: "Wear a Colombian or Zambian emerald of 3+ carats in gold on the little finger on a Wednesday during Budha hora. Chant 'Om Braam Breem Broom Sah Budhaya Namaha' 108 times.",
  },
  "yellow-sapphire": {
    name: "Yellow Sapphire", sanskrit: "Pukhraj", planet: "Jupiter", color: "#d97706",
    tagline: "Wisdom, prosperity, and Jupiter's boundless grace.",
    properties: ["Wisdom", "Prosperity", "Luck", "Spirituality", "Health", "Marriage"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats", metal: "Gold", finger: "Index finger", day: "Thursday",
    description: "Yellow Sapphire (Pukhraj) is perhaps the most universally beneficial gemstone in Jyotish, as Jupiter is the great benefic planet (Guru). It blesses the wearer with wisdom, prosperity, a good spouse, children, and spiritual development. Particularly recommended for women seeking marriage and for anyone going through Jupiter Dasha.",
    caution: "Yellow Sapphire is generally safe for most ascendants, but Capricorn and Aquarius lagna holders should consult a Jyotishi before wearing as Jupiter may rule challenging houses.",
    howToWear: "Wear a Ceylon or Bangkok Yellow Sapphire of 3+ carats in gold on the index finger on a Thursday morning during Guru hora. Chant 'Om Graam Greem Groom Sah Gurave Namaha' 108 times.",
  },
  diamond: {
    name: "Diamond", sanskrit: "Heera", planet: "Venus", color: "#e2e8f0",
    tagline: "Love, luxury, artistic beauty, and Venusian allure.",
    properties: ["Love", "Luxury", "Creativity", "Harmony", "Beauty", "Arts"],
    rashi: ["Taurus", "Libra"],
    weight: "0.5–1 carat", metal: "White Gold or Platinum", finger: "Middle finger", day: "Friday",
    description: "Diamond (Heera) is the gemstone of Venus (Shukra), planet of love, beauty, luxury, arts, and sensory pleasure. A strong Venus brings romantic success, appreciation of beauty, artistic talent, and material comforts. Diamond is particularly powerful for artists, designers, entertainment professionals, and those seeking to enhance relationships.",
    caution: "Diamond should not be worn with Ruby or Pearl as Venus is inimical to Sun and Moon. The stone carries intense energy — wearing a flawed or heat-treated diamond can create negative effects.",
    howToWear: "Wear a natural, untreated diamond (minimum 0.3 carat) in white gold or platinum on the middle finger on a Friday during Shukra hora. Chant 'Om Draam Dreem Droom Sah Shukraya Namaha'.",
  },
  "blue-sapphire": {
    name: "Blue Sapphire", sanskrit: "Neelam", planet: "Saturn", color: "#2563eb",
    tagline: "Discipline, karmic acceleration, and Saturn's iron will.",
    properties: ["Discipline", "Focus", "Career", "Justice", "Karma", "Longevity"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats", metal: "Silver or Gold", finger: "Middle finger", day: "Saturday",
    description: "Blue Sapphire (Neelam) is the most powerful and fastest-acting gemstone in Vedic astrology — a double-edged sword. Saturn, its ruling planet, is the karmic enforcer. For those whose charts align, Neelam can dramatically accelerate career growth and remove obstacles. For those incompatible, it can cause serious setbacks. A 3-day trial before full commitment is strongly advised.",
    caution: "MOST IMPORTANT: Always conduct a 3-day trial before permanently wearing Blue Sapphire. Wear it on a Saturday, observe your day — if negative events cluster, remove immediately. Not suitable for Leo, Cancer, or Scorpio ascendants without extensive consultation.",
    howToWear: "Wear a Ceylon or Burmese Blue Sapphire of 3+ carats in silver or gold on the middle finger on a Saturday during Shani hora. First perform a 3-day trial. Chant 'Om Praam Preem Proom Sah Shanaischaraya Namaha'.",
  },
  hessonite: {
    name: "Hessonite", sanskrit: "Gomed", planet: "Rahu", color: "#92400e",
    tagline: "Protection from illusion, clarity, and Rahu's liberation.",
    properties: ["Clarity", "Protection", "Focus", "Ambition", "Rahu pacification", "Anti-confusion"],
    rashi: ["Gemini", "Virgo"],
    weight: "6–8 carats", metal: "Silver", finger: "Middle finger", day: "Saturday",
    description: "Hessonite Garnet (Gomed) is the gemstone of Rahu, the north node of the Moon — a shadowy planet associated with illusion, obsession, ambition, and karmic debt. When Rahu is prominently placed or causing confusion and delays, Gomed can help the wearer gain clarity, focus, and material success. It is particularly useful during Rahu Dasha.",
    caution: "Rahu is a malefic shadow planet and Gomed's effects are powerful and unpredictable. Always consult a qualified Jyotishi before wearing. Avoid if in Ketu Dasha.",
    howToWear: "Wear a natural Hessonite of 6+ carats in silver on the middle finger on a Saturday or Wednesday. Chant 'Om Raam Rahave Namaha' 108 times.",
  },
  "cats-eye": {
    name: "Cat's Eye", sanskrit: "Lehsuniya", planet: "Ketu", color: "#ca8a04",
    tagline: "Spiritual liberation, intuition, and Ketu's mystical power.",
    properties: ["Intuition", "Spirituality", "Liberation", "Protection", "Occult knowledge", "Moksha"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats", metal: "Gold or Silver", finger: "Little finger", day: "Thursday",
    description: "Cat's Eye (Lehsuniya) is the gemstone of Ketu, the south node of the Moon — a spiritual, detached, and mystical force. Ketu governs past-life karma, occult knowledge, renunciation, and liberation (Moksha). Cat's Eye is worn to enhance intuitive and psychic abilities, protect from negative energy, and navigate the spiritual dimensions of existence.",
    caution: "Like Gomed, Cat's Eye should only be worn after careful consultation. Ketu is a separating force — it may cause detachment from material things. Not suitable during Rahu Dasha.",
    howToWear: "Wear a Chrysoberyl Cat's Eye of 3+ carats showing a distinct chatoyancy band, in gold or silver on the little finger. Chant 'Om Kem Ketave Namaha'.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gem = GEMSTONES[slug];
  if (!gem) return { title: "Gemstone Not Found" };
  return {
    title: `${gem.name} (${gem.sanskrit}) — Vedic Gemstone Guide`,
    description: gem.tagline,
  };
}

export async function generateStaticParams() {
  return Object.keys(GEMSTONES).map((slug) => ({ slug }));
}

export default async function GemstoneDetailPage({ params }: Props) {
  const { slug } = await params;
  const gem = GEMSTONES[slug];
  if (!gem) notFound();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: "64px 24px", position: "relative" }}>
          <div className="hero-gradient" />
          <div className="dot-grid absolute inset-0" style={{ opacity: 0.3 }} />
          <div className="relative max-w-4xl mx-auto" style={{ zIndex: 1 }}>
            <Link
              href="/gemstones"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#94a3b8",
                textDecoration: "none",
                marginBottom: 32,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Gemstones
            </Link>

            <div className="flex items-center gap-6 flex-wrap">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 18,
                  background: `radial-gradient(circle at 35% 35%, ${gem.color}cc, ${gem.color}55)`,
                  boxShadow: `0 0 40px ${gem.color}60, inset 0 2px 0 rgba(255,255,255,0.25)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.9" />
                  <path d="M3 9h18" stroke="white" strokeWidth="0.5" opacity="0.4" />
                </svg>
              </div>
              <div>
                <span className="planet-badge" style={{ marginBottom: 10, display: "inline-block" }}>{gem.planet}</span>
                <h1 className="display-xl" style={{ color: "#f8f8ff", margin: "8px 0 0" }}>
                  {gem.name}
                  <span style={{ fontSize: "0.45em", color: "#94a3b8", marginLeft: 16, fontStyle: "italic", letterSpacing: 0 }}>
                    {gem.sanskrit}
                  </span>
                </h1>
                <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 8, fontStyle: "italic" }}>
                  "{gem.tagline}"
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Content */}
        <section style={{ padding: "64px 24px 96px" }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div style={{ gridColumn: "1 / 3" }}>
                {/* Description */}
                <div className="glass-card" style={{ padding: "32px", marginBottom: 24 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 300, color: "#f8f8ff", marginBottom: 16, letterSpacing: "-0.2px" }}>
                    About {gem.name}
                  </h2>
                  <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>
                    {gem.description}
                  </p>
                </div>

                {/* How to Wear */}
                <div className="glass-card" style={{ padding: "32px", marginBottom: 24 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 300, color: "#f8f8ff", marginBottom: 16, letterSpacing: "-0.2px" }}>
                    How to Wear
                  </h2>
                  <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>
                    {gem.howToWear}
                  </p>
                </div>

                {/* Caution */}
                <div
                  style={{
                    background: "rgba(251,191,36,0.06)",
                    border: "1px solid rgba(251,191,36,0.2)",
                    borderRadius: 16,
                    padding: "28px 32px",
                  }}
                >
                  <h2 style={{ fontSize: 16, fontWeight: 400, color: "#fbbf24", marginBottom: 12 }}>
                    ⚠️ Caution
                  </h2>
                  <p style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.8, margin: 0 }}>
                    {gem.caution}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Quick facts */}
                <div className="glass-card" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 400, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                    Quick Facts
                  </h3>
                  {[
                    { label: "Ruling Planet", value: gem.planet },
                    { label: "Recommended Weight", value: gem.weight },
                    { label: "Metal", value: gem.metal },
                    { label: "Finger", value: gem.finger },
                    { label: "Best Day", value: gem.day },
                  ].map((item) => (
                    <div key={item.label} style={{ borderBottom: "1px solid rgba(139,92,246,0.1)", paddingBottom: 12, marginBottom: 12 }}>
                      <p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{item.label}</p>
                      <p style={{ fontSize: 14, color: "#f8f8ff", margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Compatible signs */}
                <div className="glass-card" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 400, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                    Compatible Rashi
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {gem.rashi.map((r) => (
                      <span
                        key={r}
                        style={{
                          fontSize: 13,
                          padding: "5px 12px",
                          background: `${gem.color}15`,
                          border: `1px solid ${gem.color}30`,
                          borderRadius: 9999,
                          color: "#cbd5e1",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Properties */}
                <div className="glass-card" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 400, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
                    Key Properties
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {gem.properties.map((p) => (
                      <span
                        key={p}
                        style={{
                          fontSize: 12,
                          padding: "4px 10px",
                          background: "rgba(124,58,237,0.1)",
                          border: "1px solid rgba(139,92,246,0.2)",
                          borderRadius: 9999,
                          color: "#c084fc",
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="glass-card" style={{ padding: "24px", background: "rgba(124,58,237,0.06)", borderColor: "rgba(168,85,247,0.3)" }}>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
                    Wondering if {gem.name} is right for your chart?
                  </p>
                  <Link href="/#recommend" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 14 }}>
                    Get My Reading
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
