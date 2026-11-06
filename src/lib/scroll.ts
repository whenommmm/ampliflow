export function focusHeroForm() {
  const hero = document.getElementById('hero')
  if (!hero) return
  // After a signup the hero shows its success state, so fall back to its first link/button.
  const target =
    document.querySelector<HTMLElement>('[data-form="hero"] input[type="email"]') ??
    document.querySelector<HTMLElement>('[data-form="hero"] a, [data-form="hero"] button')
  hero.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  window.setTimeout(() => target?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 450)
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}
