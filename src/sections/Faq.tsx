import { useCallback, useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Plus } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { faq, faqCopy, links } from '@/content/site'
import { useFaqRequests } from '@/lib/faqStore'
import { cn } from '@/lib/cn'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()
  useFaqRequests(useCallback((i: number) => setOpen(i), []))

  return (
    <Section id="faq" className="py-10 sm:py-20">
      <Container className="grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-14">
        <div>
          <MonoLabel>{faqCopy.eyebrow}</MonoLabel>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">
            {faqCopy.titleStart} <em className="font-bold not-italic text-primary">{faqCopy.titleAccent}</em> {faqCopy.titleEnd}
          </h2>
          <p className="mt-3 hidden text-[15px] leading-relaxed text-t2 sm:block">{faqCopy.sub}</p>
          <div className="mt-6 hidden rounded-xl border border-line bg-bg-1 p-5 md:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">{faqCopy.stuck.eyebrow}</p>
            <p className="mt-2 text-[17px] font-semibold text-t1">{faqCopy.stuck.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-t2">{faqCopy.stuck.body}</p>
            <a href={links.support} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline hover:underline-offset-4">
              {faqCopy.stuck.cta} <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {faq.map((item, i) => {
              const isOpen = open === i
              const panelId = `${baseId}-faq-${i}`
              return (
                <li key={item.q} data-faq-index={i}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center gap-3 py-3.5 text-left sm:gap-4 sm:py-4"
                    >
                      <span className="w-6 shrink-0 font-mono text-[11px] text-primary">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1 text-[15px] font-semibold text-t1 sm:text-base">{item.q}</span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-t3 sm:inline">[ {item.tag} ]</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid size-6 shrink-0 place-items-center rounded-md border border-line text-t2 group-hover:border-line-hi group-hover:text-t1">
                        <Plus className="size-3.5" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={cn('pb-5 pl-9 pr-2 sm:pl-10')}>
                          <p className="text-[14.5px] leading-relaxed text-t2">{item.a}</p>
                          {item.note && <p className="mt-3 border-l-2 border-primary pl-3 text-[14px] font-medium text-t1">{item.note}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 text-sm text-t2 md:hidden">
            {faqCopy.stuck.title}{' '}
            <a href={links.support} className="font-semibold text-primary">
              {faqCopy.stuck.cta} →
            </a>
          </p>
        </div>
      </Container>
    </Section>
  )
}
