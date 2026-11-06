import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { founder } from '@/content/site'

export function Founder() {
  const [more, setMore] = useState(false)
  const body = founder.body.map((para) => (
    <p key={para.slice(0, 24)} className="text-[15px] leading-relaxed text-t2 sm:text-base">
      {para}
    </p>
  ))
  return (
    <Section id="founder" className="border-y border-line-lo bg-bg-1 py-10 sm:py-20">
      <Container className="grid gap-6 md:grid-cols-[240px_1fr] md:gap-14">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <img src={founder.photo} alt={founder.name} width={88} height={88} loading="lazy" className="size-16 rounded-full object-cover ring-4 ring-white md:size-[88px]" />
          <div>
            <MonoLabel className="hidden md:inline-flex">{founder.eyebrow}</MonoLabel>
            <a href={founder.linkedin} className="mt-0 inline-flex items-center gap-1 text-[16px] font-semibold text-t1 hover:text-primary md:mt-4">
              {founder.name} <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
            <p className="font-mono text-[11px] text-t3">{founder.role}</p>
          </div>
        </div>
        <div className="max-w-[640px]">
          <p className="text-[20px] font-semibold leading-snug tracking-[-0.01em] text-t1 sm:text-[24px]">
            {founder.lead.map((part, i) => (part.em ? <span key={i} className="text-primary">{part.t}</span> : <span key={i}>{part.t}</span>))}
          </p>
          <div className="mt-5 hidden space-y-4 md:block">{body}</div>
          <div className="md:hidden">
            <AnimatePresence initial={false}>
              {more && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="space-y-4 pt-4">{body}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {more ? 'Show less' : 'Read the full note'}
              <ChevronDown className={`size-4 transition-transform ${more ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
