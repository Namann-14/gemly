"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// --- Types --------------------------------------------------------
interface GemstoneResult {
  name: string;
  sanskrit: string;
  planet: string;
  color: string;
  tagline: string;
  why_recommended: string;
  properties: string[];
  how_to_wear: string;
  best_day: string;
  caution: string;
}

interface RecommendationResult {
  gemstones: GemstoneResult[];
  personal_message: string;
  _meta?: {
    model?: string;
    profile?: { rashi?: string; dashaLord?: string; weakPlanets?: string[] };
  };
}

interface FormData {
  name: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  zodiac: string;
  concern: string;
}

// --- Data ---------------------------------------------------------
const ZODIAC_SIGNS = [
  { value: "Aries (Mesh)",         emoji: "♈" },
  { value: "Taurus (Vrishabha)",   emoji: "♉" },
  { value: "Gemini (Mithuna)",     emoji: "♊" },
  { value: "Cancer (Karka)",       emoji: "♋" },
  { value: "Leo (Simha)",          emoji: "♌" },
  { value: "Virgo (Kanya)",        emoji: "♍" },
  { value: "Libra (Tula)",         emoji: "♎" },
  { value: "Scorpio (Vrischika)",  emoji: "♏" },
  { value: "Sagittarius (Dhanu)",  emoji: "♐" },
  { value: "Capricorn (Makara)",   emoji: "♑" },
  { value: "Aquarius (Kumbha)",    emoji: "♒" },
  { value: "Pisces (Meena)",       emoji: "♓" },
];

const CONCERNS = [
  { value: "career",    label: "Career & Ambition",      emoji: "💼", desc: "Professional growth, recognition, leadership" },
  { value: "love",      label: "Love & Relationships",   emoji: "❤️",  desc: "Romance, partnership, emotional bonds" },
  { value: "health",    label: "Health & Vitality",      emoji: "🌿", desc: "Physical energy, healing, wellness" },
  { value: "wealth",    label: "Wealth & Prosperity",    emoji: "💰", desc: "Financial growth, abundance, stability" },
  { value: "protection",label: "Protection & Safety",    emoji: "🛡️", desc: "Negative energy protection, safety" },
  { value: "spiritual", label: "Spiritual Growth",       emoji: "🔮", desc: "Enlightenment, intuition, inner peace" },
];

const GEMSTONE_COLORS: Record<string, string> = {
  Ruby: "#e11d48", Emerald: "#059669", Sapphire: "#2563eb",
  "Blue Sapphire": "#1d4ed8", "Yellow Sapphire": "#d97706",
  Amethyst: "#a855f7", Pearl: "#94a3b8", Diamond: "#e2e8f0",
  Coral: "#ea580c", "Red Coral": "#ea580c",
  "Cat's Eye": "#ca8a04", Hessonite: "#92400e",
  Topaz: "#b45309", Opal: "#06b6d4", Aquamarine: "#0891b2",
};

const STEPS = [
  { id: 1, title: "About You",       subtitle: "Let's start with your name and when you were born." },
  { id: 2, title: "Birth Details",   subtitle: "Where and when exactly were you born?" },
  { id: 3, title: "Your Sign",       subtitle: "Select your Vedic Moon sign (Rashi)." },
  { id: 4, title: "Your Focus",      subtitle: "What area of life do you want guidance on?" },
];

