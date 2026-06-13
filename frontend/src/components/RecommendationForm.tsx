"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getCdnUrl, cn } from "@/lib/utils";
import { Lens } from "@/components/ui/lens";

import { useCart } from "@/context/CartContext";


// --- Types --------------------------------------------------------
interface GemstoneResult {
  slug: string;
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
  { value: "Aries (Mesh)", emoji: "♈" },
  { value: "Taurus (Vrishabha)", emoji: "♉" },
  { value: "Gemini (Mithuna)", emoji: "♊" },
  { value: "Cancer (Karka)", emoji: "♋" },
  { value: "Leo (Simha)", emoji: "♌" },
  { value: "Virgo (Kanya)", emoji: "♍" },
  { value: "Libra (Tula)", emoji: "♎" },
  { value: "Scorpio (Vrischika)", emoji: "♏" },
  { value: "Sagittarius (Dhanu)", emoji: "♐" },
  { value: "Capricorn (Makara)", emoji: "♑" },
  { value: "Aquarius (Kumbha)", emoji: "♒" },
  { value: "Pisces (Meena)", emoji: "♓" },
];

const CONCERNS = [
  { value: "career", label: "Career & Ambition", emoji: "💼", desc: "Professional growth, recognition, leadership" },
  { value: "love", label: "Love & Relationships", emoji: "❤️", desc: "Romance, partnership, emotional bonds" },
  { value: "health", label: "Health & Vitality", emoji: "🌿", desc: "Physical energy, healing, wellness" },
  { value: "wealth", label: "Wealth & Prosperity", emoji: "💰", desc: "Financial growth, abundance, stability" },
  { value: "protection", label: "Protection & Safety", emoji: "🛡️", desc: "Negative energy protection, safety" },
  { value: "spiritual", label: "Spiritual Growth", emoji: "🔮", desc: "Enlightenment, intuition, inner peace" },
];

const GEMSTONE_CONFIG: Record<string, { color: string; image: string }> = {
  "Cat's Eye": {
    color: "#ca8a04",
    image: "1img0_Cat_sEye_composed_1080x.png"
  },
  "Pearl": {
    color: "#94a3b8",
    image: "1img0_Pearl_composed_1080x.png"
  },
  "White Pukhraj": {
    color: "#e2e8f0",
    image: "1img0_White_Pukhraj_composed_1080x.png"
  },
  "Ceylon Pukhraj": {
    color: "#fbbf24",
    image: "1img0_Ceylon_Pukhraj_composed_1080x.png"
  },
  "Peetambari Neelam": {
    color: "#8b5cf6",
    image: "1img0_Peetambari_Neelam_composed_1080x.png"
  },
  "Ceylon Neelam": {
    color: "#1d4ed8",
    image: "1img0_Ceylon_Neelam_composed_1080x.png"
  },
  "Neelam": {
    color: "#2563eb",
    image: "1img0_Neelam_composed_1080x.png"
  },
  "Emerald": {
    color: "#059669",
    image: "1img0_Emerald_composed_1080x.png"
  },
  "Burmese Ruby": {
    color: "#be123c",
    image: "1img0_Burmese_Ruby_composed_1080x.png"
  },
  "Ruby": {
    color: "#e11d48",
    image: "1img0_Ruby_composed_1080x.png"
  },
  "Australian Fire Opal": {
    color: "#38bdf8",
    image: "1img0_Australian_Fire_Opal_composed_1080x.png"
  },
  "Fire Opal": {
    color: "#f97316",
    image: "1img0_Fire_Opal_composed_1080x.png"
  },
  "Blue Topaz": {
    color: "#60a5fa",
    image: "1img0_Blue_Topaz_composed_1080x.png"
  },
  "White Topaz": {
    color: "#f1f5f9",
    image: "1img0_White_Topaz_composed_1080x.png"
  },
  "Natural Zircon": {
    color: "#e2e8f0",
    image: "1img0_Natural_Zircon_composed_1080x.png"
  },
  "Zirconia": {
    color: "#f8fafc",
    image: "1img0_Zirconia_composed_1080x.png"
  },
  "Garnet": {
    color: "#991b1b",
    image: "1img0_Garnet_composed_1080x.png"
  },
  "Lapis Lazuli": {
    color: "#1e3a8a",
    image: "1img0_Lapis_Lazuli_composed_1080x.png"
  },
  "Turquoise": {
    color: "#06b6d4",
    image: "1img0_Turquoise_composed_1080x.png"
  },
  "Moonstone": {
    color: "#e2e8f0",
    image: "1img0_Moonstone_composed_1080x.png"
  },
  "Amethyst": {
    color: "#7e22ce",
    image: "1img0_Amethyst_composed_1080x.png"
  },
  "Citrine": {
    color: "#eab308",
    image: "1img0_Citrine_composed_1080x.png"
  },
  "Tiger Eye": {
    color: "#a16207",
    image: "1img0_Tiger_Eye_composed_1080x.png"
  },
  "African Ruby": {
    color: "#9f1239",
    image: "1img0_African_Ruby_composed_1080x.png"
  },
};

