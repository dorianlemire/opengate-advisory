import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = 'http://127.0.0.1:8091';
const routes = ['/', '/about', '/technology', '/private-discuss', '/web-design', '/market-entry-consulting', '/fractional-sales-leadership', '/ai-development', '/privacy-policy', '/thank-you', '/404'];
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

await page.goto(base + '/#team');
const dorian = page.locator('.person').filter({has:page.getByRole('heading',{name:'Dorian Lemire',exact:true})});
assert.equal(await dorian.locator('.role').innerText(),'AI Developer');
assert.match(await dorian.locator('p').innerText(),/SaaS and technology/);
assert.match(await dorian.locator('p').innerText(),/motion design/);
assert.equal(await page.locator('.person').count(),2,'Team contains Georges and Dorian');
assert.equal(await page.getByText('Charles Boschetti').count(),0);
assert.equal(await page.locator('#services .service-card').count(),3,'Three core service offerings');
assert.equal(await page.locator('#services-menu>a').count(),3);
assert.equal(await page.locator('header a[href="/real-estate"],footer a[href="/real-estate"]').count(),0);
const portraits=page.locator('.georges-portrait img,.dorian-portrait img');
assert.equal(await portraits.count(),2);
for(const image of await portraits.all()) {
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(el=>el.decode());
  assert(await image.evaluate(el=>el.naturalWidth>0));
}
await page.setViewportSize({width:1440,height:1000});
await page.locator('#team').scrollIntoViewIfNeeded();
await page.screenshot({path:'test-results/team-updated-desktop.png'});
await page.setViewportSize({width:390,height:844});
await dorian.scrollIntoViewIfNeeded();
await page.screenshot({path:'test-results/team-updated-mobile.png'});

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
        broken: [...document.images].filter(i => i.loading !== 'lazy' && (!i.complete || !i.naturalWidth)).map(i => i.src),
        overflow: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).position !== 'absolute').map(el => el.className).slice(0,5)
      }));
      if (metrics.width > width + 1 || metrics.h1 !== 1 || metrics.header !== 1 || metrics.footer !== 1 || metrics.broken.length || metrics.theme !== theme) failures.push({ route, theme, width, ...metrics });
      if (theme === 'light' && width === 1440) {
        const title = await page.title();
        assert(!titles.has(title), 'Unique title: ' + title); titles.add(title);
        await page.screenshot({ path: 'test-results/' + (route === '/' ? 'home' : route.slice(1)) + '-desktop.png', fullPage: true });
        if (route === '/' || route === '/technology') await page.screenshot({ path: 'test-results/' + (route === '/' ? 'home' : 'morbit') + '-motion-hero.png' });
      }
      if (route === '/' && [360,1440].includes(width)) await page.screenshot({ path: 'test-results/home-' + width + '-' + theme + '.png', fullPage: true });
    }
  }
  console.log('Completed ' + theme + ' layout checks across all ' + routes.length + ' routes at four widths.');
}

await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.locator('button[aria-controls="services-menu"]').hover();
await page.locator('#services-menu a').first().hover();
assert.equal(await page.locator('button[aria-controls="services-menu"]').getAttribute('aria-expanded'), 'true', 'Dropdown stays open between trigger and item');
await page.keyboard.press('Escape');
assert.equal(await page.locator('button[aria-controls="services-menu"]').getAttribute('aria-expanded'), 'false');
await page.locator('button[aria-controls="services-menu"]').focus();
await page.keyboard.press('ArrowDown');
assert.equal(await page.locator('#services-menu a').first().evaluate(el => el === document.activeElement), true);
await page.keyboard.press('Escape');

