# The Lumbini Exports — Official Website

> Official commercial web application for **The Lumbini Exports** (Established 2023), an architectural granite cutting and polishing unit in Elkathurthy Village & Mandal, Hanamkonda District, Telangana, India.

---

## 1. Project Overview & Architecture

The application is built with **Next.js 16 App Router**, **TypeScript in strict mode**, and **Tailwind CSS v4**, designed for overseas stone importers, architectural firms, distributors, and domestic builders.

### Key Technology Choices
- **Framework**: Next.js 16.4 (App Router, Turbopack, Partial Prerendering)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 with bespoke CSS design tokens
- **Typography**: Self-hosted through `next/font`: *Cormorant Garamond* (Hero & Display) and *DM Sans* (Body, Navigation, UI labels)
- **Validation**: Shared client/server validation via **Zod**
- **Email Dispatch**: **Resend** transactional email API with HTML and plain-text fallback
- **Icons & Primitives**: Lucide React & headless accessible SVG components
- **Zero Hallucination Standard**: Every piece of copy is factual and verified against client records; all pending details are systematically cataloged in [`docs/TODO-CLIENT.md`](docs/TODO-CLIENT.md).

---

## 2. Getting Started & Local Development

### Prerequisites
- Node.js `18.18+` or `20+`
- npm (or pnpm / yarn)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd lumbini

# Install dependencies
npm install

# Start the local development server (runs with Turbopack on port 3000)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
```bash
# Run local development server
npm run dev

# Run ESLint validation
npm run lint

# Check TypeScript types
npx tsc --noEmit

# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 3. Environment Variables Configuration

Copy `.env.example` to create your local `.env.local` file:

```bash
cp .env.example .env.local
```

### Environment Variables Reference

| Variable | Scope | Required | Description |
|:---|:---|:---:|:---|
| `RESEND_API_KEY` | Server-only | No (Dev) / Yes (Prod) | API key from [Resend](https://resend.com) for sending quote request emails. In local development without this key, submissions are safely logged to the console and return success. |
| `QUOTE_TO_EMAIL` | Server-only | Optional | Recipient address where quote inquiries are sent. Defaults to `thelumbiniexports@gmail.com`. |
| `QUOTE_FROM_EMAIL` | Server-only | Optional | Verified sender address (e.g., `The Lumbini Exports <quotes@thelumbiniexports.com>` or `onboarding@resend.dev` during initial setup). |
| `NEXT_PUBLIC_PHONE` | Browser/Client | Optional | International phone number for customer contact. Filtered out if left as placeholder. |
| `NEXT_PUBLIC_WHATSAPP` | Browser/Client | Optional | International WhatsApp number. Renders the floating chat button and header WhatsApp links only when a valid number is provided. |
| `NEXT_PUBLIC_SITE_URL` | Browser/Client | Optional | Canonical production URL (defaults to `https://www.thelumbiniexports.in`). When set to this URL, search engines are permitted to index the site; on staging/preview domains, `noindex` is applied automatically. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Browser/Client | Optional | Google Search Console site verification token. When provided, renders `<meta name="google-site-verification" content="..." />`. |
| `NEXT_PUBLIC_BING_VERIFICATION` | Browser/Client | Optional | Bing Webmaster Tools verification token. When provided, renders `<meta name="msvalidate.01" content="..." />`. |
| `TURNSTILE_SECRET_KEY` | Server-only | Optional | Cloudflare Turnstile secret key. Bot verification activates automatically if this key is set. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Browser/Client | Optional | Cloudflare Turnstile site key for client challenge widget. |
| `CREDENTIALS_STORE_PATH` | Server-only | Optional | Absolute or relative path to authoritative server JSON store for credential verification. Defaults to `data/credentials.json`. |

> **Canonical Host & Domain Redirect Requirement**:
> The canonical host for the production website is **`https://www.thelumbiniexports.in`**.
> At the hosting / DNS provider level (e.g. Vercel, Cloudflare, or DNS provider), you **must configure a permanent HTTP 301 redirect** from the non-www apex domain (`thelumbiniexports.in`) to the www subdomain (`www.thelumbiniexports.in`). All canonical tags, sitemaps, OpenGraph links, and structured data point strictly to the `www` address.

> **Security Note**: Never prefix API keys or secrets with `NEXT_PUBLIC_`. All email dispatch and anti-bot verification occurs strictly on the server in [`src/app/api/quote/route.ts`](src/app/api/quote/route.ts).

---

## 4. How to Edit Website Content

All textual content is decoupled from layout components and centralized in strongly-typed files in `src/content/`:

