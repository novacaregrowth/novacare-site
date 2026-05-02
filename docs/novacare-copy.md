# Novacare Growth — Full Site Copy (v4, LOCKED)

> Source of truth for every piece of text on novacaregrowth.com. If this document and a component disagree, this document wins. All copy follows the voice rules in the project instructions: no em dashes, no AI-slop phrases, direct and confident.
>
> v4 update: home page restructured to reflect the cinematic scroll arc that shipped in Beat 1 (PhoneScene). Old prose-heavy Positioning section retired. Beats 2 through 5 reserved for upcoming builds.

---

## Global

### Navigation

Links (in order): Work, Services, About, Contact

Primary CTA: "Start a project" → WhatsApp link (`https://wa.me/971XXXXXXXXX` — replace with real number)

### Wordmark

"Novacare" in Fraunces serif + "GROWTH" in Inter caps, small tracking. Displayed side by side.

### Footer

- Left column: Novacare Growth · Dubai, United Arab Emirates · [Trade License number when issued]
- Middle column: Work · Services · About · Contact
- Right column: WhatsApp · Email · Instagram · LinkedIn
- Bottom line: © 2026 Novacare Growth.

---

## Home

The home page is built as a sequence of scroll-driven beats, not a stack of conventional sections. Each beat is a moment in a single argument: problem → solution → proof → offer → close. The cinematic phase (Beats 1 through 3) does the emotional work. The practical phase (Beats 4 through 5) does the conversion work.

### Beat 0 — Hero (SHIPPED)

**H1**: Websites and AI systems for the UAE's most ambitious clinics.

**Subhead**: Novacare builds the online presence your practice should already have. Designed, engineered, and automated by a small team obsessed with getting it right.

**Primary CTA**: Start a project → WhatsApp
**Secondary CTA**: See our work → `/work`

**Visual treatment**: Word-by-word fade-in on H1 (60ms stagger, 600ms duration each). Background video is an ambient amber smoke-through-pendant-light loop generated via Veo 3.1, with a three-stop left-to-right gradient overlay for text legibility, and a bottom 30% fade-to-black for transition continuity into Beat 1.

### Beat 1 — The Problem / PhoneScene (SHIPPED)

A scroll-driven scene replacing what used to be the prose Positioning section. Three iPhone-style mockups show three UAE clinics' messaging inboxes filling with unanswered patient inquiries. No paragraphs. The argument is made visually.

**Composition**:
- Phone 1 (left): dr.sara.derma — Instagram-style DM list (dermatology clinic)
- Phone 2 (center): waveclinic.therapy — WhatsApp-style chats list (therapy practice)
- Phone 3 (right): skylinedental.dxb — Instagram-style DM list (dental clinic)

Each phone shows seven real-sounding UAE patient names (Fatima Al Mansouri, Mohammed Al Rashid, Hassan Al Falasi, etc.) with realistic message previews like "Hi, I'd like to book a dermatology consultation for next week, are you available?" and "Looking for a therapist for anxiety, do you have availability this month?"

As the user scrolls:
- The clock on each phone advances 9:41 → 10:15 → 12:30 → 2:47 → 5:12 → 8:33
- Battery drains from 100% to 23%
- Timestamps age (5m → 2h → 1d → 3d ago, with subtle per-phone variation: therapy fills fastest, dental is most-neglected)
- Unread message counts tick up (3 → 7, 5 → 14, 2 → 23)
- New messages slide in from above with parent-phone scale pulse on each insert
- Phones receive a subtle desaturation and warm glow as the scene progresses

**Headline (revealed at end of scroll arc, scroll progress 0.7 → 0.85, then dwells through 1.0)**:
"Every clinic in the UAE loses patients like this."

The word "loses" appears in terracotta. The rest stays bone serif. No subhead, no CTA in this beat — the headline is the whole point.

**Why this beat**: the previous prose version of Positioning argued the same point in two paragraphs. The visual scene argues it in 30 seconds of scroll. Same thesis, different conversion mechanism. The reader feels the loss, not just understands it.

### Beat 2 — The Answer / AI Reception scene (PLANNED, NOT YET BUILT)

The inverse of Beat 1. Where Beat 1 shows clinics losing patients to silence, Beat 2 shows what happens when a clinic uses Novacare. A patient sends a message. Eight seconds later, an AI agent in clinic tone replies. The booking is confirmed. The patient is closed before they would have moved on to a competitor.

