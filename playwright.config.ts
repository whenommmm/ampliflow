import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  workers: 2,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4173', channel: 'chrome', actionTimeout: 5_000 },
  webServer: { command: 'npm run build && npm run preview', url: 'http://localhost:4173', reuseExistingServer: true, timeout: 120_000 },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], channel: 'chrome', defaultBrowserType: 'chromium' } },
  ],
})
