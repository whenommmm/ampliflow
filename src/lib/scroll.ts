export function focusHeroForm() {
  const input = document.querySelector<HTMLInputElement>('[data-form="hero"] input[type="email"]')
  const hero = document.getElementById('hero')
  if (!input || !hero) return
  hero.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  window.setTimeout(() => input.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 450)
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
