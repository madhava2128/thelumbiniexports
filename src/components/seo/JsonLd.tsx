import React from "react";
import { siteConfig } from "@/content/site";
import { type StoneItem } from "@/content/stones";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thelumbiniexports.in";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Generates Organization and WebSite structured data for Home page.
 */
export function getHomeJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}/brand/logo.png`,
    foundingDate: "2023",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addresses.physicalUnit.line1,
        addressLocality: "Elkathurthy Mandal",
        addressRegion: "Telangana",
        postalCode: siteConfig.addresses.physicalUnit.postalCode || "505476",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addresses.registeredOffice.line1,
        addressLocality: "Waddepally, Hanamkonda",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
        areaServed: ["IN", "AE", "US", "GB", "AU"],
        availableLanguage: ["English", "Telugu", "Hindi"],
      },
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
  };

  return [organization, webSite];
}

/**
 * Generates BreadcrumbList structured data.
 */
export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${baseUrl}${item.path}`,
    })),
  };
}

/**
 * Generates ItemList structured data for Collection page.
 */
export function getCollectionJsonLd(stones: StoneItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Natural Granite Collection - The Lumbini Exports",
    itemListElement: stones.map((stone, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: stone.name,
      url: `${baseUrl}/collection/${stone.slug}`,
    })),
  };
}

/**
 * Generates Product structured data for a Stone page.
 * Strictly adheres to rule: NO offers, prices, ratings or reviews.
 */
export function getStoneProductJsonLd(stone: StoneItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${stone.name} Granite`,
    description: stone.longDescription,
    image: `${baseUrl}/images/stones/${stone.slug}/main.webp`,
    category: `Natural Granite - ${stone.category}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}
