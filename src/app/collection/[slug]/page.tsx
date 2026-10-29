import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
  Divider,
  SiteImage,
} from "@/components/ui";
import {
  StoneGallery,
  StoneSpecTable,
  StoneQuotePanel,
} from "@/components/collection";
import { stones, getStoneBySlug } from "@/content/stones";
import {
  JsonLd,
  getStoneProductJsonLd,
  getBreadcrumbJsonLd,
} from "@/components/seo/JsonLd";

interface StoneDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stones.map((stone) => ({
    slug: stone.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoneDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stone = getStoneBySlug(slug);

  if (!stone) {
    notFound();
  }

  const title = stone.metaTitle;
  const description = stone.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/collection/${stone.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/collection/${stone.slug}`,
      images: [
        {
          url: `/images/stones/${stone.slug}/main.webp`,
          width: 1200,
          height: 800,
          alt: `${stone.name} granite slab`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/stones/${stone.slug}/main.webp`],
    },
  };
}

export default async function StoneDetailPage({ params }: StoneDetailPageProps) {
  const { slug } = await params;
  const stone = getStoneBySlug(slug);

  if (!stone) {
    notFound();
  }

  // Filter out current stone for "Other Stones" row
  const otherStones = stones.filter((s) => s.slug !== stone.slug);

  return (
    <div className="flex-1">
      {/* Structured data: Product & BreadcrumbList */}
      <JsonLd data={getStoneProductJsonLd(stone)} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collection", path: "/collection" },
          { name: stone.name, path: `/collection/${stone.slug}` },
        ])}
      />

      {/* 1. Main Detail Section on Ivory Stone */}
      <Section background="ivory" spacing="default" className="pt-6 sm:pt-8 pb-16">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs font-sans text-stone-grey-text">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone/60">/</li>
              <li>
                <Link
                  href="/collection"
                  className="hover:text-gold transition-colors"
                >
                  Collection
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone/60">/</li>
              <li className="font-semibold text-obsidian truncate" aria-current="page">
                {stone.name}
              </li>
            </ol>
          </nav>

          {/* Core Content Grid: Gallery & Specs (Left) + Quote Panel (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Title, Gallery, Full Description, Specs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Stone Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="type-label text-sage text-xs font-semibold uppercase tracking-wider">
                    {stone.category}
                  </span>
                  <span className="text-stone/60 text-xs" aria-hidden="true">&bull;</span>
                  <span className="text-xs font-mono text-stone-grey-text uppercase">
                    Natural Granite
                  </span>
                </div>

                {/* Single H1 for the page */}
                <Heading variant="display" as="h1" className="text-obsidian leading-tight">
                  {stone.name}
                </Heading>

                <p className="type-body text-stone-grey-text text-base sm:text-lg">
                  {stone.shortDescription}
                </p>
              </div>

              {/* Image Gallery with Thumbnails in raw HTML */}
              <StoneGallery
                imageKeys={stone.imageKeys}
                stoneName={stone.name}
              />

              {/* Full Description & General Uses */}
              <div className="space-y-4 pt-2">
                <Heading variant="product" as="h2" className="text-obsidian">
                  About {stone.name}
                </Heading>
                <div className="type-body text-stone-grey-text space-y-4 text-base sm:text-lg leading-relaxed">
                  <p>{stone.longDescription}</p>
                </div>
              </div>

              <Divider variant="solid" className="my-6 border-stone/20" />

              {/* Technical Characteristics Table */}
              <div className="space-y-4">
                <Heading variant="product" as="h2" className="text-obsidian">
                  Technical Characteristics
                </Heading>
                <StoneSpecTable stone={stone} />
              </div>
            </div>

            {/* Right Column: Sticky Quote Configuration Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <StoneQuotePanel stone={stone} />

              {/* In-house Processing Highlights */}
              <div className="p-6 rounded-xs bg-ivory-surface border border-stone/20 shadow-xs space-y-3 text-xs text-stone-grey-text">
                <span className="type-label text-sage text-[11px] font-semibold block uppercase tracking-wider">
                  Processing &amp; Export Standard
                </span>
                <ul className="space-y-2 list-disc list-inside leading-relaxed">
                  <li>Direct raw block intake and gang-saw slab calibration in Elkathurthy</li>
                  <li>Custom dimensional cutting to architectural project schedules</li>
                  <li>Export packaging with protective wooden crating</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. "Other Stones" in Our Collection */}
      <Section background="ivory" spacing="default" className="border-t border-stone/20 bg-ivory/50">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Eyebrow accent="gold" withLine>
                More Varieties
              </Eyebrow>
              <Heading variant="section" as="h2" className="text-obsidian mt-1">
                Other Granite Varieties
              </Heading>
            </div>
            <Link
              href="/collection"
              className="text-xs font-sans font-semibold uppercase tracking-wider text-obsidian hover:text-gold transition-colors inline-flex items-center gap-1.5"
            >
              <span>View All Collection</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {otherStones.map((item) => (
              <Link
                key={item.slug}
                href={`/collection/${item.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="overflow-hidden bg-obsidian aspect-[3/2]">
                    <SiteImage
                      imageKey={item.imageKeys.main}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="type-label text-[10px] text-sage font-semibold uppercase">
                      {item.category}
                    </span>
                    <p className="font-sans font-semibold text-obsidian group-hover:text-gold-hover transition-colors text-base line-clamp-1">
                      {item.name}
                    </p>
                    <p className="type-body text-stone-grey-text text-xs line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone/10 text-xs text-obsidian group-hover:text-gold transition-colors font-medium">
                  <span className="uppercase tracking-wider text-[11px]">View Details</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200 text-gold" aria-hidden="true">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Closing CTA Band */}
      <Section
        background="charcoal"
        spacing="spacious"
        className="relative overflow-hidden hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <Eyebrow accent="gold" withLine>
              Direct Export Inquiry
            </Eyebrow>
            <Heading
              variant="section"
              as="h2"
              className="text-ivory font-normal tracking-tight"
            >
              Ready to Discuss Specifications for {stone.name}?
            </Heading>
            <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Our team reviews project cutting schedules, quantities, and delivery terms to issue formal itemized quotations.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={`/get-quote?stone=${stone.slug}&stoneName=${encodeURIComponent(stone.name)}`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider shadow-lg"
              >
                Request a Quote
              </Button>
              <Button href="/collection" variant="goldOutline" size="lg" className="w-full sm:w-auto px-8 py-4">
                View Granite Collection
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
