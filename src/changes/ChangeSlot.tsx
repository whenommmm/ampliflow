import { AnimatePresence, motion } from 'motion/react'
import { CHANGES } from '@/content/changes'
import { useChangesVisible } from '@/lib/changesStore'
import { ChangeCard } from './ChangeCard'

/** Renders the before/after card for one change id, when the cards are switched on. */
export function ChangeSlot({ id }: { id: string }) {
  const visible = useChangesVisible()
  const change = CHANGES.find((c) => c.id === id)
  if (!change) return null
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div key={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
          <ChangeCard change={change} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
