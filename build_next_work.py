#!/usr/bin/env python3
"""GradPilot AI — Next Work / Roadmap report PDF (19 June 2026)."""
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
cellWB=S("cellWB",parent=cellW,fontName="Helvetica-Bold")
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
    c.drawString(18*mm,10*mm,"gradpilotai.com — Next Work & Roadmap")
    c.drawRightString(A4[0]-18*mm,10*mm,"Confidential · 19 June 2026")
    c.drawCentredString(A4[0]/2,10*mm,f"Page {d.page}")
    c.restoreState()
frame=Frame(18*mm,16*mm,A4[0]-36*mm,A4[1]-30*mm,id="m")
doc=BaseDocTemplate("/home/user/Gradpilot/GradPilotAI_Next_Work_2026-06-19.pdf",pagesize=A4,
    leftMargin=18*mm,rightMargin=18*mm,topMargin=14*mm,bottomMargin=16*mm,
    title="gradpilotai.com — Next Work & Roadmap",author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all",frames=[frame],onPage=hf)])

# Banner
banner=Table([[Paragraph('<font color="white"><b>What\'s Next for GradPilot AI</b></font>',S("t",fontSize=22,leading=26))],
    [Paragraph('<font color="#BBD2FF">Next Work, Priorities &amp; Launch Roadmap</font>',S("t2",fontSize=12,leading=16))],
    [Spacer(1,3)],
    [Paragraph('<font color="#E3ECFF">gradpilotai.com · Next.js on Vercel · Supabase backend · 19 June 2026</font>',S("t3",fontSize=9,leading=12))]],
    colWidths=[A4[0]-36*mm])
banner.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),18),
    ("RIGHTPADDING",(0,0),(-1,-1),18),("TOPPADDING",(0,0),(0,0),15),("BOTTOMPADDING",(0,-1),(-1,-1),15),
    ("TOPPADDING",(0,1),(-1,-1),0)]))
story+=[banner,Spacer(1,8)]

# Where we are now
done=Table([[chip("DONE",GREEN),
    Paragraph('<b>Site is rebuilt, live in production, and verified error-free.</b> The jobs board, blog, mentors, employer insights and pricing pages all render real Supabase data. Backend is security-hardened and seeded (145 rows). What follows is everything still open.',cell)]],
    colWidths=[22*mm,132*mm])
done.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),GREEN),("BACKGROUND",(1,0),(1,0),SKY),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
    ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),("BOX",(0,0),(-1,-1),0.5,BORDER)]))
story+=[done,Spacer(1,10)]

# Two decisions
story.append(Paragraph("Two decisions only you can make",h1)); story.append(rule())
story.append(Paragraph("These are blocking choices — I need your call before acting, because both are one-way doors or affect another active workstream.",body))
dec=Table([
    [Paragraph("<b>#</b>",cellWB),Paragraph("<b>Decision</b>",cellWB),Paragraph("<b>Why it matters</b>",cellWB),Paragraph("<b>My recommendation</b>",cellWB)],
    [Paragraph("A",cell),Paragraph("<b>Turn OFF Vercel Deployment Protection?</b>",cell),Paragraph("Right now the site is private — visitors are redirected to a share-token URL. Nobody can reach gradpilotai.com without the link.",cell),Paragraph("Keep ON until launch checklist (Stripe, analytics, auth flow) is green, then flip OFF.",cell)],
    [Paragraph("B",cell),Paragraph("<b>Delete the conflicting branch</b> <font name='Courier'>claude/adoring-cori-hupj9v</font>?",cell),Paragraph("A separate session also rebuilt the site (under web/, Tailwind v4) and is erroring. It risks colliding with our production branch.",cell),Paragraph("Delete it — our rebuild on main is the live one. Confirm and I'll remove it.",cell)],
],colWidths=[8*mm,46*mm,52*mm,48*mm])
dec.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story+=[dec,Spacer(1,10)]

