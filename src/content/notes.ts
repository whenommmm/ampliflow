import type { SectionId } from './sections'
import type { DemoTab } from './demo'

export type NoteGroup = 'Functional' | 'Trust' | 'Layout & mobile'

export type NoteTarget = { section: SectionId; demoTab?: DemoTab; faqIndex?: number }

export type Note = {
  id: string
  group: NoteGroup
  title: string
  found: string
  why: string
  changed: string
  needsYou?: string
  target: NoteTarget
}

// Every entry was checked against the live ampliflow.in on 2026-11-06/07.
// Tone: what I noticed, what this version does. The founders wrote that page.

export const NOTES: Note[] = [
  {
    id: 'F1',
    group: 'Functional',
    title: 'The email gets typed twice',
    found:
      'The hero form saves the email to your waitlist, then the “You’re in” modal links to app.ampliflow.in/sign-up without it, so the visitor types it again.',
    why: 'Every extra field between intent and account is a place people leave, right at the moment they were most ready.',
    changed:
      'Keep the waitlist save (no lost leads, referrals still count), then go straight to sign-up with the email passed along, with no modal in between. “Continue with Google” sits next to the form too.',
    needsYou: 'Sign-up reads ?email= and sends the 6-digit code straight away. On this concept page the form opens your real sign-up with the email attached.',
    target: { section: 'hero' },
  },
  {
    id: 'F2',
    group: 'Functional',
    title: 'The page ends without an ask',
    found:
      'After the hero there’s no signup form. The bottom form was removed (its handler is still in the code), and the sticky “Claim spot” bar hides itself near the bottom, so readers who reach the end only see “Contact support”.',
    why: 'The people who read to the bottom are the most convinced visitors on the page.',
    changed: 'A closing section with the email form and a “Talk to a founder” option. The sticky bar only hides while a form is already on screen.',
    target: { section: 'closing' },
  },
  {
    id: 'F3',
    group: 'Functional',
    title: 'Your live demo is built, but hidden',
    found:
      'The page HTML already contains an animated product demo (workflow, inbox, safety, analytics) that’s switched off. Static screenshots are shown in its place.',
    why: 'Seeing a lead move through a sequence sells cloud automation faster than any screenshot of it.',
    changed: 'The live demo is the hero visual: a lead travels the workflow, replies arrive in the inbox, the funnel fills in.',
    target: { section: 'demo', demoTab: 'workflow' },
  },
  {
    id: 'F4',
    group: 'Functional',
    title: 'The safety score never appears',
    found:
      'The FAQ calls the real-time safety score something “no other tool ships”, but visitors only ever read about it. The panel that actually shows a score (“Safety score / 100”) sits in the hidden demo.',
    why: 'Account safety is the #1 worry for anyone automating LinkedIn, and it’s your strongest difference.',
    changed: 'Safety gets its own section: the score, today’s limits and the protections behind them.',
    target: { section: 'safety' },
  },
  {
    id: 'F5',
    group: 'Functional',
    title: 'On phones, the product is a thumbnail',
    found: 'On a 390 px phone, the dashboard screenshot shrinks to about 300 px wide. Its text can’t be read.',
    why: 'Most first visits from LinkedIn happen on a phone.',
    changed: 'The demo is built in HTML for small screens, so every label stays readable at 360 px.',
    target: { section: 'demo', demoTab: 'inbox' },
  },
  {
    id: 'F6',
    group: 'Functional',
    title: 'The first product view shows zeros',
    found:
      'The first screenshot visitors see shows “Active campaigns 0”, “Acceptance rate 0%” and “Reply rate 0%”. Its funnel percentages (100/60/43/16%) also don’t follow from its own counts (1,000/560/267/180/68).',
    why: 'A dashboard full of zeros reads as “this doesn’t work yet”, even when it’s just sample data.',
    changed: 'The analytics demo uses the same counts, with every rate computed from them.',
    target: { section: 'demo', demoTab: 'analytics' },
  },
  {
    id: 'T1',
    group: 'Trust',
    title: 'The strongest proof is at the bottom',
    found:
      'The $700K angel round, “zero account restrictions across the beta” and 24-hour founder replies all sit near the very bottom: in the founder note, the FAQ intro and “Still stuck?” box, or inside a collapsed FAQ answer.',
    why: 'Buyers decide whether to trust a LinkedIn tool in the first screen, not the last.',
    changed: 'A proof strip right under the product demo, using only facts from your own page.',
    target: { section: 'proof' },
  },
  {
    id: 'T2',
    group: 'Trust',
    title: 'Testimonials are hard to verify',
    found: 'Each testimonial shows a first name and initial, a photo from a random-avatar service (pravatar.cc), and no company or link.',
    why: 'Outreach buyers are sceptical by trade. Unverifiable quotes can work against you.',
    changed: 'Quotes kept word for word, with initials instead of stock photos.',
    needsYou: 'Real company names or LinkedIn links for the people quoted, when they’re happy to be named.',
    target: { section: 'testimonials' },
  },
  {
    id: 'T3',
    group: 'Trust',
    title: 'Launched, or not yet?',
    found:
      'The FAQ says “Ampliflow is live and taking customers”, while the founding perks promise “2 weeks early access, onboard before public launch”. (The pricing page says the price doubles “the day we launch”.)',
    why: 'Mixed signals about launch status make people wonder which other details are out of date.',
    changed: 'Copy kept as-is here. I didn’t want to guess your launch story.',
    needsYou: 'Pick one version of the launch story and use it everywhere.',
    target: { section: 'faq', faqIndex: 4 },
  },
  {
    id: 'T4',
    group: 'Trust',
    title: '“Six systems” lists five',
    found: 'The heading says “The complete outreach engine, in six systems.” The grid below lists five, plus a decorative globe.',
    why: 'A small slip, but it’s in a headline.',
    changed: 'The heading says five, and each of the five shows itself working.',
    target: { section: 'features' },
  },
  {
    id: 'T5',
    group: 'Trust',
    title: 'Only one price is pitched',
    found:
      'The homepage pitches only the $19 founding price. Plans are compared only on /pricing; Pro’s price appears only inside a collapsed FAQ answer, and Team isn’t mentioned.',
    why: 'Agencies and teams looking for multi-account support don’t see a plan for them.',
    changed: 'All three plans, at their real prices, sit under the founding offer.',
    target: { section: 'pricing' },
  },
  {
    id: 'L1',
    group: 'Layout & mobile',
    title: 'Mobile is about 15 screens long',
    found: 'At 390 px wide the homepage is 13,019 px tall, roughly 15 phone screens of scrolling.',
    why: 'Every extra screen is another chance to leave before the next call to action.',
    changed: 'Denser sections and swipeable rows bring this page to about 8,900 px on the same phone, roughly a third shorter, while adding the live demo, the safety panel and all three plans.',
    target: { section: 'features' },
  },
  {
    id: 'L2',
    group: 'Layout & mobile',
    title: 'Cards that are mostly empty',
    found: 'On mobile, each “How it works” card is ~340 px tall and holds a title and two lines of text. On desktop, two of its six grid cells are purely decorative.',
    why: 'Space without content reads as “nothing to see here”, and people scroll faster past it.',
    changed: 'Each step and feature shows a small piece of the product doing that thing.',
    target: { section: 'how' },
  },
  {
    id: 'L3',
    group: 'Layout & mobile',
    title: 'The platform diagram stacks into a tall column',
    found: 'On phones, the “one platform” chip diagram turns into a tall column of six chips and three cards before the persona list even starts.',
    why: 'It pushes the part that says “this is for you” below the fold.',
    changed: 'Personas became a compact switcher: pick your role, read the one line that matters to you.',
    target: { section: 'personas' },
  },
]
