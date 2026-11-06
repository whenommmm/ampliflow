// All copy below is taken from ampliflow.in (homepage, pricing page) as of 2026-11-07.
// Only plain errors are corrected (e.g. "six systems" listed five). See notes.ts.

const AF = 'https://ampliflow.in'

export const links = {
  signIn: 'https://app.ampliflow.in',
  signUp: 'https://app.ampliflow.in/sign-up',
  founderCall: 'https://calendly.com/advtaayush/discovery-call-with-aayush',
  support: 'mailto:hi@ampliflow.in',
  pricing: `${AF}/pricing`,
  compare: `${AF}/pricing#compare`,
}

export const concept = {
  label: 'Unofficial redesign concept by Vansh Srivastava · not affiliated with Ampliflow',
  author: 'Vansh Srivastava',
  portfolio: 'https://whenom-interactive.vercel.app/',
  github: 'https://github.com/whenommmm',
  linkedin: 'https://linkedin.com/in/vansh-srivastava-whenom/',
}

export const nav = {
  links: [
    { label: 'Pricing', href: links.pricing },
    {
      label: 'Resources',
      items: [
        { label: 'Blog', href: `${AF}/blog/` },
        { label: 'Alternatives', href: `${AF}/alternatives/` },
        { label: 'Comparisons', href: `${AF}/vs/` },
        { label: 'Templates', href: `${AF}/templates/` },
        { label: 'Glossary', href: `${AF}/learn/` },
        { label: 'Use cases', href: `${AF}/for/` },
      ],
    },
    { label: 'About', href: `${AF}/about` },
    {
      label: 'Company',
      items: [
        { label: 'Careers', href: `${AF}/careers` },
        { label: 'Investors', href: `${AF}/investors` },
        { label: 'Press', href: `${AF}/press` },
        { label: 'Contact', href: `${AF}/contact` },
      ],
    },
  ] as Array<{ label: string; href?: string; items?: { label: string; href: string }[] }>,
  signIn: 'Sign in',
  cta: 'Start free trial',
}

export const hero = {
  pillTag: 'LIVE',
  pill: 'Founding member offer · Only 100 spots',
  titleStart: 'Turn LinkedIn outreach into',
  titleAccent: 'pipeline',
  subBefore: 'Reach hundreds of qualified prospects and ',
  subBold: 'book more meetings',
  subAfter: ', with safe, automated LinkedIn outreach built for SaaS founders, SDRs, and recruiters.',
  cta: 'Get 7 days free',
  google: 'Continue with Google',
  fine: '7-day free trial. Billed on day 7. Cancel anytime.',
}

export const proof = [
  { value: '$700K', label: 'angel round, June 2026' },
  { value: '0', label: 'account restrictions across the beta' },
  { value: '24h', label: 'founder reply, every weekday' },
  { value: '24/7', label: 'cloud execution, 0 browser extensions' },
]

export const safety = {
  eyebrow: 'Account safety',
  title: 'Safety is the reason we exist.',
  sub: 'Every action respects human-like daily limits, runs only during your configured working hours, and adds randomised timing jitter between actions. A real-time safety score watches your account for anomalies and warns you before issues happen.',
  score: 98,
  status: 'Healthy',
  limits: [
    { label: 'Connection requests', max: 25, today: 18 },
    { label: 'Messages', max: 80, today: 41 },
    { label: 'Profile views', max: 100, today: 63 },
  ],
  limitsNote: 'Daily limits, tiered by plan',
  rows: [
    { label: 'Working hours', value: '9:00 to 18:00' },
    { label: 'Warm-up mode', value: 'On' },
    { label: 'Anomalies detected', value: '0' },
  ],
  guards: [
    { title: 'Auto-pause on reply', body: 'The moment a lead replies, the sequence auto-pauses.' },
    { title: 'Your own country’s IP', body: 'A dedicated, country-matched proxy IP, never a shared or foreign data-centre IP that stands out.' },
    { title: 'Human pacing', body: 'Randomised timing, working-hours scheduling and human-like daily limits on every event.' },
  ],
  footnote: 'Zero account restrictions across the beta.',
}

