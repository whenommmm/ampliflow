import { useReducedMotion } from 'motion/react'
import { Hash, Webhook } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { integrations } from '@/content/site'

const LIVE_ICON = { Slack: Hash, Webhooks: Webhook } as Record<string, typeof Hash>

export function Integrations() {
  const reduce = useReducedMotion()
  const chips = integrations.coming.map((name) => (
    <span key={name} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-medium text-t2">
      {name}
      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-t3">soon</span>
    </span>
  ))

  return (
    <Section id="integrations" className="overflow-hidden py-10 sm:py-20">
      <Container className="text-center">
        <MonoLabel>{integrations.eyebrow}</MonoLabel>
        <h2 className="mx-auto mt-4 max-w-[620px] text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">{integrations.title}</h2>
        <p className="mx-auto mt-3 hidden max-w-[600px] text-[15px] leading-relaxed text-t2 sm:block">{integrations.sub}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {integrations.live.map((name) => {
            const Icon = LIVE_ICON[name]
            return (
              <span key={name} className="inline-flex items-center gap-2 rounded-lg border border-primary-line bg-white px-3.5 py-2 text-[14px] font-semibold text-t1 shadow-[0_0_0_4px_rgb(47_55_217/0.06)]">
                <Icon className="size-4 text-primary" aria-hidden />
                {name}
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> live
                </span>
              </span>
            )
          })}
        </div>
        <p className="mt-3 font-mono text-[11px] text-t3">
          {integrations.live.length} live now · {integrations.coming.length} shipping through 2026
        </p>
      </Container>
      <div className="relative mt-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {reduce ? (
          <div className="mx-auto flex max-w-[1120px] flex-wrap justify-center gap-2 px-4">{chips}</div>
        ) : (
          <InfiniteSlider gap={8} speed={28} speedOnHover={10}>
            {chips}
          </InfiniteSlider>
        )}
      </div>
    </Section>
  )
}