await page.setViewportSize({ width:390, height:844 });
await page.goto(base);
await page.getByRole('button', {name:'Open menu',exact:true}).click();
await page.locator('button[aria-controls="technologies-menu"]').click();
await page.locator('#technologies-menu a[href="/technology"]').click();
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
await page.locator('[data-estate="communications"]').click();
assert.equal(await page.locator('.estate-scene').getAttribute('data-active'), 'communications');
assert.match(await page.locator('.estate-detail-heading').innerText(),/communications/);
assert.equal(await page.locator('[data-estate="communications"]').getAttribute('aria-pressed'), 'true');
await page.keyboard.press('ArrowRight');
assert.equal(await page.locator('.estate-scene').getAttribute('data-active'), 'spaces');
await page.getByRole('tab', {name:'Meeting rooms',exact:true}).click();
await page.getByRole('button', {name:'Occupancy',exact:true}).click();
assert.equal(await page.locator('.rooms-scene').getAttribute('data-room-view'), 'occupancy');
assert.match(await page.locator('.room-context').innerText(), /booked time/);
await page.getByRole('button', {name:'Environment',exact:true}).click();
assert.equal(await page.locator('.rooms-scene').getAttribute('data-room-view'), 'environment');
await page.getByRole('tab', {name:'Building sensors',exact:true}).click();
assert(await page.locator('#panel-sensors').isVisible());
await page.getByRole('button', {name:'Comfort',exact:true}).click();
assert.match(await page.locator('.sensor-context').innerText(), /Temperature and humidity/);
await page.keyboard.press('ArrowRight');
assert.equal(await page.locator('.sensor-scene').getAttribute('data-sensor'), 'presence');
await page.getByRole('link', {name:'Device health',exact:true}).click();
assert(await page.locator('#panel-estate').isVisible());
await page.locator('.morbit-screen-image').click();
assert(await page.getByRole('dialog').isVisible());
await page.keyboard.press('Escape');
assert(await page.locator('.morbit-screen-image').evaluate(el => el === document.activeElement));
assert.equal(await page.locator('.morbit-product-stage').evaluate(el => getComputedStyle(el).transform), 'none', 'Reduced-motion product stage is static');
for (const tab of ['Estate visibility','Meeting rooms','Better decisions','Building sensors']) {
  await page.setViewportSize({width:1440,height:1000});
  await page.getByRole('tab', {name:tab,exact:true}).click();
  await page.locator('.morbit-tabs').scrollIntoViewIfNeeded();
  await page.screenshot({path:'test-results/morbit-' + tab.toLowerCase().replaceAll(' ','-') + '.png'});
}
await page.setViewportSize({width:390,height:844});

await page.goto(base + '/private-discuss');
await page.getByRole('tab', {name:'Messaging',exact:true}).click();
assert(await page.locator('#pd-messaging').isVisible());
await page.keyboard.press('ArrowRight');
assert(await page.locator('#pd-ai').isVisible());
await page.keyboard.press('End');
assert(await page.locator('#pd-admin').isVisible());
await page.keyboard.press('Home');
assert(await page.locator('#pd-meetings').isVisible());
await page.getByRole('tab', {name:'Managed SaaS',exact:true}).click();
assert(await page.locator('#host-saas').isVisible());
assert(!(await page.locator('#host-premise').isVisible()));
await page.keyboard.press('Home');
assert(await page.locator('#host-premise').isVisible());
await page.locator('[data-select-tab="pd-tab-messaging"]').click();
assert(await page.locator('#pd-messaging').isVisible());
const enlarge = page.locator('#pd-messaging [data-image-zoom]');
await enlarge.click();
assert(await page.getByRole('dialog').isVisible());
await page.keyboard.press('Escape');
assert(!(await page.getByRole('dialog').isVisible()));
assert(await enlarge.evaluate(el => el === document.activeElement), 'Zoom returns keyboard focus');
await page.locator('.pd-scenario').nth(1).locator('summary').click();
await page.waitForFunction(() => document.querySelectorAll('.pd-scenario[open]').length === 1);

await page.goto(base + '/about');
await page.locator('#event-tab-2').click();
assert(await page.locator('#event-photo-2').isVisible());
await page.locator('#event-photo-2 [data-image-zoom]').click();
assert(await page.getByRole('dialog').isVisible());
await page.getByRole('button',{name:'Close image',exact:true}).click();
assert(!(await page.getByRole('dialog').isVisible()));

await page.goto(base + '/web-design');
const portfolio = [
  ['Nocturne Restaurant', 'https://restaurant-nocturne-mock.vercel.app/'],
  ['Nail Saloon', 'https://nail-saloon-ten.vercel.app/'],
  ['District Barbers', 'https://district-barbers.vercel.app/'],
  ['Trim Street Dubai', 'https://barber-v2-kappa.vercel.app/'],
];
assert.equal(await page.locator('.work-card').count(), portfolio.length);
assert.equal(await page.locator('#work [data-image-slot]').count(), 0, 'No blank portfolio image slots');
for (const [name, url] of portfolio) {
  const card = page.locator('.work-card').filter({has:page.getByRole('heading',{name,exact:true})});
  assert.equal(await card.getAttribute('href'), url);
  assert.equal(await card.getAttribute('target'), '_blank');
  assert.match(await card.getAttribute('rel'), /noopener/);
  const image = card.locator('img');
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(el => el.decode());
  assert(await image.evaluate(el => el.naturalWidth > 0 && Math.abs(el.naturalWidth/el.naturalHeight-1.6)<.01),'Responsive preview decodes with the intended proportions');
  assert(await image.getAttribute('alt'));
  await card.focus();
  assert(await card.evaluate(el => el === document.activeElement), 'Portfolio link is keyboard accessible');
  // Test the actual click/new-tab behavior without loading third-party trackers in the test.
  await context.route(url, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Portfolio destination</title>' }));
  const popupPromise = context.waitForEvent('page');
  await page.keyboard.press('Enter');
  const popup = await popupPromise;
  await popup.waitForLoadState();
  assert.equal(popup.url(), url);
  await popup.close();
  await context.unroute(url);
}
for (const theme of ['light', 'dark']) {
  await page.evaluate(theme => localStorage.setItem('opengate-theme', theme), theme);
  await page.reload();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.locator('#work').screenshot({ path: `test-results/portfolio-${theme}-${width}.png` });
  }
}
await page.setViewportSize({ width: 390, height: 844 });

