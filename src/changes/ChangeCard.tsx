import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, CircleAlert, Expand, X } from 'lucide-react'
import type { Change } from '@/content/changes'
import { CHANGES } from '@/content/changes'
import { Container } from '@/components/ui'
import { setNotesOpen } from '@/notes/notesStore'
import { cn } from '@/lib/cn'

const KIND_TONE: Record<Change['kind'], string> = {
  Functional: 'bg-[#4047e0]/25 text-[#c7caff] ring-[#4047e0]/50',
  Trust: 'bg-amber-400/15 text-amber-200 ring-amber-300/30',
  Layout: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/30',
}

export function ChangeCard({ change }: { change: Change }) {
  // Observe an unclipped wrapper: Chrome's IntersectionObserver honours clip-path, so the clipped card would never 'enter'.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = !!useReducedMotion()
  const on = inView || reduce
  const index = CHANGES.findIndex((c) => c.id === change.id) + 1
  const [zoom, setZoom] = useState(false)

  const row = (i: number) => ({
    initial: false as const,
    animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.45, delay: reduce ? 0 : 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <Container className="relative z-[1]">
      <div ref={ref}>
      <motion.aside
        data-change={change.id}
        aria-label={`Change ${index}: ${change.title}`}
        initial={false}
        animate={on ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)' } : { opacity: 0, clipPath: 'inset(0% 0% 100% 0% round 18px)' }}
        transition={{ duration: reduce ? 0 : 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="relative my-6 overflow-hidden rounded-[18px] bg-[#0a0c1f] text-white shadow-[0_30px_80px_-40px_rgb(10_12_31/0.9)] ring-1 ring-white/10 sm:my-8"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#2f37d9]/40 blur-3xl" />

        <header className="relative flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50">
            Change {String(index).padStart(2, '0')}/{String(CHANGES.length).padStart(2, '0')}
          </span>
          <span className={cn('rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ring-1', KIND_TONE[change.kind])}>{change.kind}</span>
          <span className="ml-auto flex gap-1">
            {change.notes.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNotesOpen(true)}
                className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80 ring-1 ring-white/15 hover:bg-white/20"
                aria-label={`Open redesign notes (${n})`}
              >
                {n}
              </button>
            ))}
          </span>
          <h3 className="w-full text-[18px] font-semibold tracking-tight sm:text-[20px]">{change.title}</h3>
        </header>

        <div className="relative grid gap-5 p-4 sm:p-6 md:grid-cols-[1.05fr_1fr] md:gap-8">
          <BeforeShot change={change} on={on} reduce={reduce} onZoom={() => setZoom(true)} />

          <div className="flex flex-col gap-4 text-[14px] leading-relaxed">
            <motion.div {...row(0)}>
              <Label tone="bg-rose-400">Was</Label>
              <p className="mt-1 text-white/65">{change.was}</p>
            </motion.div>
            <motion.div {...row(1)}>
              <Label tone="bg-emerald-400">Now</Label>
              <p className="mt-1 text-white">{change.now}</p>
            </motion.div>
            <motion.div {...row(2)}>
              <Label tone="bg-[#8b90ff]">Why it’s better</Label>
              <ul className="mt-1.5 grid gap-1.5">
                {change.better.map((b) => (
                  <li key={b} className="flex gap-2 text-white/85">
                    <Check className="mt-1 size-3.5 shrink-0 text-emerald-300" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
            {change.stat && (
              <motion.div {...row(3)}>
                <Stat stat={change.stat} on={on} reduce={reduce} />
              </motion.div>
            )}
            {change.needsYou && (
              <motion.p {...row(4)} className="flex gap-2 rounded-lg bg-amber-300/10 px-3 py-2 text-[13px] text-amber-100 ring-1 ring-amber-300/25">
                <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>
                  <strong className="font-semibold">Needs you: </strong>
                  {change.needsYou}
                </span>
              </motion.p>
            )}
          </div>
        </div>
      </motion.aside>
      </div>
      <Lightbox open={zoom} onClose={() => setZoom(false)} change={change} />
    </Container>
  )
}

function Label({ children, tone }: { children: string; tone: string }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">
      <span className={cn('size-1.5 rounded-full', tone)} aria-hidden />
      {children}
    </p>
  )
}

function BeforeShot({ change, on, reduce, onZoom }: { change: Change; on: boolean; reduce: boolean; onZoom: () => void }) {
  return (
    <div className="group relative self-start overflow-hidden rounded-xl bg-white ring-1 ring-white/15">
      <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f4f5f8] px-3 py-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 truncate rounded bg-white px-2 py-0.5 font-mono text-[10px] text-[#6b6f80] ring-1 ring-black/5">ampliflow.in · live, 7 Nov 2026</span>
      </div>
      <button type="button" onClick={onZoom} className="relative block w-full cursor-zoom-in text-left" aria-label={`Enlarge the before screenshot: ${change.before.alt}`}>
        <picture>
          {change.before.mobileSrc && <source media="(max-width: 767px)" srcSet={change.before.mobileSrc} />}
          <img
            src={change.before.src}
            alt={change.before.alt}
            loading="lazy"
            decoding="async"
            style={{ ['--focus' as string]: change.before.focus ?? '50% 0%', ['--mfocus' as string]: change.before.mobileFocus ?? change.before.focus ?? '50% 0%' }}
            className="block h-[200px] [object-position:var(--mfocus)] md:[object-position:var(--focus)] w-full object-cover saturate-[.55] transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:saturate-100 sm:h-[260px]"
          />
        </picture>
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#2f37d9]/35 to-transparent"
            initial={{ y: '-100%' }}
            animate={on ? { y: ['-100%', '420%'] } : { y: '-100%' }}
            transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
          />
        )}
        <span className="absolute left-2 top-2 rounded bg-rose-500 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white shadow">Before</span>
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <Expand className="size-3" aria-hidden /> enlarge
        </span>
      </button>
    </div>
  )
}

