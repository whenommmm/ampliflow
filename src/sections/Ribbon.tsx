import { NotebookPen } from 'lucide-react'
import { concept } from '@/content/site'
import { setNotesOpen } from '@/notes/notesStore'

export function Ribbon() {
  return (
    <div className="relative z-50 bg-ink text-white/75">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-4 py-2 text-[12px] sm:px-6 sm:text-[13px]">
        <p className="min-w-0 truncate">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Concept · </span>
          {concept.label}
        </p>
        <button
          type="button"
          onClick={() => setNotesOpen(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-medium text-white hover:bg-white/10"
        >
          <NotebookPen className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Open redesign notes</span>
          <span className="sm:hidden">Notes</span>
        </button>
      </div>
    </div>
  )
}
