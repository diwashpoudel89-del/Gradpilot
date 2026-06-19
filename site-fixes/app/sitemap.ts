// Place at: app/sitemap.ts
// Next.js App Router auto-serves this at /sitemap.xml
// Fixes audit finding: /sitemap.xml returns 404.
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.gradpilotai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static marketing routes.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/waitlist`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // TODO: once blog posts are live, append them, e.g.:
  // const posts = await getAllPosts();
  // const blogRoutes = posts.map((p) => ({
  //   url: `${BASE_URL}/blog/${p.slug}`,
  //   lastModified: new Date(p.updatedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }));
  // return [...staticRoutes, ...blogRoutes];

  return staticRoutes;
}
