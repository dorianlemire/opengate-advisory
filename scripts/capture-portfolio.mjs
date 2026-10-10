import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Capture the public showcase sites, not a signed-in browser session.
// Re-run after changing one of these sites, then visually review each capture.
const projects = [
  ['nocturne-restaurant', 'https://restaurant-nocturne-mock.vercel.app/'],
  ['nail-saloon', 'https://nail-saloon-ten.vercel.app/'],
  ['district-barbers', 'https://district-barbers.vercel.app/'],
  ['trim-street-dubai', 'https://barber-v2-kappa.vercel.app/'],
];
const output = fileURLToPath(new URL('../public/assets/work/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [name, url] of projects) {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 750 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      colorScheme: 'light',
    });
    try {
      const page = await context.newPage();
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      assert(response?.ok(), `${name}: HTTP ${response?.status()}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].filter(image => {
          const bounds = image.getBoundingClientRect();
          return bounds.top < innerHeight && bounds.bottom > 0;
        }).map(image => image.decode().catch(() => {})));
      });
      // Allow the sites' own intro/reveal timelines to settle before capture.
      await page.waitForTimeout(4000);
      assert(!/404|not found|deployment.*unavailable/i.test(await page.title()), `${name}: unavailable page`);
      await page.screenshot({ path: `${output}${name}.jpg`, type: 'jpeg', quality: 85, animations: 'disabled' });
      console.log(JSON.stringify({ name, url: page.url(), title: await page.title(), status: response.status() }));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await import('./optimize-portfolio.mjs');
