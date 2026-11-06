import { useEffect, useSyncExternalStore, type RefObject } from 'react'

// Tracks whether any signup form is on screen, so the sticky CTA can step aside.
const visible = new Set<string>()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function useRegisterForm(id: string, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) visible.add(id)
      else visible.delete(id)
      emit()
    })
    io.observe(el)
    return () => {
      io.disconnect()
      visible.delete(id)
      emit()
    }
  }, [id, ref])
}

export function useAnyFormVisible(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => visible.size > 0,
    () => false,
  )
}
