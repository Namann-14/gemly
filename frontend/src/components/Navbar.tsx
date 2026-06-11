"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- Nav link definitions --------------------------------------------------
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gemstones", label: "Gemstones" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

// --- Gem logo SVG ----------------------------------------------------------
function GemLogo() {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 30,
        height: 30,
        background: "linear-gradient(135deg, #a855f7, #ec4899)",
        borderRadius: 8,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.9" />
        <path
          d="M3 9h18M12 2l-9 7 9 13 9-13-9-7z"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

// --- CTA Button (gradient, reusable) --------------------------------------
function CtaButton({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      render={<Link href="/#recommend" onClick={onClick} />}
      className={[
        "btn-celestial border-0 font-medium text-white px-5 py-2.5 rounded-full text-xs md:text-sm tracking-wide active:scale-[0.98]",
        className,
      ].join(" ")}
      style={{ height: "auto" }}
    >
      Get Your Reading
    </Button>
  );
}

// --- Desktop nav link ------------------------------------------------------
function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative text-[13px] font-medium transition-colors duration-200 group uppercase tracking-wider"
      style={{ color: isActive ? "#c084fc" : "rgba(248,248,255,0.6)" }}
    >
      <span className="group-hover:text-[#f8f8ff] transition-colors duration-200">
        {label}
      </span>
      {/* active / hover underline */}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
        style={{
          width: isActive ? "14px" : "0px",
          background: "linear-gradient(90deg, #c084fc, #ec4899)",
        }}
      />
      {!isActive && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full w-0 group-hover:w-[14px] transition-all duration-300"
          style={{
            background: "linear-gradient(90deg, #c084fc, #ec4899)",
            opacity: 0.7,
          }}
        />
      )}
    </Link>
  );
}

// --- Mobile nav link (inside Sheet) ---------------------------------------
function MobileNavLink({
  href,
  label,
  isActive,
  onClose,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClose: () => void;
}) {
  return (
    <SheetClose
      render={
        <Link
          href={href}
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200"
          style={{
            color: isActive ? "#f8f8ff" : "rgba(248,248,255,0.65)",
            background: isActive
              ? "rgba(168,85,247,0.12)"
              : "transparent",
            border: isActive ? "1px solid rgba(168,85,247,0.15)" : "1px solid transparent",
          }}
        />
      }
    >
      {/* active indicator dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
        style={{
          background: isActive
            ? "linear-gradient(135deg,#a855f7,#ec4899)"
            : "rgba(248,248,255,0.2)",
        }}
      />
      <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
      {isActive && (
        <Badge
          className="ml-auto text-[9px] border-0 px-2 font-normal"
          style={{
            background: "rgba(168,85,247,0.25)",
            color: "#c084fc",
          }}
        >
          Active
        </Badge>
      )}
    </SheetClose>
  );
}

// --- Main Navbar -----------------------------------------------------------
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <nav
        className="w-full max-w-5xl rounded-full border pointer-events-auto transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,8,18,0.75)"
            : "rgba(10,8,18,0.3)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: scrolled
            ? "rgba(168,85,247,0.25)"
            : "rgba(168,85,247,0.12)",
          boxShadow: scrolled
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "none",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "0 16px 0 24px", height: "54px" }}
        >
          {/* -- Logo ---------------------------------------------------- */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <GemLogo />
            <span
              style={{
                fontSize: 18,
                fontWeight: 300,
                letterSpacing: "0.2px",
                color: "#f8f8ff",
              }}
            >
              Gemly
            </span>
          </Link>

          {/* -- Desktop nav links --------------------------------------- */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          {/* -- Desktop CTA --------------------------------------------- */}
          <div className="hidden md:flex items-center">
            <CtaButton />
          </div>

          {/* -- Mobile: Sheet trigger (hamburger) ----------------------- */}
          <div className="md:hidden flex items-center">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="text-[#f8f8ff] hover:bg-white/5 hover:text-[#f8f8ff] rounded-full"
                  />
                }
              >
                {/* Animated hamburger → X */}
                <span className="relative flex w-5 h-5 items-center justify-center">
                  <Menu
                    className="absolute transition-all duration-200"
                    style={{
                      opacity: sheetOpen ? 0 : 1,
                      transform: sheetOpen ? "rotate(90deg) scale(0.6)" : "rotate(0deg) scale(1)",
                    }}
                    size={18}
                  />
                  <svg
                    className="absolute transition-all duration-200"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      opacity: sheetOpen ? 1 : 0,
                      transform: sheetOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.6)",
                    }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              </SheetTrigger>

              {/* -- Sheet panel sliding from the right ---------------- */}
              <SheetContent
                side="right"
                showCloseButton={true}
                className="border-l-0 p-0 w-[280px] sm:w-[320px]"
                style={{
                  background: "rgba(8,6,12,0.98)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderLeft: "1px solid rgba(168,85,247,0.15)",
                }}
              >
                {/* Sheet header */}
                <SheetHeader className="px-5 pt-5 pb-3">
                  <SheetTitle
                    render={
                      <Link
                        href="/"
                        className="flex items-center gap-2 no-underline"
                        onClick={() => setSheetOpen(false)}
                      />
                    }
                  >
                    <GemLogo />
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 300,
                        letterSpacing: "0.2px",
                        color: "#f8f8ff",
                      }}
                    >
                      Gemly
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Divider */}
                <div
                  className="mx-5 mb-4"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0.02) 100%)",
                  }}
                />

                {/* Nav links */}
                <nav className="flex flex-col gap-1 px-3 py-2">
                  {navLinks.map((link) => (
                    <MobileNavLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      isActive={pathname === link.href}
                      onClose={() => setSheetOpen(false)}
                    />
                  ))}
                </nav>

                {/* Spacer + CTA */}
                <div className="mt-auto px-5 pb-8 pt-4 flex flex-col gap-3">
                  {/* subtle gem accent */}
                  <div
                    className="w-full rounded-xl p-px"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(236,72,153,0.15))",
                    }}
                  >
                    <div
                      className="rounded-xl px-4 py-4 text-center"
                      style={{ background: "rgba(8,6,12,0.85)" }}
                    >
                      <p
                        className="text-xs mb-3 font-light"
                        style={{ color: "rgba(248,248,255,0.4)" }}
                      >
                        Discover your cosmic gemstone
                      </p>
                      <CtaButton
                        onClick={() => setSheetOpen(false)}
                        className="w-full justify-center"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
