import { Container, Section, Heading, Eyebrow, Button } from "@/components/ui";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export function HomeClosingCta() {
  const { closingCta } = homeContent;

  return (
    <Section background="charcoal" spacing="spacious" className="relative overflow-hidden hero-gradient-subtle">
      {/* Decorative subtle gold hairline framing */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <Eyebrow accent="gold" withLine>
            {closingCta.eyebrow}
          </Eyebrow>

          {/* Heading */}
          <Heading
            variant="section"
            as="h2"
            className="text-ivory font-normal tracking-tight"
          >
            {closingCta.headline}
          </Heading>

          {/* Short description line */}
          <p className="type-body text-ivory/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {closingCta.description}
          </p>

          {/* Actions: Primary CTA Button and Secondary Direct Email Option */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              href={closingCta.primaryCta.href}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wider shadow-lg"
            >
              {closingCta.primaryCta.label}
            </Button>

            {/* Direct Email Secondary Option */}
            <div className="flex items-center gap-2 text-sm text-ivory/80">
              <span className="text-stone">Or email us at:</span>
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
  );
}
