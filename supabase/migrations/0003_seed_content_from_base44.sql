-- Seed content copied from Base44 app into Supabase. Generated 2026-06-16. Idempotency: intended for empty tables only.

BEGIN;

-- ===== Job -> jobs =====
INSERT INTO public.jobs (title, company, location, salary, salary_min, salary_max, description, requirements, industry, sponsors_graduate_route, sponsors_skilled_worker, visa_info, application_url, deadline, posted_at, is_active, is_featured, job_type) VALUES
  ('Software Development Engineer', 'Spotify', 'London', '£55,000 - £70,000', 55000, 70000, 'Join Spotify as a Software Development Engineer. Build products that help millions of people discover and enjoy music.', 'CS degree or equivalent, backend or frontend engineering skills, passionate about music and technology', 'Technology', true, true, 'Spotify sponsors Skilled Worker visas for international talent.', 'https://www.lifeatspotify.com/jobs', '2026-10-31', NULL, true, false, 'full_time'),
  ('Machine Learning Graduate', 'Wayve', 'London', '£55,000 - £75,000', 55000, 75000, 'Wayve ML Graduate. Work on autonomous vehicle AI at one of the UK''s most exciting deep tech startups. Based in London.', 'ML or CS degree, Python, experience with PyTorch or TensorFlow, strong maths background', 'Technology', true, true, 'Wayve sponsors Skilled Worker visas for international engineering talent.', 'https://wayve.ai/careers', '2026-11-30', NULL, true, false, 'full_time'),
  ('Graduate iOS Developer', 'Wise', 'London', '£50,000 - £65,000', 50000, 65000, 'Wise Graduate iOS Developer. Help build the app that millions of international people use to send money home.', 'CS degree, Swift or Objective-C experience, passion for mobile development', 'Technology', true, true, 'Wise actively sponsors international graduates — particularly values international perspective given their global mission.', 'https://www.wise.jobs', '2026-10-15', NULL, true, false, 'full_time'),
  ('Data Science Graduate', 'Palantir', 'London', '£60,000 - £80,000', 60000, 80000, 'Palantir Forward Deployed Engineer or Data Science role. Work on solving complex problems for government and enterprise clients.', 'STEM degree, strong analytical skills, programming in Python or Java, problem solving', 'Technology', true, true, 'Palantir is a licensed Skilled Worker visa sponsor.', 'https://www.palantir.com/careers', '2026-11-01', NULL, true, false, 'full_time'),
  ('Technology Analyst', 'Goldman Sachs', 'London', '£60,000 - £75,000', 60000, 75000, 'Goldman Sachs Technology Analyst Programme. Build the systems that power global financial markets.', 'CS or STEM degree, programming skills, interest in financial technology, analytical mindset', 'Technology', true, true, 'Goldman Sachs is a licensed sponsor for Skilled Worker visa.', 'https://www.goldmansachs.com/careers', '2026-11-15', NULL, true, false, 'graduate_scheme'),
  ('Graduate Cloud Engineer', 'Salesforce', 'London', '£50,000 - £65,000', 50000, 65000, 'Salesforce Graduate Cloud Engineer. Build and deploy enterprise cloud solutions for some of the world''s largest companies.', 'CS or Engineering degree, interest in cloud technologies, strong communication skills', 'Technology', true, true, 'Salesforce sponsors Graduate Route and Skilled Worker visa holders.', 'https://www.salesforce.com/careers', '2026-10-01', NULL, true, false, 'graduate_scheme'),
  ('Graduate Software Engineer', 'Microsoft', 'London', '£55,000 - £70,000', 55000, 70000, 'Join Microsoft as a Graduate Software Engineer. Work on cutting-edge technology products used by billions of people worldwide. Suitable for international graduates on Graduate Route visa.', 'Computer Science or related degree, strong programming skills in any language, problem-solving ability, UK Graduate Route or Skilled Worker visa eligible', 'Technology', true, true, 'Microsoft is a licensed visa sponsor. Supports Graduate Route and Skilled Worker visa holders.', 'https://careers.microsoft.com', '2026-10-01', NULL, true, false, 'graduate_scheme'),
  ('Graduate Data Engineer', 'Apple', 'London', '£60,000 - £75,000', 60000, 75000, 'Apple Graduate Data Engineer programme. Work with world-class data infrastructure powering Apple services globally.', 'Engineering or Computer Science degree, experience with Python or SQL, analytical mindset', 'Technology', true, true, 'Apple sponsors Skilled Worker visas for eligible Graduate Route holders.', 'https://jobs.apple.com', '2026-10-15', NULL, true, false, 'graduate_scheme'),
  ('Graduate Product Manager', 'Revolut', 'London', '£50,000 - £65,000', 50000, 65000, 'Revolut Graduate PM Programme. Drive product strategy for one of Europe''s fastest growing fintech companies.', 'Any degree, analytical skills, passion for fintech products, strong communication', 'Technology', true, true, 'Revolut sponsors international graduates via Skilled Worker visa.', 'https://www.revolut.com/careers', '2026-09-30', NULL, true, false, 'graduate_scheme'),
  ('Technology Graduate Scheme', 'Barclays', 'London', '£45,000 - £55,000', 45000, 55000, 'Barclays Technology Graduate Scheme. Build the financial technology infrastructure of tomorrow. Rotational programme across engineering, data, and product.', 'STEM degree preferred, programming knowledge, interest in fintech', 'Technology', true, true, 'Barclays is a licensed sponsor. Actively recruits international graduates.', 'https://home.barclays/careers', '2026-09-15', NULL, true, true, 'graduate_scheme'),
  ('Data Scientist Graduate', 'HSBC', 'London', '£45,000', 45000, 55000, 'Join HSBC''s data science team and work on cutting-edge machine learning models to detect financial fraud, improve customer segmentation, and drive business insights across our global operations.', 'MSc/BSc in Data Science, Statistics, or Computer Science. Strong Python and SQL skills. Experience with machine learning frameworks.', 'Finance', true, true, 'HSBC is a licensed UK visa sponsor and actively recruits Graduate Route visa holders.', 'https://hsbc.com/careers', '2026-10-20', '2026-03-25T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Product Manager Graduate', 'Monzo', 'London', '£50,000', 50000, 60000, 'Monzo is looking for ambitious graduates to join our Product team. You''ll work on features used by millions of customers, running experiments, analysing data, and shipping impactful product changes.', 'Any degree. Strong analytical and communication skills. Passion for fintech and customer-centred design.', 'Technology', true, true, 'Monzo sponsors Graduate Route and Skilled Worker visas for exceptional candidates.', 'https://monzo.com/careers', '2026-09-30', '2026-03-22T10:00:00Z', true, NULL, 'full_time'),
  ('Investment Banking Analyst', 'JPMorgan Chase', 'London', '£60,000', 60000, 75000, 'Join our Summer Analyst to Full-Time programme. Work on live M&A deals, IPOs, and capital markets transactions alongside experienced bankers.', '2:1 or above in any degree. Strong financial modelling skills. Excellent attention to detail.', 'Finance', true, true, 'JPMorgan is a licensed sponsor under the Skilled Worker visa route and welcomes Graduate Route applicants.', 'https://jpmorgan.com/careers', '2026-09-30', '2026-03-20T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('UX Designer Graduate', 'Dyson', 'Malmesbury, Wiltshire', '£32,000', 32000, 38000, 'Join Dyson''s world-class design team and work on products that redefine categories. You''ll be part of an interdisciplinary team shaping the future of technology-led design.', 'BA/MA in UX Design, Product Design, or Interaction Design. Strong portfolio required.', 'Technology', true, true, 'Dyson sponsors international graduates and is a licensed UK visa sponsor.', 'https://dyson.com/careers', '2026-10-31', '2026-03-18T10:00:00Z', true, NULL, 'full_time'),
  ('Solicitor Trainee', 'Clifford Chance', 'London', '£52,000', 52000, 55000, 'Train as a solicitor at one of the world''s leading international law firms. You''ll complete four six-month seats across our practice areas including corporate, finance, and disputes.', 'Law degree or GDL conversion. Strong academics and commercial awareness.', 'Legal', true, true, 'Clifford Chance sponsors international trainees and welcomes Graduate Route applicants.', 'https://cliffordchance.com/careers', '2026-10-15', '2026-03-15T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Civil Service Fast Stream', 'UK Government', 'London / National', '£30,000', 30000, 35000, 'The Civil Service Fast Stream is one of the UK''s most prestigious graduate programmes. You''ll tackle the most complex policy challenges facing the nation across various government departments.', '2:2 degree or above in any subject. Must have right to work in UK permanently (note: does NOT sponsor visas).', 'Public Sector', false, false, 'This role requires permanent right to work in the UK. Graduate Route visa holders are not eligible. Applies to UK/Irish nationals and those with indefinite leave to remain.', 'https://faststream.gov.uk', '2026-11-30', '2026-03-10T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Pharmaceutical Graduate Scientist', 'AstraZeneca', 'Cambridge', '£38,000', 38000, 44000, 'Join AstraZeneca''s graduate science programme and contribute to life-saving medicines. You''ll work in our R&D labs on early-stage drug discovery and clinical research.', 'BSc/MSc/PhD in Chemistry, Biochemistry, or Pharmaceutical Sciences.', 'Pharmaceutical', true, true, 'AstraZeneca is a licensed visa sponsor and actively recruits international STEM graduates.', 'https://astrazeneca.com/careers', '2026-08-15', '2026-03-28T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Machine Learning Engineer', 'DeepMind', 'London', '£75,000', 75000, 95000, 'Work at the frontier of AI research at DeepMind, Google''s world-leading AI laboratory. You''ll implement and optimise state-of-the-art ML models for real-world applications.', 'PhD or MSc in Machine Learning, Computer Science, or Mathematics. Strong publication record preferred.', 'Technology', true, true, 'DeepMind actively sponsors international researchers and engineers on Graduate Route and Skilled Worker visas.', 'https://deepmind.com/careers', '2026-09-01', '2026-03-28T10:00:00Z', true, NULL, 'full_time'),
  ('Accountancy Graduate Scheme', 'KPMG', 'London, Birmingham, Manchester', '£31,000', 31000, 35000, 'Gain your ACA qualification while working on real client engagements across audit, tax, and advisory. KPMG is one of the Big Four professional services firms.', '2:1 degree in any subject. Strong numerical skills. Commitment to professional qualification.', 'Finance', true, true, 'KPMG sponsors Graduate Route and Skilled Worker visas for all graduate programme joiners.', 'https://kpmg.com/uk/careers', '2026-10-31', '2026-03-28T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Graduate Structural Engineer', 'WSP', 'London, Edinburgh, Manchester', '£33,000', 33000, 38000, 'WSP is one of the world''s leading engineering consultancies. As a Graduate Structural Engineer, you''ll work on iconic infrastructure projects including bridges, stadiums, and high-rise buildings.', 'MEng or BEng in Structural or Civil Engineering. IStructE or ICE chartership ambition.', 'Engineering', true, true, 'WSP sponsors international graduates and is a licensed UK visa sponsor.', 'https://wsp.com/careers', '2026-10-15', '2026-03-28T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Analyst Programme', 'Goldman Sachs', 'London', '£55,000', 55000, 65000, 'Join Goldman Sachs'' prestigious Analyst Programme designed for top graduates. You''ll work across our divisions, gaining exposure to global markets and investment banking.', '2:1 degree or above, strong analytical skills, excellent communication, right to work in the UK', 'Finance', true, true, 'Goldman Sachs is a licensed sponsor under the Skilled Worker visa route and welcomes applicants on the Graduate Route visa.', 'https://goldmansachs.com/careers', '2026-11-30', '2026-03-15T10:00:00Z', true, true, 'graduate_scheme'),
  ('Graduate Consultant', 'Deloitte', 'London, Manchester', '£35,000', 35000, 40000, 'Deloitte''s graduate consulting programme offers unparalleled exposure to strategy, operations, and technology consulting across multiple sectors.', '2:1 degree, strong problem-solving skills, team player', 'Consulting', true, true, 'Deloitte sponsors Graduate Route and Skilled Worker visas for eligible candidates.', 'https://deloitte.com/careers', '2026-10-15', '2026-03-10T10:00:00Z', true, true, 'graduate_scheme'),
  ('Software Engineer', 'Google', 'London', '£65,000', 65000, 80000, 'Build next-generation technologies that change how billions of users connect, explore, and interact with information.', 'BSc/MSc in Computer Science or related field, strong coding skills in Python/Java/C++', 'Technology', true, true, 'Google is a licensed UK visa sponsor and supports Graduate Route applicants.', 'https://careers.google.com', '2026-10-01', '2026-03-20T10:00:00Z', true, true, 'full_time'),
  ('Graduate Management Trainee', 'NHS', 'National', '£32,000', 32000, 36000, 'The NHS Graduate Management Training Scheme is one of the most prestigious in the UK, developing future healthcare leaders.', '2:2 degree or above, passion for healthcare, leadership potential', 'Healthcare', true, true, 'The NHS is a licensed visa sponsor. Graduate Route visa holders are welcome to apply.', 'https://graduates.nhs.uk', '2026-09-30', '2026-03-05T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Business Analyst', 'McKinsey & Company', 'London', '£55,000', 55000, 70000, 'Work alongside some of the brightest minds in business, solving complex challenges for Fortune 500 clients.', 'Outstanding academic record, analytical mindset, strong interpersonal skills', 'Consulting', true, true, 'McKinsey sponsors international graduates on both Graduate Route and Skilled Worker visas.', 'https://mckinsey.com/careers', '2026-10-15', '2026-03-12T10:00:00Z', true, NULL, 'full_time'),
  ('Tax Graduate', 'PwC', 'London', '£33,000', 33000, 37000, 'Start your career in tax with one of the Big Four. You''ll advise multinational clients on complex tax matters.', '2:1 degree, strong numerical skills, attention to detail', 'Finance', true, true, 'PwC is a licensed visa sponsor and supports Graduate Route applicants.', 'https://pwc.co.uk/careers', '2026-10-31', '2026-03-08T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Future Leaders Programme', 'Unilever', 'London', '£32,000', 32000, 38000, 'Unilever''s flagship leadership programme rotating across marketing, supply chain, finance, and HR.', '2:1 degree, leadership experience, global mindset', 'FMCG', true, true, 'Unilever sponsors Graduate Route visa holders for their graduate programmes.', 'https://unilever.com/careers', '2026-10-20', '2026-03-18T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Graduate Engineer', 'Arup', 'London', '£35,000', 35000, 40000, 'Join Arup''s graduate engineering programme and work on iconic infrastructure projects around the world.', 'MEng or BEng in Civil/Structural/Mechanical Engineering, Chartership ambition', 'Engineering', true, true, 'Arup sponsors international graduates and supports Graduate Route visa holders.', 'https://arup.com/careers', '2026-10-30', '2026-03-22T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Journalism Trainee', 'BBC', 'London', '£28,000', 28000, 32000, 'The BBC Journalism Trainee Scheme is a two-year programme developing the next generation of broadcast journalists.', 'Degree in any subject, strong writing skills, passion for news', 'Media', false, false, 'Sponsorship status for this role is currently unconfirmed. Please verify directly with the employer.', 'https://bbc.co.uk/careers', '2026-09-30', '2026-03-01T10:00:00Z', true, NULL, 'graduate_scheme'),
  ('Marketing Executive', 'Northern Digital Agency', 'Manchester', '£25,000', 25000, 30000, 'Join a fast-growing digital marketing agency as a Marketing Executive. Manage social campaigns, content creation, and client relationships.', 'Degree in Marketing or related field, social media savvy, creative mindset', 'Marketing', false, false, 'This employer does not currently sponsor work visas.', 'https://example.com/apply', '2026-08-31', '2026-03-25T10:00:00Z', true, NULL, 'full_time');

-- ===== BlogPost -> blog_posts =====
INSERT INTO public.blog_posts (title, slug, excerpt, body, category, author, cta_text, cta_url, meta_description, target_keyword, reading_time_minutes, tags, is_published, published_at) VALUES
  ('Graduate Route Visa UK: Complete 2026 Guide', 'graduate-route-visa-uk-2026-complete-guide', 'Everything international students need to know about the Graduate Route visa in 2026 — eligibility, duration, work rights, and the critical 2027 changes.', '# Graduate Route Visa UK: Complete 2026 Guide

The Graduate Route visa is one of the most significant opportunities available to international students in the UK. If you''re studying or have recently graduated from a UK university, this visa allows you to stay and work in the UK after your studies without needing employer sponsorship.

This guide covers everything you need to know in 2026 — including a critical change coming in January 2027 that could significantly affect your plans.

## What is the Graduate Route Visa?

The Graduate Route (sometimes called the Graduate visa) is a post-study work visa that allows international students who have completed a degree at a UK university to remain in the UK and work — or look for work — for a set period after graduation.

Unlike the Skilled Worker visa, the Graduate Route does **not** require you to have a job offer or an employer to sponsor you. You can work for any employer, in any role, at any salary level during this period.

## Who is Eligible?

To be eligible for the Graduate Route visa, you must:

- Have successfully completed a degree at a UK university (undergraduate, Masters, or PhD)
- Have been sponsored by a licensed student sponsor during your studies
- Be applying from inside the UK (you cannot apply from outside the UK)
- Have a valid Student visa or Tier 4 visa at the time of application
- Meet the English language requirement (usually met by your degree)

You must apply **before your current visa expires**. Most students apply in the weeks after receiving their final results.

## How Long Does the Graduate Route Last?

The duration depends on your level of study:

- **Undergraduate and Masters graduates**: 2 years
- **PhD graduates**: 3 years

This gives you a meaningful window to find employment, build UK experience, and if needed, switch to a Skilled Worker visa.

## How to Apply

The application is made entirely online through the UK Visas and Immigration (UKVI) system. Here''s the process:

1. **Check eligibility** — confirm your university is a licensed student sponsor
2. **Gather documents** — passport, BRP (or eVisa details), proof of graduation
3. **Apply online** at gov.uk/graduate-visa
4. **Pay the application fee** — £880 (as of 2026)
5. **Provide biometrics** if required
6. **Wait for a decision** — typically within 8 weeks, often faster

Important: You can only apply from **inside the UK**. If you travel abroad before applying, you may not be able to return on your student visa to make the application.

## Work Rights on the Graduate Route

One of the Graduate Route''s biggest advantages is its flexibility. You can:

✅ Work for **any employer** in the UK  
✅ Work in **any job role** (no skill level requirement)  
✅ Work at **any salary** (no minimum threshold)  
✅ **Switch employers** freely  
✅ Work **part-time or full-time**  
✅ Be **self-employed** or freelance  

### What You Cannot Do

❌ Access **public funds** (benefits, Universal Credit, NHS surcharge is already paid)  
❌ Work as a **professional sportsperson or coach** as your primary role  
❌ Extend the Graduate Route — it''s a one-time visa

## Switching to a Skilled Worker Visa

The Graduate Route is not meant to be permanent — it''s a bridge to secure employment. When you find an employer who wants to hire you long-term, they can sponsor your **Skilled Worker visa**.

To switch to a Skilled Worker visa, your employer must:
- Be a licensed sponsor on the UK government register
- Offer you a role at or above the relevant salary threshold (£41,700 for most roles in 2026, or £33,400 as a new entrant under 26)
- Issue you a Certificate of Sponsorship (CoS)

You can apply to switch **before your Graduate Route expires**. GradPilot AI helps you track how much time you have remaining and identify employers who actively sponsor visas.

## 🚨 Critical 2027 Change — Apply Before 31 December 2026

The UK government has announced a significant change to the Graduate Route:

**From 1 January 2027**, the Graduate Route will reduce to **18 months** for Bachelor''s and Masters graduates (down from 2 years). PhD graduates are unaffected and will still receive 3 years.

**What this means for you:**
- If you apply for your Graduate Route visa **before 31 December 2026**, you still receive the full 2 years
- If you apply **on or after 1 January 2027**, you will only receive 18 months
- This is a confirmed policy change — plan accordingly

If you''re graduating in 2026, apply for your Graduate Route visa as soon as your results are confirmed. Don''t wait.

## Making the Most of Your Graduate Route Period

**In the first 3 months:**
- Apply for your National Insurance number immediately
- Open a UK bank account
- Register with a GP
- Begin targeted job applications to visa-sponsoring employers

**In months 3-12:**
- Attend UK employer graduate scheme events
- Network actively — many UK jobs are filled through referrals
- Use your Graduate Route flexibility to gain any UK work experience

**In months 12-18:**
- If no sponsorship secured, intensify your search
- Consider contract or temporary roles to extend UK work experience
- Track all applications — know where you stand at all times

**Final 6 months:**
- This is urgent territory — seek sponsorship immediately
- Consider using an immigration adviser if unsure about your options
- Never let your visa expire before applying to switch or extend

## Conclusion

The Graduate Route visa is a genuinely valuable opportunity — two years of unrestricted work in one of the world''s most developed economies, with the ability to switch to long-term sponsorship when the right role arrives. Use it strategically.

The 2027 change makes timing more important than ever. If you''re graduating in 2026, act quickly and track your countdown carefully.

---

*Track your Graduate Route countdown, find visa-sponsoring employers, and get AI career coaching tailored to your situation — all free to start.*', 'Visa', 'Diwash Poudel', 'Track your Graduate Route countdown free →', '/auth/signup', 'Complete guide to the Graduate Route visa UK 2026. Duration, work rights, application process, and what changes in January 2027.', 'graduate route visa UK', 8, ARRAY['Graduate Route','Visa','International Students','UK']::text[], true, '2026-06-10'),
  ('How to Write a UK CV as an International Student (2026 Guide)', 'how-to-write-uk-cv-international-student', 'A step-by-step guide to writing a UK-format CV as an international student — what to include, what to remove, and how to pass UK ATS systems.', '# How to Write a UK CV as an International Student (2026 Guide)

Writing a CV for the UK job market is different from anywhere else in the world. If you''re an international student applying for UK roles, your CV needs to follow specific conventions that many applicants miss — and those mistakes can mean rejection before anyone even reads your experience.

This guide covers everything: the rules, the structure, the common mistakes, and how to make your international background an asset rather than a liability.

## UK CV Rules — The Fundamentals

Before you write a single word, understand these non-negotiables:

**No photo.** UK CVs do not include a photo. Adding one is a red flag to UK employers — it looks unprofessional and may trigger discrimination concerns.

**No date of birth.** UK employers legally cannot ask for your age. Do not include it.

**No nationality (usually).** Unless you''re applying for a role that requires it (e.g. some government roles), your nationality is not required.

**Maximum 2 pages.** UK CVs are almost always 2 pages. A 3-page CV signals poor editing skills. A 1-page CV is fine for recent graduates with limited experience.

**UK English spelling.** This matters: ''organisation'' not ''organization'', ''colour'' not ''color'', ''optimise'' not ''optimize''. Run your CV through a UK English spellcheck.

**Reverse chronological order.** Most recent experience first, oldest last.

## UK CV Structure

### 1. Personal Statement (Top of page, 3-4 lines)
A brief professional summary positioned at the very top. This is your ''elevator pitch'' — who you are, what you offer, and what you''re looking for.

Example: *"Analytical MSc Data Science graduate from the University of Manchester with hands-on experience in Python, SQL, and machine learning. International background with strong cross-cultural communication skills. Seeking a graduate data analyst role at a UK financial services firm, ideally sponsoring Graduate Route visa holders."*

### 2. Education
For recent graduates, education comes before work experience. Include:
- Degree title and classification (e.g. MSc Finance — Distinction)
- University name and graduation year
- Relevant modules (optional but useful)
- Dissertation title if relevant to the role

### 3. Work Experience
Each role should include:
- Job title, employer, location, and dates (month/year)
- 3-5 bullet points using the **achievement formula**: Action verb + Task + Measurable outcome

Strong example: *"Analysed customer transaction data across 12 markets using Python, identifying £2.3M in cost reduction opportunities adopted by the operations team."*

Weak example: *"Responsible for data analysis tasks."*

### 4. Skills
A brief section listing technical skills, software, languages, and certifications. Keep it factual — avoid vague claims like ''excellent communicator''.

### 5. References
''References available on request'' is acceptable. You don''t need to list referee details.

## ATS Optimisation

Most UK employers (and all large companies) use Applicant Tracking Systems (ATS) to scan CVs before a human sees them. If your CV doesn''t contain the right keywords, it gets rejected automatically.

How to optimise:
1. **Read the job description carefully** — identify repeated skills and phrases
2. **Use exact terminology** from the job description (e.g. ''stakeholder management'' not ''working with clients'')
3. **Use standard section headings** — ATS can struggle with creative formatting
4. **Avoid tables and text boxes** — ATS often can''t read them
5. **Save as PDF** unless the employer specifies Word

## Common Mistakes International Students Make

**Listing overseas qualifications without context.** UK employers may not recognise your home country''s grading system. Add context: *"GPA 3.8/4.0 (Top 10% of cohort)"* or *"First Class equivalent"*.

**Using American CV format.** The US ''resume'' format differs from a UK CV. American CVs often include objectives sections, different section ordering, and different length conventions.

**Not addressing visa status.** This is a nuanced point. You don''t have to mention your visa, but if you''re applying to roles that sponsor, mentioning it (e.g. ''Currently on Graduate Route visa, eligible to work for any UK employer'') removes ambiguity and prevents wasted time.

**Weak achievement statements.** International CVs often describe duties, not achievements. UK employers want to see impact. Quantify everything you can.

**Inconsistent formatting.** Inconsistent fonts, spacing, or date formats signal lack of attention to detail.

## Making Your International Background an Asset

Your international experience is genuinely valuable to UK employers — but only if you frame it correctly.

- **Language skills** are a competitive advantage. List every language you speak with your level.
- **Cross-cultural experience** is relevant for global companies, client-facing roles, and international business roles — make this explicit.
- **Academic achievement** from a well-regarded university abroad carries weight. Make sure UK readers understand the prestige (e.g. ''Top 5 university in India by national ranking'').
- **Unique perspectives** from operating in different economic contexts can differentiate you in consulting, finance, and policy roles.

## Conclusion

A strong UK CV takes time to get right — but it''s worth the effort. The format rules are strict but learnable. The key difference is the shift from describing your duties to demonstrating your impact.

Get your CV scored against UK employer expectations using GradPilot AI''s CV Coach — it checks format, keywords, and international applicant-specific issues in under a minute.', 'CV', 'Diwash Poudel', 'Get your CV scored for UK employers free →', '/auth/signup', 'How to write a UK CV as an international student in 2026. Format, length, what to remove, and ATS tips from GradPilot AI.', 'UK CV international student', 7, ARRAY['CV','UK CV Format','International Students','Career']::text[], true, '2026-06-10'),
  ('UK Employer Sponsorship Register: How to Check Before You Apply', 'uk-employer-sponsorship-register-how-to-check', 'How to use the UK government''s employer sponsorship register to check if a company can legally sponsor your visa — before you apply.', '# UK Employer Sponsorship Register: How to Check Before You Apply

One of the most common mistakes international students make when job hunting in the UK is applying to companies that cannot legally sponsor their visa. The result? Wasted time, false hope, and rejection letters that say ''we are unable to consider candidates who require visa sponsorship.''

The solution is simple: check the employer sponsorship register **before** you apply.

## What is the UK Employer Sponsorship Register?

The UK government maintains an official list of all employers who hold a valid sponsor licence. This register is publicly available and free to search. Any company that wants to hire international workers on a Skilled Worker visa must be on this list.

## How to Check

1. Go to: **gov.uk/government/publications/register-of-licensed-sponsors-workers**
2. Download the spreadsheet (updated weekly)
3. Search for the company name using Ctrl+F
4. Check their licence type: ''Worker'' means they can sponsor Skilled Worker visas

Note: The Graduate Route does not require employer sponsorship — so during your Graduate Route period, any employer can hire you. The sponsorship register matters when you''re looking to **switch to a Skilled Worker visa**.

## Key Facts

- Over 50,000 UK employers hold a valid sponsor licence
- The register is updated weekly by the Home Office
- Large multinationals (Google, Microsoft, Goldman Sachs, NHS) are almost always licensed
- Smaller companies may not be — always check
- Being on the register doesn''t guarantee they''ll sponsor every role — always ask explicitly

## Tips for International Students

- Filter your job search to sponsored roles only using GradPilot AI''s job board
- Email HR directly: *"I am on a Graduate Route visa. Does this role include visa sponsorship for a Skilled Worker application?"*
- Research a company''s international hiring history on LinkedIn before applying

Knowing which employers sponsor before you apply saves weeks of your Graduate Route time — and your energy for applications that can actually lead somewhere.', 'Jobs', 'Diwash Poudel', 'Check any employer''s sponsor status free →', '/auth/signup', 'How to check the UK employer sponsorship register 2026. Find out if a company sponsors Graduate Route or Skilled Worker visas.', 'employer sponsorship register', 5, ARRAY['Sponsorship','Skilled Worker','Graduate Route','Jobs']::text[], true, '2026-06-10'),
  ('NI Number UK: How to Get It as an International Student (2026)', 'ni-number-uk-how-to-get-as-student', 'How to apply for a National Insurance number as an international student in the UK — step by step, with timelines and what to do while you wait.', '# NI Number UK: How to Get It as an International Student (2026)

Your National Insurance (NI) number is one of the most important pieces of paperwork you''ll get in the UK. Without it, you technically cannot be paid through a standard payroll system — and many employers won''t hire you until they have it on file.

Here''s everything you need to know about getting your NI number as an international student in 2026.

## What is a National Insurance Number?

A National Insurance number is a unique identifier in the format: XX 99 99 99 X (two letters, six digits, one letter). It''s used by HMRC (the UK tax authority) to track your tax contributions and National Insurance payments throughout your working life in the UK.

Every person who works in the UK legally needs one. It''s how the government calculates your pension entitlement, tax contributions, and benefit eligibility.

## Why You Need It as an International Student

- **To work legally in the UK** — employers need it to process your payroll correctly
- **To pay the right amount of tax** — without it, you may be put on an emergency tax code (BR or 0T) and overtaxed
- **To access some services** — banks, lettings agencies, and other institutions may ask for it
- **To claim a tax refund** — if you overpay tax (common for part-time workers), HMRC needs your NI number to process refunds

## How to Apply for Your NI Number

Applying is straightforward but takes time, so start as soon as possible after arriving in the UK.

### Step 1: Apply online
Visit **gov.uk/apply-national-insurance-number** and complete the online application. You''ll need:
- Your passport or travel document
- Your current UK address
- Details of your right to work (your visa)

### Step 2: Attend an interview (sometimes)
Depending on your circumstances, you may be invited to a phone or in-person interview. This is just a brief identity verification — typically 15-20 minutes. Questions are straightforward: how long you''ve been in the UK, your immigration status, your address.

### Step 3: Receive your NI number by post
Your NI number arrives by letter, usually within **2-8 weeks** of your application or interview. Keep this letter — it''s the only official record of your number.

## What to Do While You''re Waiting

You **can still work while waiting for your NI number**. This is important to know — many students delay accepting jobs while waiting, which isn''t necessary.

Tell your employer you''ve applied and provide your application reference number. Employers are legally allowed to take you on without an NI number as long as you''ve applied and have the right to work. Your tax will be calculated using your emergency tax code initially — this can be corrected once your number comes through.

## Common Problems and Solutions

**Problem: Application stuck for more than 8 weeks**
Solution: Call the National Insurance helpline: 0300 200 3500 (Monday-Friday). Have your passport and application reference ready.

**Problem: Wrong tax code applied before NI number processed**
Solution: Contact HMRC directly with your employer''s details and they can correct your tax code. You may receive a rebate if overpaid.

**Problem: Lost your NI number**
Solution: Log in to your personal tax account at gov.uk/personal-tax-account — your NI number is displayed there. You can also find it on previous payslips or P60 documents.

**Problem: NI number letter lost in post**
Solution: Call HMRC and request confirmation in writing.

## Conclusion

Apply for your NI number in your first week in the UK — before you have a job offer, before you''ve found accommodation, as one of your very first tasks. The process is simple but the wait is long, so getting it started early means it''ll be ready when you need it.

*Get your full UK settling-in checklist — from NI number to NHS registration to bank account — all in one place on GradPilot AI.*', 'Life in UK', 'Diwash Poudel', 'Get your NI Number checklist free →', '/auth/signup', 'How to get a National Insurance number as an international student in the UK 2026. Application process, timelines, and tips.', 'NI number student UK', 6, ARRAY['NI Number','Life in UK','International Students','Banking']::text[], true, '2026-06-10'),
  ('Rental Scams UK: How International Students Can Avoid Them', 'rental-scams-uk-international-students-how-to-avoid', 'The most common rental scams targeting international students in the UK, and exactly how to spot and avoid them before paying any deposit.', '# Rental Scams UK: How International Students Can Avoid Them

Rental scams targeting international students in the UK are disturbingly common — and disturbingly effective. New arrivals, unfamiliar with the market, under time pressure to find accommodation, and often making decisions remotely, are disproportionately targeted.

Here''s what you need to know to protect yourself.

## The Most Common Rental Scam Types

**Ghost listings.** A property is advertised at a price that looks attractive — usually below market rate. The ''landlord'' claims to be abroad or unavailable to show the property. They ask for a deposit to ''secure'' the flat. You pay. They disappear.

**Duplicate listings.** Real properties are copied from legitimate sites (Rightmove, Zoopla) and re-listed at a lower price on less regulated platforms. The photos, descriptions, and even addresses are real — but the person you''re talking to has no connection to the property.

**Upfront fee scams.** Fake letting agents ask for ''application fees'', ''admin fees'', or ''holding deposits'' before you''ve signed any contract or seen the property in person. Legitimate agencies in England cannot charge upfront fees (Tenant Fees Act 2019).

**Overcrowded house scams.** A property is rented to far more people than it was designed for, often without the landlord''s knowledge, with each ''room'' (including cupboards or living rooms) let separately.

## Red Flags to Watch For

🚩 Price significantly below market rate for the area  
🚩 Landlord claims to be abroad or unavailable to meet  
🚩 Requests payment before viewing in person  
🚩 Asks for wire transfer, cash, or payment apps (not bank transfer to a UK account)  
🚩 Pressure to decide quickly — ''I have 10 other people interested''  
🚩 Refuses to provide a tenancy agreement before payment  
🚩 Google the address — if it appears on another site at a higher price, it''s duplicated  

## How to Verify a Landlord or Property

1. **View in person** before paying anything. If you can''t, ask a trusted contact to view it.
2. **Check Land Registry** (gov.uk/search-property-information) — £3 to confirm who actually owns the property.
3. **Ask for the tenancy agreement first** — a legitimate landlord will provide this.
4. **Pay by bank transfer only** to a UK bank account. Never wire, Western Union, or cash.
5. **Check Google reviews** of any letting agency.
6. **Search the address** on Rightmove — if the same property appears at a higher price, something is wrong.

## If You''ve Been Scammed

- Report to **Action Fraud** (actionfraud.police.uk)
- Contact your bank''s fraud team immediately
- Report to Citizens Advice (citizensadvice.org.uk)
- If you paid by card, initiate a chargeback with your bank

## Conclusion

The rule is simple: never pay money for a property you haven''t seen in person, from a landlord whose ownership you haven''t verified. If a deal looks too good, it almost certainly is.

*GradPilot AI''s UK Guidance section covers everything you need to know about safe accommodation, tenant rights, and proof of address — all in one place.*', 'Life in UK', 'Diwash Poudel', 'Check your landlord for scam risk free →', '/auth/signup', 'Rental scams UK: how international students can avoid losing their deposit. Common scam types, red flags, and how to verify landlords.', 'rental scams international students UK', 7, ARRAY['Rental Scams','Housing','Life in UK','Safety']::text[], true, '2026-06-10'),
  ('Best Graduate Schemes UK 2026 for International Students', 'best-graduate-schemes-uk-2026-international-students', 'The best graduate schemes in the UK for 2026 that sponsor international students — with visa details, salary, and how to apply.', NULL, 'Jobs', 'Diwash Poudel', 'Find graduate schemes that sponsor your visa →', '/jobs', 'Best graduate schemes UK 2026 for international students. Which employers sponsor Graduate Route and Skilled Worker visas.', 'graduate schemes international students UK', 9, ARRAY['Graduate Schemes','Jobs','Sponsorship','International Students']::text[], true, '2026-06-16'),
  ('Skilled Worker Visa vs Graduate Route: Which Should You Choose?', 'skilled-worker-visa-vs-graduate-route-which-to-choose', 'Graduate Route vs Skilled Worker visa — what''s the difference, when to switch, and which is right for your UK career situation.', NULL, 'Visa', 'Diwash Poudel', 'Get your personalised visa plan →', '/auth/signup', 'Skilled Worker visa vs Graduate Route UK 2026. Key differences, salary thresholds, how to switch, and which to choose.', 'skilled worker visa vs graduate route', 6, ARRAY['Graduate Route','Skilled Worker','Visa','Career']::text[], true, '2026-06-16'),
  ('How to Open a UK Bank Account as an International Student (2026)', 'uk-bank-account-international-student-how-to-open', 'How to open a UK bank account as an international student — the fastest options, what documents you need, and which bank is best for sending money home.', NULL, 'Life in UK', 'Diwash Poudel', 'Open a UK bank account guide →', '/uk-guidance', 'How to open a UK bank account as an international student 2026. Best banks, required documents, and fastest options for new arrivals.', 'UK bank account international student', 5, ARRAY['Banking','Life in UK','International Students','Monzo']::text[], true, '2026-06-16'),
  ('UK Salary Expectations for International Graduates 2026', 'uk-salary-expectations-international-graduates-2026', 'What can you expect to earn as an international graduate in the UK in 2026? Real salary data by industry, city, and experience level.', NULL, 'Salary', 'Diwash Poudel', 'Check salaries for your target role →', '/employer-insights', 'UK graduate salary for international students 2026. Average salaries by industry, city premiums, and negotiation tips.', 'UK graduate salary international student', 6, ARRAY['Salary','Graduate Jobs','International Students','Career']::text[], true, '2026-06-16'),
  ('NHS Registration for International Students UK: Step by Step Guide', 'nhs-registration-international-students-uk', 'How to register with an NHS GP as an international student — what to bring, how long it takes, and what to do if no GPs are accepting new patients.', NULL, 'Life in UK', 'Diwash Poudel', 'Register with the NHS today →', '/uk-guidance', 'NHS registration for international students UK 2026. How to find and register with a GP, what documents you need.', 'NHS registration international student', 4, ARRAY['NHS','Healthcare','Life in UK','International Students']::text[], true, '2026-06-16');

-- ===== Mentor -> mentors =====
INSERT INTO public.mentors (name, country, university, current_position, current_company, industry, visa_journey, bio, linkedin_url, photo_url, degree_level, is_available) VALUES
  ('Mei Lin Zhang', 'China', 'Imperial College London', 'Data Scientist', 'HSBC', 'Finance', 'Graduated from Imperial on a Student visa, switched to Graduate Route, and secured a sponsored Skilled Worker visa at HSBC within 18 months. The key was building UK-specific experience through internships during my degree.', 'MSc Data Science from Imperial College London, now a Data Scientist at HSBC. I help international students break into finance and tech roles.', 'https://linkedin.com/in/meilin-zhang-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MeiLinZhang', 'masters', true),
  ('Kavya Nair', 'India', 'University of Oxford', 'Associate Consultant', 'McKinsey & Company', 'Consulting', 'Oxford''s career services were helpful but didn''t understand the visa complexity. I self-navigated the Graduate Route and McKinsey sponsored my Skilled Worker visa after 2 years. Consulting is very international-friendly.', 'MSc Economics from Oxford, now at McKinsey. I specialise in helping international students break into strategy consulting.', 'https://linkedin.com/in/kavya-nair-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=KavyaNair', 'masters', true),
  ('Omar Hassan', 'Egypt', 'London Business School', 'Investment Banking Analyst', 'Goldman Sachs', 'Finance', 'Investment banking recruitment starts a full year before joining. I secured my role before graduating, which gave me certainty. Goldman sponsored my Skilled Worker visa from day one.', 'MiF from London Business School, now an IBD Analyst at Goldman Sachs. I help international students navigate the highly competitive banking recruitment cycle.', 'https://linkedin.com/in/omar-hassan-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarHassan', 'masters', true),
  ('Yuki Tanaka', 'Japan', 'University of Cambridge', 'Software Engineer', 'Arm', 'Technology', 'PhD students get 3 years on Graduate Route which gives much more breathing room. I took my time, turned down two offers before finding the right fit at Arm. Don''t rush just because of visa pressure.', 'PhD in Computer Science from Cambridge, now a Software Engineer at Arm. I mentor international PhDs transitioning from academia to industry roles.', 'https://linkedin.com/in/yuki-tanaka-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=YukiTanaka', 'phd', true),
  ('Chidinma Obi', 'Nigeria', 'King''s College London', 'Solicitor', 'Linklaters', 'Legal', 'The legal sector is genuinely welcoming of international talent at top firms. Linklaters sponsored me throughout my training contract and subsequent qualification. Start networking with law firms from day one of your LLM.', 'LLM from King''s College London, qualified solicitor at Linklaters. I help international law students navigate the SQE and training contract market.', 'https://linkedin.com/in/chidinma-obi-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChindinmaObi', 'masters', true),
  ('Rajesh Kumar', 'India', 'University of Sheffield', 'Mechanical Engineer', 'Rolls-Royce', 'Engineering', 'Engineering is one of the most visa-friendly sectors in the UK. Rolls-Royce offered me sponsorship from the start. My advice: target large engineering companies with graduate schemes — they all have established visa processes.', 'MEng Mechanical Engineering from Sheffield, now at Rolls-Royce. I help international engineering students target sponsored graduate roles.', 'https://linkedin.com/in/rajesh-kumar-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshKumar', 'masters', true),
  ('Priya Sharma', 'India', 'University of Edinburgh', 'Investment Analyst', 'Barclays', 'Finance', 'Came to the UK for my MSc in Finance at Edinburgh. After graduation, I used my Graduate Route visa to secure a role at Barclays. The first 6 months were tough — I applied to over 80 positions. The key was tailoring every CV to UK format and being upfront about my visa status.', 'MSc Finance graduate from Edinburgh, now an Investment Analyst at Barclays. Passionate about helping international students navigate the UK finance sector.', 'https://linkedin.com/in/priya-sharma-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma', 'masters', true),
  ('Wei Chen', 'China', 'University College London', 'Software Engineer', 'Amazon', 'Technology', 'Completed my MEng at UCL and joined Amazon through their graduate programme. They sponsored my Skilled Worker visa after my Graduate Route expired. The tech industry is generally more visa-friendly than other sectors.', 'MEng Engineering from UCL, now a Software Engineer at Amazon. I help international students break into UK tech.', 'https://linkedin.com/in/wei-chen-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=WeiChen', 'masters', true),
  ('Fatima Al-Hassan', 'Nigeria', 'University of Warwick', 'Strategy Consultant', 'BCG', 'Consulting', 'My MBA at Warwick opened doors I never imagined. BCG recruited me during my studies. The consulting industry values diverse perspectives, and being international was actually an advantage in client-facing roles.', 'MBA from Warwick Business School, now a Strategy Consultant at BCG. I mentor international students targeting consulting careers.', 'https://linkedin.com/in/fatima-alhassan-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaAlHassan', 'masters', true),
  ('Arjun Patel', 'India', 'University of Manchester', 'Product Manager', 'Meta', 'Technology', 'After my MSc in Computer Science at Manchester, I pivoted from engineering to product management. The Graduate Route gave me the breathing room to find the right role rather than rushing into the first offer.', 'MSc Computer Science from Manchester, now a Product Manager at Meta. I help international students transition into product roles.', 'https://linkedin.com/in/arjun-patel-gradpilot', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunPatel', 'masters', true);

-- ===== Testimonial -> testimonials =====
INSERT INTO public.testimonials (name, content, course, university, outcome, rating, avatar_url, linkedin_url, display_order, is_published) VALUES
  ('Aisha K.', 'GradPilot AI found me 3 roles that actually sponsor the Graduate Route. I had no idea which companies to target before — now my applications are way more focused and I''ve had 2 interviews in 2 weeks.', 'MSc Data Science', 'University of Manchester', '2 interviews in 2 weeks', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=AishaKhan', NULL, 1, true),
  ('Ben P.', 'The CV Coach completely transformed my CV for the UK market. I had been applying for 3 months with no responses. After the rewrite I got callbacks from Goldman Sachs and Deloitte within a week.', 'MSc Finance', 'University of Edinburgh', 'Landed at Deloitte', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=BenPatel', NULL, 2, true),
  ('Mei Z.', 'The UK Guidance section saved me from a rental scam. I nearly paid a £1,200 deposit on a flat that didn''t exist. The scam checker flagged the landlord immediately. Genuinely life-changing tool.', 'MEng Computer Science', 'Imperial College London', 'Avoided £1,200 scam', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=MeiZhang', NULL, 3, true),
  ('Kofi A.', 'The AI Adviser answered questions that my university careers service couldn''t. It explained the Graduate Route to Skilled Worker switch in plain English. I finally feel like I have a plan.', 'MSc Engineering Management', 'University of Birmingham', 'Secured Skilled Worker sponsorship', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=KofiAsante', NULL, 4, true),
  ('Priya S.', 'Interview Prep is incredible. I practised for a consulting role and the AI gave me feedback that was more specific than any mock interview I''d done. Got an offer from a Big Four firm after 3 sessions.', 'MBA', 'University of Warwick', 'Big Four offer after 3 sessions', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS', NULL, 5, true),
  ('Carlos M.', 'I was days from my Graduate Route expiring when I found GradPilot. The visa countdown made me realise I only had 47 days left. I applied to 12 sponsored roles in a week and got 2 offers. Worth every penny.', 'MSc International Business', 'King''s College London', '2 job offers in 47 days', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosM', NULL, 6, true),
  ('Fatima H.', 'As a PhD graduate I wasn''t sure if GradPilot was for me. The mentor matching connected me with someone who had done exactly my journey — PhD to industry in the UK. She helped me completely rethink my CV.', 'PhD Biochemistry', 'University of Cambridge', 'PhD to industry transition', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaH', NULL, 7, true),
  ('Srijan P.', 'The NI Number and banking guides are so practical. I arrived in the UK not knowing where to start. GradPilot walked me through everything step by step. I was fully set up within my first week.', 'MSc Computer Science', 'Edinburgh Napier University', 'Fully settled in week 1', 5, 'https://api.dicebear.com/7.x/avataaars/svg?seed=SrijanP', NULL, 8, true);

-- ===== InterviewQuestion -> interview_questions =====
INSERT INTO public.interview_questions (question, category, industry, difficulty, tips_for_international, sample_answer) VALUES
  ('How would you approach building an audience for a new digital media brand?', 'technical', 'Media', 'hard', 'Show platform knowledge: TikTok, Instagram, YouTube, newsletters. If you have personal experience growing any social following mention it.', 'Framework: define target audience, identify their platform, create consistent content, engage community, measure and iterate.'),
  ('Tell me about a time you managed competing priorities under tight deadlines.', 'competency', 'FMCG', 'medium', 'FMCG moves fast. Show you can handle pressure. Use an academic or work example with a clear outcome.', 'STAR: Set the scene, explain the competing demands, describe how you prioritised and what the result was.'),
  ('How would you explain the importance of regulatory compliance to a new team member?', 'competency', 'Pharmaceutical', 'medium', 'UK pharma is regulated by the MHRA. Show you understand why compliance exists, not just that it does.', 'Explain: patient safety is paramount, regulatory frameworks protect people, non-compliance risks lives and company reputation. Use a real-world example.'),
  ('Where do you see the biggest opportunity in the pharmaceutical industry over the next five years?', 'motivational', 'Pharmaceutical', 'hard', 'Reference AI in drug discovery, personalised medicine, or global health equity. If relevant, mention how your home country''s health challenges inform your perspective.', 'Choose one area: AI-accelerated drug discovery, mRNA technology expansion, rare disease treatments, or global access to medicines. Give specific examples.'),
  ('How do you stay current with developments in technology?', 'motivational', 'Technology', 'easy', 'Name specific sources: Hacker News, MIT Tech Review, specific podcasts, GitHub trending, research papers. Shows genuine passion beyond the degree.', 'Name 2-3 specific sources, a recent development that interested you, and how it might affect your target company.'),
  ('Tell me about a technical project you are most proud of and why.', 'technical', 'Technology', 'medium', 'Your university thesis, final year project, or personal GitHub projects all count. International students often have unique projects solving problems from their home country — these stand out.', 'STAR: What was the problem, what did you build, what technologies did you use, what was the impact or learning.'),
  ('Why do you want to work in the public sector rather than the private sector?', 'motivational', 'Public Sector', 'easy', 'Emphasise public service values. If you came from a country where public services were less accessible, that personal perspective is powerful and genuine.', 'Reference: 1) Commitment to public impact over profit, 2) A specific policy area that matters to you, 3) Long-term career development through Civil Service.'),
  ('How would you launch a new product in a market you know nothing about?', 'technical', 'FMCG', 'hard', 'Your international background is a strength here. You understand entering an unfamiliar market personally. Use market research, consumer insight, and test-and-learn frameworks.', 'Framework: research the market, understand consumer needs, identify competitors, define USP, plan pilot launch, measure and adapt.'),
  ('Tell me about a story you think has been underreported in the UK media.', 'motivational', 'Media', 'medium', 'This is your biggest advantage. Your perspective on underreported stories from your home country or community is exactly what diverse newsrooms want.', 'Pick a genuine example. Explain why it matters, what angle you would take, and what audience it serves.'),
  ('Describe a time you had to explain a complex issue to a non-specialist audience.', 'competency', 'Public Sector', 'medium', 'Civil Service values clear communication. Examples from teaching, tutoring, community leadership, or university presentations all work well.', 'STAR: Identify the complex topic, how you simplified it, the audience reaction, and the outcome.'),
  ('What stories or issues do you think are being underreported in the UK media right now?', 'motivational', 'Media', 'medium', 'This question is a real opportunity for international candidates. You have direct knowledge of stories, perspectives, and communities that UK journalists often lack. The BBC, Reuters, and other UK media organisations actively want diverse editorial perspectives. Be specific and confident.', 'Pick 1-2 genuine examples — ideally related to international communities, global south issues, or underrepresented groups. Show you''ve thought about this independently, not just repeated mainstream narratives.'),
  ('Tell me about a time you had to be extremely detail-oriented to prevent an error.', 'behavioural', 'Pharmaceutical', 'medium', 'Pharmaceutical roles require rigorous attention to detail. Examples from lab work, thesis research, or even financial analysis all work. International students who completed demanding academic programmes often have excellent examples here.', 'STAR: Pick an example with real stakes — lab work, data analysis, report writing. Describe your specific process for quality checking, what could have gone wrong, and how your diligence prevented it.'),
  ('Describe a time you used data or insight to influence a decision.', 'competency', 'FMCG', 'medium', 'Academic research, student projects, or even personal observations about consumer behaviour in your home country are valid examples. International market knowledge is genuinely interesting to FMCG firms who operate globally.', 'STAR: Focus on what data you had, how you interpreted it, what recommendation you made, and what the outcome was. The insight doesn''t have to be complex — FMCG firms want to see commercial thinking, not just analytical ability.'),
  ('Describe a campaign or piece of marketing that really impressed you and explain why it worked.', 'competency', 'Marketing', 'medium', 'You can pick a campaign from anywhere in the world — your home country, a global brand, or a UK company. International marketing knowledge is a genuine advantage. UK marketing employers value candidates who think beyond the UK market.', 'Pick a campaign you genuinely admire. Explain: 1) The target audience, 2) The insight it was built on, 3) The execution, 4) Why it was effective (emotional, behavioural, commercial result). Avoid picking something only because it was famous.'),
  ('Walk me through the key phases of a clinical trial and the regulatory approval process in the UK.', 'technical', 'Pharmaceutical', 'hard', 'UK pharma (AstraZeneca, GSK, Pfizer UK) follow MHRA regulations. If your background is in a different regulatory environment (FDA, EMA), explicitly draw comparisons to show you understand the UK context. This shows adaptability.', 'Phase I (safety, small group), Phase II (efficacy, larger group), Phase III (large-scale comparison vs standard treatment), Phase IV (post-market surveillance). UK regulatory body: MHRA. EMA for EU. Describe IND/CTA filing process.'),
  ('Why do you want to work in FMCG and why this company specifically?', 'motivational', 'FMCG', 'medium', 'FMCG firms like Unilever and P&G love candidates who are genuinely passionate about their brands. International candidates have a real advantage here — you likely grew up with some of these brands in a different market context, which gives you a unique consumer perspective. Use that.', 'Reference: 1) A specific brand or product of theirs you genuinely use or admire, 2) Why FMCG appeals to you (speed of results, consumer impact, commercial exposure), 3) Why this company''s culture or portfolio fits your ambitions.'),
  ('Walk me through your approach to a case study.', 'technical', 'Consulting', 'hard', 'Case interviews are the gatekeepers for consulting. Practice with a framework (Issue Tree, 3Cs, Porter''s Five Forces) but don''t be robotic. UK consulting firms (McKinsey, BCG, Bain, Deloitte) all use cases. Being international is an asset — bring global perspective into your cases.', 'Structure: 1) Clarify the problem and ask 2-3 key questions, 2) State your framework upfront, 3) Work through each branch logically, 4) Synthesise into a clear recommendation. Always state your hypothesis early and update it as you go.'),
  ('Describe a project where you had to use data to solve an engineering problem.', 'technical', 'Engineering', 'medium', 'Engineering firms in the UK love evidence-based problem solving. Use your thesis, lab projects, or internship experience. UK engineering employers (Arup, WSP, Rolls-Royce) value chartership ambition — mention IStructE, ICE, or IMechE if relevant.', 'STAR format: Situation (describe the problem and constraints), Task (your specific role), Action (the data you used, methods applied, tools — Python, MATLAB, FEA, etc.), Result (quantified outcome — cost saved, performance improved, failure prevented).'),
  ('Why do you want to pursue a career in law in the UK specifically?', 'motivational', 'Legal', 'medium', 'UK law firms (Magic Circle, Silver Circle) want to see commercial awareness and commitment to the UK market. Being international is genuinely valued — they serve global clients. Be specific about which areas of law interest you and why London is the hub for that work.', 'Reference: 1) A specific deal, case, or area of law that excites you, 2) Why London is the centre for that work globally, 3) How your international background is an asset to their international client base. Show you''ve researched the firm specifically.'),
  ('How would you communicate a complex diagnosis or treatment plan to a patient who is anxious?', 'competency', 'Healthcare', 'medium', 'This tests communication skills and empathy — core NHS values. International healthcare candidates should be aware that UK patients expect a collaborative conversation, not a top-down delivery. Mention use of plain language, check-backs, and written summaries.', 'Describe: 1) Creating a calm environment, 2) Using plain non-jargon language, 3) Checking understanding with open questions (not ''Do you understand?''), 4) Providing written materials, 5) Inviting questions. Reference NHS communication training if applicable.'),
  ('Tell me about a time you identified a commercial opportunity or created value for a business.', 'behavioural', 'Finance', 'hard', 'Finance firms want evidence of commercial instinct. If you don''t have direct finance work experience, use examples from student entrepreneurship, society leadership, or academic research. International candidates can use cross-border business examples — these are genuinely interesting to UK finance firms.', 'STAR: Focus on the commercial insight (not just the action). Quantify the value created. Show you understood the market context, the risk, and the return. Even a small example is fine if the thinking is sharp.'),
  ('How do you stay up to date with developments in your target industry?', 'motivational', NULL, 'easy', 'For UK roles, show you follow UK-specific sources: FT, The Economist, City A.M. for finance; Tech Crunch for tech; Legal Week for law. Mentioning UK-relevant news shows you''re genuinely engaged with the UK market, not just applying globally.', 'Name 2-3 specific sources you follow, a recent development that interested you, and what it means for the industry. This is a chance to demonstrate genuine intellectual curiosity and UK market awareness.'),
  ('Give an example of a time you led a team through a difficult situation.', 'behavioural', NULL, 'medium', 'International students often have rich leadership experience from student societies, community work, or back home. Don''t undervalue these. If you led a team from multiple cultural backgrounds, that is especially relevant — it shows cross-cultural leadership, which UK employers prize.', 'STAR: Be specific about your leadership actions (not just outcomes). What did YOU decide? How did you motivate or resolve conflict? What would you do differently? UK interviewers want to see self-awareness alongside achievement.'),
  ('What do you know about our company and why does our work interest you?', 'motivational', NULL, 'easy', 'Research depth separates candidates. Go beyond the homepage — read recent press releases, their annual report, LinkedIn posts from employees, Glassdoor reviews. For international students, connecting the company''s international reach to your background is powerful.', 'Structure: 1) A specific thing you know about their work (recent news, a deal, a product, a value they espouse), 2) Why it resonates with your experience or ambitions, 3) What you bring that fits. Never say ''you''re a big brand'' or ''you''re growing fast'' — be specific.'),
  ('Tell me about yourself.', 'motivational', NULL, 'easy', 'Keep it professional and focused on your academic journey and why you came to the UK. Briefly mention your nationality and degree, then pivot to your skills and what you bring. Don''t over-explain your visa situation unless asked.', 'Structure: 1) Who you are professionally (degree, university), 2) What you''ve done (key experience or achievement), 3) Why you''re here (what excites you about this role). Keep it to 90 seconds.'),
  ('Why do you want to work in the UK specifically?', 'motivational', NULL, 'medium', 'Be genuine but professional. You can mention the quality of your UK education and your desire to build a career here. Avoid making it purely about the visa. Focus on the professional opportunity, the company, and the UK market specifically.', 'Mention: your UK education investment, the specific industry opportunity in the UK (e.g. London is a global finance hub), your long-term career ambitions, and how this company fits into those.'),
  ('Are you able to work in the UK without sponsorship?', 'visa_related', NULL, 'medium', 'Be clear and confident. During your Graduate Route visa, you CAN work without sponsorship — say this clearly. If you''ll need Skilled Worker sponsorship in the future, be upfront: say you''re on Graduate Route currently and will need sponsorship after [date]. Most reputable employers appreciate honesty.', 'Say: ''I''m currently on the Graduate Route visa, which allows me to work for any UK employer until [expiry date] without sponsorship. After that, I would need Skilled Worker sponsorship to continue. I understand [Company] is a licensed sponsor and I''d be keen to discuss this further.'''),
  ('Describe a time you worked effectively in a team.', 'behavioural', NULL, 'easy', 'Use the STAR method. International experiences (group projects, societies, part-time work) all count. If you''re coming from a different cultural context, briefly frame it — e.g. ''Working on a cross-cultural team at university, I...''', 'STAR: Situation (context), Task (your role), Action (what YOU specifically did — not ''we''), Result (measurable outcome). Keep it to 2 minutes.'),
  ('Tell me about a time you failed and what you learned from it.', 'behavioural', NULL, 'medium', 'UK interviewers expect self-awareness and maturity here. Don''t pick a trivial failure. Don''t blame others. Show genuine reflection and a concrete lesson you applied. This is actually a great opportunity to show resilience — something international students often have in abundance.', 'Structure: 1) Honest description of the failure, 2) What went wrong and your role in it, 3) Specific lesson learned, 4) How you applied that lesson in a subsequent situation with better outcome.'),
  ('Why do you want to work at this company specifically?', 'motivational', NULL, 'medium', 'Research is everything. Know the company''s recent news, values, culture, and what makes them different. Connect it to your personal story and career goals. International students sometimes give generic answers here — stand out by being specific.', 'Structure: 1) Specific thing about the company you genuinely admire (their work, impact, culture), 2) How it connects to your skills and career goal, 3) What you specifically want to contribute. Never say ''because it''s a big name''.'),
  ('Where do you see yourself in 5 years?', 'motivational', NULL, 'easy', 'For international candidates, the subtext of this question is often ''will you stay?'' Be honest that you intend to build your career in the UK. Describe a realistic career trajectory within or adjacent to this company. Show ambition without being unrealistic.', 'Say something like: ''In 5 years I see myself having developed deep expertise in [area], ideally having progressed to [realistic next level]. I''m committed to building my career in the UK and see [Company] as the place where I can do that.'''),
  ('How do you prioritise when you have multiple deadlines?', 'competency', NULL, 'medium', 'Use a real example. If you juggled academic deadlines, part-time work, and university responsibilities as an international student (which many do), this is perfect material. Show you have a system, not just good intentions.', 'Describe: 1) A real situation with competing priorities, 2) Your specific process (e.g. urgency vs importance matrix, daily planning), 3) The outcome. Mention tools you use if relevant.'),
  ('What is your biggest strength?', 'competency', NULL, 'easy', 'Avoid clichés. Choose a strength genuinely relevant to the role, backed by a specific example. International students often have unique strengths — adaptability, cross-cultural communication, resilience — don''t undervalue these.', 'Name the strength, give one specific example that demonstrates it, and connect it to how it will help you in this role. 60-90 seconds.'),
  ('How do you handle working in a new or unfamiliar environment?', 'behavioural', NULL, 'medium', 'This is essentially asking about your adaptability — and as an international student who moved to a new country, this is one of your strongest areas. Lean into your experience of navigating a new culture, university system, and country. This is a genuine differentiator.', 'Draw on your experience coming to the UK. Describe specifically how you adapted — how you sought help, built networks, learned the new environment, and thrived despite initial challenges.'),
  ('Walk me through a financial model / technical problem you''ve worked on.', 'technical', 'Finance', 'hard', 'For finance roles, technical competence is non-negotiable. Practise DCF models, LBO basics, and accounting ratios before the interview. International candidates should make sure their technical vocabulary is in UK English (e.g. ''shares'' not ''stocks'', ''turnover'' not ''revenue'' in some contexts).', 'Walk through your work methodically: what the model was for, the key assumptions, the methodology, and the output/conclusion. Show you understand not just the mechanics but the business context.'),
  ('How would you explain a complex technical concept to a non-technical stakeholder?', 'competency', 'Technology', 'medium', 'If English isn''t your first language, this tests your communication clarity. Practise explaining technical concepts simply. Use analogies. Show you can bridge the gap between technical and business thinking — a skill highly valued in UK tech companies.', 'Give a real example. Describe who the stakeholder was, what the concept was, what analogy or approach you used to simplify it, and how you confirmed they understood.');

-- ===== CompanyValue -> company_values =====
INSERT INTO public.company_values (icon, title, description, display_order) VALUES
  ('🌍', 'Empathy First', 'We are built by people who lived this experience. We design for the anxiety of a Graduate Route visa deadline, the confusion of a UK-style CV, and the loneliness of job hunting in a country that wasn''t home. Every product decision starts with the user''s reality.', 1),
  ('⚡', 'Speed Over Perfection', 'We ship, learn, and improve. A good answer today beats a perfect answer too late. We move fast, take smart risks, and iterate relentlessly.', 2),
  ('🔬', 'Radical Transparency', 'We share context openly — with the team, with our users, with investors. No hidden agendas. Clear communication builds trust faster than anything else.', 3),
  ('🏆', 'Outcomes Over Outputs', 'We measure success by the careers changed, not the features shipped. Every sprint, every email, every support ticket is in service of one number: did this help someone get a job?', 4),
  ('🤝', 'Inclusion by Design', 'Diversity is our product, our team, and our culture. We build for the underrepresented and actively seek perspectives that challenge our assumptions.', 5);

-- ===== SiteContent -> site_content =====
INSERT INTO public.site_content (key, section, heading, subheading, body_text, cta_text, cta_url, tagline, is_active) VALUES
  ('uk_guidance_header', 'features', 'Transition & UK System Navigation', 'Comprehensive support for understanding the UK education and work systems, managing your transition, and adapting to life in the UK.', NULL, NULL, NULL, NULL, true),
  ('hero_main', 'hero', 'Navigate your international career', 'Built for international students. Visa-aware job matching, CV coaching, and real career guidance — all in one place.', NULL, 'Join Waitlist', NULL, 'Join international students already on the list — get 3 months of Pro free at launch', true),
  ('problem_section', 'features', 'The UK job market wasn''t built for you. We are.', NULL, 'Pain point 1: Visa deadlines make every application feel urgent | Pain point 2: Your CV format is wrong for UK employers — and no one tells you | Pain point 3: Most job boards don''t filter by visa sponsorship', NULL, NULL, NULL, true),
  ('features_section', 'features', 'GradPilot AI changes that.', 'Built for international students navigating the UK job market. Every feature designed around your visa, your CV, and your career.', NULL, NULL, NULL, NULL, true),
  ('founder_story', 'about', 'Built by someone who lived it.', NULL, 'GradPilot AI was founded by an international student who faced every challenge this platform solves — confusing visa rules, rejected CVs, missed deadlines. We didn''t build this for international students. We are international students. GradPilot AI exists because we needed it and it didn''t exist. Now it does.', NULL, NULL, NULL, true),
  ('who_we_help_section', 'who_we_help', 'Who we help', 'GradPilot AI is built exclusively for international students navigating the UK graduate job market. If you''re on a Graduate Route visa or heading towards one — this is for you.', NULL, NULL, NULL, 'Tailored AI solutions for every stage of the international student lifecycle.', true),
  ('bottom_cta', 'cta', 'Ready to land your UK career?', 'Get early access and 3 months of Pro completely free when we launch.', NULL, 'Join the Waitlist', NULL, NULL, true),
  ('pricing_header', 'pricing', 'Simple, transparent pricing.', 'Start free. Upgrade when you''re ready.', 'Waitlist members get 3 months of Pro free. No credit card required.', NULL, NULL, NULL, true),
  ('how_it_works_header', 'how_it_works', 'How GradPilot AI Works', 'From lost to landed — four steps to your UK career.', NULL, NULL, NULL, 'A structured, AI-driven pathway to your UK career.', true),
  ('about_header', 'about', 'We''re not just building for international students. We are international students.', 'Help every international graduate in the UK land the right job, faster — regardless of their background, university, or visa status.', NULL, NULL, NULL, NULL, true),
  ('footer_tagline', 'footer', NULL, NULL, 'hello@gradpilot.ai | © 2026 GradPilot AI Ltd. All rights reserved.', 'Join Waitlist', NULL, 'The career co-pilot for international students in the UK.', true),
  ('pricing_free_plan', 'pricing', 'Free', NULL, '£0/month', 'Join Waitlist — Free', NULL, 'Everything you need to get started', true),
  ('pricing_pro_plan', 'pricing', 'Pro', NULL, '£9.99/month or £79/year', 'Join Waitlist — 3 Months Free', NULL, 'For serious job seekers on a deadline', true);

-- ===== Announcement -> announcements =====
INSERT INTO public.announcements (title, body, target_audience, sent_at) VALUES
  ('Welcome to GradPilot AI 🎉', 'We''re so glad you''re here. GradPilot AI is built by international students, for international students. We know the UK job market can feel overwhelming — the visa pressure, the CV confusion, the uncertainty. That''s exactly why we built this. Explore the job board, try the AI adviser, and start tracking your applications. We''re here to help you land the role. — The GradPilot AI Team', 'all', '2026-03-28T10:00:00Z'),
  ('Graduate Route Visa Tip of the Week 💼', 'Did you know? During your Graduate Route visa, you can work for ANY UK employer without needing sponsorship. You don''t need to restrict your job search to companies with sponsor licences — yet. However, if you want to stay in the UK beyond the Graduate Route, you''ll need a Skilled Worker visa — and that requires employer sponsorship. Use GradPilot AI''s job filter to find employers who are already licensed to sponsor Skilled Worker visas — so you can plan ahead strategically.', 'all', '2026-03-28T10:00:00Z'),
  ('Pro Feature Spotlight: Employer Insights 🔍', 'Pro users now have access to Employer Insights — detailed profiles of top UK employers including their visa sponsorship track record, average graduate salary, application difficulty, insider tips, and hiring timeline. Stop guessing which employers are truly international-friendly. Know before you apply. Upgrade to Pro to unlock Employer Insights and all our other premium features.', 'free_users', '2026-03-28T10:00:00Z');

-- ===== EmployerInsight -> employer_insights =====
INSERT INTO public.employer_insights (company, industry, sponsor_licence_status, sponsors_graduate_route, visa_process_duration, international_hires_percent, average_salary, glassdoor_rating, application_difficulty, insider_tips, hiring_timeline, graduate_programme_url, is_verified) VALUES
  ('Wise', 'Technology', 'licensed', true, '4–5 weeks', 75, '£50,000–£65,000', 4.3, 'high', 'Wise is one of the most internationally diverse companies in UK tech. They genuinely value international perspectives — their product is built FOR people who move across borders. Bring your personal experience of sending money internationally into interviews. Culture is mission-driven and transparent.', 'Roles open year-round. Apply directly on their careers site.', 'https://www.wise.jobs', true),
  ('Spotify', 'Technology', 'licensed', true, '5–7 weeks', 60, '£55,000–£70,000', 4.3, 'very_high', 'Spotify is extremely diverse and international. Technical interviews focus on system design and coding. Culture fit is important — show passion for music and tech. They use Greenhouse ATS. Being multilingual is a genuine plus.', 'Applications open year-round. Process typically 4–6 weeks.', 'https://www.lifeatspotify.com', true),
  ('Revolut', 'Technology', 'licensed', true, '4–6 weeks', 70, '£50,000–£65,000', 3.7, 'very_high', 'Revolut moves fast. Expect a take-home task + 3–4 interviews. They value impact and ownership strongly. Very international team — over 100 nationalities. Good visa support but verify sponsorship for your specific role.', 'Hiring year-round. Fast process — typically 2–3 weeks from application to offer.', 'https://www.revolut.com/careers', true),
  ('Microsoft', 'Technology', 'licensed', true, '6–8 weeks', 55, '£60,000–£70,000', 4.4, 'high', 'Microsoft interviews use the STAR method heavily. Prepare growth mindset examples. They value collaboration over individual heroics. Very international-friendly — large visa team. Technical rounds include coding + system design.', 'Applications open Sept–Nov for following year start.', 'https://careers.microsoft.com', true),
  ('WSP', 'Engineering', 'licensed', true, '3–5 weeks', 35, '£33,000–£38,000', 3.8, 'medium', 'WSP is very open to international engineering graduates. Chartership support (ICE, IStructE) is excellent. Portfolio of project work is essential. They value sustainability knowledge given their focus on net zero infrastructure.', 'Rolling intake throughout the year. Apply early — roles fill quickly.', 'https://www.wsp.com/careers', true),
  ('Barclays', 'Finance', 'licensed', true, '4–6 weeks', 40, '£45,000–£55,000', 3.9, 'high', 'Barclays values commercial awareness. Research their recent news and strategy before interviews. Strong visa sponsorship track record especially for Technology and Operations roles. Assessment centre includes group exercise + interview.', 'Graduate scheme opens August, closes November for following September start.', 'https://home.barclays/careers', true),
  ('Dyson', 'Technology', 'licensed', true, '4-6 weeks', 35, '£33,000', 4, 'high', 'Dyson values creativity and engineering curiosity above all. Portfolio is essential for design roles. They are based in Malmesbury (Wiltshire) — factor in relocation. Dyson sponsors international graduates and is a licensed sponsor. The assessment centre includes a design challenge.', 'Applications open October for September start.', NULL, true),
  ('Unilever', 'FMCG', 'licensed', true, '3-5 weeks', 40, '£32,000', 4, 'high', 'Unilever''s Future Leaders Programme is one of the most respected in FMCG. The assessment includes a discovery centre (online) and an in-person assessment. They value purpose-driven candidates. Unilever sponsors Graduate Route visa holders and has an established international hiring process.', 'Applications open September. Future Leaders Programme starts September following year.', NULL, true),
  ('Arup', 'Engineering', 'licensed', true, '3-5 weeks', 40, '£34,000', 4.2, 'medium', 'Arup is one of the most internationally diverse engineering firms in the UK. They actively recruit from UK universities and welcome Graduate Route visa holders. The application is project and portfolio based — demonstrate real engineering curiosity. Chartership support is excellent.', 'Applications open October-January. Rolling intake throughout the year.', NULL, true),
  ('BBC', 'Media', 'unknown', NULL, 'Unknown — verify directly with BBC', 20, '£30,000', 3.9, 'high', 'The BBC Journalism Trainee Scheme is extremely competitive with thousands of applicants. Portfolio of published work is essential. The BBC''s sponsorship position varies by role and contract type — always verify directly with the recruiter before applying. The assessment includes written exercises and panel interviews.', 'Journalism trainee scheme applications open January-February annually.', NULL, false),
  ('DeepMind', 'Technology', 'licensed', true, '6-8 weeks', 65, '£38,000', 4.5, 'high', 'DeepMind is one of the most prestigious AI research labs in the world. Roles are highly competitive and typically require PhD-level research experience for research positions. They actively sponsor international talent and have deep visa expertise given their globally recruited team. Demonstrate research publications or strong open-source contributions.', 'Applications open year-round for research and engineering roles.', NULL, true),
  ('Meta', 'Technology', 'licensed', true, '5-7 weeks', 55, '£70,000', 4.1, 'very_high', 'Meta interviews focus heavily on product sense and execution skills for PM roles, and coding/systems design for engineers. They are very internationally diverse and have excellent visa support. Prepare with Meta-specific product frameworks and study their products deeply before interviewing.', 'Applications open year-round. Process takes 4-6 weeks.', NULL, true),
  ('JPMorgan Chase', 'Finance', 'licensed', true, '4-6 weeks', 42, '£55,000', 4, 'very_high', 'JPMorgan recruits early — apply in August for the following year intake. The process includes HireVue video interviews and assessment centres. They have a well-established visa process and welcome Graduate Route applicants. Networking with current analysts on LinkedIn significantly improves success rates.', 'Applications open August, offers made October-November for following year.', NULL, true),
  ('HSBC', 'Finance', 'licensed', true, '4-6 weeks', 45, '£45,000', 3.8, 'high', 'HSBC is one of the most internationally diverse banks in the UK. The application includes online tests, video interview, and assessment centre. They sponsor both Graduate Route and Skilled Worker visas. Being multilingual is a genuine asset here given their global focus.', 'Applications open September. Graduate programmes start August/September following year.', NULL, true),
  ('Rolls-Royce', 'Engineering', 'licensed', true, '4-6 weeks', 38, '£38,000', 4, 'high', 'Rolls-Royce actively recruits international STEM graduates. The process includes online tests and a technical assessment centre. Chartership ambition (IMechE, RAeS) is valued. They have a structured visa sponsorship process and are very experienced with international candidates from top engineering universities.', 'Applications open October for September start. Early application strongly advised.', NULL, true),
  ('Amazon', 'Technology', 'licensed', true, '5-7 weeks', 50, '£65,000', 3.9, 'very_high', 'Amazon uses leadership principles in ALL interviews — prepare 2-3 STAR stories for each of the 16 principles. The bar raiser interview is the hardest. Amazon is very international-friendly and has a dedicated immigration team. Expect a written exercise (bar raiser) and multiple behavioural rounds.', 'Applications open year-round. Process takes 4-8 weeks.', NULL, true),
  ('NHS', 'Healthcare', 'licensed', true, '6-10 weeks', 30, '£32,000', 3.8, 'high', 'The NHS Graduate Management Training Scheme is one of the most internationally diverse graduate programmes in the UK. The assessment centre includes a group exercise, written exercise, and interview. NHS has extensive experience sponsoring international graduates. The visa process is longer than private sector but very reliable.', 'Applications open November–January. Assessment centres March–April.', 'https://graduates.nhs.uk', true),
  ('AstraZeneca', 'Pharmaceutical', 'licensed', true, '4-6 weeks', 48, '£38,000', 4.3, 'high', 'AstraZeneca is one of the most international-friendly employers in the UK. Being a global pharma company, they have deep experience with visa sponsorship. STEM graduates from any country are welcomed. The application includes a strengths-based interview, not competency-based — be authentic and enthusiastic.', 'Applications open October–December for September start.', 'https://astrazeneca.com/careers', true),
  ('KPMG', 'Finance', 'licensed', true, '3-5 weeks', 32, '£31,000', 3.9, 'high', 'KPMG''s process includes online tests, a job simulation, and a partner interview. They are experienced with international candidates and provide ACA qualification funding. Make clear your intention to stay in the UK long-term. KPMG recruits heavily from Russell Group universities but welcomes applications from all UK institutions.', 'Rolling applications from September. Apply as early as possible.', 'https://kpmg.com/uk/careers', true),
  ('Monzo', 'Technology', 'licensed', true, '3-4 weeks', 42, '£50,000', 4.2, 'medium', 'Monzo has a very international team and is very comfortable with Graduate Route visa holders. The interview process is practical — expect a take-home task and a structured interview. They value impact and user empathy over prestigious backgrounds. A great option if you''re targeting fintech.', 'Applications open year-round. Process takes 3-4 weeks.', 'https://monzo.com/careers', true),
  ('Clifford Chance', 'Legal', 'licensed', true, '5-8 weeks', 40, '£52,000', 4, 'very_high', 'Clifford Chance is one of the Magic Circle law firms and is extremely international — over 40% of their trainee intake are international students. Applications are open through their online portal. Vacation scheme experience is almost essential for training contract offers. They have a structured visa sponsorship process.', 'Training contract applications open November. Vacation schemes applications open earlier.', 'https://cliffordchance.com/careers', true),
  ('Goldman Sachs', 'Finance', 'licensed', true, '4-6 weeks', 45, '£55,000', 4.1, 'very_high', 'Goldman has a well-established visa process. Highlight your quantitative skills. The application has a HireVue video interview — practise structured STAR answers. Networking via LinkedIn with current analysts significantly improves your chances. They value diversity and actively recruit from international universities.', 'Applications open August, offers made November–December for the following year', 'https://goldmansachs.com/careers/students', true),
  ('Deloitte', 'Consulting', 'licensed', true, '3-5 weeks', 38, '£35,000', 4, 'high', 'Deloitte''s application includes online tests (numerical, verbal, situational) followed by a virtual interview and assessment centre. For international students, make sure your right-to-work status is clear from the start. Deloitte has a dedicated international talent team and regularly recruits from top UK universities.', 'Rolling applications from September onwards. Apply early — roles fill fast.', 'https://deloitte.com/uk/en/careers', true),
  ('Google', 'Technology', 'licensed', true, '6-8 weeks', 55, '£65,000', 4.4, 'very_high', 'Google''s hiring process involves 4-5 technical interviews focused on data structures, algorithms, and system design. For international candidates, Google''s internal visa team is excellent and very experienced. LeetCode preparation is essential. Google recruits globally and is very comfortable with Graduate Route applicants.', 'Applications open year-round. Interview process typically takes 2-3 months.', 'https://careers.google.com/students', true),
  ('McKinsey & Company', 'Consulting', 'licensed', true, '4-6 weeks', 50, '£55,000', 4.2, 'very_high', 'McKinsey uses case interviews — two rounds with two cases each. Practice with the McKinsey Problem Solving Test and peer case practice. Being international is often an advantage at McKinsey given their global client base. They have an established visa sponsorship process and regularly hire from top UK and international universities.', 'Applications typically open October–November for the following September intake.', 'https://mckinsey.com/careers/students', true),
  ('PwC', 'Finance', 'licensed', true, '3-4 weeks', 35, '£33,000', 3.9, 'high', 'PwC''s application includes online assessments, a virtual interview, and a digital assessment day. They are very experienced with international applicants and have a clear visa sponsorship process. Apply to your preferred service line (Audit, Tax, Consulting, Deals) as each recruits separately. Early applications are strongly advised.', 'Applications open September. Most roles filled by January.', 'https://pwc.co.uk/careers/students', true);

-- ===== TeamMember -> team_members =====
INSERT INTO public.team_members (name, role, bio, photo_url, linkedin_url, display_order, is_active) VALUES
  ('Diwash Poudel', 'CEO & Co-Founder', 'International student, founder, and the person who lived every problem GradPilot AI solves.', NULL, NULL, 1, true),
  ('TBC', 'Head of Product', 'Building the product experience international students deserve.', NULL, NULL, 3, true),
  ('TBC', 'Lead Engineer', 'Engineering the platform from the ground up.', NULL, NULL, 4, true),
  ('TBC', 'COO', 'Operations, strategy, and making sure we ship.', NULL, NULL, 2, true);

COMMIT;