await page.goto(base + '/ai-development');
await page.getByRole('tab',{name:'Websites',exact:true}).click();
assert(await page.locator('#ai-websites').isVisible());
await page.keyboard.press('ArrowRight');
assert(await page.locator('#ai-content').isVisible());
await page.keyboard.press('Home');
assert(await page.locator('#ai-workflows').isVisible());
await page.goto(base+'/web-design');
const film=page.locator('#motion-work video');
assert.equal(await film.getAttribute('preload'),'none');
assert(await film.evaluate(el=>!el.autoplay));
await film.scrollIntoViewIfNeeded();
await film.evaluate(async el=>{el.muted=true;await el.play();});
await page.waitForFunction(()=>document.querySelector('#motion-work video').currentTime>0);
await film.evaluate(el=>el.pause());
assert.equal(await film.locator('track[kind="captions"]').count(),1);

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
for(const path of ['/CLAUDE.md','/README.md','/package.json','/docs/MOTION_REFINEMENT.md','/partials/header.html','/scripts/preview.mjs','/source-assets/morbit-dashboard-original.png','/.git/config','/.env']) {
  assert.equal((await context.request.get(base+path)).status(),404,'Non-public path: '+path);
}
const deployment=JSON.parse(await readFile('vercel.json','utf8'));
for(const redirect of deployment.redirects) {
  const response=await context.request.get(base+redirect.source,{maxRedirects:0});
  assert.equal(response.status(),redirect.permanent===false?307:308,'Configured redirect: '+redirect.source);
  assert.equal(response.headers().location,redirect.destination);
  assert.equal((await context.request.get(base+redirect.destination)).status(),200);
}

const motion = await browser.newContext({ viewport:{width:1440,height:1000}, reducedMotion:'no-preference' });
const animated = await motion.newPage();
await animated.goto(base);
await animated.locator('#services').scrollIntoViewIfNeeded();
await animated.waitForFunction(() => [...document.querySelectorAll('.service-card')].some(el => getComputedStyle(el).opacity === '1'));
await animated.screenshot({path:'test-results/motion-services.png'});
await animated.goto(base + '/technology');
await animated.locator('.morbit-product-stage').scrollIntoViewIfNeeded();
assert(await animated.locator('.morbit-product-stage').isVisible());
await animated.getByRole('tab',{name:'Meeting rooms',exact:true}).click();
await animated.locator('.room-model').scrollIntoViewIfNeeded();
await animated.emulateMedia({reducedMotion:'reduce'});
await animated.waitForFunction(() => getComputedStyle(document.querySelector('.morbit-product-stage')).transform === 'none');
assert(await animated.locator('#panel-rooms').isVisible(), 'Content remains usable after reduced-motion preference changes');
await motion.close();

for (const width of [320,390,1024]) {
  await page.setViewportSize({width,height:844}); await page.goto(base);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Extra homepage width ' + width);
}
const report = { layouts:routes.length * 8, uniqueTitles:titles.size, localLinks:localUrls.size, pageErrors, failures, interactions:'theme persistence, dropdown hover/keyboard, mobile navigation, three services and two team members, responsive portfolio images and new-tab links, video playback/captions, AI capability tabs, Morbit/Private Discuss/gallery tabs, Morbit system/room/sensor selectors, hosting comparison, product shortcuts, native dialog/focus restoration, scenario accordion, FAQ, sticky CTA, motion and reduced-motion preference changes, redirects and 404 status' };
await writeFile('test-results/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
await browser.close();
assert.equal(pageErrors.length,0,'No JavaScript errors');
assert.equal(failures.length,0,'No layout or link failures');
