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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thelumbiniexports.in";
const isProduction =
  siteUrl === "https://www.thelumbiniexports.in" ||
  siteUrl === "https://thelumbiniexports.in" ||
  process.env.NODE_ENV !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Granite Exporter in Telangana | The Lumbini Exports",
    template: "%s",
  },
  description:
    "Granite cutting, polishing and export in Hanamkonda, Telangana. Tan Brown, Peacock Brown, Royal Blue, Safari Blue, Honey Blue, Lapotra and Flaming.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "The Lumbini Exports",
    title: "Granite Exporter in Telangana | The Lumbini Exports",
    description:
      "Granite cutting, polishing and export in Hanamkonda, Telangana. Tan Brown, Peacock Brown, Royal Blue, Safari Blue, Honey Blue, Lapotra and Flaming.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The Lumbini Exports - Natural Granite Exporter & Processing Unit in Hanamkonda, Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Granite Exporter in Telangana | The Lumbini Exports",
    description:
      "Granite cutting, polishing and export in Hanamkonda, Telangana. Tan Brown, Peacock Brown, Royal Blue, Safari Blue, Honey Blue, Lapotra and Flaming.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/brand/favicon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/brand/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
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

        {/* Semantic Main Landmark */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col focus:outline-none"
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
