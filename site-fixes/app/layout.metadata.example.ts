// Reference snippet — merge the `metadata` export into your app/layout.tsx.
// Fixes audit findings:
//   - og:url hardcoded to https://gradpilotai.vercel.app (wrong canonical host)
//   - No <link rel="canonical"> on any page
//
// Setting `metadataBase` makes Next.js emit absolute og:url / canonical URLs on
// the correct domain. `alternates.canonical: "/"` adds the canonical tag; child
// pages can override with their own `alternates.canonical`.
import type { Metadata } from "next";

const SITE_URL = "https://www.gradpilotai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GradPilot AI — The career co-pilot for international students in the UK",
    template: "%s · GradPilot AI",
  },
  description:
    "GradPilot AI helps international students and graduates in the UK find visa-sponsoring jobs, sharpen their CV, prepare for interviews, and navigate the Graduate Route — all in one place.",
  keywords: [
    "international students UK",
    "Graduate Route visa",
    "visa sponsorship jobs UK",
    "Skilled Worker visa",
    "CV for UK jobs",
    "graduate jobs UK",
  ],
  authors: [{ name: "GradPilot AI" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GradPilot AI",
    locale: "en_GB",
    url: SITE_URL, // now correct, was gradpilotai.vercel.app
    title: "GradPilot AI — The career co-pilot for international students in the UK",
    description:
      "Find visa-sponsoring jobs, fix your CV, ace interviews, and stay ahead of your Graduate Route deadline.",
    images: ["/og.png"], // add a 1200x630 OG image at public/og.png
  },
  twitter: {
    card: "summary_large_image",
    title: "GradPilot AI",
    description:
      "The career co-pilot for international students in the UK. Visa-aware jobs, CV coaching, interview prep, and visa guidance.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};
