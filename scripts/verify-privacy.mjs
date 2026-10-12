import {chromium} from '@playwright/test';
import {readFile, mkdir} from 'node:fs/promises';
import {resolve, extname} from 'node:path';
import assert from 'node:assert/strict';

// Exercise the production consent path locally, with no vendor data transmission.
const root=resolve('public');
const origin='https://www.opengate-advisory.com';
const browser=await chromium.launch({channel:'chrome',headless:true});
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
const key='opengate-privacy';
await mkdir('test-results',{recursive:true});
async function fixture({google=false,stored=null,blockStorage=false}={}) {
  const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
  const requests=[];
  if(stored) await context.addInitScript(({key,stored})=>localStorage.setItem(key,JSON.stringify(stored)),{key,stored});
  if(blockStorage) await context.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('Storage disabled')};});
  await context.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.pathname==='/_vercel/insights/script.js') {
      requests.push('vercel');
      return route.fulfill({contentType:'application/javascript',body:'window.__vercelLoaded=true;'});
    }
    if(url.hostname==='www.googletagmanager.com') {
      requests.push('google');
      return route.fulfill({contentType:'application/javascript',body:'window.__googleLoaded=true;'});
    }
    if(url.origin!==origin) return route.abort();
    const path=url.pathname==='/'?'/index.html':extname(url.pathname)?url.pathname:url.pathname+'.html';
    try{
      let body=await readFile(resolve(root,'.'+path));
      if(google && path==='/assets/js/privacy.js') body=Buffer.from(body.toString().replace("const googleAnalyticsId = '';","const googleAnalyticsId = 'G-TEST12345';"));
      await route.fulfill({contentType:types[extname(path)]||'application/octet-stream',body});
    }catch{await route.fulfill({status:404,body:'Not found'});}
  });
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/?private-value=not-for-analytics#example');
  await page.evaluate(()=>document.fonts.ready);
  return {context,page,requests,errors};
}
try {
  const {context,page,requests,errors}=await fixture();
  assert.deepEqual(requests,[],'No analytics request before choice');
  assert(await page.locator('.privacy-banner').isVisible());
  assert.equal(await page.locator('#analytics-choice').isChecked(),false);
  for(const theme of ['light','dark'])for(const width of [360,768,1440]){
    await page.setViewportSize({width,height:900});
    await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:`test-results/privacy-banner-${theme}-${width}.png`});
  }
  await page.locator('.privacy-banner [data-privacy-settings]').click();
  await page.keyboard.press('Escape');
  assert(await page.locator('.privacy-banner').isVisible(),'Escape is not consent');
  assert.deepEqual(requests,[]);
  await page.locator('.privacy-banner [data-consent="reject"]').click();
  await page.goto(origin+'/about');
  assert(await page.locator('.privacy-banner').isHidden(),'Reject persists across pages');
  assert.deepEqual(requests,[]);
  await page.locator('.footer-links [data-privacy-settings]').click();
  await page.getByLabel('Allow optional analytics',{exact:true}).check();
  await page.locator('[data-consent-save]').click();
  await page.waitForFunction(()=>window.__vercelLoaded);
  assert.deepEqual(requests,['vercel'],'GA is not loaded when no property is configured');
  const cleaned=await page.evaluate(()=>{
    const hook=window.vaq.find(args=>args[0]==='beforeSend')[1];
    return hook({url:location.origin+'/about?email=private#secret',referrer:'https://external.test/private'});
  });
  assert.deepEqual(cleaned,{url:origin+'/about',referrer:''});
  await page.locator('a.header-cta').evaluate(link=>{link.addEventListener('click',e=>e.preventDefault());link.click();});
  const events=await page.evaluate(()=>window.vaq.filter(args=>args[0]==='event').map(args=>args[1].name));
  assert.deepEqual(events,['booking_link_click'],'A booking click is not a confirmed lead');
  const other=await context.newPage();await other.goto(origin+'/');
  await other.waitForFunction(()=>window.__vercelLoaded);
  await page.locator('.footer-links [data-privacy-settings]').click();
  await page.locator('.privacy-dialog [data-consent="reject"]').click();
  await page.waitForFunction(()=>!window.__vercelLoaded && JSON.parse(localStorage.getItem('opengate-privacy')).analytics===false);
  await other.waitForFunction(()=>!window.__vercelLoaded && JSON.parse(localStorage.getItem('opengate-privacy')).analytics===false);
  assert.equal(await page.locator('[data-opengate-analytics]').count(),0,'Withdrawal unloads analytics');
  assert.deepEqual(errors,[]);
  await context.close();

  // A future configured GA property must also stay blocked before explicit opt-in.
  const ga=await fixture({google:true});
  assert.deepEqual(ga.requests,[]);
  await ga.page.locator('.privacy-banner [data-consent="accept"]').click();
  await ga.page.waitForFunction(()=>window.__googleLoaded && window.__vercelLoaded);
  const commands=await ga.page.evaluate(()=>window.dataLayer.map(args=>Array.from(args)));
  assert.equal(commands[0][0],'consent');assert.equal(commands[0][1],'default');
  assert.equal(commands[0][2].analytics_storage,'denied');
  assert.equal(commands[1][2].analytics_storage,'granted');
  assert.equal(commands[0][2].ad_storage,'denied');
  assert.equal(commands.find(c=>c[0]==='config')[2].page_location,origin+'/');
  await ga.context.addCookies([{name:'_ga',value:'test',domain:'.opengate-advisory.com',path:'/'}]);
  await ga.page.locator('.footer-links [data-privacy-settings]').click();
  await ga.page.locator('.privacy-dialog [data-consent="reject"]').click();
  await ga.page.waitForFunction(()=>!window.__googleLoaded);
  assert.equal((await ga.context.cookies()).filter(c=>c.name==='_ga').length,0);
  await ga.context.close();

  for(const stored of [{version:1,analytics:true,savedAt:Date.now()-181*86400000},{version:0,analytics:true,savedAt:Date.now()}]){
    const f=await fixture({stored});
    assert.deepEqual(f.requests,[],'Expired/outdated consent does not load analytics');
    assert(await f.page.locator('.privacy-banner').isVisible());
    await f.context.close();
  }
  const blocked=await fixture({blockStorage:true});
  await blocked.page.locator('.privacy-banner [data-consent="accept"]').click();
  await blocked.page.waitForFunction(()=>window.__vercelLoaded);
  await blocked.page.locator('.footer-links [data-privacy-settings]').click();
  await blocked.page.locator('.privacy-dialog [data-consent="reject"]').click();
  assert.equal(await blocked.page.locator('[data-opengate-analytics]').count(),0);
  assert.equal(await blocked.page.evaluate(()=>window.vaq.find(a=>a[0]==='beforeSend')[1]({url:location.href})),null);
  assert.deepEqual(blocked.errors,[]);
  await blocked.context.close();
  console.log('Privacy checks passed: default/reject blocking, opt-in, future GA consent order, URL redaction, click semantics, withdrawal/cookie removal, cross-tab sync, expiry, unavailable storage, keyboard and six responsive theme layouts.');
}finally{await browser.close();}
