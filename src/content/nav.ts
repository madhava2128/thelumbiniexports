/**
 * Navigation structure for The Lumbini Exports.
 */

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export const headerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/company" },
  { label: "Collection", href: "/collection" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Get Quote", href: "/get-quote", isCta: true },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/company" },
    { label: "Stone Collection", href: "/collection" },
    { label: "Infrastructure & Facility", href: "/infrastructure" },
    { label: "Request a Quote", href: "/get-quote" },
  ],
  collectionLinks: [
    { label: "Tan Brown", href: "/collection/tan-brown" },
    { label: "Royal Blue", href: "/collection/royal-blue" },
    { label: "Safari Blue", href: "/collection/safari-blue" },
    { label: "Honey Blue", href: "/collection/honey-blue" },
    { label: "Lapotra (Finish)", href: "/collection/lapotra" },
    { label: "Flaming (Finish)", href: "/collection/flaming" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};