export const personas = {
  eyebrow: 'One platform',
  title: 'Built for every outreach team',
  sub: 'From the first connection request to the booked meeting, Ampliflow runs your entire LinkedIn motion on safe, cloud based automation.',
  items: [
    { key: 'founders', label: 'Founders', body: 'Build real pipeline before you can afford an SDR, with outreach that runs while you build the product.', href: `${AF}/for/founders` },
    { key: 'sdrs', label: 'Sales & SDR teams', body: 'Hit quota with steady, safe pipeline. Connection requests and follow ups send on autopilot, every day.', href: `${AF}/for/sdrs` },
    { key: 'recruiters', label: 'Recruiters', body: 'Source and reach qualified candidates daily, without putting your LinkedIn account at risk.', href: `${AF}/for/recruiters` },
    { key: 'agencies', label: 'Agencies', body: 'Run safe, separated campaigns across every client account from one shared workspace.', href: `${AF}/for/agencies` },
  ] as const,
}

export const features = {
  eyebrow: 'What’s inside',
  title: 'The complete outreach engine, in five systems.',
  sideBefore: 'Built for ',
  sideBold: 'founders, SDRs, and recruiters',
  sideAfter: ' who need outreach at scale, without the complexity or the invoice.',
  items: [
    { key: 'workflow', title: 'Visual workflow builder', body: 'Drag-and-drop canvas. Multi-step sequences with If/Else, delays, and A/B tests, no code.' },
    { key: 'cloud', title: 'Cloud-based execution', body: 'Runs server-side on the Unipile API, no Chrome extension, no laptop left open. 24/7, with randomised human pacing.' },
    { key: 'import', title: 'LinkedIn search import', body: 'Paste any LinkedIn search URL and import 100-1,000 leads. Profiles enrich automatically.' },
    { key: 'safety', title: 'Account safety controls', body: 'Daily limits, working hours, jitter, blacklists, auto-pause on reply, real-time safety score.' },
    { key: 'inbox', title: 'Unified smart inbox', body: 'All campaign replies in one place. Respond without opening LinkedIn. Sequence pauses on reply.' },
  ] as const,
}

export const how = {
  eyebrow: 'How it works',
  title: 'From signup to first reply in under an hour.',
  side: 'Roughly an hour from signup to your first qualified reply.',
  steps: [
    { n: '01', title: 'Connect LinkedIn', body: 'Authenticate via Unipile OAuth. We never see your password.' },
    { n: '02', title: 'Import audience', body: 'Paste a LinkedIn search URL or upload a CSV. Profiles enrich automatically.' },
    { n: '03', title: 'Build sequence', body: 'Drag-and-drop your Visit → Connect → If connected → Message flow.' },
    { n: '04', title: 'Launch & sleep', body: 'Hit start. Close your laptop. Wake up to qualified replies in your inbox.' },
  ],
}

export const founding = {
  eyebrow: 'Founding member · Limited spots',
  title: 'Lock in $19/mo for life.',
  body: 'Only 100 spots. When the cap closes, Standard goes to its regular $39/mo. Founding members keep $19/mo for as long as their account exists.',
  cta: 'Claim your founding spot',
  perks: [
    { title: '50% off, locked in for life', body: 'Never pay full price, even after we raise rates' },
    { title: 'Direct line to the founders', body: 'Private Slack channel with everyone building Ampliflow' },
    { title: 'Vote on the roadmap', body: 'The features you need ship first. We build with you' },
    { title: '2 weeks early access', body: 'Onboard before public launch, with white-glove setup' },
    { title: 'Founding member badge', body: 'Your account, your seats, recognised forever' },
  ],
}

export type Plan = {
  name: string
  tagline: string
  price: number
  was: number | null
  popular?: boolean
  features: string[]
}

