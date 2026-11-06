import type { FunnelCounts } from '@/lib/funnel'

// Scripted data for the marketing demo. Names are deliberately different from
// the testimonial authors and from the demo leads on Ampliflow's own pages.

export type DemoTab = 'workflow' | 'inbox' | 'analytics'

export const DEMO_TABS: { key: DemoTab; label: string; caption: string }[] = [
  { key: 'workflow', label: 'Workflow', caption: 'A lead moves through your sequence, on its own.' },
  { key: 'inbox', label: 'Smart Inbox', caption: 'Replies land in one place. The sequence pauses itself.' },
  { key: 'analytics', label: 'Analytics', caption: 'See where the funnel narrows, not just the totals.' },
]

export type WorkflowStep = {
  id: string
  kind: 'start' | 'action' | 'delay' | 'logic' | 'event'
  title: string
  detail?: string
  done?: number
  total?: number
}

export const WORKFLOW_CAMPAIGN = { name: 'SaaS founders · Bengaluru', leads: 240 }

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'start', kind: 'start', title: 'Campaign start', detail: 'Trigger: new lead from search import' },
  { id: 'visit', kind: 'action', title: 'Visit profile', done: 160, total: 240 },
  { id: 'wait1', kind: 'delay', title: 'Wait 1 day' },
  { id: 'invite', kind: 'action', title: 'Send an invite', detail: 'Hi {{first_name}}, came across your profile…', done: 25, total: 240 },
  { id: 'wait3', kind: 'delay', title: 'Wait 3 days' },
  { id: 'ifconn', kind: 'logic', title: 'If connected', detail: 'Yes → message · No → follow up', done: 12, total: 240 },
  { id: 'message', kind: 'action', title: 'Message', detail: 'Personalized, A/B tested' },
  { id: 'reply', kind: 'event', title: 'Reply received', detail: 'Sequence auto-paused for this lead' },
]

export const WORKFLOW_LEAD = { name: 'Meera Iyer', role: 'Head of Growth · Fintech', initials: 'MI' }

export type InboxStatus = 'Interested' | 'Booked' | 'Done' | null

export type InboxThread = {
  id: string
  name: string
  initials: string
  role: string
  reply: string
  minutesAgo: number
  status: InboxStatus
}

export const INBOX_THREADS: InboxThread[] = [
  { id: 't1', name: 'Rohan Kapoor', initials: 'RK', role: 'Founder · Series A SaaS', reply: 'Let’s set up a call Wednesday?', minutesAgo: 2, status: null },
  { id: 't2', name: 'Hannah Lee', initials: 'HL', role: 'SDR Lead · B2B', reply: 'Tell me more about pricing.', minutesAgo: 14, status: null },
  { id: 't3', name: 'Kabir Shah', initials: 'KS', role: 'Tech Recruiter · Agency', reply: 'Yes, interested. Send details.', minutesAgo: 47, status: 'Interested' },
  { id: 't4', name: 'Olivia Grant', initials: 'OG', role: 'VP Sales · DevTools', reply: 'Booked for Thursday, 4pm.', minutesAgo: 180, status: 'Booked' },
  { id: 't5', name: 'Dev Malhotra', initials: 'DM', role: 'Founder · Stealth', reply: 'Happy to chat next week.', minutesAgo: 300, status: null },
]

export const OUTBOUND_MESSAGE =
  'Hey Rohan, thanks for connecting. Saw you’re hiring your first sales rep. Mind if I share how other founders are filling pipeline before that hire?'

export const FUNNEL: FunnelCounts = { leads: 1000, sent: 560, accepted: 267, messaged: 180, replied: 68 }

export const FUNNEL_STAGES: { key: keyof FunnelCounts; label: string }[] = [
  { key: 'leads', label: 'Total leads' },
  { key: 'sent', label: 'Connections sent' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'messaged', label: 'Messages sent' },
  { key: 'replied', label: 'Replies' },
]

// Weekly replies, last 8 weeks (illustrative; sums to the funnel's 68 replies).
export const REPLIES_PER_WEEK = [3, 5, 6, 8, 9, 10, 12, 15]

export const DEMO_NAMES = [WORKFLOW_LEAD.name, ...INBOX_THREADS.map((t) => t.name)]
