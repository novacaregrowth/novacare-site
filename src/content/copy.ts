// Source of truth: docs/novacare-copy.md (v3, LOCKED).
// All user-visible strings here are transcribed verbatim from that document.
// If this file and the MD disagree, the MD wins and this file gets updated.
//
// TODO: replace placeholder "https://wa.me/971XXXXXXXXX" with the real WhatsApp number.
// TODO: replace placeholder Instagram and LinkedIn URLs with real profiles.
// TODO: replace case study live URL "alyasminecenter.com" with the real URL on launch.

const WHATSAPP_HREF = "https://wa.me/971XXXXXXXXX";
const EMAIL_DISPLAY = "yazan@novacaregrowth.com";
const EMAIL_HREF = "mailto:yazan@novacaregrowth.com";

export const copy = {
  nav: {
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    cta: {
      label: "Start a project",
      href: WHATSAPP_HREF,
    },
  },

  home: {
    hero: {
      h1: "Websites and AI systems for the UAE's most ambitious clinics.",
      subhead: "Novacare builds the online presence your practice should already have. Designed, engineered, and automated by a small team obsessed with getting it right.",
      primaryCta: { label: "Start a project", href: WHATSAPP_HREF },
      secondaryCta: { label: "See our work", href: "/work" },
    },
    positioning: {
      label: "What we do",
      body: [
        "Most clinics in the UAE are losing patients every week. A slow website. DMs that go unanswered for hours. A booking flow that makes people give up before they reach a calendar. These are not design problems. They are revenue problems.",
        "Novacare builds fast, high-end websites for wellness centers, therapy practices, and medical clinics across the UAE, and pairs them with AI systems that handle the parts of your practice that shouldn't need a human. Instant replies on WhatsApp. 24/7 booking. Automatic follow-ups. You keep the human work. We automate the rest.",
      ],
    },
    phoneScene: {
      headline: "Every clinic in the UAE loses patients like this.",
    },
    services: {
      label: "How we work together",
      tiers: [
        {
          name: "Clinic Site",
          price: "from AED 6,500 setup + AED 850/month",
          blurb: "A high-end, custom-designed website that replaces every half-finished, outdated, template-based thing your clinic has lived with for years.",
          details: "Custom design, five pages, bilingual-ready (EN/AR), integrated booking, WhatsApp throughout, hosted on the same infrastructure as OpenAI and Perplexity. Monthly fee covers hosting, domain, email, maintenance, content changes, security, and performance monitoring.",
          launch: "Launch in 10 to 14 days.",
          cta: { label: "Start a project", href: WHATSAPP_HREF },
        },
        {
          name: "Clinic Site + AI Reception",
          price: "from AED 12,000 setup + AED 1,800/month",
          blurb: "Everything in Clinic Site, plus a WhatsApp AI agent that replies in under 10 seconds, around the clock, in Arabic and English.",
          details: "Trained on your clinic's services, hours, prices, and tone of voice. Qualifies new patients, books consultations directly into your calendar, and escalates complex or sensitive messages to your team. Monthly fee covers everything above plus ongoing tuning of the AI agent.",
          launch: "Launch in 3 to 4 weeks.",
          cta: { label: "Start a project", href: WHATSAPP_HREF },
        },
        {
          name: "Growth System",
          price: "from AED 20,000 setup + AED 3,500/month",
          blurb: "The full practice, automated. For clinics ready to scale past the owner's inbox.",
          details: "Everything in Clinic Site + AI Reception, plus Instagram DM automation, no-show follow-up flows, review request automation, ad landing pages, and a monthly performance dashboard.",
          addOn: "Fully managed Meta and Google ads, handled by us end to end. Pricing depends on your monthly ad budget and campaign goals, so we scope this on a call.",
          launch: "Launch in 4 to 6 weeks.",
          cta: { label: "Book a call", href: "/contact" },
        },
      ],
    },
    caseStudy: {
      label: "Recent work",
      headline: "Al Yasmine Center. A therapy practice with 120,000+ followers, now with a home online.",
      body: "Alia Bahri built one of the most trusted therapy presences in the UAE. Thousands of DMs a week. A waiting list. A community of 120,000+ people following her work on Instagram. What was missing was a proper digital home. We designed and built it.",
      cta: { label: "See the case study", href: "/work/al-yasmine" },
    },
    why: {
      label: "Why Novacare",
      points: [
        {
          title: "We don't use templates.",
          body: "Every Novacare site is designed from a blank canvas. No WordPress themes, no drag-and-drop builders, no shortcuts. Your clinic is not a template.",
        },
        {
          title: "We ship, then we stay.",
          body: "Most agencies vanish the week after launch. We handle everything after. Hosting, updates, content changes, performance, security. For one flat monthly fee.",
        },
        {
          title: "We write code, not prompts.",
          body: "Our sites are built on Next.js, TypeScript, and Vercel. The same stack used by OpenAI, Notion, and the world's leading tech companies. Fast today. Maintainable for years.",
        },
        {
          title: "We work with a small number of clinics at once.",
          body: "We take on a limited number of clients each quarter so every project gets real attention. If we're at capacity, we'll tell you, and we'll tell you when a slot opens.",
        },
      ],
    },
    closing: {
      h2: "Let's build something you're proud to send people to.",
      sub: "Tell us about your clinic. We'll reply within the day.",
      primaryCta: { label: "Message us on WhatsApp", href: WHATSAPP_HREF },
      secondaryCta: { label: EMAIL_DISPLAY, href: EMAIL_HREF },
    },
  },

  work: {
    hero: {
      h1: "Selected work.",
      sub: "A small, growing collection of websites and systems we've built for UAE clinics.",
    },
    capacityNote: "We're currently taking on three new clinics this quarter. If you'd like to be one of them, let's talk.",
    cta: { label: "Start a project", href: WHATSAPP_HREF },
  },

  caseStudy: {
    client: "Alia Bahri, Al Yasmine Center",
    location: "Dubai, UAE",
    scope: "Website design, development, hosting, ongoing maintenance",
    timeline: "14 days, kickoff to launch",
    live: "alyasminecenter.com",
    brief: [
      "Alia Bahri is one of the most-followed therapists in the UAE. Her practice at Al Yasmine Center serves clients across the country, and her community on Instagram has grown past 120,000 people who follow her for honest, bilingual guidance on mental health, relationships, and self-work.",
      "There was one missing piece. No website. Every potential client had to DM her, wait for a reply, and book through a chain of back-and-forth messages. She needed a digital home that matched the standard of her practice.",
    ],
    approach: [
      "We built the site around three decisions.",
      "One. The tone of the site had to feel like her. Warm, honest, direct, not clinical.",
      "Two. The booking flow had to be three taps. Every extra step was a client lost.",
      "Three. The site had to load instantly on a phone, because that is how every single visitor would arrive.",
      "We built it on Next.js, deployed through Vercel, with a booking system integrated directly into her calendar. No WordPress. No page builders. No plugins that would break in six months.",
    ],
    // TODO (from source copy, "The work"): insert 4 to 6 screenshots in the case
    // study layout: desktop hero, mobile hero, service or bio page, booking flow,
    // detail shot. Not a data field; handled in the component layer.
    // TODO (from source copy, "The outcome"): when real metrics exist, add a short
    // stat line here (e.g. "Booking requests up 3x in the first month.").
    // Don't invent numbers.
    outcome: [
      "Alia now points her Instagram bio, her replies, and her referrals to one link. Her new clients see a proper first impression of the practice before they ever message her.",
    ],
    testimonial: {
      quote: "Yazan and Hamza understood what I was building without me having to explain twice. The site feels like the practice, not a generic therapy page. And they've been there every week since we launched to keep it running.",
      author: "Alia Bahri",
      role: "Founder, Al Yasmine Center",
    },
    closingCta: { label: "Start a project", href: WHATSAPP_HREF },
  },

  services: {
    hero: {
      h1: "Three ways to work with us.",
      sub: "Each tier is a complete system, not a menu of add-ons. Our pricing is public because your time is worth more than a sales funnel.",
    },
    tiers: [
      {
        name: "Clinic Site",
        price: "from AED 6,500 setup + AED 850/month",
        tagline: "For clinics that need a proper online home before anything else.",
        includesLabel: "What's included:",
        includes: [
          "Custom design from a blank canvas. No templates.",
          "Five pages: Home, Services, About, Team, Contact.",
          "Mobile-first, loads in under a second.",
          "Booking system integrated with your calendar.",
          "WhatsApp CTAs throughout.",
          "Bilingual-ready (English and Arabic).",
          "SEO setup and Google Business connection.",
          "Hosting on Vercel, the infrastructure trusted by OpenAI, Notion, and Perplexity.",
          "Domain management, email setup if you need it, SSL, security, performance monitoring.",
          "Monthly content changes, updates, and maintenance, included.",
        ],
        timeline: "10 to 14 days from kickoff to launch.",
        idealFor: "solo practitioners, new clinics, or practices replacing a dated site.",
        cta: { label: "Start a project", href: WHATSAPP_HREF },
      },
      {
        name: "Clinic Site + AI Reception",
        price: "from AED 12,000 setup + AED 1,800/month",
        tagline: "For clinics losing patients to slow replies.",
        includesLabel: "Everything in Clinic Site, plus:",
        includes: [
          "WhatsApp AI agent trained on your clinic, services, hours, prices, and tone of voice.",
          "Replies in under 10 seconds, 24/7.",
          "Fluent in Arabic and English.",
          "Qualifies new patients and books consultations directly into your calendar.",
          "Escalates complex or sensitive messages to your team instantly.",
          "Monthly review of agent conversations and continuous tuning.",
          "Full conversation logs, searchable and exportable at any time.",
        ],
        timeline: "3 to 4 weeks from kickoff to launch.",
        idealFor: "clinics with steady DM volume who are losing leads after hours, on weekends, or during staff breaks.",
        cta: { label: "Start a project", href: WHATSAPP_HREF },
      },
      {
        name: "Growth System",
        price: "from AED 20,000 setup + AED 3,500/month",
        tagline: "For clinics ready to scale past the owner's inbox.",
        includesLabel: "Everything in Clinic Site + AI Reception, plus:",
        includes: [
          "Instagram DM automation with the same AI agent.",
          "No-show follow-up flows via SMS and WhatsApp.",
          "Review request automation for satisfied patients.",
          "Dedicated ad landing pages built for Meta and Google campaigns.",
          "Monthly performance dashboard covering bookings, replies, conversions, traffic, and revenue attribution.",
          "Quarterly strategy session with both founders.",
        ],
        addOn: "Fully managed Meta and Google ads, handled by us end to end. Targeting, creative, copy, daily optimization, reporting. Pricing depends on your monthly ad budget and campaign scope, so we scope this live on a call.",
        timeline: "4 to 6 weeks from kickoff to launch.",
        idealFor: "multi-practitioner clinics, medical centers, and aesthetic practices running or preparing for paid growth.",
        cta: { label: "Book a call", href: "/contact" },
      },
    ],
    faq: [
      {
        q: "How do payments work?",
        a: "Setup fees are split: 50% to start, 50% on launch. The monthly retainer begins the month after launch and is billed on the 1st.",
      },
      {
        q: "Do you only work with clinics in Dubai?",
        a: "No. We work with clinics across the UAE and occasionally elsewhere in the GCC. We're based in Dubai.",
      },
      {
        q: "Do you handle Arabic content?",
        a: "Yes. Every site is built bilingual-ready. You can launch in English only and add Arabic later, or launch with both from day one. We work with native Arabic writers for final copy when needed.",
      },
      {
        q: "What if I already have a website?",
        a: "We'll look at it and tell you honestly whether it needs a rebuild or just improvements. If it's already good, we'll tell you that too.",
      },
      {
        q: "Can I cancel the monthly retainer?",
        a: "Yes, with 30 days' notice. You own the site and the code regardless.",
      },
      {
        q: "Who owns the code and content?",
        a: "You do. Fully. If you ever leave, you take everything with you.",
      },
      {
        q: "Are you compliant with DHA, DOH, and MOH marketing rules?",
        a: "We build with regulatory sensitivity. No unverified medical claims, no before/after misuse, no off-license language. For formal compliance review, we recommend your clinic's legal or compliance contact sign off on final copy before launch.",
      },
      {
        q: "What tools and platforms do you use?",
        a: "Next.js and TypeScript for the website. Vercel for hosting. Claude and OpenAI for the AI systems. n8n and Make for workflow automation. WhatsApp Business API for messaging.",
      },
      {
        q: "How many clients do you take on?",
        a: "A small number each quarter. If we're at capacity, we'll tell you and we'll tell you when a slot opens. We'd rather turn down work than deliver a half-finished site.",
      },
    ],
  },

  about: {
    hero: {
      h1: "A small studio for clinics that deserve better.",
      sub: "Novacare Growth is based in Dubai. We build websites and AI systems for wellness centers, therapy practices, and medical clinics across the UAE.",
    },
    body: [
      "Novacare was started by Yazan Ghawi and Hamza Barakat in 2025. We started it for a simple reason. The best clinics in the UAE deserve better websites than they have.",
      "Most clinic sites fall into one of three categories. A decade old and built on something no one maintains anymore. A template that doesn't match the care the clinic actually gives. Or, more recently, a site slapped together in a weekend with a drag-and-drop AI tool. Meanwhile, the best clinics are losing patients every day to slow load times, broken booking flows, and DMs that go unanswered for hours.",
      "We built Novacare to close that gap. We're small on purpose. We take on a limited number of clients at once so every project gets real attention, from the first conversation through every month after launch. We design, we write, we engineer, we automate, and we stay for the long-term maintenance that most agencies skip.",
      "Our first client was Alia Bahri at Al Yasmine Center, a therapist with a 120,000+ community in the UAE. We built her website from the ground up and continue to manage it. That is the kind of work we want to keep doing.",
    ],
    founders: [
      {
        name: "Yazan Ghawi",
        role: "Co-founder. Design and client work.",
        bio: "Yazan leads design and client relationships at Novacare. He oversees every project from the first conversation through launch, works directly with each clinic on brand direction, and handles the ongoing relationship after a site goes live. Based in Dubai.",
      },
      {
        name: "Hamza Barakat",
        role: "Co-founder. Engineering and automation.",
        bio: "Hamza leads engineering and automation at Novacare. He builds the websites, designs the AI systems, and handles everything technical: performance, security, integrations, and the infrastructure that keeps clients' sites running fast and reliably. Based in Dubai.",
      },
    ],
    closing: "If you run a clinic and you've been meaning to sort out your website or your lead flow for a while, we'd love to talk.",
    cta: { label: "Start a project", href: WHATSAPP_HREF },
  },

  contact: {
    hero: {
      h1: "Let's talk.",
      sub: "Tell us about your clinic. We reply within the day.",
    },
    options: [
      {
        label: "WhatsApp",
        tagline: "The fastest way.",
        action: "Click to message",
        href: WHATSAPP_HREF,
      },
      {
        label: "Email",
        tagline: "For longer conversations.",
        action: EMAIL_DISPLAY,
        href: EMAIL_HREF,
      },
      {
        label: "Book a call",
        tagline: "20 minutes, free.",
        action: "Pick a time",
        href: "/book",
      },
    ],
    location: {
      name: "Novacare Growth",
      address: "Dubai, United Arab Emirates",
      note: "We work with clinics across the UAE. Meetings on Zoom, WhatsApp video, or in person at your clinic.",
    },
  },

  footer: {
    tagline: "Novacare Growth",
    location: "Dubai, United Arab Emirates",
    // TODO: add trade license number when issued (source MD footer, left column).
    sections: {
      navigate: [
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      connect: [
        { label: "WhatsApp", href: WHATSAPP_HREF },
        { label: "Email", href: EMAIL_HREF },
        { label: "Instagram", href: "https://instagram.com/novacaregrowth" },
        { label: "LinkedIn", href: "https://linkedin.com/company/novacaregrowth" },
      ],
    },
    legal: "© 2026 Novacare Growth.",
  },
} as const;
