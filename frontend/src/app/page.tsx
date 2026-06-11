"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecommendationForm from "@/components/RecommendationForm";
import FeaturesSection from "@/components/FeaturesSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "108", label: "Vedic Rules" },
  { value: "12+", label: "Gemstone Types" },
  { value: "9",   label: "Planets Analyzed" },
  { value: "6",   label: "Life Domains" },
];

const gemPreview = [
  { name: "Ruby",          color: "#e11d48", planet: "Sun" },
  { name: "Emerald",       color: "#059669", planet: "Mercury" },
  { name: "Blue Sapphire", color: "#2563eb", planet: "Saturn" },
  { name: "Pearl",         color: "#94a3b8", planet: "Moon" },
  { name: "Yellow Sapphire", color: "#d97706", planet: "Jupiter" },
];

const testimonials = [
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
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* --- HERO ------------------------------------------- */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Atmospheric gradient */}
          <div className="hero-gradient" />

          {/* Dot grid */}
          <div className="dot-grid absolute inset-0 opacity-40 z-0" />

          {/* Glowing Aura in the background */}
          <div className="aura-glow w-[500px] h-[500px] bg-purple-600/10 top-[-100px] left-1/2 -translate-x-1/2 z-0" />

          {/* Floating gems decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {gemPreview.map((g, i) => (
              <motion.div
                key={g.name}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
                className="absolute w-10 h-10 rounded-xl flex items-center justify-center opacity-65 md:opacity-80 shadow-lg"
                style={{
                  top: `${18 + i * 14}%`,
                  right: `${8 + i * 5}%`,
                  background: `radial-gradient(circle at 35% 35%, ${g.color}dd, ${g.color}44)`,
                  boxShadow: `0 0 20px ${g.color}35, inset 0 1px 0 rgba(255,255,255,0.25)`,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.8" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto text-center px-6 py-32 md:py-40 z-20">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge
                variant="outline"
                className="border-purple-500/30 bg-purple-500/10 text-purple-300 text-[12px] font-normal tracking-widest px-4 py-1.5 rounded-full uppercase"
              >
                <span className="pulse-dot mr-2.5" />
                AI-Powered Vedic Gemology
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="display-xxl text-[#f8f8ff] mb-6 font-light"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Your gemstone,
              <br />
              <span className="gradient-text font-medium">written in the stars.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Enter your birth details. Our Vedic engine calculates your planetary
              profile. Claude AI reveals the exact gemstones your chart is calling for
              — and <em>exactly why</em>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center justify-center gap-5 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button
                render={<Link href="#recommend" />}
                size="lg"
                className="btn-celestial text-white px-9 py-6 text-sm md:text-base rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] border-0"
              >
                ✨ Get My Reading
              </Button>
              <Button
                render={<Link href="/how-it-works" />}
                variant="outline"
                size="lg"
                className="rounded-full border-purple-500/30 bg-transparent text-[#f8f8ff] hover:bg-purple-500/10 hover:border-purple-500/60 px-8 py-6 text-sm md:text-base transition-all duration-300"
              >
                How It Works →
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              {stats.map((s) => (
                <Card
                  key={s.label}
                  className="glass-card border-purple-500/15 bg-purple-950/5 hover:border-purple-500/30 hover:bg-purple-950/10 backdrop-blur-md transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <p className="tabular-nums gradient-text text-3xl font-light tracking-tight mb-1">
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      {s.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5 opacity-40 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* --- RECOMMENDATION FORM --------------------------- */}
        <RecommendationForm />

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* --- FEATURES -------------------------------------- */}
        <FeaturesSection />

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* --- TESTIMONIAL / TRUST SECTION ------------------- */}
        <section className="py-24 px-6 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto z-10 relative">
            <h2 className="display-lg text-[#f8f8ff] mb-12 font-light">
              Trusted by seekers across the world
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass-card border-purple-500/15 bg-purple-950/5 hover:border-purple-500/30 hover:bg-purple-950/10 h-full transition-all duration-300">
                    <CardContent className="p-8 text-left flex flex-col justify-between h-full">
                      <div>
                        <Badge
                          variant="ghost"
                          className="p-0 text-[10px] text-purple-400 font-medium uppercase tracking-widest mb-4 hover:bg-transparent"
                        >
                          🎯 Focus: {t.concern}
                        </Badge>
                        <p className="text-sm text-slate-300 font-light leading-relaxed italic mb-6">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                      <p className="text-xs text-slate-400 font-light">
                        {t.name} · <span className="text-slate-500">{t.location}</span>
                      </p>
                    </CardContent>
                  </Card>
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
