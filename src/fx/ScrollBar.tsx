import { useReducedMotion } from 'motion/react'
import { ScrollProgress } from '@/components/motion-primitives/scroll-progress'

export function ScrollBar() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return <ScrollProgress className="fixed inset-x-0 top-0 z-[55] h-[3px] bg-gradient-to-r from-[#2f37d9] via-[#8b90ff] to-[#16a34a]" springOptions={{ stiffness: 280, damping: 40, restDelta: 0.001 }} />
}
