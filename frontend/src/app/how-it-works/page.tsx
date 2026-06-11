import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
              The Science &amp; Spirit Behind Gemly
            </Badge>
            <h1 className="display-xl text-[#f8f8ff] mb-6 font-light">
              Vedic Astrology meets
              <br />
              <span className="gradient-text font-medium">Artificial Intelligence</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              A 5,000-year-old tradition, powered by cutting-edge AI reasoning.
              Here's exactly how your personalized reading works.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* Steps */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
              {steps.map((step) => (
                <Card
                  key={step.number}
                  className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300"
                >
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                          {step.planet}
                        </div>
                      </div>
                      <div className="flex-1">
                        <Badge
                          variant="ghost"
                          className="p-0 text-[11px] text-purple-400 font-medium uppercase tracking-widest mb-2 hover:bg-transparent"
                        >
                          Step {step.number}
                        </Badge>
                        <h2 className="display-md text-[#f8f8ff] mb-3 font-light">
                          {step.title}
                        </h2>
                        <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed mb-4">
                          {step.desc}
                        </p>
                        <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4 md:p-5">
                          <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* Navagraha table */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="display-lg text-[#f8f8ff] mb-3 font-light">
                The Nine Planets &amp; Their Gemstones
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-light">
                Classical Vedic Ratna Shastra (Gemstone Scripture)
              </p>
            </div>
            <Card className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md overflow-hidden p-0">
              <CardContent className="p-0">
                {planets.map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between px-6 py-4 border-b border-purple-500/10 last:border-0 hover:bg-purple-500/5 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background: p.color,
                          boxShadow: `0 0 10px ${p.color}`,
                        }}
                      />
                      <span className="text-sm text-[#f8f8ff] font-light">{p.name}</span>
                    </div>
                    <span className="text-sm text-slate-400 font-light">{p.gem}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="display-lg text-[#f8f8ff] mb-4 font-light">
              Ready to discover yours?
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-light mb-8">
              Get your personalized Vedic gemstone reading in under a minute.
            </p>
            <Button
              render={<Link href="/#recommend" />}
              size="lg"
              className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] text-white border-0 px-9 py-6 text-base shadow-[0_0_30px_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] transition-all duration-300"
            >
              Start Your Reading →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
