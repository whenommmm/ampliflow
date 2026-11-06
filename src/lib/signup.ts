export const SIGNUP_URL = 'https://app.ampliflow.in/sign-up'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const REF_RE = /^[A-Za-z0-9_-]{6,12}$/

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

export function readRef(search: string): string | null {
  const ref = new URLSearchParams(search).get('ref')
  return ref && REF_RE.test(ref) ? ref : null
}

export function buildSignupUrl(email: string, ref?: string | null): string {
  const params = new URLSearchParams({ email: email.trim() })
  if (ref) params.set('ref', ref)
  return `${SIGNUP_URL}?${params.toString()}`
}
