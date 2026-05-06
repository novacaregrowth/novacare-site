# Novacare Growth — Marketing Site

## Project documentation

Full reference docs live in `docs/`. When a task relates to copy, design system, pricing, ICP, outreach, or Claude Code workflow, read the matching file in `docs/` first.

## About this project

This is the marketing website for Novacare Growth, a UAE-based agency that builds websites and AI automations for wellness clinics, therapy practices, dental clinics, and medical centers.

Target visitor: UAE clinic owners and practice managers. They are non-technical business buyers who need to trust us fast. The site must feel premium, confident, and sophisticated. NOT a typical "agency" site with stock photos and vague claims.

## Current status

Shipped:
- Hero / Beat 0 (Veo 3.1 ambient video, word-by-word fade-in, three-stop gradient overlay, bottom fade-to-black for transition continuity)
- PhoneScene / Beat 1 (three app-distinct iPhone mockups, scroll-driven cinematic, focus-pull entrance, mouse-driven 3D parallax, real UAE patient names, time-evolving status bars, AnimatePresence message inserts, full Dynamic Island and home indicator and screen reflection fidelity, full reduced-motion path; mobile pass deferred — desktop is shipping quality, mobile gets min-h-screen with no large empty stretches but no cinematic-quality treatment yet)
- AIAnswerScene / Beat 2 (single phone, WhatsApp-feeling chat, 6-message conversation between Layla Al Suwaidi and Maison Aesthetic, scroll-coupled state machine over 600vh desktop / 550vh mobile, milestone-based reveal, mouse parallax, layered phone parallax, diagonal screen reflection responsive to cursor, two-layer warm radial glow, vignette, contact shadow, 3D entrance arc, confirmation card climax with terracotta accent, headline cascade with letter-spacing animation, full reduced-motion path; bottom-edge gradient mask for smooth transition into Beat 4)
- Services / Beat 4 v4 (three-panel side-by-side layout with three distinct architectures: Tier 1 browser-led, Tier 2 conversation-led, Tier 3 dashboard-led. Center-stage emphasis on Tier 2 with terracotta top border + bg-card-elevated. Section entry choreography: artifacts seed first, terracotta atmospheric sweep passes left to right, panel chrome materializes around each artifact via animated borderColor + backgroundColor, internal cascade per panel. Three living artifacts: ArtifactBrowserLarge with hover-driven scroll to booking page mockup, ArtifactPhoneReal with three-message conversation between Patient and Maison Aesthetic plus hover replay, ArtifactDashboard with primary metric counter, line chart, three secondary metrics, and hover refresh. Three distinct feature treatments: FeaturesPoem asymmetric indentation for Tier 1, FeaturesConversation left-aligned fragments for Tier 2, FeaturesCapabilities tighter tracking for Tier 3. rounded-2xl panel corners. Gradient hairline separators. Compressed ~1.2s entry choreography with useInView amount: 0.05 trigger. Layered parallax on panel hover. Full reduced-motion path)
- WhyNovacare / Beat 5 (Patek-restrained header, no visible H2: section opens with the WHY NOVACARE caption then drops straight into the four pillars. 2x2 grid on desktop, single column on mobile. Fraunces serif numerals 01-04 in weight 300 at 36/48px stone-soft anchor each pillar, replacing the per-pillar terracotta hairlines. Terracotta survives at the section header level only. Pillars cascade on viewport entry with PRE_PILLARS_DELAY_S 0.8s and 0.4s pillar-to-pillar stagger, total beat lands at ~3.7s. Per pillar: numeral fade-up, h3 heading with word-by-word reveal mirroring Hero/Services pattern, body paragraph. Per-pillar useScroll plus useTransform fades each body between 0.3 and 1.0 opacity as the pillar passes through viewport center, while headings and numerals stay solid throughout. Visually-hidden h2 with id why-heading provides landmark naming via aria-labelledby. Full reduced-motion path renders all bodies at full opacity with no scroll coupling.)
- SmoothScroll provider wired globally via Lenis in layout.tsx
- shadcn/ui initialized with Card primitive
- copy.ts contains hero, phoneScene, aiAnswerScene, services with v4 shape (sectionLabel, headline, subhead, tiers with introHeader, dashboard data on tier3, addon), and why (label, four points with title and body)

Skipped for now:
- Beat 3 (Al Yasmine featured case study) — postponed because alyasminecenter.com is still being rebuilt. Will return to it after Alia's site ships.

