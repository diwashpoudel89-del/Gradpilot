import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/queries";

const BASE = "https://gradpilotai.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/jobs", "/employer-insights", "/mentors", "/blog", "/pricing", "/about", "/faq", "/waitlist", "/privacy", "/terms"].map(
    (path) => ({ url: `${BASE}${path}`, lastModified: new Date() })
  );

  let blog: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blog = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : new Date(),
    }));
  } catch {
    blog = [];
  }

  return [...staticRoutes, ...blog];
}
