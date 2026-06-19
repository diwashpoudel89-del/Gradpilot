import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { OrganizationJsonLd } from "@/components/structured-data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gradpilotai.com";

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
    url: SITE_URL,
    title: "GradPilot AI — The career co-pilot for international students in the UK",
    description:
      "Find visa-sponsoring jobs, fix your CV, ace interviews, and stay ahead of your Graduate Route deadline.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GradPilot AI",
    description:
      "The career co-pilot for international students in the UK. Visa-aware jobs, CV coaching, interview prep, and visa guidance.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <OrganizationJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