function getGemstoneConfig(name: string) {
  if (GEMSTONE_CONFIG[name]) return GEMSTONE_CONFIG[name];
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(GEMSTONE_CONFIG)) {
    if (key.toLowerCase() === lowerName || lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return value;
    }
  }
  return {
    color: "#a855f7",
    image: "1img0_Natural_Zircon_composed_1080x.png"
  };
}

function getSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ── SVGs for Beams and Rays from Aceternity Lens ────────────────────

const Beams = () => {
  return (
    <svg
      width="380"
      height="315"
      viewBox="0 0 380 315"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
    >
      <g filter="url(#filter0_f_120_7473)">
        <circle cx="34" cy="52" r="114" fill="#6925E7" />
      </g>
      <g filter="url(#filter1_f_120_7473)">
        <circle cx="332" cy="24" r="102" fill="#8A4BFF" />
      </g>
      <g filter="url(#filter2_f_120_7473)">
        <circle cx="191" cy="53" r="102" fill="#802FE3" />
      </g>
      <defs>
        <filter
          id="filter0_f_120_7473"
          x="-192"
          y="-174"
          width="452"
          height="452"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="56"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
        <filter
          id="filter1_f_120_7473"
          x="70"
          y="-238"
          width="524"
          height="524"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
        <filter
          id="filter2_f_120_7473"
          x="-71"
          y="-209"
          width="524"
          height="524"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="80"
            result="effect1_foregroundBlur_120_7473"
          />
        </filter>
      </defs>
    </svg>
  );
};

