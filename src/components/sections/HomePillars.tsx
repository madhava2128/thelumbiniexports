import { Container, Section, Heading, Eyebrow } from "@/components/ui";
import { homeContent, type HomePillarItem } from "@/content/home";

function PillarIcon({ iconName }: { iconName: HomePillarItem["iconName"] }) {
  if (iconName === "scissors") {
    // Precision stone cutting blade motif
    return (
      <svg
        className="h-6 w-6 text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }

  if (iconName === "layers") {
    // Natural stone strata and slab layers
    return (
      <svg
        className="h-6 w-6 text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 22" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  // Freight shipment / wooden crating motif
  return (
    <svg
      className="h-6 w-6 text-gold"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function HomePillars() {
  const { pillars } = homeContent;

  return (
    <Section background="ivory" spacing="default" className="border-b border-stone/20">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <Eyebrow accent="gold" withLine>
            {pillars.eyebrow}
          </Eyebrow>
          <Heading variant="section" as="h2" className="text-obsidian">
            {pillars.heading}
          </Heading>
        </div>

        {/* 3 Value Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between p-8 rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Subtle top gold accent bar on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xs"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {/* Icon badge */}
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-sm bg-obsidian border border-gold/30 shadow-xs">
                  <PillarIcon iconName={item.iconName} />
                </div>

                {/* Title */}
                <Heading variant="product" as="h3" className="text-obsidian">
                  {item.title}
                </Heading>

                {/* Description */}
                <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
