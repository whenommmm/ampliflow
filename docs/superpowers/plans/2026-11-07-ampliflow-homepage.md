# Ampliflow Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page React rebuild of the ampliflow.in homepage, with a live product demo and a "Redesign notes" corner, deployable to Vercel today.

**Architecture:** Vite SPA. All copy lives in typed data modules (`src/content/*`); sections are presentational components that read from them. A small `lib/` holds the only real logic: signup URL building, email validation, funnel rates and the scroll-and-highlight used by "Show me". Motion Primitives components are vendored into `src/components/motion-primitives/`.

**Tech Stack:** Vite 6, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), `motion` 12, Motion Primitives (vendored), lucide-react icons, Vitest + Testing Library, Playwright (`channel: 'chrome'`).

**Spec:** `docs/superpowers/specs/2026-11-07-ampliflow-homepage-design.md`

**Execution:** Native (user said "u build"; no plan review). See memory `build-first-no-doc-reading`.

## Global Constraints

- Brand tokens exactly as spec §5: primary `#2F37D9`, primary-hi `#4047e0`, primary-dim `rgba(47,55,217,.08)`, t1 `#0d0f14`, t2 `#51556a`, t3 `#6b6f80`, bg `#ffffff`/`#f7f8fa`/`#eef0f4`/`#dfe2e8`, borders `rgba(15,17,23,.06/.10/.18)`, radius 6/8/12, red `#ef4444`. Inter 400–700 and Geist Mono 400/500. Light theme only.
- Copy comes verbatim from `reference/ampliflow-home.html` except plain-error fixes ("five systems").
- No requests to `ampliflow.in` APIs. Images may hotlink `https://ampliflow.in/team-nivedita-400.webp`.
- `prefers-reduced-motion`: no auto-advance, no counters animating; final states shown.
- Honesty label text: "Unofficial redesign concept by Vansh Srivastava · not affiliated with Ampliflow".
- `<meta name="robots" content="noindex">`.
- Demo names must not include Marcus, Sara/Sarah, Nikita, Alex, Priya, Tomas, Daniel, Emma, Ravi, Elena, James.
- Mobile (390 px) document height ≤ 7,000 px; no horizontal overflow at 360 px.

## Review Focus

1. Invalid or empty email submitted → inline error, focus stays, no navigation. (Task 1 unit test + Task 3 component test.)
2. Pop-up blockers: the sign-up tab must open synchronously inside the submit handler, with a visible fallback link. (Task 3 component test asserts `window.open` called synchronously.)
3. "Show me" targets hidden UI (a demo tab, an FAQ item): it must activate that tab/item before scrolling and highlighting. (Task 7 e2e.)
4. Reduced motion: the demo doesn't auto-advance; numbers show final values. (Task 8 e2e.)
5. 360 px wide screens: no horizontal scroll, demo readable. (Task 8 e2e.)

---

### Task 1: Scaffold, tokens, core lib

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore` (ignores `reference/`, `node_modules`, `dist`)
- Create: `src/lib/signup.ts`, `src/lib/funnel.ts`, `src/lib/cn.ts`
- Test: `src/lib/signup.test.ts`, `src/lib/funnel.test.ts`

**Interfaces:**
- Produces: `isValidEmail(s: string): boolean`; `buildSignupUrl(email: string, ref?: string | null): string` → `https://app.ampliflow.in/sign-up?email=…[&ref=…]`; `readRef(search: string): string | null` (accepts `/^[A-Za-z0-9_-]{6,12}$/` like the live site); `funnelRates(c: FunnelCounts): FunnelRates` where `FunnelCounts = {leads, sent, accepted, messaged, replied}` and rates are integer percents: `sentOfLeads`, `acceptRate` (accepted/sent), `replyRate` (replied/messaged), `overall` (replied/leads); `cn(...classes)`.

- [ ] Write tests: `buildSignupUrl('a@b.co')` → `https://app.ampliflow.in/sign-up?email=a%40b.co`; with ref `abc123` appends `&ref=abc123`; `readRef('?ref=bad!')` → null; `isValidEmail('x')` false, `isValidEmail(' you@company.com ')` true (trims); `funnelRates({leads:1000,sent:560,accepted:267,messaged:180,replied:68})` → `{sentOfLeads:56, acceptRate:48, replyRate:38, overall:7}`.
- [ ] Run `npx vitest run` → FAIL. Implement. Run → PASS.
- [ ] Tokens in `src/index.css` via Tailwind v4 `@theme`; fonts via Google Fonts link in `index.html`.
- [ ] `git init`, commit.

### Task 2: Content data + notes integrity

**Files:**
- Create: `src/content/site.ts` (nav, hero, proof, safety, personas, features, steps, plans, founding perks, testimonials, integrations, faq, founder, footer), `src/content/demo.ts` (workflow steps, inbox threads, funnel counts), `src/content/notes.ts`, `src/content/sections.ts`
- Test: `src/content/notes.test.ts`

