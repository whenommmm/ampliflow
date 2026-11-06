import { motion } from 'motion/react'
import { NotebookPen } from 'lucide-react'
import { concept } from '@/content/site'
import { setNotesOpen } from '@/notes/notesStore'
import { setChangesVisible, useChangesVisible } from '@/lib/changesStore'

export function Ribbon() {
  const show = useChangesVisible()
  return (
    <div className="relative z-50 bg-ink text-white/75">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-2 text-[12px] sm:px-6 sm:text-[13px]">
        <p className="min-w-0 truncate">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Concept · </span>
          <span className="hidden md:inline">{concept.label}</span>
          <span className="md:hidden">Unofficial redesign by {concept.author}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            role="switch"
            aria-checked={show}
            onClick={() => setChangesVisible(!show)}
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-medium text-white hover:bg-white/10"
          >
            <span className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${show ? 'bg-[#4047e0]' : 'bg-white/25'}`}>
              <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 32 }} className={`absolute size-3 rounded-full bg-white ${show ? 'right-0.5' : 'left-0.5'}`} />
            </span>
            <span className="hidden sm:inline">Before/after cards</span>
            <span className="sm:hidden">Changes</span>
          </button>
          <button
            type="button"
            onClick={() => setNotesOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-white hover:bg-white/10"
            aria-label="Open redesign notes"
          >
            <NotebookPen className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Notes</span>
          </button>
        </div>
      </div>
    </div>
  )
}
