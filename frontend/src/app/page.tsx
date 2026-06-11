"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";
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
        <HeroSection />

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
