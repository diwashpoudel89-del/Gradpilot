import type { Metadata } from "next";
import { getFaqs } from "@/lib/queries";

export const revalidate = 3600;
export const metadata: Metadata = { title: "FAQ", description: "Common questions about GradPilot AI, visas, and pricing." };

export default async function FaqPage() {
  const faqs = await getFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <div className="container-x py-12">
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight">Frequently asked questions</h1>
      </header>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200">
        {faqs.map((f) => (
          <details key={f.id} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {f.question}
                <span className="text-brand-500 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.answer}</p>
          </details>
        ))}
        {faqs.length === 0 && <p className="py-4 text-slate-600">FAQs coming soon.</p>}
      </div>
    </div>
  );
}
