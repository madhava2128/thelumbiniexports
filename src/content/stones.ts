import { type ImageSlotKey } from "./images";

/**
 * Natural Stone Product Catalog for The Lumbini Exports.
 *
 * NOTE: Stone characteristics describe general geologic attributes.
 * Specific quarry origins, dimensional thresholds, and technical test data
 * are marked with `// TODO(client): confirm` comments and must be verified
 * prior to launch.
 */

export type StoneType = "Granite" | "Marble" | "Basalt";

export interface StoneSpecification {
  // Common physical specifications
  quarryOrigin?: string;
  primaryColor: string;
  finishOptions: string[];
  recommendedUses: string[];
  standardThickness?: string[];
  slabSizesAvailable?: string;
  waterAbsorption?: string;
  compressiveStrength?: string;
}

export interface StoneItem {
  slug: string;
  name: string;
  type: StoneType;
  shortDescription: string;
  longDescription: string;
  specifications: StoneSpecification;
  imageKeys: {
    main: ImageSlotKey;
    texture: ImageSlotKey;
    slab: ImageSlotKey;
    application: ImageSlotKey;
  };
}

export const stones: StoneItem[] = [
  {
    slug: "imperial-pink-granite",
    name: "Imperial Pink Granite",
    type: "Granite",
    shortDescription:
      "A distinguished Indian granite characterized by soft pink tones, crystalline grey flecks, and deep mineral veining.",
    longDescription:
      // TODO(client): confirm stone description and marketing copy
      "Imperial Pink Granite is one of India's renowned architectural stones. Known for its uniform crystalline structure and warm pink tones interspersed with subtle grey and black quartz flecks, it offers exceptional compressive strength and weather resistance for expansive exterior paving and interior flooring applications.",
    specifications: {
      // TODO(client): confirm quarry location/region
      quarryOrigin: "Telangana / Andhra Pradesh, India",
      primaryColor: "Pink with grey and dark quartz crystals",
      // TODO(client): confirm finish capabilities offered at Elkathurthy facility
      finishOptions: [
        "Polished",
        "Honed",
        "Flamed",
        "Leathered / Antique",
        "Bush-Hammered",
      ],
      recommendedUses: [
        "Exterior Facades & Cladding",
        "Commercial & Residential Flooring",
        "Countertops & Vanities",
        "Paving & Kerbstones",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom on request"],
      slabSizesAvailable: "Gangsaw Slabs & Cutter Slabs",
      // TODO(client): confirm lab certified water absorption & strength metrics
      waterAbsorption: "Low (< 0.25%) // TODO(client): confirm exact lab test result",
      compressiveStrength: "High // TODO(client): confirm exact lab test result in MPa",
    },
    imageKeys: {
      main: "stone_imperial_pink_main",
      texture: "stone_imperial_pink_texture",
      slab: "stone_imperial_pink_slab",
      application: "stone_imperial_pink_application",
    },
  },
  {
    slug: "tan-brown-granite",
    name: "Tan Brown Granite",
    type: "Granite",
    shortDescription:
      "A globally recognized dark granite showcasing rich reddish-brown mineral flowers and deep black crystalline matrices.",
    longDescription:
      // TODO(client): confirm stone description and marketing copy
      "Tan Brown Granite is quarried extensively in the Telangana region of Southern India and holds universal acclaim across international stone markets. It is defined by its deep brown and burgundy mineral swirls contrasted against a dark charcoal-black backdrop, making it an enduring favourite for luxury countertops, high-traffic commercial flooring, and exterior cladding.",
    specifications: {
      // TODO(client): confirm exact quarry source
      quarryOrigin: "Karimnagar / Telangana Region, India",
      primaryColor: "Dark brown & black with burgundy minerals",
      // TODO(client): confirm available finishes
      finishOptions: [
        "High-Gloss Polished",
        "Honed",
        "Flamed",
        "Leathered",
        "Lapatro",
      ],
      recommendedUses: [
        "Kitchen Countertops & Worktops",
        "Hotel & Commercial Lobby Flooring",
        "Monumental Architecture",
        "Exterior Wall Cladding",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom sizes"],
      slabSizesAvailable: "Gangsaw Slabs (280+ cm x 160+ cm) & Cutter Slabs",
      // TODO(client): confirm lab certified specs
      waterAbsorption: "Low (< 0.20%) // TODO(client): confirm exact lab test result",
      compressiveStrength: "High // TODO(client): confirm exact lab test result in MPa",
    },
    imageKeys: {
      main: "stone_tan_brown_main",
      texture: "stone_tan_brown_texture",
      slab: "stone_tan_brown_slab",
      application: "stone_tan_brown_application",
    },
  },
  {
    slug: "marble",
    name: "Natural Indian Marble",
    type: "Marble",
    shortDescription:
      "Timeless natural marble featuring fluid mineral veining, crystalline translucence, and graceful aesthetic depth.",
    longDescription:
      // TODO(client): confirm marble variety and processing capabilities
      "Natural Indian Marble quarried and cut for discerning architects and interior designers. Cut with precision into gangsaw slabs and calibrated tiles, this natural stone brings organic elegance to interior floors, wall panels, staircases, and bespoke architectural features.",
    specifications: {
      // TODO(client): confirm quarry location and specific trade variety
      quarryOrigin: "India",
      primaryColor: "White / Off-White / Grey with natural mineral veins",
      // TODO(client): confirm finishes
      finishOptions: [
        "Mirror Polished",
        "Honed",
        "Antique / Brushed",
      ],
      recommendedUses: [
        "Interior Flooring",
        "Feature Walls & Wall Cladding",
        "Bathroom Vanities & Liners",
        "Staircases & Risers",
      ],
      standardThickness: ["16 mm", "18 mm", "20 mm", "Custom cut-to-size"],
      slabSizesAvailable: "Gangsaw Slabs & Book-matched Sets",
      // TODO(client): confirm lab specs
      waterAbsorption: "Low // TODO(client): confirm exact lab test result",
    },
    imageKeys: {
      main: "stone_marble_main",
      texture: "stone_marble_texture",
      slab: "stone_marble_slab",
      application: "stone_marble_application",
    },
  },
  {
    slug: "basalt-stone",
    name: "Basalt Stone & Blocks",
    type: "Basalt",
    shortDescription:
      "A dense, volcanic stone engineered by nature for monumental endurance, civil infrastructure, and modern architectural paving.",
    longDescription:
      // TODO(client): confirm basalt source and block dimensions
      "Basalt is a dark, fine-grained igneous rock formed by cooling volcanic lava. Possessing exceptional density, compressive strength, and resistance to environmental abrasion, The Lumbini Exports supplies rough-hewn basalt blocks for export as well as cut-to-size kerbstones, cobblestones, and exterior pavers.",
    specifications: {
      // TODO(client): confirm basalt quarry source
      quarryOrigin: "Deccan Traps / Telangana Region, India",
      primaryColor: "Uniform Charcoal Grey / Obsidian",
      // TODO(client): confirm basalt finishes
      finishOptions: [
        "Natural Split / Rough Hewn",
        "Flamed",
        "Bush-Hammered",
        "Honed",
        "Sawn Cut",
      ],
      recommendedUses: [
        "Rough Blocks for Importers & Sculptors",
        "Road Kerbstones & Edging",
        "Urban Paving & Cobblestones",
        "Civil Infrastructure & Retaining Walls",
      ],
      standardThickness: ["Custom block sizes, 30 mm, 50 mm, 80 mm, 100 mm"],
      slabSizesAvailable: "Heavy Blocks & Sawn Cut Paving Elements",
      // TODO(client): confirm lab test results
      waterAbsorption: "Extremely Low (< 0.15%) // TODO(client): confirm exact lab test result",
      compressiveStrength: "Ultra High // TODO(client): confirm exact lab test result in MPa",
    },
    imageKeys: {
      main: "stone_basalt_main",
      texture: "stone_basalt_texture",
      slab: "stone_basalt_blocks",
      application: "stone_basalt_application",
    },
  },
];

export function getStoneBySlug(slug: string): StoneItem | undefined {
  return stones.find((stone) => stone.slug === slug);
}