**Interfaces:**
- Produces: `SECTION_IDS` const tuple: `hero, demo, proof, safety, personas, features, how, pricing, testimonials, integrations, faq, founder, closing`; `type SectionId`.
- `type NoteTarget = { section: SectionId; demoTab?: 'workflow'|'inbox'|'analytics'; faqIndex?: number }`.
- `type Note = { id: string; group: 'Functional'|'Trust'|'Layout & mobile'; title: string; found: string; why: string; changed: string; needsYou?: string; target: NoteTarget }`; `NOTES: Note[]` (spec §8 table, F1–F6, T1–T5, L1–L3).

- [ ] Tests: every `note.target.section` ∈ `SECTION_IDS`; ids unique; every note has non-empty `found`, `why`, and `changed`; no demo name (from `demo.ts`) matches the banned list in Global Constraints; the FAQ has 8 items; plans has 3 with prices 19/39, 39/59, 99.
- [ ] Run → FAIL, write data, run → PASS, commit.

### Task 3: Page shell, email form, CTAs

**Files:**
- Create: `src/components/EmailForm.tsx`, `src/sections/{Ribbon,Nav,Hero,ClosingCta,Footer,StickyCta}.tsx`, `src/components/ui.tsx` (Button, MonoLabel, Section wrapper with `id`)
- Test: `src/components/EmailForm.test.tsx`

**Interfaces:**
- Produces: `<EmailForm source="hero"|"closing" />`; `<Section id: SectionId>`; a `useFormVisibility()` store that StickyCta reads (hidden while any EmailForm is intersecting).

- [ ] Tests: an invalid email shows the `role="alert"` text "Please enter a valid work email." and `window.open` is not called. A valid email calls `window.open(buildSignupUrl(email, ref), '_blank', 'noopener')` synchronously in the submit handler, then shows the success text plus a fallback link with the same href.
- [ ] FAIL → implement → PASS → commit.

### Task 4: Live product demo

**Files:**
- Create: `src/sections/ProductDemo.tsx`, `src/sections/demo/{WorkflowDemo,InboxDemo,AnalyticsDemo}.tsx`, `src/hooks/useAutoAdvance.ts`
- Vendor: `src/components/motion-primitives/{animated-background,animated-number,transition-panel,in-view}.tsx`

**Interfaces:**
- Produces: a demo tab controller exposed via `DemoContext` with `setTab(tab)`, used by the notes "Show me".
- `useAutoAdvance(count, ms=6000, {paused})` pauses on hover, focus-within, touch and offscreen, and is disabled under reduced motion.

- [ ] Build three tabs: the countdown bar, pause behaviour, analytics using `funnelRates`, and the workflow lead-travel animation. Check visually at 390 and 1440 (Playwright screenshot). Commit.

### Task 5: Proof, Safety, Personas, Features, How it works

**Files:** `src/sections/{ProofStrip,Safety,Personas,Features,HowItWorks}.tsx`

- [ ] Safety gauge animates to 98 (AnimatedNumber + SVG arc); limits come from `site.ts`. Personas use a segmented switcher (AnimatedBackground). Features: five cards with mini visuals. How it works: a 4-step compact timeline. Screenshot check, commit.

### Task 6: Pricing, Testimonials, Integrations, FAQ, Founder

**Files:** `src/sections/{Pricing,Testimonials,Integrations,Faq,Founder}.tsx`; vendor `accordion`, `infinite-slider`.

**Interfaces:** Faq exposes `openFaq(index)` via `FaqContext` for "Show me".

- [ ] Build. FAQ is keyboard accessible (`aria-expanded`). Integrations: 2 live plus 16 "coming", no Chrome. Screenshot check, commit.

### Task 7: Redesign notes corner

**Files:** `src/notes/{NotesButton,NotesPanel,showMe}.ts(x)`; vendor `border-trail` if used.

**Interfaces:** `showMe(target: NoteTarget)` closes the panel, calls `setTab`/`openFaq` if needed, scrolls the section into view, then adds a `data-highlight` ring for 2.4 s.

- [ ] e2e (`e2e/notes.spec.ts`): open the panel and count entries == `NOTES.length`. For each entry, click Show me and assert the target section is in the viewport. For F6, assert the Analytics tab is selected. For T3, assert FAQ item 5 is expanded. Esc closes the panel. At 390 px the panel renders as a bottom sheet.
- [ ] FAIL → implement → PASS → commit.

### Task 8: Verification pass

**Files:** `e2e/page.spec.ts`, `playwright.config.ts` (`use: { channel: 'chrome' }`, `webServer: npm run preview`)

- [ ] Tests:
  - No console errors on load.
  - At 360 px, `scrollWidth <= clientWidth`.
  - At 390 px, document height ≤ 7000.
  - Under reduced motion, the safety gauge text reads "98" and the demo tab doesn't change after 7 s.
  - The ribbon contains the honesty label.
  - The robots meta is noindex.
- [ ] `npm run build`. Total `dist` + fonts transfer < 900 KB. Commit.
- [ ] Re-verify every notes entry against live ampliflow.in (Playwright probe + screenshots). Drop or reword anything that fails.

### Task 9: Ship

- [ ] Check `gh auth status` and `vercel whoami`. If they're logged in, ask Vansh before creating the public repo and deploying. Otherwise give him the two commands.
