import { useEffect } from 'react'
import type { DemoTab } from '@/content/demo'

// Lets the Redesign notes ("Show me") switch the product demo to a tab.
const listeners = new Set<(tab: DemoTab) => void>()

export function requestDemoTab(tab: DemoTab) {
  listeners.forEach((l) => l(tab))
}

export function useDemoTabRequests(onRequest: (tab: DemoTab) => void) {
  useEffect(() => {
    listeners.add(onRequest)
    return () => {
      listeners.delete(onRequest)
    }
  }, [onRequest])
}
