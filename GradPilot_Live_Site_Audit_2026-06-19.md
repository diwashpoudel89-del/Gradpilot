# GradPilot AI — Live Site Audit

**Target:** the live production site at **gradpilotai.com** (Vercel)
**Date:** 19 June 2026
**Auditor:** automated technical audit (HTTP, headers, SEO, Supabase advisors)
**Stage:** Pre-launch / waitlist

---

## 0. Headline finding

**The live site is not the product the 16 June audit described.** That audit
examined the **Base44 app** (30 jobs, 10 mentors, 10 blog posts, full
dashboard). What's actually live on `gradpilotai.com` today is a **separate,
newly built Next.js marketing site on Vercel** (deployed 16–17 June), running
in **pre-launch / waitlist mode** — no working app, no checkout, empty blog.

Treat the Vercel/Next.js site as the public-facing source of truth from now on.
Progress claims about "10 published blog posts" and a "full live app" refer to
Base44 and are **not** what a visitor reaches.

---

## 1. Architecture & hosting (verified live)

| Item | Finding |
|------|---------|
| Framework | Next.js (App Router + Turbopack), React Server Components, prerendered/static |
| Host | Vercel (team "Gradpilot AI"), edge-cached (`x-vercel-cache: HIT`) |
| Serving region | `iad1` — **US East** (users + DB are UK/EU) |
| Domain | `gradpilotai.com` → 308 → `www.gradpilotai.com` (canonical host = www) |
| `app.gradpilotai.com` | **Not reachable** via this Vercel team — app subdomain not wired up here |
| Backend | Supabase `tqpsvhtnoqhrvkntzlvz` (Postgres 17, eu-west-1, ACTIVE_HEALTHY) |

## 2. Pages live

`/`, `/about`, `/blog` (**empty**), `/waitlist`, `/login`, `/privacy`, `/terms`,
plus homepage anchors (`#features`, `#how-it-works`, `#who-its-for`, `#pricing`,
`#faq`). **No `/signup`** — entry is waitlist + sign-in only.

The landing page itself is strong and content-complete: clear positioning, 7
features, 4-step "how it works", 4 audience segments, 3 pricing tiers (Free /
Pro £9.99 / Premium £19.99), 8-item FAQ, founder story, GDPR line. Good
copy, on-brand, fast.

---

## 3. Findings by severity

### HIGH — SEO is effectively broken
- `/robots.txt` → **404** (no robots file).
- `/sitemap.xml` → **404** (nothing for crawlers to follow).
- `og:url` is hardcoded to `https://gradpilotai.vercel.app` on every page — wrong
  canonical host; hands ranking/social equity to the `.vercel.app` domain.
- **No `<link rel="canonical">`** anywhere.
- **No JSON-LD / structured data** (no Organization, no FAQPage — despite an
  on-page FAQ that is ideal for rich results).
- Per-page OG/Twitter tags are generic (the blog page reuses the homepage's).

### HIGH — No analytics installed
No GA4, PostHog, Plausible, Vercel Analytics, or Clarity. For a pre-launch site
whose only goal is waitlist sign-ups, **traffic, sources, and conversion rate
are currently unmeasurable.**

### MEDIUM — Missing security headers
Only `Strict-Transport-Security` is set. Missing: `Content-Security-Policy`,
`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`. `x-powered-by: Next.js` is exposed (minor info disclosure).

### MEDIUM — Empty blog undercuts the SEO strategy
`/blog` shows a placeholder ("We're writing our first articles now"). The
keyword strategy (Graduate Route, UK CVs, sponsorship) has **no content to
rank**. The 10 posts from the prior audit live on Base44 and are not here.

### LOW — Launch-readiness gaps (expected pre-launch, tracked)
- Pricing CTAs ("Start for free / Start Pro / Go Premium") all link to
  `/waitlist` — **no Stripe checkout is live.**
- `/login` exists but the app it leads to isn't reachable here — verify or hide.
- `/about`, `/privacy`, `/terms` return 200 (content not deep-verified). Confirm
  legal pages are real and ICO/GDPR registration is complete before driving traffic.
- Footer "Contact" → `mailto:hello@gradpilotai.com` (confirm inbox is monitored).
- Serving region `iad1` (US East) vs DB `eu-west-1` — latency tax once dynamic.

### GOOD — Backend (Supabase)
After this session's fix, advisor state is:
- **Security: 2 warnings** — (1) `is_admin()` executable by `authenticated` (by
  design — RLS calls it); (2) **Leaked Password Protection disabled** (enable in
  Auth settings — dashboard only, 1 click).
- **Performance: clean of WARN-level issues except 2 deliberate** multiple-permissive
  policies. The 2 `usage_tracking` `auth_rls_initplan` warnings were **fixed this
  session** (migration `0002` applied). Remaining lints are INFO-level unused
  indexes (expected on empty tables).

---

## 4. What was done in this session (19 June)

1. **Audited the live Vercel site** end-to-end (HTTP, headers, SEO, page inventory).
2. **Applied Supabase migration `0002`** — resolved the 2 `usage_tracking`
   `auth_rls_initplan` performance warnings. Verified via advisors.
3. **Produced drop-in fixes** for the Next.js site under [`site-fixes/`](site-fixes/):
   `robots.ts`, `sitemap.ts`, `metadataBase`/canonical, security-headers
   `next.config`, JSON-LD components, and an analytics setup guide.

## 5. Remaining work (owner action)

**Quick wins (paste from `site-fixes/`, redeploy):**
1. Add `robots.ts` + `sitemap.ts`.
2. Fix `metadataBase` → `https://www.gradpilotai.com` + canonical tags.
3. Install Vercel Analytics + `waitlist_signup` event.
4. Enable Supabase leaked-password protection (dashboard).

**This week:**
5. Add the security-headers block (CSP ships report-only — verify, then enforce).
6. Add JSON-LD (Organization + FAQPage).
7. Submit the sitemap in Google Search Console.
8. Port the blog posts onto the live `/blog` (or drop the SEO claims until done).

**Before opening sign-ups:**
9. Wire Stripe checkout (or keep CTAs honestly → waitlist).
10. Verify `/login`, Privacy/Terms, and ICO/GDPR.
11. Decide the single product stack (Next.js vs Base44) — effort is currently split.

## 6. Limitations of this audit

- Vercel MCP token is SAML-scoped: `list_projects` returned empty and
  `get_project` 404'd, so build logs / env config / deployment metadata could
  not be inspected. Audit done via authenticated page fetches.
- Page bodies of `/about`, `/privacy`, `/terms`, `/waitlist`, `/login` were not
  deep-read — only confirmed to resolve (HTTP 200).
- The live Next.js source is not in this repo, so code fixes are provided as
  drop-in files rather than applied directly.
