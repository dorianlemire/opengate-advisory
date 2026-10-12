/* Optional analytics uses basic consent: no analytics scripts or requests before opt-in. */
(() => {
  'use strict';
  const key = 'opengate-privacy';
  const version = 1;
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  // Add an owner-provided ID only alongside an updated policy and preference description.
  const googleAnalyticsId = '';
  const hasGoogle = /^G-[A-Z0-9]+$/.test(googleAnalyticsId);
  const local = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  const banner = document.querySelector('.privacy-banner');
  const dialog = document.getElementById('privacy-settings');
  const checkbox = document.getElementById('analytics-choice');
  let returnFocus;
  let loaded = false;
  let choice = readChoice();

  function readChoice() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      if (value?.version === version && typeof value.analytics === 'boolean' && Number.isFinite(value.savedAt) && value.savedAt <= Date.now() && Date.now() - value.savedAt < lifetime) return value;
    } catch {}
    return null;
  }
  function allowed() { return choice?.analytics === true && Date.now() - choice.savedAt < lifetime; }
  function showBanner(show) {
    banner.hidden = !show;
    document.documentElement.classList.toggle('privacy-pending', show);
  }
  function appendScript(src) {
    const script = document.createElement('script');
    script.defer = true;
    script.src = src;
    script.dataset.opengateAnalytics = 'true';
    document.head.appendChild(script);
  }
  function startAnalytics() {
    if (local || loaded || !allowed()) return;
    loaded = true;
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    // Exclude query strings, fragments and referrer details from page-view payloads.
    window.va('beforeSend', event => {
      if (!allowed()) return null;
      const clean = { ...event };
      if (clean.url) { const url = new URL(clean.url, location.origin); clean.url = url.origin + url.pathname; }
      if ('referrer' in clean) clean.referrer = '';
      return clean;
    });
    appendScript('/_vercel/insights/script.js');
    if (hasGoogle) {
      window['ga-disable-' + googleAnalyticsId] = false;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied' });
      window.gtag('consent', 'update', { analytics_storage:'granted' });
      window.gtag('js', new Date());
      window.gtag('config', googleAnalyticsId, { allow_google_signals:false, allow_ad_personalization_signals:false, page_location:location.origin + location.pathname, page_referrer:'' });
      appendScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(googleAnalyticsId));
    }
  }
  function clearAnalyticsCookies() {
    // Clear only this integration's GA cookies; never clear unrelated site preferences.
    const domains = [null, location.hostname, '.' + location.hostname, '.opengate-advisory.com'];
    const names = document.cookie.split(';').map(item => item.trim().split('=')[0]).filter(name => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
    for (const name of names) for (const domain of domains) document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
  }
  function stopAnalytics(reload = true) {
    if (hasGoogle) window['ga-disable-' + googleAnalyticsId] = true;
    clearAnalyticsCookies();
    // A reload removes already-loaded vendor listeners as well as script elements.
    document.querySelectorAll('script[data-opengate-analytics]').forEach(script => script.remove());
    if (loaded && reload) location.reload();
  }
  function closeSettings() {
    if (dialog.open) dialog.close();
  }
  function save(analytics) {
    choice = { version, analytics, savedAt:Date.now() };
    let saved = false;
    try { localStorage.setItem(key, JSON.stringify(choice)); saved = true; } catch {}
    showBanner(false);
    closeSettings();
    if (analytics) startAnalytics(); else stopAnalytics(saved);
  }
  document.querySelectorAll('[data-privacy-settings]').forEach(button => button.addEventListener('click', () => {
    returnFocus = button;
    checkbox.checked = allowed();
    dialog.showModal();
    dialog.querySelector('[data-privacy-close]').focus();
  }));
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => save(button.dataset.consent === 'accept')));
  dialog.querySelector('[data-consent-save]').addEventListener('click', () => save(checkbox.checked));
  dialog.querySelector('[data-privacy-close]').addEventListener('click', closeSettings);
  dialog.addEventListener('close', () => {
    const target = returnFocus?.getClientRects().length ? returnFocus : document.querySelector('.footer-links [data-privacy-settings]');
    target?.focus({ preventScroll:true });
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = readChoice();
    showBanner(!choice);
    if (allowed()) startAnalytics(); else stopAnalytics();
  });
  // Re-check expiry when returning to a tab or a browser back/forward cache entry.
  function recheck() {
    if (choice && Date.now() - choice.savedAt >= lifetime) {
      choice = null; showBanner(true); stopAnalytics();
    }
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) recheck(); });
  window.addEventListener('pageshow', recheck);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !allowed() || local) return;
    let name;
    if (link.href.includes('outlook.office.com/book/')) name = 'booking_link_click';
    else if (link.protocol === 'mailto:') name = 'email_link_click';
    if (!name) return;
    const source = link.classList.contains('sticky-mobile-cta') ? 'mobile_cta' : link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'page';
    window.va?.('event', { name, data:{ source } });
    window.gtag?.('event', name, { source });
  });
  showBanner(!choice);
  if (allowed()) startAnalytics(); else clearAnalyticsCookies();
})();