const Rays = ({ className }: { className?: string }) => {
  return (
    <svg
      width="380"
      height="397"
      viewBox="0 0 380 397"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute left-0 top-0 pointer-events-none z-[1] opacity-70",
        className
      )}
    >
      <g filter="url(#filter0_f_120_7480)">
        <path
          d="M-37.4202 -76.0163L-18.6447 -90.7295L242.792 162.228L207.51 182.074L-37.4202 -76.0163Z"
          fill="url(#paint0_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        opacity="0.3"
        filter="url(#filter1_f_120_7480)"
      >
        <path
          d="M-109.54 -36.9027L-84.2903 -58.0902L178.786 193.228L132.846 223.731L-109.54 -36.9027Z"
          fill="url(#paint1_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        opacity="0.86"
        filter="url(#filter2_f_120_7480)"
      >
        <path
          d="M-100.647 -65.795L-69.7261 -92.654L194.786 157.229L139.51 197.068L-100.647 -65.795Z"
          fill="url(#paint2_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        opacity="0.31"
        filter="url(#filter3_f_120_7480)"
      >
        <path
          d="M163.917 -89.0982C173.189 -72.1354 80.9618 2.11525 34.7334 30.1553C-11.495 58.1954 -106.505 97.514 -115.777 80.5512C-125.048 63.5885 -45.0708 -3.23233 1.15763 -31.2724C47.386 -59.3124 154.645 -106.061 163.917 -89.0982Z"
          fill="#8A50FF"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        filter="url(#filter4_f_120_7480)"
      >
        <path
          d="M34.2031 13.2222L291.721 269.534"
          stroke="url(#paint3_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        filter="url(#filter5_f_120_7480)"
      >
        <path
          d="M41 -40.9331L298.518 215.378"
          stroke="url(#paint4_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        filter="url(#filter6_f_120_7480)"
      >
        <path
          d="M61.3691 3.8999L317.266 261.83"
          stroke="url(#paint5_linear_120_7480)"
        />
      </g>
      <g
        style={{ mixBlendMode: "plus-lighter" }}
        filter="url(#filter7_f_120_7480)"
      >
        <path
          d="M-1.46191 9.06348L129.458 145.868"
          stroke="url(#paint6_linear_120_7480)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_120_7480"
          x="-49.4199"
          y="-102.729"
          width="304.212"
          height="296.803"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="6"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter1_f_120_7480"
          x="-115.54"
          y="-64.0903"
          width="300.326"
          height="293.822"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter2_f_120_7480"
          x="-111.647"
          y="-103.654"
          width="317.434"
          height="311.722"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="5.5"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter3_f_120_7480"
          x="-212.518"
          y="-188.71"
          width="473.085"
          height="369.366"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="48"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter4_f_120_7480"
          x="25.8447"
          y="4.84521"
          width="274.234"
          height="273.065"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="6"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter5_f_120_7480"
          x="32.5312"
          y="-49.3364"
          width="274.455"
          height="273.182"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="6"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter6_f_120_7480"
          x="53.011"
          y="-4.45825"
          width="272.613"
          height="274.346"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter7_f_120_7480"
          x="-10.366"
          y="0.159668"
          width="148.728"
          height="154.613"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4.5"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <linearGradient
          id="paint0_linear_120_7480"
          x1="-18.6447"
          y1="-90.7295"
          x2="229.897"
          y2="175.762"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0" />
          <stop offset="0.54" stopColor="#A855F7" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_120_7480"
          x1="-84.2903"
          y1="-58.0902"
          x2="166.195"
          y2="207.288"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0" />
          <stop offset="0.54" stopColor="#A855F7" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_120_7480"
          x1="-69.7261"
          y1="-92.654"
          x2="181.879"
          y2="170.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0" />
          <stop offset="0.54" stopColor="#A855F7" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_120_7480"
          x1="34.2031"
          y1="13.2222"
          x2="291.721"
          y2="269.534"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#E2CBFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_120_7480"
          x1="41.0001"
          y1="-40.9331"
          x2="298.518"
          y2="215.378"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#E2CBFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_120_7480"
          x1="61.3691"
          y1="3.8999"
          x2="317.266"
          y2="261.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" stopOpacity="0.4" />
          <stop offset="1" stopColor="#E2CBFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_120_7480"
          x1="-1.46191"
          y1="9.06348"
          x2="129.458"
          y2="145.868"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#E2CBFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

function RecommendedGemstoneGridCard({ gem, index }: { gem: GemstoneResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const config = getGemstoneConfig(gem.name);
  const color = config.color;
  const image = config.image;
  // Use the slug provided directly by the AI (guaranteed to be a valid platform slug)
  const slug = gem.slug || getSlugFromName(gem.name); // fallback just in case

  return (
    <Lens>
      <div
        className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#120f22] to-[#07050e] p-6 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300 h-full flex flex-col justify-between"
        style={{
          boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px ${color}05`,
        }}
      >
        <Rays />
        <Beams />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                #{index + 1} Recommended
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1.5 rounded border"
                style={{
                  background: `${color}10`,
                  color: color,
                  borderColor: `${color}25`,
                }}
              >
                {gem.planet}
              </span>
            </div>

            {/* Image Container */}
            <div className="w-full h-80 rounded-2xl flex items-center justify-center overflow-hidden mb-6 shadow-inner bg-[#0d0a1b]/50">
              <img
                src={getCdnUrl(image)}
                alt={gem.name}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Title & Sanskrit */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-light text-[#f8f8ff] tracking-tight group-hover:text-purple-300 transition-colors">
                {gem.name}
              </h2>
              <span className="text-xs text-slate-400 font-light italic">
                {gem.sanskrit}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light italic mb-4">
              &ldquo;{gem.tagline}&rdquo;
            </p>

            {/* Personalized Why Recommended Box */}
            <div
              className="rounded-xl p-4 mb-4 border text-left"
              style={{
                background: `${color}06`,
                borderColor: `${color}18`,
              }}
            >
              <p className="text-[10px] font-medium text-purple-400 uppercase tracking-widest mb-1">
                Why this gemstone
              </p>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {gem.why_recommended}
              </p>
            </div>
          </div>

          <div>
            {/* Expand toggle for details */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
              }}
              className="p-0 h-auto font-normal hover:bg-transparent flex items-center gap-1 hover:text-[#f8f8ff] transition-colors mb-4 cursor-pointer"
              style={{ color }}
            >
              {expanded ? "Show less info" : "View wear instructions"}
              <svg
                className="w-3.5 h-3.5 transition-transform duration-250 animate-duration-200"
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
                  className="overflow-hidden text-left"
                >
                  <div className="pt-4 flex flex-col gap-4 border-t border-purple-500/10 mb-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1.5">Properties</p>
                      <div className="flex flex-wrap gap-1.5">
                        {gem.properties.map((p) => (
                          <Badge
                            key={p}
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 rounded-full text-slate-300 border-slate-700/50"
                            style={{ background: `${color}06`, borderColor: `${color}18` }}
                          >
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">How to Wear</p>
                      <p className="text-xs text-slate-350 font-light leading-relaxed">{gem.how_to_wear}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mb-1">Best Day</p>
                      <p className="text-xs text-slate-350 font-light leading-relaxed">{gem.best_day}</p>
                    </div>
                    <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-3 flex flex-col gap-1">
                      <p className="text-[10px] text-amber-400 uppercase tracking-widest font-medium">⚠ Caution</p>
                      <p className="text-xs text-slate-350 font-light leading-relaxed">{gem.caution}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View full details Link (to slug page) */}
            <Link
              href={`/gemstones/${slug}`}
              className="flex items-center gap-1 text-xs font-normal transition-opacity duration-300 group-hover:opacity-100 opacity-80 no-underline cursor-pointer"
              style={{ color }}
            >
              Order & View full details
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Lens>
  );
}

const STEPS = [
  { id: 1, title: "About You", subtitle: "Let's start with your name and when you were born." },
  { id: 2, title: "Birth Details", subtitle: "Where and when exactly were you born?" },
  { id: 3, title: "Your Sign", subtitle: "Select your Vedic Moon sign (Rashi)." },
  { id: 4, title: "Your Focus", subtitle: "What area of life do you want guidance on?" },
];

// --- Gemstone Card ------------------------------------------------
function GemstoneCard({ gem, index }: { gem: GemstoneResult; index: number }) {
  const { addItem } = useCart();
  const [expanded, setExpanded] = useState(false);
  const config = getGemstoneConfig(gem.name);
  const color = config.color;
  const image = config.image;

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
          className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center shadow-md overflow-hidden"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
            boxShadow: `0 0 15px ${color}35`,
          }}
        >
          <img
            src={getCdnUrl(image)}
            alt={gem.name}
            className="w-10 h-10 object-contain p-0.5 transition-transform duration-300 group-hover:scale-110"
          />
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

      {/* Action Row containing expand toggle and Add to Cart button */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-purple-500/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="p-0 h-auto font-normal hover:bg-transparent flex items-center gap-1 hover:text-[#f8f8ff] transition-colors cursor-pointer"
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

        <Button
          onClick={() => {
            addItem({
              id: `${gem.name}-5`,
              name: gem.name,
              ratti: 5,
              quantity: 1,
              pricePerRatti: 1800, // Premium standard rate
              image: getCdnUrl(image),
              planet: gem.planet,
              color: color
            });
          }}
          className="rounded-full bg-purple-950/40 hover:bg-purple-900 border border-purple-500/30 text-purple-200 px-5 py-2.5 text-xs font-medium transition-all cursor-pointer hover:border-purple-500/60"
        >
          Add 5 Ratti to Cart
        </Button>
      </div>

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
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {ZODIAC_SIGNS.map((z) => {
          const selected = data.zodiac === z.value;
          return (
            <button
              key={z.value}
              type="button"
              onClick={() => onChange("zodiac", z.value)}
              className={`p-4 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/30 ${selected
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
              className={`p-5 rounded-xl border flex items-center gap-5 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500/30 text-left ${selected
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
export default function RecommendationForm({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ name: "", dob: "", birthTime: "", birthPlace: "", zodiac: "", concern: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn, getToken } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

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

    if (!isSignedIn) {
      try {
        localStorage.setItem("gemly_pending_recommendation", JSON.stringify(formData));
      } catch (err) {
        console.error("Failed to save pending recommendation:", err);
      }
      setShowAuthPrompt(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
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

  useEffect(() => {
    if (isSignedIn && !result && !loading) {
      const pending = localStorage.getItem("gemly_pending_recommendation");
      if (pending) {
        localStorage.removeItem("gemly_pending_recommendation");
        const parsedData = JSON.parse(pending);
        setFormData(parsedData);

        (async () => {
          setLoading(true);
          setError(null);
          setResult(null);
          setShowAuthPrompt(false);
          try {
            const token = await getToken();
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/recommend`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(parsedData),
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
        })();
      }
    }
  }, [isSignedIn, result, loading, getToken]);

  return (
    <section id="recommend" className={isEmbedded ? "w-full relative z-10 p-0" : "py-24 px-6 relative overflow-hidden"}>
      {!isEmbedded && <div className="aura-glow w-[400px] h-[400px] bg-purple-600/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />}
      <div className={isEmbedded ? "w-full relative z-10" : "max-w-7xl mx-auto z-10 relative"}>
        {/* Section heading */}
        {!isEmbedded && (
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
        )}

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
                {showAuthPrompt ? (
                  <motion.div
                    key="auth-prompt"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/5 flex items-center justify-center border border-purple-500/10 mb-4 animate-pulse">
                      <Sparkles className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-lg font-light text-slate-100 mb-2">Almost There!</h3>
                    <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed mb-6">
                      Your cosmic gemstone reading is ready to be written. Sign in to your account to calculate and view your gemstone recommendation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <SignInButton mode="modal">
                        <Button className="btn-celestial px-8 py-5 rounded-full text-xs font-semibold text-white tracking-wide transition-all duration-300 cursor-pointer">
                          Sign In / Register
                        </Button>
                      </SignInButton>
                      <Button
                        variant="outline"
                        onClick={() => setShowAuthPrompt(false)}
                        className="rounded-full border-purple-500/30 bg-transparent text-slate-400 hover:text-[#f8f8ff] hover:bg-purple-500/10 hover:border-purple-500/65 px-8 py-5 text-xs transition-all duration-300 cursor-pointer"
                      >
                        Edit Details
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {step === 1 && <Step1 key="s1" data={formData} onChange={onChange} />}
                    {step === 2 && <Step2 key="s2" data={formData} onChange={onChange} />}
                    {step === 3 && <Step3 key="s3" data={formData} onChange={onChange} />}
                    {step === 4 && <Step4 key="s4" data={formData} onChange={onChange} />}
                  </>
                )}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs md:text-sm text-rose-300 leading-relaxed">
                  {error}
                </div>
              )}

              {/* Navigation */}
              {!showAuthPrompt && (
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
              )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {result.gemstones.map((gem, i) => (
                <RecommendedGemstoneGridCard key={gem.name} gem={gem} index={i} />
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
