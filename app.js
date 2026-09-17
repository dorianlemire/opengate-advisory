const doc = document.documentElement;
const body = document.body;
const header = document.querySelector('[data-header]');

// Add a real GA4 ID (G-XXXXXXXXXX) to the data-ga-id attribute on <html>.
const gaId = doc.dataset.gaId || '';
if (/^G-[A-Z0-9]{6,}$/.test(gaId) && !gaId.includes('XXXX')) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(analyticsScript);
}

const track = (eventName, parameters = {}) => window.gtag?.('event', eventName, parameters);

const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 30);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const menuToggle = document.querySelector('[data-menu-toggle]');
const closeMenu = () => {
  header?.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};
menuToggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-mobile-menu] a').forEach(link => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .09, rootMargin: '0px 0px -4% 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in-view'));
}

const residences = {
  '2br': {
    level: 'Lower residences',
    title: 'Two Bedroom Residence',
    description: 'A considered home for modern city life, pairing an open living-dining space with a shaded balcony and two private bedroom zones.',
    config: '2 bedrooms',
    view: 'Garden & corridor',
    image: '/assets/bellevue-interior-reference.jpg',
    alt: 'Indicative contemporary two-bedroom residence interior at Bellevue Residencies',
    plan: '<span class="room living">Living / dining</span><span class="room bed-a">Suite 01</span><span class="room bed-b">Suite 02</span><span class="room balcony">Balcony</span>',
    cta: 'Request 2 bedroom details'
  },
  '3br': {
    level: 'Mid residences',
    title: 'Three Bedroom Residence',
    description: 'A generous family setting with a fluid social space, broad glazing and an easy relationship between kitchen, dining room and balcony.',
    config: '3 bedrooms',
    view: 'Lagoon-green horizon',
    image: '/assets/residence-3br.jpg',
    alt: 'Artist impression of a bright three-bedroom Bellevue residence with a tropical inland view',
    plan: '<span class="room living">Living / dining</span><span class="room bed-a">Suite 01</span><span class="room bed-b">Suite 02</span><span class="room bed-c">Suite 03</span><span class="room balcony">Deep balcony</span>',
    cta: 'Request 3 bedroom details'
  },
  '4br': {
    level: 'Upper residences',
    title: 'Four Bedroom Residence',
    description: 'An expansive corner home imagined for multi-generational life, entertaining and long views across the Western Province canopy.',
    config: '4 bedrooms',
    view: 'Wide corner aspect',
    image: '/assets/residence-4br.jpg',
    alt: 'Artist impression of an expansive four-bedroom Bellevue corner residence',
    plan: '<span class="room living">Salon / dining</span><span class="room bed-a">Suite 01</span><span class="room bed-b">Suite 02</span><span class="room bed-c">Suite 03</span><span class="room bed-d">Suite 04</span><span class="room balcony">Corner balcony</span>',
    cta: 'Request 4 bedroom details'
  },
  penthouse: {
    level: 'Crown level',
    title: 'Penthouse Residence',
    description: 'The most private expression of Bellevue: elevated indoor-outdoor living beneath the architectural crown and a horizon that opens in every direction.',
    config: 'Penthouse',
    view: 'Panoramic skyline',
    image: '/assets/residence-penthouse.jpg',
    alt: 'Artist impression of a Bellevue penthouse sky terrace at sunset',
    plan: '<span class="room living">Great room</span><span class="room bed-a">Private wing</span><span class="room balcony">Sky terrace</span>',
    cta: 'Request penthouse details'
  }
};

const residenceImage = document.querySelector('[data-residence-image]');
const residenceLevel = document.querySelector('[data-residence-level]');
const residenceTitle = document.querySelector('[data-residence-title]');
const residenceDescription = document.querySelector('[data-residence-description]');
const residenceConfig = document.querySelector('[data-residence-config]');
const residenceView = document.querySelector('[data-residence-view]');
const residencePlan = document.querySelector('.mini-plan');
const residenceCta = document.querySelector('[data-residence-cta]');
let activeResidence = '2br';

