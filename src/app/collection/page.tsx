import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Heading, Eyebrow, Button } from "@/components/ui";
import { StoneCard } from "@/components/collection";
import { stones } from "@/content/stones";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Natural Granite Collection",
  description:
    "Explore our collection of natural South Indian granite. Cut, polished, and processed to project specifications at our unit in Elkathurthy.",
};

interface CollectionPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const { category } = await searchParams;

  const currentTab = category ? category.toLowerCase().trim() : "all";

  // Filter stones based on URL query parameter
  let filteredStones = stones;
  if (currentTab === "colour" || currentTab === "colours") {
    filteredStones = stones.filter((s) => s.category === "Colour");
  } else if (currentTab === "finish" || currentTab === "finishes") {
    filteredStones = stones.filter((s) => s.category === "Finish");
  }

  const tabs: { label: string; href: string; active: boolean }[] = [
    {
      label: "All Granite",
      href: "/collection",
      active: currentTab === "all" || (!currentTab && true),
    },
    {
      label: "Colours",
      href: "/collection?category=colour",
      active: currentTab === "colour" || currentTab === "colours",
    },
    {
      label: "Finishes",
      href: "/collection?category=finish",
      active: currentTab === "finish" || currentTab === "finishes",
    },
  ];

  return (
    <div className="flex-1">
      {/* 1. Page Header Band (Charcoal) */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow accent="gold" withLine>
              Granite Catalog
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory">
              Our Collection
            </Heading>
            <p className="type-body text-ivory/80 text-lg sm:text-xl font-normal leading-relaxed">
              Natural South Indian granite varieties, precision cut and polished to project specifications.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Stone Catalog & Filter Tabs (Ivory) */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          {/* Category Filter Tabs */}
          <div className="mb-10 sm:mb-12 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="Granite categories"
              className="inline-flex p-1 rounded-sm bg-obsidian/5 border border-stone/20 gap-1"
            >
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  role="tab"
                  aria-selected={tab.active}
                  className={cn(
                    "px-5 py-2.5 rounded-xs text-xs sm:text-sm font-sans font-medium transition-all duration-200",
                    tab.active
                      ? "bg-obsidian text-ivory shadow-xs"
                      : "text-stone-grey-text hover:text-obsidian hover:bg-stone/10"
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stone Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
          {filteredStones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {filteredStones.map((stone) => (
                <StoneCard key={stone.slug} stone={stone} />
              ))}
            </div>
          ) : (
            /* Empty State Message */
            <div className="max-w-md mx-auto text-center py-12 px-6 border border-stone/20 rounded-xs bg-ivory-surface space-y-4">
              <Heading variant="product" as="h3" className="text-obsidian">
                No items found
              </Heading>
              <p className="type-body text-stone-grey-text text-sm">
                No stone varieties match the selected category.
              </p>
              <Button href="/collection" variant="secondary" size="sm">
                View All Stones
              </Button>
            </div>
          )}
        </Container>
      </Section>

      {/* 3. Closing Call to Action Band (Charcoal) */}
      <Section
        background="charcoal"
        spacing="spacious"
        className="relative overflow-hidden hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <Eyebrow accent="gold" withLine>
              Custom Inquiries
            </Eyebrow>
            <Heading
              variant="section"
              as="h2"
              className="text-ivory font-normal tracking-tight"
            >
              Looking for Custom Dimensions or Bulk Slabs?
            </Heading>
            <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We cut, calibrate, and polish natural granite to architectural drawings. Submit your cutting list or project schedule for direct pricing.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/get-quote" variant="primary" size="lg" className="w-full sm:w-auto px-8 py-4">
                Request a Custom Quote
              </Button>
              <Button href="/infrastructure" variant="goldOutline" size="lg" className="w-full sm:w-auto px-8 py-4">
                View Infrastructure &amp; Processing
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
