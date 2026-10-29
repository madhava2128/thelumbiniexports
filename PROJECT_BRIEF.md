# Project Brief: The Lumbini Exports

## Client
- **Company Name**: The Lumbini Exports
- **Established**: 2023
- **Business**: A granite cutting and polishing unit that supplies and exports natural granite only.
- **Granite Range (Seven Items)**:
  1. Tan Brown (Colour)
  2. Peacock Brown (Colour)
  3. Royal Blue (Colour)
  4. Safari Blue (Colour)
  5. Honey Blue (Colour)
  6. Lapotra (Finish): an anti-skid granite surface used where grip matters.
  7. Flaming (Finish): granite whose upper surface is flame-torched.
- **Physical Unit**: SyNo 882 B2/2/1/2 882/B1/1, Elkathurthy Mandal, Hanamkonda, Telangana 505476, India. (Maps: https://maps.app.goo.gl/ctrEZc4ZJCZcuquVA)
- **Registered Office**: H.No. 2-8-14/301, Waddepally, Hanamkonda, Telangana, India.
- **Email**: thelumbiniexports@gmail.com
- **Contact Person**: Kommaraju Srinadh
- **Phone**: +91 99082 97199 (Primary), +91 70326 50171 (Secondary)
- **WhatsApp**: +91 99082 97199
- **GST Number**: 36AASFT5150GIZV
- **IEC Number**: Pending verification.

---

## Audience and Goal
- **Audience**: Overseas importers, distributors, builders and architects, plus domestic buyers.
- **Primary Goal**: The one goal of the site is to get quote requests.

---

## Pages
- **Home**: `/`
- **Company**: `/company`
- **Collection**: `/collection`
- **Stone Detail**: `/collection/[slug]`
- **Infrastructure**: `/infrastructure`
- **Get Quote**: `/get-quote`
- **Terms**: `/terms`
- **Privacy**: `/privacy`
- **Footer**: Quick links, Terms & Conditions, Privacy Policy, contact info.

---

## Brand
- The logo contains a Buddha emblem. Treat it with respect: never stretch, recolour, crop, rotate or place it over busy imagery.
- Use it only on clean charcoal or ivory backgrounds.
- Antique Gold is used for the emblem and highlights.

---

## Colour Palette
*(Use as CSS variables and Tailwind theme colours)*
- **Obsidian Charcoal** (`#252827`): Primary brand colour; header, footer, hero.
- **Antique Gold** (`#B89555`): Premium accent; emblem, highlights, dividers, CTA accents.
- **Ivory Stone** (`#F3F0E8`): Primary light background; content sections, cards.
- **Granite Sage** (`#53645A`): Secondary accent; supporting elements, subtle highlights.
- **Stone Grey** (`#777C7D`): Supporting neutral; borders, muted text, specifications.
- **Hero Background**: Dark charcoal-to-black gradient (`linear-gradient(180deg, #252827 0%, #151716 100%)`). Suits granite photography and makes gold accents stand out.

---

## Colour Proportions Across the Site
- **60% Ivory Stone**: Main content and catalogue.
- **25% Charcoal**: Hero, navigation, footer, strong-contrast sections.
- **10% Stone Grey & Granite Sage**: Secondary surfaces and details.
- **5% Antique Gold**: Logo, CTA accents, fine borders, selected highlights.

---

## Contrast Rules
- **Antique Gold on Ivory**: Low contrast. On ivory, use gold only for borders, dividers, icons, and large decorative elements; never for body or small text. Gold text is permitted on charcoal.
- **Stone Grey on Ivory**: Contrast ratio is below 4.5:1. For small text on ivory, use a darker derived shade (e.g., token `stone-grey-text` / `#4F5455`) that passes WCAG AA (> 4.5:1). Reserve original Stone Grey for borders and large text only.
- **Accessibility Standard**: All text across the site must pass WCAG AA.

---

## Typography
*(Self-hosted through `next/font`)*
- **Hero Headline**: *Cormorant Garamond*, 64–76px desktop, ~40–48px mobile (`clamp(2.5rem, 1.8rem + 3vw, 4.75rem)`).
- **Section Headings**: *Cormorant Garamond*, 40–48px desktop, 30–36px mobile (`clamp(1.875rem, 1.4rem + 2vw, 3rem)`).
- **Product Headings**: *DM Sans*, 20–24px (`clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)`).
- **Body Text**: *DM Sans*, 16–18px (`clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`).
- **Navigation**: *DM Sans*, 14–16px (`clamp(0.875rem, 0.85rem + 0.15vw, 1rem)`).
- **Buttons and Labels**: *DM Sans*, 13–15px (`clamp(0.8125rem, 0.8rem + 0.1vw, 0.9375rem)`).
- Use fluid sizes (`clamp`) so typography scales smoothly between these ranges.

---

## Inspiration
*(Structure and ideas only; never copy text, images, layout, or branding)*
- **Sources**: `indiagranite.com` and `regattagranitesindia.com`.
- **Borrow**: Short menu with a persistent quote button, hero with clear calls to action, three value pillars, process sections, landmark/proof sections only when real.
- **Avoid Their Mistakes**: Placeholder-looking stats (e.g. "0+"), typos, empty or generic image alt text, hero without a call to action, content hidden behind "Read More", and links that leave the site.

---

## Content Rules
- **NEVER invent facts**: No certifications, client names, testimonials, statistics, production capacity, machine models, awards, export countries, or years other than 2023. If a fact is unknown, leave it out or use a clearly marked placeholder such as `[PHONE NUMBER]` and add `TODO(client)` in code.
- **Placeholder tracking**: Keep a running list of every placeholder in `docs/TODO-CLIENT.md`.
- **Draft stone copy**: May describe general stone characteristics, but must be marked in the content file with a `// TODO(client): confirm` comment.
- **Alt text**: Meaningful alt text for every single image.
- **Quality**: No typos. Proofread everything.

---

## SEO Preparation (In Scope)
- Technical and on-page SEO foundation: crawler visibility, server-rendered content, verified metadata, Open Graph, Twitter cards, XML sitemap, robots.txt, semantic HTML, and JSON-LD structured data.
- **Never invent facts to improve SEO**: No fake reviews, ratings, awards, certifications, statistics, prices, capacities, or client names. Optimise the wording and structure of confirmed facts only.
- **No keyword stuffing**: Write natural, specific, human copy that mentions target terms where they truthfully fit.
- **Structured data alignment**: Structured data (JSON-LD) must match visible page content exactly without empty fields or invented claims.
- Canonical host is `https://www.thelumbiniexports.in`. Staging/preview deployments remain `noindex`.

---

## Out of Scope
- Ongoing post-launch SEO campaigns (Search Console submissions, off-page link building, backlink acquisition).
- CMS, blog, multi-language internationalisation.


---

## Engineering Rules
- **Server Components by Default**: Add `"use client"` only where interactivity is required (menu, quote options, interactive form).
- **External Content**: Content originates in `src/content/`, never hard-coded inside components.
- **Standards & A11y**: Semantic HTML, one `<h1>` per page, keyboard accessible, visible focus states, respects `prefers-reduced-motion`.
- **Responsive / Mobile-First**: Tested across 360px, 390px, 768px, 1024px, and 1440px viewports.
- **Images**: Rendered exclusively via the shared `SiteImage` component.
- **Motion**: Subtle, elegant animations (gentle fades and slides; no heavy effects).
