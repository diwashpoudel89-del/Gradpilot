# GradPilot AI — marketing site (web)

Version-controlled rebuild of the `gradpilotai.com` marketing site in **Next.js
(App Router) + Tailwind CSS v4**, with all 19 June audit fixes baked in.

> **Why this exists:** the original live site was deployed to Vercel via the CLI
> from an ephemeral agent workspace — there was **no source repo**. This is the
> recoverable, deployable source of truth. See `../GradPilot_Live_Site_Audit_2026-06-19.md`.

## Audit fixes included
- ✅ `/robots.txt` (`app/robots.ts`) and `/sitemap.xml` (`app/sitemap.ts`)
- ✅ Correct `metadataBase` + canonical tags (was `og:url` → `*.vercel.app`)
- ✅ JSON-LD: Organization (layout), FAQPage + Product (homepage)
- ✅ Security headers + `poweredByHeader: false` (`next.config.mjs`; CSP is
  report-only — verify, then rename to `Content-Security-Policy` to enforce)
- ✅ Analytics: `@vercel/analytics` + Speed Insights, with a `waitlist_signup` event
- ✅ Real Privacy & Terms pages (UK GDPR)

## Local development
```bash
cd web
cp .env.example .env.local   # fill in Supabase anon key
npm install
npm run dev
```

## Environment variables
| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (waitlist insert) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default `https://www.gradpilotai.com`) |
| `ANTHROPIC_API_KEY` | Server-only. Powers the AI Career Adviser (Claude Opus 4.8) at `/adviser`. |

## Features

- **Marketing site** — home, about, blog, pricing, FAQ, legal, waitlist (writes to Supabase `waitlist_submissions`).
- **`/jobs`** — visa-sponsoring job board, server-rendered from the Supabase `jobs` table, filterable by Graduate Route / Skilled Worker sponsorship.
- **`/adviser`** — streaming AI career adviser on **Claude Opus 4.8** (adaptive thinking), via `/api/adviser`.

The waitlist form inserts into the Supabase `waitlist` table. If the env vars
aren't set, the form succeeds gracefully (no-op) so the UI still works in dev.

## Deploying on Vercel (replaces the CLI deploy)
1. Push this repo to GitHub (done) and **import it in Vercel** (New Project →
   import `diwashpoudel89-del/Gradpilot`).
2. Set **Root Directory = `web`**.
3. Add the three env vars above (Production + Preview).
4. Deploy, then point the `gradpilotai.com` / `www` domains at this project.
5. In **Google Search Console**, submit `https://www.gradpilotai.com/sitemap.xml`.

Connecting GitHub gives you CI/CD + preview deployments — the thing the
CLI-only deploy was missing.

## Known follow-ups (product decisions)
- Real auth on `/login` (currently a pre-launch placeholder, `noindex`).
- Stripe checkout for Pro/Premium (pricing CTAs currently → `/waitlist`).
- Port real blog posts into `/blog` and add them to `sitemap.ts`.
- Add a `public/og.png` (1200×630) and `public/icon.png` for richer social cards.
