/* OpenGate shared interactions. All content and navigation are rendered in HTML. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('enhanced');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 680px)');
  const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const booking = 'https://outlook.office.com/book/DiscoveryCall30minutes@morbit.co.uk/';
  const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

  // The head script applies the saved choice before first paint.
  const themeToggle = document.querySelector('.theme-toggle');
  function setTheme(theme, save = true) {
    theme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (save) { try { localStorage.setItem('opengate-theme', theme); } catch {} }
    const label = 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode';
    themeToggle?.setAttribute('aria-label', label);
    themeToggle?.setAttribute('title', label);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101e25' : '#faf9f6');
  }
  setTheme(root.dataset.theme, false);
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
  window.addEventListener('storage', event => {
    if (event.key === 'opengate-theme') setTheme(event.newValue, false);
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const menus = [...document.querySelectorAll('.nav-menu')];
  const timers = new WeakMap();
  function setMenu(menu, open) {
    clearTimeout(timers.get(menu));
    menu.classList.toggle('open', open);
    menu.querySelector('.nav-trigger').setAttribute('aria-expanded', String(open));
  }
  function closeMenus(except = null) { menus.forEach(menu => { if (menu !== except) setMenu(menu, false); }); }
  function setMobileMenu(open, returnFocus = false) {
    header.classList.toggle('mobile-open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuToggle.innerHTML = open
      ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>'
      : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>';
    if (!open) { closeMenus(); if (returnFocus) menuToggle.focus(); }
  }
  menuToggle?.addEventListener('click', () => setMobileMenu(!header.classList.contains('mobile-open')));
  menus.forEach(menu => {
    const trigger = menu.querySelector('.nav-trigger');
    trigger.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      closeMenus(menu);
      setMenu(menu, open);
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); closeMenus(menu); setMenu(menu, true);
        menu.querySelector('.dropdown a')?.focus();
      }
    });
    menu.addEventListener('pointerenter', event => {
      if (!mobile.matches && event.pointerType !== 'touch') { closeMenus(menu); setMenu(menu, true); }
    });
    menu.addEventListener('pointerleave', () => {
      if (!mobile.matches) timers.set(menu, setTimeout(() => {
        if (!menu.contains(document.activeElement)) setMenu(menu, false);
      }, 200));
    });
    menu.addEventListener('focusin', () => clearTimeout(timers.get(menu)));
    menu.addEventListener('focusout', event => {
      if (!menu.contains(event.relatedTarget)) setMenu(menu, false);
    });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        event.stopPropagation(); setMenu(menu, false); trigger.focus();
      }
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-menu')) closeMenus();
    if (mobile.matches && header.classList.contains('mobile-open') && !event.composedPath().includes(header)) setMobileMenu(false);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobileMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenus();
      if (header.classList.contains('mobile-open')) setMobileMenu(false, true);
    }
    // Trap focus in the open mobile header. Escape always returns to its toggle.
    if (event.key === 'Tab' && mobile.matches && header.classList.contains('mobile-open')) {
      const items = [...header.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => setMobileMenu(false));
  nav?.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.setAttribute('aria-current', 'page'); a.classList.add('active');
      a.closest('.nav-menu')?.querySelector('.nav-trigger')?.classList.add('active');
    }
  });

  // Fully keyboard-operable tabs with a single tab stop.
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    function select(tab, focus = false) {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        panel.hidden = !active;
      });
      if (focus) tab.focus();
      window.ScrollTrigger?.refresh();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(tabs[next], true); }
      });
    });
  });

  document.querySelectorAll('[data-comparison]').forEach(stage => {
    const range = stage.querySelector('input[type="range"]');
    const update = () => {
      stage.style.setProperty('--reveal-position', range.value + '%');
      range.setAttribute('aria-valuetext', (100 - Number(range.value)) + ' percent of the vision revealed');
    };
    range.addEventListener('input', update);
    update();
  });

  document.querySelector('[data-load-map]')?.addEventListener('click', () => {
    const container = document.querySelector('[data-map-container]');
    const frame = document.createElement('iframe');
    frame.className = 'live-map';
    frame.title = 'OpenStreetMap of Ja-Ela, Sri Lanka';
    frame.src = 'https://www.openstreetmap.org/export/embed.html?bbox=79.817%2C7.018%2C79.969%2C7.131&layer=mapnik&marker=7.0744%2C79.8919';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    container.replaceWith(frame);
    frame.focus();
  });

  // A small CTA appears only once the opening section has passed, and hides at contact.
  if (!document.body.hasAttribute('data-no-sticky-cta')) {
    const sticky = document.createElement('a');
    sticky.className = 'sticky-mobile-cta';
    sticky.href = booking; sticky.target = '_blank'; sticky.rel = 'noopener';
    sticky.innerHTML = '<span>Book a discovery call</span>' + arrow;
    sticky.hidden = true;
    document.body.appendChild(sticky);
    const hero = document.querySelector('.home-hero,.page-hero,.page-intro,.utility-hero');
    const contact = document.querySelector('.contact-section');
    let heroPassed = false, contactVisible = false;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 95;
          if (entry.target === contact) contactVisible = entry.isIntersecting;
        });
        sticky.hidden = !heroPassed || contactVisible;
      }, { threshold: 0, rootMargin: '-90px 0px 0px 0px' });
      if (hero) observer.observe(hero);
      if (contact) observer.observe(contact);
    }
  }

  // Short, once-only reveals. No parallax, auto-scrolling, or permanently hidden text.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      document.querySelectorAll('[data-reveal]').forEach(item => {
        gsap.from(item, {
          y: 14, opacity: 0, duration: .55, ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: item, start: 'top 96%', once: true }
        });
      });
    });
  }

  // Preserve the existing analytics wiring. GA4 only runs with a configured property.
  const local = ['localhost','127.0.0.1','::1'].includes(location.hostname);
  if (!local) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    const script = document.createElement('script');
    script.defer = true; script.src = '/_vercel/insights/script.js';
    script.dataset.opengateAnalytics = 'true'; document.head.appendChild(script);
  }
  const googleAnalyticsId = '';
  if (!local && /^G-[A-Z0-9]+$/.test(googleAnalyticsId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', googleAnalyticsId, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(googleAnalyticsId);
    document.head.appendChild(script);
  }
  document.querySelectorAll('a[href*="outlook.office.com/book/"]').forEach(link => {
    link.addEventListener('click', () => {
      const source = link.classList.contains('sticky-mobile-cta') ? 'sticky_mobile_cta' : 'discovery_call_cta';
      window.va?.('event', { name: 'Book Discovery Call', data: { source } });
      window.gtag?.('event', 'generate_lead', { event_category: 'engagement', event_label: source });
    });
  });
})();
