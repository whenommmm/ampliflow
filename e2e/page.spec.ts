import { expect, test } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  // Never hit Ampliflow's real app from tests.
  await context.route('https://app.ampliflow.in/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>sign-up stub</title>' }))
})

test('loads without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto('/')
  await page.mouse.wheel(0, 20000)
  await page.waitForTimeout(1500)
  expect(errors).toEqual([])
})

test('says up front that it is an unofficial concept, and is not indexed', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Unofficial redesign concept by Vansh Srivastava · not affiliated with Ampliflow').first()).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})

test('no sideways scrolling on a 360px phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/')
  await page.waitForTimeout(800)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBe(0)
})

test('mobile page stays well under the live page height (13,019px)', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/')
  await page.waitForTimeout(800)
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  console.log('mobile height', h)
  expect(h).toBeLessThanOrEqual(9000)
})

test('invalid email is caught in the browser', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('[data-form="hero"]')
  await form.getByLabel('Work email').fill('nope')
  await form.getByRole('button', { name: 'Get 7 days free' }).click()
  await expect(form.getByRole('alert')).toHaveText('Please enter a valid work email.')
})

test('a valid email opens sign-up with the email attached', async ({ page }) => {
  await page.goto('/')
  const form = page.locator('[data-form="hero"]')
  await form.getByLabel('Work email').fill('you@company.com')
  const popupPromise = page.waitForEvent('popup')
  await form.getByRole('button', { name: 'Get 7 days free' }).click()
  const popup = await popupPromise
  expect(popup.url()).toBe('https://app.ampliflow.in/sign-up?email=you%40company.com')
  await expect(form.getByRole('status')).toContainText('Sign-up opened in a new tab.')
})

test('the sticky CTA steps aside when the closing form is on screen', async ({ page }) => {
  await page.goto('/')
  await page.locator('#safety').scrollIntoViewIfNeeded()
  await expect(page.getByRole('region', { name: 'Start a free trial' })).toBeVisible()
  await page.locator('[data-form="closing"]').scrollIntoViewIfNeeded()
  await expect(page.getByRole('region', { name: 'Start a free trial' })).toBeHidden()
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('shows final values and does not auto-advance the demo', async ({ page }) => {
    await page.goto('/')
    await page.locator('#safety').scrollIntoViewIfNeeded()
    await expect(page.getByTestId('safety-score')).toHaveText('98')
    await page.locator('#demo').scrollIntoViewIfNeeded()
    await expect(page.locator('#demo-tab-workflow')).toHaveAttribute('aria-selected', 'true')
    await page.waitForTimeout(10_000)
    await expect(page.locator('#demo-tab-workflow')).toHaveAttribute('aria-selected', 'true')
  })
})

test('demo auto-advances, and holds while hovered', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover is desktop-only')
  await page.goto('/')
  await page.locator('#demo').scrollIntoViewIfNeeded()
  await page.mouse.move(2, 2)
  await expect(page.locator('#demo-tab-inbox')).toHaveAttribute('aria-selected', 'true', { timeout: 11_000 })
  await page.locator('#demo-panel').hover()
  await page.waitForTimeout(10_000)
  await expect(page.locator('#demo-tab-inbox')).toHaveAttribute('aria-selected', 'true')
})
