import { motion } from 'motion/react'
import { ArrowUpRight, Check, Lock } from 'lucide-react'
import { Container, MonoLabel, Section, buttonClass } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { founding, links, plans, pricingCopy } from '@/content/site'
import { focusHeroForm } from '@/lib/scroll'
import { cn } from '@/lib/cn'

export function Pricing() {
  return (
    <Section id="pricing" className="py-10 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <MonoLabel>{founding.eyebrow}</MonoLabel>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-t1 sm:text-[40px]">{founding.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-t2 sm:text-base">{founding.body}</p>
          </div>
          <a href={links.compare} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline hover:underline-offset-4">
            {pricingCopy.compare} <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>

        <ul className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {plans.map((p, i) => (
            <li key={p.name} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Reveal delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-2xl border bg-white p-5 sm:p-6',
                    p.popular ? 'border-primary shadow-[0_0_0_4px_rgb(47_55_217/0.08),0_24px_50px_-30px_rgb(47_55_217/0.6)]' : 'border-line',
                  )}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-5 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      Most popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-[17px] font-semibold text-t1">{p.name}</h3>
                    {p.was && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-emerald-700 ring-1 ring-emerald-200">
                        <Lock className="size-3" aria-hidden /> Founding
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-t2">{p.tagline}</p>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-[40px] font-bold leading-none tracking-tight text-t1">${p.price}</span>
                    <span className="text-sm text-t3">/ month</span>
                    {p.was && <span className="text-sm text-t3 line-through">${p.was}</span>}
                  </p>
                  <p className="mt-2 min-h-[20px] text-[12.5px] text-t3">{p.was ? pricingCopy.foundingNote : ' '}</p>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={focusHeroForm}
                    className={cn(buttonClass(p.popular ? 'primary' : 'ghost'), 'mt-5 w-full')}
                  >
                    {pricingCopy.cta}
                  </motion.button>
                  <ul className="mt-5 grid gap-2.5 border-t border-line-lo pt-5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-[14px] text-t2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[13px] text-t3">{pricingCopy.trial}</p>

        <div className="mt-6 rounded-2xl border border-line bg-bg-1 p-3.5 sm:mt-8 sm:p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-t3">What founding members get</p>
          <ul className="mt-3 flex flex-wrap gap-1.5 sm:grid sm:grid-cols-2 sm:gap-2 lg:grid-cols-5">
            {founding.perks.map((perk) => (
              <li key={perk.title} className="rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-line-lo sm:p-3">
                <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-t1 sm:text-[13.5px]">
                  <Check className="size-3.5 text-primary" aria-hidden /> {perk.title}
                </p>
                <p className="mt-1 hidden text-[12.5px] leading-snug text-t2 sm:block">{perk.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
