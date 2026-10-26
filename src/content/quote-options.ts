/**
 * Quote Request Form Configuration Options
 *
 * ============================================================================
 * NOTICE: TO BE CONFIRMED WITH THE CLIENT
 * ============================================================================
 * All option lists below are preliminary defaults configured for natural stone
 * and granite export quotation requests. The client/developer may freely adjust,
 * expand, or reorder these options.
 */

export interface QuoteOptionItem {
  id: string;
  label: string;
  description?: string;
}

/**
 * Measurement units for quote volume inquiries.
 * TODO(client): confirm preferred measurement units
 */
export const quantityUnits: QuoteOptionItem[] = [
  { id: "sq_ft", label: "Square Feet (sq ft)", description: "Imperial surface area" },
  { id: "sq_m", label: "Square Metres (sq m)", description: "Metric surface area" },
  { id: "tonnes", label: "Metric Tonnes (MT)", description: "Heavy block or weight-based orders" },
  { id: "containers", label: "Full Container Loads (FCL)", description: "20ft export ocean containers" },
];

/**
 * Standard stone thickness options.
 * TODO(client): confirm standard slab thickness choices offered by factory
 */
export const thicknessOptions: QuoteOptionItem[] = [
  { id: "18mm", label: "18 mm", description: "Standard commercial slab thickness" },
  { id: "20mm", label: "20 mm", description: "Standard export thickness" },
  { id: "30mm", label: "30 mm", description: "Heavy-duty countertop and external paving" },
  { id: "custom", label: "Custom Thickness", description: "Bespoke dimensions specified in RFQ notes" },
];

/**
 * Standard stone cutting / fabrication sizing choices.
 * TODO(client): confirm standard cut formats provided
 */
export const sizeChoices: QuoteOptionItem[] = [
  { id: "slabs", label: "Gangsaw / Cutter Slabs", description: "Full dimensional slabs" },
  { id: "tiles", label: "Calibrated Tiles", description: "Standard 300x300, 600x600, 600x1200 mm" },
  { id: "blocks", label: "Rough Quarried Blocks", description: "Direct quarry dimensional blocks" },
  { id: "cut_to_size", label: "Cut-to-Size Project Pieces", description: "Fabricated to architectural drawings" },
  { id: "custom", label: "Custom Specifications", description: "Specify bespoke measurements in inquiry" },
];

/**
 * International Commercial Terms (Incoterms) and delivery choices.
 * TODO(client): confirm standard shipment terms offered to overseas buyers
 */
export const deliveryChoices: QuoteOptionItem[] = [
  { id: "ex_works", label: "Ex-Works (Factory, Telangana)", description: "Buyer arranges freight from Elkathurthy facility" },
  { id: "fob", label: "FOB (Free on Board - Indian Port)", description: "Delivered & cleared on board at Indian sea port" },
  { id: "cif", label: "CIF (Cost, Insurance & Freight)", description: "Delivered to buyer's destination port of discharge" },
  { id: "other", label: "Other / Domestic Delivery", description: "Door-to-door or regional logistics" },
];
