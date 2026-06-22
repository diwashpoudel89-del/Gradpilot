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
    "international students UK",
    "Graduate Route visa",
    "visa sponsorship jobs UK",
    "Skilled Worker visa",
    "CV for UK jobs",
    "graduate jobs UK",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "GradPilot AI — The career co-pilot for international students in the UK",
    description:
      "Find visa-sponsoring jobs, fix your CV, ace interviews, and stay ahead of your Graduate Route deadline.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
