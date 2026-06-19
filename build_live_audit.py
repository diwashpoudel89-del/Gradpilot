#!/usr/bin/env python3
"""GradPilot AI — gradpilotai.com live-site audit PDF (19 June 2026)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, HRFlowable, ListFlowable, ListItem, PageBreak)

NAVY=colors.HexColor("#0B1F3A"); BLUE=colors.HexColor("#2563EB"); SKY=colors.HexColor("#EAF1FE")
GREEN=colors.HexColor("#16A34A"); AMBER=colors.HexColor("#D97706"); RED=colors.HexColor("#DC2626")
GREY=colors.HexColor("#475569"); LGREY=colors.HexColor("#F1F5F9"); BORDER=colors.HexColor("#CBD5E1")
WHITE=colors.white
styles=getSampleStyleSheet()
def S(n,**k):
    p=k.pop("parent",styles["Normal"]); return ParagraphStyle(n,parent=p,**k)
body=S("body",fontName="Helvetica",fontSize=9.5,leading=14,textColor=colors.HexColor("#1E293B"),spaceAfter=6)
bodyW=S("bodyW",parent=body,textColor=WHITE)
h1=S("h1",fontName="Helvetica-Bold",fontSize=16,leading=20,textColor=NAVY,spaceBefore=6,spaceAfter=7)
h2=S("h2",fontName="Helvetica-Bold",fontSize=12,leading=15,textColor=BLUE,spaceBefore=9,spaceAfter=4)
cell=S("cell",parent=body,fontSize=8.7,leading=12,spaceAfter=0)
cellB=S("cellB",parent=cell,fontName="Helvetica-Bold")
cellW=S("cellW",parent=cell,textColor=WHITE)
small=S("small",parent=body,fontSize=8,textColor=GREY,leading=11)
kpilbl=S("kpilbl",fontName="Helvetica",fontSize=7.4,leading=9.5,textColor=GREY,alignment=1)
bullet=S("bullet",parent=body,leftIndent=2,spaceAfter=3)

def blist(items,st=bullet):
    return ListFlowable([ListItem(Paragraph(i,st),leftIndent=10,value="•") for i in items],
        bulletType="bullet",start="•",leftIndent=12,bulletColor=BLUE,bulletFontSize=8,spaceAfter=4)
def rule(): return HRFlowable(width="100%",thickness=0.8,color=BORDER,spaceBefore=4,spaceAfter=8)
def chip(label,color):
    return Paragraph(f'<font color="white"><b>&nbsp;{label}&nbsp;</b></font>',
        S("sc",fontName="Helvetica-Bold",fontSize=8,leading=11,backColor=color,alignment=1))

story=[]
def hf(c,d):
    c.saveState(); c.setStrokeColor(BORDER); c.setLineWidth(0.5)
    c.line(18*mm,14*mm,A4[0]-18*mm,14*mm)
    c.setFont("Helvetica",7.5); c.setFillColor(GREY)
    c.drawString(18*mm,10*mm,"gradpilotai.com — Live Site Audit")
    c.drawRightString(A4[0]-18*mm,10*mm,"Confidential · 19 June 2026")
    c.drawCentredString(A4[0]/2,10*mm,f"Page {d.page}")
    c.restoreState()
frame=Frame(18*mm,16*mm,A4[0]-36*mm,A4[1]-30*mm,id="m")
doc=BaseDocTemplate("/home/user/Gradpilot/GradPilotAI_Live_Site_Audit_2026-06-19.pdf",pagesize=A4,
    leftMargin=18*mm,rightMargin=18*mm,topMargin=14*mm,bottomMargin=16*mm,
    title="gradpilotai.com — Live Site Audit",author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all",frames=[frame],onPage=hf)])

# Banner
banner=Table([[Paragraph('<font color="white"><b>gradpilotai.com</b></font>',S("t",fontSize=24,leading=28))],
    [Paragraph('<font color="#BBD2FF">Live Website Status &amp; Audit Report</font>',S("t2",fontSize=12,leading=16))],
    [Spacer(1,3)],
    [Paragraph('<font color="#E3ECFF">Next.js on Vercel · Supabase backend · GradPilot AI Ltd</font>',S("t3",fontSize=9,leading=12))]],
    colWidths=[A4[0]-36*mm])
banner.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),18),
    ("RIGHTPADDING",(0,0),(-1,-1),18),("TOPPADDING",(0,0),(0,0),15),("BOTTOMPADDING",(0,-1),(-1,-1),15),
    ("TOPPADDING",(0,1),(-1,-1),0)]))
story+=[banner,Spacer(1,8)]

# Status banner
verdict=Table([[chip("OVERALL",NAVY),
    Paragraph('<b>Live &amp; populated — but private (deployment-protected) and the production build is not reproducible from git.</b>',cell)]],
    colWidths=[26*mm,128*mm])
verdict.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),NAVY),("BACKGROUND",(1,0),(1,0),SKY),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
    ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),("BOX",(0,0),(-1,-1),0.5,BORDER)]))
story+=[verdict,Spacer(1,10)]

# At-a-glance status table
story.append(Paragraph("Status at a glance",h2))
sg=Table([
    [Paragraph("<b>Dimension</b>",cellB),Paragraph("<b>State</b>",cellB),Paragraph("<b>Detail</b>",cellB)],
    [Paragraph("Production site",cell),chip("LIVE",GREEN),Paragraph("gradpilotai.com / www served by Vercel; last production build is READY and renders the full Next.js app.",cell)],
    [Paragraph("Public access",cell),chip("PROTECTED",AMBER),Paragraph("Vercel Deployment Protection is ON (project <i>live: false</i>) — visitors are redirected to a share-token URL. Not publicly reachable (owner's choice, pre-launch).",cell)],
    [Paragraph("Latest deployment",cell),chip("ERROR",RED),Paragraph("Newest git push failed to build (preview). Production is unaffected — still on the previous good build.",cell)],
    [Paragraph("Content / data",cell),chip("POPULATED",GREEN),Paragraph("Backend now seeded: 30 jobs, 10 blog posts, 10 mentors, 26 employer insights, 36 interview questions, testimonials, FAQs, pricing.",cell)],
    [Paragraph("Backend security",cell),chip("GOOD",GREEN),Paragraph("Hardened earlier; 2 advisor warnings remain (1 by-design, 1 a one-click auth setting).",cell)],
    [Paragraph("Source control",cell),chip("AT RISK",RED),Paragraph("The live app's source is NOT in the GitHub repo; production was deployed ad-hoc. No reproducible build / backup.",cell)],
    [Paragraph("Real usage",cell),chip("PRE-LAUNCH",AMBER),Paragraph("2 registered users, 1 waitlist signup, 0 applications / CVs / subscriptions.",cell)],
],colWidths=[32*mm,24*mm,98*mm])
sg.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(1,0),(1,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story.append(sg)
story.append(Spacer(1,6))
story.append(Paragraph("Stack: Next.js 16 (Node 24) on Vercel · Supabase Postgres + Auth · Stripe billing · domains gradpilotai.com &amp; www.gradpilotai.com.",small))

story.append(PageBreak())

# What's on the site now
story.append(Paragraph("1 · What's on the site now",h1)); story.append(rule())
story.append(Paragraph("Since the last report the Supabase backend that powers the site has gone from near-empty to fully populated, so the jobs board, blog, mentors and employer pages now have real content behind them.",body))

def kpi_cell(num,lbl,nc=BLUE):
    t=Table([[Paragraph(num,S("k",fontName="Helvetica-Bold",fontSize=17,leading=19,textColor=nc,alignment=1))],
        [Paragraph(lbl,kpilbl)]])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),SKY),("BOX",(0,0),(-1,-1),0.5,BORDER),
        ("TOPPADDING",(0,0),(0,0),7),("BOTTOMPADDING",(0,1),(-1,1),7),("TOPPADDING",(0,1),(-1,1),0),
        ("LEFTPADDING",(0,0),(-1,-1),2),("RIGHTPADDING",(0,0),(-1,-1),2)]))
    return t
row1=Table([[kpi_cell("30","Jobs",GREEN),kpi_cell("36","Interview Qs",BLUE),kpi_cell("26","Employer insights",BLUE),
    kpi_cell("10","Blog posts",GREEN),kpi_cell("10","Mentors",BLUE)]],colWidths=[(A4[0]-36*mm)/5.0]*5)
row1.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),2),("RIGHTPADDING",(0,0),(-1,-1),2)]))
row2=Table([[kpi_cell("8","Testimonials",BLUE),kpi_cell("8","FAQs",BLUE),kpi_cell("13","Site content",BLUE),
    kpi_cell("3","Pricing plans",BLUE),kpi_cell("13","Other CMS rows",BLUE)]],colWidths=[(A4[0]-36*mm)/5.0]*5)
row2.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),2),("RIGHTPADDING",(0,0),(-1,-1),2)]))
story+=[row1,Spacer(1,5),row2,Spacer(1,10)]

story.append(Paragraph("Real usage (the honest picture)",h2))
usage=Table([
    [Paragraph("<b>Metric</b>",cellB),Paragraph("<b>Count</b>",cellB),Paragraph("<b>Metric</b>",cellB),Paragraph("<b>Count</b>",cellB)],
    [Paragraph("Registered users (live site)",cell),Paragraph("2",cell),Paragraph("Job applications tracked",cell),Paragraph("0",cell)],
    [Paragraph("Waitlist signups",cell),Paragraph("1",cell),Paragraph("CVs analysed",cell),Paragraph("0",cell)],
    [Paragraph("Paying subscribers",cell),Paragraph("0",cell),Paragraph("AI conversations",cell),Paragraph("0",cell)],
],colWidths=[50*mm,27*mm,50*mm,27*mm])
usage.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),BLUE),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("LEFTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story.append(usage)
story.append(Spacer(1,6))
story.append(Paragraph("Note: the live site has its own <b>2 users</b> in Supabase Auth — separate from the 5 legacy users in the older Base44 prototype, which were not migrated. Engagement is effectively zero, consistent with a pre-launch, access-protected site.",small))

story.append(PageBreak())

# Issues & risks
story.append(Paragraph("2 · Issues &amp; risks",h1)); story.append(rule())
issues=Table([
    [Paragraph("<b>#</b>",cellB),Paragraph("<b>Issue</b>",cellB),Paragraph("<b>Severity</b>",cellB),Paragraph("<b>What to do</b>",cellB)],
    [Paragraph("1",cell),Paragraph("<b>Live source not in git.</b> Production was deployed directly to Vercel by an ad-hoc session; the GitHub repo has no app code, so the running site cannot be rebuilt, reviewed, or safely changed.",cell),chip("CRITICAL",RED),Paragraph("Get the Next.js source into the repo (push local copy or download from Vercel). Single biggest priority.",cell)],
    [Paragraph("2",cell),Paragraph("<b>Git builds fail.</b> The repo is connected to Vercel, so every push triggers a build that errors (“no app/pages directory”). Currently only preview builds fail; production is safe — but the wiring is broken.",cell),chip("HIGH",RED),Paragraph("Once source is in git, builds go green. Until then, expect red preview deploys.",cell)],
    [Paragraph("3",cell),Paragraph("<b>Site is private.</b> Deployment Protection blocks public access to gradpilotai.com (owner's deliberate pre-launch choice).",cell),chip("BY DESIGN",GREY),Paragraph("Turn off Deployment Protection in Vercel when ready to launch.",cell)],
    [Paragraph("4",cell),Paragraph("<b>Leaked-password protection disabled</b> in Supabase Auth (HaveIBeenPwned check off).",cell),chip("MED",AMBER),Paragraph("Enable in Supabase Auth settings — one click.",cell)],
    [Paragraph("5",cell),Paragraph("<code>is_admin()</code> executable by authenticated users.",cell),chip("BY DESIGN",GREY),Paragraph("Required by RLS policies; safe. No action.",cell)],
    [Paragraph("6",cell),Paragraph("<b>Two parallel stacks.</b> Legacy Base44 prototype still holds the original 5 users; live site uses Supabase. Risk of confusion / divergence.",cell),chip("MED",AMBER),Paragraph("Decide Base44 is retired; optionally migrate the legacy user accounts.",cell)],
],colWidths=[8*mm,82*mm,22*mm,42*mm])
issues.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(2,0),(2,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story.append(issues)
story.append(Spacer(1,8))

story.append(Paragraph("What changed since the 16 June report",h2))
story.append(blist([
    "<b>Backend hardened &amp; applied:</b> security advisors 6 → 2 (remaining are by-design / a one-click setting); performance lints 169 → ~16.",
    "<b>Content seeded into Supabase:</b> 145 rows across 10 tables, so the site's jobs/blog/mentors/employer pages are no longer empty.",
    "<b>Confirmed the real architecture:</b> gradpilotai.com = Next.js on Vercel backed by Supabase; Base44 is the older prototype.",
    "<b>Surfaced the source-control gap:</b> the running site has no source in git — now the top priority to fix.",
]))

# Recommended next steps
story.append(Paragraph("3 · Recommended next steps",h2))
nxt=Table([
    [Paragraph("<b>Priority</b>",cellW),Paragraph("<b>Action</b>",cellW)],
    [Paragraph("1 — Now",cellB),Paragraph("Get the Next.js source into the GitHub repo so the site is reproducible, reviewable and safely editable. Nothing else can progress reliably until this is done.",cell)],
    [Paragraph("2 — Now",cellB),Paragraph("Confirm Supabase env vars (URL + keys) are set in Vercel so the live app reads the now-populated database.",cell)],
    [Paragraph("3 — This week",cellB),Paragraph("Enable leaked-password protection; verify the sign-up → onboarding flow against real Supabase Auth; confirm Stripe checkout works.",cell)],
    [Paragraph("4 — Launch",cellB),Paragraph("Turn off Deployment Protection, add analytics, then drive the first cohort of real users.",cell)],
    [Paragraph("5 — Cleanup",cellB),Paragraph("Retire/decide on the legacy Base44 app; optionally migrate the 5 legacy user accounts into Supabase Auth.",cell)],
],colWidths=[26*mm,128*mm])
nxt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),BLUE),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,SKY]),
    ("BOX",(0,0),(-1,-1),0.5,BORDER),("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),6),
    ("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story+=[nxt,Spacer(1,10)]

close=Table([[Paragraph("<font color='white'><b>Bottom line:</b> gradpilotai.com is live, on the right stack, and now has real content behind it. Two things stand between it and a confident launch: <b>(1) get the source into git</b> so the site is reproducible and changeable, and <b>(2) flip off Deployment Protection</b> when you're ready to be public. The backend is in good shape.</font>",bodyW)]],
    colWidths=[A4[0]-36*mm])
close.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
    ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
story.append(close)

doc.build(story)
print("done")
