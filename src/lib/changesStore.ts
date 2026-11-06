import { useSyncExternalStore } from 'react'

// Whether the inline before/after cards are shown. On by default; remembered per visitor.
const KEY = 'af-concept-show-changes'
const listeners = new Set<() => void>()

function read(): boolean {
  try {
    return localStorage.getItem(KEY) !== '0'
  } catch {
    return true
  }
}

let visible = read()

export function getChangesVisible() {
  return visible
}

export function setChangesVisible(next: boolean) {
  visible = next
  try {
    localStorage.setItem(KEY, next ? '1' : '0')
  } catch {
    /* storage blocked: keep the in-memory value */
  }
  listeners.forEach((l) => l())
}

export function useChangesVisible(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => visible,
    () => true,
  )
}
