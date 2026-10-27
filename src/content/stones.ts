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
    shortDescription:
      "A dark South Indian granite featuring rich brown and black tones with distinctive crystalline patterns.",
    longDescription:
      "Tan Brown is a natural granite characterised by its dark brown and black background accented with rich mineral crystals. Known for its strength and consistent colouration, it is commonly specified for kitchen countertops, interior flooring, wall cladding, and exterior paving applications.",
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
    slug: "royal-blue",
    name: "Royal Blue",
    category: "Colour",
    shortDescription:
      "A premium granite defined by deep blue and charcoal crystalline formations with subtle grey accents.",
    longDescription:
      "Royal Blue is a natural granite displaying deep blue and charcoal tones interspersed with grey mineral crystals. Its distinctive palette provides a striking visual presence suitable for polished countertops, reception desks, interior feature flooring, and exterior facade elements.",
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
    shortDescription:
      "A distinctive granite presenting balanced blue-grey hues with natural mineral movements.",
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
    shortDescription:
      "A unique granite blending warm honey tones with soft blue and grey crystalline mineral structures.",
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
    shortDescription:
      "Granite with a flame-torched upper surface.",
    longDescription:
      "Granite with a flame-torched upper surface. High-temperature flame torching exfoliates the topmost mineral crystals to create a rugged, non-slip texture ideal for external walkways, vehicular driveways, exterior building surrounds, and public paving areas exposed to weather.",
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
