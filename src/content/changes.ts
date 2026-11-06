import type { SectionId } from './sections'

// Before/after cards shown inline under each changed section.
// "Before" screenshots: live ampliflow.in, captured 7 Nov 2026 (public/before/).
// Heights measured at 390px wide (iPhone 13) on the clean page, cards hidden.

export type Change = {
  id: string
  section: SectionId
  notes: string[]
  kind: 'Functional' | 'Trust' | 'Layout'
  title: string
  before: { src: string; mobileSrc?: string; alt: string; focus?: string; mobileFocus?: string }
  was: string
  now: string
  better: string[]
  stat?: { label: string; before: string; after: string }
  needsYou?: string
}

export const CHANGES: Change[] = [
  {
    id: 'signup',
    section: 'hero',
    notes: ['F1'],
    kind: 'Functional',
    title: 'Signup in one step, not two',
    before: { src: '/before/hero.jpg', alt: 'Live ampliflow.in hero with an email field and a “Get 7 days free” button' },
    was: 'An email field that saves you to the waitlist, then a “You’re in” modal whose button opens app.ampliflow.in/sign-up, where you type the same email again.',
    now: 'One field. The email goes straight to sign-up (in production, after the same waitlist save). “Continue with Google” sits beside it, and the trial terms sit under the button.',
    better: [
      'One email field instead of two, at the moment intent is highest.',
      'No dead-end modal: the next screen is the account, not a message about it.',
      '“Billed on day 7. Cancel anytime.” answers the first objection before it’s asked.',
    ],
    stat: { label: 'Times you type your email', before: '2', after: '1' },
  },
  {
    id: 'demo',
    section: 'demo',
    notes: ['F3', 'F5', 'F6'],
    kind: 'Functional',
    title: 'Screenshots became a product you can play with',
    before: {
      src: '/before/showcase.jpg',
      mobileSrc: '/before/showcase-mobile.jpg',
      alt: 'Live ampliflow.in product showcase: tabs over a static dashboard screenshot showing 0 active campaigns and 0% rates',
    },
    was: 'Four tabs of static dashboard screenshots. The first shows “Active campaigns 0” and 0% rates; on a phone it shrinks to about 300px wide. A live, animated demo already existed in the page’s code, switched off.',
    now: 'A working mini-app: a lead travels the sequence (click any step), replies land in the inbox and pause the campaign, and the funnel fills with rates computed from its own counts.',
    better: [
      'Shows the core promise, outreach running on its own, instead of describing it.',
      'No zeros, and every number agrees with every other number.',
      'Built in HTML, so it stays sharp on the phone people open LinkedIn links on.',
    ],
    stat: { label: 'Readable on a 390px phone', before: 'No', after: 'Yes' },
  },
  {
    id: 'proof',
    section: 'proof',
    notes: ['T1'],
    kind: 'Trust',
    title: 'Proof moved from the footer to the first scroll',
    before: { src: '/before/founder.jpg', focus: '50% 60%', alt: 'Live ampliflow.in founder note near the bottom of the page, mentioning the $700K angel round' },
    was: 'The $700K angel round sat in the founder note at the very bottom. “Zero account restrictions across the beta” was inside a collapsed FAQ answer, and the 24-hour founder reply sat in the FAQ intro.',
    now: 'Four facts from your own page in one strip, right under the product demo.',
    better: [
      'People buying LinkedIn automation decide on trust first; now trust arrives with the product.',
      'Nothing new is claimed. It’s only moved to where it gets read.',
    ],
    stat: { label: '“$700K” appears, down the page (desktop)', before: '92%', after: '15%' },
  },
  {
    id: 'safety',
    section: 'safety',
    notes: ['F4'],
    kind: 'Functional',
    title: 'The safety score, finally on screen',
    before: { src: '/before/features.jpg', alt: 'Live ampliflow.in feature grid where safety is one line of text in a blue card' },
    was: 'Safety, your #1 claim, appeared as text: a line in a feature card and an FAQ answer. The panel that shows a score (“Safety score / 100”) sat in the hidden demo.',
    now: 'A section of its own: an animated score gauge, today’s actions against the daily caps, working hours, warm-up, anomalies, and the randomised wait before the next action.',
    better: [
      'Turns “trust us” into something visitors can watch working.',
      'Answers the question every LinkedIn-automation buyer asks first: will this get my account restricted?',
    ],
    stat: { label: 'Safety score visible', before: 'Hidden', after: 'Shown' },
  },
  {
    id: 'personas',
    section: 'personas',
    notes: ['L3'],
    kind: 'Layout',
    title: 'A tall diagram became a one-tap switcher',
    before: {
      src: '/before/platform.jpg',
      mobileSrc: '/before/platform-mobile.jpg',
      mobileFocus: '50% 30%',
      alt: 'Live ampliflow.in “Built for every outreach team” section: a hub diagram of chips beside four persona rows',
    },
    was: 'A hub diagram of six chips and three cards next to four persona rows. On phones the diagram stacks into a tall column before the personas even start.',
    now: 'A four-way switcher: pick your role, read the one line written for you, jump to its use-case page.',
    better: ['The “this is for me” moment takes one tap instead of a long scroll.', 'Every persona keeps its link to the deeper /for/ page.'],
    stat: { label: 'Section height on a phone', before: '1,800px', after: '578px' },
  },
  {
    id: 'features',
    section: 'features',
    notes: ['T4', 'L2'],
    kind: 'Trust',
    title: 'Five systems that show themselves working',
    before: { src: '/before/features.jpg', alt: 'Live ampliflow.in “in six systems” heading over five blue feature cards and a decorative globe' },
    was: '“The complete outreach engine, in six systems” over five blue cards and a decorative globe. Each card: an icon, a title and two lines of text.',
    now: 'Five cards, each with its system doing its job: a sequence branching, a laptop closed while the cloud keeps sending, a search import counting to 1,000, safety switches turning on, replies pausing a sequence.',
    better: [
      'The heading’s count matches the cards.',
      'Each feature proves itself instead of describing itself.',
      'On phones the cards swipe sideways instead of stacking.',
    ],
    stat: { label: 'Section height on a phone', before: '1,996px', after: '621px' },
  },
  {
    id: 'how',
    section: 'how',
    notes: ['L2'],
    kind: 'Layout',
    title: 'Four tall cards became one timeline',
    before: { src: '/before/how.jpg', mobileSrc: '/before/how-mobile.jpg', mobileFocus: '50% 45%', alt: 'Live ampliflow.in “How it works” grid: four mostly empty step cards and two decorative cells' },
    was: 'Four step cards, each 340px tall on phones with a title and two lines of text, plus two purely decorative cells on desktop.',
    now: 'A timeline that fills as you scroll, each step tagged with the real thing it involves: Unipile OAuth, a search URL or CSV, the Visit → Connect flow, running while you sleep.',
    better: ['Same four steps, a third of the height.', 'Reads as a sequence, which is what it is.'],
    stat: { label: 'Section height on a phone', before: '1,867px', after: '628px' },
  },
  {
    id: 'pricing',
    section: 'pricing',
    notes: ['T5'],
    kind: 'Trust',
    title: 'One price became a plan for everyone',
    before: { src: '/before/founding.jpg', alt: 'Live ampliflow.in founding member offer: $19/mo for life, with a list of perks' },
    was: 'One founding offer at $19/mo. Pro’s $59 appeared only inside a collapsed FAQ answer; Team ($99) wasn’t on the homepage at all.',
    now: 'The founding offer leads, and all three plans sit side by side at their real prices, each with its trial terms and a “Start free trial” button.',
    better: [
      'Agencies and teams see a plan made for them without leaving the page.',
      'Comparing plans is the step right before buying; now it happens here, with “Compare every feature” one click away.',
    ],
    stat: { label: 'Plans on the homepage', before: '1', after: '3' },
  },
  {
    id: 'testimonials',
    section: 'testimonials',
    notes: ['T2'],
    kind: 'Trust',
    title: 'Quotes you can read, without stock faces',
    before: { src: '/before/testimonials.jpg', alt: 'Live ampliflow.in testimonial marquee with photos from a random-avatar service' },
    was: 'A sliding marquee of six quotes, each with a first name and initial and a photo from a random-avatar service.',
    now: 'The same six quotes, word for word, in a still grid (swipeable on phones), with initials instead of stock photos.',
    better: ['Nothing on the page looks borrowed.', 'You can read a quote without chasing it across the screen.'],
    stat: { label: 'Stock photos', before: '6', after: '0' },
    needsYou: 'Real company names or LinkedIn links, once customers agree to be named.',
  },
  {
    id: 'faq',
    section: 'faq',
    notes: ['T3'],
    kind: 'Trust',
    title: 'One story about launch, please',
    before: { src: '/before/faq.jpg', alt: 'Live ampliflow.in FAQ list' },
    was: 'The FAQ says “Ampliflow is live and taking customers”, while the founding perks promise “2 weeks early access, onboard before public launch”.',
    now: 'Kept word for word here and flagged instead. I didn’t want to guess which one is true.',
    better: ['Rewriting someone’s launch story without asking would be worse than leaving it.', 'One decision from you fixes it everywhere.'],
    needsYou: 'Pick one version of the launch story.',
  },
  {
    id: 'closing',
    section: 'closing',
    notes: ['F2'],
    kind: 'Functional',
    title: 'The page ends with an ask',
    before: { src: '/before/founder.jpg', alt: 'Live ampliflow.in founder note, the last section before the footer' },
    was: 'The page ended on the founder note and the footer. The bottom signup form had been removed, and the sticky “Claim spot” bar hides itself near the bottom, so the last thing to click was “Contact support”.',
    now: 'A closing section with the email form and a “Talk to a founder” call. The sticky bar now steps aside only while a form is already on screen.',
    better: ['The most convinced visitors, the ones who read to the end, finally get an ask.', 'Two ways in: start a trial, or talk to a founder first.'],
    stat: { label: 'Signup forms on the page', before: '1', after: '2' },
  },
]

export const PAGE_LENGTH = {
  notes: ['L1'],
  before: 13019,
  after: 9043,
  phone: 844, // iPhone 13 viewport height
}
