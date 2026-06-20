#!/usr/bin/env python3
"""GradPilot AI — Total Build Plan & Feature Roadmap PDF (20 June 2026)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, HRFlowable, ListFlowable, ListItem, PageBreak)

NAVY=colors.HexColor("#0B1F3A"); BLUE=colors.HexColor("#2563EB"); SKY=colors.HexColor("#EAF1FE")
GREEN=colors.HexColor("#16A34A"); AMBER=colors.HexColor("#D97706"); RED=colors.HexColor("#DC2626")
PURPLE=colors.HexColor("#7C3AED"); TEAL=colors.HexColor("#0D9488")
GREY=colors.HexColor("#475569"); LGREY=colors.HexColor("#F1F5F9"); BORDER=colors.HexColor("#CBD5E1")
WHITE=colors.white
styles=getSampleStyleSheet()
def S(n,**k):
    p=k.pop("parent",styles["Normal"]); return ParagraphStyle(n,parent=p,**k)
body=S("body",fontName="Helvetica",fontSize=9.5,leading=14,textColor=colors.HexColor("#1E293B"),spaceAfter=6)
bodyW=S("bodyW",parent=body,textColor=WHITE)
h1=S("h1",fontName="Helvetica-Bold",fontSize=16,leading=20,textColor=NAVY,spaceBefore=6,spaceAfter=7)
h2=S("h2",fontName="Helvetica-Bold",fontSize=12,leading=15,textColor=BLUE,spaceBefore=9,spaceAfter=4)
cell=S("cell",parent=body,fontSize=8.6,leading=11.8,spaceAfter=0)
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

W=A4[0]-36*mm
story=[]
def hf(c,d):
    c.saveState(); c.setStrokeColor(BORDER); c.setLineWidth(0.5)
    c.line(18*mm,14*mm,A4[0]-18*mm,14*mm)
    c.setFont("Helvetica",7.5); c.setFillColor(GREY)
    c.drawString(18*mm,10*mm,"GradPilot AI — Total Build Plan")
    c.drawRightString(A4[0]-18*mm,10*mm,"Confidential · 20 June 2026")
    c.drawCentredString(A4[0]/2,10*mm,f"Page {d.page}")
    c.restoreState()
frame=Frame(18*mm,16*mm,W,A4[1]-30*mm,id="m")
doc=BaseDocTemplate("/home/user/Gradpilot/GradPilotAI_Build_Plan_2026-06-20.pdf",pagesize=A4,
    leftMargin=18*mm,rightMargin=18*mm,topMargin=14*mm,bottomMargin=16*mm,
    title="GradPilot AI — Total Build Plan & Feature Roadmap",author="GradPilot AI")
doc.addPageTemplates([PageTemplate(id="all",frames=[frame],onPage=hf)])

# Banner
banner=Table([[Paragraph('<font color="white"><b>GradPilot AI — Total Build Plan</b></font>',S("t",fontSize=22,leading=26))],
    [Paragraph('<font color="#BBD2FF">Product Vision, Feature Roadmap &amp; What We Build Next</font>',S("t2",fontSize=12,leading=16))],
    [Spacer(1,3)],
    [Paragraph('<font color="#E3ECFF">gradpilotai.com · Next.js on Vercel · Supabase · 20 June 2026</font>',S("t3",fontSize=9,leading=12))]],
    colWidths=[W])
banner.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),18),
    ("RIGHTPADDING",(0,0),(-1,-1),18),("TOPPADDING",(0,0),(0,0),15),("BOTTOMPADDING",(0,-1),(-1,-1),15),
    ("TOPPADDING",(0,1),(-1,-1),0)]))
story+=[banner,Spacer(1,9)]

# The big idea
story.append(Paragraph("The opportunity in one line",h1)); story.append(rule())
story.append(Paragraph("We have a polished marketing site and a rich content backend — but <b>the actual “AI” product is not built yet</b>. "
    "Today GradPilot looks like a jobs board with guides. The vision is an <b>AI co-pilot that walks an international graduate "
    "all the way from “I need a visa-sponsoring job” to “I signed an offer”</b>: CV analysis, smart job matching, application "
    "tracking, interview prep, and a 24/7 adviser. That product layer is where the value, the retention, and the subscription "
    "revenue live. This plan lays out how we build it.",body))

# Current state snapshot
story.append(Paragraph("What exists today vs. what's missing",h2))
snap=Table([
    [Paragraph("<b>Built &amp; live</b>",cellWB),Paragraph("<b>Not built yet (the product)</b>",cellWB)],
    [Paragraph("Marketing site (landing, about, pricing, FAQ)<br/>Jobs board + job detail (30 roles)<br/>Blog / guides (10 posts)<br/>Mentors directory · Employer insights<br/>Email/password auth + protected dashboard shell<br/>Waitlist capture · SEO (sitemap, robots, OG)<br/>Hardened, seeded Supabase backend",cell),
     Paragraph("<b>AI CV analysis &amp; scoring</b><br/><b>AI job matching</b> (CV ↔ roles)<br/><b>Application tracker</b> (kanban / status)<br/><b>AI interview prep</b> (36 Qs sit unused)<br/><b>AI career adviser</b> (chat)<br/><b>Stripe subscriptions</b> (UI only, no payments)<br/><b>User profile / onboarding</b> · saved jobs · alerts",cell)],
],colWidths=[W/2.0,W/2.0])
snap.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),GREEN),("BACKGROUND",(1,0),(1,0),RED),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),("TOPPADDING",(0,0),(-1,-1),6),
    ("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story+=[snap,Spacer(1,6)]
story.append(Paragraph("Translation: the “shop window” is done; the “engine” is the build ahead.",small))

story.append(PageBreak())

# Product pillars
story.append(Paragraph("1 · The five product pillars",h1)); story.append(rule())
story.append(Paragraph("Every feature ladders up to one of five pillars. This keeps the roadmap focused on the journey, not a pile of features.",body))
def pillar(num,title,desc,color):
    t=Table([[Paragraph(f'<font color="white"><b>{num}</b></font>',S("pn",fontName="Helvetica-Bold",fontSize=15,alignment=1,textColor=WHITE)),
        Paragraph(f"<b>{title}</b><br/>{desc}",cell)]],colWidths=[14*mm,W-14*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),color),("BACKGROUND",(1,0),(1,0),LGREY),
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("BOX",(0,0),(-1,-1),0.5,BORDER),
        ("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
        ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))
    return t
story+=[pillar("1","Get Ready","CV analysis &amp; scoring, profile/onboarding, skills gap insights — get the candidate application-ready.",BLUE),Spacer(1,4)]
story+=[pillar("2","Find the Right Job","AI job matching against the CV, visa-sponsor filtering, saved jobs, job alerts, employer insights.",TEAL),Spacer(1,4)]
story+=[pillar("3","Apply & Track","One place to track every application: status kanban, deadlines, notes, document versions.",PURPLE),Spacer(1,4)]
story+=[pillar("4","Ace the Interview","AI mock interviews, the 36 seeded interview questions, company-specific prep, feedback.",AMBER),Spacer(1,4)]
story+=[pillar("5","Guidance & Community","24/7 AI career/visa adviser, mentors marketplace, guides, peer community.",GREEN),Spacer(1,8)]

# Feature catalogue
story.append(Paragraph("2 · Full feature catalogue",h1)); story.append(rule())
def fcat(pillar,rows):
    data=[[Paragraph(f"<b>{pillar}</b>",cellWB),Paragraph("<b>Feature</b>",cellWB),Paragraph("<b>Effort</b>",cellWB),Paragraph("<b>Value</b>",cellWB)]]
    for r in rows: data.append([Paragraph(r[0],cell),Paragraph(r[1],cell),Paragraph(r[2],cell),r[3]])
    t=Table(data,colWidths=[24*mm,98*mm,16*mm,16*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),
        ("SPAN",(0,1),(0,len(rows))),("BACKGROUND",(0,1),(0,len(rows)),SKY),
        ("ROWBACKGROUNDS",(1,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
        ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("ALIGN",(3,0),(3,-1),"CENTER"),
        ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),4.5),
        ("BOTTOMPADDING",(0,0),(-1,-1),4.5)]))
    return t
H=chip("HIGH",GREEN); M=chip("MED",AMBER); L=chip("LOW",GREY)
story.append(fcat("Get Ready",[
    ["AI CV analysis & score","Upload CV → AI scores it, flags gaps, suggests fixes vs UK norms.","Med",H],
    ["CV builder / templates","Guided UK-style CV builder with export to PDF.","Med",M],
    ["Onboarding wizard","Capture degree, field, visa status, target roles → personalises everything.","Small",H],
    ["Skills-gap insights","Compare profile to target roles; recommend courses/certs.","Med",M],
]))
story.append(Spacer(1,5))
story.append(fcat("Find the Job",[
    ["AI job matching","Rank the 30+ jobs by fit to the user's CV & preferences.","Med",H],
    ["Visa-sponsor filter","Filter to roles that sponsor Skilled Worker / Graduate Route.","Small",H],
    ["Saved jobs & alerts","Save roles; email/push alerts on new matches.","Small",M],
    ["Auto-import jobs","Pull live sponsor-licence roles from external feeds/APIs.","Large",M],
]))
story.append(PageBreak())
story.append(fcat("Apply & Track",[
    ["Application tracker","Kanban: Saved → Applied → Interview → Offer; deadlines & notes.","Med",H],
    ["Document vault","Store CV/cover-letter versions per application.","Small",M],
    ["AI cover letters","Generate a tailored cover letter per job from the CV.","Med",H],
    ["Deadline reminders","Email/calendar reminders for closing dates & follow-ups.","Small",M],
]))
story.append(Spacer(1,5))
story.append(fcat("Ace Interview",[
    ["AI mock interview","Chat/voice mock using the 36 seeded questions + role context.","Med",H],
    ["Company-specific prep","Pull employer insights into tailored prep packs.","Small",M],
    ["Answer feedback","AI scores answers (STAR), suggests improvements.","Med",H],
]))
story.append(Spacer(1,5))
story.append(fcat("Guidance",[
    ["AI career/visa adviser","24/7 chat grounded in our guides (RAG) — the headline feature.","Med",H],
    ["Mentor booking","Book/pay mentors; calendar + video.","Large",M],
    ["Community / forum","Peer Q&A, cohort channels.","Large",L],
    ["Personalised guide feed","Surface relevant blog guides by profile stage.","Small",M],
]))
story.append(Spacer(1,6))
story.append(Paragraph("Effort: Small = ½–2 days · Med = 3–7 days · Large = 2+ weeks. Value = expected impact on activation, retention &amp; conversion.",small))

story.append(PageBreak())

# Phased roadmap
story.append(Paragraph("3 · Phased build roadmap",h1)); story.append(rule())
ph=Table([
    [Paragraph("<b>Phase</b>",cellWB),Paragraph("<b>Theme</b>",cellWB),Paragraph("<b>What we ship</b>",cellWB),Paragraph("<b>Why</b>",cellWB)],
    [Paragraph("0\nNow",cellB),Paragraph("Launch-ready",cell),Paragraph("Stripe checkout · leaked-password protection · auth-flow verify · analytics · go public.",cell),Paragraph("Turn the live shell into a sellable, measurable product.",cell)],
    [Paragraph("1\nMVP",cellB),Paragraph("The AI core",cell),Paragraph("Onboarding wizard · <b>AI CV analysis</b> · <b>AI job matching</b> · saved jobs · real dashboard.",cell),Paragraph("Deliver the “AI co-pilot” promise; first real reason to sign up & stay.",cell)],
    [Paragraph("2\nV1",cellB),Paragraph("Convert & retain",cell),Paragraph("<b>Application tracker</b> · AI cover letters · <b>AI adviser (RAG)</b> · job alerts.",cell),Paragraph("Daily-use habit loop + the features people will pay for.",cell)],
    [Paragraph("3\nV2",cellB),Paragraph("Win interviews",cell),Paragraph("AI mock interviews + feedback · company-specific prep · CV builder.",cell),Paragraph("Complete the journey to “offer”; strong word-of-mouth.",cell)],
    [Paragraph("4\nScale",cellB),Paragraph("Growth & moat",cell),Paragraph("Auto-import live sponsor jobs · mentor booking+pay · community · mobile/PWA.",cell),Paragraph("Defensibility, supply of jobs, and network effects.",cell)],
],colWidths=[16*mm,28*mm,66*mm,44*mm])
ph.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),BLUE),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,SKY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),6),
    ("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story+=[ph,Spacer(1,10)]

# My recommendation
story.append(Paragraph("4 · My recommendation — what to build first",h1)); story.append(rule())
story.append(Paragraph("If I were driving this, the order is deliberate: <b>get paid + measurable first, then ship the one feature that defines the brand.</b>",body))
story.append(blist([
    "<b>Finish Phase 0 this week</b> (Stripe + password protection + analytics + go public). Without payments and analytics we're flying blind and leaving money on the table. I can start these now.",
    "<b>Build AI CV analysis as the flagship MVP feature.</b> It's the most “wow”, it's self-contained, and it's the natural first step of every user's journey. It instantly makes GradPilot feel like AI, not a job board.",
    "<b>Pair it with AI job matching.</b> Once we've parsed the CV, matching it to our 30 roles is cheap and turns the jobs board into a personalised feed — huge perceived value for low effort.",
    "<b>Then the AI adviser (RAG over our guides).</b> We already have 10 guides + 26 employer insights — grounding a chatbot in them is fast and gives a defensible, on-brand 24/7 helper.",
    "<b>Application tracker for retention.</b> This is what brings people back daily and justifies a subscription.",
]))
story.append(Spacer(1,6))

# Tech foundations
story.append(Paragraph("Technical foundations these unlock (build once, reuse everywhere)",h2))
story.append(blist([
    "<b>AI layer:</b> Claude API (Anthropic) for CV analysis, matching, cover letters, adviser & interview feedback — one integration powers most features.",
    "<b>File storage:</b> Supabase Storage for CV/document uploads + a parsing pipeline (PDF/DOCX → text).",
    "<b>Vector search (RAG):</b> Supabase pgvector to ground the adviser in our guides & insights.",
    "<b>Billing:</b> Stripe Checkout + webhooks → gate premium features by plan.",
    "<b>Background jobs:</b> for job alerts, reminders, and auto-import (cron / queue).",
    "<b>Email:</b> transactional (Resend/Supabase) for alerts, reminders, onboarding.",
]))

story.append(PageBreak())

# What else / moonshots
story.append(Paragraph("5 · What else we can do (differentiators &amp; moonshots)",h1)); story.append(rule())
me=Table([
    [Paragraph("<b>Idea</b>",cellWB),Paragraph("<b>What it is</b>",cellWB),Paragraph("<b>Why it's interesting</b>",cellWB)],
    [Paragraph("Visa eligibility checker",cell),Paragraph("Interactive tool: answer a few questions → which UK visa routes fit you.",cell),Paragraph("High-intent SEO magnet; unique to our niche; great lead capture.",cell)],
    [Paragraph("Salary & sponsor explorer",cell),Paragraph("Data tool: salary ranges + which employers hold sponsor licences by sector.",cell),Paragraph("Builds on employer insights; sticky, shareable, ranks on Google.",cell)],
    [Paragraph("Browser extension",cell),Paragraph("“Does this employer sponsor?” badge on LinkedIn/Indeed job posts.",cell),Paragraph("Meets users where they job-hunt; viral distribution.",cell)],
    [Paragraph("WhatsApp / email AI adviser",cell),Paragraph("Same adviser, delivered via WhatsApp where this audience lives.",cell),Paragraph("Massive for international students; low-friction engagement.",cell)],
    [Paragraph("Employer / B2B side",cell),Paragraph("Let sponsoring employers post roles & reach vetted candidates.",cell),Paragraph("A second revenue line; closes the marketplace loop.",cell)],
    [Paragraph("University partnerships",cell),Paragraph("White-label careers tool for uni international offices.",cell),Paragraph("B2B2C distribution; credibility & volume.",cell)],
    [Paragraph("Success tracking / outcomes",cell),Paragraph("Track offers landed; publish anonymised success stats.",cell),Paragraph("Powerful social proof &amp; marketing flywheel.",cell)],
],colWidths=[34*mm,62*mm,58*mm])
me.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),PURPLE),("TEXTCOLOR",(0,0),(-1,0),WHITE),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,LGREY]),("BOX",(0,0),(-1,-1),0.5,BORDER),
    ("INNERGRID",(0,0),(-1,-1),0.4,BORDER),("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),5),
    ("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story+=[me,Spacer(1,10)]

# Monetisation
story.append(Paragraph("Monetisation paths",h2))
story.append(blist([
    "<b>Freemium subscription</b> (primary): free CV score + browsing; Pro unlocks full analysis, unlimited matching, AI adviser, cover letters, mock interviews. (Pricing UI already exists.)",
    "<b>Mentor marketplace take-rate:</b> commission on paid mentor bookings.",
    "<b>B2B employer postings</b> and <b>university partnerships</b> as later, higher-value lines.",
    "<b>Affiliate</b> on relevant services (visa/legal, courses, banking) where genuinely useful.",
]))
story.append(Spacer(1,8))

close=Table([[Paragraph("<font color='white'><b>My bottom line:</b> the foundation is done — now we build the engine. "
    "Ship <b>Phase 0 (launch-ready)</b> this week, then make <b>AI CV analysis + AI job matching</b> the flagship MVP, "
    "followed by the <b>AI adviser</b> and <b>application tracker</b>. That sequence turns GradPilot from a content site "
    "into a genuine AI co-pilot people pay for. Tell me which one to start and I'll begin building.</font>",bodyW)]],
    colWidths=[W])
close.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),12),
    ("RIGHTPADDING",(0,0),(-1,-1),12),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
story.append(close)

doc.build(story)
print("done")
