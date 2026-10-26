import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
  SiteImage,
} from "@/components/ui";
import { stones } from "@/content/stones";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Natural Stone Collection | Granite, Marble & Basalt",
  description:
    "Explore our complete catalog of architectural Indian natural stone: Imperial Pink Granite, Tan Brown Granite, Natural Indian Marble, and Basalt Blocks.",
};

interface CollectionPageProps {
  searchParams: Promise<{ type?: string }>;
}

const filterOptions = [
  { label: "All Stones", value: "all", href: "/collection" },
  { label: "Granite", value: "granite", href: "/collection?type=granite" },
  { label: "Marble", value: "marble", href: "/collection?type=marble" },
  { label: "Basalt", value: "basalt", href: "/collection?type=basalt" },
];

async function FilteredStoneCatalog({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeType = resolvedParams.type ? resolvedParams.type.toLowerCase().trim() : "all";

  // Filter stones server-side; defaults to all stones if empty or "all"
  const filteredStones =
    activeType === "all"
      ? stones
      : stones.filter((stone) => stone.type.toLowerCase() === activeType);

  return (
    <div>
      {/* Filter Bar with URL-synced links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-stone/20">
        <div className="flex items-center gap-2">
          <span className="type-label text-stone-grey-text text-xs mr-2">
            Filter By Type:
          </span>
          <div
            role="tablist"
            aria-label="Filter stone catalog by type"
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((opt) => {
              const isActive = activeType === opt.value;
              return (
                <Link
                  key={opt.value}
                  href={opt.href}
                  scroll={false}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    "px-4 py-2 text-xs font-sans font-semibold tracking-wider uppercase rounded-xs border transition-all duration-200 select-none",
                    isActive
                      ? "bg-obsidian text-gold border-gold/40 shadow-xs ring-1 ring-gold/30"
                      : "bg-ivory-surface text-stone-grey-text border-stone/25 hover:border-gold/40 hover:text-obsidian"
                  )}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-xs font-mono text-stone-grey-text">
          Showing <span className="font-semibold text-obsidian">{filteredStones.length}</span> of {stones.length} stones
        </div>
      </div>

      {/* Empty State Message */}
      {filteredStones.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto p-8 rounded-xs border border-stone/25 bg-ivory-surface shadow-xs">
          <span className="inline-block p-3 rounded-full bg-obsidian text-gold mb-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <Heading variant="product" as="h3" className="text-obsidian">
            No stones found in this category
          </Heading>
          <p className="type-body text-stone-grey-text text-sm">
            We currently catalog Granite, Marble, and Basalt. View all available materials or contact us for custom quarry sourcing.
          </p>
          <div className="pt-2">
            <Button href="/collection" variant="primary" size="sm">
              View All Stones
            </Button>
          </div>
        </div>
      ) : (
        /* Stone Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredStones.map((stone) => (
            <Link
              key={stone.slug}
              href={`/collection/${stone.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Consistent Aspect Ratio Image Slot (3:2) */}
                <div className="overflow-hidden bg-obsidian">
                  <SiteImage
                    imageKey={stone.imageKeys.main}
                    className="w-full aspect-[3/2] object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="type-label text-[11px] text-sage font-semibold tracking-wider uppercase">
                      {stone.type}
                    </span>
                    <span className="text-[11px] font-mono text-stone">
                      Export Grade
                    </span>
                  </div>

                  {/* Stone Name in DM Sans at Product Heading Size */}
                  <Heading
                    variant="product"
                    as="h2"
                    className="text-obsidian group-hover:text-gold-hover transition-colors"
                  >
                    {stone.name}
                  </Heading>

                  {/* Two-Line Description */}
                  <p className="type-body text-stone-grey-text text-sm sm:text-base line-clamp-2 leading-relaxed">
                    {stone.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-stone/15 text-xs font-sans font-medium text-obsidian group-hover:text-gold transition-colors">
                <span className="uppercase tracking-wider font-semibold">
                  View Details &amp; Configure Quote
                </span>
                <span
                  className="transform group-hover:translate-x-1.5 transition-transform duration-200 text-gold"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CatalogLoadingFallback() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-72 bg-stone/20 rounded-xs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-96 bg-stone/10 rounded-xs border border-stone/20" />
        ))}
      </div>
    </div>
  );
}

export default function CollectionPage({ searchParams }: CollectionPageProps) {
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
              Natural Stone Catalog
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory">
              Our Collection
            </Heading>
            <p className="type-body text-ivory/80 text-lg sm:text-xl font-normal leading-relaxed">
              Quarried South Indian granite, timeless crystalline marble, and heavy architectural basalt blocks, precision cut and polished to project specifications.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Filter Tabs & Stone Grid (Ivory) wrapped in Suspense for Next.js 16 Partial Prerendering */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          <Suspense fallback={<CatalogLoadingFallback />}>
            <FilteredStoneCatalog searchParams={searchParams} />
          </Suspense>
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
              Looking for Custom Dimensions or Raw Quarried Blocks?
            </Heading>
            <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We cut, calibrate, and polish natural stone to architectural drawings. Submit your cutting list or project schedule for direct pricing.
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
