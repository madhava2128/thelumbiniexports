import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thelumbiniexports.in";
  const isProduction =
    siteUrl === "https://www.thelumbiniexports.in" ||
    siteUrl === "https://thelumbiniexports.in";

  // Prevent staging/preview environments from being indexed
  if (!isProduction && process.env.NODE_ENV === "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://www.thelumbiniexports.in/sitemap.xml",
  };
}
