import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  outputFileTracingIncludes: {
    "/verify/**": ["./data/**/*"],
    "/api/verify/**": ["./data/**/*"],
  },
  async rewrites() {
    return [
      {
        source: "/icon",
        destination: "/brand/favicon.png",
      },
    ];
  },
};

export default nextConfig;
