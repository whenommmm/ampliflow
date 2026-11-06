import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { FileSpreadsheet, KeyRound, Moon, Workflow } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { how } from '@/content/site'
import { RevealText } from '@/fx/RevealText'

const CHIPS = [
  { icon: KeyRound, text: 'Unipile OAuth' },
  { icon: FileSpreadsheet, text: 'Search URL or CSV' },
  { icon: Workflow, text: 'Visit → Connect → If → Message' },
  { icon: Moon, text: 'Running while you sleep' },
]

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = !!useReducedMotion()
  // The line fills as you scroll through the steps; each badge lights when the line reaches it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [reached, setReached] = useState(reduce ? how.steps.length : 0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => !reduce && setReached(Math.max(0, Math.min(how.steps.length, Math.floor(v * (how.steps.length - 1) + 1.05)))))

  return (
    <Section id="how" className="py-10 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <MonoLabel>{how.eyebrow}</MonoLabel>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">
              <RevealText text={how.title} />
            </h2>
          </div>
          <p className="max-w-[300px] text-[15px] text-t2 md:text-right">{how.side}</p>
        </div>
        <ol ref={ref} data-note-anchor className="relative mt-7 grid gap-5 md:mt-10 md:grid-cols-4 md:gap-5">
          <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-px md:w-auto" />
          <motion.span
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-[2px] origin-top bg-primary md:hidden"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[15px] hidden h-[2px] origin-left bg-primary md:block"
            style={{ scaleX: reduce ? 1 : progress }}
          />
          {how.steps.map((s, i) => {
            const Chip = CHIPS[i]
            return (
              <li key={s.n} className="relative pl-12 md:pl-0 md:pt-12">
                <motion.span
                  initial={false}
                  animate={i < reached ? { backgroundColor: '#2f37d9', color: '#ffffff', scale: [1, 1.18, 1] } : { backgroundColor: '#ffffff', color: '#0d0f14', scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="absolute left-0 top-0 grid size-8 place-items-center rounded-md border border-line font-mono text-[11px] font-medium"
                >
                  {s.n}
                </motion.span>
                <h3 className="text-[16px] font-semibold text-t1">{s.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-t2">{s.body}</p>
                <span className="mt-3 hidden items-center gap-1.5 rounded-md bg-bg-1 sm:inline-flex px-2 py-1 font-mono text-[11px] text-t2 ring-1 ring-line-lo">
                  <Chip.icon className="size-3 text-primary" aria-hidden />
                  {Chip.text}
                </span>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
