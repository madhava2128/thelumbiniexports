import { type ImageSlotKey } from "./images";

/**
 * Content for the Home Page (/) of The Lumbini Exports.
 *
 * All headlines, descriptions, and CTA labels are defined here for easy editing.
 * Factual claims strictly reflect confirmed details (Telangana facility, est. 2023).
 */

export interface HomeHeroContent {
  badge?: string;
  headline: string;
  supportingLine: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  facts: string[];
  backgroundImageKey: ImageSlotKey;
}

export interface HomePillarItem {
  id: string;
  title: string;
  description: string;
  iconName: "scissors" | "layers" | "package-check";
  // Flag unconfirmed details
  todoClientNotice?: string;
}

export interface HomeAboutTeaser {
  eyebrow: string;
  title: string;
  description: string[];
  ctaLabel: string;
  ctaHref: string;
  imageKey: ImageSlotKey;
}

export interface HomeProcessBlock {
  id: string;
  title: string;
  oneLiner: string;
  href: string;
  imageKey: ImageSlotKey;
  stepNumber: string;
}

export interface HomeCtaSection {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
}

export interface HomePageContent {
  hero: HomeHeroContent;
  pillars: {
    eyebrow: string;
    heading: string;
    items: HomePillarItem[];
  };
  featuredStones: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  aboutTeaser: HomeAboutTeaser;
  howWeWork: {
    eyebrow: string;
    heading: string;
    description: string;
    blocks: HomeProcessBlock[];
  };
  closingCta: HomeCtaSection;
}

export const homeContent: HomePageContent = {
  // 1. Hero Section
  hero: {
    // Default:
    headline: "Granite, marble and basalt from Hanamkonda.",
    supportingLine:
      "We cut, polish and supply natural stone to builders, distributors and importers.",

    /*
     * Alternative Copy Options:
     *
     * Option B:
     * headline: "Stone, cut and finished in Telangana.",
     * supportingLine:
     *   "Granite, marble and basalt for projects at home and abroad. Tell us what you need and we will quote.",
     *
     * Option C:
     * headline: "Natural stone for serious projects.",
     * supportingLine:
     *   "A cutting and polishing unit in Elkathurthy, supplying granite, marble and basalt.",
     */

    primaryCta: {
      label: "Request a Quote",
      href: "/get-quote",
    },
    secondaryCta: {
      label: "View collection",
      href: "/collection",
    },
    facts: [
      "Est. 2023",
      "Hanamkonda, Telangana",
      "Granite · Marble · Basalt",
    ],
    backgroundImageKey: "hero_primary",
  },

  // 2. Three Value Pillars
  pillars: {
    eyebrow: "Core Capabilities",
    heading: "Precision Natural Stone Processing",
    items: [
      {
        id: "cutting-polishing",
        title: "In-house cutting and polishing",
        description:
          "Multi-blade block dressing and continuous surface polishing performed on-site at our Elkathurthy facility.",
        iconName: "scissors",
      },
      {
        id: "stone-varieties",
        title: "Granite, marble and basalt",
        description:
          "Quarried regional stone including Imperial Pink, Tan Brown, crystalline marble, and heavy architectural basalt blocks.",
        iconName: "layers",
      },
      {
        id: "prepared-shipment",
        title: "Prepared for shipment",
        description:
          "Dimensioned stone securely bundled and crated for road transport and containerized sea freight.",
        // TODO(client): confirm exact packaging specifications (fumigated wooden crates, steel bundles, or A-frames)
        todoClientNotice: "TODO(client): confirm packaging and crating standard",
        iconName: "package-check",
      },
    ],
  },

  // 3. Featured Stones
  featuredStones: {
    eyebrow: "Quarried & Fabricated",
    heading: "Core Stone Selection",
    description:
      "Architectural natural stones cut to commercial slab, tile, and raw block specifications.",
    ctaLabel: "View Full Collection",
    ctaHref: "/collection",
  },

  // 4. About Teaser
  aboutTeaser: {
    eyebrow: "About Our Unit",
    title: "Established Stone Cutting & Polishing in Hanamkonda",
    description: [
      "The Lumbini Exports was established in 2023 with a focused mission: to supply natural building stone directly from Telangana to domestic builders and international stone importers.",
      "Our processing unit is located in Elkathurthy Mandal, Hanamkonda District, positioning our operations near prime South Indian granite belts.",
    ],
    ctaLabel: "Learn More About Us",
    ctaHref: "/company",
    imageKey: "company_unit_exterior",
  },

  // 5. How We Work (Process Strip)
  howWeWork: {
    eyebrow: "Facility & Process",
    heading: "How We Work",
    description:
      "A look into our stone cutting equipment, facility layout, and logistical handling.",
    blocks: [
      {
        id: "machines",
        title: "Machines",
        oneLiner:
          "Gangsaw block cutting and multi-head line polishing machinery for uniform thickness and finish.",
        href: "/infrastructure#machines",
        imageKey: "infra_gangsaw_block_cutter",
        stepNumber: "01",
      },
      {
        id: "facilities",
        title: "Operations & Facilities",
        oneLiner:
          "Expansive raw block stockyards and dedicated finishing bays at our Elkathurthy unit.",
        href: "/infrastructure#facilities",
        imageKey: "infra_polishing_line",
        stepNumber: "02",
      },
      {
        id: "delivery",
        title: "Delivery",
        oneLiner:
          "Seaworthy crating and container stuffing coordinated for domestic and overseas delivery.",
        href: "/infrastructure#delivery",
        imageKey: "infra_export_packing",
        stepNumber: "03",
      },
    ],
  },

  // 6. Closing Call to Action
  closingCta: {
    eyebrow: "Direct Quotations",
    headline: "Tell us what your project needs",
    description:
      "Whether you require full container loads of gangsaw slabs, custom cut-to-size paving, or rough quarried blocks, our team will provide a transparent direct quotation.",
    primaryCta: {
      label: "Get a Quote",
      href: "/get-quote",
    },
  },
};