const selectResidence = key => {
  const residence = residences[key];
  if (!residence || !residenceImage) return;
  activeResidence = key;
  document.querySelectorAll('[data-residence]').forEach(button => {
    const active = button.dataset.residence === key;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  residenceImage.style.opacity = '0';
  window.setTimeout(() => {
    residenceImage.src = residence.image;
    residenceImage.alt = residence.alt;
    residenceImage.style.opacity = '1';
  }, 180);
  residenceLevel.textContent = residence.level;
  residenceTitle.textContent = residence.title;
  residenceDescription.textContent = residence.description;
  residenceConfig.textContent = residence.config;
  residenceView.textContent = residence.view;
  residencePlan.dataset.plan = key;
  residencePlan.innerHTML = residence.plan;
  residenceCta.childNodes[0].nodeValue = `${residence.cta} `;
  track('select_residence', { residence_type: key, level: residence.level });
};
document.querySelectorAll('[data-residence]').forEach(button => button.addEventListener('click', () => selectResidence(button.dataset.residence)));

const towerStage = document.querySelector('[data-tower-stage]');
const towerWorld = document.querySelector('[data-tower-world]');
let towerRotation = -20;
let draggingTower = false;
let towerStartX = 0;
let towerStartRotation = towerRotation;
const renderTower = () => {
  if (towerWorld) towerWorld.style.transform = `rotateX(-4deg) rotateY(${towerRotation}deg)`;
};
towerStage?.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  draggingTower = true;
  towerStartX = event.clientX;
  towerStartRotation = towerRotation;
  towerStage.setPointerCapture(event.pointerId);
});
towerStage?.addEventListener('pointermove', event => {
  if (!draggingTower) return;
  towerRotation = Math.max(-50, Math.min(34, towerStartRotation + (event.clientX - towerStartX) * .18));
  renderTower();
});
towerStage?.addEventListener('pointerup', () => { draggingTower = false; });
towerStage?.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  towerRotation += event.key === 'ArrowLeft' ? -5 : 5;
  towerRotation = Math.max(-50, Math.min(34, towerRotation));
  renderTower();
});
document.querySelector('[data-reset-model]')?.addEventListener('click', () => { towerRotation = -20; renderTower(); });

const galleryItems = [
  { src: '/assets/amenity-pool.jpg', alt: 'Artist impression of the Bellevue infinity pool, tropical resident deck and twin-tower masterplan at blue hour', title: 'Infinity Pool & Resident Deck', hint: 'Artist impression' },
  { src: '/assets/bellevue-vision-reference.jpg', alt: 'Aerial artist impression of the Bellevue twin-tower masterplan beside the coast at sunrise', title: 'Coastal Masterplan Vision', hint: 'Artist impression · published masterplan vision' },
  { src: '/assets/bellevue-hero.jpg', alt: "Artist impression of Bellevue Residencies' twin-tower masterplan rising above tropical Ja-Ela at sunset", title: 'Twin Towers at Dusk', hint: 'Artist impression' }
];
const residenceOrder = ['2br', '3br', '4br', 'penthouse'];
let galleryIndex = 0;
let tourMode = 'residence';

const galleryMainImg = document.querySelector('[data-gallery-main]');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const selectGalleryImage = index => {
  galleryIndex = index;
  const item = galleryItems[index];
  if (galleryMainImg) { galleryMainImg.src = item.src; galleryMainImg.alt = item.alt; }
  galleryThumbs.forEach(thumb => {
    const active = Number(thumb.dataset.galleryIndex) === index;
    thumb.classList.toggle('active', active);
    thumb.setAttribute('aria-pressed', String(active));
  });
};
galleryThumbs.forEach(thumb => thumb.addEventListener('click', () => selectGalleryImage(Number(thumb.dataset.galleryIndex))));

const tourModal = document.querySelector('[data-tour-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalHint = document.querySelector('[data-modal-hint]');
const modalPrev = document.querySelector('[data-tour-prev]');
const modalNext = document.querySelector('[data-tour-next]');

const renderTourFrame = () => {
  if (tourMode === 'gallery') {
    const item = galleryItems[galleryIndex];
    modalImage.src = item.src;
    modalImage.alt = item.alt;
    modalTitle.textContent = item.title;
    if (modalHint) modalHint.textContent = item.hint;
  } else {
    const residence = residences[activeResidence];
    modalImage.src = residence.image;
    modalImage.alt = residence.alt;
    modalTitle.textContent = residence.title;
    if (modalHint) modalHint.textContent = 'Move your pointer or drag to look across the room · Artist impression';
  }
};
const openTour = (mode, index) => {
  if (!tourModal) return;
  tourMode = mode === 'gallery' ? 'gallery' : 'residence';
  if (tourMode === 'gallery' && typeof index === 'number') galleryIndex = index;
  renderTourFrame();
  tourModal.classList.add('open');
  tourModal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
  document.querySelector('[data-close-tour]')?.focus();
  track('open_media_preview', { mode: tourMode, key: tourMode === 'gallery' ? galleryItems[galleryIndex].title : activeResidence });
};
const closeTour = () => {
  tourModal?.classList.remove('open');
  tourModal?.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
  (tourMode === 'gallery' ? document.querySelector('[data-open-gallery]') : document.querySelector('[data-open-tour]'))?.focus();
};
const navTour = direction => {
  if (tourMode === 'gallery') {
    galleryIndex = (galleryIndex + direction + galleryItems.length) % galleryItems.length;
    selectGalleryImage(galleryIndex);
  } else {
    const i = residenceOrder.indexOf(activeResidence);
    selectResidence(residenceOrder[(i + direction + residenceOrder.length) % residenceOrder.length]);
  }
  renderTourFrame();
};
document.querySelector('[data-open-tour]')?.addEventListener('click', () => openTour('residence'));
document.querySelector('[data-open-gallery]')?.addEventListener('click', () => openTour('gallery', galleryIndex));
galleryMainImg?.addEventListener('click', () => openTour('gallery', galleryIndex));
document.querySelector('[data-close-tour]')?.addEventListener('click', closeTour);
modalPrev?.addEventListener('click', () => navTour(-1));
modalNext?.addEventListener('click', () => navTour(1));
tourModal?.addEventListener('click', event => { if (event.target === tourModal) closeTour(); });
document.addEventListener('keydown', event => {
  if (!tourModal?.classList.contains('open')) return;
  if (event.key === 'Escape') closeTour();
  if (event.key === 'ArrowLeft') navTour(-1);
  if (event.key === 'ArrowRight') navTour(1);
});
document.querySelector('[data-tour-frame]')?.addEventListener('pointermove', event => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  modalImage.style.transform = `translate(${x * -5}%, ${y * -4}%) scale(1.05)`;
});

