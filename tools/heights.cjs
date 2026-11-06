const { chromium, devices } = require('@playwright/test')
;(async () => {
  const b = await chromium.launch({ channel: 'chrome' })
  const p = await b.newPage({ ...devices['iPhone 13'], deviceScaleFactor: 1 })
  await p.goto(process.argv[2] || 'http://localhost:5173/', { waitUntil: 'load' })
  await p.waitForTimeout(800)
  const r = await p.evaluate(() => {
    const out = []
    for (const el of document.querySelectorAll('body > #root > *, main > section, footer')) {
      const tag = el.id || el.getAttribute('data-section') || el.tagName.toLowerCase()
      out.push([tag, Math.round(el.getBoundingClientRect().height)])
    }
    return { total: document.documentElement.scrollHeight, out }
  })
  console.log('total', r.total)
  for (const [k, v] of r.out) console.log(String(v).padStart(6), k)
  await b.close()
})()
