// usage: node tools/shot.cjs <url> <outPrefix> [selector] [full]
const { chromium, devices } = require('@playwright/test')
const [url, out, sel, full] = process.argv.slice(2)
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
    await page.goto(url, { waitUntil: 'load', timeout: 30000 })
    await page.waitForTimeout(1500)
    if (sel && sel !== '-') {
      const el = page.locator(sel).first()
      await el.scrollIntoViewIfNeeded()
      await page.waitForTimeout(2200)
      await el.screenshot({ path: `${out}-${name}.png` })
    } else {
      await page.screenshot({ path: `${out}-${name}.png`, fullPage: full === 'full' })
    }
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    const ow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    console.log(name, 'height', h, 'overflowX', ow, 'errors', errors.length, errors.slice(0, 3).join(' | '))
    await page.close()
  }
  await browser.close()
})()
