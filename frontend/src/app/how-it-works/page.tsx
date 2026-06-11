import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Understand how Gemly combines classical Vedic astrology with Claude AI to deliver personalized gemstone recommendations.",
};

const steps = [
  {
    number: "01",
    planet: "🌍",
    title: "Birth Data Collection",
    desc: "You provide your name, date of birth, birth time, and birth place. This data is the foundation for your personal Vedic chart — your Kundali.",
    detail:
      "In Vedic astrology, the exact moment and location of birth determines the position of all nine planets (Navagrahas) across the twelve houses of your chart. Even a 10-minute difference in birth time can shift your ascendant.",
  },
  {
    number: "02",
    planet: "🪐",
    title: "Vedic Engine Calculation",
    desc: "Our Vedic engine calculates your ascendant (Lagna), moon sign, dominant planet, and weak planets from classical Jyotish tables.",
    detail:
      "We use classical Parashari rules to determine which planets are exalted, debilitated, or in their own signs. We also factor in the Dasha period (planetary cycle) you're currently running — critical for gemstone selection.",
  },
  {
    number: "03",
    planet: "🤖",
    title: "AI Gemological Analysis",
    desc: "Your enriched planetary profile is sent to Claude AI, which acts as a master Vedic gemologist with deep knowledge of gemstone-planet correspondences.",
    detail:
      "Unlike generic rule-based systems that return the same result for every Scorpio, our AI personalizes: it weighs your concern (career vs. love vs. health), your Dasha lord, your weakest planet, and the traditional ratna shastra principles together.",
  },
  {
    number: "04",
    planet: "💎",
    title: "Structured Recommendation",
    desc: "The AI returns a strict JSON response with 2–3 gemstones, each with full details: why it was chosen, how to wear it, and important cautions.",
    detail:
      "The response includes the Sanskrit name, ruling planet, tagline, a personal 'why this gem for you' explanation, properties, wearing instructions (metal, finger, time), the auspicious day, and any contraindications.",
  },
];

const planets = [
  { name: "Sun (Surya)", gem: "Ruby (Manikya)", color: "#e11d48" },
  { name: "Moon (Chandra)", gem: "Pearl (Moti)", color: "#94a3b8" },
  { name: "Mars (Mangal)", gem: "Red Coral (Moonga)", color: "#ea580c" },
  { name: "Mercury (Budha)", gem: "Emerald (Panna)", color: "#059669" },
  { name: "Jupiter (Guru)", gem: "Yellow Sapphire (Pukhraj)", color: "#d97706" },
  { name: "Venus (Shukra)", gem: "Diamond (Heera)", color: "#e2e8f0" },
  { name: "Saturn (Shani)", gem: "Blue Sapphire (Neelam)", color: "#2563eb" },
  { name: "Rahu", gem: "Hessonite (Gomed)", color: "#92400e" },
  { name: "Ketu", gem: "Cat's Eye (Lehsuniya)", color: "#ca8a04" },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: "80px 24px 64px", textAlign: "center", position: "relative" }}>
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
              The Science &amp; Spirit Behind Gemly
            </span>
            <h1 className="display-xl" style={{ color: "#f8f8ff", marginBottom: 20 }}>
              Vedic Astrology meets
              <br />
              <span className="gradient-text">Artificial Intelligence</span>
            </h1>
            <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.7 }}>
              A 5,000-year-old tradition, powered by cutting-edge AI reasoning.
              Here's exactly how your personalized reading works.
            </p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Steps */}
        <section style={{ padding: "80px 24px" }}>
          <div className="max-w-4xl mx-auto">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="glass-card"
                  style={{ padding: "36px 36px" }}
                >
                  <div className="flex items-start gap-6">
                    <div style={{ flexShrink: 0 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 14,
                          background: "rgba(124,58,237,0.15)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                        }}
                      >
                        {step.planet}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#7c3aed",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        Step {step.number}
                      </div>
                      <h2
                        className="display-md"
                        style={{ color: "#f8f8ff", marginBottom: 12 }}
                      >
                        {step.title}
                      </h2>
                      <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 16 }}>
                        {step.desc}
                      </p>
                      <div
                        style={{
                          background: "rgba(124,58,237,0.06)",
                          border: "1px solid rgba(139,92,246,0.2)",
                          borderRadius: 10,
                          padding: "16px 18px",
                        }}
                      >
                        <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Navagraha table */}
        <section style={{ padding: "80px 24px" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 12 }}>
                The Nine Planets &amp; Their Gemstones
              </h2>
              <p style={{ fontSize: 15, color: "#94a3b8" }}>
                Classical Vedic Ratna Shastra (Gemstone Scripture)
              </p>
            </div>
            <div className="glass-card" style={{ overflow: "hidden", padding: 0 }}>
              {planets.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 28px",
                    borderBottom: i < planets.length - 1 ? "1px solid rgba(139,92,246,0.1)" : "none",
                    gap: 16,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: p.color,
                        boxShadow: `0 0 8px ${p.color}80`,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14, color: "#f8f8ff" }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>{p.gem}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* CTA */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div className="max-w-xl mx-auto">
            <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 16 }}>
              Ready to discover yours?
            </h2>
            <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 32 }}>
              Get your personalized Vedic gemstone reading in under a minute.
            </p>
            <a href="/#recommend" className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
              Start Your Reading →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
