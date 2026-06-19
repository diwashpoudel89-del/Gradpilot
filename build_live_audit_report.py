#!/usr/bin/env python3
"""Generate the GradPilot AI live-site audit PDF (19 June 2026)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem, PageBreak,
)

NAVY  = colors.HexColor("#0B1F3A"); BLUE = colors.HexColor("#2563EB")
SKY   = colors.HexColor("#EAF1FE"); GREEN = colors.HexColor("#16A34A")
AMBER = colors.HexColor("#D97706"); RED = colors.HexColor("#DC2626")
GREY  = colors.HexColor("#475569"); LGREY = colors.HexColor("#F1F5F9")
BORDER = colors.HexColor("#CBD5E1"); WHITE = colors.white
styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", styles["Normal"]); return ParagraphStyle(name, parent=base, **kw)

body  = S("body", fontName="Helvetica", fontSize=9.5, leading=14, textColor=colors.HexColor("#1E293B"), spaceAfter=6)
bodyW = S("bodyW", parent=body, textColor=WHITE)
h1    = S("h1", fontName="Helvetica-Bold", fontSize=16, leading=20, textColor=NAVY, spaceBefore=6, spaceAfter=7)
h2    = S("h2", fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=BLUE, spaceBefore=9, spaceAfter=4)
small = S("small", parent=body, fontSize=8, textColor=GREY, leading=11)
cell  = S("cell", parent=body, fontSize=8.7, leading=12, spaceAfter=0)
cellB = S("cellB", parent=cell, fontName="Helvetica-Bold")
cellW = S("cellW", parent=cell, textColor=WHITE)
bullet = S("bullet", parent=body, leftIndent=2, spaceAfter=3)

def blist(items, st=bullet):
    return ListFlowable([ListItem(Paragraph(i, st), leftIndent=10, value="•") for i in items],
        bulletType="bullet", start="•", leftIndent=12, bulletColor=BLUE, bulletFontSize=8, spaceAfter=4)
def rule():
    return HRFlowable(width="100%", thickness=0.8, color=BORDER, spaceBefore=4, spaceAfter=8)
def chip(label, color):
    return Paragraph(f'<font color="white"><b>&nbsp;{label}&nbsp;</b></font>',
        S("sc", fontName="Helvetica-Bold", fontSize=8, leading=11, backColor=color))

story = []
def header_footer(canvas, doc):
    canvas.saveState(); canvas.setStrokeColor(BORDER); canvas.setLineWidth(0.5)
    canvas.line(18*mm, 14*mm, A4[0]-18*mm, 14*mm)
    canvas.setFont("Helvetica", 7.5); canvas.setFillColor(GREY)
    canvas.drawString(18*mm, 10*mm, "GradPilot AI — Live Site Audit")
    canvas.drawRightString(A4[0]-18*mm, 10*mm, "Confidential · 19 June 2026")
    canvas.drawCentredString(A4[0]/2, 10*mm, f"Page {doc.page}"); canvas.restoreState()

frame = Frame(18*mm, 16*mm, A4[0]-36*mm, A4[1]-30*mm, id="main")
doc = BaseDocTemplate("/home/user/Gradpilot/GradPilot_Live_Site_Audit_2026-06-19.pdf",
    pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=14*mm, bottomMargin=16*mm,
    title="GradPilot AI — Live Site Audit", author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=header_footer)])

# Banner
banner = Table([[Paragraph('<font color="white"><b>GradPilot AI</b></font>', S("t", fontSize=24, leading=28))],
    [Paragraph('<font color="#BBD2FF">Live Site Audit · gradpilotai.com</font>', S("t2", fontSize=12, leading=16))],
    [Paragraph('<font color="#E3ECFF">Vercel / Next.js production site — 19 June 2026</font>', S("t3", fontSize=9.5, leading=13))]],
    colWidths=[A4[0]-36*mm])
banner.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),
    ("LEFTPADDING",(0,0),(-1,-1),18),("RIGHTPADDING",(0,0),(-1,-1),18),
    ("TOPPADDING",(0,0),(0,0),14),("BOTTOMPADDING",(0,-1),(-1,-1),14),("TOPPADDING",(0,1),(-1,-1),0)]))
story += [banner, Spacer(1,10)]

# Headline
story.append(Paragraph("Headline finding", h1)); story.append(rule())
hl = Table([[Paragraph('<font color="white"><b>The live site is not the product the 16 June audit described.</b> '
    'gradpilotai.com is a newly built <b>Next.js marketing site on Vercel</b>, running in pre-launch / '
    'waitlist mode — no working app, no checkout, empty blog. The Base44 app (jobs, mentors, blog) is a '
    'separate system a visitor does not reach.</font>', bodyW)]], colWidths=[A4[0]-36*mm])
hl.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BLUE),
    ("LEFTPADDING",(0,0),(-1,-1),11),("RIGHTPADDING",(0,0),(-1,-1),11),
    ("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)]))
story += [hl, Spacer(1,10)]

# Architecture
story.append(Paragraph("Architecture & hosting (verified live)", h2))
arch = Table([
    [Paragraph("<b>Item</b>", cellB), Paragraph("<b>Finding</b>", cellB)],
    [Paragraph("Framework", cell), Paragraph("Next.js (App Router + Turbopack), RSC, prerendered/static", cell)],
    [Paragraph("Host", cell), Paragraph("Vercel (team 'Gradpilot AI'), edge-cached", cell)],
    [Paragraph("Serving region", cell), Paragraph("iad1 — US East (users + DB are UK/EU)", cell)],
    [Paragraph("Domain", cell), Paragraph("gradpilotai.com → 308 → www.gradpilotai.com", cell)],
    [Paragraph("app subdomain", cell), Paragraph("app.gradpilotai.com not reachable via this Vercel team", cell)],
    [Paragraph("Backend", cell), Paragraph("Supabase tqpsvhtnoqhrvkntzlvz (Postgres 17, eu-west-1, healthy)", cell)],
], colWidths=[34*mm, 120*mm])
arch.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
story += [arch, Spacer(1,4)]
story.append(Paragraph("Pages live: /, /about, /blog (empty), /waitlist, /login, /privacy, /terms + homepage "
    "anchors. No /signup — entry is waitlist + sign-in only. Landing page itself is strong and "
    "content-complete (7 features, pricing Free/Pro £9.99/Premium £19.99, 8-item FAQ, founder story).", small))

# Findings
story.append(Paragraph("Findings by severity", h1)); story.append(rule())
issues = Table([
    [Paragraph("<b>Area</b>", cellB), Paragraph("<b>Sev</b>", cellB), Paragraph("<b>Finding</b>", cellB)],
    [Paragraph("SEO", cell), chip("HIGH", RED), Paragraph("/robots.txt and /sitemap.xml both 404; og:url points to "
        "*.vercel.app; no canonical tag; no JSON-LD structured data.", cell)],
    [Paragraph("Analytics", cell), chip("HIGH", RED), Paragraph("No analytics at all (no GA4/PostHog/Vercel/Plausible). "
        "Waitlist traffic & conversion are unmeasurable.", cell)],
    [Paragraph("Security headers", cell), chip("MED", AMBER), Paragraph("Only HSTS set. Missing CSP, X-Frame-Options, "
        "X-Content-Type-Options, Referrer-Policy, Permissions-Policy. x-powered-by leaks Next.js.", cell)],
    [Paragraph("Content", cell), chip("MED", AMBER), Paragraph("/blog is empty (placeholder). Keyword strategy has no "
        "content to rank; the 10 posts live on Base44, not here.", cell)],
    [Paragraph("Launch-readiness", cell), chip("LOW", GREY), Paragraph("Pricing CTAs all → /waitlist (no Stripe "
        "checkout live); verify /login, legal pages, ICO/GDPR; US-East region vs EU DB.", cell)],
    [Paragraph("Supabase backend", cell), chip("GOOD", GREEN), Paragraph("2 security warnings (is_admin by design; enable "
        "leaked-password protection). Performance clean except 2 deliberate policies (usage_tracking fixed this session).", cell)],
], colWidths=[28*mm, 16*mm, 110*mm])
issues.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(1,0),(1,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [issues, Spacer(1,10)]

# Done this session
story.append(Paragraph("Done this session (19 June)", h2))
story.append(blist([
    "Audited the live Vercel site end-to-end (HTTP, headers, SEO, page inventory).",
    "Applied Supabase migration <b>0002</b> — resolved the 2 usage_tracking auth_rls_initplan warnings (verified).",
    "Produced drop-in fixes under <b>site-fixes/</b>: robots.ts, sitemap.ts, metadataBase/canonical, "
    "security-headers next.config, JSON-LD components, analytics guide.",
]))

# Remaining
story.append(Paragraph("Remaining work (owner action)", h2))
rem = Table([
    [Paragraph("<b>Quick wins (paste from site-fixes/, redeploy)</b>", cellW),
     Paragraph("<b>This week / before launch</b>", cellW)],
    [Paragraph("• Add robots.ts + sitemap.ts<br/>• Fix og:url/canonical to www domain<br/>"
        "• Install Vercel Analytics + waitlist event<br/>• Enable Supabase leaked-password protection", cell),
     Paragraph("• Add security-headers block (CSP report-only first)<br/>• Add JSON-LD (Org + FAQ)<br/>"
        "• Submit sitemap in Google Search Console<br/>• Port blog posts; wire Stripe; pick one stack", cell)],
], colWidths=[77*mm, 77*mm])
rem.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),GREEN),("BACKGROUND",(1,0),(1,0),BLUE),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
    ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story += [rem, Spacer(1,8)]
story.append(Paragraph("Limitations: Vercel MCP token is SAML-scoped (no build logs / project metadata); legal page "
    "bodies not deep-read; live Next.js source is not in this repo, so code fixes are provided as drop-in files.", small))

doc.build(story)
print("PDF generated.")
