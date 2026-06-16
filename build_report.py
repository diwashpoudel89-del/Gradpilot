#!/usr/bin/env python3
"""Generate the GradPilot AI site audit PDF report."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem, PageBreak, KeepTogether
)

# ---- Brand palette -------------------------------------------------------
NAVY   = colors.HexColor("#0B1F3A")
BLUE   = colors.HexColor("#2563EB")
SKY    = colors.HexColor("#EAF1FE")
GREEN  = colors.HexColor("#16A34A")
AMBER  = colors.HexColor("#D97706")
RED    = colors.HexColor("#DC2626")
GREY   = colors.HexColor("#475569")
LGREY  = colors.HexColor("#F1F5F9")
BORDER = colors.HexColor("#CBD5E1")
WHITE  = colors.white

styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

body   = S("body", fontName="Helvetica", fontSize=9.5, leading=14, textColor=colors.HexColor("#1E293B"), spaceAfter=6)
bodyW  = S("bodyW", parent=body, textColor=WHITE)
h1     = S("h1", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=NAVY, spaceBefore=6, spaceAfter=8)
h2     = S("h2", fontName="Helvetica-Bold", fontSize=12.5, leading=16, textColor=BLUE, spaceBefore=10, spaceAfter=5)
small  = S("small", parent=body, fontSize=8, textColor=GREY, leading=11)
cell   = S("cell", parent=body, fontSize=8.7, leading=12, spaceAfter=0)
cellB  = S("cellB", parent=cell, fontName="Helvetica-Bold")
cellW  = S("cellW", parent=cell, textColor=WHITE)
kpinum = S("kpinum", fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=NAVY, alignment=TA_CENTER)
kpilbl = S("kpilbl", fontName="Helvetica", fontSize=7.6, leading=10, textColor=GREY, alignment=TA_CENTER)
bullet = S("bullet", parent=body, leftIndent=2, spaceAfter=3)

def chip(text, color):
    t = Table([[Paragraph(f'<font color="white"><b>{text}</b></font>', cell)]],
              colWidths=[len(text)*5.4+16])
    t.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),color),
        ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
        ("TOPPADDING",(0,0),(-1,-1),2),("BOTTOMPADDING",(0,0),(-1,-1),3),
        ("ROUNDEDCORNERS",[4,4,4,4]),
    ]))
    return t

def blist(items, st=bullet):
    return ListFlowable(
        [ListItem(Paragraph(i, st), leftIndent=10, value="•") for i in items],
        bulletType="bullet", start="•", leftIndent=12, bulletColor=BLUE,
        bulletFontSize=8, spaceBefore=0, spaceAfter=4)

def section_rule():
    return HRFlowable(width="100%", thickness=0.8, color=BORDER, spaceBefore=4, spaceAfter=8)

# ---- Document scaffolding -----------------------------------------------
story = []

def header_footer(canvas, doc):
    canvas.saveState()
    # footer
    canvas.setStrokeColor(BORDER); canvas.setLineWidth(0.5)
    canvas.line(18*mm, 14*mm, A4[0]-18*mm, 14*mm)
    canvas.setFont("Helvetica", 7.5); canvas.setFillColor(GREY)
    canvas.drawString(18*mm, 10*mm, "GradPilot AI — Site Audit & Weekly Plan")
    canvas.drawRightString(A4[0]-18*mm, 10*mm, "Confidential · 16 June 2026")
    canvas.drawCentredString(A4[0]/2, 10*mm, f"Page {doc.page}")
    canvas.restoreState()

frame = Frame(18*mm, 16*mm, A4[0]-36*mm, A4[1]-30*mm, id="main")
doc = BaseDocTemplate("/home/user/Gradpilot/GradPilot_Site_Audit_2026-06-16.pdf",
                      pagesize=A4, leftMargin=18*mm, rightMargin=18*mm,
                      topMargin=14*mm, bottomMargin=16*mm,
                      title="GradPilot AI — Site Audit & Weekly Plan",
                      author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=header_footer)])

# =========================================================================
# COVER BANNER
# =========================================================================
banner = Table([[Paragraph(
    '<font color="white"><b>GradPilot AI</b></font>', S("t", fontSize=26, leading=30))],
    [Paragraph('<font color="#BBD2FF">Full Site Audit · Progress Report · Plan for the Week</font>',
               S("t2", fontSize=12, leading=16))],
    [Spacer(1,4)],
    [Paragraph('<font color="#E3ECFF">The career co-pilot for international students in the UK</font>',
               S("t3", fontSize=9.5, leading=13))]],
    colWidths=[A4[0]-36*mm])
banner.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),NAVY),
    ("LEFTPADDING",(0,0),(-1,-1),18),("RIGHTPADDING",(0,0),(-1,-1),18),
    ("TOPPADDING",(0,0),(0,0),16),("BOTTOMPADDING",(0,-1),(-1,-1),16),
    ("TOPPADDING",(0,1),(-1,-1),0),
]))
story.append(banner)
story.append(Spacer(1,6))

meta = Table([
    [Paragraph("<b>Prepared for</b>", cell), Paragraph("Diwash Poudel — Founder &amp; CEO", cell),
     Paragraph("<b>Date</b>", cell), Paragraph("16 June 2026", cell)],
    [Paragraph("<b>Product</b>", cell), Paragraph("GradPilot AI (gradpilotai.com)", cell),
     Paragraph("<b>Stage</b>", cell), Paragraph("Early MVP / Pre-launch", cell)],
    [Paragraph("<b>Platform</b>", cell), Paragraph("Base44 + Supabase + Stripe", cell),
     Paragraph("<b>Entity</b>", cell), Paragraph("GradPilot AI Ltd, London UK", cell)],
], colWidths=[26*mm, 62*mm, 20*mm, 66*mm])
meta.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),LGREY),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
]))
story.append(meta)
story.append(Spacer(1,12))

# =========================================================================
# 1. EXECUTIVE SUMMARY
# =========================================================================
story.append(Paragraph("1 &nbsp;·&nbsp; Executive Summary", h1))
story.append(section_rule())
story.append(Paragraph(
    "GradPilot AI is a feature-complete <b>product foundation</b> built on the Base44 platform, with a parallel "
    "Supabase database and Stripe billing scaffolding. The marketing website and the in-app experience both exist "
    "and are populated with real content — a 30-job board of genuine UK employers that sponsor visas, 10 mentor "
    "profiles, 10 SEO blog articles, and a fully fleshed-out CMS. In short: <b>the house is built and furnished.</b>", body))
story.append(Paragraph(
    "What is missing is <b>occupants</b>. There are 5 registered users (4 beyond the founder) and effectively zero "
    "product engagement so far — 0 tracked applications, 0 CV analyses, 0 subscriptions. The single most important "
    "fact in this report: the build is far ahead of the traction. This week should pivot from building to "
    "<b>launching, hardening, and getting real users through the door.</b>", body))

verdict = Table([[
    Paragraph('<font color="white"><b>Overall verdict</b></font>', cell),
    Paragraph('<font color="white"><b>Strong build, thin traction — ready to launch once a handful of '
              'security &amp; data-hygiene items are closed.</b></font>', cellW)]],
    colWidths=[34*mm, 120*mm])
verdict.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(0,0),BLUE),("BACKGROUND",(1,0),(1,0),colors.HexColor("#1D4ED8")),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("LEFTPADDING",(0,0),(-1,-1),9),("RIGHTPADDING",(0,0),(-1,-1),9),
    ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),
]))
story.append(verdict)
story.append(Spacer(1,10))

# KPI strip
def kpi(num, lbl, color=NAVY):
    inner = Table([[Paragraph(f'<font color="{color.hexval()[2:] and "#"+color.hexval()[4:]}">{num}</font>'
                              if False else num, kpinum)],
                   [Paragraph(lbl, kpilbl)]])
    return inner

def kpi_cell(num, lbl, ncolor=NAVY):
    t = Table([[Paragraph(num, S("k", fontName="Helvetica-Bold", fontSize=19, leading=21,
                                 textColor=ncolor, alignment=TA_CENTER))],
               [Paragraph(lbl, kpilbl)]])
    t.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,-1),SKY),("BOX",(0,0),(-1,-1),0.5,BORDER),
        ("TOPPADDING",(0,0),(0,0),8),("BOTTOMPADDING",(0,1),(-1,1),8),
        ("TOPPADDING",(0,1),(-1,1),0),
        ("LEFTPADDING",(0,0),(-1,-1),3),("RIGHTPADDING",(0,0),(-1,-1),3),
    ]))
    return t

kpis = Table([[
    kpi_cell("34", "Data entities<br/>(product modules)", BLUE),
    kpi_cell("30", "Live jobs<br/>(real employers)", GREEN),
    kpi_cell("5", "Registered<br/>users", NAVY),
    kpi_cell("10", "Blog posts<br/>(5 published)", BLUE),
    kpi_cell("0", "Paying<br/>subscribers", AMBER),
]], colWidths=[(A4[0]-36*mm)/5.0]*5)
kpis.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),2),("RIGHTPADDING",(0,0),(-1,-1),2),
                          ("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
story.append(kpis)
story.append(Spacer(1,12))

# =========================================================================
# 2. WHAT WE'VE ACHIEVED
# =========================================================================
story.append(Paragraph("2 &nbsp;·&nbsp; What We've Achieved So Far", h1))
story.append(section_rule())
story.append(Paragraph("A genuinely broad product has been assembled. The platform already covers the full "
    "international-student-to-UK-graduate-job journey:", body))

story.append(Paragraph("Product surface that is built", h2))
feat = Table([
    [Paragraph("<b>Area</b>", cellB), Paragraph("<b>What's live</b>", cellB)],
    [Paragraph("Jobs &amp; Visa", cell), Paragraph("Job board (30 real listings: Spotify, Wayve, Wise, Palantir, "
        "Goldman Sachs…), Graduate-Route / Skilled-Worker sponsorship flags, saved jobs, job alerts, employer insights.", cell)],
    [Paragraph("CV &amp; Applications", cell), Paragraph("CV analysis &amp; AI rewrite, scoring, cover-letter generation, "
        "application tracker with interview/offer pipeline &amp; sponsorship status.", cell)],
    [Paragraph("AI &amp; Interview", cell), Paragraph("AI career chat assistant, interview-prep sessions with scored "
        "feedback, and an interview-question bank (behavioural / technical / visa-related).", cell)],
    [Paragraph("Mentorship", cell), Paragraph("10 mentor profiles with visa-journey stories + mentor-request workflow.", cell)],
    [Paragraph("Life in the UK", cell), Paragraph("Room/housing listings, visa-deadline alert engine, and a relocation "
        "checklist (bank account, NI number, GP, address).", cell)],
    [Paragraph("Monetisation", cell), Paragraph("Three pricing tiers, Stripe subscription model, and per-feature monthly "
        "usage limits (free vs paid gating).", cell)],
    [Paragraph("Marketing &amp; CMS", cell), Paragraph("Full landing site (hero, features, how-it-works, pricing, FAQ, "
        "about/founder story, testimonials) + 10-post SEO blog + waitlist capture — all editable via CMS entities.", cell)],
    [Paragraph("Admin", cell), Paragraph("Support-ticket system, announcements, in-app notifications, and usage tracking.", cell)],
], colWidths=[30*mm, 124*mm])
feat.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, LGREY]),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
]))
story.append(feat)
story.append(Spacer(1,8))

story.append(Paragraph("Content &amp; data already seeded", h2))
story.append(blist([
    "<b>30 job listings</b> from real UK employers with working application links and visa-sponsorship metadata.",
    "<b>10 published/draft blog articles</b> targeting high-intent SEO keywords (Graduate Route visa, UK CV writing, "
    "sponsor register, NI number, rental scams, graduate schemes, bank accounts, NHS registration).",
    "<b>10 mentor profiles</b>, <b>8 FAQs</b>, <b>3 pricing plans</b>, 7 platform features, 4 'how it works' steps and "
    "the full company/founder story — the marketing site is content-complete.",
    "Clear brand &amp; positioning: London-registered <b>GradPilot AI Ltd</b>, founder-led story, live domains "
    "(gradpilotai.com / app.gradpilotai.com).",
]))
story.append(PageBreak())

# =========================================================================
# 3. HOW WELL THE SITE IS WORKING
# =========================================================================
story.append(Paragraph("3 &nbsp;·&nbsp; How Well the Website Is Working", h1))
story.append(section_rule())

story.append(Paragraph("Health scorecard", h2))
def status_chip(label, color):
    return Paragraph(f'<font color="white"><b>&nbsp;{label}&nbsp;</b></font>',
                     S("sc", fontName="Helvetica-Bold", fontSize=8, leading=11,
                       backColor=color, alignment=TA_CENTER))

score = Table([
    [Paragraph("<b>Dimension</b>", cellB), Paragraph("<b>Rating</b>", cellB), Paragraph("<b>Notes</b>", cellB)],
    [Paragraph("Feature completeness", cell), status_chip("STRONG", GREEN),
     Paragraph("34 modules covering the whole journey; little is conceptually missing.", cell)],
    [Paragraph("Content readiness", cell), status_chip("STRONG", GREEN),
     Paragraph("Marketing site and blog are populated and on-brand.", cell)],
    [Paragraph("Marketing site / SEO", cell), status_chip("GOOD", GREEN),
     Paragraph("Live domain, blog, meta descriptions, target keywords set. Indexing/analytics need confirming.", cell)],
    [Paragraph("Data integrity", cell), status_chip("NEEDS WORK", AMBER),
     Paragraph("Real data mixed with sample/placeholder rows (example.com waitlist, sample mentors).", cell)],
    [Paragraph("Security posture", cell), status_chip("NEEDS WORK", AMBER),
     Paragraph("6 Supabase security warnings (RLS &amp; SECURITY DEFINER). None critical, all fixable.", cell)],
    [Paragraph("DB performance / RLS", cell), status_chip("NEEDS WORK", AMBER),
     Paragraph("169 advisor lints — mostly duplicate permissive policies &amp; un-optimised auth checks.", cell)],
    [Paragraph("User traction", cell), status_chip("WEAK", RED),
     Paragraph("5 users, ~0 active product usage, 0 subscribers. This is the real gap.", cell)],
    [Paragraph("Code backup / portability", cell), status_chip("WEAK", RED),
     Paragraph("Git repo is empty — no exported source or backup outside Base44.", cell)],
], colWidths=[40*mm, 24*mm, 90*mm])
score.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, LGREY]),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(1,0),(1,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
]))
story.append(score)
story.append(Spacer(1,10))

story.append(Paragraph("Issues found (prioritised)", h2))
issues = Table([
    [Paragraph("<b>#</b>", cellB), Paragraph("<b>Issue</b>", cellB), Paragraph("<b>Severity</b>", cellB), Paragraph("<b>Fix</b>", cellB)],
    [Paragraph("1", cell), Paragraph("<code>SECURITY DEFINER</code> functions <code>handle_new_user()</code> &amp; "
        "<code>is_admin()</code> are callable by anon/authenticated roles via RPC.", cell), status_chip("HIGH", RED),
     Paragraph("Revoke EXECUTE or switch to SECURITY INVOKER.", cell)],
    [Paragraph("2", cell), Paragraph("Waitlist insert RLS policy uses <code>WITH CHECK (true)</code> — unrestricted writes.", cell),
     status_chip("MED", AMBER), Paragraph("Add rate-limit / column constraints.", cell)],
    [Paragraph("3", cell), Paragraph("<code>set_updated_at</code> function has a mutable <code>search_path</code>.", cell),
     status_chip("MED", AMBER), Paragraph("Pin search_path on the function.", cell)],
    [Paragraph("4", cell), Paragraph("141 duplicate 'permissive' RLS policies + 17 un-optimised <code>auth.uid()</code> "
        "calls + 8 unindexed foreign keys.", cell), status_chip("MED", AMBER),
     Paragraph("Consolidate policies; wrap auth in <code>(select auth.uid())</code>; add FK indexes.", cell)],
    [Paragraph("5", cell), Paragraph("Duplicate empty 'GradPilot AI' Base44 app exists alongside the real one.", cell),
     status_chip("LOW", GREY), Paragraph("Delete/archive the empty duplicate.", cell)],
    [Paragraph("6", cell), Paragraph("Sample data (example.com waitlist, sample mentors) mixed with real records; "
        "ICO registration shows PENDING.", cell), status_chip("LOW", GREY),
     Paragraph("Purge samples before launch; complete ICO/GDPR.", cell)],
    [Paragraph("7", cell), Paragraph("No source/code backup outside Base44 (git repo empty).", cell),
     status_chip("LOW", GREY), Paragraph("Export and commit a backup snapshot.", cell)],
], colWidths=[8*mm, 78*mm, 20*mm, 48*mm])
issues.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, LGREY]),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(2,0),(2,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
]))
story.append(issues)
story.append(Spacer(1,6))
story.append(Paragraph("Note: the architecture currently keeps data in <b>two places</b> (Base44 entities, which the live "
    "app reads, and a near-empty Supabase mirror). Decide on a single source of truth before scaling to avoid drift.", small))

story.append(PageBreak())

# =========================================================================
# 4. PLAN FOR THE WEEK
# =========================================================================
story.append(Paragraph("4 &nbsp;·&nbsp; The Plan for This Week (16–22 June)", h1))
story.append(section_rule())
story.append(Paragraph("Theme of the week: <b>stop building, start launching.</b> The product is ready enough; the "
    "priority is hardening it for real users and getting those users in. Below is a day-by-day plan plus the three "
    "outcomes that define success.", body))

story.append(Paragraph("Three outcomes that define a good week", h2))
story.append(blist([
    "<b>Secure &amp; clean:</b> all HIGH/MED security items closed and sample data purged — safe to put in front of strangers.",
    "<b>Launch-ready:</b> a working sign-up → onboarding → first-value path, plus analytics so we can <i>see</i> usage.",
    "<b>First 25 real users:</b> a concrete acquisition push (university communities, socials, waitlist activation).",
]))

story.append(Paragraph("Day-by-day", h2))
plan = Table([
    [Paragraph("<b>Day</b>", cellW), Paragraph("<b>Focus</b>", cellW), Paragraph("<b>Key tasks</b>", cellW)],
    [Paragraph("Mon–Tue", cellB), Paragraph("Security &amp; data hygiene", cell),
     Paragraph("Fix SECURITY DEFINER functions, waitlist RLS, search_path; purge example.com/sample rows; "
               "delete duplicate Base44 app; export a code/data backup to git.", cell)],
    [Paragraph("Wed", cellB), Paragraph("DB hardening", cell),
     Paragraph("Consolidate duplicate RLS policies, optimise auth.uid() checks, add the 8 missing FK indexes; "
               "decide Base44-vs-Supabase source of truth.", cell)],
    [Paragraph("Thu", cellB), Paragraph("Launch readiness", cell),
     Paragraph("Walk the full sign-up → onboarding → first job-save / first CV-analysis flow; fix friction; "
               "wire up analytics (GA4 / PostHog) + key conversion events; confirm Stripe checkout works end-to-end.", cell)],
    [Paragraph("Fri", cellB), Paragraph("Content &amp; SEO", cell),
     Paragraph("Publish the 5 draft blog posts, verify meta/sitemap, submit to Google Search Console; refresh job board "
               "(add ~10 new sponsoring employers, deactivate expired).", cell)],
    [Paragraph("Sat–Sun", cellB), Paragraph("Acquisition push", cell),
     Paragraph("Email the waitlist with a launch invite; post in international-student communities & socials "
               "(LinkedIn/TikTok/Instagram); ask the 4 existing users for feedback. Target: 25 real sign-ups.", cell)],
], colWidths=[20*mm, 38*mm, 96*mm])
plan.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),BLUE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE, SKY]),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
    ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
]))
story.append(plan)
story.append(Spacer(1,10))

story.append(Paragraph("Priority matrix", h2))
prio = Table([
    [Paragraph("<b>Do first (high impact, low effort)</b>", cellW), Paragraph("<b>Schedule (high impact, higher effort)</b>", cellW)],
    [Paragraph("• Fix the 3 security warnings<br/>• Purge sample data<br/>• Publish draft blog posts<br/>• Email the waitlist", cell),
     Paragraph("• Analytics + conversion tracking<br/>• Onboarding flow polish<br/>• RLS/index optimisation<br/>• Acquisition campaign", cell)],
    [Paragraph("<b>Quick wins (lower impact, low effort)</b>", cellW), Paragraph("<b>Later (lower impact, higher effort)</b>", cellW)],
    [Paragraph("• Delete duplicate app<br/>• Commit code backup<br/>• Refresh job listings", cell),
     Paragraph("• Base44 → Supabase consolidation<br/>• Complete ICO registration<br/>• Mentor-matching automation", cell)],
], colWidths=[77*mm, 77*mm])
prio.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(0,0),GREEN),("BACKGROUND",(1,0),(1,0),BLUE),
    ("BACKGROUND",(0,2),(0,2),colors.HexColor("#0EA5E9")),("BACKGROUND",(1,2),(1,2),GREY),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
    ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
]))
story.append(prio)
story.append(Spacer(1,12))

# Closing box
close = Table([[Paragraph(
    "<font color='white'><b>Bottom line:</b> GradPilot AI has done the hard part — it is a complete, well-structured "
    "product with real content and a clear mission. The next chapter is not more features; it is "
    "<b>hardening, launching, and earning the first cohort of real users.</b> Close the security items, clean the data, "
    "turn on analytics, and spend the weekend driving sign-ups.</font>", bodyW)]],
    colWidths=[A4[0]-36*mm])
close.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),NAVY),
    ("LEFTPADDING",(0,0),(-1,-1),12),("RIGHTPADDING",(0,0),(-1,-1),12),
    ("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10),
]))
story.append(close)

doc.build(story)
print("PDF generated.")