function Stat({ stat, on, reduce }: { stat: NonNullable<Change['stat']>; on: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
      <span className="w-full font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/50 sm:w-auto">{stat.label}</span>
      <span className="relative font-mono text-[18px] font-medium text-rose-300/90 tabular-nums">
        {stat.before}
        <motion.span
          aria-hidden
          className="absolute left-[-2px] right-[-2px] top-1/2 h-[2px] origin-left bg-rose-300"
          initial={false}
          animate={{ scaleX: on ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.9 }}
        />
      </span>
      <ArrowRight className="size-4 text-white/40" aria-hidden />
      <motion.span
        className="font-mono text-[22px] font-semibold text-emerald-300 tabular-nums"
        initial={false}
        animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ type: 'spring', stiffness: 420, damping: 16, delay: reduce ? 0 : 1.15 }}
      >
        {stat.after}
      </motion.span>
      <span className="sr-only">
        {stat.label}: before {stat.before}, now {stat.after}
      </span>
    </div>
  )
}

function Lightbox({ open, onClose, change }: { open: boolean; onClose: () => void; change: Change }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Before: ${change.title}`}
          className="fixed inset-0 z-[60] grid place-items-center bg-[#0a0c1f]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative max-h-[90vh] max-w-[1000px] overflow-auto rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <picture>
              {change.before.mobileSrc && <source media="(max-width: 767px)" srcSet={change.before.mobileSrc} />}
              <img src={change.before.src} alt={change.before.alt} className="block w-full" />
            </picture>
            <figcaption className="sticky bottom-0 flex items-center justify-between gap-3 bg-[#0a0c1f] px-4 py-2 text-[12px] text-white/80">
              <span>Before · live ampliflow.in, captured 7 Nov 2026</span>
              <button ref={closeRef} type="button" onClick={onClose} className="inline-flex items-center gap-1 rounded px-2 py-1 font-medium text-white hover:bg-white/10">
                <X className="size-3.5" aria-hidden /> Close
              </button>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
