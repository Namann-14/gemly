"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────
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

// ── Data ─────────────────────────────────────────────────────────
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
  Amethyst: "#7c3aed", Pearl: "#94a3b8", Diamond: "#e2e8f0",
  Coral: "#ea580c", "Red Coral": "#ea580c",
  "Cat's Eye": "#ca8a04", Hessonite: "#92400e",
  Topaz: "#b45309", Opal: "#06b6d4", Aquamarine: "#0891b2",
};

// ── Step definitions ─────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "About You",       subtitle: "Let's start with your name and when you were born." },
  { id: 2, title: "Birth Details",   subtitle: "Where and when exactly were you born?" },
  { id: 3, title: "Your Sign",       subtitle: "Select your Vedic Moon sign (Rashi)." },
  { id: 4, title: "Your Focus",      subtitle: "What area of life do you want guidance on?" },
];

// ── Gemstone Card ────────────────────────────────────────────────
function GemstoneCard({ gem, index }: { gem: GemstoneResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = GEMSTONE_COLORS[gem.name] ?? "#7c3aed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="gemstone-card relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${color}40`,
        borderRadius: 16,
        padding: "28px",
        boxShadow: `0 0 40px ${color}18`,
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="shimmer-overlay" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        <span style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          #{index + 1} Recommended
        </span>
        <span className="planet-badge">{gem.planet}</span>
      </div>

      {/* Gem + name */}
      <div className="flex items-center gap-4 mb-4">
        <div style={{
          width: 56, height: 56, borderRadius: 12, flexShrink: 0,
          background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}66)`,
          boxShadow: `0 0 24px ${color}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.85" />
            <path d="M3 9h18" stroke="white" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
        <div>
          <h3 className="display-md" style={{ color: "#f8f8ff", margin: 0 }}>{gem.name}</h3>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "3px 0 0" }}>{gem.sanskrit}</p>
        </div>
      </div>

      {/* Tagline */}
      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5, fontStyle: "italic", marginBottom: 16 }}>
        "{gem.tagline}"
      </p>

      {/* Why box */}
      <div style={{
        background: `${color}12`, border: `1px solid ${color}25`,
        borderRadius: 10, padding: "14px 16px", marginBottom: 16,
      }}>
        <p style={{ fontSize: 12, fontWeight: 400, color: "#c084fc", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Why this gemstone
        </p>
        <p style={{ fontSize: 14, color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>{gem.why_recommended}</p>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
      >
        {expanded ? "Show less" : "View full details"}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Properties</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {gem.properties.map((p) => (
                    <span key={p} style={{ fontSize: 12, padding: "4px 10px", background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 9999, color: "#cbd5e1" }}>{p}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>How to Wear</p>
                <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>{gem.how_to_wear}</p>
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Best Day</p>
                <p style={{ fontSize: 13, color: "#cbd5e1", margin: 0 }}>{gem.best_day}</p>
              </div>
              <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, padding: "12px 14px" }}>
                <p style={{ fontSize: 12, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>⚠ Caution</p>
                <p style={{ fontSize: 13, color: "#e2e8f0", margin: 0, lineHeight: 1.5 }}>{gem.caution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Step Progress Bar ────────────────────────────────────────────
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 13, color: "#94a3b8" }}>Step {current} of {total}</span>
        <span style={{ fontSize: 13, color: "#a855f7" }}>{STEPS[current - 1].title}</span>
      </div>
      <div style={{ height: 3, background: "rgba(139,92,246,0.15)", borderRadius: 9999, overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", background: "linear-gradient(90deg, #7c3aed, #a855f7)", borderRadius: 9999 }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {STEPS.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-1">
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: `2px solid ${s.id < current ? "#a855f7" : s.id === current ? "#a855f7" : "rgba(139,92,246,0.25)"}`,
              background: s.id < current ? "linear-gradient(135deg,#7c3aed,#a855f7)" : s.id === current ? "rgba(168,85,247,0.15)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}>
              {s.id < current ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <span style={{ fontSize: 11, color: s.id === current ? "#a855f7" : "#475569", fontWeight: 400 }}>{s.id}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 1: Name + DOB ───────────────────────────────────────────
function Step1({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h2 className="display-md" style={{ color: "#f8f8ff", marginBottom: 8 }}>{STEPS[0].title}</h2>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 32 }}>{STEPS[0].subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label className="gem-label" htmlFor="name">Full Name</label>
          <input
            id="name" type="text" className="gem-input"
            placeholder="e.g. Arjun Sharma"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="gem-label" htmlFor="dob">Date of Birth</label>
          <input
            id="dob" type="date" className="gem-input"
            value={data.dob}
            onChange={(e) => onChange("dob", e.target.value)}
            style={{ colorScheme: "dark" }}
          />
          <p style={{ fontSize: 12, color: "#475569", marginTop: 6 }}>
            Your exact birth date is used to calculate your Vimshottari Dasha cycle.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Step 2: Birth time + place ───────────────────────────────────
function Step2({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h2 className="display-md" style={{ color: "#f8f8ff", marginBottom: 8 }}>{STEPS[1].title}</h2>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 32 }}>{STEPS[1].subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label className="gem-label" htmlFor="birthPlace">Birth Place</label>
          <input
            id="birthPlace" type="text" className="gem-input"
            placeholder="e.g. Mumbai, Maharashtra, India"
            value={data.birthPlace}
            onChange={(e) => onChange("birthPlace", e.target.value)}
          />
        </div>
        <div>
          <label className="gem-label" htmlFor="birthTime">
            Birth Time{" "}
            <span style={{ color: "#475569", fontSize: 12 }}>(optional but improves accuracy)</span>
          </label>
          <input
            id="birthTime" type="time" className="gem-input"
            value={data.birthTime}
            onChange={(e) => onChange("birthTime", e.target.value)}
            style={{ colorScheme: "dark" }}
          />
          <p style={{ fontSize: 12, color: "#475569", marginTop: 6 }}>
            Birth time helps calculate your Lagna (Ascendant) for a more precise reading.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Step 3: Zodiac ───────────────────────────────────────────────
function Step3({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h2 className="display-md" style={{ color: "#f8f8ff", marginBottom: 8 }}>{STEPS[2].title}</h2>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 24 }}>{STEPS[2].subtitle}</p>
      <div className="grid grid-cols-3 gap-3">
        {ZODIAC_SIGNS.map((z) => {
          const selected = data.zodiac === z.value;
          return (
            <button
              key={z.value}
              type="button"
              onClick={() => onChange("zodiac", z.value)}
              style={{
                padding: "14px 10px",
                background: selected ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${selected ? "rgba(168,85,247,0.6)" : "rgba(139,92,246,0.15)"}`,
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                boxShadow: selected ? "0 0 20px rgba(168,85,247,0.15)" : "none",
              }}
            >
              <span style={{ fontSize: 22 }}>{z.emoji}</span>
              <span style={{ fontSize: 11, color: selected ? "#c084fc" : "#94a3b8", textAlign: "center", lineHeight: 1.3 }}>
                {z.value.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Step 4: Concern ──────────────────────────────────────────────
function Step4({ data, onChange }: { data: FormData; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <h2 className="display-md" style={{ color: "#f8f8ff", marginBottom: 8 }}>{STEPS[3].title}</h2>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 24 }}>{STEPS[3].subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CONCERNS.map((c) => {
          const selected = data.concern === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange("concern", c.value)}
              style={{
                padding: "16px 20px",
                background: selected ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${selected ? "rgba(168,85,247,0.5)" : "rgba(139,92,246,0.12)"}`,
                borderRadius: 12,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 16,
                textAlign: "left",
                boxShadow: selected ? "0 0 20px rgba(168,85,247,0.1)" : "none",
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{c.emoji}</span>
              <div>
                <p style={{ fontSize: 15, color: selected ? "#f8f8ff" : "#cbd5e1", margin: 0, fontWeight: 400 }}>{c.label}</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>{c.desc}</p>
              </div>
              {selected && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" style={{ marginLeft: "auto", flexShrink: 0 }}>
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

// ── Main Component ───────────────────────────────────────────────
export default function RecommendationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: "", dob: "", birthTime: "", birthPlace: "", zodiac: "", concern: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (key: keyof FormData, value: string) =>
    setFormData((p) => ({ ...p, [key]: value }));

  // Per-step validation
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
        throw new Error(d.error ?? "Something went wrong.");
      }
      const data = await res.json();
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
    <section id="recommend" style={{ padding: "96px 24px" }}>
      <div className="max-w-2xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="planet-badge inline-flex mb-6" style={{ margin: "0 auto 24px" }}>
            ✨ Vedic Astrology + OpenRouter
          </div>
          <h2 className="display-xl" style={{ color: "#f8f8ff", marginBottom: 16 }}>
            Discover Your
            <span className="gradient-text"> Sacred Gemstone</span>
          </h2>
          <p style={{ fontSize: 16, color: "#94a3b8", maxWidth: 440, margin: "0 auto" }}>
            Answer four simple questions. Our Vedic engine and AI will reveal your perfect gemstones.
          </p>
        </div>

        {/* Form card */}
        {!result && (
          <div className="glass-card" style={{ padding: "40px" }}>
            <StepProgress current={step} total={4} />

            <AnimatePresence mode="wait">
              {step === 1 && <Step1 key="s1" data={formData} onChange={onChange} />}
              {step === 2 && <Step2 key="s2" data={formData} onChange={onChange} />}
              {step === 3 && <Step3 key="s3" data={formData} onChange={onChange} />}
              {step === 4 && <Step4 key="s4" data={formData} onChange={onChange} />}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.3)", borderRadius: 8, fontSize: 14, color: "#fca5a5" }}>
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="btn-ghost"
                style={{ opacity: step === 1 ? 0.3 : 1, pointerEvents: step === 1 ? "none" : "auto" }}
              >
                ← Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext()}
                  className="btn-primary"
                  style={{ opacity: canNext() ? 1 : 0.4, cursor: canNext() ? "pointer" : "not-allowed" }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canNext() || loading}
                  className="btn-primary"
                  style={{ opacity: canNext() && !loading ? 1 : 0.5, cursor: canNext() && !loading ? "pointer" : "not-allowed", minWidth: 180 }}
                >
                  {loading ? (
                    <><span className="spinner" style={{ width: 18, height: 18 }} /> Reading the stars…</>
                  ) : (
                    <>✨ Reveal My Gemstones</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <motion.div id="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Personal message */}
            <div className="glass-card" style={{ padding: "28px 32px", marginBottom: 32, borderColor: "rgba(168,85,247,0.3)", background: "rgba(124,58,237,0.06)" }}>
              <div className="flex items-start gap-4">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
                  🔮
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 400, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Your Personal Reading</p>
                  <p style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{result.personal_message}</p>
                </div>
              </div>
            </div>

            {/* Cards */}
            <h3 className="display-lg" style={{ color: "#f8f8ff", marginBottom: 24, textAlign: "center" }}>
              Your Recommended Gemstones
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {result.gemstones.map((gem, i) => (
                <GemstoneCard key={gem.name} gem={gem} index={i} />
              ))}
            </div>

            {/* Summary card */}
            <div className="glass-card" style={{ padding: "20px 24px", marginTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {[
                { label: "Rashi", value: result._meta?.profile?.rashi },
                { label: "Dasha Lord", value: result._meta?.profile?.dashaLord },
                { label: "Weak Planets", value: result._meta?.profile?.weakPlanets?.join(", ") },
              ].filter(i => i.value).map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{item.label}</p>
                  <p style={{ fontSize: 13, color: "#a855f7", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Reset */}
            <div className="flex justify-center mt-8">
              <button className="btn-ghost" onClick={() => { setResult(null); setError(null); setStep(1); setFormData({ name: "", dob: "", birthTime: "", birthPlace: "", zodiac: "", concern: "" }); }}>
                Start a New Reading
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
