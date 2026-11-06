import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAutoAdvance } from './useAutoAdvance'

describe('useAutoAdvance', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('moves to the next item after the interval and wraps around', () => {
    const { result } = renderHook(() => useAutoAdvance({ count: 3, ms: 1000, paused: false, enabled: true }))
    expect(result.current.index).toBe(0)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(1)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(2)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(0)
  })

  it('holds still while paused and resumes with the time that was left', () => {
    const { result, rerender } = renderHook((p: { paused: boolean }) => useAutoAdvance({ count: 3, ms: 1000, paused: p.paused, enabled: true }), {
      initialProps: { paused: false },
    })
    act(() => vi.advanceTimersByTime(600))
    rerender({ paused: true })
    act(() => vi.advanceTimersByTime(5000))
    expect(result.current.index).toBe(0)
    rerender({ paused: false })
    act(() => vi.advanceTimersByTime(399))
    expect(result.current.index).toBe(0)
    act(() => vi.advanceTimersByTime(2))
    expect(result.current.index).toBe(1)
  })

  it('never advances when disabled (reduced motion)', () => {
    const { result } = renderHook(() => useAutoAdvance({ count: 3, ms: 1000, paused: false, enabled: false }))
    act(() => vi.advanceTimersByTime(10000))
    expect(result.current.index).toBe(0)
  })

  it('restarts the countdown when someone picks a tab', () => {
    const { result } = renderHook(() => useAutoAdvance({ count: 3, ms: 1000, paused: false, enabled: true }))
    act(() => vi.advanceTimersByTime(900))
    act(() => result.current.setIndex(2))
    act(() => vi.advanceTimersByTime(900))
    expect(result.current.index).toBe(2)
    act(() => vi.advanceTimersByTime(100))
    expect(result.current.index).toBe(0)
  })
})
