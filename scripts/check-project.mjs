import {readdir, readFile} from 'node:fs/promises';
import {resolve, relative, extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = resolve(root, 'public');
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const path=resolve(dir,entry.name);
    assert(!entry.isSymbolicLink(), 'No symlinks in public: '+path);
    if (entry.isDirectory()) { await walk(path); continue; }
    assert(!entry.name.startsWith('.'), 'No hidden files in public: '+path);
    assert(/\.(html|css|js|svg|png|jpe?g|webp|mp4|vtt|woff2|xml|txt)$/.test(entry.name), 'Unexpected public file: '+path);
    files.push(path);
  }
}
await walk(publicRoot);
const configuration=JSON.parse(await readFile(resolve(root,'vercel.json'),'utf8'));
assert.equal(configuration.outputDirectory,'public');
assert.equal(configuration.cleanUrls,true);
const knownPaths=new Set(files.map(path=>'/'+relative(publicRoot,path)));
let references=0;
function checkUrl(raw,source) {
  if (!raw || /^(#|data:|mailto:|tel:)/.test(raw)) return;
  const url=new URL(raw,'https://www.opengate-advisory.com'+source);
  if(url.origin!=='https://www.opengate-advisory.com') return;
  let path=decodeURIComponent(url.pathname);
  if(path==='/') path='/index.html';
  else if(!extname(path)) path+='.html';
  assert(knownPaths.has(path), `Missing public reference ${raw} in ${source}`);
  references++;
}
for (const file of files) {
  const extension=extname(file), source='/'+relative(publicRoot,file);
  if(extension==='.js' && !file.includes('/vendor/')) execFileSync(process.execPath,['--check',file]);
  if(!['.html','.css'].includes(extension)) continue;
  const text=await readFile(file,'utf8');
  for(const match of text.matchAll(/(?:href|src|data-image-zoom)="([^"]+)"/g)) checkUrl(match[1],source);
  for(const match of text.matchAll(/srcset="([^"]+)"/g)) for(const item of match[1].split(',')) checkUrl(item.trim().split(/\s+/)[0],source);
  for(const match of text.matchAll(/url\(['"]?([^'"\s)]+)['"]?\)/g)) checkUrl(match[1],source);
  for(const match of text.matchAll(/https:\/\/www\.opengate-advisory\.com\/[^\s"<>]+\.(?:jpg|jpeg|png|svg|webp)/g)) checkUrl(match[0],source);
  for(const match of text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
}
for(const file of await readdir(resolve(root,'scripts'))) if(file.endsWith('.mjs')) execFileSync(process.execPath,['--check',resolve(root,'scripts',file)]);
for(const redirect of configuration.redirects) checkUrl(redirect.destination,'/');
const dependencyFiles=execFileSync('git',['ls-files','node_modules'],{cwd:root,encoding:'utf8'}).trim();
assert.equal(dependencyFiles,'','node_modules must not be tracked');
const main=await readFile(resolve(publicRoot,'index.html'),'utf8');
assert(main.includes('AI Developer'));
assert(!main.includes('Business Development Representative'));
assert(main.includes('/assets/team/dorian-lemire.jpeg') && main.includes('/assets/team/georges-lemire.png'));
assert(!main.includes('Charles Boschetti'));
for(const file of files.filter(path=>path.endsWith('.html'))) assert(!(await readFile(file,'utf8')).includes('data-image-slot='),'No unfilled image slots in published pages: '+file);
console.log(`Validated ${files.length} public files, ${references} local references, structured data, JS syntax and repository boundaries.`);
