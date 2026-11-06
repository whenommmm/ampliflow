import { describe, expect, it } from 'vitest'
import { funnelRates } from './funnel'

describe('funnelRates', () => {
  it('derives every rate from the counts it is given', () => {
    expect(funnelRates({ leads: 1000, sent: 560, accepted: 267, messaged: 180, replied: 68 })).toEqual({
      sentOfLeads: 56,
      acceptRate: 48,
      replyRate: 38,
      overall: 7,
    })
  })
  it('never divides by zero', () => {
    expect(funnelRates({ leads: 0, sent: 0, accepted: 0, messaged: 0, replied: 0 })).toEqual({
      sentOfLeads: 0,
      acceptRate: 0,
      replyRate: 0,
      overall: 0,
    })
  })
})
