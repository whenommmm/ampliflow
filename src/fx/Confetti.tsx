import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const COLORS = ['#2f37d9', '#4047e0', '#8b90ff', '#16a34a', '#f59e0b', '#ef4444', '#0d0f14']

/** A one-shot burst from the centre of its (relative) parent. Remount with a new key to fire again. */
export function ConfettiBurst({ count = 34 }: { count?: number }) {
  const reduce = useReducedMotion()
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
        const dist = 70 + Math.random() * 110
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 40,
          r: Math.random() * 540 - 270,
          c: COLORS[i % COLORS.length],
          w: 5 + Math.random() * 5,
          round: Math.random() > 0.6,
        }
      }),
    [count],
  )
  if (reduce) return null
  return (
    <span aria-hidden data-testid="confetti" className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{ width: b.w, height: b.round ? b.w : b.w * 0.45, background: b.c, borderRadius: b.round ? 999 : 1 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 90], opacity: [1, 1, 0], rotate: b.r, scale: 1 }}
          transition={{ duration: 1.25, ease: [0.2, 0.7, 0.4, 1], times: [0, 0.55, 1] }}
        />
      ))}
    </span>
  )
}
