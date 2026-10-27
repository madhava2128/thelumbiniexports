import { type ImageSlotKey } from "./images";

/**
 * Content for the Company Page (/company) of The Lumbini Exports.
 * Strictly factual based on verified client details:
 * established 2023, unit in Elkathurthy Mandal, registered office in Hanamkonda.
 */

export interface CompanyHeaderContent {
  badge: string;
  title: string;
  intro: string;
}

export interface CompanyStoryContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  imageKey: ImageSlotKey;
}

export interface WhatWeDoItem {
  id: string;
  title: string;
  description: string;
  stepNumber: string;
}

export interface CompanyApproachItem {
  id: string;
  title: string;
  description: string;
}

export interface CompanyPageContent {
  header: CompanyHeaderContent;
  story: CompanyStoryContent;
  whatWeDo: {
    eyebrow: string;
    heading: string;
    description: string;
    items: WhatWeDoItem[];
  };
  solarFeature: {
    imageKey: ImageSlotKey;
    caption: string;
  };
  ourStones: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  approach: {
    eyebrow: string;
    heading: string;
    description: string;
    items: CompanyApproachItem[];
  };
  whereToFindUs: {
    eyebrow: string;
    heading: string;
    description: string;
    getDirectionsLabel: string;
  };
  compliance: {
    badge: string;
    heading: string;
    description: string;
    notice: string;
  };
  closingCta: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export const companyContent: CompanyPageContent = {
  // 1. Page Header Band
  header: {
    badge: "About Us",
    title: "About The Lumbini Exports",
    intro:
      "A dedicated granite cutting and polishing unit based in Elkathurthy, Hanamkonda District, Telangana. Established in 2023.",
  },

  // 2. Our Story (strictly factual, 2 paragraphs)
  story: {
    eyebrow: "Our Background",
    heading: "From Quarry Source to Finished Architectural Granite",
    paragraphs: [
      "The Lumbini Exports was established in 2023 as a granite cutting and polishing unit located at Elkathurthy Village and Mandal in the Hanamkonda District of Telangana, India. Our operations supply building granite directly to builders, commercial developers, stone distributors, and overseas importers.",
      "Operating from our dedicated facility, we process raw granite blocks quarried across South Indian stone belts. With multi-blade block sawing, precision dimensional sizing, and surface polishing handled at our unit, we offer reliable granite supply tailored to architectural project specifications.",
    ],
    imageKey: "company_unit_exterior",
  },

  // 3. What We Do (three-column list)
  whatWeDo: {
    eyebrow: "Operations",
    heading: "What We Do",
    description:
      "Integrated granite processing from raw block intake to shipment-ready materials.",
    items: [
      {
        id: "cutting-dimensioning",
        title: "Block Cutting & Dimensioning",
        description:
          "Slicing heavy raw granite blocks into calibrated slabs and customized cut-to-size dimensions using multi-blade gang saws and bridge cutters.",
        stepNumber: "01",
      },
      {
        id: "polishing-finishing",
        title: "Polishing & Surface Finishing",
        description:
          "Applying specialized surface treatments—from mirror-gloss polishing to flamed and textured Lapotra anti-skid finishes across our granite range.",
        stepNumber: "02",
      },
      {
        id: "supply-export",
        title: "Domestic Supply & Export",
        description:
          "Coordinating direct supply to construction sites within India and packing export consignments for international distributors and importers.",
        stepNumber: "03",
      },
    ],
  },

  // Small tidy rooftop solar visual on Company page
  solarFeature: {
    imageKey: "company_solar",
    caption: "Rooftop solar at our unit in Elkathurthy.",
  },

  // 4. Our Stones
  ourStones: {
    eyebrow: "Core Range",
    heading: "Our Granite Range",
    description:
      "Our focused selection of natural granite colours and specialised anti-skid finishes processed at our Elkathurthy facility:",
  },

  // 5. Our Approach
  approach: {
    eyebrow: "Standards & Practice",
    heading: "Our Approach",
    description:
      "Guiding principles behind our daily cutting, finishing, and client coordination.",
    items: [
      {
        id: "quality-finishing",
        title: "Quality Finishing",
        description:
          "Focus on accurate slab thickness calibration, clean edge profiles, and consistent surface finish across every batch.",
      },
      {
        id: "clear-communication",
        title: "Clear Communication",
        description:
          "Transparent reporting on stone availability, dimensional tolerances, quotation breakdowns, and realistic production lead times.",
      },
      {
        id: "reliable-delivery",
        title: "Reliable Delivery",
        description:
          "Careful handling, systematic bundling, and scheduled logistics coordination to ensure materials arrive safely at job sites or ports.",
      },
    ],
  },

  // 6. Where to Find Us
  whereToFindUs: {
    eyebrow: "Locations",
    heading: "Where to Find Us",
    description:
      "Our physical cutting and polishing facility and our registered corporate office in Telangana.",
    getDirectionsLabel: "Get Directions on Google Maps",
  },

  // 7. Compliance (hidden by default)
  compliance: {
    badge: "Environmental Classification",
    heading: "TSPCB Environmental Consent",
    description:
      "The Lumbini Exports stone cutting and polishing unit operates under the 'GREEN' environmental category as recorded in Telangana State Pollution Control Board consent records.",
    notice:
      "Documented under official state industrial consent records for non-polluting stone cutting and polishing operations.",
  },

  // 8. Closing CTA
  closingCta: {
    eyebrow: "Direct Inquiries",
    heading: "Request a Granite Quotation",
    description:
      "Contact our team for bulk dimensional slabs, project cut-to-size orders, or rough granite blocks.",
    ctaLabel: "Request a Quote",
    ctaHref: "/get-quote",
  },
};
