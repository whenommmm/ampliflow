import { LinkedInIcon } from '@/components/icons'
import { Logo } from '@/components/Logo'
import { concept, footer } from '@/content/site'
import { setNotesOpen } from '@/notes/notesStore'
import { cn } from '@/lib/cn'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-6 w-auto text-white" />
          <p className="mt-4 max-w-[300px] text-sm leading-relaxed text-white/75">{footer.blurb}</p>
          <div className="mt-5 flex items-center gap-3">
            <a href={footer.linkedin} aria-label="Ampliflow on LinkedIn" className="grid size-8 place-items-center rounded-md bg-white/10 ring-1 ring-white/20 hover:bg-white/20">
              <LinkedInIcon className="size-4" />
            </a>
          </div>
        </div>
        {footer.columns.map((c) => (
          <div key={c.title} className={c.title === 'Resources' ? 'col-span-2 md:col-span-1' : undefined}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">{c.title}</h3>
            <ul className={cn('mt-3 grid gap-2 md:mt-4 md:gap-2.5', c.title === 'Resources' && 'grid-cols-2 md:grid-cols-1')}>
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/90 hover:text-white hover:underline hover:underline-offset-4">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-[#0b0d1a] text-white/60">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-4 py-4 text-[13px] sm:px-6 md:py-5">
          <span>{footer.copyright}</span>
          <span className="flex gap-4">
            {footer.legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white">
                {l.label}
              </a>
            ))}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] md:inline">{footer.made}</span>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-4 text-[12px] sm:px-6">
            <span>Redesign concept by {concept.author}. Not affiliated with Ampliflow.</span>
            <a href={concept.portfolio} className="text-white/85 hover:text-white">Portfolio</a>
            <a href={concept.github} className="text-white/85 hover:text-white">GitHub</a>
            <a href={concept.linkedin} className="text-white/85 hover:text-white">LinkedIn</a>
            <button type="button" onClick={() => setNotesOpen(true)} className="text-white/85 underline underline-offset-2 hover:text-white">
              Read the redesign notes
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
