# Novacare Growth — Marketing Site

## Project documentation

Full reference docs live in `docs/`. When a task relates to copy, design system, pricing, ICP, outreach, or Claude Code workflow, read the matching file in `docs/` first.

## About this project

This is the marketing website for Novacare Growth, a UAE-based agency that builds websites and AI automations for wellness clinics, therapy practices, dental clinics, and medical centers.

Target visitor: UAE clinic owners and practice managers. They are non-technical business buyers who need to trust us fast. The site must feel premium, confident, and sophisticated. NOT a typical "agency" site with stock photos and vague claims.

## Current status

Shipped:
- Hero / Beat 0 (Veo 3.1 ambient video, word-by-word fade-in, three-stop gradient overlay, bottom fade-to-black for transition continuity)
- PhoneScene / Beat 1 (three app-distinct iPhone mockups, scroll-driven cinematic, focus-pull entrance, mouse-driven 3D parallax, real UAE patient names, time-evolving status bars, AnimatePresence message inserts, full Dynamic Island and home indicator and screen reflection fidelity, full reduced-motion path)
- AIAnswerScene / Beat 2 (single phone, WhatsApp-feeling chat, 6-message conversation between Layla Al Suwaidi and Maison Aesthetic, scroll-coupled state machine over 600vh desktop / 550vh mobile, milestone-based reveal, mouse parallax, layered phone parallax, diagonal screen reflection responsive to cursor, two-layer warm radial glow, vignette, contact shadow, 3D entrance arc, confirmation card climax with terracotta accent, headline cascade with letter-spacing animation, full reduced-motion path)
- Services / Beat 4 v3 (three-panel side-by-side layout, center-stage emphasis on Tier 2 with terracotta line + bg-card-elevated, scroll-driven section entry choreography with three vertical lines descending into empty space, three living artifacts at the top of each panel — schematic browser window for Tier 1, abstract phone bubble exchange for Tier 2, dashboard line chart for Tier 3 — internal hairline draw animations, price counter settle, layered parallax on panel hover, full reduced-motion path)
- SmoothScroll provider wired globally via Lenis in layout.tsx
- shadcn/ui initialized with Card primitive
- copy.ts contains hero, phoneScene, aiAnswerScene, services with new shape (sectionLabel, headline, subhead, tiers, addon)

Skipped for now:
- Beat 3 (Al Yasmine featured case study) — postponed because alyasminecenter.com is still being rebuilt. Will return to it after Alia's site ships.

Next: Beat 5 (Why Novacare) and Beat 6 (Closing CTA) for the home page, plus an overall information architecture review (see new chat).

Planned but not built (post-IA review):
- Beat 5 (Why Novacare typographic statements)
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
- --espresso: #2B1F17      (deep warm surfaces, feature blocks, used sparingly)
- --terracotta: #C86D4F    (CTAs, hover, focus, accent — max ~5% of page pixels)
- --stone-soft: #8A8378    (secondary text, captions, supporting info)
- --stone: #6B655C         (tertiary text, fine print, subtle labels)
- --border-warm: #2A2520   (hairline dividers, card outlines, input borders)

Always via CSS variables (Tailwind utilities like `bg-ink`, `text-bone`, `border-border-warm`). Never hardcode hex values in components. If a new color is needed, add it as a CSS variable in globals.css first and flag it for review.

Terracotta strict rules:
- Allowed on: primary CTA states, active/selected states, link hover underlines, focus rings, text selection, small accent lines on section labels.
- Forbidden on: large background blocks, body text, headings, icons, decorative gradients.

## Typography

- Headings: Fraunces (serif), weight 400 default, loaded via next/font/google
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

## Spacing scale

Use only: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200 (pixels). No odd values.

Section vertical padding: 96-160px desktop, 64-96px mobile. Trust the generosity. Space is the luxury.

Container max-width: 1440px outer. Inner content max-width: 1200px standard, 880px for text-heavy sections. Horizontal padding: 24px mobile, 48px tablet, 48-72px desktop.

## Stack

- Next.js 15 App Router, React 19, TypeScript strict mode
- Tailwind v4 with CSS variables
- shadcn/ui (Radix-based) for primitives — already initialized, do not hand-edit src/components/ui
- Framer Motion for component-level motion
- Lenis for smooth scroll, wired globally via SmoothScroll provider in layout.tsx
- GSAP + ScrollTrigger available for scroll choreography but install per-page only if needed (not yet needed)
- lucide-react for utility icons (sparingly, never for service tiers or Why Novacare)
- clsx + tailwind-merge for class composition
- Deployed on Vercel

