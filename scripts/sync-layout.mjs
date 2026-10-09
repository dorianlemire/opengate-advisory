import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const pages = ['index','about','technology','private-discuss','real-estate','web-design','market-entry-consulting','fractional-sales-leadership','channel-partner-development','technology-commercialisation','privacy-policy','thank-you','404'];
const header = (await readFile(resolve(root, 'partials/header.html'), 'utf8')).trim();
const footer = (await readFile(resolve(root, 'partials/footer.html'), 'utf8')).trim();
for (const page of pages) {
  const file = resolve(root, 'public', page + '.html');
  const original = await readFile(file, 'utf8');
  let updated = original
    .replace(/<div data-site-header>[\s\S]*?<\/header><\/div>/, '<div data-site-header>' + header + '</div>')
    .replace(/<div data-site-footer>[\s\S]*?<\/footer><\/div>/, '<div data-site-footer>' + footer + '</div>');
  if (!updated.includes('href="/assets/css/motion.css"')) updated = updated.replace('</head>', '  <link rel="stylesheet" href="/assets/css/motion.css">\n</head>');
  if (!updated.includes('src="/assets/js/motion.js"')) updated = updated.replace('</body>', '<script src="/assets/js/motion.js" defer></script>\n</body>');
  if (page === 'technology') {
    updated = updated.replace(/<script src="\/assets\/vendor\/(gsap|ScrollTrigger)\.min\.js" defer><\/script>\n?/g, '');
    const main = (await readFile(resolve(root, 'partials/morbit-main.html'), 'utf8')).trim();
    updated = updated.replace(/<main id="main">[\s\S]*?<\/main>/, main);
    if (!updated.includes('href="/assets/css/morbit.css"')) updated = updated.replace('</head>', '  <link rel="stylesheet" href="/assets/css/morbit.css">\n</head>');
    if (!updated.includes('src="/assets/js/showcase.js"')) updated = updated.replace('<script src="/assets/js/motion.js"', '<script src="/assets/js/showcase.js" defer></script>\n<script src="/assets/js/motion.js"');
    if (!updated.includes('src="/assets/js/morbit.js"')) updated = updated.replace('<script src="/assets/js/motion.js"', '<script src="/assets/js/morbit.js" defer></script>\n<script src="/assets/js/motion.js"');
  }
  if (page === 'index' && !updated.includes('class="hero-sculpture"')) {
    updated = updated.replace('<section class="home-hero">', '<section class="home-hero"><div class="hero-sculpture" aria-hidden="true"><div class="gate-object"><span></span><span></span><span></span></div><div class="gate-object gate-object--small"><span></span><span></span><span></span></div></div>');
  }
  if (original !== updated) await writeFile(file, updated);
}
console.log(`Shared header and footer are synced across all ${pages.length} public pages.`);
