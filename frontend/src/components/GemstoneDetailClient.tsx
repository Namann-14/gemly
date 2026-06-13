"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  GitCompare, 
  HelpCircle, 
  Minus, 
  Plus, 
  ShoppingCart,
  ChevronDown,
  Sparkles,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Gemstone {
  name: string;
  sanskrit: string;
  planet: string;
  color: string;
  tagline: string;
  properties: string[];
  rashi: string[];
  weight: string;
  metal: string;
  finger: string;
  day: string;
  description: string;
  caution: string;
  howToWear: string;
  images: string[];
  basePricePerRatti: number;
}

export default function GemstoneDetailClient({ gem }: { gem: Gemstone }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedRatti, setSelectedRatti] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<string | null>("benefits");

  // Format currency
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  // Dynamic pricing
  const discountedPrice = gem.basePricePerRatti * selectedRatti * quantity;
  const originalPrice = Math.round(discountedPrice * 1.35);

  const rattiSizes = Array.from({ length: 10 }, (_, i) => i + 3); // 3 to 12 Ratti

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-6xl mx-auto z-10 relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-light">
        <Link href="/" className="hover:text-purple-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/gemstones" className="hover:text-purple-300 transition-colors">Gemstones</Link>
        <span>/</span>
        <span className="text-slate-300">{gem.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Image Gallery */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <div 
            className="w-full aspect-square rounded-3xl overflow-hidden relative border border-purple-500/10 flex items-center justify-center bg-[#0d0a1b]"
            style={{
              boxShadow: `0 20px 50px -20px rgba(0, 0, 0, 0.8), 0 0 40px ${gem.color}07`,
            }}
          >
            {/* Main Display Image */}
            <motion.img
              key={activeImgIdx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={gem.images[activeImgIdx]}
              alt={gem.name}
              className="w-full h-full object-contain p-4"
            />
            {/* Zoom Icon indicator */}
            <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white/80 cursor-pointer hover:bg-black/60 transition-colors">
              <Sparkles size={15} />
            </div>
            {/* Planet Tag overlay */}
            <div className="absolute top-4 right-4">
              <span 
                className="text-[9px] font-medium uppercase tracking-widest px-2.5 py-1 rounded bg-black/45 border backdrop-blur-md"
                style={{ color: gem.color, borderColor: `${gem.color}33` }}
              >
                {gem.planet}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 mt-1 justify-center">
            {gem.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border bg-[#0d0a1b] p-1 transition-all duration-300 cursor-pointer ${
                  activeImgIdx === idx 
                    ? "border-purple-500 scale-[1.03] shadow-[0_0_15px_rgba(168,85,247,0.25)]" 
                    : "border-purple-500/10 opacity-60 hover:opacity-100 hover:border-purple-500/30"
                }`}
              >
                <img src={img} alt={`${gem.name} ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light text-[#f8f8ff] tracking-tight mb-2">
              {gem.name}
            </h1>
            <p className="text-sm text-slate-400 font-light italic mb-4">
              Sanskrit: {gem.sanskrit} · Ruling Planet: {gem.planet}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-4 mt-2">
              <span className="text-2xl font-light text-purple-300">
                {formatINR(discountedPrice)}
              </span>
              <span className="text-base text-slate-500 line-through font-light">
                {formatINR(originalPrice)}
              </span>
              <Badge className="bg-rose-500/10 border-rose-500/20 text-rose-400 font-normal text-[10px] tracking-wider px-2 py-0.5 uppercase">
                Save 35%
              </Badge>
            </div>

            {/* Stock indicator */}
            <div className="flex flex-col gap-1.5 mb-2">
              <span className="text-[11px] text-[#4ade80] font-normal tracking-wide">In stock</span>
              <div className="w-full max-w-xs h-[3px] bg-purple-500/10 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-emerald-500 to-green-400" />
              </div>
            </div>
          </div>

          <Separator className="bg-purple-500/10" />

          {/* Size Selectors (Ratti) */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-light">
              Size: <strong className="text-purple-300 font-medium">{selectedRatti} Ratti</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {rattiSizes.map((size) => {
                const active = selectedRatti === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedRatti(size)}
                    className={`min-w-[54px] px-3.5 py-2.5 rounded-lg border text-xs font-light tracking-wide transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-purple-500/15 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                        : "bg-white/[0.015] border-purple-500/10 hover:border-purple-500/30 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {size} Ratti
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col gap-3">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-light">Quantity</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-purple-500/10 bg-white/[0.015] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-400 hover:text-[#f8f8ff] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Minus size={12} />
                </button>
                <span className="w-10 text-center text-sm font-light text-slate-350">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-slate-400 hover:text-[#f8f8ff] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Checkout CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-purple-500/20 bg-transparent text-[#f8f8ff] hover:bg-purple-500/10 hover:border-purple-500/65 py-6 text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={15} />
              Add to cart
            </Button>
            <Button
              className="flex-1 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/30 text-rose-200 py-6 text-xs md:text-sm font-medium transition-all shadow-[0_0_20px_rgba(244,63,94,0.08)]"
            >
              Buy it now
            </Button>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-1">
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 transition-colors cursor-pointer bg-transparent border-0 p-0 font-light">
              <Heart size={13} />
              Add to wishlist
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 transition-colors cursor-pointer bg-transparent border-0 p-0 font-light">
              <GitCompare size={13} />
              Add to compare
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-300 transition-colors cursor-pointer bg-transparent border-0 p-0 font-light">
              <HelpCircle size={13} />
              Ask About This product
            </button>
          </div>

          <Separator className="bg-purple-500/10" />

          {/* Collapsible Accordion details */}
          <div className="flex flex-col border border-purple-500/10 bg-purple-950/5 rounded-2xl overflow-hidden mt-2">
            {/* Tab 1: Benefits */}
            <div className="border-b border-purple-500/10 last:border-0">
              <button
                onClick={() => toggleSection("benefits")}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-light text-slate-200 hover:bg-white/[0.015] transition-colors cursor-pointer"
              >
                <span>Benefits</span>
                <ChevronDown 
                  size={15} 
                  className="text-slate-500 transition-transform duration-300"
                  style={{ transform: activeSection === "benefits" ? "rotate(180deg)" : "none" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeSection === "benefits" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 font-light leading-relaxed flex flex-col gap-4 border-t border-purple-500/5 pt-4">
                      <p>{gem.description}</p>
                      <div>
                        <p className="font-medium text-slate-300 mb-2 uppercase text-[10px] tracking-widest">Key Properties</p>
                        <div className="flex flex-wrap gap-1.5">
                          {gem.properties.map((p) => (
                            <Badge 
                              key={p} 
                              variant="outline" 
                              className="text-[10px] px-2 py-0.5 rounded-full text-purple-300 border-purple-500/20 bg-purple-500/5"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tab 2: How to wear */}
            <div className="border-b border-purple-500/10 last:border-0">
              <button
                onClick={() => toggleSection("howToWear")}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-light text-slate-200 hover:bg-white/[0.015] transition-colors cursor-pointer"
              >
                <span>How to wear</span>
                <ChevronDown 
                  size={15} 
                  className="text-slate-500 transition-transform duration-300"
                  style={{ transform: activeSection === "howToWear" ? "rotate(180deg)" : "none" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeSection === "howToWear" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 font-light leading-relaxed flex flex-col gap-4 border-t border-purple-500/5 pt-4">
                      <p>{gem.howToWear}</p>
                      <div className="grid grid-cols-2 gap-3 bg-[#0d0a1b] p-4 rounded-xl border border-purple-500/5">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Weight</p>
                          <p className="text-xs text-slate-350">{gem.weight}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Metal</p>
                          <p className="text-xs text-slate-350">{gem.metal}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Finger</p>
                          <p className="text-xs text-slate-350">{gem.finger}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Best Day</p>
                          <p className="text-xs text-slate-350">{gem.day}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tab 3: Best day to wear */}
            <div className="border-b border-purple-500/10 last:border-0">
              <button
                onClick={() => toggleSection("bestDay")}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-light text-slate-200 hover:bg-white/[0.015] transition-colors cursor-pointer"
              >
                <span>Best day to wear</span>
                <ChevronDown 
                  size={15} 
                  className="text-slate-500 transition-transform duration-300"
                  style={{ transform: activeSection === "bestDay" ? "rotate(180deg)" : "none" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeSection === "bestDay" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-slate-400 font-light leading-relaxed border-t border-purple-500/5 pt-4">
                      The recommended astrological day to wear <strong>{gem.name}</strong> is <strong className="text-purple-300">{gem.day}</strong>. 
                      Astrological wearings are optimal during the hour of the ruling planet ({gem.planet} Hora) just after sunrise.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tab 4: Caution */}
            <div className="border-b border-purple-500/10 last:border-0">
              <button
                onClick={() => toggleSection("caution")}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-light text-[#fca5a5] hover:bg-white/[0.015] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Info size={13} />
                  Caution
                </span>
                <ChevronDown 
                  size={15} 
                  className="text-slate-500 transition-transform duration-300"
                  style={{ transform: activeSection === "caution" ? "rotate(180deg)" : "none" }}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeSection === "caution" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs md:text-sm text-[#fca5a5] font-light leading-relaxed border-t border-purple-500/5 pt-4 bg-rose-500/[0.02]">
                      {gem.caution}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
