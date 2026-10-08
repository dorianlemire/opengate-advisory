import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:8091';
const routes = ['/', '/about', '/technology', '/real-estate', '/web-design', '/market-entry-consulting', '/fractional-sales-leadership', '/channel-partner-development', '/technology-commercialisation', '/privacy-policy', '/thank-you', '/404'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ reducedMotion: 'reduce', colorScheme: 'dark' });
const page = await context.newPage();
const failures = [];
const pageErrors = [];
const titles = new Set();
page.on('pageerror', error => pageErrors.push(error.message));
await mkdir('test-results', { recursive: true });
await page.goto(base);
await page.evaluate(() => document.fonts.ready);
assert.equal(await page.locator('html').getAttribute('data-theme'), 'light', 'First visit defaults to light even on a dark OS');
await page.getByRole('button', { name: 'Switch to dark mode', exact: true }).click();
await page.goto(base + '/about');
assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark', 'Theme persists across routes');
await page.reload();
assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark', 'Theme persists across reloads');
await page.getByRole('button', { name: 'Switch to light mode', exact: true }).click();

for (const theme of ['light','dark']) {
  await page.evaluate(theme => localStorage.setItem('opengate-theme', theme), theme);
  for (const width of [360, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    for (const route of routes) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route + ' responds');
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => ({
        viewport: innerWidth,
        width: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        header: document.querySelectorAll('.site-header').length,
        footer: document.querySelectorAll('.site-footer').length,
        theme: document.documentElement.dataset.theme,
        broken: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
        overflow: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).position !== 'absolute').map(el => el.className).slice(0,5)
      }));
      if (metrics.width > width + 1 || metrics.h1 !== 1 || metrics.header !== 1 || metrics.footer !== 1 || metrics.broken.length || metrics.theme !== theme) failures.push({ route, theme, width, ...metrics });
      if (theme === 'light' && width === 1440) {
        const title = await page.title();
        assert(!titles.has(title), 'Unique title: ' + title); titles.add(title);
        await page.screenshot({ path: 'test-results/' + (route === '/' ? 'home' : route.slice(1)) + '-desktop.png', fullPage: true });
      }
      if (route === '/' && [360,1440].includes(width)) await page.screenshot({ path: 'test-results/home-' + width + '-' + theme + '.png', fullPage: true });
    }
  }
  console.log('Completed ' + theme + ' layout checks across all 12 routes at four widths.');
}

await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.locator('button[aria-controls="portfolio-menu"]').hover();
await page.locator('#portfolio-menu a').first().hover();
assert.equal(await page.locator('button[aria-controls="portfolio-menu"]').getAttribute('aria-expanded'), 'true', 'Dropdown stays open between trigger and item');
await page.keyboard.press('Escape');
assert.equal(await page.locator('button[aria-controls="portfolio-menu"]').getAttribute('aria-expanded'), 'false');
await page.locator('button[aria-controls="services-menu"]').focus();
await page.keyboard.press('ArrowDown');
assert.equal(await page.locator('#services-menu a').first().evaluate(el => el === document.activeElement), true);
await page.keyboard.press('Escape');

await page.setViewportSize({ width:390, height:844 });
await page.goto(base);
await page.getByRole('button', {name:'Open menu',exact:true}).click();
await page.locator('button[aria-controls="portfolio-menu"]').click();
await page.locator('#portfolio-menu a[href="/technology"]').click();
assert.equal(new URL(page.url()).pathname, '/technology');
assert.equal(await page.locator('body').evaluate(el => el.classList.contains('menu-open')), false);
await page.getByRole('button', {name:'Open menu',exact:true}).click();
await page.keyboard.press('Escape');
assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'false');

await page.goto(base + '/technology');
await page.getByRole('tab', { name:'Meeting rooms',exact:true }).click();
assert(await page.locator('#panel-rooms').isVisible());
assert(!(await page.locator('#panel-estate').isVisible()));
await page.keyboard.press('ArrowRight');
assert(await page.locator('#panel-decisions').isVisible());
await page.keyboard.press('Home');
assert(await page.locator('#panel-estate').isVisible());

await page.goto(base + '/real-estate');
await page.getByRole('slider').fill('75');
assert.equal(await page.getByRole('slider').getAttribute('aria-valuetext'), '25 percent of the vision revealed');
await page.route('https://www.openstreetmap.org/**', r => r.fulfill({ status:200, contentType:'text/html', body:'<p>Map test response</p>' }));
await page.getByRole('button',{name:'View interactive map'}).click();
assert.equal(await page.locator('iframe.live-map').count(), 1, 'Map loads on request');

await page.goto(base);
await page.locator('.faq-item summary').first().click();
assert(await page.locator('.faq-item').first().evaluate(el => el.open));
await page.locator('#services').scrollIntoViewIfNeeded();
await page.waitForFunction(() => !document.querySelector('.sticky-mobile-cta').hidden);
await page.locator('#contact').scrollIntoViewIfNeeded();
await page.waitForFunction(() => document.querySelector('.sticky-mobile-cta').hidden);

const localUrls = new Set();
for (const route of routes) {
  await page.goto(base + route);
  const urls = await page.evaluate(() => [...document.querySelectorAll('a[href],img[src],script[src],link[href]')].map(el => el.href || el.src).filter(Boolean));
  for (const raw of urls) { const u = new URL(raw); if (u.origin === locationOrigin(base)) { u.hash=''; localUrls.add(u.href); } }
  for (const schema of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(schema);
}
function locationOrigin(url) { return new URL(url).origin; }
for (const url of localUrls) {
  const response = await context.request.get(url);
  if (response.status() !== 200) failures.push({ brokenLink:url, status:response.status() });
}
assert.equal((await context.request.get(base + '/this-page-does-not-exist')).status(), 404);
assert.equal((await context.request.get(base + '/ARCHIVE/private-discuss/private-discuss.html')).status(), 404);

const motion = await browser.newContext({ viewport:{width:1440,height:1000}, reducedMotion:'no-preference' });
const animated = await motion.newPage();
await animated.goto(base);
await animated.locator('#services').scrollIntoViewIfNeeded();
await animated.waitForFunction(() => [...document.querySelectorAll('.service-card')].some(el => getComputedStyle(el).opacity === '1'));
await animated.screenshot({path:'test-results/motion-services.png'});
await motion.close();

for (const width of [320,390,1024]) {
  await page.setViewportSize({width,height:844}); await page.goto(base);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Extra homepage width ' + width);
}
const report = { layouts:96, uniqueTitles:titles.size, localLinks:localUrls.size, pageErrors, failures, interactions:'theme persistence, dropdown hover/keyboard, mobile navigation, tabs, comparison slider, map loading, FAQ, sticky CTA, motion, 404 status' };
await writeFile('test-results/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
await browser.close();
assert.equal(pageErrors.length,0,'No JavaScript errors');
assert.equal(failures.length,0,'No layout or link failures');
