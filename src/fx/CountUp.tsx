import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/** Counts from 0 to `to` the first time it scrolls into view. */
export function CountUp({ to, prefix = '', suffix = '', duration = 1.4 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) return setN(to)
    if (!inView) return
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, to, duration])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
