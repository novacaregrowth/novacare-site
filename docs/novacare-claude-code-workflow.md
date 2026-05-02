# Novacare — Claude Code Workflow Guide

> The missing manual. How to use Claude Code, the installed MCPs/plugins, the ui-ux-pro-max skill, and how to write prompts that produce non-generic output for Novacare's site.
>
> Read this before prompting Claude Code for any non-trivial task. It will save you hours of iteration.
>
> v2 update: Lessons from Beat 1 captured at the bottom. Read those first if you're about to build a scroll-driven cinematic scene. They will save you days, not hours.

---

## Installed tools and their actual purpose

### MCPs (Model Context Protocol servers)

These extend Claude Code with live data and specialized capabilities.

**context7** (Upstash) — pulls live, version-specific documentation for libraries. Without this, Claude writes Next.js 14 code when we're on 15, or old Tailwind syntax, etc. Auto-activates when Claude needs current docs.

- When it runs: automatically, whenever Claude writes code involving Next.js, React, Tailwind, shadcn, etc.
- When to explicitly invoke: add `use context7` to your prompt when you want to force a fresh docs lookup, e.g., "use context7 to check the latest Framer Motion LazyMotion API."

### Plugins (Claude Code plugins)

These add skills, commands, and agent-level instructions.

**frontend-design** (Anthropic official) — codifies production-grade frontend patterns. Prevents the generic "AI-coded marketing site" look. Steers output toward proper design tokens, component composition, and styling constraints.

- When it runs: automatically on any frontend work.
- No invocation needed.

**ui-ux-pro-max** — design reasoning engine with 100+ industry rules, 67 UI styles, 96 color palettes, anti-pattern database, pre-delivery checklist.

- **Use for**: pre-delivery validation, anti-pattern checks, specific UX questions.
- **Do NOT use for**: generating our design system, picking colors, choosing fonts, suggesting layouts that conflict with our design system.
- **Key rule**: our `CLAUDE.md` and `novacare-design-system.md` always override ui-ux-pro-max suggestions. If they disagree, our files win.

---

## When to use which tool — a decision tree

```
I want to...
├── build a new component
│   ├── is it standard (button, card, input)? → shadcn (already installed, local code)
│   ├── is it custom (hero, case study)? → Claude Code with design system reference
│   └── do I want inspiration for motion? → browse aceternity.com, magicui.design manually, copy only specific snippets
│
├── check if my component follows best practices
│   └── ask Claude Code: "use the ui-ux-pro-max skill to run the pre-delivery checklist against X component"
│
├── learn the current API for a library
│   └── add "use context7" to the prompt
│
├── refactor or clean up existing code
│   └── Plan Mode + ultrathink for complex refactors, standard mode for simple
│
├── build a whole page
│   └── Plan Mode + ultrathink + reference multiple design docs
│
└── fix a specific bug
    └── standard mode, Sonnet is fine, include exact error message
```

---

## The 4 modes of Claude Code — when to use each

### 1. Default (edit mode)
Claude reads and writes files immediately. No confirmation.

- When to use: typo fixes, single-component edits, obvious changes.
- When NOT to use: any task involving multiple files or new architecture.

### 2. Plan Mode (`Shift + Tab` once)
Claude proposes a plan before executing. Waits for approval.

- When to use: 90% of our work. Default for Novacare builds.
- Indicator: "plan mode on" at the bottom of the input.

### 3. Auto-accept edits (`Shift + Tab` twice)
Dangerous. Skips all confirmations. Claude writes whatever it wants.

- When to use: never, for this project.

### 4. Bypass permissions mode (launch flag `--dangerously-skip-permissions`)
Even more dangerous. Only used for specific agentic workflows.

- When to use: never, unless I specifically tell you to.

---

## Model selection — when Opus vs. Sonnet vs. Haiku

Run `/model` inside Claude Code to switch.

**Opus** — most expensive, highest reasoning quality.
- Use for: new components (Hero, Case Study), architecture decisions, motion choreography, debugging complex issues, any task requiring real taste.

**Sonnet** — balanced speed and quality.
- Use for: implementing already-designed components, simple edits, refactors, adding features to existing patterns.

**Haiku** — fastest, cheapest.
- Use for: trivial edits, explaining code, formatting changes. Rarely needed for this project.

**Rule of thumb**: if you're about to type "ultrathink" into the prompt, you should be on Opus. If the task is mechanical, Sonnet is fine.

---

## Ultrathink — when and how

`ultrathink` is a keyword that tells Claude to spend more reasoning tokens before acting. Works on Opus and Sonnet.

