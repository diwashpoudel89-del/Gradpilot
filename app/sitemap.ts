import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/queries";

const BASE = "https://gradpilotai.com";

const STATIC: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
  { url: `${BASE}/jobs`,              lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE}/employer-insights`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/mentors`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/blog`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE}/pricing`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/about`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/faq`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/waitlist`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blog: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blog = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.published_at ? new Date(p.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    blog = [];
  }

  return [...STATIC, ...blog];
}
