import { Container, Section, Heading, Eyebrow, Button, SiteImage } from "@/components/ui";
import { homeContent } from "@/content/home";

export function HomeAboutTeaser() {
  const { aboutTeaser } = homeContent;

  return (
    <Section background="charcoal" spacing="spacious" className="border-y border-gold/25">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Story Copy */}
          <div className="lg:col-span-7 space-y-6">
            <Eyebrow accent="gold" withLine>
              {aboutTeaser.eyebrow}
            </Eyebrow>

            <Heading variant="section" as="h2" className="text-ivory font-normal">
              {aboutTeaser.title}
            </Heading>

            <div className="space-y-4 type-body text-ivory/80 text-base sm:text-lg leading-relaxed">
              {aboutTeaser.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-2">
              <Button href={aboutTeaser.ctaHref} variant="goldOutline">
                {aboutTeaser.ctaLabel}
              </Button>
            </div>
          </div>

          {/* Right Column: Physical Facility Image Slot */}
          <div className="lg:col-span-5">
            <div className="relative p-2 border border-gold/30 rounded-xs bg-obsidian shadow-xl">
              <SiteImage
                imageKey={aboutTeaser.imageKey}
                className="w-full aspect-[4/3] rounded-xs object-cover"
              />
              <div
                className="absolute -bottom-3 -right-3 h-16 w-16 border-r-2 border-b-2 border-gold/50 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
