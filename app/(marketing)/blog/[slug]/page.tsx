import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/queries";
import { Markdown } from "@/components/markdown";

export const revalidate = 3600;

// Prerender published posts at build; new posts render on demand then cache.
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.meta_description ?? post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="container-x py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-medium text-brand-600 hover:underline">← All articles</Link>
        {post.category && <span className="badge mt-4 block w-fit bg-brand-50 text-brand-700">{post.category}</span>}
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        <div className="mt-2 text-sm text-slate-500">
          {post.author ?? "GradPilot AI"}
          {post.reading_time_minutes ? ` · ${post.reading_time_minutes} min read` : ""}
        </div>

        <div className="mt-8">
          {post.body ? (
            <Markdown source={post.body} />
          ) : (
            <p className="text-slate-600">{post.excerpt ?? "This article is coming soon."}</p>
          )}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-center">
          <p className="font-medium text-slate-900">Get visa-aware jobs and CV coaching free.</p>
          <Link href="/signup" className="btn-primary mt-4 h-11 px-6 text-sm">Create your free account</Link>
        </div>
      </div>
    </article>
  );
}
