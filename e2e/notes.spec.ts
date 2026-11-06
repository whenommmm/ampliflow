import { expect, test } from '@playwright/test'
import { NOTES } from '../src/content/notes'

const openNotes = (page: import('@playwright/test').Page) => page.getByRole('button', { name: 'Open redesign notes', exact: true }).click()

test.describe('Redesign notes corner', () => {
  test('opens from the corner button and lists every entry', async ({ page }) => {
    await page.goto('/')
    await page.locator('#safety').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /redesign notes · \d+/i }).click()
    const panel = page.getByRole('dialog', { name: /redesign notes/i })
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('article')).toHaveCount(NOTES.length)
    await expect(panel).toContainText('Unofficial redesign concept by Vansh Srivastava')
  })

  test('Escape closes the panel', async ({ page }) => {
    await page.goto('/')
    await openNotes(page)
    await expect(page.getByRole('dialog', { name: /redesign notes/i })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: /redesign notes/i })).toBeHidden()
  })

  for (const note of NOTES) {
    test(`Show me ${note.id} lands on its section`, async ({ page }) => {
      await page.goto('/')
      await openNotes(page)
      const entry = page.getByRole('article').filter({ hasText: note.title })
      await entry.getByRole('button', { name: /show me/i }).click()
      await expect(page.getByRole('dialog', { name: /redesign notes/i })).toBeHidden()
      await expect(page.locator(`#${note.target.section}`)).toBeInViewport({ ratio: 0.1 })
      if (note.target.demoTab) {
        await expect(page.locator(`#demo-tab-${note.target.demoTab}`)).toHaveAttribute('aria-selected', 'true')
      }
      if (note.target.faqIndex !== undefined) {
        await expect(page.locator(`[data-faq-index="${note.target.faqIndex}"] button[aria-expanded]`)).toHaveAttribute('aria-expanded', 'true')
      }
    })
  }

  test('renders as a bottom sheet on phones', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only')
    await page.goto('/')
    await openNotes(page)
    const box = await page.getByRole('dialog', { name: /redesign notes/i }).boundingBox()
    const vp = page.viewportSize()!
    expect(box!.width).toBeGreaterThanOrEqual(vp.width - 2)
    expect(Math.round(box!.y + box!.height)).toBeGreaterThanOrEqual(vp.height - 2)
  })
})
