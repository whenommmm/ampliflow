import { useEffect } from 'react'

// Lets the Redesign notes ("Show me") open a specific FAQ item.
const listeners = new Set<(index: number) => void>()

export function requestFaq(index: number) {
  listeners.forEach((l) => l(index))
}

export function useFaqRequests(onRequest: (index: number) => void) {
  useEffect(() => {
    listeners.add(onRequest)
    return () => {
      listeners.delete(onRequest)
    }
  }, [onRequest])
}
