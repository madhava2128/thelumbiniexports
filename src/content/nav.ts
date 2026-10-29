/**
 * Navigation structure for The Lumbini Exports.
 * Consistent page names: Home, Company, Collection, Infrastructure, Request a Quote.
 * Consistent quote action wording: "Request a Quote".
 */

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export const headerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/company" },
  { label: "Collection", href: "/collection" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Request a Quote", href: "/get-quote", isCta: true },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Company", href: "/company" },
    { label: "Collection", href: "/collection" },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Request a Quote", href: "/get-quote" },
  ],
  collectionLinks: [
    { label: "Tan Brown", href: "/collection/tan-brown" },
    { label: "Peacock Brown", href: "/collection/peacock-brown" },
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
