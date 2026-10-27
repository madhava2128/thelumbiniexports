import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
} from "@/components/ui";
import { StoneCard } from "@/components/collection";
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

        {/* Featured Stone Cards: 3x2 grid on desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {stones.map((stone) => (
            <StoneCard key={stone.slug} stone={stone} />
          ))}
        </div>

        {/* Closing Call to Action: View Full Collection */}
        <div className="mt-12 text-center">
          <Button href={featuredStones.ctaHref} variant="secondary" size="lg" className="px-8 py-3.5">
            {featuredStones.ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
