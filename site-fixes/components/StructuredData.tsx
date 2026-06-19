// Place at: components/StructuredData.tsx
// Fixes audit finding: no JSON-LD / structured data on the site.
//
// Usage:
//   - Render <OrganizationJsonLd /> once in app/layout.tsx (inside <body>).
//   - Render <FaqJsonLd /> on the homepage (it mirrors the live FAQ section).
//   - Render <ProductJsonLd /> near the pricing section (optional).
//
// These emit schema.org markup that lets Google show rich results
// (org knowledge panel, FAQ accordions) and reinforces the canonical domain.

const SITE_URL = "https://www.gradpilotai.com";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
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

// Mirrors the 8 FAQs currently shown on the live homepage.
const FAQS: { q: string; a: string }[] = [
  {
    q: "Is GradPilot AI only for international students?",
    a: "Yes. GradPilot AI is built exclusively for international students studying in the UK. Every feature — from visa-aware job matching to CV coaching — is designed around the unique challenges international graduates face in the UK job market.",
  },
  {
    q: "What is the Graduate Route visa?",
    a: "The Graduate Route lets international students who complete a UK degree stay and work (or look for work) for 2 years after graduating (3 years for PhDs). During this time you can work for any employer without sponsorship. After it expires, you would need an employer to sponsor you on a Skilled Worker visa to continue.",
  },
  {
    q: "Do UK employers have to sponsor me on the Graduate Route?",
    a: "No — that is the advantage of the Graduate Route. During your 2-year (or 3-year for PhD) period you can work for any UK employer freely, no sponsorship needed. Employers only need to sponsor you if you want to stay beyond the Graduate Route, via a Skilled Worker visa.",
  },
  {
    q: "When does GradPilot AI launch?",
    a: "We are currently in pre-launch, building the platform and growing our waitlist. Join the waitlist for early access and 3 months of Pro free at launch. We will keep you updated by email.",
  },
  {
    q: "Is GradPilot AI free to use?",
    a: "There is a generous free tier: visa-aware job search, 3 CV analyses and 5 AI adviser chats per month, and unlimited application tracking. For unlimited AI features, mentor matching, and interview prep, Pro is £9.99/month or £99.99/year.",
  },
  {
    q: "How is this different from LinkedIn or Prospects?",
    a: "Every feature is built around the international student experience. Job search defaults to visa-sponsoring employers, the AI adviser understands Graduate Route rules, and the CV coach knows what UK employers expect from international candidates.",
  },
  {
    q: "Is the AI adviser just ChatGPT?",
    a: "No. While it uses a large language model, it is configured with deep context about UK immigration, UK hiring practices, and the Graduate Route — and it knows your profile to give personalised advice a generic chatbot cannot.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Your personal information and CV data are encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can delete your account and all associated data at any time from settings.",
  },
];

export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(({ q, a }) => ({
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
