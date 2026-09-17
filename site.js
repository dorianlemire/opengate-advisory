const routes={home:'/',about:'/about',technology:'/technology',realEstate:'/real-estate',webDesign:'/web-design',privacy:'/privacy-policy',thankYou:'/thank-you'};
const servicePaths=['/market-entry-consulting','/fractional-sales-leadership','/channel-partner-development','/technology-commercialisation'];
const logo=`<svg viewBox="0 0 242 82" role="img" aria-label="OpenGate Advisory"><rect x="2" y="8" width="58" height="58" rx="5" fill="#06111a" stroke="rgba(237,246,255,.28)" stroke-width="2"/><path d="M15 20h33v33h-10V37.5L20.5 55 13 47.5 30.5 30H15z" fill="#d2ad4f"/><text x="74" y="39" fill="#edf6ff" font-family="Plus Jakarta Sans,Arial" font-size="30" font-weight="800" letter-spacing="-1.6">OpenGate</text><text x="76" y="63" fill="#d2ad4f" font-family="Plus Jakarta Sans,Arial" font-size="19" font-weight="400">Advisory</text></svg>`;
const path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/';
const header=document.querySelector('[data-site-header]');
const footer=document.querySelector('[data-site-footer]');

const isLocalAnalyticsHost=['localhost','127.0.0.1'].includes(location.hostname);
if(!isLocalAnalyticsHost&&!document.querySelector('script[data-opengate-analytics]')){
  window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
  const analyticsScript=document.createElement('script');
  analyticsScript.defer=true;
  analyticsScript.src='/_vercel/insights/script.js';
  analyticsScript.dataset.opengateAnalytics='true';
  document.head.appendChild(analyticsScript);
}

// Add the GA4 Measurement ID once it has been created in Google Analytics.
// Keeping the value empty prevents accidental traffic being sent to a placeholder property.
const googleAnalyticsId='';
if(!isLocalAnalyticsHost&&/^G-[A-Z0-9]+$/.test(googleAnalyticsId)&&!document.querySelector('script[data-opengate-ga4]')){
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('config',googleAnalyticsId,{anonymize_ip:true});
  const googleAnalyticsScript=document.createElement('script');
  googleAnalyticsScript.async=true;
  googleAnalyticsScript.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`;
  googleAnalyticsScript.dataset.opengateGa4='true';
  document.head.appendChild(googleAnalyticsScript);
}

if(header)header.innerHTML=`<header class="site-header"><div class="nav-inner"><a class="brand" href="/" aria-label="OpenGate Advisory home">${logo}</a><button class="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Main navigation"><a class="nav-link ${servicePaths.includes(path)?'active':''}" href="/#services">Services</a><a class="nav-link ${path==='/about'?'active':''}" href="/about">About</a><a class="nav-link" href="/#team">Team</a><div class="portfolio-menu"><button class="nav-trigger ${['/technology','/real-estate','/web-design'].includes(path)?'active':''}" aria-expanded="false">Portfolio <span class="nav-arrow" aria-hidden="true"></span></button><div class="dropdown"><a href="/technology">Technology<small>Morbit smart-building intelligence</small></a><a href="/real-estate">Real Estate<small>Bellevue Residencies, Sri Lanka</small></a><a href="/web-design">Web Design<small>Websites and content creation</small></a></div></div><a class="nav-link" href="/#contact">Contact</a><a class="nav-link nav-cta" href="https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/" target="_blank" rel="noopener">Book a Call</a></nav></div></header>`;

if(footer)footer.innerHTML=`<footer class="site-footer"><div class="footer-inner"><div class="footer-intro"><div class="footer-brand">OpenGate <span>Advisory</span></div><p>Opening doors, connecting opportunities and helping businesses scale across new horizons.</p><a class="footer-call" href="https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/" target="_blank" rel="noopener">Book a discovery call <span>↗</span></a><span class="footer-response">New enquiries answered within one business day.</span></div><div class="footer-nav"><div class="footer-heading">Explore</div><div class="footer-links"><a href="/about">About us</a><a href="/market-entry-consulting">Market entry</a><a href="/fractional-sales-leadership">Fractional leadership</a><a href="/channel-partner-development">Channel partners</a><a href="/technology-commercialisation">Technology commercialisation</a><a href="/technology">Morbit technology</a><a href="/real-estate">Real Estate</a><a href="/web-design">Web Design</a><a href="/#team">Team</a><a href="/#contact">Contact</a><a href="/privacy-policy">Privacy policy</a></div></div><address class="footer-company"><div class="footer-heading">Registered office</div><strong>OpenGate Advisory (FZE)</strong><span>Sharjah Research Technology &amp; Innovation Park (SRTIP)</span><span>Block B – B57-089</span><span>License N° 11426</span><span>United Arab Emirates</span></address><div class="footer-meta"><span>Dubai · South EMEA · Southeast Asia</span><span>© ${new Date().getFullYear()} OpenGate Advisory</span></div></div></footer>`;

const breadcrumbLabels={
  '/about':'About',
  '/market-entry-consulting':'Market Entry Consulting',
  '/fractional-sales-leadership':'Fractional Sales Leadership',
  '/channel-partner-development':'Channel Partner Development',
  '/technology-commercialisation':'Technology Commercialisation',
  '/technology':'Morbit Technology',
  '/real-estate':'Bellevue Residencies',
  '/web-design':'Web Design',
  '/privacy-policy':'Privacy Policy',
  '/thank-you':'Thank You'
};
const main=document.querySelector('main');
if(main&&path!=='/'&&!main.querySelector('.breadcrumbs')){
  const currentLabel=breadcrumbLabels[path]||'Page not found';
  main.insertAdjacentHTML('afterbegin',`<nav class="breadcrumbs container" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">${currentLabel}</li></ol></nav>`);
}

