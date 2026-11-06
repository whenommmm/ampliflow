import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDownRight, CircleAlert, NotebookPen, X } from 'lucide-react'
import { NOTES, type NoteGroup } from '@/content/notes'
import { concept } from '@/content/site'
import { cn } from '@/lib/cn'
import { setNotesOpen, useNotesOpen } from './notesStore'
import { showMe } from './showMe'

const GROUPS: (NoteGroup | 'All')[] = ['All', 'Functional', 'Trust', 'Layout & mobile']

export function NotesCorner() {
  const open = useNotesOpen()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  // On phones the floating button would cover the hero form, so it appears once you're past the hero.
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      window.setTimeout(() => closeRef.current?.focus(), 30)
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setNotesOpen(false)
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
    if (wasOpen.current && document.activeElement === document.body) triggerRef.current?.focus({ preventScroll: true })
  }, [open])

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setNotesOpen(!open)}
        aria-label={`Redesign notes · ${NOTES.length} entries`}
        aria-expanded={open}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-[76px] left-3 z-40 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-3 pr-3.5 text-[13px] font-semibold text-white shadow-[0_12px_30px_-10px_rgb(15_17_23/0.6)] ring-1 ring-white/10 hover:bg-[#1c1f29] sm:bottom-5 sm:left-5',
          !pastHero && !open && 'max-sm:hidden',
        )}
      >
        <span className="relative">
          <NotebookPen className="size-4" aria-hidden />
          <span className="absolute -right-1 -top-1 size-2 rounded-full bg-primary ring-2 ring-ink" aria-hidden />
        </span>
        <span>
          Concept<span className="hidden sm:inline"> · Redesign notes</span>
        </span>
        <span className="rounded-full bg-white/15 px-1.5 font-mono text-[11px]">{NOTES.length}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotesOpen(false)}
              aria-hidden
            />
            <Panel closeRef={closeRef} />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function Panel({ closeRef }: { closeRef: React.RefObject<HTMLButtonElement | null> }) {
  const [group, setGroup] = useState<NoteGroup | 'All'>('All')
  const list = group === 'All' ? NOTES : NOTES.filter((n) => n.group === group)

  return (
    <motion.div
      key="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-title"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
      className="fixed inset-x-0 bottom-0 z-50 flex max-h-[86vh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-20px_60px_-20px_rgb(15_17_23/0.45)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-h-[min(760px,calc(100vh-40px))] sm:w-[440px] sm:rounded-2xl sm:ring-1 sm:ring-line"
    >
      <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-bg-3 sm:hidden" aria-hidden />
      <header className="border-b border-line-lo px-5 pb-4 pt-3 sm:pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-primary">Concept · {concept.author}</p>
            <h2 id="notes-title" className="mt-1 text-[19px] font-bold tracking-tight text-t1">
              Redesign notes
            </h2>
            <p className="mt-1 text-[13px] leading-snug text-t2">What I noticed on ampliflow.in, and what this version does instead.</p>
          </div>
          <button ref={closeRef} type="button" onClick={() => setNotesOpen(false)} aria-label="Close notes" className="grid size-8 shrink-0 place-items-center rounded-md text-t2 hover:bg-bg-1 hover:text-t1">
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1" role="group" aria-label="Filter notes">
          {GROUPS.map((g) => {
            const n = g === 'All' ? NOTES.length : NOTES.filter((x) => x.group === g).length
            return (
              <button
                key={g}
                type="button"
                aria-pressed={group === g}
                onClick={() => setGroup(g)}
                className={cn('rounded-md px-2 py-1 text-[12px] font-medium transition-colors', group === g ? 'bg-ink text-white' : 'bg-bg-1 text-t2 hover:text-t1')}
              >
                {g} <span className="font-mono text-[10.5px] opacity-70">{n}</span>
              </button>
            )
          })}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
        <ol className="grid gap-2">
          {list.map((note) => (
            <li key={note.id}>
              <article className="rounded-xl border border-line-lo bg-white p-3.5 hover:border-line">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 rounded bg-primary-dim px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-primary">{note.id}</span>
                  <h3 className="flex-1 text-[14.5px] font-semibold leading-snug text-t1">{note.title}</h3>
                </div>
                <dl className="mt-2.5 grid gap-2 text-[13px] leading-relaxed">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-t3">Found</dt>
                    <dd className="text-t2">{note.found}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-t3">Why it costs sign-ups</dt>
                    <dd className="text-t2">{note.why}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">Changed</dt>
                    <dd className="text-t1">{note.changed}</dd>
                  </div>
                </dl>
                {note.needsYou && (
                  <p className="mt-2.5 flex gap-2 rounded-lg bg-amber-50 px-2.5 py-2 text-[12.5px] leading-snug text-amber-900 ring-1 ring-amber-200">
                    <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    <span>
                      <strong className="font-semibold">Needs you: </strong>
                      {note.needsYou}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => showMe(note.target)}
                  className="mt-3 inline-flex items-center gap-1 rounded-md bg-bg-1 px-2.5 py-1.5 text-[12.5px] font-semibold text-t1 ring-1 ring-line-lo hover:bg-primary hover:text-white hover:ring-primary"
                >
                  Show me <ArrowDownRight className="size-3.5" aria-hidden />
                </button>
              </article>
            </li>
          ))}
        </ol>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line-lo bg-bg-1 px-5 py-3 text-[11.5px] text-t3">
        <span>
          {concept.label}. Checked against the live ampliflow.in, 7 Nov 2026.
        </span>
        <span className="flex gap-3">
          <a href={concept.portfolio} className="font-medium text-t1 hover:text-primary">Portfolio</a>
          <a href={concept.linkedin} className="font-medium text-t1 hover:text-primary">LinkedIn</a>
        </span>
      </footer>
    </motion.div>
  )
}
