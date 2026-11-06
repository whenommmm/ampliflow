import { expect, test } from '@playwright/test'
import { NOTES } from '../src/content/notes'

test.beforeEach(async ({ context }) => {
  await context.route('https://app.ampliflow.in/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>stub</title>' }))
})

for (const width of [360, 390, 640]) {
  test(`every demo tab fits inside the panel at ${width}px`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'viewport set explicitly')
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.locator('#demo').scrollIntoViewIfNeeded()
    for (const tab of ['workflow', 'inbox', 'analytics']) {
      await page.locator(`#demo-tab-${tab}`).click()
      await page.waitForTimeout(900)
      const overflow = await page.evaluate(() => {
        const panel = document.getElementById('demo-panel')!
        const bottom = panel.getBoundingClientRect().bottom
        let max = 0
        panel.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.height > 0) max = Math.max(max, r.bottom - bottom)
        })
        return Math.round(max)
      })
      expect(overflow, `${tab} overflows by ${overflow}px`).toBeLessThanOrEqual(1)
    }
  })
}

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('Show me still draws a visible highlight', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open redesign notes', exact: true }).click()
    const f1 = NOTES.find((n) => n.id === 'F1')!
    await page.getByRole('article').filter({ hasText: f1.title }).getByRole('button', { name: /show me/i }).click()
    await page.waitForTimeout(400)
    const shadow = await page.locator('#hero [data-note-anchor]').evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).toContain('rgb(47, 55, 217)')
  })
})

test('calls to action still work after someone signs up in the hero', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('[data-form="hero"]')
  await form.getByLabel('Work email').fill('you@company.com')
  const popup = page.waitForEvent('popup')
  await form.getByRole('button', { name: 'Get 7 days free' }).click()
  await (await popup).close()
  await page.locator('#pricing').scrollIntoViewIfNeeded()
  await page.getByRole('region', { name: 'Start a free trial' }).getByRole('button', { name: 'Claim spot' }).click()
  await expect(page.locator('#hero')).toBeInViewport({ ratio: 0.3 })
})

test('the footer does not speak as Ampliflow', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer).not.toContainText('All rights reserved')
  await expect(footer).not.toContainText('All systems operational')
  await expect(footer).toContainText('unofficial concept')
})

test('the notes button says "Concept" on every screen size', async ({ page }) => {
  await page.goto('/')
  await page.locator('#safety').scrollIntoViewIfNeeded()
  await expect(page.getByRole('button', { name: /redesign notes · \d+/i })).toContainText(/concept/i)
})
