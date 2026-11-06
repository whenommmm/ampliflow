import { Quote } from 'lucide-react'
import { Container, MonoLabel, Section } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { testimonials } from '@/content/site'

function initials(name: string) {
  return name.replace('.', '').split(' ').map((p) => p[0]).join('')
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-bg-1 py-10 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <MonoLabel>{testimonials.eyebrow}</MonoLabel>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-t1 sm:text-[40px]">{testimonials.title}</h2>
          </div>
          <p className="hidden max-w-[340px] text-[15px] text-t2 md:block md:text-right">{testimonials.sub}</p>
        </div>
        <ul data-note-anchor className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {testimonials.items.map((t, i) => (
            <li key={t.name} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-primary-dim px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">{t.tag}</span>
                    <Quote className="size-4 text-line-hi" aria-hidden />
                  </div>
                  <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-t1">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3 border-t border-line-lo pt-4">
                    <span aria-hidden className="grid size-9 place-items-center rounded-full bg-bg-2 font-mono text-[11px] font-medium text-t2">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-t1">{t.name}</span>
                      <span className="block font-mono text-[11px] text-t3">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
