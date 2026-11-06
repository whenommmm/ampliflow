import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Globe2, PauseCircle, ShieldCheck, Timer } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { AnimatedNumber } from '@/components/motion-primitives/animated-number'
import { safety } from '@/content/site'

const GUARD_ICONS = [PauseCircle, Globe2, Timer]

export function Safety() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = !!useReducedMotion()
  const on = inView || reduce

  return (
    <Section id="safety" className="py-10 sm:py-20">
      <Container className="grid items-center gap-8 md:grid-cols-[1fr_440px] md:gap-14">
        <div>
          <MonoLabel>{safety.eyebrow}</MonoLabel>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">{safety.title}</h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-t2 sm:text-base">{safety.sub}</p>
          <ul className="mt-6 grid gap-3 sm:gap-4">
            {safety.guards.map((g, i) => {
              const Icon = GUARD_ICONS[i]
              return (
                <li key={g.title} className="flex items-center gap-3 sm:items-start">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary-dim text-primary sm:size-8">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-t1">{g.title}</p>
                    <p className="hidden text-[14px] leading-relaxed text-t2 sm:block">{g.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-5 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-800 ring-1 ring-emerald-200">
            <ShieldCheck className="size-4" aria-hidden /> {safety.footnote}
          </p>
        </div>

        <div ref={ref} className="rounded-2xl border border-line bg-white p-4 shadow-[0_24px_60px_-36px_rgb(15_17_23/0.35)] sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-t1">Account safety</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500" /> {safety.status}
            </span>
          </div>
          <Gauge value={safety.score} on={on} reduce={reduce} />
          <div className="mt-2">
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-t3">Today · {safety.limitsNote.toLowerCase()}</p>
            <ul className="grid gap-2.5">
              {safety.limits.map((l, i) => (
                <li key={l.label}>
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-t2">{l.label}</span>
                    <span className="font-mono tabular-nums text-t1">
                      {l.today}
                      <span className="text-t3">/{l.max}</span>
                    </span>
                  </div>
                  <span className="mt-1 block h-1.5 rounded-full bg-bg-2">
                    <motion.span
                      className="block h-full rounded-full bg-primary"
                      initial={false}
                      animate={{ width: on ? `${(l.today / l.max) * 100}%` : '0%' }}
                      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="mt-4 grid grid-cols-3 divide-x divide-line-lo rounded-lg border border-line-lo bg-bg-1 text-center">
            {safety.rows.map((r) => (
              <div key={r.label} className="px-2 py-2.5">
                <dt className="text-[10.5px] leading-tight text-t3">{r.label}</dt>
                <dd className="mt-1 text-[13px] font-semibold text-t1">{r.value}</dd>
              </div>
            ))}
          </dl>
          <NextAction reduce={reduce} />
        </div>
      </Container>
    </Section>
  )
}

function Gauge({ value, on, reduce }: { value: number; on: boolean; reduce: boolean }) {
  const r = 70
  const c = Math.PI * r // half circle
  return (
    <div className="relative mx-auto mt-3 h-[112px] w-[200px]" role="img" aria-label={`Safety score ${value} out of 100`}>
      <svg viewBox="0 0 180 100" className="h-full w-full" aria-hidden>
        <path d="M 20 90 A 70 70 0 0 1 160 90" fill="none" stroke="var(--color-bg-2)" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: on ? c * (1 - value / 100) : c }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="text-[40px] font-bold leading-none tracking-tight text-t1 tabular-nums" data-testid="safety-score">
          {reduce ? value : <AnimatedNumber value={on ? value : 0} springOptions={{ bounce: 0, duration: 1400 }} />}
        </p>
        <p className="mt-1 text-[11px] text-t3">Safety score / 100</p>
      </div>
    </div>
  )
}

// Human pacing: the next action fires after a randomised wait, inside working hours.
function NextAction({ reduce }: { reduce: boolean }) {
  const [secs, setSecs] = useState(252)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setSecs((s) => (s <= 1 ? 120 + Math.floor(Math.random() * 300) : s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [reduce])
  const m = Math.floor(secs / 60)
  const s = String(secs % 60).padStart(2, '0')
  return (
    <p className="mt-3 flex items-center justify-between rounded-lg bg-primary-dim px-3 py-2 text-[12.5px] text-t1">
      <span className="flex items-center gap-2">
        <Timer className="size-3.5 text-primary" aria-hidden /> Next action in
      </span>
      <span className="font-mono tabular-nums text-primary">
        {m}m {s}s <span className="text-t3">· randomised</span>
      </span>
    </p>
  )
}
