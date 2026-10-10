import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const services = {
  'market-entry-consulting': { source:'market-entry-main.html', name:'Market entry & growth', title:'Market Entry & Growth Advisory | OpenGate', description:'Market validation, technology positioning and practical go-to-market support for companies expanding across the GCC, EMEA and Southeast Asia.' },
  'fractional-sales-leadership': { source:'commercial-leadership-main.html', name:'Commercial leadership & partnerships', title:'Commercial Leadership & Partnerships | OpenGate', description:'Fractional sales leadership, channel development and commercial execution. Senior experience for your team, pipeline and partner network.' },
  'ai-development': { source:'ai-development-main.html', name:'AI development & integration', title:'AI Development, CRM Integration & Motion Design | OpenGate', description:'AI and CRM workflows, websites, motion design and content for SaaS and technology businesses. Digital development with Dorian Lemire at OpenGate.' }
};
const existingPages = (await readdir(resolve(root,'public'))).filter(file=>file.endsWith('.html')).map(file=>file.slice(0,-5));
if (!existingPages.includes('ai-development')) {
  const template = await readFile(resolve(root,'public/market-entry-consulting.html'),'utf8');
  await writeFile(resolve(root,'public/ai-development.html'),template);
}
const pages = (await readdir(resolve(root,'public'))).filter(file=>file.endsWith('.html')).map(file=>file.slice(0,-5));
const header = (await readFile(resolve(root, 'partials/header.html'), 'utf8')).trim();
const footer = (await readFile(resolve(root, 'partials/footer.html'), 'utf8')).trim();
for (const page of pages) {
  const file = resolve(root, 'public', page + '.html');
  const original = await readFile(file, 'utf8');
  let updated = original
    .replace(/<div data-site-header>[\s\S]*?<\/header><\/div>/, '<div data-site-header>' + header + '</div>')
    .replace(/<div data-site-footer>[\s\S]*?<\/footer><\/div>/, '<div data-site-footer>' + footer + '</div>');
  if (services[page]) {
    const service=services[page];
    const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;');
    updated=updated.replace(/<main id="main">[\s\S]*?<\/main>/,(await readFile(resolve(root,'partials',service.source),'utf8')).trim());
    updated=updated.replace(/<title>[^<]*<\/title>/,'<title>'+escape(service.title)+'</title>');
    for(const key of ['description','og:description','twitter:description']) {
      const kind=key.startsWith('og:')?'property':'name';
      updated=updated.replace(new RegExp('(<meta '+kind+'="'+key+'" content=")[^"]+(">)'),'$1'+escape(service.description)+'$2');
    }
    for(const key of ['og:title','twitter:title']) {
      const kind=key.startsWith('og:')?'property':'name';
      updated=updated.replace(new RegExp('(<meta '+kind+'="'+key+'" content=")[^"]+(">)'),'$1'+escape(service.title)+'$2');
    }
    const canonical='https://www.opengate-advisory.com/'+page;
    updated=updated.replace(/(<link rel="canonical" href=")[^"]+(">)/,'$1'+canonical+'$2').replace(/(<meta property="og:url" content=")[^"]+(">)/,'$1'+canonical+'$2');
    const schema={'@context':'https://schema.org','@graph':[{'@type':'Service','@id':canonical+'#service',name:service.name,serviceType:service.name,url:canonical,description:service.description,provider:{'@id':'https://www.opengate-advisory.com/#organization'},areaServed:['United Arab Emirates','Southern Europe','Middle East','Africa','Southeast Asia']},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.opengate-advisory.com/'},{'@type':'ListItem',position:2,name:service.name,item:canonical}]}]};
    updated=updated.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,'<script type="application/ld+json">\n'+JSON.stringify(schema)+'\n  </script>');
  }
  if (!updated.includes('href="/assets/css/motion.css"')) updated = updated.replace('</head>', '  <link rel="stylesheet" href="/assets/css/motion.css">\n</head>');
  if (!updated.includes('src="/assets/js/motion.js"')) updated = updated.replace('</body>', '<script src="/assets/js/motion.js" defer></script>\n</body>');
  if (!updated.includes('href="/assets/css/refinement.css"')) updated=updated.replace('</head>','  <link rel="stylesheet" href="/assets/css/refinement.css">\n</head>');
  if (['technology','web-design','ai-development'].includes(page)) updated=updated.replace(/<script src="\/assets\/vendor\/(gsap|ScrollTrigger)\.min\.js" defer><\/script>\n?/g,'');
  if (page === 'technology') {
    updated = updated.replace(/<script src="\/assets\/vendor\/(gsap|ScrollTrigger)\.min\.js" defer><\/script>\n?/g, '');
    let main = (await readFile(resolve(root, 'partials/morbit-main.html'), 'utf8')).trim();
    main=main.replace(/<div id="panel-estate"[\s\S]*?(?=\n\s*<div id="panel-rooms")/,(await readFile(resolve(root,'partials/morbit-estate-panel.html'),'utf8')).trim()+'\n');
    updated = updated.replace(/<main id="main">[\s\S]*?<\/main>/, main);
    if (!updated.includes('href="/assets/css/morbit.css"')) updated = updated.replace('</head>', '  <link rel="stylesheet" href="/assets/css/morbit.css">\n</head>');
    if (!updated.includes('src="/assets/js/showcase.js"')) updated = updated.replace('<script src="/assets/js/motion.js"', '<script src="/assets/js/showcase.js" defer></script>\n<script src="/assets/js/motion.js"');
    if (!updated.includes('src="/assets/js/morbit.js"')) updated = updated.replace('<script src="/assets/js/motion.js"', '<script src="/assets/js/morbit.js" defer></script>\n<script src="/assets/js/motion.js"');
  }
  if (page === 'index' && !updated.includes('class="hero-sculpture"')) {
    updated = updated.replace('<section class="home-hero">', '<section class="home-hero"><div class="hero-sculpture" aria-hidden="true"><div class="gate-object"><span></span><span></span><span></span></div><div class="gate-object gate-object--small"><span></span><span></span><span></span></div></div>');
  }
  if(page==='index') updated=updated.replace(/<section class="section" id="services">[\s\S]*?<\/section>/,(await readFile(resolve(root,'partials/core-services.html'),'utf8')).trim());
  if(page==='web-design') updated=updated.replace(/<section class="section section-soft" id="motion-work">[\s\S]*?<\/section>/,(await readFile(resolve(root,'partials/motion-work.html'),'utf8')).trim());
  if (original !== updated) await writeFile(file, updated);
}
console.log(`Shared header and footer are synced across all ${pages.length} public pages.`);
