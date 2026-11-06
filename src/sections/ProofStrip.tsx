import { BadgeCheck, Banknote, Cloud, MessageCircleReply } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { Reveal } from '@/components/Reveal'
import { proof } from '@/content/site'

const ICONS = [Banknote, BadgeCheck, MessageCircleReply, Cloud]

export function ProofStrip() {
  return (
    <Section id="proof" className="py-8 sm:py-10" aria-label="Proof">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white md:grid-cols-4">
            {proof.map((p, i) => {
              const Icon = ICONS[i]
              return (
                <li key={p.label} className="flex items-start gap-3 border-line p-4 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r md:[&:not(:last-child)]:border-r sm:p-5">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-[22px] font-bold leading-none tracking-tight text-t1 sm:text-[26px]">{p.value}</p>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-t2">{p.label}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
