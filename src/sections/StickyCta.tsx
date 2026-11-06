import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useAnyFormVisible } from '@/lib/formVisibility'
import { focusHeroForm } from '@/lib/scroll'
import { sticky } from '@/content/site'

export function StickyCta() {
  const formVisible = useAnyFormVisible()
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const show = pastHero && !formVisible

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Start a free trial"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-xl border border-line bg-white/95 py-2 pl-4 pr-2 shadow-[0_16px_40px_-16px_rgb(15_17_23/0.35)] backdrop-blur sm:inset-x-auto sm:right-5 sm:bottom-5"
        >
          <p className="text-sm text-t2">
            <strong className="font-semibold text-t1">{sticky.text}</strong> · {sticky.price}
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={focusHeroForm}
            className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hi"
          >
            {sticky.cta}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