**Tentative composition** (subject to design pass):
- Single phone, centered (or split-screen showing the same conversation from both patient and clinic sides)
- Scroll-driven message exchange: patient inquiry, brief typing indicator, AI reply, follow-up, booking confirmation
- Tone of the AI must match real clinic warmth — not corporate, not chatbot
- Visual climax: the booking confirmation card appearing in the conversation

**Tentative headline**:
"This is what they message back when you let them."

(Subject to revision once the visual is locked.)

**Why this beat**: Beat 1 created tension. Beat 2 must release it. Without this release, the visitor leaves the page anxious about a problem instead of confident in the solution.

### Beat 3 — Featured case study / Al Yasmine (PLANNED, NOT YET BUILT)

Visual proof. A scroll-driven device frame (laptop or browser-window mockup) showing alyasminecenter.com being toured. The visitor sees the actual site we built for our actual client.

**Headline**:
"Al Yasmine Center. A therapy practice with 120,000+ followers, now with a home online."

**Body**:
Alia Bahri built one of the most trusted therapy presences in the UAE. Thousands of DMs a week. A waiting list. A community of 120,000+ people following her work on Instagram. What was missing was a proper digital home. We designed and built it.

**CTA**: See the case study → /work/al-yasmine

### Beat 4 — Services tiers (PLANNED, NOT YET BUILT)

The practical phase begins here. Three tier cards with visible pricing. Hover to expand details. This is where copy.ts finally does heavy lifting — the cinematic phase ends, the conversion phase begins.

**Label**: How we work together

**Tier 1 — Clinic Site**
- Price: from AED 6,500 setup + AED 850/month
- Blurb: A high-end, custom-designed website that replaces every half-finished, outdated, template-based thing your clinic has lived with for years.
- Details: Custom design, five pages, bilingual-ready (EN/AR), integrated booking, WhatsApp throughout, hosted on the same infrastructure as OpenAI and Perplexity. Monthly fee covers hosting, domain, email, maintenance, content changes, security, and performance monitoring.
- Launch: Launch in 10 to 14 days.
- CTA: Start a project → WhatsApp

**Tier 2 — Clinic Site + AI Reception**
- Price: from AED 12,000 setup + AED 1,800/month
- Blurb: Everything in Clinic Site, plus a WhatsApp AI agent that replies in under 10 seconds, around the clock, in Arabic and English.
- Details: Trained on your clinic's services, hours, prices, and tone of voice. Qualifies new patients, books consultations directly into your calendar, and escalates complex or sensitive messages to your team. Monthly fee covers everything above plus ongoing tuning of the AI agent.
- Launch: Launch in 3 to 4 weeks.
- CTA: Start a project → WhatsApp

**Tier 3 — Growth System**
- Price: from AED 20,000 setup + AED 3,500/month
- Blurb: The full practice, automated. For clinics ready to scale past the owner's inbox.
- Details: Everything in Clinic Site + AI Reception, plus Instagram DM automation, no-show follow-up flows, review request automation, ad landing pages, and a monthly performance dashboard.
- Add-on: Fully managed Meta and Google ads, handled by us end to end. Pricing depends on your monthly ad budget and campaign goals, so we scope this on a call.
- Launch: Launch in 4 to 6 weeks.
- CTA: Book a call → /contact

### Beat 5 — Why Novacare (PLANNED, NOT YET BUILT)

**Label**: Why Novacare

Four statements, typography-driven, generous spacing, no icons:

**We don't use templates.**
Every Novacare site is designed from a blank canvas. No WordPress themes, no drag-and-drop builders, no shortcuts. Your clinic is not a template.

**We ship, then we stay.**
Most agencies vanish the week after launch. We handle everything after. Hosting, updates, content changes, performance, security. For one flat monthly fee.

**We write code, not prompts.**
Our sites are built on Next.js, TypeScript, and Vercel. The same stack used by OpenAI, Notion, and the world's leading tech companies. Fast today. Maintainable for years.

**We work with a small number of clinics at once.**
We take on a limited number of clients each quarter so every project gets real attention. If we're at capacity, we'll tell you, and we'll tell you when a slot opens.

### Beat 6 — Closing CTA (PLANNED, NOT YET BUILT)

**H2**: Let's build something you're proud to send people to.

**Subhead**: Tell us about your clinic. We'll reply within the day.

**Capacity indicator (small caption above H2)**: Three slots remaining this quarter.

**Primary CTA**: Message us on WhatsApp
**Secondary CTA**: yazan@novacaregrowth.com (replace with real email)

