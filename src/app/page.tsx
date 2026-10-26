import {
  HomeHero,
  HomePillars,
  HomeFeaturedStones,
  HomeAboutTeaser,
  HomeHowWeWork,
  HomeClosingCta,
} from "@/components/sections";

export default function HomePage() {
  return (
    <div className="flex-1">
      {/* 1. Hero Section (Charcoal-to-black gradient, single H1, persistent CTA) */}
      <HomeHero />

      {/* 2. Three Value Pillars (Ivory, in-house processing, stone varieties, shipping) */}
      <HomePillars />

      {/* 3. Featured Stones (Four core stones from catalog, View Collection button) */}
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