export const plans: Plan[] = [
  {
    name: 'Standard',
    tagline: 'For getting outreach going.',
    price: 19,
    was: 39,
    features: ['5 active campaigns', 'Up to 2,500 leads in your account', 'Per-step campaign analytics', 'Email support'],
  },
  {
    name: 'Pro',
    tagline: 'For solo operators who ship.',
    price: 39,
    was: 59,
    popular: true,
    features: [
      'Unlimited active campaigns',
      'Up to 10,000 leads across your account',
      'CSV upload + LinkedIn search audience sources',
      'Slack + outbound webhook integrations',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    tagline: 'For agencies and small teams.',
    price: 99,
    was: null,
    features: ['Everything in Pro', 'Up to 50,000 leads', 'Multiple accounts + per-seat billing', 'Onboarding call + dedicated support'],
  },
]

export const pricingCopy = {
  foundingNote: 'Founding price, yours, locked in for life.',
  trial: '7-day free trial. Billed on day 7. Cancel anytime.',
  cta: 'Start free trial',
  compare: 'Compare every feature',
}

export const testimonials = {
  eyebrow: 'Testimonial',
  title: 'From the first founders locked in at $19.',
  sub: 'See how founders, SDRs, and recruiters replaced sales seats, slashed tooling costs, and kept their LinkedIn accounts safe.',
  items: [
    { tag: 'Founder', quote: 'Replaced our entire SDR seat. We’re getting 40-60 qualified replies a month at zero marginal cost. Auto-pause on reply alone is worth the subscription.', name: 'Marcus R.', role: 'Founder · Series A SaaS' },
    { tag: 'Growth', quote: 'Migrated from Dripify in 20 minutes. The visual builder is genuinely faster and the safety controls are a level above what I had before. Half the bill.', name: 'Sara C.', role: 'Head of Growth · Fintech' },
    { tag: 'Agency', quote: 'Six concurrent search campaigns for clients. The smart inbox keeps everything separated and the safety score has caught two anomalies before they became problems.', name: 'Nikita V.', role: 'Tech Recruiter · Agency' },
    { tag: 'Founder', quote: 'Cut our outbound tooling cost in half and the workflow builder is more intuitive than what we had. Closing notes auto-attach to leads now.', name: 'Alex M.', role: 'Founder · Bootstrapped SaaS' },
    { tag: 'Sales', quote: 'Setup took 15 minutes. By Friday I’d booked four meetings from a single LinkedIn search import. The workflow I wish I’d had a year ago.', name: 'Priya N.', role: 'Head of Sales · B2B' },
    { tag: 'Agency', quote: 'Being able to pause sequences from the inbox view alone saves me an hour a day. Smart unified inbox is the killer feature.', name: 'Tomas G.', role: 'Tech Recruiter · Agency' },
  ],
}

export const integrations = {
  eyebrow: 'Integrations',
  title: 'Plugs into the stack your team already runs on.',
  sub: 'Slack and webhooks ship with v1, so reply alerts and pipeline sync work day one. A new native integration lands every few weeks: HubSpot, Sheets, Gmail, Notion, Zapier, Apollo, Clay, and the rest of your stack through 2026.',
  live: ['Slack', 'Webhooks'],
  coming: [
    'HubSpot', 'Notion', 'Gmail', 'Google Sheets', 'Calendly', 'Zapier', 'Airtable', 'Make',
    'Pipedrive', 'Apollo', 'Google Calendar', 'Outlook', 'PostHog', 'Discord', 'Telegram', 'Clay',
  ],
}

export type FaqItem = { tag: string; q: string; a: string; note?: string }

export const faqCopy = {
  eyebrow: 'FAQ · 08 entries',
  titleStart: 'We’ve got the',
  titleAccent: 'answers',
  titleEnd: 'to every question you haven’t asked yet.',
  sub: 'Pricing, safety, setup, cancellations. If something’s missing, the founders reply within 24 hours.',
  stuck: {
    eyebrow: 'Still stuck?',
    title: 'Talk to a founder directly.',
    body: 'Email lands in our inboxes. 24-hour reply on every weekday, no support tier, no chat bot.',
    cta: 'Contact support',
  },
}

export const faq: FaqItem[] = [
  {
    tag: 'Safety',
    q: 'Is this safe for my LinkedIn account?',
    a: 'Yes. Safety is the reason we exist. Every action respects human-like daily limits (25 connection requests, up to 80 messages, and up to 100 profile views a day, tiered by plan), runs only during your configured working hours, and adds randomised timing jitter between actions. The moment a lead replies, the sequence auto-pauses. A real-time safety score watches your account for anomalies and warns you before issues happen.',
    note: 'Zero account restrictions across the beta.',
  },
  {
    tag: 'Safety',
    q: 'What IP does my account run from?',
    a: 'Your own country’s. Every account runs through a dedicated, country-matched proxy IP, so your LinkedIn activity always comes from a residential address in your own region, never a shared or foreign data-centre IP that stands out. Every event is humanised on top of that: randomised timing, human-like daily limits, working-hours scheduling, and auto-pause on reply.',
    note: 'Your account behaves like you working your network from home, and stays inside safe LinkedIn limits.',
  },
  {
    tag: 'Compare',
    q: 'How is Ampliflow actually different from Dripify or Expandi?',
    a: 'Ampliflow is engineered around account safety: server-side execution, randomised human pacing, auto-pause the moment a prospect replies, and a real-time safety score no other tool ships. The market’s entry tiers run $69-$99/mo (every price verified June 2026). Ampliflow launches at $39, and founding members lock $19 for life, with a private Slack straight to the founders.',
  },
  {
    tag: 'Setup',
    q: 'Do I need to keep my computer on for campaigns to run?',
    a: 'No. Everything runs on our servers via the Unipile API. Close your laptop, sleep, go on vacation, your sequences keep executing on schedule, within your safety limits. This is the entire point of cloud execution.',
  },
  {
    tag: 'Access',
    q: 'Can I start using Ampliflow today?',
    a: 'Yes. Ampliflow is live and taking customers. Create an account with your work email and every plan starts with a 7-day free trial. Cancel anytime.',
  },
  {
    tag: 'Pricing',
    q: 'What does it cost after the founding member offer?',
    a: 'Once the founding spots are gone, plans cost $39/mo (Standard) and $59/mo (Pro), so Standard doubles when the founding cap closes. 100 spots, then $19/mo is gone for good. Founding members keep it for the life of their account, billed month-to-month, no annual commitment.',
  },
  {
    tag: 'Billing',
    q: 'What if I need to cancel?',
    a: 'Cancel anytime, one click in your dashboard. Once paid plans start, you’re billed month-to-month, no contracts, no clawback.',
  },
  {
    tag: 'Data',
    q: 'Can I import leads from outside LinkedIn?',
    a: 'Yes. CSV upload supports any list with LinkedIn profile URLs. We also have Sales Navigator search URL import and basic enrichment built in. Apollo, Clay, and HubSpot integrations are on the roadmap.',
  },
]

export const founder = {
  eyebrow: 'A note from the founder',
  name: 'Nivedita Verma',
  role: 'Co-founder · Ampliflow',
  linkedin: 'https://www.linkedin.com/in/nivedita-verma-ossian/',
  photo: 'https://ampliflow.in/team-nivedita-400.webp',
  lead: [
    { t: 'Outbound is a craft. Most tools treat it like ' },
    { t: 'spam at scale', em: true },
    { t: '. We built Ampliflow for the operators who treat the channel with respect, and expect their tooling to be engineered the same way.' },
  ],
  body: [
    'I spent three years running outbound at two startups, first as a founder, then heading sales. Every tool I touched was either overpriced, over-engineered, or shipping features nobody used while missing the ones that mattered. Pricing felt arbitrary, dashboards were noise, and the deliverability story was always “don’t worry about it.”',
    'Ampliflow is what I wish had existed on day one. A workflow builder you can read at a glance, deliverability guardrails baked in rather than bolted on, and pricing that doesn’t punish you for hiring a second rep.',
    'We closed a $700K angel round in June 2026 and we’re building in public. Founding members lock in $19/mo for life, that’s the deal that keeps us honest.',
  ],
}

export const closing = {
  eyebrow: 'Founding members · $19/mo for life',
  // No closing section exists on the live page; this is built from their own step-04 copy.
  title: 'Hit start. Close your laptop. Wake up to qualified replies.',
  sub: 'Every plan starts with a 7-day free trial. Billed on day 7. Cancel anytime.',
  call: 'Talk to a founder',
}

export const footer = {
  blurb: 'The LinkedIn outreach engine: visual workflows, 24/7 cloud execution, and a real-time safety system watching your account.',
  status: 'All systems operational',
  linkedin: 'https://www.linkedin.com/company/getampliflow/',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Pricing', href: links.pricing },
        { label: 'How it works', href: '#how' },
        { label: 'Compare', href: links.compare },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: `${AF}/about` },
        { label: 'Careers', href: `${AF}/careers` },
        { label: 'Investors', href: `${AF}/investors` },
        { label: 'Contact', href: `${AF}/contact` },
        { label: 'Press', href: `${AF}/press` },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: `${AF}/blog/` },
        { label: 'Best LinkedIn tools 2026', href: `${AF}/blog/best-linkedin-automation-tools` },
        { label: 'AI LinkedIn automation', href: `${AF}/blog/ai-linkedin-automation` },
        { label: 'Alternatives', href: `${AF}/alternatives/` },
        { label: 'Comparisons', href: `${AF}/vs/` },
        { label: 'Templates', href: `${AF}/templates/` },
        { label: 'Glossary', href: `${AF}/learn/` },
        { label: 'Use cases', href: `${AF}/for/` },
      ],
    },
  ],
  legal: [
    { label: 'Privacy', href: `${AF}/privacy` },
    { label: 'Terms', href: `${AF}/terms` },
    { label: 'Security', href: `${AF}/security` },
  ],
  copyright: 'Copy, brand and product © Ampliflow · this page is an unofficial concept by Vansh Srivastava',
  made: 'Built for founders who actually run outbound',
}

export const sticky = {
  text: 'Founding members',
  price: '$19/mo for life',
  cta: 'Claim spot',
}