# Prioritised backlog
story.append(Paragraph("Prioritised work backlog",h1)); story.append(rule())
bk=Table([
    [Paragraph("<b>#</b>",cellWB),Paragraph("<b>Task</b>",cellWB),Paragraph("<b>Effort</b>",cellWB),Paragraph("<b>Priority</b>",cellWB),Paragraph("<b>Owner</b>",cellWB)],
    [Paragraph("1",cell),Paragraph("<b>Stripe checkout integration.</b> Pricing page has UI but no live payment flow — wire Stripe Checkout + webhook to the subscription table.",cell),Paragraph("Medium",cell),chip("HIGH",RED),Paragraph("Me",cell)],
    [Paragraph("2",cell),Paragraph("<b>Enable leaked-password protection</b> in Supabase Auth (HaveIBeenPwned check).",cell),Paragraph("Tiny",cell),chip("HIGH",RED),Paragraph("Me",cell)],
    [Paragraph("3",cell),Paragraph("<b>Verify sign-up → onboarding → dashboard flow</b> end-to-end against real Supabase Auth.",cell),Paragraph("Small",cell),chip("HIGH",RED),Paragraph("Me",cell)],
    [Paragraph("4",cell),Paragraph("<b>Add analytics / conversion tracking</b> (GA4 or PostHog) so we can measure the first cohort.",cell),Paragraph("Small",cell),chip("MED",AMBER),Paragraph("Me",cell)],
    [Paragraph("5",cell),Paragraph("<b>Replace 3 “TBC” team_members rows</b> (Head of Product, Lead Engineer, COO) with real people or remove them.",cell),Paragraph("Tiny",cell),chip("MED",AMBER),Paragraph("You + Me",cell)],
    [Paragraph("6",cell),Paragraph("<b>Migrate 5 legacy Base44 user accounts</b> (+ their saved jobs/CVs) into Supabase Auth, if you want to keep them.",cell),Paragraph("Medium",cell),chip("MED",AMBER),Paragraph("Me",cell)],
    [Paragraph("7",cell),Paragraph("<b>Retire / archive Base44 entirely.</b> Confirmed unrelated to the live site — purge sample data &amp; the duplicate empty app (needs Base44 dashboard).",cell),Paragraph("Small",cell),chip("LOW",GREY),Paragraph("You",cell)],
    [Paragraph("8",cell),Paragraph("<b>Complete ICO registration.</b> Company info still shows status PENDING (data-protection compliance).",cell),Paragraph("Admin",cell),chip("LOW",GREY),Paragraph("You",cell)],
],colWidths=[8*mm,98*mm,16*mm,20*mm,16*mm])
bk.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),BLUE),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(3,0),(3,-1),"CENTER"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story+=[bk,Spacer(1,6)]
story.append(Paragraph("Effort key: Tiny = under an hour · Small = half a day · Medium = 1–2 days. “Owner: You” items need a dashboard/account I can't reach (Base44, ICO, real team data).",small))

story.append(PageBreak())

# Sequenced plan
story.append(Paragraph("Suggested sequence",h1)); story.append(rule())
seq=Table([
    [Paragraph("<b>Phase</b>",cellWB),Paragraph("<b>Goal</b>",cellWB),Paragraph("<b>Includes</b>",cellWB)],
    [Paragraph("This week\n(pre-launch)",cellB),Paragraph("Make the site launch-ready",cell),Paragraph("Stripe checkout (1) · leaked-password protection (2) · verify auth flow end-to-end (3) · analytics (4).",cell)],
    [Paragraph("Launch",cellB),Paragraph("Go public",cell),Paragraph("Decision A: turn off Deployment Protection · final smoke test on gradpilotai.com · announce.",cell)],
    [Paragraph("Cleanup",cellB),Paragraph("Tidy the estate",cell),Paragraph("Decision B: delete conflicting branch · real team data (5) · migrate/retire Base44 (6, 7) · ICO (8).",cell)],
    [Paragraph("Growth",cellB),Paragraph("Drive real users",cell),Paragraph("Content cadence on the blog · SEO from sitemap · first marketing push · monitor analytics & conversion.",cell)],
],colWidths=[28*mm,40*mm,86*mm])
seq.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,SKY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),6),
    ("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story+=[seq,Spacer(1,12)]

# What I can start now
story.append(Paragraph("What I can start immediately (no approval needed)",h2))
story.append(blist([
    "<b>Enable leaked-password protection</b> — flip the Supabase Auth setting and confirm.",
    "<b>Build the Stripe checkout</b> — add the checkout route, webhook handler, and wire it to the subscription table (test keys first).",
    "<b>Add analytics</b> — drop in GA4 or PostHog with an env-keyed tracking ID.",
    "<b>Verify the auth flow</b> — walk sign-up → email confirm → dashboard and fix anything that breaks.",
]))
story.append(Paragraph("Items needing you: Decisions A &amp; B above, real team-member details, ICO registration, and any Base44 dashboard cleanup.",small))
story.append(Spacer(1,10))

close=Table([[Paragraph("<font color='white'><b>Bottom line:</b> the hard part — a working, secure, content-rich live site — is done. The remaining work splits into <b>two decisions for you</b> (go public? delete the stray branch?) and <b>a short pre-launch checklist I can run now</b> (Stripe, password protection, auth verification, analytics). Tell me to start, and I'll take tasks 1–4.</font>",bodyW)]],
    colWidths=[A4[0]-36*mm])
close.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
    ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
story.append(close)

doc.build(story)
print("done")
