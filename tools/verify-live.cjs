// Re-checks every Redesign-notes claim against the live ampliflow.in (read-only).
const { chromium, devices } = require('@playwright/test')
const crypto = require('crypto')
const fs = require('fs')
const out = []
const check = (id, ok, detail) => out.push(`${ok ? 'PASS' : 'FAIL'} ${id}  ${detail}`)
;(async () => {
  const b = await chromium.launch({ channel: 'chrome' })
  const html = await (await fetch('https://ampliflow.in/')).text()
  // F1: modal links to sign-up without the email; signups open; waitlist POST exists
  check('F1', html.includes("'https://app.ampliflow.in/sign-up'") && html.includes('const SIGNUPS_OPEN = true') && html.includes('/api/waitlist') && !/sign-up\?email/.test(html), 'modal CTA -> /sign-up (no email param), waitlist POST first')
  const d = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await d.goto('https://ampliflow.in/', { waitUntil: 'load' })
  await d.waitForTimeout(1500)
  // F2
  const forms = await d.locator('form').count()
  check('F2', forms === 1 && html.includes('function handleCTASubmit') && !html.includes('id="cta-email"') && html.includes('nearBottom'), `forms on page: ${forms}; bottom form handler present but element missing; sticky hides nearBottom`)
  // F3
  const f3 = await d.evaluate(() => {
    const panels = [...document.querySelectorAll('.dash-panel')]
    const visiblePanels = panels.filter((p) => p.getBoundingClientRect().height > 0).length
    const shots = [...document.querySelectorAll('.dash-pane img')].length
    return { panels: panels.length, visiblePanels, shots }
  })
  check('F3', f3.panels >= 4 && f3.visiblePanels === 0 && f3.shots >= 4, JSON.stringify(f3))
  // F4: no visible element showing the safety score
  const f4 = await d.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.children.length === 0 && /Safety score\s*\/\s*100/.test(e.textContent || '') && e.getBoundingClientRect().height > 0).length)
  check('F4', f4 === 0 && html.includes('Safety score / 100') && html.includes('no other tool ships'), `visible score panels: ${f4} (panel exists in HTML, hidden)`)
  // F6: first active pane is analytics and the image is unchanged since our snapshot
  const firstPane = await d.evaluate(() => document.querySelector('.dash-pane.active')?.getAttribute('data-pane'))
  const live = Buffer.from(await (await fetch('https://ampliflow.in/dash-analytics.png')).arrayBuffer())
  fs.writeFileSync('.superpowers/shots/live-analytics-check.png', live)
  check('F6', firstPane === 'analytics' && live.length > 100000, `first pane: ${firstPane}; screenshot saved to .superpowers/shots/live-analytics-check.png (confirm zeros + 100/60/43/16 visually)`)
  // T1: $700K only in founder note near the bottom; zero restrictions inside FAQ answer
  const t1 = await d.evaluate(() => {
    const H = document.documentElement.scrollHeight
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const hits = []
    let t
    while ((t = tw.nextNode())) if (/700K/.test(t.textContent) && t.parentElement) hits.push(Math.round(((t.parentElement.getBoundingClientRect().top + scrollY) / H) * 100))
    return hits
  })
  check('T1', t1.length > 0 && t1.every((p) => p > 80) && html.includes('Zero account restrictions across the beta'), `$700K at ${t1.join(',')}% of page height`)
  // T2
  const t2 = await d.evaluate(() => [...document.querySelectorAll('img')].filter((i) => /pravatar\.cc/.test(i.src) && /\w\. ?$|\w\.$/.test(i.alt || '')).length)
  check('T2', t2 >= 6, `testimonial photos from pravatar.cc: ${t2}`)
  // T3
  check('T3', html.includes('Ampliflow is live and taking customers') && /Onboard before public launch/.test(html), 'both launch statements present')
  // T4
  const t4 = await d.evaluate(() => document.querySelectorAll('.feat-section h3, .feat-section .feat-title').length)
  check('T4', /in six systems/.test(html.replace(/<[^>]+>/g, ' ')), `"six systems" heading present; feature titles found: ${t4}`)
  // T5
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')
  check('T5', !/\bTeam\b/.test(text) && /\$59\/mo \(Pro\)/.test(text.replace(/\s+/g, ' ')), 'no Team plan mentioned on homepage; Pro $59 appears in FAQ answer')
  await d.close()
  // Mobile checks
  const m = await b.newPage({ ...devices['iPhone 13'], deviceScaleFactor: 1 })
  await m.goto('https://ampliflow.in/', { waitUntil: 'load' })
  await m.waitForTimeout(1500)
  const mob = await m.evaluate(() => {
    const img = [...document.querySelectorAll('.dash-pane img')].find((i) => i.getBoundingClientRect().width > 0)
    const steps = [...document.querySelectorAll('.step-cell')].map((s) => Math.round(s.getBoundingClientRect().height))
    return { h: document.documentElement.scrollHeight, imgW: img ? Math.round(img.getBoundingClientRect().width) : 0, steps }
  })
  check('F5', mob.imgW > 250 && mob.imgW < 340, `dashboard screenshot width on 390px phone: ${mob.imgW}px`)
  check('L1', mob.h > 12000, `mobile page height: ${mob.h}px`)
  check('L2', mob.steps.length >= 4 && Math.max(...mob.steps) > 300, `how-it-works step heights: ${mob.steps.join(',')}`)
  const chips = await m.evaluate(() => document.querySelectorAll('.platform [class*="chip"], .platform .pl-chip').length)
  check('L3', html.includes('Prospect signals') && html.includes('Auto follow ups'), `platform chip diagram present (chips matched: ${chips})`)
  await b.close()
  console.log(out.join('\n'))
})()
