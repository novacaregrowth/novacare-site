# Novacare — Claude Code Workflow Guide

> The missing manual. How to use Claude Code, the installed MCPs/plugins, the ui-ux-pro-max skill, and how to write prompts that produce non-generic output for Novacare's site.
>
> Read this before prompting Claude Code for any non-trivial task. It will save you hours of iteration.

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

---

## Workflow for building a new page — step by step

This is the playbook for building each of: Home, Work, Services, About, Contact, Case Study.

### Step 1: Ensure copy exists

Check `src/content/copy.ts` has the relevant page's copy populated. If not, fill it first using `novacare-copy.md` as the source.

### Step 2: Plan the sections

List every section the page contains. Example for Home:
1. Hero
2. Positioning statement
3. Services (3 tiers)
4. Featured case study
5. Why Novacare (4 points)
6. Closing CTA

### Step 3: Build sections one at a time

For each section, use Pattern 1 (Component build prompt). Build, test, verify, then move to the next.

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
