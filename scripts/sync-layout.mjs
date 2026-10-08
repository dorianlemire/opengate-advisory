import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const pages = ['index','about','technology','real-estate','web-design','market-entry-consulting','fractional-sales-leadership','channel-partner-development','technology-commercialisation','privacy-policy','thank-you','404'];
const header = (await readFile(resolve(root, 'partials/header.html'), 'utf8')).trim();
const footer = (await readFile(resolve(root, 'partials/footer.html'), 'utf8')).trim();
for (const page of pages) {
  const file = resolve(root, page + '.html');
  const original = await readFile(file, 'utf8');
  const updated = original
    .replace(/<div data-site-header>[\s\S]*?<\/header><\/div>/, '<div data-site-header>' + header + '</div>')
    .replace(/<div data-site-footer>[\s\S]*?<\/footer><\/div>/, '<div data-site-footer>' + footer + '</div>');
  if (original !== updated) await writeFile(file, updated);
}
console.log('Shared header and footer are synced across all 12 public pages.');
