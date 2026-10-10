import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../public/', import.meta.url));
const configuration = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const port = Number(process.env.PORT || 8091);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const redirect = configuration.redirects?.find(item => item.source === pathname);
    if (redirect) { res.writeHead(redirect.permanent===false?307:308, {Location:redirect.destination}); res.end(); return; }
    const requested = pathname === '/' ? '/index.html' : !extname(pathname) ? pathname + '.html' : pathname;
    const file = resolve(root, '.' + requested);
    const publicPath = /^\/[\w.-]+$/.test(requested) || /^\/assets\/(css|js|fonts|vendor|photos|team|morbit|social|private-discuss|work)\/[\w.-]+$/.test(requested);
    if (!publicPath || !file.startsWith(root) || !types[extname(file)]) throw new Error('Not public');
    if (!(await realpath(file)).startsWith(root)) throw new Error('Not public');
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    res.writeHead(200, {'Content-Type':types[extname(file)],'Cache-Control':'no-store'});
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(resolve(root, '404.html')));
  }
}).listen(port, '127.0.0.1', () => console.log('OpenGate preview: http://127.0.0.1:' + port));
