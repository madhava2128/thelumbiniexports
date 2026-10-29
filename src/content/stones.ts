import { type ImageSlotKey } from "./images";

export type StoneCategory = "Colour" | "Finish";

export interface StoneSpecification {
  primaryColor?: string;
  surfaceFinish?: string;
  availableForms?: string;
  finishOptions?: string[];
  recommendedUses?: string[];
  standardThickness?: string[];
}

export interface StoneItem {
  slug: string;
  name: string;
  category: StoneCategory;
  metaTitle: string;
  metaDescription: string;
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
    slug: "tan-brown",
    name: "Tan Brown",
    category: "Colour",
    metaTitle: "Tan Brown Granite | The Lumbini Exports",
    metaDescription:
      "Natural Tan Brown granite cut and polished in Hanamkonda, Telangana. Dark brown and black crystalline granite for countertops, flooring, and cladding.",
    shortDescription:
      "A dark natural granite featuring rich brown and black tones with distinctive crystalline patterns.",
    longDescription:
      "Tan Brown is a natural granite characterised by its dark brown and black background accented with rich mineral crystals. Processed at our Elkathurthy facility into polished slabs and calibrated tiles, it is commonly specified for kitchen countertops, interior flooring, wall cladding, and exterior steps.",
    specifications: {
      primaryColor: "Dark brown and black with reddish-brown mineral crystals",
      surfaceFinish: "Polished, Flamed, or Lapotra",
      availableForms: "Gangsaw slabs, cutter slabs, and cut-to-size project formats",
      finishOptions: ["Polished", "Flamed", "Lapotra", "Honed"],
      recommendedUses: [
        "Kitchen Countertops & Worktops",
        "Commercial & Residential Flooring",
        "Exterior Wall Cladding",
        "Steps & Staircases",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_tan_brown_main",
      texture: "stone_tan_brown_texture",
      slab: "stone_tan_brown_slab",
      application: "stone_tan_brown_application",
    },
  },
  {
    slug: "peacock-brown",
    name: "Peacock Brown",
    category: "Colour",
    metaTitle: "Peacock Brown Granite | The Lumbini Exports",
    metaDescription:
      "Peacock Brown natural granite cut and polished in Telangana. Dark brown and black crystalline granite for interior and exterior applications.",
    shortDescription:
      "A brown natural granite featuring dark brown and black tones with rich crystalline mineral patterns.",
    longDescription:
      "Peacock Brown is a brown natural granite offered by The Lumbini Exports, characterized by a dark brown and black background accented with rich crystalline mineral patterns. Processed at our Elkathurthy facility into polished slabs and calibrated tiles, it is commonly specified for interior flooring, countertops, wall cladding, and exterior architectural applications.",
    specifications: {
      primaryColor: "Dark brown and black with rich crystalline mineral patterns",
      surfaceFinish: "Polished, Flamed, or Lapotra",
      availableForms: "Gangsaw slabs, cutter slabs, and cut-to-size project formats",
      finishOptions: ["Polished", "Flamed", "Lapotra", "Honed"],
      recommendedUses: [
        "Kitchen Countertops & Worktops",
        "Commercial & Residential Flooring",
        "Exterior Wall Cladding",
        "Steps & Staircases",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_peacock_brown_main",
      texture: "stone_peacock_brown_texture",
      slab: "stone_peacock_brown_slab",
      application: "stone_peacock_brown_application",
    },
  },
  {
    slug: "royal-blue",
    name: "Royal Blue",
    category: "Colour",
    metaTitle: "Royal Blue Granite | The Lumbini Exports",
    metaDescription:
      "Deep blue and charcoal crystalline Royal Blue granite processed in Hanamkonda, Telangana. Slabs and cut-to-size formats for countertops and facades.",
    shortDescription:
      "A natural granite defined by deep blue and charcoal crystalline formations with subtle grey accents.",
    longDescription:
      "Royal Blue is a natural granite displaying deep blue and charcoal tones interspersed with grey mineral crystals. Its distinctive palette provides a solid visual presence suitable for polished countertops, reception desks, interior feature flooring, and exterior facade elements.",
    specifications: {
      primaryColor: "Deep blue and charcoal with grey crystalline accents",
      surfaceFinish: "Polished, Flamed, or Lapotra",
      availableForms: "Gangsaw slabs, cutter slabs, and cut-to-size project formats",
      finishOptions: ["Polished", "Flamed", "Lapotra", "Honed"],
      recommendedUses: [
        "Feature Wall Cladding",
        "Countertops & Reception Surfaces",
        "High-Traffic Commercial Flooring",
        "Exterior Architectural Elements",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_royal_blue_main",
      texture: "stone_royal_blue_texture",
      slab: "stone_royal_blue_slab",
      application: "stone_royal_blue_application",
    },
  },
  {
    slug: "safari-blue",
    name: "Safari Blue",
    category: "Colour",
    metaTitle: "Safari Blue Granite | The Lumbini Exports",
    metaDescription:
      "Cool blue-grey crystalline Safari Blue granite processed in Telangana. Uniform natural veining for contemporary flooring, vanity tops, and paving.",
    shortDescription:
      "A distinctive natural granite presenting balanced blue-grey hues with natural mineral movements.",
    longDescription:
      "Safari Blue is a natural granite characterized by cool blue-grey hues interwoven with crystalline mineral veining. It offers an elegant, neutral appearance well suited for contemporary interior spaces, large-format paving, vanity tops, and durable commercial installations.",
    specifications: {
      primaryColor: "Blue-grey background with natural crystalline veining",
      surfaceFinish: "Polished, Flamed, or Lapotra",
      availableForms: "Gangsaw slabs, cutter slabs, and cut-to-size project formats",
      finishOptions: ["Polished", "Flamed", "Lapotra", "Honed"],
      recommendedUses: [
        "Interior Floor Tiling",
        "Vanity Tops & Counters",
        "Building Facades & Cladding",
        "Landscape & Pathway Paving",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_safari_blue_main",
      texture: "stone_safari_blue_texture",
      slab: "stone_safari_blue_slab",
      application: "stone_safari_blue_application",
    },
  },
  {
    slug: "honey-blue",
    name: "Honey Blue",
    category: "Colour",
    metaTitle: "Honey Blue Granite | The Lumbini Exports",
    metaDescription:
      "Balanced honey and blue-grey crystalline Honey Blue granite cut in Hanamkonda, Telangana. Calibrated slabs for feature walls and statement surfaces.",
    shortDescription:
      "A natural granite blending warm honey tones with soft blue and grey crystalline mineral structures.",
    longDescription:
      "Honey Blue combines warm golden and honey-coloured mineral highlights with cool blue-grey crystalline matrices. This balanced contrast makes it an attractive choice for statement countertops, bespoke furniture tops, decorative wall panels, and interior floor layouts.",
    specifications: {
      primaryColor: "Honey and golden tones blended with blue-grey crystalline structures",
      surfaceFinish: "Polished, Flamed, or Lapotra",
      availableForms: "Gangsaw slabs, cutter slabs, and cut-to-size project formats",
      finishOptions: ["Polished", "Flamed", "Lapotra", "Honed"],
      recommendedUses: [
        "Decorative Wall Panels",
        "Kitchen Islands & Countertops",
        "Hotel & Residential Flooring",
        "Bespoke Architectural Stonework",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_honey_blue_main",
      texture: "stone_honey_blue_texture",
      slab: "stone_honey_blue_slab",
      application: "stone_honey_blue_application",
    },
  },
  {
    slug: "lapotra",
    name: "Lapotra",
    category: "Finish",
    metaTitle: "Lapotra Anti-Skid Granite | The Lumbini Exports",
    metaDescription:
      "Textured Lapotra anti-skid granite finish produced in Hanamkonda, Telangana. Slip-resistant architectural surface for walkways, steps, and pool decks.",
    shortDescription:
      "An anti-skid granite finish for surfaces where grip matters.",
    longDescription:
      "An anti-skid granite finish for surfaces where grip matters. Produced through specialised mechanical abrasive brushing, the Lapotra finish provides a textured, slip-resistant surface that retains the natural colour and crystalline character of the underlying granite while offering dependable footing in wet and high-traffic conditions.",
    specifications: {
      primaryColor: "Textured granite surface preserving base mineral colour",
      surfaceFinish: "Lapotra (anti-skid textured finish)",
      availableForms: "Slabs, calibrated tiles, and cut-to-size project formats",
      finishOptions: ["Lapotra"],
      recommendedUses: [
        "Surfaces where grip matters",
        "Exterior Paving & Walkways",
        "Pool Decks & Wet Environments",
        "Stair Treads & Entrance Ramps",
      ],
      standardThickness: ["18 mm", "20 mm", "30 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_lapotra_main",
      texture: "stone_lapotra_texture",
      slab: "stone_lapotra_slab",
      application: "stone_lapotra_application",
    },
  },
  {
    slug: "flaming",
    name: "Flaming",
    category: "Finish",
    metaTitle: "Flamed Granite Finish | The Lumbini Exports",
    metaDescription:
      "Flame-torched Flaming granite finish processed in Hanamkonda, Telangana. Rugged non-slip textured granite slabs and paving for exterior architecture.",
    shortDescription:
      "Granite with a flame-torched upper surface.",
    longDescription:
      "Granite with a flame-torched upper surface. High-temperature flame torching exfoliates the topmost mineral crystals to create a rugged, non-slip flamed finish ideal for exterior walkways, vehicular driveways, and outdoor architectural paving.",
    specifications: {
      primaryColor: "Flame-textured matte surface with exposed natural crystals",
      surfaceFinish: "Flamed (thermal torch treated)",
      availableForms: "Slabs, paving stones, and cut-to-size project formats",
      finishOptions: ["Flamed"],
      recommendedUses: [
        "Exterior Paving & Walkways",
        "Driveways & Parking Areas",
        "Ramps & Outdoor Steps",
        "Architectural Facades & Cladding",
      ],
      standardThickness: ["20 mm", "30 mm", "40 mm", "Custom thickness on request"],
    },
    imageKeys: {
      main: "stone_flaming_main",
      texture: "stone_flaming_texture",
      slab: "stone_flaming_slab",
      application: "stone_flaming_application",
    },
  },
];

export function getStoneBySlug(slug: string): StoneItem | undefined {
  return stones.find((stone) => stone.slug === slug);
}
