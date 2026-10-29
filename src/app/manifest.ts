import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Lumbini Exports",
    short_name: "Lumbini Exports",
    description:
      "Natural Indian granite cutting, polishing, and export unit in Elkathurthy, Hanamkonda, Telangana.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F0E8",
    theme_color: "#252827",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
