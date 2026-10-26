# Client Action Items & Information Required (TODO-CLIENT)

This document tracks all placeholders, missing assets, and unconfirmed details that need client input or verification for **The Lumbini Exports**.

---

## 1. Contact & Registration Details
| Field | Status | Current Code / Value | Confirmed Client Value |
|---|---|---|---|
| **Contact Person** | Confirmed | `siteConfig.contactPerson` | **Kommaraju Srinadh** |
| **Phone Number (Primary)** | Confirmed | `NEXT_PUBLIC_PHONE` / `siteConfig.phone` | **+91 99082 97199** |
| **Phone Number (Secondary)** | Confirmed | `siteConfig.secondaryPhone` | **+91 70326 50171** |
| **WhatsApp Number** | Confirmed | `NEXT_PUBLIC_WHATSAPP` / `siteConfig.whatsApp` | **+91 99082 97199** |
| **GST Number (GSTIN)** | Confirmed | `siteConfig.gstNumber` | **36AASFT5150GIZV** |
| **Processing Unit Location** | Confirmed | `siteConfig.addresses.physicalUnit` | **SyNo 882 B2/2/1/2 882/B1/1, Elkathurthy Mandal, Hanamkonda, Telangana 505476** |
| **Google Maps Location** | Confirmed | `siteConfig.addresses.physicalUnit.googleMapsUrl` | **https://maps.app.goo.gl/ctrEZc4ZJCZcuquVA** |
| **IEC Number** | Pending | `[IEC NUMBER]` | Importer Exporter Code issued by DGFT (India) |

---

## 2. Brand Assets
| Asset | Expected Location | Current Status | Description / Action Required |
|---|---|---|---|
| **Logo** | `public/brand/logo.svg` & `src/components/ui/Logo.tsx` | **Active (WebGL Metallic Paint)** | Official Buddha emblem & wordmark rendered with interactive gold liquid metal shader (`#f2c46b`) |
| **Favicon / App Icon** | `src/app/icon.svg` or `public/brand/favicon.ico` | Default placeholder | Brand favicon / browser icon featuring emblem |

---

## 3. Product Catalog & Stone Details (`src/content/stones.ts`)
*All draft technical stone properties must be confirmed before launch:*
- [ ] **Imperial Pink Granite**: Confirm quarry origin, standard slab/tile dimensions, finishes available (polished, flamed, honed, leathered), and density/compressive strength.
- [ ] **Tan Brown Granite**: Confirm standard slab thicknesses (18mm, 20mm, 30mm), quarry origin, finishes, and typical block sizes.
- [ ] **Marble**: Confirm marble variety/colors supplied, finish capabilities, standard dimensions, and recommended interior applications.
- [ ] **Basalt Stone / Blocks**: Confirm block dimensions, kerbstone/cobblestone cutting capabilities, and physical technical specifications.

---

## 4. Quote Form Configuration (`src/content/quote-options.ts`)
- [ ] **Quantity Units**: Confirm default list: Square Feet (sq ft), Square Metres (sq m), Tonnes (MT), Full Container Loads (FCL).
- [ ] **Thickness Options**: Confirm standard: 18 mm, 20 mm, 30 mm, Custom.
- [ ] **Size / Cut Options**: Confirm standard: Gangsaw Slabs, Cutter Slabs, Tiles, Blocks, Cut-to-size, Custom.
- [ ] **Incoterms / Delivery Choices**: Confirm options: Ex-Works (Factory), FOB (Port of Loading), CIF (Destination Port), Other.

---

## 5. Email & Notification Configuration
- [ ] **Resend API Key** (`RESEND_API_KEY`): Email delivery service API key.
- [ ] **Quote Recipient Email** (`QUOTE_TO_EMAIL`): Email address where customer RFQs/quotes will be routed (e.g. `thelumbiniexports@gmail.com`).
- [ ] **Sender Verified Domain Email** (`QUOTE_FROM_EMAIL`): Verified domain sending email (e.g. `quotes@thelumbiniexports.com` or Resend onboarding address).
- [ ] **Production Site URL** (`NEXT_PUBLIC_SITE_URL`): Canonical domain URL for metadata and absolute links.

---

## 6. Packaging & Shipping Specifications (Home Pillar 3)
- [ ] **Packaging Standards**: Confirm exact export crating specifications (e.g. ISPM-15 fumigated wooden crates, steel-strapped bundles, A-frames for polished slabs) and container loading protocol.

---

## 7. Environmental & Regulatory Documentation (Company Page)
- [ ] **Telangana State Pollution Control Board (TSPCB) Consent**: Provide copy of consent order confirming "GREEN" environmental category status before `showGreenClassification` boolean is enabled in `src/content/site.ts`.

---

## 8. Infrastructure, Machines & Facility Specifications (`src/content/infrastructure.ts`)
*All equipment descriptions currently use neutral placeholders marked with TODO(client):*
- [ ] **Machines (Section 1)**: Confirm exact machinery in unit:
  - Cutting line: Gang saw or multi-blade block cutter manufacturer, blade capacity, or specifications.
  - Polishing line: Automated line polishing machine details, number of polishing heads, and gloss standards.
  - Sizing & trimming: Bridge cutting saw dimensions, maximum slab size, and edge profiling capabilities.
- [ ] **Operations & Facilities (Section 2)**:
  - Raw material yard: Stockyard square footage and gantry crane lifting capacity (tonnes).
  - Processing bay: Workshop covered square footage and water recycling/slurry management system.
  - Quality inspection: Calibration tolerances, gloss-meter inspection, and slab grading protocol.
- [ ] **Delivery & Dispatch (Section 3)**:
  - Wooden crating: ISPM-15 fumigation certification details and custom crate fabrication.
  - Container stuffing: Heavy handling equipment (gantry/forklift), strapping standards, and ocean container load capacity.
  - Transport logistics: Domestic freight carriers and export port transit timelines (Chennai / Vizag ports).

---

## 9. Legal Documents Review (LAUNCH-BLOCKING)
- [ ] **Terms & Conditions (`/terms`)**: DRAFT: to be reviewed by a qualified professional before launch. Confirm clauses regarding non-binding quotations, natural stone variations, dispute jurisdiction (Telangana courts), and limitation of liability.
- [ ] **Privacy Policy (`/privacy`)**: DRAFT: to be reviewed by a qualified professional before launch. Confirm data collection practices, email transmission through transactional providers (Resend), data retention policies, and finalize cookie/analytics disclosures before enabling any web analytics.