**Magnitudes** (from least to most reasoning):
- No keyword → standard reasoning
- `think` → basic extended reasoning
- `think hard` → more
- `think harder` → more
- `ultrathink` → maximum

**When to use ultrathink** (for Novacare):
- First-time build of any major component (Hero, Services section, Case Study page)
- Motion choreography across multiple elements
- Architectural decisions (folder structure, how pages compose)
- Debugging failures that persist after one fix attempt
- Deciding between two competing implementation approaches

**When to skip ultrathink**:
- Typo fixes
- Color or padding tweaks
- Adding a new entry to `copy.ts`
- Renaming a variable

**How to include in a prompt**:

> ultrathink this one. Build the Hero component...

Claude will pause, reason longer, then propose its plan. The quality difference is real for complex tasks.

---

## Prompt patterns that work for Novacare

### Pattern 1: Component build prompt

Use for any new component. Template:

```
[ultrathink if complex]

Build the [component name] component. Follow exactly.

## File structure
Create/edit:
- path/to/file.tsx — purpose

## Design spec
[Describe exact visual behavior. Be specific about:]
- Layout (zones, widths, heights, breakpoints)
- Typography (exact font, size, weight, tracking, line-height)
- Colors (use palette tokens from novacare-design-system.md)
- Spacing (use spacing scale from design system)
- Motion (library, duration, easing, reduced-motion handling)
- Hover/focus states (every interactive element)
- Accessibility (aria-labels, keyboard nav, focus visibility)

## Content source
Read text from src/content/copy.ts at copy.[page].[section]

## Integration
[Where to render it, what to import]

## After building
1. Show me the file(s)
2. Confirm the dev server still builds clean
3. Report any errors or warnings

Do NOT build anything else. Wait for my next instruction.
```

### Pattern 2: Debug prompt

Use when something breaks.

```
The [component] is failing with this error:

[paste exact error message]

[paste relevant code snippet]

Before proposing a fix, explain what's causing the error. Then propose a minimal fix that doesn't change unrelated code.
```

### Pattern 3: Refine prompt

Use when a component works but needs adjustment.

```
The [component] is built but needs refinement.

Currently: [describe current behavior]
Should be: [describe desired behavior]

Make only this change. Do not refactor surrounding code. Do not add new features. Show me the diff.
```

### Pattern 4: Audit prompt

Use after building something to check quality.

```
Use the ui-ux-pro-max skill to audit the [component] component against:
1. The pre-delivery checklist
2. Accessibility standards
3. Performance budget from novacare-design-system.md

Report what passes, what fails, and proposed fixes. Do not make changes yet.
```

### Pattern 5: Cinematic scene prompt (NEW, from Beat 1 lessons)

Use when building scroll-driven scenes (PhoneScene, AI Answer scene, scroll-driven case study reveals). These are the most expensive components in the build because they require multiple iterations on visual fidelity.

```
ultrathink this one.

Read first, in this order:
1. CLAUDE.md
2. The current file you're iterating on (if any)
3. Any reference component already shipped (e.g. PhoneScene for motion patterns)
4. Relevant design system sections

## Scene architecture (lock these BEFORE design iteration begins)

- Section wrapper: min-h-[Nvh] + sticky h-screen child + useScroll target ref + Lenis active globally
- Data model: locked typed structures for whatever the scene contains (slots, messages, stages)
- Motion model: useTransform tables with explicit scroll ranges per element
- Reduced-motion path: render static final state in single branch, no per-property guards

## Visual layer (iterate this)

- Frame and chrome details
- Typography weights and sizes
- Hover states and micro-interactions
- Color discipline (document hex exceptions explicitly)

## Critical rule

Once the scene's motion choreography and data model land cleanly, freeze them. All further iteration happens at the render layer only. This is what allows iteration to converge instead of regress.

[rest of standard component spec follows]
```

---

## Anti-patterns — prompts that produce bad output

### Anti-pattern 1: vague

> "Make a nice hero for Novacare"

Result: generic SaaS hero with gradients and a placeholder avatar grid. Claude fills gaps with its training-data average, which is the opposite of our positioning.

### Anti-pattern 2: too many tasks

> "Build the hero, services, case study, about section, and footer all at once"

Result: each section done at 60% quality. No iteration loop. Impossible to course-correct.

### Anti-pattern 3: no design spec

> "Use your best judgment for the design"

Result: trained-on-the-internet average. Generic.

### Anti-pattern 4: borrowed style without our constraints

> "Make it look like Linear"

