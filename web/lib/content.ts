// All marketing copy in one place. Brand: "The AI Operating System for International Students."

export const BRAND = {
  tagline: "The AI Operating System for International Students",
  heroTitle: "Your AI Career Co-Pilot for International Student Success",
  heroSubtitle:
    "Find visa-sponsored jobs, improve your CV, prepare for interviews, and build a successful career with AI-powered guidance — all in one place.",
};

export const PROBLEMS = [
  {
    title: "Visa deadlines make every application feel urgent",
    body: "The Graduate Route gives you 2 years. Every rejection costs time you can't get back. GradPilot AI helps you apply smarter, not just faster.",
  },
  {
    title: "Your CV is wrong for UK employers — and no one tells you",
    body: "A CV that worked at home won't land UK jobs. GradPilot AI scores it against ATS systems and rewrites it for the market you're actually in.",
  },
  {
    title: "Scams and dead-ends drain your time and money",
    body: "Fake listings, non-sponsoring employers, rental fraud. GradPilot AI screens jobs by sponsorship and flags accommodation scams before they cost you.",
  },
];

// 6-step journey.
export const STEPS = [
  { n: 1, title: "Create your profile", body: "Tell us your degree, visa timeline, and goals. We build your personalised profile in minutes." },
  { n: 2, title: "Upload your CV", body: "Our AI CV Analyzer scores it for ATS compatibility and UK-readiness, with a clear fix-list." },
  { n: 3, title: "Receive your GradScore™", body: "Get your Employability, Sponsorship Readiness, and Career Readiness scores — and how to raise them." },
  { n: 4, title: "Find sponsorship opportunities", body: "Discover visa-sponsored jobs and sponsorship-friendly employers matched to your profile." },
  { n: 5, title: "Prepare for interviews", body: "Practise with the AI Interview Coach — instant feedback, scoring, and industry-specific questions." },
  { n: 6, title: "Track career growth", body: "Follow your roadmap with GradPath™ and watch your scores and milestones climb." },
];

// 6 core features, including the trademarked tools.
export const FEATURES = [
  {
    name: "AI CV Analyzer",
    trademark: null as string | null,
    tagline: "Upload your CV, get an instant score and a fix-list.",
    bullets: ["ATS compatibility score", "Targeted improvement suggestions", "Skill-gap analysis"],
  },
  {
    name: "AI Interview Coach",
    trademark: null,
    tagline: "Practise interviews and get scored, specific feedback.",
    bullets: ["Instant feedback on every answer", "Performance scoring", "Industry-specific questions"],
  },
  {
    name: "Sponsorship Job Finder",
    trademark: null,
    tagline: "Only apply where you actually have a chance.",
    bullets: ["Visa-sponsored jobs", "Sponsorship-friendly employers", "Matched career opportunities"],
  },
  {
    name: "GradScore",
    trademark: "™",
    tagline: "One number for how ready you are — and how to improve it.",
    bullets: ["Employability Score", "Sponsorship Readiness Score", "Career Readiness Score"],
  },
  {
    name: "GradShield",
    trademark: "™",
    tagline: "Avoid accommodation scams before they cost you.",
    bullets: ["Listing & landlord analysis", "Scam-risk scoring", "Rental agreement red-flags"],
  },
  {
    name: "GradPath",
    trademark: "™",
    tagline: "Your personalised roadmap from arrival to offer.",
    bullets: ["Personalised student roadmap", "Relocation checklist", "Career development plan"],
  },
];

