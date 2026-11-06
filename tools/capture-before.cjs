// Captures "before" shots of each live ampliflow.in section (read-only).
const { chromium, devices } = require('@playwright/test')
const SHOTS = [
  ['hero', '.hero', 560],
  ['showcase', '.showcase'],
  ['platform', '.platform'],
  ['features', '.feat-section'],
  ['founding', 'section[aria-label="Founding member offer"]'],
  ['how', '#how'],
  ['testimonials', '.tm-section'],
  ['faq', '#faq'],
  ['founder', '.founder-section'],
]
const absBox = (page, sel) =>
  page.locator(sel).first().evaluate((el) => {
    const r = el.getBoundingClientRect()
    return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height }
  })
async function warm(page) {
  const H = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < H; y += 400) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(90) }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(800)
  await page.addStyleTag({ content: 'nav,.sticky-cta{display:none!important}' })
}
;(async () => {
  const b = await chromium.launch({ channel: 'chrome' })
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.6667 })
  await p.goto('https://ampliflow.in/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await p.waitForTimeout(2500)
  await warm(p)
  for (const [name, sel, maxH] of SHOTS) {
    const box = await absBox(p, sel)
    const clip = { x: Math.max(0, box.x - 24), y: box.y, width: Math.min(1440, box.width + 48), height: Math.min(box.height, maxH || 1400) }
    await p.screenshot({ path: `public/before/${name}.jpg`, type: 'jpeg', quality: 72, fullPage: true, clip })
  }
  const m = await b.newPage({ ...devices['iPhone 13'], deviceScaleFactor: 2 })
  await m.goto('https://ampliflow.in/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await m.waitForTimeout(2500)
  await warm(m)
  const sc = await absBox(m, '.showcase')
  await m.screenshot({ path: 'public/before/showcase-mobile.jpg', type: 'jpeg', quality: 72, fullPage: true, clip: { x: 0, y: sc.y, width: 390, height: sc.height } })
  const pl = await absBox(m, '.platform')
  await m.screenshot({ path: 'public/before/platform-mobile.jpg', type: 'jpeg', quality: 70, fullPage: true, clip: { x: 0, y: pl.y, width: 390, height: Math.min(pl.height, 1300) } })
  const hw = await absBox(m, '#how')
  await m.screenshot({ path: 'public/before/how-mobile.jpg', type: 'jpeg', quality: 70, fullPage: true, clip: { x: 0, y: hw.y, width: 390, height: Math.min(hw.height, 1700) } })
  await b.close()
})()
