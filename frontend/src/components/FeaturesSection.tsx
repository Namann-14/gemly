"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: "🪐",
    title: "Vedic Planetary Analysis",
    desc: "We calculate your ascendant, moon sign, and dominant planets from your exact birth data — following classical Jyotish principles.",
  },
  {
    icon: "🤖",
    title: "AI Gemologist",
    desc: "Claude AI synthesizes your planetary profile into a personalized recommendation, explaining exactly why each gemstone was chosen for you.",
  },
  {
    icon: "💎",
    title: "Deep Gemstone Intel",
    desc: "Each recommendation includes wearing instructions, auspicious days, cautions, and the deep metaphysical reason for the match.",
  },
  {
    icon: "🎯",
    title: "Concern-Focused",
    desc: "From career to spiritual growth — your life focus shapes the recommendation, giving you targeted guidance for what matters most right now.",
  },
];

export default function FeaturesSection() {
  return (
    <section style={{ padding: "96px 24px" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 400,
              color: "#a855f7",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
              border: "1px solid rgba(168,85,247,0.3)",
              padding: "4px 14px",
              borderRadius: 9999,
              background: "rgba(168,85,247,0.08)",
            }}
          >
            Why Gemly is different
          </span>
          <h2 className="display-xl" style={{ color: "#f8f8ff", marginBottom: 16 }}>
            Ancient wisdom,
            <br />
            <span className="gradient-text">modern intelligence</span>
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", maxWidth: 520, margin: "0 auto" }}>
            Unlike static rule-based tools, Gemly combines genuine Vedic calculation
            with AI reasoning to explain <em>why</em> a gemstone is right for you.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card"
              style={{ padding: "28px 28px" }}
            >
              <span style={{ fontSize: 32, marginBottom: 16, display: "block" }}>{f.icon}</span>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 300,
                  letterSpacing: "-0.2px",
                  color: "#f8f8ff",
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{ padding: "40px 40px", overflow: "hidden" }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: "#f8f8ff",
              marginBottom: 28,
              letterSpacing: "-0.2px",
            }}
          >
            Gemly vs. Traditional tools
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", color: "#94a3b8", fontWeight: 400, padding: "0 0 16px", paddingRight: 24 }}>Feature</th>
                  <th style={{ textAlign: "center", color: "#a855f7", fontWeight: 400, padding: "0 0 16px 0", paddingRight: 24 }}>Gemly</th>
                  <th style={{ textAlign: "center", color: "#64748b", fontWeight: 400, padding: "0 0 16px 0" }}>Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI-personalized reasoning", true, false],
                  ["Vedic planetary calculation", true, "partial"],
                  ["Explains WHY each gem", true, false],
                  ["Concern-based focus", true, false],
                  ["Mobile-optimized", true, false],
                  ["Gemstone encyclopedia", true, "partial"],
                ].map(([label, us, them]) => (
                  <tr key={String(label)} style={{ borderTop: "1px solid rgba(139,92,246,0.12)" }}>
                    <td style={{ color: "#cbd5e1", padding: "12px 0", paddingRight: 24 }}>{label}</td>
                    <td style={{ textAlign: "center", padding: "12px 0", paddingRight: 24 }}>
                      {us === true ? (
                        <span style={{ color: "#a855f7", fontSize: 16 }}>✓</span>
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: 12 }}>{String(us)}</span>
                      )}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 0" }}>
                      {them === false ? (
                        <span style={{ color: "#475569", fontSize: 16 }}>✗</span>
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: 12 }}>{String(them)}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/#recommend" className="btn-primary" style={{ fontSize: 16, padding: "14px 36px" }}>
            Get My Personalized Reading
          </Link>
        </div>
      </div>
    </section>
  );
}
