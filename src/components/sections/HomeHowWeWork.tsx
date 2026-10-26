import Link from "next/link";
import { Container, Section, Heading, Eyebrow, SiteImage } from "@/components/ui";
import { homeContent } from "@/content/home";

export function HomeHowWeWork() {
  const { howWeWork } = homeContent;

  return (
    <Section background="ivory" spacing="spacious" className="border-b border-stone/20">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <Eyebrow accent="gold" withLine>
            {howWeWork.eyebrow}
          </Eyebrow>
          <Heading variant="section" as="h2" className="text-obsidian">
            {howWeWork.heading}
          </Heading>
          <p className="type-body text-stone-grey-text">
            {howWeWork.description}
          </p>
        </div>

        {/* 3 Linked Process Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howWeWork.blocks.map((block) => (
            <Link
              key={block.id}
              href={block.href}
              className="group flex flex-col justify-between overflow-hidden rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Image Slot */}
                <div className="relative overflow-hidden bg-obsidian">
                  <SiteImage
                    imageKey={block.imageKey}
                    className="w-full aspect-[3/2] object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {/* Step Number Tag */}
                  <div className="absolute top-3 left-3 bg-obsidian/90 backdrop-blur-xs border border-gold/40 text-gold px-2.5 py-1 text-xs font-mono font-semibold tracking-wider rounded-xs">
                    STEP {block.stepNumber}
                  </div>
                </div>

                {/* Block Content */}
                <div className="p-6 space-y-3">
                  <Heading
                    variant="product"
                    as="h3"
                    className="text-obsidian group-hover:text-gold-hover transition-colors"
                  >
                    {block.title}
                  </Heading>

                  <p className="type-body text-stone-grey-text text-sm leading-relaxed">
                    {block.oneLiner}
                  </p>
                </div>
              </div>

              {/* Bottom Navigation Arrow */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone/10 text-xs font-sans font-medium text-obsidian group-hover:text-gold transition-colors">
                <span className="uppercase tracking-wider">Facility Details</span>
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
      </Container>
    </Section>
  );
}
