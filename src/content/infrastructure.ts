import { type ImageSlotKey } from "./images";

/**
 * Infrastructure and Processing Facility Content for The Lumbini Exports.
 * Sourced strictly from verified client facts:
 * - Unit: SyNo 882 B2/2/1/2 882/B1/1, Elkathurthy Mandal, Hanamkonda, Telangana 505476, India.
 * - Established: 2023.
 * - Capabilities: Granite cutting, polishing, and export preparation.
 */

export interface InfrastructurePhotoCard {
  id: string;
  sideHeading: string;
  description: string;
  imageKey: ImageSlotKey;
}

export interface InfrastructureSection {
  id: "machines" | "facilities" | "delivery";
  anchor: string;
  navLabel: string;
  eyebrow: string;
  heading: string;
  intro: string;
  cards: InfrastructurePhotoCard[];
}

export interface InfrastructurePageContent {
  header: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  sections: InfrastructureSection[];
  closingCta: {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
}

export const infrastructureSections: InfrastructureSection[] = [
  {
    id: "machines",
    anchor: "machines",
    navLabel: "Machines",
    eyebrow: "Processing Machinery",
    heading: "Machines",
    intro:
      "Our processing unit in Elkathurthy operates block sawing, multi-blade cutting, and continuous line polishing equipment for natural granite.",
    cards: [
      {
        id: "multi-cutter",
        sideHeading: "Multi-cutter",
        description:
          "14-blade multi-cutter machine slicing raw granite blocks into calibrated dimensional slabs.",
        imageKey: "infra_multi_cutter",
      },
      {
        id: "polishing-line",
        sideHeading: "Line polishing",
        description:
          "20-head continuous line polishing machine applying progressive abrasives for calibrated slab gloss.",
        imageKey: "infra_polishing_line",
      },
      {
        id: "edge-cutter",
        sideHeading: "Edge cutting",
        description:
          "Precision edge cutting bridge saws trimming granite slabs to exact project dimensions.",
        imageKey: "infra_edge_cutter",
      },
    ],
  },
  {
    id: "facilities",
    anchor: "facilities",
    navLabel: "Operations & Facilities",
    eyebrow: "Unit Grounds & Operations",
    heading: "Operations & Facilities",
    intro:
      "Located at Elkathurthy Mandal, Hanamkonda District, our unit coordinates raw granite block staging, covered processing, and dimensional sorting.",
    cards: [
      {
        id: "raw-material-yard",
        sideHeading: "Raw material yard",
        description:
          "Open-air block storage yard equipped with an overhead gantry crane for heavy granite block staging.",
        imageKey: "infra_raw_yard",
      },
      {
        id: "processing-bay",
        sideHeading: "Processing bay",
        description:
          "Covered industrial bays housing slab cutting, calibration, water handling, and finishing machinery.",
        imageKey: "infra_processing_bay",
      },
      {
        id: "inspection-area",
        sideHeading: "Inspection area",
        description:
          "Dedicated quality inspection area for surface gloss verification, diagonal accuracy, and slab sorting.",
        imageKey: "infra_inspection_area",
      },
      {
        id: "rooftop-solar",
        sideHeading: "Rooftop solar",
        description:
          "Solar panels installed on the roof of our factory.",
        imageKey: "infra_rooftop_solar",
      },
    ],
  },
  {
    id: "delivery",
    anchor: "delivery",
    navLabel: "Delivery",
    eyebrow: "Packaging & Logistics",
    heading: "Delivery",
    intro:
      "Careful preparation for domestic road haulage and international ocean freight through major Indian container ports.",
    cards: [
      {
        id: "crate-packing",
        sideHeading: "Crate packaging",
        description:
          "Sturdy wooden crating with protective lining and corner reinforcement for slab protection during transit.",
        imageKey: "infra_delivery_packaging",
      },
      {
        id: "loading",
        sideHeading: "Loading",
        description:
          "Loading crated granite slabs securely onto transport flatbeds and shipping containers.",
        imageKey: "infra_delivery_loading",
      },
      {
        id: "dispatch-transit",
        sideHeading: "Dispatch & transport",
        description:
          "Freight coordination for domestic project deliveries and transit to container port terminals.",
        imageKey: "infra_delivery_dispatch",
      },
    ],
  },
];

export const infrastructureContent: InfrastructurePageContent = {
  header: {
    eyebrow: "Processing Unit & Operations",
    title: "Our Infrastructure",
    intro:
      "A granite cutting and polishing facility in Elkathurthy Mandal, Hanamkonda District, equipped for architectural supply and export.",
  },
  sections: infrastructureSections,
  closingCta: {
    eyebrow: "Direct Factory Supply",
    headline: "Need Custom Dimensions or Bulk Stone Supply?",
    description:
      "Our processing unit fabricates slabs, tiles, and raw blocks to project cutting lists. Submit your specifications for a prompt quotation.",
    primaryCta: {
      label: "Request a Quote",
      href: "/get-quote",
    },
    secondaryCta: {
      label: "View Stone Collection",
      href: "/collection",
    },
  },
};
