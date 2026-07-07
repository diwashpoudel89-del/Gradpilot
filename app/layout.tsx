import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gradpilotai.com"),
  title: {
    default: "GradPilot AI — The career co-pilot for international students in the UK",
    template: "%s · GradPilot AI",
  },
  description:
    "GradPilot AI helps international students and graduates in the UK find visa-sponsoring jobs, sharpen their CV, prepare for interviews, and navigate the Graduate Route — all in one place.",
  keywords: [
    "international students UK jobs",
    "Graduate Route visa UK",
    "visa sponsorship jobs UK",
    "Skilled Worker visa sponsorship",
    "CV for UK jobs international students",
    "graduate jobs UK visa",
    "Graduate Route deadline",
    "UK work visa after study",
    "international graduate job search UK",
    "sponsor visa UK employer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "GradPilot AI — The career co-pilot for international students in the UK",
    description:
      "Find visa-sponsoring jobs, fix your CV, ace interviews, and stay ahead of your Graduate Route deadline.",
    url: "https://gradpilotai.com",
    siteName: "GradPilot AI",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GradPilot AI — career co-pilot for international students" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradPilot AI — UK job search for international students",
    description: "Visa-aware jobs, CV coaching & Graduate Route guidance. Built for international students in the UK.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
