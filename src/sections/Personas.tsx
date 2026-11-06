import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Briefcase, Target, TrendingUp, Users } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { personas } from '@/content/site'
import { cn } from '@/lib/cn'
import { RevealText } from '@/fx/RevealText'

const ICONS = { founders: TrendingUp, sdrs: Target, recruiters: Users, agencies: Briefcase } as const

export function Personas() {
  const [key, setKey] = useState<(typeof personas.items)[number]['key']>('founders')
  const item = personas.items.find((p) => p.key === key)!

  return (
    <Section id="personas" className="py-10 sm:py-20">
      <Container className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-14">
        <div>
          <MonoLabel>{personas.eyebrow}</MonoLabel>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">
            <RevealText text={personas.title} />
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-t2 sm:text-base">{personas.sub}</p>
        </div>
        <div data-note-anchor className="rounded-2xl border border-line bg-bg-1 p-1.5">
          <div role="tablist" aria-label="Who it's for" className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {personas.items.map((p) => {
              const on = p.key === key
              const Icon = ICONS[p.key]
              return (
                <button
                  key={p.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setKey(p.key)}
                  className={cn('relative z-10 flex h-10 items-center justify-center gap-1.5 rounded-lg px-2 text-[13px] font-semibold transition-colors', on ? 'text-t1' : 'text-t3 hover:text-t1')}
                >
                  {on && <motion.span layoutId="persona-bg" className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm ring-1 ring-line" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
                  <Icon className="size-3.5" aria-hidden />
                  <span className="truncate">{p.label.replace(' teams', '')}</span>
                </button>
              )
            })}
          </div>
          <div role="tabpanel" className="relative mt-1.5 min-h-[132px] overflow-hidden rounded-xl bg-white p-4 ring-1 ring-line-lo sm:min-h-[150px] sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={item.key} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                <p className="text-[17px] font-semibold text-t1">{item.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-t2">{item.body}</p>
                <a href={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline hover:underline-offset-4">
                  Ampliflow for {item.label.toLowerCase()} <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}
