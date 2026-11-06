import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

/**
 * Headline that arrives word by word, un-blurring as it rises. Reads normally for screen readers.
 * Visibility is observed on the unclipped wrapper (each word sits in an overflow-hidden mask,
 * which IntersectionObserver would otherwise count as hidden).
 */
export function RevealText({ text, className, delay = 0, fast = false }: { text: string; className?: string; delay?: number; fast?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '70%', opacity: 0, filter: 'blur(8px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : undefined}
            transition={{ duration: fast ? 0.4 : 0.55, delay: delay + i * (fast ? 0.03 : 0.045), ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