---

## Work (index page)

**H1**: Selected work.

**Subhead**: A small, growing collection of websites and systems we've built for UAE clinics.

Grid of case studies. Currently one (Al Yasmine).

**Capacity note (below grid)**: We're currently taking on three new clinics this quarter. If you'd like to be one of them, let's talk.

**CTA**: Start a project → WhatsApp

---

## Case Study — Al Yasmine Center

**Client**: Alia Bahri, Al Yasmine Center
**Location**: Dubai, UAE
**Scope**: Website design, development, hosting, ongoing maintenance
**Timeline**: 14 days, kickoff to launch
**Live**: alyasminecenter.com (replace with real URL)

### The brief

Alia Bahri is one of the most-followed therapists in the UAE. Her practice at Al Yasmine Center serves clients across the country, and her community on Instagram has grown past 120,000 people who follow her for honest, bilingual guidance on mental health, relationships, and self-work.

There was one missing piece. No website. Every potential client had to DM her, wait for a reply, and book through a chain of back-and-forth messages. She needed a digital home that matched the standard of her practice.

### The approach

We built the site around three decisions.

One. The tone of the site had to feel like her. Warm, honest, direct, not clinical.

Two. The booking flow had to be three taps. Every extra step was a client lost.

Three. The site had to load instantly on a phone, because that is how every single visitor would arrive.

We built it on Next.js, deployed through Vercel, with a booking system integrated directly into her calendar. No WordPress. No page builders. No plugins that would break in six months.

### The work

(Insert 4 to 6 screenshots: desktop hero, mobile hero, service or bio page, booking flow, detail shot.)

### The outcome

Alia now points her Instagram bio, her replies, and her referrals to one link. Her new clients see a proper first impression of the practice before they ever message her.

