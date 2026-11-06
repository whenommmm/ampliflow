import { useCallback, useEffect, useRef, useState } from 'react'

type Options = { count: number; ms: number; paused: boolean; enabled: boolean }

/**
 * Cycles an index every `ms`. Pausing keeps the remaining time; picking an item
 * (setIndex) restarts the countdown. `cycle` changes on every (re)start so a
 * countdown bar can key its animation on it.
 */
export function useAutoAdvance({ count, ms, paused, enabled }: Options) {
  const [index, setIndexState] = useState(0)
  const [cycle, setCycle] = useState(0)
  const remaining = useRef(ms)
  const restarted = useRef(false)

  const setIndex = useCallback(
    (i: number) => {
      restarted.current = true
      remaining.current = ms
      setIndexState(i)
      setCycle((c) => c + 1)
    },
    [ms],
  )

  useEffect(() => {
    // A pick made while paused has already reset `remaining`; don't let it skip the next pause's bookkeeping.
    restarted.current = false
    if (!enabled || paused) return
    const start = Date.now()
    let fired = false
    const id = window.setTimeout(() => {
      fired = true
      restarted.current = true
      remaining.current = ms
      setIndexState((i) => (i + 1) % count)
      setCycle((c) => c + 1)
    }, remaining.current)
    return () => {
      window.clearTimeout(id)
      if (!fired && !restarted.current) remaining.current = Math.max(0, remaining.current - (Date.now() - start))
      restarted.current = false
    }
  }, [enabled, paused, count, ms, cycle])

  return { index, setIndex, cycle }
}
