import type { Metadata } from "next";
import {
  Container,
  Section,
  Heading,
  Eyebrow,
  Button,
} from "@/components/ui";
import {
  InfrastructureSubNav,
  InfrastructureCard,
} from "@/components/infrastructure";
import { infrastructureContent } from "@/content/infrastructure";

export const metadata: Metadata = {
  title: "Our Infrastructure & Processing Facility | The Lumbini Exports",
  description:
    "Explore our stone cutting line, automated slab polishing, stockyards, and export container packing facilities in Elkathurthy Mandal, Telangana.",
};

export default function InfrastructurePage() {
  const { header, sections, closingCta } = infrastructureContent;

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
              {header.eyebrow}
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory leading-tight">
              {header.title}
            </Heading>
            <p className="type-body text-ivory/80 text-lg sm:text-xl font-normal leading-relaxed">
              {header.intro}
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. In-Page Sub-Navigation (Sticky below main header) */}
      <InfrastructureSubNav sections={sections} />

      {/* 3. Three Infrastructure Sections on Ivory */}
      <div className="bg-ivory divide-y divide-stone/20">
        {sections.map((section, sIndex) => (
          <Section
            key={section.id}
            id={section.id}
            background="ivory"
            spacing="spacious"
            className="scroll-mt-28 sm:scroll-mt-32"
          >
            <Container>
              {/* Section Header with Heading and Intro */}
              <div className="max-w-3xl mb-10 sm:mb-14 space-y-3">
                <Eyebrow accent="gold" withLine>
                  {section.eyebrow}
                </Eyebrow>
                <Heading variant="section" as="h2" className="text-obsidian tracking-tight">
                  {section.heading}
                </Heading>
                <p className="type-body text-stone-grey-text text-base sm:text-lg leading-relaxed">
                  {section.intro}
                </p>
              </div>

              {/* Photo Cards List */}
              <div className="space-y-8 sm:space-y-12">
                {section.cards.map((card, cIndex) => (
                  <InfrastructureCard
                    key={card.id}
                    card={card}
                    index={cIndex}
                    sectionLabel={section.navLabel}
                  />
                ))}
              </div>

              {/* Section Footer Link to Next Section or Quote */}
              {sIndex < sections.length - 1 ? (
                <div className="mt-12 pt-6 flex justify-end">
                  <a
                    href={`#${sections[sIndex + 1].id}`}
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-obsidian hover:text-gold transition-colors"
                  >
                    <span>Next: {sections[sIndex + 1].navLabel}</span>
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </div>
              ) : null}
            </Container>
          </Section>
        ))}
      </div>

      {/* 4. Closing Call to Action Band (Charcoal) */}
      <Section
        background="charcoal"
        spacing="spacious"
        className="relative overflow-hidden hero-gradient-subtle border-t border-gold/20"
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
              {closingCta.headline}
            </Heading>
            <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              {closingCta.description}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={closingCta.primaryCta.href}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider shadow-lg"
              >
                {closingCta.primaryCta.label}
              </Button>
              <Button
                href={closingCta.secondaryCta.href}
                variant="goldOutline"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-sm font-medium tracking-wider"
              >
                {closingCta.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
