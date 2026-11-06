import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  localStorage.clear()
})

describe('changes visibility', () => {
  it('shows the before/after cards by default', async () => {
    const { getChangesVisible } = await import('./changesStore')
    expect(getChangesVisible()).toBe(true)
  })
  it('remembers when a visitor hides them', async () => {
    const a = await import('./changesStore')
    a.setChangesVisible(false)
    vi.resetModules()
    const b = await import('./changesStore')
    expect(b.getChangesVisible()).toBe(false)
  })
  it('still works when storage throws', async () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const { getChangesVisible, setChangesVisible } = await import('./changesStore')
    expect(getChangesVisible()).toBe(true)
    expect(() => setChangesVisible(false)).not.toThrow()
    spy.mockRestore()
  })
})
