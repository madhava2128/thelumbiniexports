import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
  SiteImage,
} from "@/components/ui";
import { companyContent } from "@/content/company";
import { siteConfig } from "@/content/site";
import { stones } from "@/content/stones";

import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About The Lumbini Exports | Granite Unit in Hanamkonda",
  description:
    "Learn about The Lumbini Exports, established in 2023 in Elkathurthy, Hanamkonda, Telangana. Architectural granite cutting, polishing, and export unit.",
  alternates: {
    canonical: "/company",
  },
};

export default function CompanyPage() {
  const {
    header,
    story,
    whatWeDo,
    solarFeature,
    ourStones,
    approach,
    whereToFindUs,
    compliance,
    closingCta,
  } = companyContent;

  const googleMapsUrl =
    siteConfig.addresses.physicalUnit.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteConfig.addresses.physicalUnit.fullAddress
    )}`;

  return (
    <div className="flex-1">
      {/* Structured Data: BreadcrumbList */}
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />

      {/* 1. Page Header Band (Charcoal) */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-2">
              <ol className="flex items-center gap-2 text-xs font-sans text-ivory/60">
                <li>
                  <Link href="/" className="hover:text-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ivory/30">/</li>
                <li className="font-semibold text-ivory" aria-current="page">
                  Company
                </li>
              </ol>
            </nav>

            <Eyebrow accent="gold" withLine>
              {header.badge}
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory">
              {header.title}
            </Heading>
            <p className="type-body text-ivory/80 text-lg sm:text-xl font-normal leading-relaxed">
              {header.intro}
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Our Story (Ivory, 2 paragraphs maximum, factual) */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Story Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow accent="gold" withLine>
                {story.eyebrow}
              </Eyebrow>
              <Heading variant="section" as="h2" className="text-obsidian">
                {story.heading}
              </Heading>
              <div className="space-y-4 type-body text-stone-grey-text text-base sm:text-lg leading-relaxed">
                {story.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Image Slot */}
            <div className="lg:col-span-5">
              <div className="relative p-2 border border-stone/30 rounded-xs bg-ivory-surface shadow-sm">
                <SiteImage
                  imageKey={story.imageKey}
                  className="w-full aspect-[4/3] rounded-xs object-cover"
                />
                <div
                  className="absolute -bottom-2.5 -right-2.5 h-12 w-12 border-r-2 border-b-2 border-gold/60 pointer-events-none hidden sm:block"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. What We Do (Clean 3-column list with small tidy solar image) */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <Eyebrow accent="gold" withLine>
              {whatWeDo.eyebrow}
            </Eyebrow>
            <Heading variant="section" as="h2" className="text-obsidian">
              {whatWeDo.heading}
            </Heading>
            <p className="type-body text-stone-grey-text">
              {whatWeDo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatWeDo.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-8 rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/40 transition-colors duration-200"
              >
                <div className="space-y-4">
                  <span className="font-mono text-sage text-xs font-semibold tracking-widest block uppercase">
                    PHASE {item.stepNumber}
                  </span>
                  <Heading variant="product" as="h3" className="text-obsidian">
                    {item.title}
                  </Heading>
                  <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Small, tidy rooftop solar visual (STEP 3) */}
          <div className="mt-12 pt-8 border-t border-stone/20 flex flex-col sm:flex-row items-center justify-center gap-6 max-w-xl mx-auto">
            <figure className="flex flex-col items-center text-center p-3 rounded-xs border border-stone/20 bg-ivory-surface shadow-xs">
              <div className="w-56 sm:w-64 overflow-hidden rounded-xs bg-obsidian aspect-[4/3]">
                <SiteImage
                  imageKey={solarFeature.imageKey}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-xs font-sans text-stone-grey-text">
                {solarFeature.caption}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* 4. Our Stones (7-item granite range) */}
      <Section background="ivory" spacing="default" className="border-b border-stone/20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <Eyebrow accent="gold" withLine>
                {ourStones.eyebrow}
              </Eyebrow>
              <Heading variant="section" as="h2" className="text-obsidian mt-1">
                {ourStones.heading}
              </Heading>
            </div>
            <Link
              href="/collection"
              className="text-xs font-sans font-semibold uppercase tracking-wider text-obsidian hover:text-gold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore Full Collection</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Responsive granite cards grid: 4 cols wide desktop, 3 cols laptop, 2 cols tablet, 1 col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {stones.map((stone) => (
              <Link
                key={stone.slug}
                href={`/collection/${stone.slug}`}
                className="group flex flex-col justify-between p-6 bg-ivory-surface border border-stone/20 rounded-xs hover:border-gold/50 hover:bg-white/60 transition-all duration-200"
              >
                <div>
                  <span className="type-label text-[10px] text-sage tracking-wider uppercase block">
                    {stone.category}
                  </span>
                  <p className="font-sans font-semibold text-obsidian group-hover:text-gold-hover transition-colors text-base mt-1 line-clamp-1">
                    {stone.name}
                  </p>
                  <p className="text-xs text-stone-grey-text line-clamp-2 mt-1.5 leading-relaxed">
                    {stone.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone/10 flex items-center justify-between text-xs text-stone-grey-text group-hover:text-gold transition-colors">
                  <span className="uppercase tracking-wider text-[11px]">View Specs</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Our Approach */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <Eyebrow accent="gold" withLine>
              {approach.eyebrow}
            </Eyebrow>
            <Heading variant="section" as="h2" className="text-obsidian">
              {approach.heading}
            </Heading>
            <p className="type-body text-stone-grey-text">
              {approach.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approach.items.map((item) => (
              <div
                key={item.id}
                className="relative p-8 rounded-xs bg-ivory-surface border border-stone/20 shadow-xs space-y-3"
              >
                <div
                  className="h-[2px] w-10 bg-gold mb-4"
                  aria-hidden="true"
                />
                <Heading variant="product" as="h3" className="text-obsidian">
                  {item.title}
                </Heading>
                <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Where to Find Us */}
      <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <Eyebrow accent="gold" withLine>
              {whereToFindUs.eyebrow}
            </Eyebrow>
            <Heading variant="section" as="h2" className="text-obsidian">
              {whereToFindUs.heading}
            </Heading>
            <p className="type-body text-stone-grey-text">
              {whereToFindUs.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Processing Unit */}
            <div className="p-8 rounded-xs bg-ivory-surface border border-stone/25 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="type-label text-sage text-xs font-semibold block">
                    Manufacturing Facility
                  </span>
                  <span className="text-[11px] font-mono bg-stone/10 px-2 py-0.5 rounded text-stone-grey-text">
                    Unit
                  </span>
                </div>
                <Heading variant="product" as="h3" className="text-obsidian">
                  {siteConfig.addresses.physicalUnit.label}
                </Heading>
                <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
                  {siteConfig.addresses.physicalUnit.fullAddress}
                </p>
                {siteConfig.phone && (
                  <div className="pt-2 text-xs text-stone-grey-text">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-stone block">
                      Telephone
                    </span>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="text-obsidian font-medium hover:text-gold transition-colors mt-0.5 inline-block"
                    >
                      {siteConfig.phone}
                    </a>
                    {siteConfig.secondaryPhone && (
                      <span className="text-stone">
                        {" "}&bull;{" "}
                        <a
                          href={`tel:${siteConfig.secondaryPhone.replace(/\s+/g, "")}`}
                          className="text-obsidian font-medium hover:text-gold transition-colors"
                        >
                          {siteConfig.secondaryPhone}
                        </a>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Get Directions Link opening in Google Maps */}
              <div className="pt-4 border-t border-stone/15">
                <Button
                  href={googleMapsUrl}
                  isExternal
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <span>{whereToFindUs.getDirectionsLabel}</span>
                  <span className="ml-2 text-xs" aria-hidden="true">&#x2197;</span>
                </Button>
              </div>
            </div>

            {/* Card 2: Registered Office */}
            <div className="p-8 rounded-xs bg-ivory-surface border border-stone/25 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="type-label text-sage text-xs font-semibold block">
                    Administrative Office
                  </span>
                  <span className="text-[11px] font-mono bg-stone/10 px-2 py-0.5 rounded text-stone-grey-text">
                    Office
                  </span>
                </div>
                <Heading variant="product" as="h3" className="text-obsidian">
                  {siteConfig.addresses.registeredOffice.label}
                </Heading>
                <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
                  {siteConfig.addresses.registeredOffice.fullAddress}
                </p>
              </div>

              <div className="pt-4 border-t border-stone/15 text-xs text-stone-grey-text space-y-3">
                {siteConfig.contactPerson && (
                  <div>
                    <p className="font-mono uppercase tracking-wider text-[11px] text-stone">
                      Representative
                    </p>
                    <p className="text-obsidian font-medium text-xs mt-0.5">
                      {siteConfig.contactPerson}
                    </p>
                  </div>
                )}

                <div>
                  <p className="font-mono uppercase tracking-wider text-[11px] text-stone">
                    Official Communication
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/40 mt-0.5 inline-block text-obsidian font-medium"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                {siteConfig.gstNumber && (
                  <div>
                    <p className="font-mono uppercase tracking-wider text-[11px] text-stone">
                      GST Registration (GSTIN)
                    </p>
                    <p className="font-mono text-obsidian text-xs mt-0.5">
                      {siteConfig.gstNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Compliance (hidden by default) */}
      {siteConfig.showGreenClassification && (
        <Section background="ivory" spacing="default" className="border-b border-stone/20">
          <Container size="narrow">
            <div className="p-8 rounded-xs bg-emerald-950/5 border border-emerald-800/30 text-emerald-950 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
                <span className="type-label text-emerald-800 text-xs">
                  {compliance.badge}
                </span>
              </div>
              <Heading variant="product" as="h3" className="text-emerald-950">
                {compliance.heading}
              </Heading>
              <p className="type-body text-emerald-900 text-sm leading-relaxed">
                {compliance.description}
              </p>
              <p className="text-xs text-emerald-800/80 font-mono">
                {compliance.notice}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* 8. Closing Call to Action Band */}
      <Section
        background="charcoal"
        spacing="spacious"
        className="relative overflow-hidden hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <Eyebrow accent="gold" withLine>
              {closingCta.eyebrow}
            </Eyebrow>
            <Heading
              variant="section"
              as="h2"
              className="text-ivory font-normal tracking-tight"
            >
              {closingCta.heading}
            </Heading>
            <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              {closingCta.description}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                href={closingCta.ctaHref}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider shadow-lg"
              >
                {closingCta.ctaLabel}
              </Button>
              <div className="flex items-center gap-2 text-sm text-ivory/80">
                <span className="text-stone">Direct email:</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-gold font-medium hover:text-gold-light underline underline-offset-4 decoration-gold/50 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
