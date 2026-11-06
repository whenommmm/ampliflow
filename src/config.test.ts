import { expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')

it('lets crawlers reach the page so they can read its noindex', () => {
  const robots = readFileSync(resolve(root, 'public/robots.txt'), 'utf8')
  expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m)
})

it('serves an X-Robots-Tag noindex header on Vercel', () => {
  const cfg = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'))
  const headers = cfg.headers.flatMap((h: { headers: { key: string; value: string }[] }) => h.headers)
  expect(headers).toContainEqual({ key: 'X-Robots-Tag', value: 'noindex, nofollow' })
})
