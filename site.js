const routes={home:'/',about:'/about',technology:'/technology',realEstate:'/real-estate',webDesign:'/web-design'};
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

if(header)header.innerHTML=`<header class="site-header"><div class="nav-inner"><a class="brand" href="/" aria-label="OpenGate Advisory home">${logo}</a><button class="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Main navigation"><a class="nav-link" href="/#services">Services</a><a class="nav-link ${path==='/about'?'active':''}" href="/about">About</a><a class="nav-link" href="/#team">Team</a><div class="portfolio-menu"><button class="nav-trigger ${['/technology','/real-estate','/web-design'].includes(path)?'active':''}" aria-expanded="false">Portfolio <span class="nav-arrow" aria-hidden="true"></span></button><div class="dropdown"><a href="/technology">Technology<small>Morbit smart-building intelligence</small></a><a href="/real-estate">Real Estate<small>Bellevue Residencies, Sri Lanka</small></a><a href="/web-design">Web Design<small>Websites and content creation</small></a></div></div><a class="nav-link" href="/#contact">Contact</a><a class="nav-link nav-cta" href="https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/" target="_blank" rel="noopener">Book a Call</a></nav></div></header>`;

if(footer)footer.innerHTML=`<footer class="site-footer"><div class="footer-inner"><div class="footer-intro"><div class="footer-brand">OpenGate <span>Advisory</span></div><p>Opening doors, connecting opportunities and helping businesses scale across new horizons.</p><a class="footer-call" href="https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/" target="_blank" rel="noopener">Book a discovery call <span>↗</span></a></div><div class="footer-nav"><div class="footer-heading">Explore</div><div class="footer-links"><a href="/about">About us</a><a href="/#services">Services</a><a href="/#team">Team</a><a href="/technology">Technology</a><a href="/real-estate">Real Estate</a><a href="/web-design">Web Design</a><a href="/#contact">Contact</a></div></div><address class="footer-company"><div class="footer-heading">Registered office</div><strong>OpenGate Advisory (FZE)</strong><span>Sharjah Research Technology &amp; Innovation Park (SRTIP)</span><span>Block B – B57-089</span><span>License N° 11426</span><span>United Arab Emirates</span></address><div class="footer-meta"><span>Dubai · South EMEA · Southeast Asia</span><span>© ${new Date().getFullYear()} OpenGate Advisory</span></div></div></footer>`;

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

const pageClass=path==='/technology'?'technology-page':path==='/real-estate'?'real-estate-page':path==='/web-design'?'web-design-page':path==='/about'?'about-page':'home-page';
document.body.classList.add(pageClass);

if(pageClass==='home-page'){
  const technologyVisual=document.querySelector('.service-visual[href="/technology"] img');
  const marketingVisual=document.querySelector('.service-visual[href="/web-design"] img');
  if(technologyVisual){technologyVisual.src='morbit-boardroom.jpg';technologyVisual.alt='People collaborating in a connected boardroom'}
  if(marketingVisual){marketingVisual.src='strategy-whiteboard.jpg';marketingVisual.alt='Creative strategy workshop'}
  const teamGrid=document.querySelector('#team .team-grid');
  if(teamGrid)teamGrid.innerHTML=`<article class="person"><div class="person-head"><img src="Georges-new.png" alt="Georges Lemire"><div><h3>Georges Lemire</h3><div class="role">Founder · Principal Advisor</div></div></div><p class="person-bio">Former Managing Director France and Regional Director MEA at Cisco. Georges brings 25+ years growing enterprise technology businesses across Europe, the Middle East and Africa, supported by a practical network for companies expanding into South EMEA and Southeast Asia.</p><div class="person-highlights"><span>Managing Director France — Cisco</span><span>Regional Director Middle East &amp; Africa — Cisco</span><span>Director Operations Sales EMEAR — Cisco</span><span>Area VP EMEA — Neat</span></div><a class="person-link" href="https://www.linkedin.com/in/georgeslemire/" target="_blank" rel="noopener">↗ LinkedIn Profile</a></article><article class="person"><div class="person-head"><img src="Dorian.jpeg" alt="Dorian Lemire"><div><h3>Dorian Lemire</h3><div class="role">Web Designer · Revenue Growth Strategist</div></div></div><p class="person-bio">Dorian designs digital experiences that turn complex offers into clear buyer journeys. His work combines positioning, responsive web design, content creation and conversion thinking for B2B, hospitality and growth-focused brands.</p><div class="person-highlights"><span>Conversion-focused UI and UX</span><span>Responsive static websites</span><span>Content systems and campaign visuals</span><span>Lead journeys and commercial messaging</span></div><a class="person-link" href="https://www.linkedin.com/in/dorian-lemire" target="_blank" rel="noopener">↗ LinkedIn Profile</a></article><article class="person"><div class="person-head"><img class="charles-photo" src="Charles-Boschetti.jpg" alt="Charles Boschetti"><div><h3>Charles Boschetti</h3><div class="role">Content Creator · Photographer</div></div></div><p class="person-bio">Charles shapes clear visual stories for brands, campaigns and digital platforms. He brings a photographer’s eye to social content, location imagery and the authentic moments that make an offer feel tangible.</p><div class="person-highlights"><span>Brand and campaign photography</span><span>Social-first content production</span><span>Property and hospitality imagery</span><span>Creative direction and visual storytelling</span></div><a class="person-link" href="https://www.linkedin.com/in/charles-boschetti-013b56243/" target="_blank" rel="noopener">↗ LinkedIn Profile</a></article>`;
}

const motionItems=document.querySelectorAll('.section-head,.service-visual,.capability,.person,.metric,.location-card,.work-card,.ecosystem-stage,.about-panel,.market-orbit,.about-image-card');
motionItems.forEach(item=>item.classList.add('motion-item'));
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
  }),{threshold:.08});
  motionItems.forEach(item=>observer.observe(item));
}else motionItems.forEach(item=>item.classList.add('in-view'));