Result: blue-tinted cold minimalism, wrong palette, wrong tone. Our aesthetic is warm luxury, not tech minimalism.

### Anti-pattern 5: skip Plan Mode

> Running default mode on a new page build

Result: Claude creates 8 files, makes assumptions you'd have caught, and you can't roll back cleanly.

### Anti-pattern 6: iterate the whole component at once (NEW, from Beat 1)

> "Refine the phone scene — make the phones look more iOS, fix the timing, add interactions, change the layout"

Result: each requested change competes with the others. Two iterations later you're re-litigating the first change. Fix one layer at a time.

---

## Workflow for building a new page — step by step

This is the playbook for building each of: Home, Work, Services, About, Contact, Case Study.

### Step 1: Ensure copy exists

Check `src/content/copy.ts` has the relevant page's copy populated. If not, fill it first using `novacare-copy.md` as the source.

### Step 2: Plan the sections

List every section the page contains. Example for Home (current state, post-Beat 1):
1. Hero (SHIPPED)
2. PhoneScene / Beat 1 — The Problem (SHIPPED)
3. AI Answer / Beat 2 — The Solution (PLANNED)
4. Featured case study / Beat 3 — Proof (PLANNED)
5. Services tiers / Beat 4 — The Offer (PLANNED)
6. Why Novacare / Beat 5 (PLANNED)
7. Closing CTA / Beat 6 (PLANNED)

### Step 3: Build sections one at a time

For each section, use Pattern 1 (Component build prompt) or Pattern 5 (cinematic scene prompt). Build, test, verify, then move to the next.

Order matters: build the Hero first because it sets the tone. Then the smallest/simplest sections. Build the CTA closer last — it's mostly a repeat of patterns already used.

### Step 4: Compose the page

Once all sections are built, create the page file (e.g., `src/app/page.tsx`) that imports and composes them in order. This is a simple prompt.

### Step 5: Test

- Run `npm run dev`, open localhost:3000
- Check desktop (1440px viewport) and mobile (375px) behavior
- Check keyboard navigation (Tab through every link/button)
- Check reduced-motion mode (Chrome DevTools → Rendering → Emulate prefers-reduced-motion)
- Run Lighthouse on the page. Target: Performance 95+, Accessibility 100.

### Step 6: Audit

Run the audit prompt (Pattern 4). Fix any real issues, ignore suggestions that contradict our design system.

### Step 7: Commit

Git commit the page as a single change. Short message: `feat: home page`. Easy to roll back.

---

## How to use ui-ux-pro-max without letting it ruin our design

The skill has a strong opinion about everything. If unchecked, it will:
- Suggest soft pink + gold for wellness sites (generic spa aesthetic)
- Recommend Cormorant Garamond fonts (overused)
- Push neumorphism or glassmorphism effects
- Propose colorful data visualizations we don't need

Our CLAUDE.md already neutralizes most of this, but when invoking ui-ux-pro-max directly, always frame the prompt to constrain it:

**Good**:
> Use ui-ux-pro-max to validate the Hero against the pre-delivery checklist. Do NOT suggest changes to colors, fonts, or structure. Only flag accessibility, performance, or anti-pattern issues.

**Bad**:
> Use ui-ux-pro-max to improve the Hero.

The skill is a validator, not a designer, for us.

---

## How to use other component libraries without bloating the stack

We have shadcn installed. For anything more specific, we pull individual components, never install whole libraries.

### Process

1. Hit a moment in the build where a motion pattern feels right (e.g., word-by-word hero reveal, scroll-driven case study images).
2. Browse aceternity.com, magicui.design, or 21st.dev — just the websites, not via MCP or CLI.
3. Find the specific component that matches the motion you want.
4. Copy only that component's code.
5. In Claude Code, paste the code and prompt:

   > Adapt this component to our design system. Strip all colors and replace with our palette tokens. Use Fraunces for headings and Inter for body. Keep only the motion logic. Remove any dependencies they require that we don't already have (flag them first).

6. Review the adapted component. Keep or discard.

Libraries to browse (not install):
- aceternity.com — heavy on motion, good for scroll reveals
- magicui.design — subtler, good for small UI delights
- 21st.dev — massive variety, good for scroll patterns
- reactbits.dev — good effects, less generic than Magic UI

Libraries to avoid:
- Any library with "shimmer," "glow," "orbit," or "sparkle" as a core selling point
- Any library whose demo site itself is too flashy — you will absorb its aesthetic unconsciously

---

## Design decision framework

When building anything, run through this before prompting:

### 1. What's the goal?

