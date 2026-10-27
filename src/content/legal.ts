/**
 * Legal Content & Policies for The Lumbini Exports.
 *
 * DRAFT: to be reviewed by a qualified legal professional before launch.
 * Sourced strictly from verified client facts:
 * - Company Name: The Lumbini Exports
 * - Registered Office: H.No. 2-8-14/301, Waddepally, Hanamkonda, Telangana, India
 * - Physical Unit: Syno 882 B2/2/1/2, 882/B1/1, Elkathurthy Village & Mandal, Hanamkonda District, Telangana 505476, India
 * - Official Email: thelumbiniexports@gmail.com
 * - Jurisdiction: Courts of Telangana, India
 */

export const LEGAL_LAST_UPDATED = "October 2026";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  eyebrow: string;
  intro: string;
  sections: LegalSection[];
}

export const termsContent: LegalDocument = {
  title: "Terms & Conditions",
  eyebrow: "Legal Agreement",
  intro:
    "These Terms & Conditions govern your access to and use of this website. Please read them carefully before submitting commercial inquiries or requesting quotations.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing, browsing, or using the website of The Lumbini Exports ('the Company', 'we', 'us', or 'our'), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.",
        "If you do not agree with any part of these terms, you must discontinue your use of this website immediately.",
      ],
    },
    {
      id: "use-of-site",
      title: "2. Use of the Website",
      paragraphs: [
        "This website is provided solely for legitimate commercial buyers, architects, importers, distributors, builders, and general visitors seeking information about our natural stone products and processing capabilities.",
        "You agree not to use the website for any unlawful purpose, introduce malicious code or automated scrapers, interfere with the proper functioning of the site, or submit fraudulent inquiries through our quote request form.",
      ],
    },
    {
      id: "product-info",
      title: "3. Product Information & Natural Stone Variations",
      paragraphs: [
        "All descriptions, photographs, digital textures, dimensions, and specifications presented on this website are provided for illustrative and indicative purposes only.",
        "Natural stone—including our quarried granite varieties—is an inherent product of geological formation. Consequently, every slab and block exhibits natural variations in veining, colour tone, crystalline distribution, fissure patterns, and surface texture. Physical samples, digital photographs, and catalog entries provide a general representation of color and grain structure, but do not guarantee exact uniformity across shipments.",
      ],
    },
    {
      id: "quotations",
      title: "4. Quotations & Non-Binding Inquiries",
      paragraphs: [
        "Submitting an inquiry through our 'Request a Quote' form or receiving preliminary estimates via email does not constitute a legally binding sales contract or an irrevocable offer.",
        "A binding commercial supply agreement is formed only upon the issuance and mutual written acceptance of an official proforma invoice or written sales contract signed by authorized representatives of The Lumbini Exports, subject to confirmed payment terms, dimensional cutting schedules, and shipping schedules.",
      ],
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      paragraphs: [
        "All content featured on this website—including company branding, the Buddha emblem logo, trade names, text copy, technical tables, graphics, layout designs, and photographic imagery—is the intellectual property of The Lumbini Exports or its respective licensors and is protected by Indian and international copyright and trademark laws.",
        "You may not reproduce, modify, republish, distribute, or exploit any portion of this website for commercial purposes without prior written authorization from The Lumbini Exports.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "6. Limitation of Liability",
      paragraphs: [
        "While we endeavor to keep the information on this website accurate and up to date, The Lumbini Exports makes no warranties or representations of any kind, express or implied, regarding the completeness, accuracy, reliability, or suitability of the website content.",
        "To the maximum extent permitted by applicable law, The Lumbini Exports shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website or any reliance placed on its content.",
      ],
    },
    {
      id: "third-party-links",
      title: "7. Links to Third-Party Services",
      paragraphs: [
        "This website may contain links to external third-party services, such as Google Maps for facility directions. These external links are provided solely for your convenience.",
        "The Lumbini Exports does not control, endorse, or assume responsibility for the content, privacy practices, or availability of third-party websites or services.",
      ],
    },
    {
      id: "governing-law",
      title: "8. Governing Law & Jurisdiction",
      paragraphs: [
        "These Terms & Conditions and any dispute or claim arising out of or in connection with them or your use of this website shall be governed by and construed in accordance with the laws of India.",
        "The competent courts located in the State of Telangana, India, shall have exclusive jurisdiction to settle any dispute or legal claim arising under or related to these Terms.",
      ],
    },
    {
      id: "contact-details",
      title: "9. Company Details & Inquiries",
      paragraphs: [
        "For any questions or legal inquiries regarding these Terms & Conditions, please contact us:",
        "The Lumbini Exports\nRegistered Office: H.No. 2-8-14/301, Waddepally, Hanamkonda, Telangana, India\nProcessing Unit: Syno 882 B2/2/1/2, 882/B1/1, Elkathurthy Village & Mandal, Hanamkonda District, Telangana 505476, India\nEmail: thelumbiniexports@gmail.com",
      ],
    },
  ],
};