const calculator = document.querySelector('[data-calculator]');
if (calculator) {
  const fields = {
    price: calculator.querySelector('[data-price]'),
    rent: calculator.querySelector('[data-rent]'),
    costs: calculator.querySelector('[data-costs]'),
    growth: calculator.querySelector('[data-growth]')
  };
  const outputs = {
    gross: calculator.querySelector('[data-gross]'),
    net: calculator.querySelector('[data-net]'),
    future: calculator.querySelector('[data-future]')
  };
  const money = value => new Intl.NumberFormat('en-LK', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  const calculate = () => {
    const price = Number(fields.price.value);
    const annualRent = Number(fields.rent.value) * 12;
    const costs = Number(fields.costs.value);
    const growth = Number(fields.growth.value) / 100;
    outputs.gross.textContent = price > 0 && annualRent >= 0 ? `${((annualRent / price) * 100).toFixed(2)}%` : '—';
    outputs.net.textContent = price > 0 && annualRent >= 0 ? `${(((annualRent - costs) / price) * 100).toFixed(2)}%` : '—';
    outputs.future.textContent = price > 0 && Number.isFinite(growth) ? `LKR ${money(price * Math.pow(1 + growth, 5))}` : '—';
  };
  Object.values(fields).forEach(field => field.addEventListener('input', calculate));
  calculator.querySelector('[data-reset-calculator]')?.addEventListener('click', () => {
    Object.values(fields).forEach(field => { field.value = ''; });
    calculate();
  });
}

const leadForm = document.querySelector('[data-lead-form]');
leadForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const status = leadForm.querySelector('[data-form-status]');
  if (!leadForm.checkValidity()) {
    leadForm.reportValidity();
    status.textContent = 'Please complete the required fields and consent checkbox.';
    return;
  }
  const data = Object.fromEntries(new FormData(leadForm).entries());
  const endpoint = leadForm.dataset.endpoint || '';
  const button = leadForm.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Preparing your enquiry…';
  track('generate_lead', { interest: data.interest || 'general' });
  try {
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Submission failed');
      window.location.href = '/thank-you';
      return;
    }
    const message = [
      'Hello, I would like a private presentation for Bellevue Residencies.',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      data.country ? `Country: ${data.country}` : '',
      `Interest: ${data.interest}`,
      data.message ? `Message: ${data.message}` : ''
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/94715150150?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    window.setTimeout(() => { window.location.href = '/thank-you'; }, 500);
  } catch (error) {
    button.disabled = false;
    status.textContent = 'We could not send that just now. Please call or use WhatsApp below.';
  }
});

document.querySelectorAll('a[href^="#enquire"],a[href*="wa.me"],a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => track('contact_intent', { destination: link.getAttribute('href') }));
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollRail = document.querySelector('[data-scroll-rail]');
const railLinks = document.querySelectorAll('[data-rail-target]');
if (scrollRail && railLinks.length) {
  const railSections = Array.from(railLinks).map(link => document.getElementById(link.dataset.railTarget)).filter(Boolean);
  const toggleRailVisibility = () => scrollRail.classList.toggle('visible', window.scrollY > window.innerHeight * .5);
  toggleRailVisibility();
  window.addEventListener('scroll', toggleRailVisibility, { passive: true });
  if ('IntersectionObserver' in window && railSections.length) {
    const railObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const link = document.querySelector(`[data-rail-target="${entry.target.id}"]`);
        if (!link) return;
        railLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
    railSections.forEach(section => railObserver.observe(section));
  }
}

const parallaxEls = document.querySelectorAll('[data-parallax]');
if (parallaxEls.length && !reduceMotion) {
  let ticking = false;
  const updateParallax = () => {
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const shift = Math.max(-40, Math.min(40, progress * -32));
      el.style.transform = `scale(1.08) translateY(${shift}px)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
  }, { passive: true });
  updateParallax();
}

const magnetTargets = document.querySelectorAll('[data-magnetic]');
if (magnetTargets.length && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
  magnetTargets.forEach(el => {
    const strength = .35;
    const resetMagnet = () => { el.style.transition = 'transform .5s var(--ease)'; el.style.transform = 'translate(0,0)'; };
    el.addEventListener('pointermove', event => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * strength;
      const y = (event.clientY - rect.top - rect.height / 2) * strength;
      el.style.transition = 'transform .1s linear';
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', resetMagnet);
    el.addEventListener('pointerup', resetMagnet);
  });
}