State the section's purpose in one sentence. "This hero tells clinic owners we build premium websites and automations." If you can't state it, the section is wrong.

### 2. What's the single visual hierarchy?

Every section has one thing that grabs attention first. Usually the H1 or a single image. Make that one thing devastating. Everything else supports.

### 3. What's the one motion moment?

Sections have one motion moment, max. More than one = visual chaos. Pick the one and execute it well.

### 4. What's the user's next action?

Every section has a clear next action. For service tiers: click to WhatsApp. For case study: read more. If there's no next action, the section is a dead end.

### 5. What am I removing?

Before adding anything, ask what can be removed. Restraint is the aesthetic. Two-thirds of first drafts have too much on screen.

---

## Performance hygiene (every build)

Every component must:

- Use `next/image` for images with explicit width/height
- Use `next/font` for fonts (no `<link>` tags to Google Fonts)
- Use dynamic imports (`next/dynamic`) for heavy motion libraries (GSAP, Three.js if ever added)
- Avoid global CSS overrides — scope styles with Tailwind utilities or CSS modules
- Avoid layout shift: always reserve space for images/videos before they load

If a component adds more than 50KB to the bundle, flag it. We can always optimize later, but we should know.

---

## What to do when stuck

If a component isn't landing after 2-3 iterations:

1. **Stop iterating.** Each iteration adds complexity.
2. **Delete the component.** Start over with a cleaner spec.
3. **Study a specific reference.** Open rolls-royce.com or themacallan.com. Screenshot the exact moment that feels right.
4. **Prompt with the reference.** "Look at this screenshot. I want the same weight, spacing, and restraint. Here's our palette and typography. Build it."
5. **If still stuck, ask Yazan (not me).** Describe what's not working in one sentence. Yazan will redirect.

Don't drown in 10 iterations on a single component. Strip and restart faster.

Note from Beat 1: this rule needs nuance. For cinematic scroll scenes specifically, 5-7 iterations is normal and not a sign of failure, AS LONG AS the iterations stay at the render layer and the architecture stays frozen. If you find yourself iterating motion choreography or data structure on the third pass, that's the failure mode — strip and restart with a tighter spec.

---

## Final checklist before moving on from any component

- [ ] Builds clean with no errors or warnings
- [ ] Renders correctly at 375px, 768px, 1440px widths
- [ ] All colors come from CSS variables (no hardcoded hex in the component)
- [ ] All fonts come from the two loaded fonts (Fraunces + Inter)
- [ ] All spacing is from the scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 200)
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Every interactive element has a visible focus state
- [ ] Every image has alt text (or alt="" if decorative)
- [ ] Text is readable without motion (never motion-gate content)
- [ ] No AI-slop copy in the component
- [ ] No em dashes anywhere
- [ ] Content reads from `src/content/copy.ts`, not hardcoded
- [ ] Git committed as a single cohesive change

---

## Lessons from Beat 1 (PhoneScene)

The PhoneScene took roughly seven iterations from first POC to final ship: simple POC, fidelity rebuild, iOS modernization, app-distinct rebuild, plus two visual cleanup passes and one micro-interaction pass. Capturing what was learned so the next cinematic scene (Beat 2 onward) ships in three iterations instead of seven.

### What works (do this on every cinematic scene)

**Lock the architecture, iterate the render.**
The scroll mechanics, data model, and motion choreography should be settled in iteration 1 and never touched again. All subsequent passes happen at the render layer only — frame styling, typography, micro-interactions. This is what made Beat 1 converge. Every iteration that touched motion ranges or data structure was a regression.

**Use Lenis + Framer Motion + sticky h-screen as the proven scaffold.**
Pattern: `min-h-[Nvh] motion-reduce:min-h-screen` outer section + `sticky top-0 h-screen` inner container + `useScroll({ target: ref, offset: ['start start', 'end end'] })`. This is the foundation of every scroll-driven scene. Lenis must be wired globally via SmoothScroll.tsx in layout.tsx. Don't reach for GSAP or ScrollTrigger unless this pattern fails for a specific reason — it doesn't, for any scene we've needed.

**Custom UI beats fake real-app clones.**
We tried mocking Instagram and WhatsApp directly in v2. It read as fake-Instagram, not as real iOS. Pivoted to a unified custom messaging UI in v3 — that read as flat and didn't differentiate the phones. Final answer in v4: app-distinct visual language without literal app cloning. Each phone reads as "a different messaging app" but neither is a 1:1 recreation. This avoids legal/uncanny risks while preserving narrative variety.

