import { type ImageSlotKey } from "./images";

/**
 * Content for the Home Page (/) of The Lumbini Exports.
 * Granite only. Factual claims strictly reflect confirmed details (Telangana facility, est. 2023).
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
    headline: "Granite cut and polished in Hanamkonda.",
    supportingLine:
      "We cut, polish and supply granite to builders, distributors and importers.",
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
      "Granite",
    ],
    backgroundImageKey: "hero_primary",
  },

  // 2. Three Value Pillars
  pillars: {
    eyebrow: "Core Capabilities",
    heading: "Precision Natural Granite Processing",
    items: [
      {
        id: "cutting-polishing",
        title: "In-house cutting and polishing",
        description:
          "Multi-blade block sawing and continuous surface polishing performed on-site at our Elkathurthy facility.",
        iconName: "scissors",
      },
      {
        id: "stone-varieties",
        title: "A focused granite range",
        description:
          "Regional natural granite processed into polished slabs, calibrated tiles, and textured anti-skid architectural finishes.",
        iconName: "layers",
      },
      {
        id: "prepared-shipment",
        title: "Prepared for shipment",
        description:
          "Dimensioned stone securely bundled and crated in sturdy wooden packaging for road transport and containerized sea freight.",
        iconName: "package-check",
      },
    ],
  },

  // 3. Featured Stones
  featuredStones: {
    eyebrow: "Quarried & Fabricated",
    heading: "Core Stone Selection",
    description:
      "Architectural granite cut to commercial slab, tile, and raw block specifications.",
    ctaLabel: "View Full Collection",
    ctaHref: "/collection",
  },

  // 4. About Teaser
  aboutTeaser: {
    eyebrow: "About Our Unit",
    title: "Established Granite Cutting & Polishing in Hanamkonda",
    description: [
      "The Lumbini Exports was established in 2023 with a focused mission: to supply natural building granite directly from Telangana to domestic builders and international stone importers.",
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
          "Multi-cutter block sawing and 20-head continuous line polishing machinery for uniform thickness and finish.",
        href: "/infrastructure#machines",
        imageKey: "infra_multi_cutter",
        stepNumber: "01",
      },
      {
        id: "facilities",
        title: "Operations & Facilities",
        oneLiner:
          "Expansive raw block stockyards, covered finishing bays, and rooftop solar installation at our Elkathurthy unit.",
        href: "/infrastructure#facilities",
        imageKey: "infra_processing_bay",
        stepNumber: "02",
      },
      {
        id: "delivery",
        title: "Delivery",
        oneLiner:
          "Seaworthy wooden crating and container stuffing coordinated for domestic and overseas delivery.",
        href: "/infrastructure#delivery",
        imageKey: "infra_delivery_packaging",
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
