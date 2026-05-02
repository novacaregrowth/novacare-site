# Novacare Design System

> Reference document for every design decision on novacaregrowth.com. If a component deviates from this document, revert the component. This file is the source of truth.

---

## Positioning

Novacare's visual identity sits in one specific quadrant: **dark luxury, warm-toned, quietly confident, editorial**. Not modern SaaS. Not bright corporate. Not generic agency. Not wellness-clinic-themed.

The goal is that a UAE clinic owner who visits our site immediately feels "this is more sophisticated than my current web guy, and more confident than the big agencies I've spoken to." Our design signals premium through restraint, not decoration.

### What we are

- Rolls-Royce, Bentley (quiet automotive luxury)
- The Macallan, Johnnie Walker Blue (warm-dark spirits branding)
- Audemars Piguet, Patek Philippe (editorial watch websites)
- Armani Casa (dark-warm luxury interiors)
- Ace Hotel (frictionless booking, adapted)

### What we are not

- Aesop-style wellness (too soft, too adjacent to our clients)
- Linear/Stripe-style SaaS (too cold, too tech)
- Behance-style portfolios (too decorative, too loud)
- Generic Dubai agencies (blue gradients, stock photos, corporate healthcare)

---

## Palette

All colors live as CSS variables in `src/app/globals.css`. Never hardcode hex values in components.

| Role | Hex | CSS var | Tailwind utility | Usage |
|------|-----|---------|------------------|-------|
| Dominant background | #0A0A0A | `--ink` | `bg-ink`, `text-ink` | Primary dark surface. 70-85% of every page. |
| Primary text | #F4F1EA | `--bone` | `bg-bone`, `text-bone` | Warm cream. All body text on dark. |
| Elevated surface | #1A1410 | `--card` | `bg-card` | Subtly lifted areas. Cards, tooltips, popovers. |
| Deep warm surface | #2B1F17 | `--espresso` | `bg-espresso`, `text-espresso` | Feature sections, highlighted blocks. Use sparingly. |
| CTA / hover / focus | #C86D4F | `--terracotta` | `bg-terracotta`, `text-terracotta` | Primary accent. **Max ~5% of any page.** |
| Muted text (softer) | #8A8378 | `--stone-soft` | `text-stone-soft` | Secondary text, captions, supporting info. |
| Muted text (darker) | #6B655C | `--stone` | `text-stone` | Tertiary text, fine print, subtle labels. |
| Border | #2A2520 | `--border-warm` | `border-border-warm` | Hairline dividers, card outlines, input borders. |

### Terracotta rules (strict)

Terracotta appears only in these places:
1. Primary CTAs (hover state, border, or background)
2. Active/selected states
3. Link hover underlines
4. Focus rings on inputs and interactive elements
5. Text selection (already set globally in `globals.css`)
6. Small accent lines in section labels (e.g., 1px terracotta line before a "Recent work" caption)

Do not use terracotta for:
- Large background blocks
- Body text
- Headings
- Icons (use bone or stone-soft)
- Decorative gradients or fills

If terracotta feels like it's showing up in more than ~5% of a page's pixels, remove some.

---

## Typography

### Fonts

- **Fraunces** (serif) — all headings, large display text, featured quotes
- **Inter** (sans) — all body, UI elements, labels, navigation, buttons

Load both via `next/font/google` in `layout.tsx`. Already configured.

### Scale

Headings are in Fraunces, weight 400 (regular), unless noted. Body/UI is Inter.

| Token | Purpose | Desktop | Mobile | Weight | Tracking | Line-height |
|-------|---------|---------|--------|--------|----------|-------------|
| `display` | Hero only | 96-128px | 56-72px | 300 | -0.03em | 0.95 |
| `h1` | Page headers | 72px | 44px | 400 | -0.02em | 1.05 |
| `h2` | Section headers | 48px | 32px | 400 | -0.02em | 1.1 |
| `h3` | Subsections | 32px | 24px | 400 | -0.02em | 1.2 |
| `body-lg` | Lead paragraphs | 20px | 18px | 400 | 0 | 1.5 |
| `body` | Default text | 16px | 16px | 400 | 0 | 1.6 |
| `small` | Captions, meta | 14px | 14px | 400 | 0 | 1.5 |
| `caption` | Labels, nav, CTAs | 12px | 12px | 500 | 0.12em | 1 (ALL CAPS) |

