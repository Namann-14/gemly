import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gemly — Your Gemstone, Written in the Stars",
    template: "%s | Gemly",
  },
  description:
    "AI-powered Vedic gemstone recommendations personalized to your birth chart. Discover the gemstones written in your stars.",
  keywords: [
    "vedic astrology",
    "gemstone recommendation",
    "birth chart",
    "kundali",
    "AI astrology",
    "gemstone healing",
    "jyotish",
  ],
  metadataBase: new URL("https://gemly.app"),
  openGraph: {
    title: "Gemly — Your Gemstone, Written in the Stars",
    description:
      "AI-powered Vedic gemstone recommendations personalized to your birth chart.",
    url: "https://gemly.app",
    siteName: "Gemly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemly — Your Gemstone, Written in the Stars",
    description:
      "AI-powered Vedic gemstone recommendations personalized to your birth chart.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