if(!document.body.hasAttribute('data-no-sticky-cta')&&!['/thank-you'].includes(path)){
  document.body.insertAdjacentHTML('beforeend',`<a class="sticky-mobile-cta" href="https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/" target="_blank" rel="noopener"><span>Book a discovery call</span><small>Reply within one business day</small></a>`);
}

const trackLead=(source)=>{
  window.va?.('event',{name:'Book Discovery Call',data:{source}});
  window.gtag?.('event','generate_lead',{event_category:'engagement',event_label:source});
};
document.querySelectorAll('a[href*="outlook.office.com/book/"]').forEach(link=>link.addEventListener('click',()=>trackLead(link.classList.contains('sticky-mobile-cta')?'sticky_mobile_cta':'discovery_call_cta')));

const siteHeader=document.querySelector('.site-header');
document.querySelector('.nav-toggle')?.addEventListener('click',event=>{
  const open=siteHeader.classList.toggle('mobile-open');
  event.currentTarget.setAttribute('aria-expanded',open);
  event.currentTarget.textContent=open?'×':'☰';
});
document.querySelector('.nav-trigger')?.addEventListener('click',event=>{
  const menu=event.currentTarget.closest('.portfolio-menu');
  const open=menu.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded',open);
});
document.addEventListener('click',event=>{
  if(!event.target.closest('.portfolio-menu'))document.querySelector('.portfolio-menu')?.classList.remove('open');
});

document.querySelectorAll('[data-tabs]').forEach(tabs=>{
  const buttons=tabs.querySelectorAll('.tab-button');
  const panels=tabs.querySelectorAll('.tab-panel');
  buttons.forEach(button=>button.addEventListener('click',()=>{
    buttons.forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});
    panels.forEach(panel=>panel.classList.remove('active'));
    button.classList.add('active');
    button.setAttribute('aria-selected','true');
    tabs.querySelector(`#${button.dataset.target}`)?.classList.add('active');
  }));
});

document.querySelectorAll('.reveal').forEach(reveal=>{
  const range=reveal.querySelector('input');
  const after=reveal.querySelector('.reveal-after');
  const line=reveal.querySelector('.reveal-line');
  const handle=reveal.querySelector('.reveal-handle');
  const update=()=>{
    const value=range.value;
    after.style.clipPath=`inset(0 0 0 ${value}%)`;
    line.style.left=value+'%';
    handle.style.left=value+'%';
  };
  range.addEventListener('input',update);
  update();
});

document.querySelectorAll('[data-metric-card]').forEach(card=>{
  const group=card.closest('.metric-experience');
  const detail=group?.querySelector('[data-metric-explainer]');
  const activate=()=>{
    group.querySelectorAll('[data-metric-card]').forEach(item=>item.classList.remove('active'));
    card.classList.add('active');
    if(detail){
      detail.querySelector('strong').textContent=card.dataset.title;
      detail.querySelector('span').textContent=card.dataset.detail;
    }
  };
  card.addEventListener('pointerenter',activate);
  card.addEventListener('focus',activate);
  card.addEventListener('click',activate);
});

document.querySelectorAll('[data-ecosystem-stage]').forEach(stage=>{
  const heading=stage.querySelector('[data-ecosystem-title]');
  const copy=stage.querySelector('[data-ecosystem-copy]');
  stage.querySelectorAll('[data-ecosystem-point]').forEach(point=>{
    const activate=()=>{
      stage.querySelectorAll('[data-ecosystem-point]').forEach(item=>item.classList.remove('active'));
      point.classList.add('active');
      heading.textContent=point.dataset.title;
      copy.textContent=point.dataset.description;
    };
    point.addEventListener('pointerenter',activate);
    point.addEventListener('focus',activate);
    point.addEventListener('click',activate);
  });
});

const pageClass=path==='/technology'?'technology-page':path==='/real-estate'?'real-estate-page':path==='/web-design'?'web-design-page':path==='/about'?'about-page':servicePaths.includes(path)?'service-page':['/privacy-policy','/thank-you'].includes(path)?'utility-page':'home-page';
document.body.classList.add(pageClass);

const motionItems=document.querySelectorAll('.section-head,.service-visual,.capability,.person,.metric,.location-card,.work-card,.ecosystem-stage,.about-principle,.about-gateway,.about-proof-card,.faq-item');
motionItems.forEach(item=>item.classList.add('motion-item'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
  }),{threshold:.08});
  motionItems.forEach(item=>observer.observe(item));
}else motionItems.forEach(item=>item.classList.add('in-view'));
