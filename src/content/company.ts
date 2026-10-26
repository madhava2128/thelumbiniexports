import { type ImageSlotKey } from "./images";

/**
 * Content for the Company Page (/company) of The Lumbini Exports.
 *
 * All text is strictly factual based on verified client details:
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
  // TODO(client): confirm approach statement wording
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
      "A dedicated natural stone cutting and polishing unit based in Elkathurthy, Hanamkonda District, Telangana. Established in 2023.",
  },

  // 2. Our Story (strictly 2 paragraphs maximum, factual, no exaggeration)
  story: {
    eyebrow: "Our Background",
    heading: "From Quarry Source to Finished Architectural Stone",
    paragraphs: [
      "The Lumbini Exports was established in 2023 as a natural stone cutting and polishing unit located at Elkathurthy Village and Mandal in the Hanamkonda District of Telangana, India. Our operations were founded to supply high-grade building stone directly to builders, commercial developers, stone distributors, and overseas importers.",
      "Operating from our dedicated facility, we process raw granite blocks quarried across South Indian stone belts alongside select varieties of marble and basalt. With gang-saw block slicing, precision dimensional sizing, and surface polishing handled at our unit, we offer reliable stone supply tailored to architectural project specifications.",
    ],
    imageKey: "company_unit_exterior",
  },

  // 3. What We Do (clean three-column list)
  whatWeDo: {
    eyebrow: "Operations",
    heading: "What We Do",
    description:
      "Integrated natural stone processing from raw block intake to shipment-ready materials.",
    items: [
      {
        id: "cutting-dimensioning",
        title: "Block Cutting & Dimensioning",
        description:
          "Slicing heavy raw granite and stone blocks into calibrated slabs and customized cut-to-size dimensions using multi-blade gang saws and bridge cutters.",
        stepNumber: "01",
      },
      {
        id: "polishing-finishing",
        title: "Polishing & Surface Finishing",
        description:
          "Applying specialized surface treatments—from mirror-gloss polishing to honed, flamed, and textured architectural finishes across granite, marble, and basalt.",
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

  // 4. Our Stones
  ourStones: {
    eyebrow: "Core Materials",
    heading: "Our Natural Stone Varieties",
    description:
      "Four core architectural stones processed at our Elkathurthy facility:",
  },

  // 5. Our Approach (general commitments, no unprovable numbers or claims)
  // TODO(client): confirm wording of operating approach commitments
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
          // TODO(client): confirm quality inspection protocol
          "Focus on accurate slab thickness calibration, clean edge profiles, and consistent surface polish across every batch.",
      },
      {
        id: "clear-communication",
        title: "Clear Communication",
        description:
          // TODO(client): confirm order updates process
          "Transparent reporting on stone availability, dimensional tolerances, quotation breakdowns, and realistic production lead times.",
      },
      {
        id: "reliable-delivery",
        title: "Reliable Delivery",
        description:
          // TODO(client): confirm dispatch and packing coordination
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

  // 7. Compliance (Conditional, hidden by default until client provides TSPCB consent order)
  // TODO(client): verify and provide official TSPCB consent documentation before activating
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
    heading: "Request a Stone Quotation",
    description:
      "Contact our team for bulk dimensional slabs, project cut-to-size orders, or rough granite and basalt blocks.",
    ctaLabel: "Request a Quote",
    ctaHref: "/get-quote",
  },
};