export const privacyContent: LegalDocument = {
  title: "Privacy Policy",
  eyebrow: "Data Protection",
  intro:
    "This Privacy Policy explains how The Lumbini Exports collects, processes, and protects your information when you browse our website or submit an inquiry for stone quotations.",
  sections: [
    {
      id: "information-collected",
      title: "1. Information We Collect",
      paragraphs: [
        "We collect personal and business information that you voluntarily provide to us when you submit a quotation inquiry through our 'Request a Quote' form or contact us via email.",
        "This information may include: your full name, company or architectural firm name, business email address, international telephone or WhatsApp number (if provided), destination country, target stone variety, required quantity and dimensions, target delivery terms (Incoterms), and any architectural project notes you choose to share.",
      ],
    },
    {
      id: "purpose",
      title: "2. How We Use Your Information",
      paragraphs: [
        "The Lumbini Exports collects and processes your information solely for legitimate commercial business purposes, specifically to:",
        "• Evaluate your stone cutting, slab calibration, and architectural specifications.\n• Calculate itemized wholesale price estimates and freight logistics (FOB or CIF).\n• Communicate directly with you regarding your request and provide technical product data.\n• Manage our commercial relationship and fulfill subsequent stone supply agreements.",
        "We do not sell, rent, lease, or trade your personal or business contact information to third parties for marketing purposes.",
      ],
    },
    {
      id: "transmission-storage",
      title: "3. Data Transmission & Email Delivery",
      paragraphs: [
        "All data submitted through our quotation forms is encrypted in transit using standard Transport Layer Security (TLS/HTTPS).",
        "Quote inquiries are transmitted directly to our sales and technical estimation team via a specialized transactional email delivery service provider (Resend). Inquiries are held in secure email systems accessed only by authorized personnel responsible for quoting and order execution.",
      ],
    },
    {
      id: "retention",
      title: "4. Data Retention",
      paragraphs: [
        "We retain your inquiry details and contact information for as long as necessary to fulfill the commercial purpose for which it was gathered, including responding to quote requests, maintaining commercial records, and satisfying applicable tax, accounting, or legal requirements under Indian law.",
      ],
    },
    {
      id: "visitor-rights",
      title: "5. Your Rights & Contact Route",
      paragraphs: [
        "You have the right to request access to the personal data we hold about you, request corrections to any inaccurate information, or request the deletion of your contact records from our active communications list.",
        "To exercise any of these rights, or if you have questions regarding our data practices, please email our administrative team at thelumbiniexports@gmail.com. We will respond promptly to verified requests.",
      ],
    },
    {
      id: "cookies-analytics",
      title: "6. Cookies & Web Analytics",
      paragraphs: [
        "This website currently operates without third-party advertising cookies or cross-site tracking technologies.",
        "Essential session identifiers may be used by our hosting platform solely to maintain secure network connections and prevent distributed denial-of-service (DDoS) attacks. Should we introduce privacy-focused analytics or measurement tools in the future, this policy will be updated accordingly.",
      ],
    },
    {
      id: "updates",
      title: "7. Policy Updates & Contact",
      paragraphs: [
        "The Lumbini Exports may update this Privacy Policy periodically to reflect operational, technological, or legal changes. The 'Last Updated' date at the top of this document indicates the effective date of the current version.",
        "For privacy-related questions, please contact:\nThe Lumbini Exports\nRegistered Office: H.No. 2-8-14/301, Waddepally, Hanamkonda, Telangana, India\nEmail: thelumbiniexports@gmail.com",
      ],
    },
  ],
};
