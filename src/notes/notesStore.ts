import { useSyncExternalStore } from 'react'

let open = false
const listeners = new Set<() => void>()

export function setNotesOpen(next: boolean) {
  open = next
  listeners.forEach((l) => l())
}

export function useNotesOpen(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => open,
    () => false,
  )
}
