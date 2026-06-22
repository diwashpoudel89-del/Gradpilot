import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/queries";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Blog — UK visas, CVs & careers",
  description: "Guides on the Graduate Route, UK CVs, sponsorship, and life in the UK for international students.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="container-x py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight">Guides &amp; insights</h1>
        <p className="mt-2 text-slate-600">Visas, CVs, sponsorship and settling in — written for international students.</p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="card flex flex-col p-6 transition hover:shadow-lift">
            {p.category && <span className="badge w-fit bg-brand-50 text-brand-700">{p.category}</span>}
            <h2 className="mt-3 font-display text-lg font-semibold text-slate-900">{p.title}</h2>
            {p.excerpt && <p className="mt-2 flex-1 text-sm text-slate-600">{p.excerpt}</p>}
            <div className="mt-4 text-xs text-slate-500">
              {p.author ?? "GradPilot AI"}
              {p.reading_time_minutes ? ` · ${p.reading_time_minutes} min read` : ""}
            </div>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-slate-600">No posts yet.</p>}
      </div>
    </div>
  );
}