| File | Content Controlled |
|:---|:---|
| [`src/content/site.ts`](src/content/site.ts) | Company legal name, physical unit address, registered office, official email, phone, and environmental compliance flags. |
| [`src/content/home.ts`](src/content/home.ts) | Home page hero headline, supporting copy, value pillars, about teaser, process steps, and call to action. |
| [`src/content/company.ts`](src/content/company.ts) | Company page story (2 paragraphs), what we do (3-phase list), core commitments, and directions copy. |
| [`src/content/stones.ts`](src/content/stones.ts) | Complete natural granite catalog (Tan Brown, Royal Blue, Safari Blue, Honey Blue, Lapotra, Flaming), technical properties, finishes, and applications. |
| [`src/content/infrastructure.ts`](src/content/infrastructure.ts) | Facility machinery, covered processing bays, raw block stockyard, and delivery photo cards. |
| [`src/content/quote-options.ts`](src/content/quote-options.ts) | Surface finishes, measurement units (sq ft, sq m, MT, FCL), slab thicknesses, cut formats, and Incoterm shipment choices. |
| [`src/content/legal.ts`](src/content/legal.ts) | Plain-English legal copy for Terms & Conditions and Privacy Policy, plus the `LEGAL_LAST_UPDATED` constant. |

---

## 5. How to Swap Images

The website uses a centralized image registry pattern via [`src/content/images.ts`](src/content/images.ts) and the shared [`SiteImage`](src/components/ui/SiteImage.tsx) component.

### Step-by-Step Image Replacement
1. Place your photographic files (JPEG, PNG, or WebP) in `public/images/` (e.g. `public/images/stones/tan-brown/main.webp`).
2. Open [`src/content/images.ts`](src/content/images.ts).
3. Find the corresponding image slot key and update the `src` property:
   ```typescript
   stone_tan_brown_main: {
     key: "stone_tan_brown_main",
     label: "Tan Brown - Primary Slab",
     src: "/images/stones/tan-brown/main.webp",
     alt: "Tan Brown granite slab showing dark brown and black mineral crystals",
     aspectRatio: "3:2",
     recommendedWidth: 1200,
     recommendedHeight: 800,
   },
   ```
4. Save the file. All pages, galleries, and cards utilizing that image key will automatically render the photographic asset with proper aspect ratio, responsive `sizes`, and zero layout shift.

---

## 6. Deployment Guide (Vercel)

The project is pre-configured for deployment on the [Vercel](https://vercel.com) platform.

### Deployment Instructions (Step-by-Step)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect **Next.js**.
4. In the **Environment Variables** panel, add the production variables:
   - `RESEND_API_KEY`: Your live production key from Resend.
   - `QUOTE_TO_EMAIL`: `thelumbiniexports@gmail.com` (or client designated inbox).
   - `QUOTE_FROM_EMAIL`: Verified domain email (e.g., `The Lumbini Exports <quotes@thelumbiniexports.com>`).
   - `NEXT_PUBLIC_PHONE`: Confirmed international telephone number.
   - `NEXT_PUBLIC_WHATSAPP`: Confirmed international WhatsApp number.
   - `NEXT_PUBLIC_SITE_URL`: Production canonical domain (e.g. `https://thelumbiniexports.com`).
5. Ensure the Build Command is set to `next build` (or `npm run build`).
6. Click **"Deploy"**.
7. Once deployed, link your custom domain under **Project Settings > Domains** and configure the corresponding DNS A/CNAME records.

---

## 7. Internship Credential Verification (`/verify/[credentialId]`)

Phase 10 introduces unlisted, authoritative credential verification for internships issued by The Lumbini Exports.

- **Route**: `/verify/[credentialId]` (e.g. `/verify/TLE-INT-2026-001`).
- **Access**: Unlisted, public by direct URL or certificate QR code. Not included in main navigation, footer, or public sitemap.
- **Robots / Indexing**: Carries `noindex, follow` metadata so search engines do not index verification records.
- **Authoritative Verification**: Verified live on every page load against the server-side persistent store (`data/credentials.json`).
- **Document Security**: PDF documents are served via `/api/verify/[credentialId]/document` with strict directory traversal prevention and security headers.
- **LinkedIn Integration**: Direct pre-filled workflow for adding certified credentials to recipient LinkedIn profiles.

---

## 8. Outstanding Client Items (TODO-CLIENT)

Before final public launch, review [`docs/TODO-CLIENT.md`](docs/TODO-CLIENT.md) for all items requiring client confirmation, including:
- Official phone and WhatsApp numbers
- GST and IEC registration codes
- Official high-resolution Buddha emblem logo asset
- Confirmation of stone technical specifications (compressive strength, water absorption, quarry origin)
- TSPCB Green Environmental Category order documentation
- Legal counsel sign-off on Terms & Conditions and Privacy Policy drafts

---

## 8. License & Ownership

&copy; 2023&ndash;Present The Lumbini Exports. All rights reserved. Commercial property of The Lumbini Exports, Telangana, India.