No Three.js / R3F in v1. No new dependencies without approval.

## Folder conventions

- src/app — routes
- src/components/ui — shadcn primitives (don't hand-edit)
- src/components/sections — page sections (Hero, PhoneScene, AIAnswerScene, etc.)
- src/components/shared — Header, Footer, Nav, SmoothScroll
- src/content — copy and case study data (copy.ts is the source of truth)
- src/lib — utilities

For complex multi-component sections (like PhoneScene, AIAnswerScene), nest sub-components in a folder: src/components/sections/AIAnswerScene/Phone.tsx etc.

## Code rules

- TypeScript always, never JS.
- Server Components by default. `'use client'` only when needed (any motion, hooks, browser APIs).
- No inline styles. Tailwind utility classes only.
- No `any`. No `@ts-ignore`. No `@ts-expect-error` without an inline comment explaining why.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h3>`. No div soup.
- Every interactive element has a visible focus state.
- aria-labels on icon buttons. Alt text on every image (decorative images get alt="").
- Mobile-first. Every component must look good at 375px width.
- Lighthouse targets: Performance 95+, Accessibility 100, Best Practices 100, SEO 95+.
- Page weight under 1.5MB on initial load. LCP under 2.5s on mobile 4G. CLS under 0.05.

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

Forbidden patterns:
- Auto-playing audio
- Loading screens or intro animations
- Scroll-jacking (locked scroll that advances a story)
- Custom cursors (cliché, broken on touch, 60% of UAE traffic is touch)
- Shimmer, pulse, glow, orbiting beams (the Magic UI / Aceternity trap)
- Three.js objects in the hero
- Horizontal scroll hijacking

Performance budget: dynamic-import heavy motion libraries per-page. Framer imported per-component, not globally. Flag if a component adds more than 50KB to the bundle.

## What NOT to do

- Do not use stock photography or AI-generated imagery.
- Do not add components, files, or features I did not explicitly request.
- Do not install npm packages without approval.
- Do not create 5 variants of something. Build one good version.
- Do not write placeholder lorem ipsum. Ask for copy or mark as TODO.
- Do not propose rebuilding shipped components (Hero, PhoneScene) unless I ask.
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

### Cinematic scene rules (from Beat 1 lessons)

When building scroll-driven cinematic scenes:

1. Lock the architecture in iteration 1. Scroll mechanics, data model, motion choreography. Do not touch these after iteration 2. All further iteration happens at the render layer only (frame styling, typography weights, micro-interactions).

2. Use the proven scaffold: `min-h-[Nvh] motion-reduce:min-h-screen` outer + `sticky top-0 h-screen` inner + `useScroll({ target: ref, offset: ['start start', 'end end'] })`. Don't reach for GSAP unless this pattern fails for a specific reason.

3. Custom UI beats fake real-app clones. App-distinct visual language without literal cloning of WhatsApp, Instagram, etc. Avoids legal and uncanny risks.

4. Phone fidelity requires every layer: outer frame with gradient, inner bezel, Dynamic Island, status bar with custom inline SVG icons (NOT lucide for status icons, lucide reads as web), screen reflection overlay, tab bar when app-appropriate, home indicator pill. Skipping any single layer breaks the illusion.

5. Reduced-motion is not optional. Build it as you go. Pattern: `if (reduce) return <StaticVersion />` early-return at the top of the motion component. Two render branches, one per mode.

6. Real-sounding data sells the scene. Use real UAE names (Fatima Al Mansouri, Mohammed Al Rashid, Layla Al Suwaidi, etc.) and realistic message previews. Generic placeholders make visitors notice the construction.

7. Time evolution turns mockups into stories. Clock advancing, battery draining, timestamps aging, unread counts ticking up, new messages sliding in.

8. Cinematic scenes average 5-7 iterations. POC iteration: 2-3 hours. Fidelity rebuild: 3-4 hours. Polish iterations: 30-60 min each. Total: 8-12 hours per cinematic scene.

### Model awareness

I will use Opus for major design and architecture work, Sonnet for simple edits. Do the best work possible with the capabilities you have. No need to ask which model.

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
- [ ] Git committed as a single cohesive change