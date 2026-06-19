# GradPilot site-fixes — drop-in fixes for the live Next.js site

These files implement the **HIGH/MEDIUM priority fixes** from the
[19 June 2026 live-site audit](../GradPilot_Live_Site_Audit_2026-06-19.md).

> **Why they live here and not in the live site:** the live `gradpilotai.com`
> Next.js source is **not** in this repository (it deploys to Vercel from a
> separate source). These are ready-to-paste files — drop each into the live
> site's repo at the path noted, then commit + redeploy.

## What to copy where

| File here | Destination in the Next.js repo | Fixes |
|-----------|----------------------------------|-------|
| `app/robots.ts` | `app/robots.ts` | `/robots.txt` was 404 |
| `app/sitemap.ts` | `app/sitemap.ts` | `/sitemap.xml` was 404 |
| `app/layout.metadata.example.ts` | merge `metadata` export into `app/layout.tsx` | `og:url` pointed to `*.vercel.app`; no canonical |
| `components/StructuredData.tsx` | `components/StructuredData.tsx` (render in layout + homepage) | no JSON-LD structured data |
| `next.config.example.mjs` | merge into `next.config.mjs` | missing security headers; `x-powered-by` leak |
| `ANALYTICS.md` | follow steps | no analytics installed |

## Order of operations

1. **SEO basics (do first):** add `robots.ts`, `sitemap.ts`, fix `metadataBase`/canonical.
2. **Analytics:** install `@vercel/analytics`, add the `waitlist_signup` event.
3. **Security headers:** merge `next.config.example.mjs` (CSP ships report-only — verify, then enforce).
4. **Structured data:** render `OrganizationJsonLd` + `FaqJsonLd`.
5. Redeploy, then in **Google Search Console**: add the property and submit
   `https://www.gradpilotai.com/sitemap.xml`.

## Not covered here (need product decisions / access)

- **Empty `/blog`** — port the existing posts onto the live site (content, not config).
- **Pricing CTAs / Stripe checkout** — wire up before opening paid sign-ups.
- **Supabase leaked-password protection** — dashboard toggle (Auth → Policies).
- **Server region** — site serves from `iad1` (US East); DB is `eu-west-1`.
  Consider an EU region / edge once dynamic routes go live.

All paths assume the Next.js **App Router** (confirmed live: App Router + Turbopack).
Adjust import aliases (`@/components/...`) to match the project's `tsconfig` paths.
