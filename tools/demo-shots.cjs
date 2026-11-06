const { chromium, devices } = require('@playwright/test')
;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  for (const [name, opts] of [
    ['desk', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['mob', { ...devices['iPhone 13'], deviceScaleFactor: 1 }],
  ]) {
    const page = await browser.newPage(opts)
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto('http://localhost:5173/', { waitUntil: 'load' })
    const frame = page.locator('#demo')
    await frame.scrollIntoViewIfNeeded()
    for (const tab of ['Workflow', 'Smart Inbox', 'Analytics']) {
      await page.getByRole('tab', { name: tab }).click()
      await page.mouse.move(5, 5)
      await page.waitForTimeout(tab === 'Workflow' ? 5200 : 4500)
      await frame.screenshot({ path: `.superpowers/shots/t4-${name}-${tab.split(' ').pop().toLowerCase()}.png` })
    }
    console.log(name, 'errors', errors.length, errors.slice(0, 3).join(' | '))
    await page.close()
  }
  await browser.close()
})()