**Phone fidelity requires every layer.**
Don't skip any of these:
- Outer frame with gradient (titanium feel)
- Inner bezel with proper inset
- Dynamic Island (the single most recognizable iOS signifier)
- Status bar with custom SVG icons (not lucide — lucide reads as web)
- Screen reflection overlay (subtle glass feeling)
- Tab bar (when app-appropriate) or its absence (Instagram DM screens have none)
- Home indicator pill at bottom

Skipping any single one of these breaks the illusion. The home indicator in particular is the cheapest, smallest element with the highest visual payoff.

**Micro-interactions are the line between "pretty" and "alive."**
Hover states on rows, click feedback on devices, focus rings on inputs (even decorative ones), warm-glow on hovered icons — these are what make the scene feel real, not just rendered. Always gate them behind `useReducedMotion`. The visual difference is the difference between "AI-coded marketing site" and "a real product page."

**Reduced motion is not optional.**
Build it as you go. The pattern: `if (reduce) return <StaticVersion />` early-return at the top of the motion component. Rendering motion components with style props set to `undefined` is harder to maintain than two render branches. Two branches, one for each mode, is cleaner long-term.

**Real-sounding data sells the scene.**
"Patient A / Patient B / Patient C" reads as placeholder. Real UAE names (Fatima Al Mansouri, Mohammed Al Rashid, Hassan Al Falasi) and realistic message previews ("Hi, I'd like to book a dermatology consultation for next week, are you available?") sell the argument. The visitor reads one phone and feels the loss. Generic placeholders make them notice the construction.

**Time evolution makes scenes argue, not just exist.**
The clock ticking forward, battery draining, timestamps aging from "5m ago" to "3d ago", new messages sliding in — these are what turn a static mockup into a story. Without time evolution, the phones argue "look, three phones exist." With time evolution, they argue "look, time is passing and nobody is replying." Same elements, different conversion.

### What doesn't work (avoid these on every cinematic scene)

**Don't iterate motion choreography after iteration 2.**
If your motion ranges, stagger timings, or scroll thresholds are still being adjusted on iteration 3+, the architecture is wrong and no amount of visual polish will save it. Strip and restart with a tighter spec.

**Don't compromise on typography weights to save a hex value.**
The micro-typography weights (15px / 14px / 13px at semibold / regular / regular for name / preview / timestamp) are what make the scene feel iOS-modern instead of generic web. These specific values matter. Don't approximate.

**Don't ship a custom global cursor.**
Per design system. They break trackpad gestures, look bad on retina, don't exist on touch (60% of UAE traffic). Use cursor-pointer on individual interactive elements instead — gives the same affordance without the breakage.

**Don't stack too many concurrent animations.**
Each cinematic scene is allowed one motion moment per scroll beat. Three phones entering with focus-pull is one moment. Mouse parallax responding to cursor is one moment. New messages sliding in is one moment. Try to stack four or five and the scene reads as chaotic. Less is more.

**Don't skip the Plan Mode review on cinematic scenes.**
This is the most expensive build category. A 600-line component touching one file looks small but it's not. Plan Mode review catches structural problems (hooks-in-loops, missing reduced-motion paths, color budget violations) before they're written into the code. Skip Plan Mode and you'll iterate 3 extra times.

### Iteration cost economics

Cinematic scenes average 5-7 iterations. Each iteration costs less than the previous one if architecture stays frozen. Budget time accordingly:

- POC iteration: 2-3 hours (motion mechanics, data model, basic render)
- Fidelity rebuild: 3-4 hours (proper frame, status bar, app UI)
- Polish iterations: 30-60 min each (typography tightening, micro-interactions, dwell timing)

Total for a single cinematic scene: 8-12 hours of focused work. Plan the homepage build accordingly — three cinematic beats (1, 2, 3) is roughly 30 hours of build time. The conversion-phase beats (4, 5, 6) are much faster: 1-2 hours each, because they're typography-driven, not motion-driven.

### When to start a new chat (model context management)

For Novacare-scale builds, start a new Claude chat at these natural boundaries:
- Between major beats (Beat 1 ships → new chat for Beat 2)
- When the previous chat has been through 5+ iterations on one component
- When the chat starts responding noticeably slower or referencing decisions imprecisely

Do NOT start a new chat:
- Mid-iteration on the same component
- When the conversation context contains active visual judgment that the new chat would have to reconstruct from screenshots
- When you're about to debug a specific error (you'll lose the diagnostic thread)

Always commit before transitioning chats. The new chat reads project files fresh; the only state that transfers is what's in git.
