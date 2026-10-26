/**
 * Image Registry for The Lumbini Exports.
 *
 * Centralized catalog of every image slot used across the website.
 * When photographic assets become available, only update the `src` property
 * in this file. Components will automatically load the new images without changes.
 */

export interface ImageSlot {
  key: string;
  label: string;
  src: string | null;
  alt: string;
  aspectRatio: "16:9" | "4:3" | "3:2" | "1:1" | "21:9";
  recommendedWidth: number;
  recommendedHeight: number;
  description?: string;
}

export const imageSlots = {
  // Hero & Brand
  hero_primary: {
    key: "hero_primary",
    label: "Home Hero - Premium Granite Slabs",
    src: null,
    alt: "Polished natural granite slabs reflecting ambient light at The Lumbini Exports cutting facility",
    aspectRatio: "16:9",
    recommendedWidth: 1920,
    recommendedHeight: 1080,
    description: "Main dark hero visual showing high-gloss natural stone slabs",
  },

  // Home Pillars
  home_pillar_quarry: {
    key: "home_pillar_quarry",
    label: "Pillar 1 - Quarry Direct Sourcing",
    src: null,
    alt: "Quarry extraction of large architectural granite blocks in Telangana, India",
    aspectRatio: "4:3",
    recommendedWidth: 800,
    recommendedHeight: 600,
    description: "Value pillar highlighting direct quarry sourcing",
  },
  home_pillar_precision: {
    key: "home_pillar_precision",
    label: "Pillar 2 - Precision Cutting & Polish",
    src: null,
    alt: "Automated granite line polishing machine creating uniform mirror finish on stone slabs",
    aspectRatio: "4:3",
    recommendedWidth: 800,
    recommendedHeight: 600,
    description: "Value pillar highlighting precision processing",
  },
  home_pillar_export: {
    key: "home_pillar_export",
    label: "Pillar 3 - Global Export Logistics",
    src: null,
    alt: "Seaworthy fumigated wooden crate packing and container loading for international shipping",
    aspectRatio: "4:3",
    recommendedWidth: 800,
    recommendedHeight: 600,
    description: "Value pillar highlighting international export packaging",
  },

  // Stone Catalog: Imperial Pink Granite
  stone_imperial_pink_main: {
    key: "stone_imperial_pink_main",
    label: "Imperial Pink Granite - Primary Slab",
    src: null,
    alt: "Full view of polished Imperial Pink Granite slab showing pink feldspar and grey quartz minerals",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_imperial_pink_texture: {
    key: "stone_imperial_pink_texture",
    label: "Imperial Pink Granite - Close Texture Detail",
    src: null,
    alt: "Macro photograph of Imperial Pink Granite crystalline texture and color variation",
    aspectRatio: "1:1",
    recommendedWidth: 800,
    recommendedHeight: 800,
  },
  stone_imperial_pink_slab: {
    key: "stone_imperial_pink_slab",
    label: "Imperial Pink Granite - Gangsaw Slabs Stack",
    src: null,
    alt: "Multiple polished gangsaw slabs of Imperial Pink Granite stacked in the factory bay",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_imperial_pink_application: {
    key: "stone_imperial_pink_application",
    label: "Imperial Pink Granite - Architectural Application",
    src: null,
    alt: "Imperial Pink Granite installed on luxury commercial building flooring and exterior wall cladding",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },

  // Stone Catalog: Tan Brown Granite
  stone_tan_brown_main: {
    key: "stone_tan_brown_main",
    label: "Tan Brown Granite - Primary Slab",
    src: null,
    alt: "High-resolution view of Tan Brown Granite slab with deep reddish-brown and dark charcoal mineral crystals",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_tan_brown_texture: {
    key: "stone_tan_brown_texture",
    label: "Tan Brown Granite - Close Texture Detail",
    src: null,
    alt: "Close-up detail of Tan Brown Granite showcasing distinctive circular mineral flowers and rich contrast",
    aspectRatio: "1:1",
    recommendedWidth: 800,
    recommendedHeight: 800,
  },
  stone_tan_brown_slab: {
    key: "stone_tan_brown_slab",
    label: "Tan Brown Granite - Factory Bundle",
    src: null,
    alt: "Calibrated Tan Brown Granite slabs bundled ready for export container stuffing",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_tan_brown_application: {
    key: "stone_tan_brown_application",
    label: "Tan Brown Granite - Interior Application",
    src: null,
    alt: "Tan Brown Granite fabricated into polished countertops and hotel lobby flooring",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },

  // Stone Catalog: Marble
  stone_marble_main: {
    key: "stone_marble_main",
    label: "Natural Indian Marble - Primary Slab",
    src: null,
    alt: "Polished natural marble slab with graceful mineral veining on a light crystalline base",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_marble_texture: {
    key: "stone_marble_texture",
    label: "Natural Indian Marble - Veining Detail",
    src: null,
    alt: "High-definition close-up of natural marble grain, veining ribbons and translucent mineral depth",
    aspectRatio: "1:1",
    recommendedWidth: 800,
    recommendedHeight: 800,
  },
  stone_marble_slab: {
    key: "stone_marble_slab",
    label: "Natural Indian Marble - Book-matched Slabs",
    src: null,
    alt: "Book-matched pair of polished marble slabs prepared for feature wall installation",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_marble_application: {
    key: "stone_marble_application",
    label: "Natural Indian Marble - Interior Cladding",
    src: null,
    alt: "Polished marble floor and bathroom vanity surfaces in modern luxury interior",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },

  // Stone Catalog: Basalt Stone
  stone_basalt_main: {
    key: "stone_basalt_main",
    label: "Basalt Stone - Natural Surface Slab",
    src: null,
    alt: "Honed and flamed basalt stone slab displaying uniform charcoal-grey volcanic texture",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_basalt_texture: {
    key: "stone_basalt_texture",
    label: "Basalt Stone - Micro-crystalline Detail",
    src: null,
    alt: "Close-up of dense fine-grained volcanic basalt texture with anti-slip flamed treatment",
    aspectRatio: "1:1",
    recommendedWidth: 800,
    recommendedHeight: 800,
  },
  stone_basalt_blocks: {
    key: "stone_basalt_blocks",
    label: "Basalt Heavy Blocks & Kerbstones",
    src: null,
    alt: "Large dimensional basalt blocks and cut-to-size paving stones ready for export",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  stone_basalt_application: {
    key: "stone_basalt_application",
    label: "Basalt Stone - Landscape & Paving",
    src: null,
    alt: "Durable basalt pavers and architectural stone masonry in civic urban square",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },

  // Company & Story
  company_unit_exterior: {
    key: "company_unit_exterior",
    label: "Company - Cutting Unit Facility",
    src: null,
    alt: "The Lumbini Exports cutting and polishing unit grounds at Elkathurthy Mandal, Telangana",
    aspectRatio: "16:9",
    recommendedWidth: 1600,
    recommendedHeight: 900,
  },
  company_craftsmanship: {
    key: "company_craftsmanship",
    label: "Company - Stone Quality Inspection",
    src: null,
    alt: "Technical stone technicians inspecting slab calibration, diagonal accuracy, and surface gloss",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  company_office: {
    key: "company_office",
    label: "Company - Registered Office",
    src: null,
    alt: "The Lumbini Exports administrative office at Waddepally, Hanamkonda",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },

  // Infrastructure & Processing
  infra_gangsaw_block_cutter: {
    key: "infra_gangsaw_block_cutter",
    label: "Infrastructure - Gang Saw Block Cutters",
    src: null,
    alt: "Heavy multiblade gang saws slicing rough natural stone blocks into dimensional slabs",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_polishing_line: {
    key: "infra_polishing_line",
    label: "Infrastructure - Line Polishing Machinery",
    src: null,
    alt: "Multi-head automated continuous line polisher applying abrasive grits to achieve high gloss",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_bridge_saw_cutting: {
    key: "infra_bridge_saw_cutting",
    label: "Infrastructure - Bridge Cutting & Sizing",
    src: null,
    alt: "Precision bridge cutting saws trimming slabs into exact client project specifications",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_stockyard: {
    key: "infra_stockyard",
    label: "Infrastructure - Raw Material Stockyard",
    src: null,
    alt: "Open-air raw granite block stockyard with gantry crane logistics",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_facilities_processing: {
    key: "infra_facilities_processing",
    label: "Infrastructure - Covered Processing Bay",
    src: null,
    alt: "Industrial covered stone processing workshop housing cutting and calibration machinery",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_quality_inspection: {
    key: "infra_quality_inspection",
    label: "Infrastructure - Thickness & Gloss Inspection",
    src: null,
    alt: "Calipers and gloss-meter quality testing of finished natural stone export orders",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_delivery_crating: {
    key: "infra_delivery_crating",
    label: "Infrastructure - Wooden Crate Fabrication",
    src: null,
    alt: "Custom wooden crating with protective foam and polyethylene wrapping for export stone slabs",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_export_packing: {
    key: "infra_export_packing",
    label: "Infrastructure - Wooden Crate Packing & Stuffing",
    src: null,
    alt: "Sturdy ISPM-15 compliant fumigated wooden crates secured with steel straps inside shipping container",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
  infra_delivery_dispatch: {
    key: "infra_delivery_dispatch",
    label: "Infrastructure - Container Dispatch & Transit",
    src: null,
    alt: "Loaded freight truck and container ready for dispatch from Elkathurthy to seaport",
    aspectRatio: "3:2",
    recommendedWidth: 1200,
    recommendedHeight: 800,
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof imageSlots;