Mobile audit pending:
- Beats 1, 2, and 4 each have known mobile issues. PhoneScene was built desktop-only. AIAnswerScene's phone may overflow at 375px. Beat 4 needs mobile validation post-fixes. A focused mobile audit session is the next priority before adding more beats.

Next: Mobile audit, then Beat 6 (Closing CTA) for the home page.

Planned but not built:
- Beat 6 (Closing CTA with capacity indicator)
- Work index page
- Services page
- About page
- Contact page
- Case study detail page (Al Yasmine, when ready)

## Design positioning

Dark luxury, warm-toned, quietly confident, editorial. Permanently dark mode, no light mode ever. References: Rolls-Royce, The Macallan, Audemars Piguet, Armani Casa, Ace Hotel (for booking friction only).

NOT: modern SaaS (Linear, Stripe), wellness-clinic-soft (Aesop), generic agency, Behance-portfolio-style, anything with shimmer or glow or orbiting effects.

## Design principles

- Editorial and minimalist. Typography does most of the visual work.
- Negative space is a feature, not a bug. Don't fill every pixel.
- Restraint always wins. Decoration must justify its presence.
- Terracotta accent appears on ~5% of the page maximum.
- No stock photography. No AI-generated imagery. No generic icon usage on Why Novacare or service tiers (typography carries meaning there).

## Color palette (CSS variables in globals.css)

- --ink: #0A0A0A           (dominant background, 70-85% of every page)
- --bone: #F4F1EA          (primary text on dark, warm cream)
- --card: #1A1410          (subtly elevated surfaces, cards, tooltips)
- --card-elevated: #1F1812 (Tier 2 center-stage panel background, slightly warmer than card)
- --espresso: #2B1F17      (deep warm surfaces, feature blocks, used sparingly)
- --terracotta: #C86D4F    (CTAs, hover, focus, accent — max ~5% of page pixels)
- --stone-soft: #8A8378    (secondary text, captions, supporting info)
- --stone: #6B655C         (tertiary text, fine print, subtle labels)
- --border-warm: #2A2520   (hairline dividers, card outlines, input borders)
- --bubble-sent: #3A2820   (sent message bubble background, used in Beat 2 phone and Tier 2 artifact)

Always via CSS variables (Tailwind utilities like `bg-ink`, `text-bone`, `border-border-warm`, `bg-card-elevated`). Never hardcode hex values in components. If a new color is needed, add it as a CSS variable in globals.css first and flag it for review.

Terracotta strict rules:
- Allowed on: primary CTA states, active/selected states, link hover underlines, focus rings, text selection, small accent lines on section labels, Tier 2 top border accent.
- Forbidden on: large background blocks, body text, headings, icons, decorative gradients.

## CSS keyframes (in globals.css)

- @keyframes chart-dot-pulse — used in ArtifactDashboard for the terracotta endpoint dot's idle pulse. opacity 0.85 → 1 → 0.85, 3000ms infinite. Always gated by motion-safe: prefix.

## Typography

- Headings: Fraunces (serif), weight 400 default, loaded via next/font/google with weights 300, 400 available
- Body and UI: Inter (sans), loaded via next/font/google
- Captions, nav, labels, CTAs: Inter, 12px, uppercase, 0.12em tracking, weight 500

No other fonts ever. Pure-serif pages feel precious. Pure-sans pages feel tech-startup. Serif headings + sans body is the formula.

Display sizes (desktop / mobile):
- display (hero only): 96-128px / 56-72px, weight 300, tracking -0.03em, line-height 0.95
- h1: 72px / 44px, weight 400, tracking -0.02em, line-height 1.05
- h2: 48px / 32px, weight 400, tracking -0.02em, line-height 1.1
- h3: 32px / 24px, weight 400, tracking -0.02em, line-height 1.2
- body-lg: 20px / 18px, line-height 1.5
- body: 16px / 16px, line-height 1.6
- small: 14px / 14px, line-height 1.5
- caption: 12px, ALL CAPS, weight 500, 0.12em tracking, line-height 1
- price display: 36px / 32px, Fraunces weight 300, tracking -0.01em (used in PanelPrice)

## Spacing scale

Use only: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200 (pixels). No odd values.

Section vertical padding: 96-160px desktop, 64-96px mobile. Trust the generosity. Space is the luxury.

