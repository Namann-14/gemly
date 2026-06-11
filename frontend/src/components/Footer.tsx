import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(0,0,0,0.4)",
        borderTop: "1px solid rgba(139,92,246,0.15)",
        padding: "64px 24px 32px",
        marginTop: "auto",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 9l9 13 9-13-9-7z" fill="white" opacity="0.9" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 300,
                  letterSpacing: "-0.3px",
                  color: "#f8f8ff",
                }}
              >
                Gemly
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, maxWidth: 280 }}>
              Your gemstone, written in the stars. AI-powered Vedic astrology
              meets ancient gemological wisdom.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Product
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Get Recommendation", "Gemstones", "How It Works"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Get Recommendation" ? "/#recommend" : item === "Gemstones" ? "/gemstones" : "/how-it-works"}
                    style={{ fontSize: 14, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                    className="hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Company
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["About", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "About" ? "/about" : "#"}
                    style={{ fontSize: 14, color: "#94a3b8", textDecoration: "none" }}
                    className="hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p style={{ fontSize: 13, color: "#475569" }}>
            © {year} Gemly. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "#475569" }}>
            Powered by Vedic astrology &amp; Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
