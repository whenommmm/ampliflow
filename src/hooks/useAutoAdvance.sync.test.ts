import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAutoAdvance } from './useAutoAdvance'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

it('keeps the timer in step with the bar after a tab is picked while paused', () => {
  const { result, rerender } = renderHook((p: { paused: boolean }) => useAutoAdvance({ count: 3, ms: 1000, paused: p.paused, enabled: true }), {
    initialProps: { paused: true },
  })
  act(() => result.current.setIndex(1)) // hover, then click a tab
  rerender({ paused: false }) // mouse leaves
  act(() => vi.advanceTimersByTime(400))
  rerender({ paused: true }) // hover again
  act(() => vi.advanceTimersByTime(5000))
  rerender({ paused: false })
  act(() => vi.advanceTimersByTime(601))
  expect(result.current.index).toBe(2)
})
