export const SECTION_IDS = [
  'hero',
  'demo',
  'proof',
  'safety',
  'personas',
  'features',
  'how',
  'pricing',
  'testimonials',
  'integrations',
  'faq',
  'founder',
  'closing',
] as const

export type SectionId = (typeof SECTION_IDS)[number]
