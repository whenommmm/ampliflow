import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { BarChart3, Inbox, LayoutDashboard, ShieldCheck, Users, Workflow } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { DEMO_TABS, WORKFLOW_CAMPAIGN, type DemoTab } from '@/content/demo'
import { useAutoAdvance } from '@/hooks/useAutoAdvance'
import { useDemoTabRequests } from '@/lib/demoStore'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/cn'
import { WorkflowDemo } from './demo/WorkflowDemo'
import { InboxDemo } from './demo/InboxDemo'
import { AnalyticsDemo } from './demo/AnalyticsDemo'

const TAB_MS = 9000
const SIDEBAR = [
  { label: 'Dashboard', icon: LayoutDashboard, tab: null },
  { label: 'Campaigns', icon: Workflow, tab: 'workflow' },
  { label: 'Leads', icon: Users, tab: null },
  { label: 'Inbox', icon: Inbox, tab: 'inbox' },
  { label: 'Analytics', icon: BarChart3, tab: 'analytics' },
] as const

export function ProductDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { amount: 0.35 })
  const reduce = !!useReducedMotion()
  const [hover, setHover] = useState(false)
  const [touchHold, setTouchHold] = useState(false)
  const { index, setIndex, cycle } = useAutoAdvance({ count: DEMO_TABS.length, ms: TAB_MS, paused: hover || touchHold || !inView, enabled: !reduce })
  const tab = DEMO_TABS[index].key

  const onRequest = useCallback((t: DemoTab) => setIndex(DEMO_TABS.findIndex((d) => d.key === t)), [setIndex])
  useDemoTabRequests(onRequest)

  // Touch: a tap on the demo holds it until the next tap elsewhere (same as the live site).
  useEffect(() => {
    if (!touchHold) return
    const off = (e: PointerEvent) => {
      if (!frameRef.current?.contains(e.target as Node)) setTouchHold(false)
    }
    document.addEventListener('pointerdown', off)
    return () => document.removeEventListener('pointerdown', off)
  }, [touchHold])

  const paused = hover || touchHold || !inView

  return (
    <Section id="demo" className="pb-4 pt-12 sm:pt-16" aria-label="Product demo">
      <Container>
        <div
          ref={frameRef}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
          onPointerDown={(e) => e.pointerType !== 'mouse' && setTouchHold(true)}
          onFocus={() => setHover(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHover(false)}
          className="rounded-2xl border border-line bg-white p-1.5 shadow-[0_30px_80px_-40px_rgb(47_55_217/0.45),0_2px_6px_rgb(15_17_23/0.04)] sm:p-2"
        >
          <div role="tablist" aria-label="Product views" className="relative grid grid-cols-3 gap-1 rounded-xl bg-bg-1 p-1">
            {DEMO_TABS.map((t, i) => {
              const on = i === index
              return (
                <button
                  key={t.key}
                  role="tab"
                  id={`demo-tab-${t.key}`}
                  aria-selected={on}
                  aria-controls="demo-panel"
                  onClick={() => setIndex(i)}
                  className={cn('relative z-10 h-10 overflow-hidden rounded-lg text-[13px] font-semibold transition-colors sm:text-sm', on ? 'text-t1' : 'text-t3 hover:text-t1')}
                >
                  {on && (
                    <motion.span
                      layoutId="demo-tab-bg"
                      className="absolute inset-0 -z-10 rounded-lg bg-white shadow-[0_1px_3px_rgb(15_17_23/0.08)] ring-1 ring-line"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  {t.label}
                  {on && !reduce && (
                    <span
                      key={cycle}
                      aria-hidden
                      className="absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-primary"
                      style={{ animation: `demo-countdown ${TAB_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-1.5 grid overflow-hidden rounded-xl border border-line-lo bg-white md:grid-cols-[176px_1fr]">
            <aside className="hidden border-r border-line-lo bg-bg-1/60 p-3 md:block" aria-hidden>
              <Logo className="h-4 w-auto text-primary" />
              <ul className="mt-5 space-y-0.5">
                {SIDEBAR.map((s) => (
                  <li
                    key={s.label}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px]',
                      s.tab === tab ? 'bg-white font-semibold text-primary ring-1 ring-line' : 'text-t2',
                    )}
                  >
                    <s.icon className="size-3.5" /> {s.label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-md border border-line-lo bg-white p-2">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-t1">
                  <ShieldCheck className="size-3.5 text-ok" /> Safety 98
                </p>
                <p className="mt-0.5 text-[10.5px] text-t3">Healthy · 0 anomalies</p>
              </div>
            </aside>
            <div className="min-w-0 p-3 sm:p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-t1">{WORKFLOW_CAMPAIGN.name}</p>
                  <p className="text-[12px] text-t3">{DEMO_TABS[index].caption}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Running · {WORKFLOW_CAMPAIGN.leads} leads
                </span>
              </div>
              <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${tab}`} className="relative h-[528px] sm:h-[500px] md:h-[492px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="absolute inset-0"
                  >
                    {tab === 'workflow' && <WorkflowDemo active={inView} reduce={reduce} />}
                    {tab === 'inbox' && <InboxDemo active={inView} reduce={reduce} />}
                    {tab === 'analytics' && <AnalyticsDemo active={inView} reduce={reduce} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