(When real metrics exist, add a short stat line here. Example: "Booking requests up 3x in the first month." Don't invent numbers.)

### In her words

(Pull quote from Alia, two to four sentences. Placeholder example of what to ask her for:)

> "Yazan and Hamza understood what I was building without me having to explain twice. The site feels like the practice, not a generic therapy page. And they've been there every week since we launched to keep it running."

**Alia Bahri, Founder, Al Yasmine Center**

### Want work like this for your clinic?

**CTA**: Start a project → WhatsApp

---

## Services page

### Hero

**H1**: Three ways to work with us.

**Subhead**: Each tier is a complete system, not a menu of add-ons. Our pricing is public because your time is worth more than a sales funnel.

### Clinic Site — from AED 6,500 setup + AED 850/month

*For clinics that need a proper online home before anything else.*

**What's included:**
- Custom design from a blank canvas. No templates.
- Five pages: Home, Services, About, Team, Contact.
- Mobile-first, loads in under a second.
- Booking system integrated with your calendar.
- WhatsApp CTAs throughout.
- Bilingual-ready (English and Arabic).
- SEO setup and Google Business connection.
- Hosting on Vercel, the infrastructure trusted by OpenAI, Notion, and Perplexity.
- Domain management, email setup if you need it, SSL, security, performance monitoring.
- Monthly content changes, updates, and maintenance, included.

**Timeline**: 10 to 14 days from kickoff to launch.
**Ideal for**: solo practitioners, new clinics, or practices replacing a dated site.
**CTA**: Start a project

### Clinic Site + AI Reception — from AED 12,000 setup + AED 1,800/month

*For clinics losing patients to slow replies.*

**Everything in Clinic Site, plus:**
- WhatsApp AI agent trained on your clinic, services, hours, prices, and tone of voice.
- Replies in under 10 seconds, 24/7.
- Fluent in Arabic and English.
- Qualifies new patients and books consultations directly into your calendar.
- Escalates complex or sensitive messages to your team instantly.
- Monthly review of agent conversations and continuous tuning.
- Full conversation logs, searchable and exportable at any time.

**Timeline**: 3 to 4 weeks from kickoff to launch.
**Ideal for**: clinics with steady DM volume who are losing leads after hours, on weekends, or during staff breaks.
**CTA**: Start a project

### Growth System — from AED 20,000 setup + AED 3,500/month

*For clinics ready to scale past the owner's inbox.*

**Everything in Clinic Site + AI Reception, plus:**
- Instagram DM automation with the same AI agent.
- No-show follow-up flows via SMS and WhatsApp.
- Review request automation for satisfied patients.
- Dedicated ad landing pages built for Meta and Google campaigns.
- Monthly performance dashboard covering bookings, replies, conversions, traffic, and revenue attribution.
- Quarterly strategy session with both founders.

**Optional add-on**: Fully managed Meta and Google ads, handled by us end to end. Targeting, creative, copy, daily optimization, reporting. Pricing depends on your monthly ad budget and campaign scope, so we scope this live on a call.

**Timeline**: 4 to 6 weeks from kickoff to launch.
**Ideal for**: multi-practitioner clinics, medical centers, and aesthetic practices running or preparing for paid growth.
**CTA**: Book a call

### FAQ

**How do payments work?**
Setup fees are split: 50% to start, 50% on launch. The monthly retainer begins the month after launch and is billed on the 1st.

**Do you only work with clinics in Dubai?**
No. We work with clinics across the UAE and occasionally elsewhere in the GCC. We're based in Dubai.

**Do you handle Arabic content?**
Yes. Every site is built bilingual-ready. You can launch in English only and add Arabic later, or launch with both from day one. We work with native Arabic writers for final copy when needed.

**What if I already have a website?**
We'll look at it and tell you honestly whether it needs a rebuild or just improvements. If it's already good, we'll tell you that too.

**Can I cancel the monthly retainer?**
Yes, with 30 days' notice. You own the site and the code regardless.

**Who owns the code and content?**
You do. Fully. If you ever leave, you take everything with you.

**Are you compliant with DHA, DOH, and MOH marketing rules?**
We build with regulatory sensitivity. No unverified medical claims, no before/after misuse, no off-license language. For formal compliance review, we recommend your clinic's legal or compliance contact sign off on final copy before launch.

**What tools and platforms do you use?**
Next.js and TypeScript for the website. Vercel for hosting. Claude and OpenAI for the AI systems. n8n and Make for workflow automation. WhatsApp Business API for messaging.

**How many clients do you take on?**
A small number each quarter. If we're at capacity, we'll tell you and we'll tell you when a slot opens. We'd rather turn down work than deliver a half-finished site.

---

## About

### Hero

**H1**: A small studio for clinics that deserve better.

**Subhead**: Novacare Growth is based in Dubai. We build websites and AI systems for wellness centers, therapy practices, and medical clinics across the UAE.

### Body

Novacare was started by Yazan Ghawi and Hamza Barakat in 2025. We started it for a simple reason. The best clinics in the UAE deserve better websites than they have.

Most clinic sites fall into one of three categories. A decade old and built on something no one maintains anymore. A template that doesn't match the care the clinic actually gives. Or, more recently, a site slapped together in a weekend with a drag-and-drop AI tool. Meanwhile, the best clinics are losing patients every day to slow load times, broken booking flows, and DMs that go unanswered for hours.

We built Novacare to close that gap. We're small on purpose. We take on a limited number of clients at once so every project gets real attention, from the first conversation through every month after launch. We design, we write, we engineer, we automate, and we stay for the long-term maintenance that most agencies skip.

Our first client was Alia Bahri at Al Yasmine Center, a therapist with a 120,000+ community in the UAE. We built her website from the ground up and continue to manage it. That is the kind of work we want to keep doing.

### The founders

**Yazan Ghawi** — *Co-founder. Design and client work.*

Yazan leads design and client relationships at Novacare. He oversees every project from the first conversation through launch, works directly with each clinic on brand direction, and handles the ongoing relationship after a site goes live. Based in Dubai.

**Hamza Barakat** — *Co-founder. Engineering and automation.*

Hamza leads engineering and automation at Novacare. He builds the websites, designs the AI systems, and handles everything technical: performance, security, integrations, and the infrastructure that keeps clients' sites running fast and reliably. Based in Dubai.

### Closing

If you run a clinic and you've been meaning to sort out your website or your lead flow for a while, we'd love to talk.

**CTA**: Start a project → WhatsApp

---

## Contact

### Hero

**H1**: Let's talk.

**Subhead**: Tell us about your clinic. We reply within the day.

### Options

**WhatsApp** — *The fastest way.*
Click to message → `https://wa.me/971XXXXXXXXX`

**Email** — *For longer conversations.*
yazan@novacaregrowth.com → `mailto:yazan@novacaregrowth.com`

**Book a call** — *20 minutes, free.*
Pick a time → `/book` (Cal.com embed)

### Location

Novacare Growth
Dubai, United Arab Emirates

We work with clinics across the UAE. Meetings on Zoom, WhatsApp video, or in person at your clinic.
