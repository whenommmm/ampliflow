import { expect, test } from '@playwright/test'
import { CHANGES } from '../src/content/changes'

test.beforeEach(async ({ context }) => {
  await context.route('https://app.ampliflow.in/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>stub</title>' }))
})

test('shows a before/after card for every change, plus the page-length card', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-change]')).toHaveCount(CHANGES.length + 1)
})

test('one switch hides every card, and the choice survives a reload', async ({ page }) => {
  await page.goto('/')
  const sw = page.getByRole('switch')
  await expect(sw).toHaveAttribute('aria-checked', 'true')
  await sw.click()
  await expect(page.locator('[data-change]')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  await expect(page.locator('[data-change]')).toHaveCount(0)
})

test('a before screenshot can be enlarged and closed with Escape', async ({ page }) => {
  await page.goto('/')
  const card = page.locator('[data-change="demo"]')
  await card.scrollIntoViewIfNeeded()
  await card.getByRole('button', { name: /enlarge the before screenshot/i }).click()
  const dialog = page.getByRole('dialog', { name: /before:/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('img')).toHaveJSProperty('complete', true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('a successful signup throws confetti', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('[data-form="hero"]')
  await form.getByLabel('Work email').fill('you@company.com')
  const popup = page.waitForEvent('popup')
  await form.getByRole('button', { name: 'Get 7 days free' }).click()
  await (await popup).close()
  await expect(page.getByTestId('confetti')).toBeAttached()
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no confetti, and every headline is readable immediately', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#safety h2')).toHaveText('Safety is the reason we exist.')
    const form = page.locator('[data-form="hero"]')
    await form.getByLabel('Work email').fill('you@company.com')
    const popup = page.waitForEvent('popup')
    await form.getByRole('button', { name: 'Get 7 days free' }).click()
    await (await popup).close()
    await expect(form.getByRole('status')).toBeVisible()
    await expect(page.getByTestId('confetti')).toHaveCount(0)
  })
})

test('on phones the floating notes button waits until you are past the hero', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/')
  const fab = page.getByRole('button', { name: /redesign notes · \d+/i })
  await expect(fab).toBeHidden()
  await page.locator('#safety').scrollIntoViewIfNeeded()
  await expect(fab).toBeVisible()
})
