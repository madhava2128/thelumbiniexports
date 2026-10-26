import Link from "next/link";
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
  SiteImage,
} from "@/components/ui";
import { homeContent } from "@/content/home";
import { stones } from "@/content/stones";

export function HomeFeaturedStones() {
  const { featuredStones } = homeContent;

  return (
    <Section background="ivory" spacing="spacious">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <Eyebrow accent="gold" withLine>
              {featuredStones.eyebrow}
            </Eyebrow>
            <Heading variant="section" as="h2" className="text-obsidian">
              {featuredStones.heading}
            </Heading>
            <p className="type-body text-stone-grey-text">
              {featuredStones.description}
            </p>
          </div>

          <div className="hidden sm:block shrink-0">
            <Button href={featuredStones.ctaHref} variant="secondary">
              {featuredStones.ctaLabel}
            </Button>
          </div>
        </div>

        {/* 4 Featured Stone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stones.map((stone) => (
            <Link
              key={stone.slug}
              href={`/collection/${stone.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Stone Image Placeholder */}
                <div className="overflow-hidden bg-obsidian">
                  <SiteImage
                    imageKey={stone.imageKeys.main}
                    className="w-full aspect-[3/2] object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Stone Details */}
                <div className="p-6 space-y-2.5">
                  <span className="type-label text-[11px] text-sage font-semibold tracking-wider uppercase block">
                    {stone.type}
                  </span>

                  <Heading
                    variant="product"
                    as="h3"
                    className="text-obsidian group-hover:text-gold-hover transition-colors line-clamp-1"
                  >
                    {stone.name}
                  </Heading>

                  <p className="type-body text-stone-grey-text text-sm line-clamp-2 leading-relaxed">
                    {stone.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone/10 text-xs font-sans font-medium text-obsidian group-hover:text-gold transition-colors">
                <span className="uppercase tracking-wider">Specifications</span>
                <span
                  className="transform group-hover:translate-x-1 transition-transform duration-200 text-gold"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View Full Collection CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Button href={featuredStones.ctaHref} variant="secondary" className="w-full">
            {featuredStones.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
