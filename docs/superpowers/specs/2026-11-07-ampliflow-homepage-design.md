# Ampliflow homepage redesign — design

Date: 2026-11-07 · Owner: Vansh Srivastava · Build target: today

## 1. Intent

Vansh is applying for Ampliflow's **Frontend Developer Intern (vibe code)** role
(https://ampliflow.in/careers/frontend-developer-intern). The application form's
"Show your work" step says: *"Paste a Loom URL of a UI you'd improve, OR describe how
you'd rebuild a specific screen on ampliflow.in."*

We do both. We rebuild the **ampliflow.in homepage** as a working page: same content,
same brand, a real UI upgrade, aimed at turning more visitors into sign-ups. It is framed
as a gift to the founders: "here is a better version of your homepage." A **Redesign
notes** corner on the page lists each problem found on the live homepage and what this
version does instead. The Loom is a walkthrough of that corner.

Why this works for the application: it shows what the posting asks for. That means
React/TypeScript/Tailwind, "product taste — you can spot when UI feels off", finding
what's "slow, broken, or confusing", a bias to shipping (built in a day), and a
designer's instinct. Vansh is a game designer; the angle is *game feel*: every
interaction responds, nothing is decoration.

## 2. Goals

1. **Conversion.** Make signup one step, show the product working instead of
   describing it, move real trust signals up, end with an ask, and make mobile much
   shorter.
2. **Feel.** Polished, purposeful motion and feedback on every interaction.
3. **Accurate notes.** Every Redesign-notes entry is true on the live site today.
4. **Ship today.** A live URL on Vercel, a public GitHub repo and a Loom.

## 3. Non-goals

- Not rebuilding the Ampliflow **app**. Product views on the page are marketing demos
  with scripted data, not working software.
- No other pages (pricing, blog, use cases…). Nav and footer links go to the real
  ampliflow.in URLs.
- No backend, and the form never calls Ampliflow's API.
- No new brand. We keep their colours, fonts, voice and copy.

## 4. Anti-goals (failure even if it "works")

- It reads as effects sprinkled on the old page ("lights here and there").
- It is slower or heavier than the original (~900 KB, ~24 requests, ~1.8 s load on mobile emulation).
- It could be mistaken for the real ampliflow.in (impersonation).
- Any notes entry is wrong, or the tone is snarky. The founders wrote that page.
- It invents facts, numbers or testimonials about Ampliflow.

## 5. Constraints

- **Stack:** Vite + React + TypeScript + Tailwind CSS + `motion` (Motion for React), plus
  components from **Motion Primitives** (https://github.com/ibelick/motion-primitives),
  copied in via its shadcn registry. Deploy on **Vercel**. *(Claude's call; it matches
  the posting's stack and Vercel is on their nice-to-have list.)*
- **Brand tokens (from their styles.css):** primary `#2F37D9`, primary-hi `#4047e0`,
  primary-dim `rgba(47,55,217,.08)`, text `#0d0f14` / `#51556a` / `#6b6f80`, backgrounds
  `#ffffff` / `#f7f8fa` / `#eef0f4` / `#dfe2e8`, borders `rgba(15,17,23,.06/.10/.18)`,
  radius 6/8/12 px, red `#ef4444`. Fonts: **Inter** (400–700) and **Geist Mono**
  (400/500). Light theme. Keep their mono bracket labels (`[ SAFETY ]`, `● LIVE`).
- **Motion:** respect `prefers-reduced-motion`. Animations pause offscreen and when
  the tab is hidden.
- **Budget:** total transfer ≤ the original (~900 KB). Target Lighthouse mobile
  performance ≥ 90. No video, and no images heavier than needed.
- **Responsive:** 360–1440 px. At 390 px wide the page should be roughly half the
  original height (original: 13,019 px; target ≤ ~7,000 px).
- **Accessibility:** keyboard reachable, visible focus, correct roles for tabs,
  accordion and dialog. Contrast must pass AA.
- **Honesty label:** a visible but quiet label, *"Unofficial redesign concept by Vansh
  Srivastava · not affiliated with Ampliflow"*, in the top ribbon and the notes panel.
  *(Claude's call.)*
- **Copy rule:** keep their words. Fix things that are plainly errors (e.g. "six
  systems" when five are listed). Don't rewrite business claims we can't verify; flag
  those in the notes as **Needs you**. *(Claude's call.)*

## 6. Source material (in this folder)

- `reference/ampliflow-home.html` — live homepage HTML (all copy, FAQ answers, founder note).
- `reference/ampliflow-styles.css` — their CSS and tokens.
- `reference/ampliflow-careers.html` — the job posting.
- `reference/live-screens/` — `d00–d08` desktop slices, `m00–m08` mobile slices,
  `desk-fold.png`, `signup.png` (their sign-up page), and `dash-*.png` (their four product
  screenshots; use these for realistic demo data).

Facts we may use (all from their own pages):
- Founding offer: 100 spots, $19/mo for life. After that Standard is $39.
- Plans (pricing page): **Standard** $19 founding / $39 — 5 active campaigns, 2,500
  leads, per-step analytics, email support. **Pro** (most popular) $39 founding / $59 —
  unlimited campaigns, 10,000 leads, CSV + LinkedIn search sources, Slack + webhooks,
  priority support. **Team** $99 — unlimited, 50,000 leads, multiple accounts + per-seat
  billing, onboarding call. All plans: "7-day free trial. Billed on day 7. Cancel anytime."
- Safety (FAQ): 25 connection requests, up to 80 messages and up to 100 profile views a day
  (tiered by plan). Working hours, random timing jitter, auto-pause on reply, a dedicated
  country-matched proxy IP, a real-time safety score, and "Zero account restrictions
  across the beta."
- Founder note: Nivedita Verma, co-founder (LinkedIn linked on their page). "We closed a
  $700K angel round in June 2026 and we're building in public."
- Founders reply within 24 hours on weekdays. Contact hi@ampliflow.in.
- Integrations: 2 live (Slack, webhooks), 16 shipping through 2026.
- Real URLs: sign-up `https://app.ampliflow.in/sign-up` (Google, or email + a 6-digit code), sign-in
  `https://app.ampliflow.in`, founder call `https://calendly.com/advtaayush/discovery-call-with-aayush`.
- Funnel numbers from their analytics screenshot: 1,000 leads → 560 connections sent →
  267 accepted → 180 messages → 68 replies.

## 7. The page, top to bottom

Section order is decided. Visual treatment within each section is left to the builder,
within these rules.

0. **Concept ribbon.** A thin top bar carrying the honesty label and an "Open redesign
   notes" link.
1. **Nav.** Same links as the live site. A single primary CTA, "Start free trial". "Sign in" is secondary.
2. **Hero.** Same headline and subhead. Email field plus "Start 7-day free trial", and
   "or continue with Google" (their sign-up page offers Google). The microcopy uses
   their own words: "7-day free trial. Billed on day 7. Cancel anytime."
   **Form behaviour:** the recommended production flow is: keep their waitlist POST (lead
   capture + `?ref=` referral tracking), then send the visitor straight to sign-up with
   the email (and ref) passed along, skipping the "You're in" modal. Their sign-up page
   already uses email + a 6-digit code, so ideally it would land on "check your inbox".
   **On this concept page** there is no call to their API: submit shows a short success
   beat ("Saved, taking you to sign-up…"), then opens
   `app.ampliflow.in/sign-up?email=<email>` (plus `&ref=` if present). It opens in a new
   tab in a way pop-up blockers allow. *(Claude's call.)*
3. **Live product demo** (replaces the static screenshots, directly under the hero). It
   is built in HTML/React, legible at 360 px, with no scaled-down screenshots. There are
   three tabs. Keep their auto-advance with the countdown bar and pause on hover/tap
   (it's a good pattern).
   - **Workflow:** a lead travels Visit profile → (1 day) → Send invite → (3 days) → If
     connected → Message → reply arrives → sequence auto-pauses. Steps are clickable.
   - **Inbox:** replies arrive one by one. There's a "Needs reply" filter, statuses
     (Interested / Booked / Done), and an "auto-paused" badge on the sequence.
   - **Analytics:** the funnel uses their non-zero numbers above, and the rates must
     match the funnel. **No zeros.**
4. **Proof strip.** Real facts only: $700K angel round (June 2026) · zero account
   restrictions across the beta · founders reply within 24h · Slack + webhooks live.
5. **Safety spotlight.** This is their #1 claim ("Safety is the reason we exist"), so it
   gets its own section: an animated safety-score gauge plus the specific limits and
   protections from the FAQ (above). Today the safety score is never shown on the live
   page.
6. **Who it's for.** Founders / Sales & SDR teams / Recruiters / Agencies, with their
   copy and links to `/for/...`. Make it compact, e.g. a segmented switcher, not a tall
   list. Drop the tall "one platform" chip diagram.
7. **Features: "The complete outreach engine, in five systems."** These are the five
   systems they list. Each card shows a small live visual instead of an empty icon box
   (e.g. a pasted search URL ticking up to 1,000 leads; a closed laptop with the campaign
   still running; a reply pausing the sequence). No decorative filler cells.
8. **How it works.** The same 4 steps and the "under an hour" claim, as a compact
   timeline. Each step gets a tiny visual and there are no empty boxes.
9. **Pricing.** The founding offer leads, and all three plans (Standard / Pro / Team)
   are shown compactly with their real prices. No spots-left counter, because we don't
   know the real number.
10. **Testimonials.** Their quotes, unedited. Replace the pravatar.cc stock photos with
    initials. Demo data elsewhere on the page must **not** reuse testimonial author names.
    Use a horizontal swipe on mobile.
11. **Integrations.** Slack and webhooks are shown as live. The other 16 appear dimmed
    and marked "coming".
12. **FAQ.** Their 8 Q&As, unedited, in an accessible accordion.
13. **Founder note.** Their text, photo (`https://ampliflow.in/team-nivedita-400.webp`)
    and LinkedIn link.
14. **Closing CTA.** The email form again, plus "Talk to a founder" (their Calendly). The
    page never ends without an ask.
15. **Footer.** Their links (to real ampliflow.in URLs), plus "Redesign concept by Vansh
    Srivastava" with links to his portfolio (https://whenom-interactive.vercel.app/),
    GitHub (https://github.com/whenommmm) and LinkedIn (https://linkedin.com/in/vansh-srivastava-whenom/).
16. **Sticky CTA (mobile and desktop).** Shown after the hero. Hidden only while a signup
    form (hero or closing) is on screen.

## 8. Redesign notes corner

- **Entry point:** a pinned button in a corner, "Redesign notes · N". It sits bottom-left
  on desktop so it doesn't collide with the sticky CTA. On mobile it opens a bottom sheet.
- **Panel header:** the honesty label, one line of framing ("What I noticed on
  ampliflow.in and what this version does instead"), and links to Vansh's portfolio and
  LinkedIn.
- **Each entry:** **Found** (what happens on the live site today) · **Why it costs
  sign-ups** (one sentence) · **Changed** (what this page does), *or* a **Needs you**
  tag when only Ampliflow can fix it. Plus a **Show me** button that closes the panel,
  scrolls to the relevant section and briefly highlights it.
- **Groups and order:** Functional → Trust → Layout & mobile.
- **Tone:** "noticed / changed". Factual, warm, no snark, no "broken".
- **Rule:** each entry is re-checked against the live site on build day. Anything that
  can't be reproduced is dropped. The builder may add entries that pass the same check
  and are worth a founder's time; small things just get fixed quietly (e.g. the
  integrations wall shows more "coming" logos than its "16" label, including Chrome next
  to a "0 browser extensions" claim; our page shows a matching count and no Chrome).
- **Deliberately not an entry:** testimonial authors (Marcus R., Nikita V., Priya N.)
  share names with demo leads in the hidden hero feed and on the sign-up page's animation
  (Marcus Reid, Nikita Volkov, Priya Nair). Flagging it would imply the testimonials are
  placeholders, which is too pointed for a gift. We only make sure our own demo names
  differ. *(Claude's call.)* Two claims were already dropped after testing: "tabs
  switch too fast" (they pause on hover and on tap) and "the spots-left bar is hard-coded"
  (the element isn't on the page).

Entries (verified 2026-11-06/07; re-verify before shipping):

| # | Group | Found on live site | Changed / Needs you |
|---|---|---|---|
| F1 | Functional | Visitors type their email twice. The hero form saves it to the waitlist, then a "You're in" modal links to /sign-up without the email, so it's typed again. | Keep the waitlist save (no lost leads, referrals still count), then go straight to sign-up with the email passed along, with no modal in between. Google option shown up front. *Needs you:* sign-up reads `?email=` and sends the 6-digit code. |
| F2 | Functional | After the hero there's no signup form. The bottom form was removed (its JS handler remains), and the sticky "Claim spot" bar hides itself near the bottom. Readers who reach the end get only "Contact support". | Closing CTA with form + founder call. Sticky CTA logic based on form visibility. |
| F3 | Functional | A live, animated product demo (workflow, inbox, safety, analytics) is built into the page's HTML but hidden. Static screenshots are shown instead. | Live demo is the hero visual. |
| F4 | Functional | The safety score, which the FAQ calls something "no other tool ships", never appears visually on the page. | Dedicated safety spotlight. |
| F5 | Functional | On phones the product screenshot is ~330 px wide and unreadable. | Demo built for small screens. |
| F6 | Functional | The first product view shows "Active campaigns 0", "Acceptance rate 0%", "Reply rate 0%". Its funnel percentages (100/60/43/16%) also don't follow from its own counts (1,000/560/267/180/68). | Demo data uses their funnel counts, with rates computed from them. |
| T1 | Trust | The strongest trust facts ($700K round, zero restrictions in beta, 24h founder replies) sit at the very bottom or inside collapsed FAQ answers. | Proof strip under the hero. |
| T2 | Trust | Testimonials show first name + initial with photos from a random-avatar service (pravatar.cc), and no company or link, so a sceptical buyer can't verify them. | Initials instead of stock photos. *Needs you:* real company names / LinkedIn links. |
| T3 | Trust | Launch status reads two ways on the homepage: FAQ "Ampliflow is live and taking customers" vs founding perk "onboard before public launch". (The pricing page and careers page add "the day we launch" / "heading into beta".) | *Needs you:* pick one story; copy kept as-is here. |
| T4 | Trust | "The complete outreach engine, in six systems" lists five. | Heading says five. |
| T5 | Trust | The homepage pitches only the $19 founding price. The plans are only compared on /pricing; Pro's price appears only inside a collapsed FAQ answer, and Team isn't mentioned. | All three plans on the homepage. |
| L1 | Layout | The mobile page is ~13,000 px, about 15 phone screens. | Target ≤ ~7,000 px. |
| L2 | Layout | "How it works" and feature cards are mostly empty space, with two decorative filler cells. | Every block shows something. |
| L3 | Layout | The "one platform" diagram stacks into a tall column of chips on mobile. | Removed; personas made compact. |

## 9. What Vansh decided

- Rebuild the homepage only, not the app. Same content, a real UI upgrade (not
  decoration), optimised for visitor → user conversion.
- A separate corner listing the problems found (like the double email).
- Framed as a gift to the founders. Built today.
- Use Motion Primitives.

## 10. Claude's calls (check these)

- Stack (Vite/React/TS/Tailwind/Motion) and Vercel hosting.
- Keep their brand exactly. Light theme only.
- Honesty label in the ribbon, the notes panel and the footer.
- Recommended flow: keep the waitlist save, then go straight to sign-up with the email.
  The concept page itself makes no API calls; it opens their real sign-up page with `?email=`.
- The testimonial/demo-name overlap is not a notes entry.
- The builder may add verified notes entries.
- Copy rule: fix plain errors, flag unverifiable business claims as "Needs you".
- Safety gets its own section. The demo has 3 tabs (Workflow / Inbox / Analytics).
- Initials instead of stock testimonial photos. Demo names never match testimonial names.
- Notes button bottom-left, bottom sheet on mobile.
- Spec location: `docs/superpowers/specs/` in this folder.

## 11. Left to the builder

Exact layouts, animation choreography, which Motion Primitives components to use, demo
data names and timings, micro-copy inside the demo, and the build order.

## 12. Deliverables and "done"

- A public GitHub repo (Vansh's account) and a Vercel deployment (Vansh logs in and deploys).
- Done means:
  - Correct at 390 px and 1440 px.
  - Reduced-motion works.
  - No console errors.
  - Mobile height ≤ ~7,000 px.
  - Lighthouse mobile performance ≥ 90 (target).
  - Every notes entry re-verified, with a working "Show me".
  - The honesty label is visible.
- After the build (Vansh): a 2–3 min Loom walking through the notes corner. The form's
  "Show your work" field gets the Loom URL, the live URL and two lines of context. "Why
  this role" uses the 191-word draft from this session.
