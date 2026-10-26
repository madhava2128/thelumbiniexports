import Link from "next/link";
import { Container, Button, SiteImage } from "@/components/ui";
import { homeContent } from "@/content/home";

/**
 * Handcrafted Hero Section for The Lumbini Exports Home Page.
 *
 * Design Specifications:
 * - Left-aligned text block anchored to lower left (occupies ~50-55% width on desktop).
 * - Full visible viewport height on desktop using svh units (min-h-[100svh]).
 * - Cormorant Garamond headline broken by hand with controlled max-width (no orphan words).
 * - Single DM Sans supporting sentence (12 words) in softer ivory.
 * - Solid gold "Request a Quote" CTA paired with a plain text link "View collection →".
 * - Quiet facts row along the bottom edge separated by a thin gold line.
 * - Directional charcoal-to-black gradient: strong behind text on left, fading to transparent on right.
 * - Single calm entrance animation (fade up 8px, 500ms, staggered by 100ms), disabled under prefers-reduced-motion.
 * - Responsive layout adapted for all viewports (360px up to 1920px and short landscape phones).
 * - Accessible: exactly one H1, contrast > 4.5:1, visible focus rings, priority image loading.
 */
export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section
      className="relative min-h-0 sm:min-h-[clamp(560px,82svh,780px)] flex flex-col justify-between overflow-hidden bg-obsidian text-ivory"
      aria-labelledby="hero-heading"
    >
      {/* Calm entrance animation and landscape-phone adaptations */}
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-headline {
          animation: heroFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both;
        }
        .animate-hero-subtext {
          animation: heroFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
        }
        .animate-hero-actions {
          animation: heroFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
        }
        .animate-hero-facts {
          animation: heroFadeUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-headline,
          .animate-hero-subtext,
          .animate-hero-actions,
          .animate-hero-facts {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Short-height screen adaptation (e.g. mobile landscape: height <= 550px)
           Ensures headline never overlaps the header or facts row */
        @media (max-height: 550px) {
          .hero-container-pad {
            padding-top: 5rem !important;
          }
          .hero-headline-clamp {
            font-size: clamp(1.75rem, 1.35rem + 1.25vw, 2.15rem) !important;
            line-height: 1.1 !important;
          }
          .hero-text-spacing {
            margin-bottom: 0.25rem !important;
            padding-bottom: 0.5rem !important;
          }
          .hero-facts-pad {
            padding-top: 0.35rem !important;
            padding-bottom: 0.5rem !important;
          }
        }
      `}</style>

      {/* Full-bleed background image slot with directional gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Full-bleed stone image container with tactile granite placeholder */}
        <div className="relative w-full h-full opacity-90 lg:opacity-95">
          {/* Subtle dark granite-like texture with sage-to-charcoal tone on the right half */}
          <div className="absolute inset-0 granite-slab-texture" aria-hidden="true" />

          <SiteImage
            imageKey={hero.backgroundImageKey}
            priority
            fill
            showDetailsInPlaceholder={false}
            showPlaceholderBadge={false}
            className="w-full h-full object-cover object-right md:object-center"
          />
        </div>

        {/* Directional charcoal-to-black gradient:
            - Desktop: horizontal from left to right, deep behind text on left, fading out so granite texture stays visible on right.
            - Mobile: vertical from bottom to top, deep behind text, fading out so granite texture stays visible above.
        */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#151716] from-30% via-[#1F2421]/90 via-50% to-transparent" />
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-[#151716] from-40% via-[#1F2421]/85 via-65% to-transparent" />

        {/* Subtle top header gradient for comfortable contrast under transparent header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1C201E]/80 to-transparent" />
      </div>

      {/* Main hero content container */}
      <Container
        size="wide"
        className="hero-container-pad relative z-10 flex-1 flex flex-col justify-between pt-[136px] sm:pt-[180px] lg:pt-[196px] pb-0"
      >
        {/* Left-aligned text block: sits with hero's own top padding, not pinned to bottom */}
        <div className="hero-text-spacing w-full max-w-xl lg:max-w-[55%] text-left space-y-5 sm:space-y-6 pb-12 sm:pb-16 lg:pb-20">
          {/* Exactly one H1 for the page: Cormorant Garamond, warm ivory, tight line height, broken by hand */}
          <h1
            id="hero-heading"
            className="hero-headline-clamp animate-hero-headline type-hero font-normal text-ivory leading-[1.08] sm:leading-[1.1] tracking-tight max-w-[16ch] sm:max-w-[28ch] lg:max-w-[22ch]"
          >
            {hero.headline === "Granite, marble and basalt from Hanamkonda." ? (
              <>
                Granite, marble and&nbsp;basalt{" "}
                <br className="hidden sm:inline" />
                from&nbsp;Hanamkonda.
              </>
            ) : (
              hero.headline
            )}
          </h1>

          {/* Supporting line: DM Sans, softer ivory, max-w-md, 12 words */}
          <p className="animate-hero-subtext font-sans text-ivory/80 text-base sm:text-lg leading-relaxed max-w-md">
            {hero.supportingLine}
          </p>

          {/* Action Row: solid gold button + plain text link with small arrow */}
          <div className="animate-hero-actions pt-1 sm:pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <Button
              href={hero.primaryCta.href}
              variant="primary"
              size="lg"
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider shadow-sm min-h-[44px]"
            >
              {hero.primaryCta.label}
            </Button>

            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-sans font-medium text-ivory/90 hover:text-gold transition-colors py-2 px-1 min-h-[44px] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-xs"
            >
              <span>{hero.secondaryCta.label}</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-gold"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Quiet facts row along the bottom edge, separated by one thin gold line */}
        <div className="hero-facts-pad animate-hero-facts w-full border-t border-gold/25 pt-4 pb-6 sm:pb-7 lg:pb-8">
          <div className="flex flex-wrap items-center justify-start gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-2 text-[10px] sm:text-xs font-sans uppercase tracking-widest text-ivory/70 font-medium pr-16 sm:pr-20">
            <span>{hero.facts[0]}</span>
            <span>{hero.facts[1]}</span>
            <span>{hero.facts[2]}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
