"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gemstones", label: "Gemstones" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,10,15,0.85)"
            : "rgba(10,10,15,0.4)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(139,92,246,0.2)"
            : "1px solid transparent",
        }}
      >
        <div
          className="max-w-6xl mx-auto flex items-center justify-between"
          style={{ padding: "0 24px", height: "64px" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <div
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                borderRadius: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 9l9 13 9-13-9-7z"
                  fill="white"
                  opacity="0.9"
                />
                <path d="M3 9h18M12 2l-9 7 9 13 9-13L12 2z" stroke="white" strokeWidth="0.5" opacity="0.4" />
              </svg>
            </div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 300,
                letterSpacing: "-0.3px",
                color: "#f8f8ff",
              }}
            >
              Gemly
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/#recommend" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
              Get Your Reading
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#f8f8ff",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(6px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-6px) rotate(-45deg)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(10,10,15,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(139,92,246,0.2)",
              padding: "16px 24px 24px",
            }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{ fontSize: 16, padding: "8px 0" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#recommend"
                className="btn-primary"
                style={{ textAlign: "center", marginTop: 8 }}
                onClick={() => setMenuOpen(false)}
              >
                Get Your Reading
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
