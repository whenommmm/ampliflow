import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Check, Cloud, GitBranch, Laptop, Link2, MessageSquareText, Moon, PauseCircle, Search, ShieldCheck, Split } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { features } from '@/content/site'
import { cn } from '@/lib/cn'

function useOn(ref: React.RefObject<Element | null>) {
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = !!useReducedMotion()
  return { on: inView || reduce, reduce }
}

export function Features() {
  return (
    <Section id="features" className="py-10 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <MonoLabel>{features.eyebrow}</MonoLabel>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">{features.title}</h2>
          </div>
          <p className="max-w-[320px] text-[15px] leading-relaxed text-t2 md:text-right">
            {features.sideBefore}
            <strong className="font-semibold text-t1">{features.sideBold}</strong>
            {features.sideAfter}
          </p>
        </div>
        <ul data-note-anchor className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0">
          {features.items.map((f, i) => (
            <li
              key={f.key}
              className={cn(
                'flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-white sm:w-[60%] md:w-auto',
                i < 2 ? 'md:col-span-3' : 'md:col-span-2',
              )}
            >
              <div className="relative h-[150px] border-b sm:h-[170px] border-line-lo bg-bg-1 bg-[radial-gradient(rgb(15_17_23/0.08)_1px,transparent_1px)] bg-[size:14px_14px]">
                {VISUALS[f.key]}
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[16px] font-semibold text-t1">{f.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-t2">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center font-mono text-[11px] text-t3 md:hidden" aria-hidden>
          swipe →
        </p>
      </Container>
    </Section>
  )
}

const VISUALS: Record<(typeof features.items)[number]['key'], ReactNode> = {
  workflow: <WorkflowVisual />,
  cloud: <CloudVisual />,
  import: <ImportVisual />,
  safety: <SafetyVisual />,
  inbox: <InboxVisual />,
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[11.5px] font-medium text-t1 shadow-sm', className)}>{children}</span>
}

function WorkflowVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { on, reduce } = useOn(ref)
  const step = (i: number) => ({ initial: false, animate: { opacity: on ? 1 : 0, y: on ? 0 : 8 }, transition: { delay: reduce ? 0 : 0.15 * i, duration: 0.35 } })
  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center gap-2 px-4">
      <motion.div {...step(0)}><Pill>Visit</Pill></motion.div>
      <motion.span {...step(1)} className="h-px w-4 bg-primary" />
      <motion.div {...step(1)}><Pill>Connect</Pill></motion.div>
      <motion.span {...step(2)} className="h-px w-4 bg-primary" />
      <motion.div {...step(2)} className="flex flex-col items-start gap-1.5">
        <Pill className="text-emerald-700"><GitBranch className="size-3" /> If / Else</Pill>
        <Pill className="text-primary"><Split className="size-3" /> A/B test</Pill>
      </motion.div>
    </div>
  )
}

function CloudVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { on, reduce } = useOn(ref)
  const [sent, setSent] = useState(37)
  useEffect(() => {
    if (!on || reduce) return
    const id = window.setInterval(() => setSent((s) => s + 1), 2200)
    return () => window.clearInterval(id)
  }, [on, reduce])
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6">
      <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-[12.5px]">
        <span className="flex items-center gap-2 text-t2"><Laptop className="size-4" /> Your laptop</span>
        <span className="flex items-center gap-1.5 font-medium text-t3"><Moon className="size-3.5" /> Closed</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-primary-line bg-white px-3 py-2 text-[12.5px] shadow-[0_0_0_4px_rgb(47_55_217/0.06)]">
        <span className="flex items-center gap-2 text-t1"><Cloud className="size-4 text-primary" /> Ampliflow cloud</span>
        <span className="flex items-center gap-1.5 font-medium text-emerald-700"><span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> Running 24/7</span>
      </div>
      <p className="text-center font-mono text-[11px] text-t3">
        actions today: <motion.span key={sent} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="text-primary">{sent}</motion.span> · 0 browser extensions
      </p>
    </div>
  )
}

function ImportVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { on, reduce } = useOn(ref)
  const [n, setN] = useState(reduce ? 1000 : 0)
  useEffect(() => {
    if (!on) return
    if (reduce) return setN(1000)
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1800)
      setN(Math.round(1000 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on, reduce])
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col justify-center gap-3 px-6">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[12px] text-t2">
        <Search className="size-3.5 shrink-0 text-t3" />
        <span className="truncate font-mono">linkedin.com/search/results/people/?keywords=founder</span>
        <Link2 className="size-3.5 shrink-0 text-primary" />
      </div>
      <div>
        <div className="flex justify-between text-[12px]">
          <span className="text-t2">Leads imported</span>
          <span className="font-mono tabular-nums font-semibold text-t1">{n.toLocaleString('en-US')}</span>
        </div>
        <span className="mt-1 block h-1.5 rounded-full bg-bg-2">
          <span className="block h-full rounded-full bg-primary" style={{ width: `${n / 10}%` }} />
        </span>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700">
          <Check className="size-3" /> Profiles enrich automatically
        </p>
      </div>
    </div>
  )
}

function SafetyVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { on, reduce } = useOn(ref)
  const items = ['Daily limits', 'Working hours', 'Jitter', 'Blacklists', 'Auto-pause on reply', 'Safety score']
  return (
    <div ref={ref} className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-1.5 px-4">
      {items.map((t, i) => (
        <motion.span
          key={t}
          initial={false}
          animate={{ opacity: on ? 1 : 0.35, scale: on ? 1 : 0.96 }}
          transition={{ delay: reduce ? 0 : 0.12 * i }}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-t1"
        >
          <motion.span
            className="relative inline-block h-3 w-5 rounded-full"
            initial={false}
            animate={{ backgroundColor: on ? '#2f37d9' : '#dfe2e8' }}
            transition={{ delay: reduce ? 0 : 0.12 * i + 0.1 }}
          >
            <motion.span
              className="absolute top-0.5 size-2 rounded-full bg-white"
              initial={false}
              animate={{ left: on ? 10 : 2 }}
              transition={{ delay: reduce ? 0 : 0.12 * i + 0.1 }}
            />
          </motion.span>
          {t}
        </motion.span>
      ))}
      <span className="mt-1 inline-flex w-full items-center justify-center gap-1 text-[11px] text-emerald-700">
        <ShieldCheck className="size-3" /> Score 98 · Healthy
      </span>
    </div>
  )
}

function InboxVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { on, reduce } = useOn(ref)
  const replies = [
    { n: 'HL', t: 'Tell me more about pricing.' },
    { n: 'RK', t: 'Let’s set up a call Wednesday?' },
  ]
  return (
    <div ref={ref} className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
      {replies.map((r, i) => (
        <motion.div
          key={r.n}
          initial={false}
          animate={{ opacity: on ? 1 : 0, x: on ? 0 : 16 }}
          transition={{ delay: reduce ? 0 : 0.25 + i * 0.35 }}
          className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2 text-[12px]"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-dim font-mono text-[9px] text-primary">{r.n}</span>
          <MessageSquareText className="size-3.5 shrink-0 text-t3" />
          <span className="truncate text-t1">{r.t}</span>
        </motion.div>
      ))}
      <motion.span
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ delay: reduce ? 0 : 1.1 }}
        className="inline-flex items-center gap-1.5 self-start rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200"
      >
        <PauseCircle className="size-3" /> Sequences paused on reply
      </motion.span>
    </div>
  )
}