Container max-width: 1440px outer (extended to 1400px for Services panel grid). Inner content max-width: 1200px standard, 880px for text-heavy sections. Horizontal padding: 24px mobile, 48px tablet, 48-72px desktop.

## Stack

- Next.js 15 App Router, React 19, TypeScript strict mode
- Tailwind v4 with CSS variables
- shadcn/ui (Radix-based) for primitives — already initialized, do not hand-edit src/components/ui
- Framer Motion for component-level motion
- Lenis for smooth scroll, wired globally via SmoothScroll provider in layout.tsx
- GSAP + ScrollTrigger available for scroll choreography but install per-page only if needed (not yet needed)
- lucide-react for utility icons (sparingly, never for service tiers or Why Novacare, never for phone status bar icons)
- clsx + tailwind-merge for class composition
- Deployed on Vercel

No Three.js / R3F in v1. No new dependencies without approval.

## Folder conventions

- src/app — routes
- src/components/ui — shadcn primitives (don't hand-edit)
- src/components/sections — page sections (Hero, PhoneScene, AIAnswerScene, Services, WhyNovacare, etc.)
- src/components/shared — Header, Footer, Nav, SmoothScroll
- src/content — copy and case study data (copy.ts is the source of truth)
- src/lib — utilities

For complex multi-component sections (PhoneScene, AIAnswerScene, Services), nest sub-components in a folder: src/components/sections/AIAnswerScene/Phone.tsx, src/components/sections/Services/Tier1Panel.tsx, etc.

Services subfolder structure (current):
- src/components/sections/Services.tsx — orchestrator
- src/components/sections/Services/Tier1Panel.tsx, Tier2Panel.tsx, Tier3Panel.tsx — three distinct panel architectures
- src/components/sections/Services/PanelPrice.tsx — price block with counter logic (shared by all three tiers)
- src/components/sections/Services/SectionSweep.tsx — terracotta atmospheric sweep
- src/components/sections/Services/AddOnNote.tsx — full-width add-on note below panels
- src/components/sections/Services/features/ — three feature treatments (FeaturesPoem, FeaturesConversation, FeaturesCapabilities)
- src/components/sections/Services/artifacts/ — three living artifacts (ArtifactBrowserLarge, ArtifactPhoneReal, ArtifactDashboard)

Note: PanelChrome.tsx was deleted during the v4 fixes pass. Chrome animation now lives directly inside each tier panel's motion.a (animated borderColor + backgroundColor + Tier 2 borderTopColor keyframes for the terracotta marker).

## Code rules

- TypeScript always, never JS.
- Server Components by default. `'use client'` only when needed (any motion, hooks, browser APIs).
- No inline styles. Tailwind utility classes only. (Exception: gradient backgrounds requiring color-mix or specific stops can use style prop.)
- No `any`. No `@ts-ignore`. No `@ts-expect-error` without an inline comment explaining why.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h3>`. No div soup.
- Every interactive element has a visible focus state.
- aria-labels on icon buttons. Alt text on every image (decorative images get alt="").
- Mobile-first. Every component must look good at 375px width.
- Lighthouse targets: Performance 95+, Accessibility 100, Best Practices 100, SEO 95+.
- Page weight under 1.5MB on initial load. LCP under 2.5s on mobile 4G. CLS under 0.05.
- Wrappers containing absolute-positioned animated elements (sweeps, parallax layers) must have overflow-hidden to prevent horizontal scroll. The Beat 4 SectionSweep bug taught us this — always clip animated absolutes within their parent.

## Voice rules (apply to all copy in components)

- No em dashes anywhere, in prose or code comments. Use periods, commas, colons, or restructured sentences.
- No AI-slop phrases: "in today's fast-paced world," "leverage synergies," "unlock your potential," "transform your practice," "at the end of the day," "game-changer," "cutting-edge," "innovative solutions."
- Direct and confident. Skip preambles and "it depends" hedging.
- Copy comes from src/content/copy.ts only. Never hardcode strings in components. Never write lorem ipsum. Mark missing copy as TODO and ask.

## Motion rules

- Framer Motion for component motion. Lenis already global for smooth scroll. GSAP + ScrollTrigger only when Framer cannot do the job (rare).
- Every motion respects `prefers-reduced-motion`. Use `useReducedMotion` from Framer Motion. Pattern: early-return a static render branch, do not gate per-property.
- Duration: 200-400ms UI motion, 400-800ms scroll reveals, 800-1500ms cinematic moments only.
- Easing: `easeOut` or custom `[0.22, 1, 0.36, 1]`. Never linear for UI. Never spring physics for UI (too bouncy).
- Max 3 elements animating concurrently on screen.
- Never motion-gate content. Text must be readable immediately. Set initial opacity to 0.01 minimum or render a fallback.

Approved patterns:
- Word-by-word fade-in for hero H1 (one-time, on mount)
- Staggered fade-up for section content (on viewport entry)
- Subtle parallax on images (translate only, no rotation)
- Terracotta underline draw on link hover (scaleX 0 to 1)
- Scroll-pin sections with sticky h-screen + useScroll (the Beat 1 scaffold, reuse on Beat 2 and 3)
- Mouse-driven 3D tilt on focal devices (max 6deg, halve for single-focus scenes)
- Page transitions: crossfade, 400ms max
- Atmospheric sweeps (linear-gradient horizontal band translating across section, 600-700ms, behind content) for section entry moments — see Beat 4 SectionSweep
- Animated borderColor + backgroundColor for panel chrome materialization (replaces per-edge scaleX/scaleY drawing on rounded shapes — see Beat 4 v4 fixes)
- Gradient hairline separators (linear-gradient with transparent edges, opacity-fade animation rather than scaleX) for soft section dividers within panels
- Layered parallax on hover (useMotionValue + useSpring with stiffness 100, damping 20, per-layer translation values mapped via useTransform) — pattern reused across Beat 2 and Beat 4

Forbidden patterns:
- Auto-playing audio
- Loading screens or intro animations
- Scroll-jacking (locked scroll that advances a story)
- Custom cursors (cliché, broken on touch, 60% of UAE traffic is touch)
- Shimmer, pulse, glow, orbiting beams (the Magic UI / Aceternity trap)
- Three.js objects in the hero
- Horizontal scroll hijacking
- ScaleX/scaleY animations on borders of rounded containers when the radius is large enough that right-angled lines miss the corners (use animated borderColor instead)

Performance budget: dynamic-import heavy motion libraries per-page. Framer imported per-component, not globally. Flag if a component adds more than 50KB to the bundle.

## What NOT to do

- Do not use stock photography or AI-generated imagery.
- Do not add components, files, or features I did not explicitly request.
- Do not install npm packages without approval.
- Do not create 5 variants of something. Build one good version.
- Do not write placeholder lorem ipsum. Ask for copy or mark as TODO.
- Do not propose rebuilding shipped components (Hero, PhoneScene, AIAnswerScene, Services) unless I ask.
- Do not suggest light mode. Permanently warm-dark.
- Do not use icons on Why Novacare or service tiers. Typography carries meaning.
- Do not browse component libraries (Aceternity, Magic UI, 21st.dev) and import wholesale. Copy a single specific motion pattern at most, then adapt to our palette and typography.

## Using ui-ux-pro-max skill

The ui-ux-pro-max skill is available. Use it for:
- The pre-delivery checklist (accessibility, focus states, reduced-motion, responsive breakpoints)
- Anti-pattern validation
- Industry-specific UX considerations for wellness/healthcare

Do NOT use the skill to:
- Generate or override our color palette (locked above)
- Suggest typography (locked above)
- Regenerate design system decisions already made in this CLAUDE.md or in docs/03-novacare-design-system.md

If the skill suggests something that conflicts with decisions in CLAUDE.md or the design system doc, CLAUDE.md and the design system win. Always.

When invoking ui-ux-pro-max, frame the prompt to constrain it: "Do NOT suggest changes to colors, fonts, or structure. Only flag accessibility, performance, or anti-pattern issues."

## Working mode

### Planning

- For any task that creates new files or modifies multiple existing files, propose a Plan before executing. Show: files to create, files to edit, dependencies to install, and any assumptions you're making.
- Only proceed after the Plan is approved.
- Do not add files, components, or functionality I did not explicitly request.
- If you believe something outside the plan is needed, flag it separately and wait for approval.
- Never install npm packages without approval.

### Reasoning depth

- For non-trivial architecture, design decisions, or persistent debugging, recommend that I add `ultrathink` to my prompt before you proceed. State clearly: "This task would benefit from ultrathink. Add it to your prompt and re-run, or tell me to proceed without it."
- Tasks that warrant ultrathink:
  - New cinematic scroll scenes (PhoneScene, AIAnswerScene, case study reveals)
  - New page architecture
  - Motion choreography across multiple elements
  - Debugging failures that persist after one fix attempt
  - Decisions between two competing implementation approaches
- Skip the ultrathink recommendation for: typo fixes, color or padding tweaks, single-line edits, copy changes, mechanical refactors.

### Cinematic scene rules (from Beat 1 and Beat 4 lessons)

When building scroll-driven cinematic scenes:

1. Lock the architecture in iteration 1. Scroll mechanics, data model, motion choreography. Do not touch these after iteration 2. All further iteration happens at the render layer only (frame styling, typography weights, micro-interactions).

2. Use the proven scaffold: `min-h-[Nvh] motion-reduce:min-h-screen` outer + `sticky top-0 h-screen` inner + `useScroll({ target: ref, offset: ['start start', 'end end'] })`. Don't reach for GSAP unless this pattern fails for a specific reason.

3. Custom UI beats fake real-app clones. App-distinct visual language without literal cloning of WhatsApp, Instagram, etc. Avoids legal and uncanny risks.

4. Phone fidelity requires every layer: outer frame with gradient, inner bezel, Dynamic Island, status bar with custom inline SVG icons (NOT lucide for status icons, lucide reads as web), screen reflection overlay, tab bar when app-appropriate, home indicator pill. Skipping any single layer breaks the illusion.

5. Reduced-motion is not optional. Build it as you go. Pattern: `if (reduce) return <StaticVersion />` early-return at the top of the motion component. Two render branches, one per mode.

6. Real-sounding data sells the scene. Use real UAE names (Fatima Al Mansouri, Mohammed Al Rashid, Layla Al Suwaidi, etc.) and realistic message previews. Generic placeholders make visitors notice the construction.

7. Time evolution turns mockups into stories. Clock advancing, battery draining, timestamps aging, unread counts ticking up, new messages sliding in.

8. Cinematic scenes average 5-7 iterations. POC iteration: 2-3 hours. Fidelity rebuild: 3-4 hours. Polish iterations: 30-60 min each. Total: 8-12 hours per cinematic scene.

### Beat 4 lessons (additional)

9. Conversion-phase beats (services, why us, closing CTA) need different treatment than cinematic beats. Three-panel side-by-side beats text-line-text-line vertical stacks for B2B services. Center-stage emphasis on the middle tier (subtle background warming + accent line) leverages the documented 15-25% middle-tier conversion lift.

10. Living artifacts at the top of conversion panels — small contained UI mockups demonstrating each tier's capability — make panels feel custom-built rather than templatized. Each artifact must have idle, intro, and hover states. Use real text content (not abstract bubbles) to sell the visual argument.

11. Distinct typographic treatments per panel (asymmetric indentation poem, conversation fragments, capability nouns) reinforce the structural distinction between tiers when they share a design language.

12. Animated borderColor (transparent → border-warm) on rounded containers is cleaner than per-edge scaleX/scaleY drawing. The latter only works on tight radii (rounded-md or smaller). For rounded-2xl and above, switch to animated CSS borders.

### Model awareness

I will be using Opus for everything (major design and architecture work, simple edits, etc.). Do the best work possible with the capabilities you have. No need to ask which model.

## When building, always

1. Read CLAUDE.md and the relevant docs/ file before substantive work.
2. Check what already exists in the codebase. Match the style of nearby files.
3. Prefer composition over prop explosions.
4. Ship mobile styles first, then desktop.
5. Use src/content/copy.ts as the only source of strings.
6. Confirm the dev server still builds clean before declaring complete.

## Final checklist before declaring any component complete

- [ ] Builds clean, no errors or warnings
- [ ] Renders correctly at 375px, 768px, 1440px viewports
- [ ] All colors via CSS variables (no hardcoded hex)
- [ ] All fonts via Fraunces + Inter only
- [ ] All spacing on the scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200)
- [ ] Motion respects prefers-reduced-motion (early-return static branch)
- [ ] Every interactive element has a visible focus state
- [ ] Every image has alt text (or alt="" if decorative)
- [ ] Text readable without motion (never motion-gate content)
- [ ] No em dashes anywhere
- [ ] No AI-slop phrases
- [ ] Content reads from src/content/copy.ts, not hardcoded
- [ ] No horizontal scroll at any breakpoint (test by trackpad-swiping sideways at 1920, 1440, 1024, 768, 375)
- [ ] Git committed as a single cohesive change