const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gradpilotai.com";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "GradPilot AI",
        legalName: "GradPilot AI Ltd",
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: "hello@gradpilotai.com",
        description:
          "The career co-pilot for international students in the UK — visa-aware jobs, CV coaching, interview prep, and Graduate Route guidance.",
        sameAs: [
          "https://linkedin.com/company/gradpilot-ai",
          "https://instagram.com/gradpilotai",
          "https://tiktok.com/@gradpilotai",
        ],
      }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}

export function ProductJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "GradPilot AI",
        description:
          "AI career co-pilot for international students in the UK: visa-aware job matching, CV coaching, interview prep, and Graduate Route guidance.",
        brand: { "@type": "Brand", name: "GradPilot AI" },
        offers: [
          { "@type": "Offer", name: "Free", price: "0", priceCurrency: "GBP" },
          { "@type": "Offer", name: "Pro", price: "9.99", priceCurrency: "GBP" },
          { "@type": "Offer", name: "Premium", price: "19.99", priceCurrency: "GBP" },
        ],
      }}
    />
  );
}
