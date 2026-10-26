import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header, Footer, FloatingWhatsApp } from "@/components/layout";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | The Lumbini Exports",
    default: "The Lumbini Exports | Natural Stone & Granite Exporters",
  },
  description:
    "Suppliers and exporters of premium natural stone: Imperial Pink Granite, Tan Brown Granite, Marble, and Basalt blocks. Cutting and polishing unit in Telangana, India. Established 2023.",
  icons: {
    icon: [
      { url: "/brand/favicon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/brand/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-obsidian font-sans selection:bg-gold/25 selection:text-obsidian relative">
        {/* Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-gold text-obsidian px-5 py-2.5 font-sans text-sm font-semibold tracking-wide rounded-sm shadow-2xl focus:outline-2 focus:outline-obsidian transition-transform"
        >
          Skip to content
        </a>

        {/* Global Persistent Header */}
        <Header />

        {/* Semantic Main Landmark with Subtle Content Fade-in */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col page-fade-in focus:outline-none"
        >
          {children}
        </main>

        {/* Global Charcoal Footer */}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