export const SEGMENTS = [
  {
    title: "Master's students",
    body: "Studying a Master's at a UK university, under Graduate Route pressure, motivated to find sponsored graduate roles.",
    challenge: "Competing with domestic students who already have UK networks and experience.",
  },
  {
    title: "Recent graduates",
    body: "On the Graduate Route now — every week counts toward the 2-year limit.",
    challenge: "Finding sponsored jobs before the visa expires, often without UK experience.",
  },
  {
    title: "Final-year undergraduates",
    body: "Planning ahead for life after graduation, with more time but less clarity on the UK system.",
    challenge: "Understanding what sponsorship means before it becomes urgent.",
  },
  {
    title: "PhD researchers",
    body: "Three years on the Graduate Route, translating research skills into industry roles.",
    challenge: "Turning academic credentials into commercial CVs and PhD-level sponsored roles.",
  },
];

export const PLANS = [
  {
    name: "Free",
    tagline: "Everything you need to get started",
    price: "Free",
    note: "No card required",
    cta: "Get started free",
    highlight: false,
    badge: undefined as string | undefined,
    features: [
      "Visa-aware job search",
      "3 CV analyses per month",
      "GradScore™ overview",
      "5 AI adviser chats per month",
      "Unlimited application tracking",
      "Graduate Route countdown",
    ],
  },
  {
    name: "Pro",
    tagline: "For serious job seekers on a deadline",
    price: "£9.99",
    note: "Billed monthly",
    cta: "Start Pro",
    highlight: true,
    badge: "Most popular",
    features: [
      "Everything in Free",
      "Unlimited CV analyses & rewrites",
      "Unlimited AI adviser & interview prep",
      "Full GradScore™ breakdown",
      "GradPath™ roadmap",
      "Mentor matching & employer insights",
    ],
  },
  {
    name: "Premium",
    tagline: "Full support for every part of your UK journey",
    price: "£19.99",
    note: "Billed monthly",
    cta: "Go Premium",
    highlight: false,
    badge: "Most complete",
    features: [
      "Everything in Pro",
      "GradShield™ scam protection",
      "Accommodation & relocation guidance",
      "Priority 1-to-1 human support",
      "CV expert human review",
      "Dedicated success manager",
    ],
  },
];

export const FAQS = [
  {
    q: "Is GradPilot AI only for international students?",
    a: "Yes. GradPilot AI is built exclusively for international students studying in the UK. Every feature — from visa-aware job matching to CV coaching — is designed around the unique challenges international graduates face.",
  },
  {
    q: "What is GradScore™?",
    a: "GradScore™ is your readiness rating across three dimensions — Employability, Sponsorship Readiness, and Career Readiness. It turns a vague sense of 'am I ready?' into clear numbers and specific, actionable steps to raise them.",
  },
  {
    q: "How does the Sponsorship Job Finder work?",
    a: "Every role is tagged by sponsorship status (Graduate Route / Skilled Worker), so you only spend time on jobs that can actually keep you in the UK. You can filter by industry, salary, location, and experience level.",
  },
  {
    q: "What is the Graduate Route visa?",
    a: "The Graduate Route lets international students who complete a UK degree stay and work (or look for work) for 2 years after graduating (3 for PhDs). During this time you can work for any employer without sponsorship; after it expires you'd need a Skilled Worker visa.",
  },
  {
    q: "Is GradPilot AI free to use?",
    a: "There's a generous free tier: visa-aware job search, 3 CV analyses and 5 AI adviser chats per month, a GradScore™ overview, and unlimited application tracking. Pro (£9.99/mo) unlocks unlimited AI; Premium (£19.99/mo) adds GradShield™ and human support.",
  },
  {
    q: "How is this different from LinkedIn or Prospects?",
    a: "Every feature is built around the international student experience. Job search defaults to visa-sponsoring employers, the AI understands Graduate Route rules, and the CV coach knows what UK employers expect from international candidates.",
  },
  {
    q: "Is the AI just ChatGPT?",
    a: "No. It runs on Claude Opus 4.8 and is configured with deep context about UK immigration, UK hiring, and the Graduate Route — and it knows your profile to give personalised advice a generic chatbot can't.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Your personal information and CV data are encrypted and stored securely. We never share your data with third parties without your explicit consent, and you can delete your account and all associated data at any time.",
  },
];
