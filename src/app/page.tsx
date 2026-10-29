import type { Metadata } from "next";
import {
  HomeHero,
  HomePillars,
  HomeFeaturedStones,
  HomeAboutTeaser,
  HomeHowWeWork,
  HomeClosingCta,
} from "@/components/sections";
import { JsonLd, getHomeJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Granite Exporter in Telangana | The Lumbini Exports",
  description:
    "Granite cutting, polishing and export in Hanamkonda, Telangana. Tan Brown, Peacock Brown, Royal Blue, Safari Blue, Honey Blue, Lapotra and Flaming.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* Structured data: Organization & WebSite */}
      <JsonLd data={getHomeJsonLd()} />

      {/* 1. Hero Section (Charcoal-to-black gradient, single H1, persistent CTA) */}
      <HomeHero />

      {/* 2. Three Value Pillars (Ivory, in-house processing, stone varieties, shipping) */}
      <HomePillars />

      {/* 3. Featured Stones (All seven stones from catalog, View Collection button) */}
      <HomeFeaturedStones />

      {/* 4. About Teaser (Charcoal band, established 2023, Elkathurthy facility link) */}
      <HomeAboutTeaser />

      {/* 5. How We Work (Process strip linking to Machines, Facilities, Delivery) */}
      <HomeHowWeWork />

      {/* 6. Closing Call to Action (Direct quote inquiry and email options) */}
      <HomeClosingCta />
    </div>
  );
}
