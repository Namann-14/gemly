import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black/20 border-t border-purple-500/10 py-16 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.svg"
                alt="Gemly Logo"
                className="w-7 h-7 rounded-lg shrink-0"
              />
              <span className="text-lg font-light tracking-wide text-[#f8f8ff]">
                Gemly
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Your gemstone, written in the stars. AI-powered Vedic astrology
              meets ancient gemological wisdom.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <p className="text-[10px] font-medium text-purple-400 uppercase tracking-widest mb-4">
              Product
            </p>
            <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {["Get Recommendation", "Gemstones", "How It Works"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Get Recommendation"
                        ? "/#recommend"
                        : item === "Gemstones"
                        ? "/gemstones"
                        : "/how-it-works"
                    }
                    className="text-xs md:text-sm text-slate-400 hover:text-[#c084fc] transition-colors duration-250 font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-[10px] font-medium text-purple-400 uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {["About", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "About" ? "/about" : "#"}
                    className="text-xs md:text-sm text-slate-400 hover:text-[#c084fc] transition-colors duration-250 font-light"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator — purple gradient + glow */}
        <div className="relative">
          <Separator
            className="bg-transparent border-none h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(168,85,247,0.3) 20%, rgba(236,72,153,0.5) 50%, rgba(168,85,247,0.3) 80%, transparent)",
              boxShadow: "0 0 8px rgba(168,85,247,0.2)",
            }}
          />
          {/* Glowing centre dot */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: "#c084fc",
              boxShadow: "0 0 6px 2px rgba(168,85,247,0.5)",
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-xs text-slate-500 font-light">
            © {year} Gemly. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 font-light">
            Powered by Vedic astrology &amp; Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
