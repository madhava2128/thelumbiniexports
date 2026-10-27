import { Container, Section, Heading, Eyebrow, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center min-h-[65vh] bg-obsidian">
      <Section
        background="charcoal"
        spacing="spacious"
        className="hero-gradient-subtle flex-1 flex items-center"
      >
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <Eyebrow accent="gold" withLine>
                Error 404 &bull; Resource Missing
              </Eyebrow>
              <span className="block font-serif text-7xl sm:text-8xl md:text-9xl text-gold/30 font-light select-none tracking-tight">
                404
              </span>
              <Heading
                variant="display"
                as="h1"
                className="text-ivory leading-tight mt-1"
              >
                Page Not Found
              </Heading>
            </div>

            <p className="type-body text-ivory/80 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              The granite variety, facility document, or page you requested cannot be found or may have been relocated.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button href="/" variant="primary" size="md" className="w-full sm:w-auto px-7">
                Return to Home
              </Button>
              <Button href="/collection" variant="goldOutline" size="md" className="w-full sm:w-auto px-7">
                Browse Granite Collection
              </Button>
              <Button href="/get-quote" variant="secondary" size="md" className="w-full sm:w-auto px-7">
                Request a Quote
              </Button>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-ivory/50">
              Need direct assistance? Email{" "}
              <a
                href="mailto:thelumbiniexports@gmail.com"
                className="text-gold hover:underline"
              >
                thelumbiniexports@gmail.com
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