### Caption style

The "caption" token is critical. It's how we signal structure without headings. Used for:

- Nav links ("SERVICES", "AI RECEPTION", "APPROACH")
- Section labels ("WHAT WE DO", "RECENT WORK", "WHY NOVACARE")
- CTA text ("START A PROJECT", "BOOK A CALL")
- Metadata labels ("CLIENT", "SCOPE", "TIMELINE")

Always uppercase, Inter, 12px, medium weight, 0.12em letter-spacing.

### Fraunces specifics

Fraunces supports optical sizing and stylistic alternates. Use:
- `font-feature-settings: "ss01", "cv11"` globally (already set in `globals.css`)
- For the largest display type, try `font-optical-sizing: auto` if it improves legibility

### Pairing rules

- Never use two different serifs. Fraunces is the only serif.
- Never use two different sans-serifs. Inter is the only sans.
- Serif and sans together, always. Pure-serif pages feel precious. Pure-sans pages feel tech-startup.
- Headings serif. Body sans. CTAs sans uppercase. That's the formula.

---

## Spacing

### Scale

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200` (in pixels)

Use only these values. No odd spacing (e.g., 17px, 35px). Tailwind's default spacing scale works: `space-1` = 4px, `space-4` = 16px, etc.

### Section padding

- Vertical padding between major sections: **96-160px** on desktop, **64-96px** on mobile
- This is more than you think it should be. Trust it. Space is the luxury.

### Container

- Max-width: `1440px` for the outer container
- Inner content max-width: `1200px` for most sections, `880px` for text-heavy sections (about, case study body)
- Horizontal padding: 24px mobile, 48px tablet, 48-72px desktop

### Element spacing

- Between paragraphs: 24px
- Between a heading and its body: 16-24px
- Between buttons in a row: 16-24px
- Inside cards: 24-48px padding
- Between stacked list items: 16-32px depending on visual weight

---

## Motion

### Libraries

- **Framer Motion** — component-level motion (fade-in on viewport, hover, page transitions, menu open/close)
- **GSAP + ScrollTrigger** — scroll choreography (case study image reveals, parallax, pinned sections). Install when first needed, not yet.
- **Lenis** — smooth scroll, global. Install in the root layout once, used everywhere.

Never use CSS animations for anything beyond simple hovers. Never use spring physics from Framer for UI motion (too bouncy). Use tween with ease.

### Motion rules

1. **Every motion respects `prefers-reduced-motion`**. Use Framer's `useReducedMotion` hook or CSS `@media (prefers-reduced-motion)`.
2. **Duration: 200-400ms for UI motion. 400-800ms for scroll reveals. 800-1500ms for cinematic moments only.**
3. **Easing: `easeOut` or `[0.22, 1, 0.36, 1]` (custom quint-out). Never ease-in alone. Never linear for UI.**
4. **Motion serves content, never performs.** If a viewer can't describe why the motion exists, remove it.
5. **Never motion-gate content.** Text must be readable immediately, not only after fade-in completes. Set initial opacity to 0.01 min, or ensure fallback visibility.
6. **Limit concurrent animations.** Max 3 elements animating at once on screen.

### Approved patterns

- Word-by-word fade-in for hero H1 (one-time, on mount)
- Staggered fade-up for section content (on viewport entry)
- Subtle parallax on images (translate on scroll, no rotation)
- Terracotta underline draw on link hover (scaleX from 0 to 1)
- CTA hover: color + border swap, 300ms ease
- Scroll-triggered image scale in case study reveals (0.95 → 1)
- Page transitions: crossfade, 400ms max

### Forbidden patterns

- Auto-playing sound or video with audio
- Loading screens or intro animations
- Horizontal scroll hijacking
- Cursor-following custom cursors (cliché, broken on touch)
- Text that shimmers, pulses, or glows
- Rotating 3D objects in the hero
- Orbiting icons, animated beams, shimmer effects (the Magic UI / Aceternity trap)
- Scroll-jacking (locked scroll that advances a "story")

---

## Components and patterns

### Nav

Fixed top, 80px height. Wordmark left, 4 links + CTA right on desktop. Hamburger on mobile, full-screen overlay with staggered serif links. Terracotta underline on link hover. Already built in `src/components/shared/Nav.tsx`.

### Buttons

Three variants only:

1. **Primary** — filled, bone background, ink text, hover to terracotta background + bone text. Used for the main CTA on a page.
2. **Outline** — transparent background, bone/25% border, bone text, hover to bone background + ink text. Used for nav CTA, secondary CTAs.
3. **Ghost** — transparent background, bone text, terracotta underline on hover. Used for tertiary actions, "see more" links.

All buttons use caption typography: Inter, 12px, medium, uppercase, 0.12em tracking. Padding: 14px vertical, 22px horizontal for medium; 18px vertical, 28px horizontal for large.

### Cards

`bg-card` background (slightly lifted from ink). `border-border-warm` for the outline. Padding: 32-48px. Rounded corners: `var(--radius)` (currently 0.375rem — tight, editorial, not SaaS-rounded).

### Links (inline, in body text)

Bone text, 1px terracotta underline always visible (never hover-only). Underline thickens to 2px on hover. Never blue. Never underline-on-hover-only.

### Dividers

`border-border-warm` hairlines (1px). Used sparingly to separate sections within a page, not between top-level sections (negative space does that work).

### Forms

Not used on public pages. If ever needed (contact, intake), max 3 fields, no labels above inputs (floating labels only), terracotta focus ring, bone text, `bg-espresso` input background.

---

## Imagery

### Photography

- Original, commissioned, or self-shot only. No stock photography ever.
- Preferred mood: warm-dark, low-key lighting, depth of field, natural tones.
- Color grade: slightly desaturated, warm tint, blacks crushed slightly.
- No photos of generic "business people" or "doctors with clipboards."
- Photos of actual clinic spaces, products, documents, screens, hands, details.
- Portrait shots of founders optional. If skipped, the site feels more mysterious and confident. If included, they must be consistent in style (same lighting, same color grade).

### Video

- Ambient, looping, short (8-15 sec), silent. No talking heads, no music.
- Common placements: hero background, case study intro, service page atmosphere.
- File size: under 1.5MB compressed. Use H.264 or WebM.
- Always have a static poster frame fallback.

### Icons

Use `lucide-react` for utility icons (hamburger, close, arrow). Color: bone or stone-soft. Size: 16-20px for inline, 24-32px for features.

**Never use icons for Why Novacare sections or service tiers.** Typography carries the meaning. Icons make it feel generic.

### Illustrations

None. No illustrations, no custom graphics, no pattern backgrounds. Typography + photography + space is the visual system.

---

## Accessibility

- **Color contrast**: Bone on Ink = ~16:1, well above WCAG AAA. Terracotta on Ink = ~6.2:1, AAA for large text, AA for body. Never put body text in terracotta.
- **Focus states**: 2px terracotta outline, offset 2px. Visible on keyboard nav only (use `focus-visible`).
- **Reduced motion**: respected on every animation. See motion rules.
- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`-`<h3>`. No div soup.
- **Alt text**: every image has descriptive alt. Decorative images get `alt=""`.
- **Keyboard nav**: every interactive element tabbable. Dialog traps focus when open.

---

## Performance budget

- LCP (Largest Contentful Paint): under 2.5s on mobile 4G
- CLS (Cumulative Layout Shift): under 0.05
- FID/INP: under 200ms
- Total page weight: under 1.5MB on initial load
- Lighthouse score targets: Performance 95+, Accessibility 100, Best Practices 100, SEO 95+

### How we hit those targets

- `next/font` for all fonts (no Google Fonts external requests)
- `next/image` for all images, with explicit width/height
- Lazy-load below-fold images and videos
- No third-party scripts except a single analytics pixel
- Framer Motion imported per-component, not globally
- GSAP loaded only on pages that need it (case study page)
- Minimal Tailwind CSS output (already tree-shaken via v4)

---

## Quick decision guide

When designing any new section, ask in order:

1. **What is this section saying?** If I can't state it in one sentence, cut it.
2. **Can this be done with typography alone?** If yes, skip decoration.
3. **Is every color on the palette?** If I'm reaching for a new color, I'm wrong.
4. **Does the spacing feel too generous?** Good. Keep it.
5. **Would Rolls-Royce put this on their site?** If no, reconsider.
6. **Does this element earn its place?** Decorative elements must justify themselves.

If in doubt, remove it. Restraint always wins.
