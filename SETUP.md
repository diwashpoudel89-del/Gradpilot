# GradPilot AI — Live Site Setup & Access Reference

Everything needed to build, configure, and deploy **gradpilotai.com**.
Collected 2026-06-19. The only outstanding item is the **app source code** (see bottom).

## Hosting — Vercel
| Key | Value |
|-----|-------|
| Team | `gradpilot-ai` (`team_3YR3PlJDIxYGFCZFV3I0pAgv`) |
| Project | `gradpilot` (`prj_0VEZxSajAPGYvaZeoiVcI8CkPp7U`) |
| Framework | Next.js 16 · Node 24 · turbopack |
| Domains | gradpilotai.com, www.gradpilotai.com |
| Git repo connected | `diwashpoudel89-del/Gradpilot` |
| Production deployment | `dpl_3R2hJFNAs5uBLN36XEHN7Yox6tEd` (source: **cli**, READY) |
| Deployment Protection | **ON** (`live: false`) — site is private/pre-launch |

## Backend — Supabase
| Key | Value |
|-----|-------|
| Project ref | `tqpsvhtnoqhrvkntzlvz` |
| API URL | `https://tqpsvhtnoqhrvkntzlvz.supabase.co` |
| Publishable key | `sb_publishable_Gf-8az1tn9zeJars_CxTOA_ghx-G5X3` |
| Legacy anon key | `eyJhbGciOiJIUzI1NiI...` (JWT, role=anon) — public, client-side |

> The **service_role** secret is intentionally NOT stored here — keep it only in Vercel
> env vars / Supabase dashboard, never in the repo.

### Env vars the Next.js app needs (set in Vercel → Project → Settings → Environment Variables)
```
NEXT_PUBLIC_SUPABASE_URL=https://tqpsvhtnoqhrvkntzlvz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Gf-8az1tn9zeJars_CxTOA_ghx-G5X3
# Server-only (do NOT prefix with NEXT_PUBLIC, do NOT commit):
SUPABASE_SERVICE_ROLE_KEY=<from Supabase dashboard>
# Stripe (if billing is wired):
STRIPE_SECRET_KEY=<from Stripe dashboard>
STRIPE_WEBHOOK_SECRET=<from Stripe dashboard>
```
(Exact variable names depend on the app's code — confirm once the source is in.)

## Database state (live, as of 2026-06-19)
Content populated: jobs 30 · blog_posts 10 · mentors 10 · employer_insights 26 ·
interview_questions 36 · testimonials 8 · faqs 8 · pricing_plans 3 · site_content 13 ·
company_values 5 · team_members 4 · announcements 3.
Users: auth.users 2 · waitlist 1 · applications/CVs/subscriptions 0.
Migrations in `supabase/migrations/` (0001 security/perf, 0003 content seed applied).

## ⛔ The one missing thing — the Next.js source code
The running production site was deployed to Vercel **via CLI by a previous automated
session** (`source: cli`), and that source was never committed to git. No Vercel API/MCP
tool can export a CLI deployment's source files, so it cannot be recovered automatically.

**To unblock all further work, get the source into `diwashpoudel89-del/Gradpilot`:**
1. **Local copy** — if the project folder exists on any machine, push it to the repo root.
2. **Vercel dashboard** — Project `gradpilot` → Deployments → open the production build
   (`gradpilot-484cfnth6`) → **Source** tab → download, then commit to the repo.
3. **Rebuild** — if neither works, the app must be rebuilt from scratch (it can be wired to
   the existing, already-populated Supabase backend above).

Once `package.json` + `app/` (or `pages/`) are at the repo root, Vercel git builds will
succeed and changes can be made normally.
