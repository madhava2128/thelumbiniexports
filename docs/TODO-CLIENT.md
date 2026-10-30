# Client Action Items & Information Required (TODO-CLIENT)

This internal tracking document lists outstanding items requiring client confirmation for **The Lumbini Exports**.
None of these notes appear on the public, rendered website.

---

## 1. Contact & Registration Details
| Field | Status | Current Value | Confirmed Client Value |
|---|---|---|---|
| **Contact Person** | Confirmed | `siteConfig.contactPerson` | **Kommaraju Srinadh** |
| **Phone Number (Primary)** | Confirmed | `NEXT_PUBLIC_PHONE` / `siteConfig.phone` | **+91 99082 97199** |
| **Phone Number (Secondary)** | Confirmed | `siteConfig.secondaryPhone` | **+91 70326 50171** |
| **WhatsApp Number** | Confirmed | `NEXT_PUBLIC_WHATSAPP` / `siteConfig.whatsApp` | **+91 99082 97199** |
| **GST Number (GSTIN)** | Confirmed | `siteConfig.gstNumber` | **36AASFT5150GIZV** |
| **Processing Unit Location** | Confirmed | `siteConfig.addresses.physicalUnit` | **SyNo 882 B2/2/1/2 882/B1/1, Elkathurthy Mandal, Hanamkonda, Telangana 505476** |
| **Google Maps Location** | Confirmed | `siteConfig.addresses.physicalUnit.googleMapsUrl` | **https://maps.app.goo.gl/ctrEZc4ZJCZcuquVA** |
| **IEC Number** | Pending confirmation | Not displayed on site | Importer Exporter Code issued by DGFT (India) |

---

## 2. Product Catalog (`src/content/stones.ts`)
The collection currently offers the 7 confirmed granite items:
1. Tan Brown (Colour)
2. Peacock Brown (Colour)
3. Royal Blue (Colour)
4. Safari Blue (Colour)
5. Honey Blue (Colour)
6. Lapotra (Finish)
7. Flaming (Finish)

Future technical specifications to confirm if lab test certificates are available:
- [ ] Certified compressive strength (MPa)
- [ ] Certified water absorption percentage (%)
- [ ] Specific quarry quarrying belts / coordinates

---

## 3. Email & Notification Configuration
- [ ] **Resend API Key** (`RESEND_API_KEY`): Email delivery service API key.
- [ ] **Quote Recipient Email** (`QUOTE_TO_EMAIL`): Email address where customer RFQs/quotes will be routed (e.g. `thelumbiniexports@gmail.com`).
- [ ] **Sender Verified Domain Email** (`QUOTE_FROM_EMAIL`): Verified domain sending email (e.g. `quotes@thelumbiniexports.com` or Resend onboarding address).
- [ ] **Production Site URL** (`NEXT_PUBLIC_SITE_URL`): Canonical domain URL for metadata and absolute links.

---

## 4. Environmental & Regulatory Documentation (Company Page)
- [ ] **Telangana State Pollution Control Board (TSPCB) Consent**: Provide copy of consent order confirming "GREEN" environmental category status before `showGreenClassification` boolean is enabled in `src/content/site.ts`.

---

## 5. Legal Documents Review
- [ ] **Terms & Conditions (`/terms`)**: Internal review before launch. Confirm clauses regarding non-binding quotations, natural stone variations, dispute jurisdiction (Telangana courts), and limitation of liability.
- [ ] **Privacy Policy (`/privacy`)**: Internal review before launch. Confirm data collection practices, email transmission through transactional providers (Resend), data retention policies, and cookie disclosures.

---

## 6. Internship Credential Verification (Phase 10: `/verify/[credentialId]`)
The credential verification subsystem is fully implemented and tested. Stored authoritative records currently include:
1. `TLE-INT-2026-001`: **K Madhava** (Web Development Intern, 9 evaluated tasks)
2. `TLE-INT-2026-002`: **M Sri Charan Goud** (Digital Marketing Intern, 9 evaluated tasks)
3. `TLE-INT-2026-003`: **Tenali Vinay** (Business Development Intern, 9 evaluated tasks)
4. `TLE-INT-2026-004`: **K MOHITH CHOWDARY** (Web Development Intern, 9 evaluated tasks)

The following items are pending confirmation before live production certificate generation:

| Item | Status | Current Setup / Placeholder | Action Required from Client / Owner |
|---|---|---|---|
| **Unique Credential IDs** | Configured | `TLE-INT-2026-001` through `TLE-INT-2026-004` (in `data/credentials.json`) | Confirm if serial sequence and prefix match official administrative filing. |
| **Completion Certificate (PDFs)** | Pending Upload | `certificateDocument: null` for all records | Supply official signed and sealed completion certificate PDFs. Place in `data/documents/` and update references in `data/credentials.json`. |
| **Offer Letter (PDFs)** | Pending Upload | `offerLetterDocument: null` for all records | Supply official signed appointment/offer letter PDFs. Place in `data/documents/` and update references in `data/credentials.json`. |
| **Completed Tasks & Evaluations** | Confirmed & Configured | 9 weekly tasks populated per role with 100% evaluated status | Verified across Web Development, Digital Marketing, and Business Development roles. |
| **Recipient Email Addresses** | Configured & Masked | Stored and securely masked on server display (e.g., `k***a@gmail.com`) | Update with individual's official personal/corporate emails if different. |
| **Authoritative Issuer Record** | Configured | `data/credentials.json` | Review confirmed fields: Issuer (The Lumbini Exports), Dates (1 Aug 2026 – 1 Oct 2026), Issue Date (10 Oct 2026), Signatory (Kommaraju Srinadh, CEO). |
| **Production Verification URLs** | Configured | `https://www.thelumbiniexports.in/verify/<ID>` | Ensure canonical domain is set in production deployment environment before generating QR codes. |
| **Certificate QR Code Destination** | Ready for printing | `https://www.thelumbiniexports.in/verify/<ID>` | Print QR codes targeting the canonical verification URL for each credential. |
| **Storage & Retention Policy** | Configured | Server-side file store (`data/credentials.json`), configurable via `CREDENTIALS_STORE_PATH` | Confirm long-term document retention period. |

