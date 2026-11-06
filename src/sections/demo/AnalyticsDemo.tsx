import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number'
import { FUNNEL, FUNNEL_STAGES, REPLIES_PER_WEEK } from '@/content/demo'
import { funnelRates } from '@/lib/funnel'

const rates = funnelRates(FUNNEL)
const STEP_RATE: Record<string, string> = {
  sent: `${rates.sentOfLeads}% of leads`,
  accepted: `${rates.acceptRate}% accepted`,
  messaged: `${rates.messagedOfAccepted}% messaged`,
  replied: `${rates.replyRate}% replied`,
}
const KPIS = [
  { label: 'Connections sent', value: FUNNEL.sent, suffix: '' },
  { label: 'Acceptance rate', value: rates.acceptRate, suffix: '%' },
  { label: 'Reply rate', value: rates.replyRate, suffix: '%' },
  { label: 'Replies', value: FUNNEL.replied, suffix: '' },
]
const maxWeek = Math.max(...REPLIES_PER_WEEK)

export function AnalyticsDemo({ active, reduce }: { active: boolean; reduce: boolean }) {
  const [on, setOn] = useState(reduce)
  useEffect(() => {
    if (reduce) return setOn(true)
    if (!active) return setOn(false)
    const id = window.setTimeout(() => setOn(true), 120)
    return () => window.clearTimeout(id)
  }, [active, reduce])

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-lg border border-line-lo bg-white px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-t3">{k.label}</p>
            <p className="mt-1 font-semibold tabular-nums text-t1 text-[22px] leading-none">
              {reduce ? k.value.toLocaleString('en-US') : <AnimatedNumber value={on ? k.value : 0} springOptions={{ bounce: 0, duration: 1400 }} />}
              {k.suffix}
            </p>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[1fr_220px]">
        <figure
          className="flex flex-col rounded-lg border border-line-lo bg-white p-3"
          aria-label={`Funnel, last 30 days: ${FUNNEL_STAGES.map((s) => `${s.label} ${FUNNEL[s.key]}`).join(', ')}`}
        >
          <figcaption className="mb-2 flex items-baseline justify-between text-xs">
            <span className="font-semibold text-t1">Funnel</span>
            <span className="text-t3">Last 30 days</span>
          </figcaption>
          <ul className="flex flex-col justify-evenly gap-2.5 md:h-[calc(100%-28px)]">
            {FUNNEL_STAGES.map((s, i) => {
              const v = FUNNEL[s.key]
              return (
                <li key={s.key} className="group">
                  <div className="flex items-baseline justify-between gap-2 text-[12px]">
                    <span className="text-t2">{s.label}</span>
                    <span className="tabular-nums">
                      {STEP_RATE[s.key] && <span className="mr-2 text-[11px] text-t3">{STEP_RATE[s.key]}</span>}
                      <span className="font-semibold text-t1">{v.toLocaleString('en-US')}</span>
                    </span>
                  </div>
                  <span className="relative mt-1 block h-2.5 rounded-[4px] bg-bg-2 md:h-3.5">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-[4px] bg-primary group-hover:bg-primary-hi"
                      initial={false}
                      animate={{ width: on ? `${(v / FUNNEL.leads) * 100}%` : '0%' }}
                      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </li>
              )
            })}
          </ul>
        </figure>
        <figure className="flex h-[150px] flex-col rounded-lg border border-line-lo bg-white p-3 md:h-auto" aria-label={`Replies per week, last 8 weeks: ${REPLIES_PER_WEEK.join(', ')}`}>
          <figcaption className="mb-2 flex items-baseline justify-between text-xs">
            <span className="font-semibold text-t1">Replies per week</span>
            <span className="text-t3">8 wks</span>
          </figcaption>
          <div className="flex flex-1 items-end gap-[2px] border-b border-line pb-px">
            {REPLIES_PER_WEEK.map((n, i) => (
              <div key={i} className="group relative flex h-full flex-1 items-end">
                <motion.div
                  className="w-full rounded-t-[4px] bg-primary group-hover:bg-primary-hi"
                  initial={false}
                  animate={{ height: on ? `${(n / maxWeek) * 100}%` : '0%' }}
                  transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.3 + i * 0.06 }}
                />
                <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {n}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 hidden text-[11px] text-t3 md:block">Lead → reply: {rates.overall}% overall</p>
        </figure>
      </div>
    </div>
  )
}
