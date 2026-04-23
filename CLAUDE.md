# Novacare Growth — Marketing Site

## Project documentation

Full reference docs live in `docs/`. When a task relates to copy, design system, pricing, ICP, outreach, or Claude Code workflow, read the matching file in `docs/` first.

## About this project
This is the marketing website for Novacare Growth, a UAE-based agency 
that builds websites and AI automations for wellness clinics, therapy 
practices, dental clinics, and medical centers.

Target visitor: UAE clinic owners and practice managers. They are 
non-technical business buyers who need to trust us fast. The site must 
feel premium, confident, and sophisticated — NOT a typical "agency" 
site with stock photos and vague claims.

## Design principles
- Editorial, minimalist, premium. Think Aesop, Linear, Basic Agency, Rauno.
- Negative space is a feature, not a bug. Don't fill every pixel.
- Typography does most of the visual work. Motion is restrained.
- Accent color (Terracotta) appears on ~5% of the page maximum.
- No stock photography. No generic icons. No AI-generated imagery.

## Color palette (CSS variables in globals.css)
- --ink: #0A0A0A        (primary text, dark surfaces)
- --bone: #F4F1EA       (primary background, warm off-white)
- --espresso: #2B1F17   (deep accent surfaces, headers)
- --terracotta: #C86D4F (CTAs, hover states, underlines — sparingly)
- --stone: #6B655C      (secondary text, borders, muted elements)

Always use CSS variables via Tailwind, never hardcoded hex values in components.

## Typography
- Headings: a serif display font (Fraunces or Instrument Serif, via next/font)
- Body: a clean geometric sans (Inter or Geist)
- Avoid default system fonts. Load via next/font/google.

## Stack
- Next.js 15 App Router, React 19, TypeScript strict mode
- Tailwind v4 with CSS variables
- shadcn/ui for primitives (Button, Card, Dialog, Sheet, etc.)
- Framer Motion for motion (subtle only)
- GSAP + ScrollTrigger for scroll choreography
- Lenis for smooth scroll
- Deployed on Vercel

## Folder conventions
- src/app — routes
- src/components/ui — shadcn primitives (don't hand-edit these)
- src/components/sections — page sections (Hero, Services, CTA, etc.)
- src/components/shared — Header, Footer, Nav
- src/lib — utilities
- src/content — case studies and copy (MDX or TS)

## Code rules
- Always TypeScript, never JS.
- Server Components by default. 'use client' only when needed.
- No inline styles. Tailwind classes only.
- Accessibility: semantic HTML, aria labels on icon buttons, focus states visible.
- Mobile-first. Every component must look good at 375px width.
- No `any` types. No `@ts-ignore`.
- Lighthouse performance target: 95+ on mobile.

## What NOT to do
- Do not use stock photography or generic icons from lucide without review.
- Do not add components I didn't ask for.
- Do not install npm packages without asking first.
- Do not create 5 variants of something — build one good version.
- Do not write placeholder lorem ipsum. Ask me for copy or mark as TODO.

## Motion & cinematic guidelines
- Motion library: Framer Motion for components, GSAP + ScrollTrigger for 
  scroll choreography, Lenis for smooth scroll.
- No Three.js / R3F in v1.
- Motion must respect `prefers-reduced-motion`. Always.
- No motion on content-critical reveals unless there's a fallback.
- Animations should feel like they're serving the content, not performing.
- Hero: one cinematic moment, mobile-safe, loads under 2s on 4G.
- Case study scroll: scroll-driven image/text reveal — the site's "wow" moment.
- CTAs: subtle magnetic hover, terracotta underline draw on link hover.
- Page transitions: optional, 300-400ms max, nothing that blocks content.
- Performance budget: LCP under 2.5s on mobile, CLS near 0, interactive under 3s.
- No loading screens. No intro animations.

## Using ui-ux-pro-max skill

The ui-ux-pro-max skill is available. Use it for:
- The pre-delivery checklist (accessibility, focus states, 
  reduced-motion, responsive breakpoints)
- Anti-pattern validation (what NOT to do)
- Industry-specific UX considerations for wellness/healthcare

Do NOT use the skill to:
- Generate or override our color palette (locked above)
- Suggest typography (locked above)
- Regenerate design system decisions already made in this CLAUDE.md

If the skill suggests something that conflicts with decisions in CLAUDE.md, 
CLAUDE.md wins. Always.

## When building, always:
1. Check what already exists in the codebase before creating new files.
2. Match the existing code style of nearby files.
3. Prefer composition over prop explosions.
4. Ship mobile styles first, then desktop.

## Working mode

### Planning
- For any task that creates new files or modifies multiple existing files, 
  propose a plan before executing. Show: files to create, files to edit, 
  dependencies to install, and any assumptions you're making.
- Only proceed after the plan is approved.
- Do not add files, components, or functionality I didn't explicitly request.
- If you believe something outside the plan is needed, flag it separately 
  and wait for approval.
- Never install npm packages without approval.

### Reasoning depth
- When a task involves non-trivial architecture, design decisions, or 
  debugging a non-obvious issue, recommend that I invoke "ultrathink" 
  before you proceed. State clearly: "This task would benefit from 
  ultrathink — add it to your prompt and re-run, or tell me to proceed 
  without it."
- Tasks that warrant ultrathink recommendation:
  - New page architecture
  - Complex component design (Hero, Case Study scroll, Services comparison)
  - Motion choreography across multiple elements
  - Debugging failures that persist after one fix attempt
  - Decisions between two competing implementation approaches
- Do not recommend ultrathink for: typo fixes, color adjustments, 
  single-line edits, or tasks that are purely mechanical.

### Model awareness
- I will use Claude Opus for major design and architecture work, and 
  Sonnet for simple edits. You don't need to ask which I'm using — just 
  do the best work possible with the capabilities you have.