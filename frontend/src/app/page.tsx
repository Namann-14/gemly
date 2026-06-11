"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecommendationForm from "@/components/RecommendationForm";
import FeaturesSection from "@/components/FeaturesSection";

const stats = [
  { value: "108", label: "Vedic Rules" },
  { value: "12+", label: "Gemstone Types" },
  { value: "9", label: "Planets Analyzed" },
  { value: "6", label: "Life Domains" },
];

const gemPreview = [
  { name: "Ruby", color: "#e11d48", planet: "Sun" },
  { name: "Emerald", color: "#059669", planet: "Mercury" },
  { name: "Blue Sapphire", color: "#2563eb", planet: "Saturn" },
  { name: "Pearl", color: "#94a3b8", planet: "Moon" },
  { name: "Yellow Sapphire", color: "#d97706", planet: "Jupiter" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section
          className="relative"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          {/* Atmospheric gradient */}
          <div className="hero-gradient" />

          {/* Dot grid */}
          <div
            className="dot-grid absolute inset-0"
            style={{ opacity: 0.5, zIndex: 0 }}
          />

          {/* Floating gems decoration */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {gemPreview.map((g, i) => (
              <motion.div
                key={g.name}
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
                style={{
                  position: "absolute",
                  top: `${15 + i * 15}%`,
                  right: `${5 + i * 4}%`,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `radial-gradient(circle at 35% 35%, ${g.color}bb, ${g.color}66)`,
                  boxShadow: `0 0 20px ${g.color}50, inset 0 1px 0 rgba(255,255,255,0.25)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.7,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.8" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div
            className="relative max-w-6xl mx-auto text-center"
            style={{ padding: "120px 24px 80px", zIndex: 2 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 400,
                  color: "#a855f7",
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  borderRadius: 9999,
                  padding: "6px 16px",
                  marginBottom: 32,
                  letterSpacing: "0.04em",
                }}
              >
                <span className="pulse-dot" />
                AI-Powered Vedic Gemology
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="display-xxl"
              style={{ color: "#f8f8ff", marginBottom: 24 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Your gemstone,
              <br />
              <span className="gradient-text">written in the stars.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#94a3b8",
                maxWidth: 540,
                margin: "0 auto 48px",
                lineHeight: 1.6,
                fontWeight: 300,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Enter your birth details. Our Vedic engine calculates your planetary
              profile. Claude AI reveals the exact gemstones your chart is calling for
              — and <em>exactly why</em>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link
                href="#recommend"
                className="btn-primary"
                style={{ padding: "14px 32px", fontSize: 16 }}
              >
                ✨ Get My Reading
              </Link>
              <Link
                href="/how-it-works"
                className="btn-ghost"
                style={{ padding: "13px 28px", fontSize: 15 }}
              >
                How It Works →
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card"
                  style={{ padding: "20px 16px", textAlign: "center" }}
                >
                  <p
                    className="tabular-nums gradient-text"
                    style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", margin: "0 0 4px" }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2"
            style={{ transform: "translateX(-50%)", zIndex: 2 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </section>

        <hr className="section-divider" />

        {/* ─── RECOMMENDATION FORM ─────────────────────────── */}
        <RecommendationForm />

        <hr className="section-divider" />

        {/* ─── FEATURES ────────────────────────────────────── */}
        <FeaturesSection />

        <hr className="section-divider" />

        {/* ─── TESTIMONIAL / TRUST SECTION ─────────────────── */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 48 }}>
              Trusted by seekers across the world
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "The AI explanation was so detailed — it actually told me WHY Blue Sapphire and not just which gemstone. Blown away.",
                  name: "Priya M.",
                  location: "Mumbai",
                  concern: "Career",
                },
                {
                  quote: "Finally a modern Vedic tool. The planetary analysis felt genuinely personalized, not like a horoscope newspaper.",
                  name: "Rohan K.",
                  location: "Delhi",
                  concern: "Wealth",
                },
                {
                  quote: "I've used myratna and others — Gemly is on another level. The UI is beautiful and the readings are profound.",
                  name: "Ananya S.",
                  location: "Bangalore",
                  concern: "Spiritual",
                },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card"
                  style={{ padding: "28px", textAlign: "left" }}
                >
                  <p style={{ fontSize: 14, color: "#a855f7", marginBottom: 12 }}>
                    🎯 Focus: {t.concern}
                  </p>
                  <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
                    {t.name} · {t.location}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
