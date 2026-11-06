import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EmailForm } from '@/components/EmailForm'
import { Container, Section } from '@/components/ui'
import { hero } from '@/content/site'
import { focusHeroForm } from '@/lib/scroll'

export function Hero({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14, filter: 'blur(6px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <Section id="hero" className="overflow-hidden pt-12 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgb(47_55_217/0.10),transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(to_right,rgb(15_17_23/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(15_17_23/0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_55%_65%_at_50%_0%,black,transparent_80%)]"
      />
      <Container className="relative flex flex-col items-center text-center">
        <motion.button
          type="button"
          onClick={focusHeroForm}
          {...rise(0)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-[13px] font-medium text-t1 shadow-[0_1px_2px_rgb(15_17_23/0.05)] hover:border-line-hi"
        >
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.12em] text-white">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            {hero.pillTag}
          </span>
          {hero.pill}
          <span aria-hidden className="text-t3 transition-transform group-hover:translate-x-0.5">›</span>
        </motion.button>
        <motion.h1
          {...rise(0.06)}
          className="mt-6 max-w-[780px] text-[40px] font-bold leading-[1.02] tracking-[-0.045em] text-balance text-t1 sm:text-[64px]"
        >
          {hero.titleStart}{' '}
          <span className="relative whitespace-nowrap text-primary">
            {hero.titleAccent}
            <motion.svg
              aria-hidden
              viewBox="0 0 220 12"
              preserveAspectRatio="none"
              className="absolute -bottom-1.5 left-0 h-[10px] w-full sm:-bottom-2"
            >
              <motion.path
                d="M2 9 C 50 2, 120 2, 218 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ duration: 0.9, delay: 0.55, ease: 'easeInOut' }}
              />
            </motion.svg>
          </span>
        </motion.h1>
        <motion.p {...rise(0.12)} className="mt-5 max-w-[590px] text-[16px] leading-relaxed text-pretty text-t2 sm:text-[18px]">
          {hero.subBefore}
          <strong className="font-semibold text-t1">{hero.subBold}</strong>
          {hero.subAfter}
        </motion.p>
        <motion.div {...rise(0.18)} className="mt-8 flex w-full justify-center">
          <EmailForm source="hero" />
        </motion.div>
      </Container>
      {children}
    </Section>
  )
}
