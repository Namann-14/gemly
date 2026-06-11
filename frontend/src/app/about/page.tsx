import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Gemly",
  description:
    "The story behind Gemly — why we built an AI-powered Vedic gemstone platform and what drives us.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ padding: "80px 24px 64px", position: "relative" }}>
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
              Our Story
            </span>
            <h1 className="display-xl" style={{ color: "#f8f8ff", marginBottom: 20 }}>
              Born from a question:
              <br />
              <span className="gradient-text">Why is ancient wisdom so hard to access?</span>
            </h1>
            <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.8 }}>
              Vedic astrology has guided civilizations for over 5,000 years. Yet the
              tools available today are outdated, cluttered, and offer no real
              explanation for their recommendations. We built Gemly to change that.
            </p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Mission */}
        <section style={{ padding: "80px 24px" }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 20 }}>
                  Our Mission
                </h2>
                <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
                  To make Vedic gemological wisdom genuinely accessible — not as static
                  tables, but as a living, personalized conversation between ancient
                  tradition and modern AI.
                </p>
                <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8 }}>
                  Every recommendation from Gemly comes with a <em>reason</em>. We
                  believe you deserve to understand why a gemstone resonates with your
                  chart — not just be handed a list.
                </p>
              </div>
              <div className="glass-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "Tradition", value: "5,000+ years of Vedic knowledge" },
                    { label: "AI Model", value: "Claude Sonnet (Anthropic)" },
                    { label: "Engine", value: "Classical Parashari Jyotish" },
                    { label: "Built for", value: "Seekers worldwide" },
                  ].map((item) => (
                    <div key={item.label} style={{ borderBottom: "1px solid rgba(139,92,246,0.1)", paddingBottom: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 400, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: 14, color: "#f8f8ff", margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* Values */}
        <section style={{ padding: "80px 24px" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 48, textAlign: "center" }}>
              What we stand for
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "Transparency",
                  desc: "Every recommendation comes with a clear explanation. No black boxes — you always know why.",
                },
                {
                  icon: "🕉️",
                  title: "Respect for Tradition",
                  desc: "We don't distort Vedic knowledge for convenience. Classical rules are the foundation, AI is the interpreter.",
                },
                {
                  icon: "🎨",
                  title: "Beautiful Experience",
                  desc: "Ancient wisdom deserves a modern, premium interface. We reject cluttered, outdated tools.",
                },
              ].map((v) => (
                <div key={v.title} className="glass-card" style={{ padding: "28px" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{v.icon}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 300, color: "#f8f8ff", marginBottom: 10, letterSpacing: "-0.2px" }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Disclosure */}
        <section style={{ padding: "0 24px 80px" }}>
          <div className="max-w-4xl mx-auto">
            <div
              style={{
                background: "rgba(251,191,36,0.06)",
                border: "1px solid rgba(251,191,36,0.2)",
                borderRadius: 16,
                padding: "28px 32px",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 400, color: "#fbbf24", marginBottom: 12 }}>
                ⚠️ AI Usage Disclosure
              </h3>
              <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>
                Gemly uses Anthropic's Claude (claude-sonnet-4-20250514) as the primary AI model
                for generating gemstone recommendations, with OpenAI GPT-4o as fallback.
                All AI outputs are informed by classical Vedic astrology data but should be
                treated as guidance for contemplation, not medical or legal advice.
                Gemstone recommendations are based on traditional Jyotish principles
                and personal reflection.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
