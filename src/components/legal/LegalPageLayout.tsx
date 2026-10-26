import React from "react";
import Link from "next/link";
import { Container, Section, Heading, Eyebrow } from "@/components/ui";
import { type LegalDocument, LEGAL_LAST_UPDATED } from "@/content/legal";

export interface LegalPageLayoutProps {
  document: LegalDocument;
}

export function LegalPageLayout({ document }: LegalPageLayoutProps) {
  return (
    <div className="flex-1">
      {/* 1. Page Header (Charcoal) */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow accent="gold" withLine>
              {document.eyebrow}
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory leading-tight">
              {document.title}
            </Heading>
            <p className="type-body text-ivory/80 text-base sm:text-lg leading-relaxed">
              {document.intro}
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs font-mono text-ivory/60">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
              <span>Last updated: {LEGAL_LAST_UPDATED}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Reading Layout on Ivory */}
      <Section background="ivory" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Desktop Table of Contents (Sticky) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:block">
              <div className="rounded-xs border border-stone/20 bg-ivory-surface p-6 shadow-xs space-y-4">
                <span className="type-label text-[11px] text-sage font-semibold uppercase tracking-wider block">
                  Table of Contents
                </span>
                <nav aria-label={`${document.title} contents`}>
                  <ul className="space-y-2 text-xs font-sans">
                    {document.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-stone-grey-text hover:text-obsidian hover:font-medium transition-colors py-1 border-l-2 border-transparent hover:border-gold pl-3"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="pt-4 border-t border-stone/15 text-[11px] font-sans text-stone-grey-text">
                  Questions? Email us at{" "}
                  <a
                    href="mailto:thelumbiniexports@gmail.com"
                    className="text-obsidian underline hover:text-gold"
                  >
                    thelumbiniexports@gmail.com
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Reading Column */}
            <div className="lg:col-span-8 max-w-prose">
              {/* Mobile Table of Contents Summary */}
              <div className="lg:hidden mb-8 p-4 rounded-xs border border-stone/20 bg-ivory-surface">
                <details className="text-xs font-sans">
                  <summary className="font-semibold text-obsidian uppercase tracking-wider cursor-pointer">
                    View Table of Contents ({document.sections.length} Sections)
                  </summary>
                  <ul className="mt-3 space-y-2 pt-2 border-t border-stone/15">
                    {document.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-stone-grey-text hover:text-obsidian py-0.5"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              {/* Legal Sections */}
              <div className="space-y-12">
                {document.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 space-y-4"
                  >
                    <h2 className="font-serif text-xl sm:text-2xl text-obsidian font-medium border-b border-stone/20 pb-2">
                      {section.title}
                    </h2>
                    <div className="type-body text-stone-grey-text space-y-3 text-sm sm:text-base leading-relaxed">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="whitespace-pre-line">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Bottom Navigation */}
              <div className="mt-14 pt-8 border-t border-stone/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <Link
                  href="/"
                  className="font-sans font-semibold uppercase tracking-wider text-obsidian hover:text-gold transition-colors"
                >
                  &larr; Return to Home
                </Link>
                <div className="flex items-center gap-4">
                  <Link
                    href="/terms"
                    className="text-stone-grey-text hover:text-obsidian transition-colors"
                  >
                    Terms &amp; Conditions
                  </Link>
                  <span className="text-stone/40" aria-hidden="true">&bull;</span>
                  <Link
                    href="/privacy"
                    className="text-stone-grey-text hover:text-obsidian transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-stone/40" aria-hidden="true">&bull;</span>
                  <Link
                    href="/get-quote"
                    className="text-obsidian font-semibold hover:text-gold transition-colors underline"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
