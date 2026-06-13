import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} dark h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f8f8ff]">
          <CartProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
