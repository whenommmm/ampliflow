import { describe, expect, it } from 'vitest'
import { buildSignupUrl, isValidEmail, readRef } from './signup'

describe('buildSignupUrl', () => {
  it('passes the email to the real sign-up page', () => {
    expect(buildSignupUrl('a@b.co')).toBe('https://app.ampliflow.in/sign-up?email=a%40b.co')
  })
  it('carries the referral code when present', () => {
    expect(buildSignupUrl('a@b.co', 'abc123')).toBe('https://app.ampliflow.in/sign-up?email=a%40b.co&ref=abc123')
  })
  it('trims the email', () => {
    expect(buildSignupUrl('  a@b.co ')).toBe('https://app.ampliflow.in/sign-up?email=a%40b.co')
  })
})

describe('readRef', () => {
  it('accepts codes the live site accepts', () => {
    expect(readRef('?ref=abc_12-3')).toBe('abc_12-3')
  })
  it('rejects malformed codes', () => {
    expect(readRef('?ref=bad!')).toBeNull()
    expect(readRef('?ref=abc')).toBeNull()
    expect(readRef('')).toBeNull()
  })
})

describe('isValidEmail', () => {
  it('rejects junk', () => {
    expect(isValidEmail('x')).toBe(false)
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
  })
  it('accepts a normal work email with stray spaces', () => {
    expect(isValidEmail(' you@company.com ')).toBe(true)
  })
})
