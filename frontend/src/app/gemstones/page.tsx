import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lens } from "@/components/ui/lens";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gemstone Encyclopedia",
  description:
    "Explore our complete encyclopedia of Vedic gemstones — their ruling planets, properties, and astrological significance.",
};

const GEMSTONES = [
  {
    slug: "cats-eye",
    name: "Cat's Eye",
    sanskrit: "Lehsuniya",
    planet: "Ketu",
    color: "#ca8a04",
    tagline: "Spiritual liberation, intuition, and Ketu's mystical power.",
    properties: ["Intuition", "Spirituality", "Liberation", "Protection"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats",
    metal: "Gold or Silver",
    finger: "Little finger",
    day: "Thursday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Cat_sEye_composed_1080x.png",
  },
  {
    slug: "pearl",
    name: "Pearl",
    sanskrit: "Moti",
    planet: "Moon",
    color: "#94a3b8",
    tagline: "Emotional balance, intuition, and lunar grace.",
    properties: ["Calm", "Intuition", "Relationships", "Memory"],
    rashi: ["Cancer", "Scorpio", "Pisces"],
    weight: "4–6 carats",
    metal: "Silver",
    finger: "Little finger",
    day: "Monday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Pearl_composed_1080x.png",
  },
  {
    slug: "white-pukhraj",
    name: "White Pukhraj",
    sanskrit: "Shwet Pukhraj",
    planet: "Venus",
    color: "#e2e8f0",
    tagline: "Vedic alternative to Diamond, invoking Venusian luxury and creative harmony.",
    properties: ["Luxury", "Creativity", "Beauty", "Relationships"],
    rashi: ["Taurus", "Libra"],
    weight: "3–5 carats",
    metal: "White Gold or Silver",
    finger: "Ring or Middle finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_White_Pukhraj_composed_1080x.png",
  },
  {
    slug: "ceylon-pukhraj",
    name: "Ceylon Pukhraj",
    sanskrit: "Ceylon Pukhraj",
    planet: "Jupiter",
    color: "#fbbf24",
    tagline: "Premium Sri Lankan Yellow Sapphire for wisdom, health, and prosperity.",
    properties: ["Wisdom", "Wealth", "Divine Grace", "Good Fortune"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "3–6 carats",
    metal: "Gold",
    finger: "Index finger",
    day: "Thursday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_CeylonPukhraj_composed_1080x.png",
  },
  {
    slug: "peetambari-neelam",
    name: "Peetambari Neelam",
    sanskrit: "Peetambari",
    planet: "Jupiter & Saturn",
    color: "#8b5cf6",
    tagline: "Rare bi-color sapphire combining the forces of Jupiter and Saturn.",
    properties: ["Balance", "Karmic Justice", "Wealth", "Discernment"],
    rashi: ["Capricorn", "Aquarius", "Sagittarius", "Pisces"],
    weight: "3–5 carats",
    metal: "Gold or Panchdhatu",
    finger: "Middle finger",
    day: "Thursday or Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Peetambari_Neelam_composed_1080x.png",
  },
  {
    slug: "ceylon-neelam",
    name: "Ceylon Neelam",
    sanskrit: "Ceylon Neelam",
    planet: "Saturn",
    color: "#1d4ed8",
    tagline: "High-grade Sri Lankan Blue Sapphire for instant karmic elevation.",
    properties: ["Focus", "Karmic Cleansing", "Success", "Protection"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats",
    metal: "Silver or Gold",
    finger: "Middle finger",
    day: "Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_CeylonNeelam_composed_1080x.png",
  },
  {
    slug: "neelam",
    name: "Neelam",
    sanskrit: "Neelam",
    planet: "Saturn",
    color: "#2563eb",
    tagline: "The enforcer of Saturn's discipline and success.",
    properties: ["Discipline", "Justice", "Protection", "Focus"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "3–5 carats",
    metal: "Silver or Panchdhatu",
    finger: "Middle finger",
    day: "Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Neelam_composed_1080x.png",
  },
  {
    slug: "emerald",
    name: "Emerald",
    sanskrit: "Panna",
    planet: "Mercury",
    color: "#059669",
    tagline: "Intelligence, communication, and Mercury's brilliance.",
    properties: ["Intelligence", "Creativity", "Business", "Communication"],
    rashi: ["Gemini", "Virgo"],
    weight: "3–5 carats",
    metal: "Gold",
    finger: "Little finger",
    day: "Wednesday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Emerald_composed_1080x.png",
  },
  {
    slug: "burmese-ruby",
    name: "Burmese Ruby",
    sanskrit: "Burma Manikya",
    planet: "Sun",
    color: "#be123c",
    tagline: "Ultra-premium Burmese Ruby for maximum solar power and vitality.",
    properties: ["Royal Status", "Self-Expression", "Vitality", "Authority"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "2–4 carats",
    metal: "Gold",
    finger: "Ring finger",
    day: "Sunday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Burmese_Ruby_composed_1080x.png",
  },
  {
    slug: "ruby",
    name: "Ruby",
    sanskrit: "Manikya",
    planet: "Sun",
    color: "#e11d48",
    tagline: "The stone of kings, solar vitality, and divine authority.",
    properties: ["Leadership", "Confidence", "Vitality", "Success"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats",
    metal: "Gold",
    finger: "Ring finger",
    day: "Sunday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Ruby_composed_1080x.png",
  },
  {
    slug: "australian-fire-opal",
    name: "Australian Fire Opal",
    sanskrit: "Opal",
    planet: "Venus",
    color: "#38bdf8",
    tagline: "Exquisite Australian Opal representing luxury, glamour, and beauty.",
    properties: ["Glamour", "Love", "Luxury", "Creative Mastery"],
    rashi: ["Taurus", "Libra"],
    weight: "5–8 carats",
    metal: "Silver or White Gold",
    finger: "Ring or Index finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Australian_Fire_Opal_composed_1080x.png",
  },
  {
    slug: "fire-opal",
    name: "Fire Opal",
    sanskrit: "Opal",
    planet: "Venus",
    color: "#f97316",
    tagline: "The fiery stone of artistic inspiration and marital bliss.",
    properties: ["Passion", "Aesthetics", "Relationships", "Joy"],
    rashi: ["Taurus", "Libra"],
    weight: "4–7 carats",
    metal: "Silver",
    finger: "Ring finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Fire_Opal_composed_1080x.png",
  },
  {
    slug: "blue-topaz",
    name: "Blue Topaz",
    sanskrit: "Pushparag Uparatna",
    planet: "Jupiter",
    color: "#60a5fa",
    tagline: "A peaceful substitute for Pukhraj to enhance communication and wisdom.",
    properties: ["Intellect", "Communication", "Mental Peace", "Learning"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "5–10 carats",
    metal: "Silver",
    finger: "Index or Middle finger",
    day: "Thursday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Blue_Topaz_composed_1080x.png",
  },
  {
    slug: "white-topaz",
    name: "White Topaz",
    sanskrit: "Dantur",
    planet: "Venus",
    color: "#f1f5f9",
    tagline: "Clear cosmic substitute for Venusian energy and creative clarity.",
    properties: ["Clarity", "Creative Flow", "Harmony", "Vitality"],
    rashi: ["Taurus", "Libra"],
    weight: "5–8 carats",
    metal: "Silver",
    finger: "Ring finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_White_Topaz_composed_1080x.png",
  },
  {
    slug: "natural-zircon",
    name: "Natural Zircon",
    sanskrit: "Zircon",
    planet: "Venus",
    color: "#e2e8f0",
    tagline: "Ancient, highly refractive alternative to Diamond for wealth and glamour.",
    properties: ["Magnetic Aura", "Material Wealth", "Happiness", "Arts"],
    rashi: ["Taurus", "Libra"],
    weight: "4–7 carats",
    metal: "Silver",
    finger: "Ring finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Natural_Zircon_composed_1080x.png",
  },
  {
    slug: "zirconia",
    name: "Zirconia",
    sanskrit: "Kritrim Diamond",
    planet: "Venus (Substitute)",
    color: "#f8fafc",
    tagline: "Affordable modern alternative for channeling light Venusian vibes.",
    properties: ["Aesthetic appeal", "Youthfulness", "Modern Luck", "Lightness"],
    rashi: ["Taurus", "Libra"],
    weight: "4–8 carats",
    metal: "Silver",
    finger: "Middle or Ring finger",
    day: "Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Zirconia_composed_1080x.png",
  },
  {
    slug: "garnet",
    name: "Garnet",
    sanskrit: "Tamra",
    planet: "Rahu",
    color: "#991b1b",
    tagline: "Grounding protection, ambition, and Rahu's drive.",
    properties: ["Energy", "Rahu Protection", "Root Healing", "Fame"],
    rashi: ["Aquarius", "Taurus", "Libra"],
    weight: "4–8 carats",
    metal: "Silver",
    finger: "Middle finger",
    day: "Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Garnet_composed_1080x.png",
  },
  {
    slug: "lapis-lazuli",
    name: "Lapis Lazuli",
    sanskrit: "Rajavarta",
    planet: "Saturn (Uparatna)",
    color: "#1e3a8a",
    tagline: "The royal blue stone of inner truth, wisdom, and Saturnian protection.",
    properties: ["Truth", "Third Eye", "Protection", "Wisdom"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "6–10 carats",
    metal: "Silver",
    finger: "Middle finger",
    day: "Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Lapis_Lazuli_composed_1080x.png",
  },
  {
    slug: "turquoise",
    name: "Turquoise",
    sanskrit: "Firoza",
    planet: "Jupiter & Venus",
    color: "#06b6d4",
    tagline: "The legendary talisman of travel safety, health, and spiritual growth.",
    properties: ["Protection", "Healing", "Wealth", "Travel Safety"],
    rashi: ["Sagittarius", "Pisces", "Taurus", "Libra"],
    weight: "5–10 carats",
    metal: "Silver",
    finger: "Ring or Little finger",
    day: "Thursday or Friday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Turquoise_composed_1080x.png",
  },
  {
    slug: "moonstone",
    name: "Moonstone",
    sanskrit: "Chandrakant Mani",
    planet: "Moon (Uparatna)",
    color: "#e2e8f0",
    tagline: "The glowing lunar gem for emotional balance and divine feminine energy.",
    properties: ["Calm", "Feminine Energy", "Intuition", "Sleep"],
    rashi: ["Cancer"],
    weight: "5–8 carats",
    metal: "Silver",
    finger: "Little finger",
    day: "Monday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Moonstone_composed_1080x.png",
  },
  {
    slug: "amethyst",
    name: "Amethyst",
    sanskrit: "Katela",
    planet: "Saturn (Uparatna)",
    color: "#7e22ce",
    tagline: "The stone of spiritual sobriety, meditative peace, and Saturn's grace.",
    properties: ["Sobriety", "Intuition", "Calmness", "Spiritual Growth"],
    rashi: ["Capricorn", "Aquarius"],
    weight: "4–8 carats",
    metal: "Silver",
    finger: "Middle finger",
    day: "Saturday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Amethyst_composed_1080x.png",
  },
  {
    slug: "citrine",
    name: "Citrine",
    sanskrit: "Sunela",
    planet: "Jupiter (Uparatna)",
    color: "#eab308",
    tagline: "The merchant's stone of wealth, optimism, and solar plexus energy.",
    properties: ["Abundance", "Confidence", "Optimism", "Mental Focus"],
    rashi: ["Sagittarius", "Pisces"],
    weight: "4–8 carats",
    metal: "Gold or Silver",
    finger: "Index finger",
    day: "Thursday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Citrine_composed_1080x.png",
  },
  {
    slug: "tiger-eye",
    name: "Tiger Eye",
    sanskrit: "Tiger Eye",
    planet: "Sun & Mars",
    color: "#a16207",
    tagline: "Courage, grounding focus, and absolute self-confidence.",
    properties: ["Willpower", "Protection", "Action", "Vitality"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "6–10 carats",
    metal: "Panchdhatu or Silver",
    finger: "Ring or Middle finger",
    day: "Sunday or Tuesday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_Tiger_Eye_composed_1080x.png",
  },
  {
    slug: "african-ruby",
    name: "African Ruby",
    sanskrit: "African Manikya",
    planet: "Sun",
    color: "#9f1239",
    tagline: "Deep, grounding African Ruby for leadership, courage, and vitality.",
    properties: ["Leadership", "Vitality", "Confidence", "Action"],
    rashi: ["Leo", "Aries", "Scorpio"],
    weight: "3–6 carats",
    metal: "Gold",
    finger: "Ring finger",
    day: "Sunday",
    image: "https://humarapandit.com/cdn/shop/files/1img0_African_Ruby_composed_1080x.png",
  }
];

export default function GemstonesPage() {
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
              Ratna Shastra Encyclopedia
            </Badge>
            <h1 className="display-xl text-[#f8f8ff] mb-6 font-light">
              Vedic & Cosmic
              <span className="gradient-text font-medium"> Gemstones</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              Explore the complete collection of sacred gemstones.
              Each one a channel for specific planetary energies.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 py-10 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GEMSTONES.map((gem) => (
                <Lens key={gem.slug}>
                  <Link
                    href={`/gemstones/${gem.slug}`}
                    className="no-underline group h-full block relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#120f22] to-[#07050e] p-6 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300"
                    style={{
                      boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 0 25px ${gem.color}05`,
                    }}
                  >
                    <Rays />
                    <Beams />

                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        {/* Image Container */}
                        <div
                          className="w-full h-48 rounded-2xl flex items-center justify-center overflow-hidden mb-6 shadow-inner"
                        // style={{
                        //   background: `radial-gradient(circle at 35% 35%, ${gem.color}33, ${gem.color}11)`,
                        //   border: `1px solid ${gem.color}15`,
                        // }}
                        >
                          <img
                            src={gem.image}
                            alt={gem.name}
                            className="transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Planet and Sanskrit Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded border"
                            style={{
                              background: `${gem.color}10`,
                              color: gem.color,
                              borderColor: `${gem.color}25`,
                            }}
                          >
                            {gem.planet}
                          </span>
                          <span className="text-xs text-slate-400 font-light italic">
                            {gem.sanskrit}
                          </span>
                        </div>

                        {/* Title and Tagline */}
                        <h2 className="text-xl font-light text-[#f8f8ff] mb-2 tracking-tight group-hover:text-purple-300 transition-colors">
                          {gem.name}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light italic mb-6">
                          "{gem.tagline}"
                        </p>
                      </div>

                      <div>
                        {/* Properties Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {gem.properties.slice(0, 3).map((p) => (
                            <span
                              key={p}
                              className="text-[10px] px-2 py-0.5 rounded-full text-slate-300 border border-slate-755/50"
                              style={{
                                background: `${gem.color}08`,
                                borderColor: `${gem.color}20`,
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* View full details Link */}
                        <div
                          className="flex items-center gap-1 text-xs font-normal transition-opacity duration-300 group-hover:opacity-100 opacity-80"
                          style={{ color: gem.color }}
                        >
                          View full details
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Lens>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 text-center">
          <div className="max-w-xl mx-auto">
            <Card className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md">
              <CardContent className="p-10">
                <h2 className="display-lg text-[#f8f8ff] mb-3 font-light">
                  Which one is yours?
                </h2>
                <p className="text-sm md:text-base text-slate-400 font-light mb-8">
                  Don't guess — let your birth chart and AI determine your perfect gemstone.
                </p>
                <Button
                  render={<Link href="/#recommend" />}
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] text-white border-0 px-8 py-6 text-sm md:text-base shadow-[0_0_30px_rgba(124,58,237,0)] hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] transition-all duration-300"
                >
                  Get My Personalized Reading
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
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
            stdDeviation="4"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter5_f_120_7480"
          x="32.6416"
          y="-49.3101"
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
            stdDeviation="4"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter6_f_120_7480"
          x="54.0078"
          y="-3.47461"
          width="270.619"
          height="272.68"
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
            stdDeviation="3.5"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <filter
          id="filter7_f_120_7480"
          x="-9.2002"
          y="1.32812"
          width="146.396"
          height="152.275"
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
            stdDeviation="3.5"
            result="effect1_foregroundBlur_120_7480"
          />
        </filter>
        <linearGradient
          id="paint0_linear_120_7480"
          x1="-57.5042"
          y1="-134.741"
          x2="403.147"
          y2="351.523"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.214779" stopColor="#AF53FF" />
          <stop offset="0.781583" stopColor="#B253FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_120_7480"
          x1="-122.154"
          y1="-103.098"
          x2="342.232"
          y2="379.765"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.214779" stopColor="#AF53FF" />
          <stop offset="0.781583" stopColor="#9E53FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_120_7480"
          x1="-106.717"
          y1="-138.534"
          x2="359.545"
          y2="342.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.214779" stopColor="#9D53FF" />
          <stop offset="0.781583" stopColor="#A953FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_120_7480"
          x1="72.701"
          y1="54.347"
          x2="217.209"
          y2="187.221"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AF81FF" />
          <stop offset="1" stopColor="#C081FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_120_7480"
          x1="79.4978"
          y1="0.191681"
          x2="224.006"
          y2="133.065"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AF81FF" />
          <stop offset="1" stopColor="#C081FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_120_7480"
          x1="79.6568"
          y1="21.8377"
          x2="234.515"
          y2="174.189"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B981FF" />
          <stop offset="1" stopColor="#CF81FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_120_7480"
          x1="16.119"
          y1="27.6966"
          x2="165.979"
          y2="184.983"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A981FF" />
          <stop offset="1" stopColor="#CB81FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
