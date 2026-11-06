import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { CHANGES, PAGE_LENGTH } from './changes'
import { NOTES } from './notes'
import { SECTION_IDS } from './sections'

const pub = resolve(import.meta.dirname, '../../public')

describe('before/after change cards', () => {
  it('each card sits in a real section, once', () => {
    for (const c of CHANGES) expect(SECTION_IDS).toContain(c.section)
    expect(new Set(CHANGES.map((c) => c.section)).size).toBe(CHANGES.length)
  })
  it('each card links to real notes entries', () => {
    const ids = NOTES.map((n) => n.id)
    for (const c of CHANGES) for (const n of c.notes) expect(ids).toContain(n)
  })
  it('every notes entry is explained by some card (L1 by the page-length card)', () => {
    const covered = new Set([...CHANGES.flatMap((c) => c.notes), ...PAGE_LENGTH.notes])
    for (const n of NOTES) expect(covered, n.id).toContain(n.id)
  })
  it('each card shows a real before screenshot', () => {
    for (const c of CHANGES) {
      expect(existsSync(resolve(pub, c.before.src.replace(/^\//, ''))), c.before.src).toBe(true)
      if (c.before.mobileSrc) expect(existsSync(resolve(pub, c.before.mobileSrc.replace(/^\//, ''))), c.before.mobileSrc).toBe(true)
    }
  })
  it('each card says what was there, what replaced it and why that is better', () => {
    for (const c of CHANGES) {
      expect(c.was.trim(), c.id).not.toBe('')
      expect(c.now.trim(), c.id).not.toBe('')
      expect(c.better.length, c.id).toBeGreaterThan(0)
    }
  })
  it('page-length numbers match the measured heights', () => {
    expect(PAGE_LENGTH.before).toBe(13019)
    expect(PAGE_LENGTH.after).toBeLessThan(PAGE_LENGTH.before)
  })
})
