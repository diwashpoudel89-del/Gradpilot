// Place at: app/robots.ts
// Next.js App Router auto-serves this at /robots.txt
// Fixes audit finding: /robots.txt returns 404.
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.gradpilotai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep auth + internal routes out of the index.
        disallow: ["/login", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
