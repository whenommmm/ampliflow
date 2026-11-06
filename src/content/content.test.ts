import { describe, expect, it } from 'vitest'
import { SECTION_IDS } from './sections'
import { NOTES } from './notes'
import { DEMO_NAMES } from './demo'
import { faq, features, integrations, plans } from './site'

const BANNED_DEMO_NAMES = ['Marcus', 'Sara', 'Sarah', 'Nikita', 'Alex', 'Priya', 'Tomas', 'Daniel', 'Emma', 'Ravi', 'Elena', 'James']

describe('redesign notes', () => {
  it('every entry points at a real section', () => {
    for (const note of NOTES) expect(SECTION_IDS).toContain(note.target.section)
  })
  it('entry ids are unique', () => {
    expect(new Set(NOTES.map((n) => n.id)).size).toBe(NOTES.length)
  })
  it('every entry says what was found, why it matters and what changed', () => {
    for (const note of NOTES) {
      expect(note.found.trim(), note.id).not.toBe('')
      expect(note.why.trim(), note.id).not.toBe('')
      expect(note.changed.trim(), note.id).not.toBe('')
    }
  })
  it('covers the fourteen verified findings', () => {
    expect(NOTES.map((n) => n.id)).toEqual(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'T1', 'T2', 'T3', 'T4', 'T5', 'L1', 'L2', 'L3'])
  })
  it('faq targets point at an existing question', () => {
    for (const note of NOTES) if (note.target.faqIndex !== undefined) expect(faq[note.target.faqIndex]).toBeDefined()
  })
})

describe('demo data', () => {
  it('never reuses names from testimonials or their own demo feeds', () => {
    for (const name of DEMO_NAMES) {
      const first = name.split(' ')[0]
      expect(BANNED_DEMO_NAMES, name).not.toContain(first)
    }
  })
})

describe('site content', () => {
  it('keeps all eight FAQ answers', () => {
    expect(faq).toHaveLength(8)
  })
  it('lists the five systems the heading promises', () => {
    expect(features.items).toHaveLength(5)
    expect(features.title).toMatch(/five systems/)
  })
  it('shows all three plans with their real prices', () => {
    expect(plans.map((p) => [p.name, p.price, p.was])).toEqual([
      ['Standard', 19, 39],
      ['Pro', 39, 59],
      ['Team', 99, null],
    ])
  })
  it('integration counts match their labels and skip Chrome', () => {
    expect(integrations.live).toHaveLength(2)
    expect(integrations.coming).toHaveLength(16)
    expect(integrations.coming).not.toContain('Chrome')
  })
})
