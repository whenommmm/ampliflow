import { CalendarClock } from 'lucide-react'
import { EmailForm } from '@/components/EmailForm'
import { Container, Section } from '@/components/ui'
import { closing, links } from '@/content/site'

export function ClosingCta() {
  return (
    <Section id="closing" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-12 text-center text-white sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,black,transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
          <div className="relative flex flex-col items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">{closing.eyebrow}</span>
            <h2 className="mt-4 max-w-[640px] text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-balance sm:text-[44px]">{closing.title}</h2>
            <p className="mt-3 max-w-[460px] text-[15px] text-white/75">{closing.sub}</p>
            <div className="mt-8 flex w-full justify-center">
              <EmailForm source="closing" tone="dark" className="[&>div:last-child]:justify-center" />
            </div>
            <a
              href={links.founderCall}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 ring-1 ring-white/25 hover:bg-white/10"
            >
              <CalendarClock className="size-4" aria-hidden /> {closing.call}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
