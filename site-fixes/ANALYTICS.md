# Analytics setup (fixes: "no analytics installed")

The live site currently loads **zero** analytics/tracking. For a pre-launch
waitlist site, you can't see traffic, sources, or — critically — your
waitlist conversion rate. Fastest reliable path is Vercel Analytics +
a single custom event on waitlist submit.

## 1. Vercel Web Analytics (pageviews + Core Web Vitals)

```bash
npm i @vercel/analytics @vercel/speed-insights
```

In `app/layout.tsx`, inside `<body>`:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Then enable **Web Analytics** + **Speed Insights** for the project in the
Vercel dashboard (Project → Analytics). No cookie banner needed — Vercel
Analytics is cookieless/GDPR-friendly.

## 2. Track the waitlist conversion (the metric that matters)

In your waitlist form's submit handler, after a successful insert:

```tsx
import { track } from "@vercel/analytics";

track("waitlist_signup", { source: "landing" });
```

Now you can read sign-ups ÷ unique visitors = your waitlist conversion rate.

## 3. (Optional) PostHog for funnels / session insight

If you want funnels, retention, and event exploration beyond pageviews,
add PostHog (`posthog-js`) with the EU host (`https://eu.i.posthog.com`) to
keep data in-region for UK/EU users. Add its domains to the CSP
`connect-src` / `script-src` in `next.config.example.mjs` if you do.
