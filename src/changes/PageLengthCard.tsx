import { useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Smartphone } from 'lucide-react'
import { PAGE_LENGTH } from '@/content/changes'
import { Container } from '@/components/ui'
import { useChangesVisible } from '@/lib/changesStore'

const screens = (px: number) => px / PAGE_LENGTH.phone

export function PageLengthCard() {
  const visible = useChangesVisible()
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <Inner />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Inner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = !!useReducedMotion()
  const on = inView || reduce
  const rows = [
    { label: 'Live ampliflow.in', px: PAGE_LENGTH.before, tone: 'bg-rose-400', text: 'text-rose-200' },
    { label: 'This page', px: PAGE_LENGTH.after, tone: 'bg-emerald-400', text: 'text-emerald-200' },
  ]
  return (
    <Container>
      <aside
        ref={ref}
        data-change="page-length"
        aria-label="Change: the whole page on a phone"
        className="relative my-6 overflow-hidden rounded-[18px] bg-[#0a0c1f] p-5 text-white ring-1 ring-white/10 sm:my-8 sm:p-7"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="relative">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50">Whole page · L1 · measured at 390px wide</p>
          <h3 className="mt-1 text-[20px] font-semibold tracking-tight">The same story, in fewer thumb-scrolls</h3>
          <div className="mt-5 grid gap-5">
            {rows.map((r, i) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-3 text-[13px]">
                  <span className="text-white/75">{r.label}</span>
                  <span className={`font-mono tabular-nums ${r.text}`}>
                    {r.px.toLocaleString('en-US')}px · {screens(r.px).toFixed(1)} phone screens
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1" aria-hidden>
                  {Array.from({ length: Math.ceil(screens(r.px)) }, (_, k) => (
                    <motion.span
                      key={k}
                      initial={false}
                      animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.6 }}
                      transition={{ delay: reduce ? 0 : 0.2 + i * 0.5 + k * 0.05, type: 'spring', stiffness: 500, damping: 22 }}
                    >
                      <Smartphone className={`size-5 ${k + 1 > screens(r.px) ? 'opacity-40' : ''} ${r.text}`} />
                    </motion.span>
                  ))}
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${r.tone}`}
                    initial={false}
                    animate={{ width: on ? `${(r.px / PAGE_LENGTH.before) * 100}%` : '0%' }}
                    transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2 + i * 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-white/75">
            About 30% shorter (measured with these cards switched off), while adding the live demo, the safety panel, all three plans and a closing signup. Swipeable rows and denser sections did the work; nothing was hidden to hit the number.
          </p>
        </div>
      </aside>
    </Container>
  )
}