// --- Gemstone Card ------------------------------------------------
function GemstoneCard({ gem, index }: { gem: GemstoneResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = GEMSTONE_COLORS[gem.name] ?? "#a855f7";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="gemstone-card relative overflow-hidden p-8 rounded-2xl border bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-300"
      style={{
        borderColor: `${color}25`,
        boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px ${color}08`,
      }}
    >
      <div className="shimmer-overlay" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
          #{index + 1} Recommended
        </span>
        <Badge
          variant="outline"
          className="bg-purple-500/10 border-purple-500/20 text-purple-300 text-[10px] tracking-wider px-2.5 py-0.5 rounded-full"
        >
          {gem.planet}
        </Badge>
      </div>

      {/* Gem + name */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-md"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
            boxShadow: `0 0 15px ${color}35`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.85" />
            <path d="M3 9h18" stroke="white" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-light text-[#f8f8ff] tracking-tight">{gem.name}</h3>
          <p className="text-xs text-slate-400 italic mt-0.5">{gem.sanskrit}</p>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-xs md:text-sm text-slate-400 font-light italic leading-relaxed mb-6">
        &ldquo;{gem.tagline}&rdquo;
      </p>

      {/* Why box */}
      <div
        className="rounded-xl p-5 mb-5 border"
        style={{
          background: `${color}06`,
          borderColor: `${color}18`,
        }}
      >
        <p className="text-[10px] font-medium text-purple-400 uppercase tracking-widest mb-2">
          Why this gemstone
        </p>
        <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">{gem.why_recommended}</p>
      </div>

      {/* Expand toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="p-0 h-auto font-normal hover:bg-transparent flex items-center gap-1 hover:text-[#f8f8ff] transition-colors"
        style={{ color }}
      >
        {expanded ? "Show less" : "View full details"}
        <svg
          className="w-3.5 h-3.5 transition-transform duration-250"
          style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 flex flex-col gap-5 border-t border-purple-500/10 mt-5">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-2.5">Properties</p>
                <div className="flex flex-wrap gap-1.5">
                  {gem.properties.map((p) => (
                    <Badge
                      key={p}
                      variant="outline"
                      className="text-xs px-2.5 py-0.5 rounded-full text-slate-350 border-slate-700/50"
                      style={{ background: `${color}06`, borderColor: `${color}18` }}
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">How to Wear</p>
                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">{gem.how_to_wear}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">Best Day</p>
                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">{gem.best_day}</p>
              </div>
              <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4 flex flex-col gap-1">
                <p className="text-[10px] text-amber-400 uppercase tracking-widest font-medium">⚠ Caution</p>
                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">{gem.caution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Step 1: Name + DOB -------------------------------------------
function Step1({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="display-md text-[#f8f8ff] mb-2">{STEPS[0].title}</h2>
      <p className="text-xs md:text-sm text-slate-400 font-light mb-8">{STEPS[0].subtitle}</p>
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-400 text-xs font-normal tracking-wide">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="bg-white/2 border-purple-500/20 text-[#f8f8ff] placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-purple-950/5 focus:ring-purple-500/5 h-11 text-sm font-light"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob" className="text-slate-400 text-xs font-normal tracking-wide">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={data.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            className="bg-white/2 border-purple-500/20 text-[#f8f8ff] focus:border-purple-500/50 focus:bg-purple-950/5 h-11 text-sm font-light"
            style={{ colorScheme: "dark" }}
          />
          <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-relaxed">
            Your exact birth date is used to calculate your Vimshottari Dasha cycle.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Step 2: Birth time + place -----------------------------------
function Step2({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="display-md text-[#f8f8ff] mb-2">{STEPS[1].title}</h2>
      <p className="text-xs md:text-sm text-slate-400 font-light mb-8">{STEPS[1].subtitle}</p>
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="birthPlace" className="text-slate-400 text-xs font-normal tracking-wide">Birth Place</Label>
          <Input
            id="birthPlace"
            type="text"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={data.birthPlace}
            onChange={(e) => onChange("birthPlace", e.target.value)}
            className="bg-white/2 border-purple-500/20 text-[#f8f8ff] placeholder:text-slate-600 focus:border-purple-500/50 focus:bg-purple-950/5 h-11 text-sm font-light"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthTime" className="text-slate-400 text-xs font-normal tracking-wide">
            Birth Time{" "}
            <span className="text-slate-500 text-[11px]">(optional but improves accuracy)</span>
          </Label>
          <Input
            id="birthTime"
            type="time"
            value={data.birthTime}
            onChange={(e) => onChange("birthTime", e.target.value)}
            className="bg-white/2 border-purple-500/20 text-[#f8f8ff] focus:border-purple-500/50 focus:bg-purple-950/5 h-11 text-sm font-light"
            style={{ colorScheme: "dark" }}
          />
          <p className="text-[11px] text-slate-500 font-light mt-1.5 leading-relaxed">
            Birth time helps calculate your Lagna (Ascendant) for a more precise reading.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Step 3: Zodiac -----------------------------------------------
function Step3({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="display-md text-[#f8f8ff] mb-2">{STEPS[2].title}</h2>
      <p className="text-xs md:text-sm text-slate-400 font-light mb-8">{STEPS[2].subtitle}</p>
      <div className="grid grid-cols-3 gap-3">
        {ZODIAC_SIGNS.map((z) => {
          const selected = data.zodiac === z.value;
          return (
            <button
              key={z.value}
              type="button"
              onClick={() => onChange("zodiac", z.value)}
              className={`p-4 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${
                selected
                  ? "bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  : "bg-white/[0.015] hover:bg-white/[0.03] border-purple-500/10 hover:border-purple-500/25 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span className="text-2xl">{z.emoji}</span>
              <span className="text-[11px] font-normal tracking-wide text-center leading-tight">
                {z.value.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- Step 4: Concern ----------------------------------------------
function Step4({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="display-md text-[#f8f8ff] mb-2">{STEPS[3].title}</h2>
      <p className="text-xs md:text-sm text-slate-400 font-light mb-8">{STEPS[3].subtitle}</p>
      <div className="flex flex-col gap-3">
        {CONCERNS.map((c) => {
          const selected = data.concern === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange("concern", c.value)}
              className={`p-5 rounded-xl border flex items-center gap-5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/30 text-left ${
                selected
                  ? "bg-purple-500/10 border-purple-500/40 text-[#f8f8ff] shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                  : "bg-white/[0.015] hover:bg-white/[0.03] border-purple-500/10 hover:border-purple-500/25 text-slate-400"
              }`}
            >
              <span className="text-2xl shrink-0">{c.emoji}</span>
              <div className="flex-1">
                <p className={`text-sm font-medium ${selected ? "text-purple-300" : "text-[#cbd5e1]"}`}>{c.label}</p>
                <p className="text-xs text-slate-500 font-light mt-0.5">{c.desc}</p>
              </div>
              {selected && (
                <svg className="w-5 h-5 text-[#c084fc] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- Main Component -----------------------------------------------
export default function RecommendationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: "", dob: "", birthTime: "", birthPlace: "", zodiac: "", concern: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (key: keyof FormData, value: string) =>
    setFormData((p) => ({ ...p, [key]: value }));

  const canNext = () => {
    if (step === 1) return formData.name.trim().length > 0 && formData.dob.length > 0;
    if (step === 2) return formData.birthPlace.trim().length > 0;
    if (step === 3) return formData.zodiac.length > 0;
    if (step === 4) return formData.concern.length > 0;
    return false;
  };

  const goNext = () => { if (canNext() && step < 4) setStep((s) => s + 1); };
  const goBack = () => { if (step > 1) setStep((s) => s - 1); };

  const handleSubmit = async () => {
    if (!canNext()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/recommend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "Something went wrong.");
      }
      const data = await res.json() as RecommendationResult;
      setResult(data);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recommend" className="py-24 px-6 relative overflow-hidden">
      <div className="aura-glow w-[400px] h-[400px] bg-purple-600/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="max-w-2xl mx-auto z-10 relative">
        {/* Section heading */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-6 border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-full"
          >
            ✨ Vedic Astrology + OpenRouter
          </Badge>
          <h2 className="display-xl text-[#f8f8ff] mb-4 font-light">
            Discover Your{" "}
            <span className="gradient-text font-medium">Sacred Gemstone</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
            Answer four simple questions. Our Vedic engine and AI will reveal your perfect gemstones.
          </p>
        </div>

        {/* Form card */}
        {!result && (
          <Card className="glass-card border-purple-500/15 bg-purple-950/5">
            <CardContent className="p-8 md:p-12">
              {/* Progress */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-500 font-light">Step {step} of 4</span>
                  <span className="text-xs text-[#c084fc] font-medium tracking-wide uppercase">{STEPS[step - 1].title}</span>
                </div>
                <Progress
                  value={(step / 4) * 100}
                  className="h-[3px] bg-purple-500/10"
                />
                <div className="flex justify-between mt-5">
                  {STEPS.map((s) => (
                    <div key={s.id} className="flex flex-col items-center">
                      <div
                        className="w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 text-[10px] font-normal"
                        style={{
                          borderColor: s.id <= step ? "rgba(168,85,247,0.4)" : "rgba(168,85,247,0.15)",
                          background: s.id < step ? "linear-gradient(135deg,#7e22ce,#a855f7)" : s.id === step ? "rgba(168,85,247,0.12)" : "transparent",
                          color: s.id === step ? "#c084fc" : s.id < step ? "#ffffff" : "#475569",
                        }}
                      >
                        {s.id < step ? (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          <span>{s.id}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && <Step1 key="s1" data={formData} onChange={onChange} />}
                {step === 2 && <Step2 key="s2" data={formData} onChange={onChange} />}
                {step === 3 && <Step3 key="s3" data={formData} onChange={onChange} />}
                {step === 4 && <Step4 key="s4" data={formData} onChange={onChange} />}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs md:text-sm text-rose-300 leading-relaxed">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <Button
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 1}
                  className="rounded-full border-purple-500/30 bg-transparent text-[#f8f8ff] hover:bg-purple-500/10 hover:border-purple-500/65 px-7 py-5 text-xs disabled:opacity-30 transition-all duration-300"
                >
                  ← Back
                </Button>

                {step < 4 ? (
                  <Button
                    onClick={goNext}
                    disabled={!canNext()}
                    className="rounded-full btn-celestial text-white border-0 px-8 py-5 text-xs font-medium tracking-wide disabled:opacity-40"
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canNext() || loading}
                    className="rounded-full btn-celestial text-white border-0 px-8 py-5 text-xs font-medium tracking-wide min-w-[190px] disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="spinner border-t-white shrink-0 mr-2" style={{ width: 14, height: 14 }} />
                        Reading the stars…
                      </>
                    ) : (
                      <>✨ Reveal My Gemstones</>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <motion.div id="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {/* Personal message */}
            <Card className="glass-card border-purple-500/25 bg-purple-500/[0.03] backdrop-blur-md mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7e22ce] to-[#a855f7] flex items-center justify-center shrink-0 text-xl shadow-md">
                    🔮
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-purple-400 uppercase tracking-widest mb-1.5">Your Personal Reading</p>
                    <p className="text-xs md:text-sm text-slate-350 font-light leading-relaxed">{result.personal_message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cards */}
            <h3 className="display-lg text-[#f8f8ff] mb-8 text-center">
              Your Recommended Gemstones
            </h3>
            <div className="flex flex-col gap-6">
              {result.gemstones.map((gem, i) => (
                <GemstoneCard key={gem.name} gem={gem} index={i} />
              ))}
            </div>

            {/* Summary card */}
            <Card className="glass-card border-purple-500/15 bg-purple-950/5 mt-8">
              <CardContent className="p-6 flex flex-wrap gap-8 justify-center">
                {[
                  { label: "Rashi", value: result._meta?.profile?.rashi },
                  { label: "Dasha Lord", value: result._meta?.profile?.dashaLord },
                  { label: "Weak Planets", value: result._meta?.profile?.weakPlanets?.join(", ") },
                ].filter((i) => i.value).map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xs md:text-sm text-[#c084fc] font-light">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reset */}
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                className="rounded-full border-purple-500/30 bg-transparent text-[#f8f8ff] hover:bg-purple-500/10 hover:border-purple-500/65 px-8 py-5 text-xs"
                onClick={() => { setResult(null); setError(null); setStep(1); setFormData({ name: "", dob: "", birthTime: "", birthPlace: "", zodiac: "", concern: "" }); }}
              >
                Start a New Reading
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
