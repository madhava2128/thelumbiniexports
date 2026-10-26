import { type ImageSlotKey } from "./images";

/**
 * Infrastructure and Processing Facility Content for The Lumbini Exports.
 *
 * Sourced strictly from verified client facts:
 * - Unit: Syno 882 B2/2/1/2, 882/B1/1, Elkathurthy Village & Mandal, Hanamkonda District, Telangana 505476, India.
 * - Established: 2023.
 * - Capabilities: Granite, marble, and basalt cutting, polishing, and export preparation.
 * - No invented machine brands, model numbers, output capacities, or client statistics.
 * - All descriptions marked with TODO(client) for future client confirmation.
 */

export interface InfrastructurePhotoCard {
  id: string;
  sideHeading: string;
  description: string;
  // TODO(client): confirm technical details for this infrastructure item
  todoClientNotice: string;
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

/**
 * Typed sections and photo cards array.
 * Add or remove photo cards freely within each section array.
 */
export const infrastructureSections: InfrastructureSection[] = [
  {
    id: "machines",
    anchor: "machines",
    navLabel: "Machines",
    eyebrow: "Processing Machinery",
    heading: "Machines",
    intro:
      "Our processing unit in Elkathurthy operates block sawing and continuous polishing equipment for granite, marble, and basalt stone.",
    cards: [
      {
        id: "cutting-line",
        sideHeading: "Cutting line",
        description:
          "Block dressing and multi-blade gang saw cutting to slice raw natural stone blocks into dimensional slabs.",
        todoClientNotice: "TODO(client): confirm cutting equipment details and specifications",
        imageKey: "infra_gangsaw_block_cutter",
      },
      {
        id: "polishing-line",
        sideHeading: "Polishing",
        description:
          "Automated continuous line polishing applying progressive abrasive diamond heads for calibrated slab gloss.",
        todoClientNotice: "TODO(client): confirm polishing machinery and finish capabilities",
        imageKey: "infra_polishing_line",
      },
      {
        id: "bridge-cutting",
        sideHeading: "Bridge cutting",
        description:
          "Precision bridge saw cutting for dimensional accuracy, custom tile formats, and architectural project schedules.",
        todoClientNotice: "TODO(client): confirm bridge saw sizing equipment and tolerances",
        imageKey: "infra_bridge_saw_cutting",
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
      "Located at Elkathurthy Mandal, Hanamkonda District, our unit coordinates raw stone staging, covered processing, and dimensional sorting.",
    cards: [
      {
        id: "raw-material-yard",
        sideHeading: "Raw material yard",
        description:
          "Open-air block storage and inspection yard equipped for heavy stone block staging prior to primary gang saw intake.",
        todoClientNotice: "TODO(client): confirm yard dimensions and crane capacity",
        imageKey: "infra_stockyard",
      },
      {
        id: "processing-bay",
        sideHeading: "Processing bay",
        description:
          "Covered industrial bays housing slab calibration, water recycling systems, and intermediate stone handling.",
        todoClientNotice: "TODO(client): confirm facility square footage and water recycling details",
        imageKey: "infra_facilities_processing",
      },
      {
        id: "inspection-area",
        sideHeading: "Inspection area",
        description:
          "Dedicated quality checking area for diagonal tolerance verification, surface sheen inspection, and slab sorting.",
        todoClientNotice: "TODO(client): confirm quality inspection checkpoints and lighting setup",
        imageKey: "infra_quality_inspection",
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
        sideHeading: "Crate packing",
        description:
          "Custom wooden crating with protective plastic lining, foam interleaving, and corner reinforcement for slab protection.",
        todoClientNotice: "TODO(client): confirm fumigation and ISPM-15 crating specifications",
        imageKey: "infra_delivery_crating",
      },
      {
        id: "loading",
        sideHeading: "Loading",
        description:
          "Container stuffing and flatbed truck loading with secured bracing and heavy-duty strapping to prevent transit shifting.",
        todoClientNotice: "TODO(client): confirm container stuffing protocol and forklift/crane equipment",
        imageKey: "infra_export_packing",
      },
      {
        id: "dispatch-transit",
        sideHeading: "Dispatch & transport",
        description:
          "Freight dispatch coordination for domestic project deliveries and bonded road haulage to regional sea shipping terminals.",
        todoClientNotice: "TODO(client): confirm freight carrier agreements and standard dispatch lead times",
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
      "A granite and natural stone cutting and polishing facility in Elkathurthy Mandal, Hanamkonda District, equipped for architectural supply and export.",
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
