"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const comparison = [
  ["AI-personalized reasoning", true, false],
  ["Vedic planetary calculation", true, "partial"],
  ["Explains WHY each gem", true, false],
  ["Concern-based focus", true, false],
  ["Mobile-optimized", true, false],
  ["Gemstone encyclopedia", true, "partial"],
] as const;

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="aura-glow w-[350px] h-[350px] bg-purple-600/5 -bottom-20 -left-20 z-0" />
      <div className="aura-glow w-[350px] h-[350px] bg-pink-600/5 -top-20 -right-20 z-0" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-6 border-purple-500/30 bg-purple-500/10 text-purple-300 uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full"
          >
            Why Gemly is different
          </Badge>
          <h2 className="display-xl text-[#f8f8ff] mb-4 font-light">
            Ancient wisdom,
            <br />
            <span className="gradient-text font-medium">modern intelligence</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
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
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="glass-card border-purple-500/15 bg-purple-950/5 hover:border-purple-500/30 hover:bg-purple-950/10 h-full transition-all duration-300">
                <CardHeader className="pb-3 p-8">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <CardTitle className="text-[#f8f8ff] font-light text-xl tracking-tight">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0">
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="glass-card border-purple-500/15 bg-purple-950/5 p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-[#f8f8ff] font-light text-lg tracking-tight">
                Gemly vs. Traditional tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/10">
                      <th className="text-slate-400 font-normal pb-4 pr-6">Feature</th>
                      <th className="text-[#c084fc] font-normal pb-4 text-center pr-6">Gemly</th>
                      <th className="text-slate-500 font-normal pb-4 text-center">Others</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {comparison.map(([label, us, them]) => (
                      <tr key={String(label)} className="hover:bg-purple-500/5 transition-colors duration-150">
                        <td className="text-slate-350 font-light py-4 pr-6">{label}</td>
                        <td className="py-4 text-center pr-6">
                          {us === true ? (
                            <span className="text-[#c084fc] text-base font-semibold">✓</span>
                          ) : (
                            <span className="text-slate-400 text-xs font-light">{String(us)}</span>
                          )}
                        </td>
                        <td className="py-4 text-center">
                          {them === false ? (
                            <span className="text-slate-600 text-base">✗</span>
                          ) : (
                            <span className="text-slate-400 text-xs font-light">{String(them)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            render={<Link href="/#recommend" />}
            size="lg"
            className="btn-celestial text-white px-9 py-6 text-sm md:text-base rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] border-0"
          >
            Get My Personalized Reading
          </Button>
        </div>
      </div>
    </section>
  );
}
