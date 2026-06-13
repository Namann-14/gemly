import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About Gemly",
  description:
    "The story behind Gemly — why we built an AI-powered Vedic gemstone platform and what drives us.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="px-6 py-20 md:py-24 relative overflow-hidden">
          <div className="hero-gradient" />
          <div className="dot-grid absolute inset-0 opacity-30" />
          <div className="relative max-w-3xl mx-auto text-center md:text-left z-10">
            <Badge
              variant="outline"
              className="mb-6 px-3.5 py-1.5 rounded-full border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] font-normal tracking-wider uppercase"
            >
              Our Story
            </Badge>
            <h1 className="display-xl text-[#f8f8ff] mb-6 font-light">
              Born from a question:
              <br />
              <span className="gradient-text font-medium">Why is ancient wisdom so hard to access?</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
              Vedic astrology has guided civilizations for over 5,000 years. Yet the
              tools available today are outdated, cluttered, and offer no real
              explanation for their recommendations. We built Gemly to change that.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* Mission */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="display-lg text-[#f8f8ff] mb-6 font-light">
                  Our Mission
                </h2>
                <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed mb-4">
                  To make Vedic gemological wisdom genuinely accessible — not as static
                  tables, but as a living, personalized conversation between ancient
                  tradition and modern AI.
                </p>
                <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                  Every recommendation from Gemly comes with a <em>reason</em>. We
                  believe you deserve to understand why a gemstone resonates with your
                  chart — not just be handed a list.
                </p>
              </div>
              <Card className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-5">
                    {[
                      { label: "Tradition", value: "5,000+ years of Vedic knowledge" },
                      { label: "AI Model", value: "Claude Sonnet (Anthropic)" },
                      { label: "Engine", value: "Classical Parashari Jyotish" },
                      { label: "Built for", value: "Seekers worldwide" },
                    ].map((item) => (
                      <div key={item.label} className="border-b border-purple-500/10 pb-4 last:border-0 last:pb-0">
                        <p className="text-[11px] font-medium text-purple-400 uppercase tracking-widest mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-[#f8f8ff] font-light">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <Separator className="bg-purple-500/10" />
        </div>

        {/* Values */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-lg text-[#f8f8ff] mb-12 text-center font-light">
              What we stand for
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "Transparency",
                  desc: "Every recommendation comes with a clear explanation. No black boxes — you always know why.",
                },
                {
                  icon: "🕉️",
                  title: "Respect for Tradition",
                  desc: "We don't distort Vedic knowledge for convenience. Classical rules are the foundation, AI is the interpreter.",
                },
                {
                  icon: "🎨",
                  title: "Beautiful Experience",
                  desc: "Ancient wisdom deserves a modern, premium interface. We reject cluttered, outdated tools.",
                },
              ].map((v) => (
                <Card key={v.title} className="glass-card border-purple-500/20 bg-purple-950/10 backdrop-blur-md hover:border-purple-500/40 transition-colors duration-300">
                  <CardContent className="p-7">
                    <span className="text-3xl block mb-4">{v.icon}</span>
                    <h3 className="text-lg font-light text-[#f8f8ff] mb-2.5 tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
