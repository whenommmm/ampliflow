import type { NoteTarget } from '@/content/notes'
import { requestDemoTab } from '@/lib/demoStore'
import { requestFaq } from '@/lib/faqStore'
import { prefersReducedMotion } from '@/lib/scroll'
import { setNotesOpen } from './notesStore'

const HIGHLIGHT_MS = 2400
let clearTimer = 0
let lastEl: HTMLElement | null = null

/** Close the notes, reveal whatever the note points at, scroll to it and flash a ring around it. */
export function showMe(target: NoteTarget) {
  setNotesOpen(false)
  if (target.demoTab) requestDemoTab(target.demoTab)
  if (target.faqIndex !== undefined) requestFaq(target.faqIndex)

  // Let the panel close and the tab/accordion state settle before measuring.
  window.setTimeout(() => {
    const section = document.getElementById(target.section)
    if (!section) return
    const el =
      (target.faqIndex !== undefined && section.querySelector<HTMLElement>(`[data-faq-index="${target.faqIndex}"]`)) ||
      section.querySelector<HTMLElement>('[data-note-anchor]') ||
      section
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
    window.clearTimeout(clearTimer)
    lastEl?.removeAttribute('data-highlight')
    void el.offsetWidth // restart the ring animation if the same element is shown twice
    el.setAttribute('data-highlight', 'on')
    lastEl = el
    clearTimer = window.setTimeout(() => el.removeAttribute('data-highlight'), HIGHLIGHT_MS)
  }, 80)
}
