"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { getConsent } from "./cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

let posthogLoaded = false;

export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getConsent() === "accepted");
    const handler = (e: Event) =>
      setConsented((e as CustomEvent).detail === "accepted");
    window.addEventListener("gp-consent", handler);
    return () => window.removeEventListener("gp-consent", handler);
  }, []);

  useEffect(() => {
    if (consented && PH_KEY && !posthogLoaded) {
      posthog.init(PH_KEY, {
        api_host: PH_HOST,
        capture_pageview: true,
        persistence: "localStorage+cookie",
      });
      posthogLoaded = true;
    }
  }, [consented]);

  if (!consented || !GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
