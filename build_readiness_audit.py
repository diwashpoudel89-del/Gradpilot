#!/usr/bin/env python3
"""GradPilot AI — Production Readiness Audit PDF (20 June 2026)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, HRFlowable, ListFlowable, ListItem, PageBreak)

NAVY=colors.HexColor("#0B1F3A"); BLUE=colors.HexColor("#2563EB"); SKY=colors.HexColor("#EAF1FE")
GREEN=colors.HexColor("#16A34A"); AMBER=colors.HexColor("#D97706"); RED=colors.HexColor("#DC2626")
PURPLE=colors.HexColor("#7C3AED")
GREY=colors.HexColor("#475569"); LGREY=colors.HexColor("#F1F5F9"); BORDER=colors.HexColor("#CBD5E1")
WHITE=colors.white
styles=getSampleStyleSheet()
def S(n,**k):
    p=k.pop("parent",styles["Normal"]); return ParagraphStyle(n,parent=p,**k)
body=S("body",fontName="Helvetica",fontSize=9.5,leading=14,textColor=colors.HexColor("#1E293B"),spaceAfter=6)
bodyW=S("bodyW",parent=body,textColor=WHITE)
h1=S("h1",fontName="Helvetica-Bold",fontSize=15,leading=19,textColor=NAVY,spaceBefore=4,spaceAfter=6)
h2=S("h2",fontName="Helvetica-Bold",fontSize=11.5,leading=14,textColor=BLUE,spaceBefore=8,spaceAfter=4)
cell=S("cell",parent=body,fontSize=8.5,leading=11.5,spaceAfter=0)
cellB=S("cellB",parent=cell,fontName="Helvetica-Bold")
cellW=S("cellW",parent=cell,textColor=WHITE)
cellWB=S("cellWB",parent=cellW,fontName="Helvetica-Bold")
small=S("small",parent=body,fontSize=8,textColor=GREY,leading=11)
bullet=S("bullet",parent=body,leftIndent=2,spaceAfter=3)

def rule(): return HRFlowable(width="100%",thickness=0.8,color=BORDER,spaceBefore=4,spaceAfter=8)
def chip(label,color):
    return Paragraph(f'<font color="white"><b>&nbsp;{label}&nbsp;</b></font>',
        S("sc",fontName="Helvetica-Bold",fontSize=7.6,leading=10.5,backColor=color,alignment=1))
BLOCK=lambda:chip("BLOCKER",RED); HIGHc=lambda:chip("HIGH",AMBER); MEDc=lambda:chip("MED",BLUE); LOWc=lambda:chip("LOW",GREY)

W=A4[0]-36*mm
story=[]
def hf(c,d):
    c.saveState(); c.setStrokeColor(BORDER); c.setLineWidth(0.5)
    c.line(18*mm,14*mm,A4[0]-18*mm,14*mm)
    c.setFont("Helvetica",7.5); c.setFillColor(GREY)
    c.drawString(18*mm,10*mm,"GradPilot AI — Production Readiness Audit")
    c.drawRightString(A4[0]-18*mm,10*mm,"Confidential · 20 June 2026")
    c.drawCentredString(A4[0]/2,10*mm,f"Page {d.page}")
    c.restoreState()
frame=Frame(18*mm,16*mm,W,A4[1]-30*mm,id="m")
doc=BaseDocTemplate("/home/user/Gradpilot/GradPilotAI_Production_Readiness_Audit_2026-06-20.pdf",pagesize=A4,
    leftMargin=18*mm,rightMargin=18*mm,topMargin=14*mm,bottomMargin=16*mm,
    title="GradPilot AI — Production Readiness Audit",author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all",frames=[frame],onPage=hf)])

def section_table(rows,widths,head_color=NAVY):
    t=Table(rows,colWidths=widths)
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),head_color),("TEXTCOLOR",(0,0),(-1,0),WHITE),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
        ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),4.5),
        ("BOTTOMPADDING",(0,0),(-1,-1),4.5)]))
    return t

# Banner
banner=Table([[Paragraph('<font color="white"><b>Production Readiness Audit</b></font>',S("t",fontSize=22,leading=26))],
    [Paragraph('<font color="#BBD2FF">Everything preventing a public launch of gradpilotai.com</font>',S("t2",fontSize=11.5,leading=15))],
    [Spacer(1,3)],
    [Paragraph('<font color="#E3ECFF">Next.js on Vercel · Supabase · audited against live code &amp; database · 20 June 2026</font>',S("t3",fontSize=9,leading=12))]],
    colWidths=[W])
banner.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),18),
    ("RIGHTPADDING",(0,0),(-1,-1),18),("TOPPADDING",(0,0),(0,0),15),("BOTTOMPADDING",(0,-1),(-1,-1),15),
    ("TOPPADDING",(0,1),(-1,-1),0)]))
story+=[banner,Spacer(1,9)]

# Verdict
verdict=Table([[chip("VERDICT",NAVY),
    Paragraph('<b>NOT ready for public launch.</b> The marketing site is solid, but it <b>advertises AI features that do not exist yet</b> '
    '(CV coach, AI adviser, interview prep), has <b>no payments</b>, <b>no analytics</b>, and <b>no error pages</b>. '
    'These are launch blockers. Good news: the database schema is complete and the backend is secure — the work is wiring features, not rebuilding.',cell)]],
    colWidths=[22*mm,W-22*mm])
verdict.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),RED),("BACKGROUND",(1,0),(1,0),SKY),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
    ("TOPPADDING",(0,0),(-1,-1),8),("BOTTOMPADDING",(0,0),(-1,-1),8),("BOX",(0,0),(-1,-1),0.5,BORDER)]))
story+=[verdict,Spacer(1,9)]

# Scorecard
story.append(Paragraph("Readiness scorecard",h2))
sc=section_table([
    [Paragraph("<b>Area</b>",cellWB),Paragraph("<b>Status</b>",cellWB),Paragraph("<b>One-line summary</b>",cellWB)],
    [Paragraph("Marketing site",cell),chip("GOOD",GREEN),Paragraph("Landing, jobs, blog, mentors, pricing, FAQ all render real data.",cell)],
    [Paragraph("Database schema",cell),chip("GOOD",GREEN),Paragraph("All 33 tables exist incl. product tables; backend hardened.",cell)],
    [Paragraph("Core AI product",cell),chip("MISSING",RED),Paragraph("CV coach, adviser, interview prep advertised but not built.",cell)],
    [Paragraph("Payments",cell),chip("MISSING",RED),Paragraph("No Stripe; “Upgrade to Pro” just links to signup.",cell)],
    [Paragraph("Error handling",cell),chip("MISSING",RED),Paragraph("No error/loading pages; default Next.js crash screen.",cell)],
    [Paragraph("Analytics",cell),chip("MISSING",RED),Paragraph("Zero tracking — no GA4/PostHog/Vercel Analytics.",cell)],
    [Paragraph("Security",cell),chip("MINOR",AMBER),Paragraph("2 advisor items; weak min password length.",cell)],
    [Paragraph("SEO",cell),chip("PARTIAL",AMBER),Paragraph("Good metadata; no OG image or structured data.",cell)],
    [Paragraph("Performance",cell),chip("PARTIAL",AMBER),Paragraph("All pages force-dynamic; no caching/ISR; unoptimised images.",cell)],
    [Paragraph("Mobile",cell),chip("LIKELY OK",GREEN),Paragraph("Responsive Tailwind throughout; not device-tested.",cell)],
],[30*mm,22*mm,W-52*mm])
sc.setStyle(TableStyle([("ALIGN",(1,0),(1,-1),"CENTER"),("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
story.append(sc)

story.append(PageBreak())

# 1. Broken features
story.append(Paragraph("1 · Broken / non-functional features",h1)); story.append(rule())
story.append(section_table([
    [Paragraph("<b>Feature</b>",cellWB),Paragraph("<b>Problem</b>",cellWB),Paragraph("<b>Sev.</b>",cellWB)],
    [Paragraph("AI CV coach",cell),Paragraph("Advertised on homepage &amp; pricing; <b>no feature exists</b>. <code>cvs</code> table empty. Promising a feature you can't deliver is a trust/refund risk.",cell),BLOCK()],
    [Paragraph("AI career adviser",cell),Paragraph("Headline feature on homepage; <b>not built</b>. <code>ai_conversations</code> table empty/unused.",cell),BLOCK()],
    [Paragraph("Interview prep",cell),Paragraph("Advertised; 36 questions sit in DB but <b>no UI</b>. <code>interview_prep_sessions</code> empty.",cell),BLOCK()],
    [Paragraph("Upgrade to Pro / payments",cell),Paragraph("Pricing &amp; CTAs say “Upgrade to Pro” but link to <code>/signup</code> — <b>no Stripe, no charge</b>. <code>subscriptions</code> empty.",cell),BLOCK()],
    [Paragraph("Save &amp; track a job",cell),Paragraph("Job detail “Save &amp; track this job” links to <code>/signup</code>; <b>never saves</b>. <code>saved_jobs</code> &amp; <code>applications</code> empty/unused.",cell),HIGHc()],
    [Paragraph("Dashboard applications",cell),Paragraph("“Your applications” is <b>hardcoded</b> to “none yet” — never reads the <code>applications</code> table.",cell),HIGHc()],
    [Paragraph("Find a mentor",cell),Paragraph("Mentor cards show but there's <b>no contact/booking flow</b>. <code>mentor_requests</code> unused.",cell),MEDc()],
    [Paragraph("Job alerts",cell),Paragraph("<code>job_alerts</code> / <code>visa_deadline_alerts</code> tables exist; <b>no UI or sending</b>.",cell),LOWc()],
],[34*mm,W-50*mm,16*mm]))

# 2. Incomplete pages
story.append(Paragraph("2 · Incomplete pages",h1)); story.append(rule())
story.append(section_table([
    [Paragraph("<b>Page</b>",cellWB),Paragraph("<b>What's missing</b>",cellWB)],
    [Paragraph("/dashboard",cell),Paragraph("Just navigation cards + a hardcoded empty state. No real user data, saved jobs, applications, CV, or activity.",cell)],
    [Paragraph("/about",cell),Paragraph("Prose only. Does not render the <code>team_members</code> rows; no team section, no contact details.",cell)],
    [Paragraph("Profile / settings",cell),Paragraph("<b>Does not exist.</b> Users can't edit name, change password, set preferences, or delete their account (GDPR concern).",cell)],
    [Paragraph("Onboarding",cell),Paragraph("<b>Does not exist.</b> No capture of degree, field, visa status — so nothing can be personalised.",cell)],
    [Paragraph("Product pages",cell),Paragraph("No pages for CV analysis, adviser chat, interview practice, applications board, or saved jobs.",cell)],
    [Paragraph("Legal pages",cell),Paragraph("No Privacy Policy, Terms, or Cookie policy page — <b>required before collecting data publicly</b>.",cell)],
    [Paragraph("Contact / support",cell),Paragraph("No contact page; <code>support_tickets</code> table exists but unused.",cell)],
],[34*mm,W-34*mm]))

story.append(PageBreak())

# 3. Database tables
story.append(Paragraph("3 · Database tables — status",h1)); story.append(rule())
story.append(Paragraph("<b>No tables are missing.</b> All 33 expected tables exist with RLS enabled. The issue is that the <b>product tables are empty and unused</b> — the app never reads or writes them. Wiring features to these tables is the core build work.",body))
story.append(section_table([
    [Paragraph("<b>Table</b>",cellWB),Paragraph("<b>Rows</b>",cellWB),Paragraph("<b>State</b>",cellWB)],
    [Paragraph("jobs / employer_insights / blog_posts / mentors / faqs / pricing_plans / testimonials / interview_questions",cell),Paragraph("30 / 26 / 10 / 10 / 8 / 3 / 8 / 36",cell),chip("LIVE",GREEN)],
    [Paragraph("profiles",cell),Paragraph("2",cell),chip("LIVE",GREEN)],
    [Paragraph("waitlist_submissions",cell),Paragraph("1",cell),chip("LIVE",GREEN)],
    [Paragraph("team_members",cell),Paragraph("4",cell),chip("3 PLACEHOLDER",AMBER)],
    [Paragraph("saved_jobs · applications · cvs · ai_conversations · subscriptions · interview_prep_sessions · mentor_requests · job_alerts · visa_deadline_alerts · notifications · support_tickets · usage_tracking · room_listings",cell),Paragraph("0 (all)",cell),chip("EXISTS · UNUSED",RED)],
],[W-44*mm,18*mm,26*mm]))

# 4. Placeholder content
story.append(Paragraph("4 · Placeholder / unverified content",h1)); story.append(rule())
story.append(ListFlowable([ListItem(Paragraph(i,bullet),leftIndent=10,value="•") for i in [
    "<b>team_members:</b> 3 “TBC” rows (Head of Product, Lead Engineer, COO) seeded from the old prototype — remove or replace with real people.",
    "<b>Promotional claim:</b> “3 months of Pro free for early members” appears on the homepage — make sure that's an intended, honourable offer.",
    "<b>Testimonials (8):</b> imported from the Base44 prototype — confirm these are real, consented quotes before showing them publicly (legal risk if invented).",
    "<b>Pricing fallback:</b> a hardcoded Free/Pro fallback exists in code; ensure the live <code>pricing_plans</code> rows are the intended, final prices.",
    "<b>About page:</b> founder story is generic (“founded by an international student”) — add real names/specifics for credibility.",
]],bulletType="bullet",leftIndent=12,bulletColor=BLUE,bulletFontSize=8,spaceAfter=4))

# 5. Error handling
story.append(Paragraph("5 · Missing error handling",h1)); story.append(rule())
story.append(ListFlowable([ListItem(Paragraph(i,bullet),leftIndent=10,value="•") for i in [
    "<b>No <code>error.tsx</code> / <code>global-error.tsx</code>:</b> any unhandled render error shows the raw Next.js error screen — no branding, no recovery.",
    "<b>No <code>loading.tsx</code>:</b> dynamic pages (jobs, blog, mentors) have no loading skeletons — users see a blank pause while Supabase responds.",
    "<b>Silent empty states:</b> queries fail soft to empty arrays (good for stability) but several pages then render nothing with no “couldn't load” message.",
    "<b>Auth callback:</b> redirects to <code>/login?error=auth</code> on failure, but the login page <b>doesn't display</b> that error param — user gets no feedback.",
    "<b>Forms:</b> waitlist &amp; auth show generic errors; no field-level validation feedback or retry guidance.",
]],bulletType="bullet",leftIndent=12,bulletColor=BLUE,bulletFontSize=8,spaceAfter=4))

story.append(PageBreak())

# 6. Security
story.append(Paragraph("6 · Security issues",h1)); story.append(rule())
story.append(section_table([
    [Paragraph("<b>Issue</b>",cellWB),Paragraph("<b>Detail &amp; fix</b>",cellWB),Paragraph("<b>Sev.</b>",cellWB)],
    [Paragraph("Leaked-password protection OFF",cell),Paragraph("Supabase Auth HaveIBeenPwned check disabled. One-click enable in Auth settings.",cell),HIGHc()],
    [Paragraph("Weak min password",cell),Paragraph("Signup allows 6-char passwords. Raise to 8+ and add strength guidance.",cell),MEDc()],
    [Paragraph("No rate limiting",cell),Paragraph("Waitlist &amp; auth forms have no throttling/CAPTCHA — open to spam/abuse. Add Supabase rate limits or hCaptcha.",cell),MEDc()],
    [Paragraph("No legal/consent",cell),Paragraph("Collecting emails with no Privacy Policy or cookie consent — UK GDPR exposure. ICO registration still PENDING.",cell),HIGHc()],
    [Paragraph("is_admin() executable",cell),Paragraph("Advisor warning; required by RLS policies — by design, safe.",cell),LOWc()],
    [Paragraph("Anon key in repo",cell),Paragraph("Hardcoded fallback in <code>lib/env.ts</code> — public/RLS-protected by design, but rotate if ever misused.",cell),LOWc()],
],[40*mm,W-56*mm,16*mm]))
story.append(Paragraph("Backend is otherwise in good shape: RLS enabled on every table; security advisors down to 2 (one by-design, one one-click).",small))

# 7. Mobile
story.append(Paragraph("7 · Mobile responsiveness",h1)); story.append(rule())
story.append(Paragraph("The codebase uses responsive Tailwind breakpoints throughout (<code>sm: / md: / lg:</code> grids, stacked hero CTAs, sticky sidebar that collapses). <b>No structural red flags</b>, but it has <b>not been tested on real devices</b>. Before launch, manually check: nav/header on small screens, long job titles &amp; tables, form inputs (font-size ≥16px to avoid iOS zoom), and tap-target sizes.",body))

# 8. Performance
story.append(Paragraph("8 · Performance issues",h1)); story.append(rule())
story.append(ListFlowable([ListItem(Paragraph(i,bullet),leftIndent=10,value="•") for i in [
    "<b>Everything is <code>force-dynamic</code>:</b> every page (even rarely-changing blog/jobs/pricing) hits Supabase on every request. Switch content pages to ISR (<code>revalidate</code>) for big speed + cost wins.",
    "<b>Unoptimised images:</b> avatars use raw <code>&lt;img&gt;</code> (eslint-disabled) instead of <code>next/image</code> — no resizing, lazy-loading or modern formats.",
    "<b>No caching headers / CDN strategy</b> beyond Vercel defaults for dynamic routes.",
    "<b>No bundle/Lighthouse budget</b> tracked. Run Lighthouse before launch to baseline LCP/CLS.",
]],bulletType="bullet",leftIndent=12,bulletColor=BLUE,bulletFontSize=8,spaceAfter=4))

story.append(PageBreak())

# 9. SEO
story.append(Paragraph("9 · Missing SEO settings",h1)); story.append(rule())
story.append(section_table([
    [Paragraph("<b>Item</b>",cellWB),Paragraph("<b>Status / action</b>",cellWB)],
    [Paragraph("Title/description/OG tags",cell),Paragraph("Present &amp; good (root + blog). ✔",cell)],
    [Paragraph("sitemap.xml / robots.txt",cell),Paragraph("Present &amp; dynamic. ✔",cell)],
    [Paragraph("OG / social share image",cell),Paragraph("<b>Missing</b> — no opengraph-image, so links share with no preview card. Add one (static or generated).",cell)],
    [Paragraph("Twitter card metadata",cell),Paragraph("<b>Missing</b> — add <code>twitter</code> card fields.",cell)],
    [Paragraph("Structured data (JSON-LD)",cell),Paragraph("<b>Missing</b> — add <code>JobPosting</code> (huge for Google Jobs), <code>Article</code> (blog), <code>FAQPage</code> (faq).",cell)],
    [Paragraph("Per-page canonical URLs",cell),Paragraph("<b>Missing</b> — add canonical tags to avoid duplicate-content dilution.",cell)],
    [Paragraph("Per-page metadata",cell),Paragraph("Static pages have basic metadata; job/mentor detail pages lack dynamic titles/descriptions.",cell)],
],[42*mm,W-42*mm]))

# 10. Analytics
story.append(Paragraph("10 · Missing analytics",h1)); story.append(rule())
story.append(Paragraph("<b>There is no analytics of any kind.</b> No GA4, no PostHog, no Vercel Analytics, no conversion or funnel tracking, no error monitoring (e.g. Sentry). Launching without this means <b>zero visibility</b> into traffic, sign-up conversion, drop-off, or runtime errors. Add at minimum: (1) a product analytics tool (PostHog or GA4), (2) Vercel Web Analytics, and (3) error monitoring (Sentry).",body))

# Launch blocker checklist
story.append(Paragraph("11 · Launch-blocker checklist (do these before going public)",h1)); story.append(rule())
story.append(section_table([
    [Paragraph("<b>#</b>",cellWB),Paragraph("<b>Blocker</b>",cellWB),Paragraph("<b>Owner</b>",cellWB)],
    [Paragraph("1",cell),Paragraph("Resolve the “advertised but missing” AI features — <b>either build a first version OR soften the marketing copy</b> to “coming soon”. Shipping false claims is the #1 risk.",cell),Paragraph("Me",cell)],
    [Paragraph("2",cell),Paragraph("Add Stripe checkout + webhooks so “Upgrade to Pro” actually charges and sets <code>subscriptions</code>.",cell),Paragraph("Me",cell)],
    [Paragraph("3",cell),Paragraph("Add analytics + error monitoring (PostHog/GA4 + Vercel Analytics + Sentry).",cell),Paragraph("Me",cell)],
    [Paragraph("4",cell),Paragraph("Add <code>error.tsx</code>, <code>global-error.tsx</code>, <code>loading.tsx</code> and a login error display.",cell),Paragraph("Me",cell)],
    [Paragraph("5",cell),Paragraph("Publish Privacy Policy, Terms &amp; cookie consent; complete ICO registration.",cell),Paragraph("You + Me",cell)],
    [Paragraph("6",cell),Paragraph("Enable leaked-password protection; raise min password length; add form rate-limiting.",cell),Paragraph("Me",cell)],
    [Paragraph("7",cell),Paragraph("Replace/remove the 3 “TBC” team members; verify testimonials are real &amp; consented.",cell),Paragraph("You + Me",cell)],
    [Paragraph("8",cell),Paragraph("Add OG image + JSON-LD structured data; switch content pages to ISR.",cell),Paragraph("Me",cell)],
    [Paragraph("9",cell),Paragraph("Wire “Save &amp; track job” + dashboard applications to the real tables (or hide the buttons).",cell),Paragraph("Me",cell)],
    [Paragraph("10",cell),Paragraph("Manual mobile QA + Lighthouse pass; then turn OFF Vercel Deployment Protection.",cell),Paragraph("Me",cell)],
],[8*mm,W-30*mm,22*mm]))
story.append(Spacer(1,8))

close=Table([[Paragraph("<font color='white'><b>Bottom line:</b> don't open the doors yet. The site looks finished but promises AI features it can't deliver, can't take payment, "
    "and is invisible to analytics with no error pages or legal cover. None of this needs a rebuild — the schema and backend are ready. "
    "The honest fastest path to launch: <b>(a)</b> soften copy to “coming soon” for unbuilt features OR build their first versions, <b>(b)</b> wire Stripe + analytics + error pages + legal, "
    "then <b>(c)</b> flip the site public. I can start on the “Me” items immediately.</font>",bodyW)]],
    colWidths=[W])
close.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
    ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
story.append(close)

doc.build(story)
print("done")
