/* Dimensional polish. Native scrolling and a completely static reduced-motion mode. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const progress = document.createElement('span');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  header?.append(progress);
  let frame = 0;
  let updateStage = () => {};
  function updateScroll() {
    updateStage();
    const max = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty('--reading-progress', max > 0 ? String(Math.min(1, Math.max(0, scrollY / max))) : '0');
    root.classList.toggle('scrolled', scrollY > 25);
    frame = 0;
  }
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();

  const hero = document.querySelector('.home-hero');
  let pointerFrame = 0;
  hero?.addEventListener('pointermove', event => {
    if (reduced.matches || !pointer.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const box = hero.getBoundingClientRect();
      hero.style.setProperty('--gate-x', ((event.clientX - box.left) / box.width * 14 - 7) + 'px');
      hero.style.setProperty('--gate-y', ((event.clientY - box.top) / box.height * 10 - 5) + 'px');
    });
  });
  const resetHero = () => { cancelAnimationFrame(pointerFrame); hero?.style.removeProperty('--gate-x'); hero?.style.removeProperty('--gate-y'); };
  hero?.addEventListener('pointerleave', resetHero);

  // Reveal only short editorial groups; content is visible before enhancement and without JS.
  const targets = [...document.querySelectorAll('.section-head,.about-statement>div,.principle,.pd-deployment-intro,.pd-security-layout>div:first-child,.morbit-outcome')].filter(el => !el.hasAttribute('data-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reduced.matches) return;
      entry.target.animate([{ opacity: .3, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  }, { threshold: .12 });
  targets.forEach(el => observer.observe(el));

  const intro = document.querySelector('.home-hero .container,.morbit-hero-copy');
  if (intro && !reduced.matches) {
    [...intro.children].forEach((el, index) => el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 750, delay: Math.min(index * 65, 260), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }));
  }

  // A small amount of scroll-linked perspective, only on larger screens. No pinning.
  let scrollContext;
  if (window.gsap && window.ScrollTrigger) {
    scrollContext = gsap.matchMedia();
    scrollContext.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const photograph = document.querySelector('.event-hero-photo .image-zoom');
      if (photograph) gsap.fromTo(photograph, { scale: .94, rotationX: 4 }, { scale: 1, rotationX: 0, ease: 'none', scrollTrigger: { trigger: photograph, start: 'top 97%', end: 'center 63%', scrub: .6 } });
    });
  }
  // The product stage uses the existing passive RAF loop, avoiding an animation
  // library download on the Morbit route. Measure its stable parent, not its transform.
  const screen = document.querySelector('.morbit-product-stage');
  const stageSpace = screen?.closest('.morbit-product-wrap');
  if (screen && stageSpace) {
    const stageMotion = matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    updateStage = () => {
      if (!stageMotion.matches) { screen.style.removeProperty('transform'); return; }
      const start = innerHeight * .95;
      const end = innerHeight * .62 - screen.offsetHeight / 2;
      const progress = Math.min(1, Math.max(0, (start - stageSpace.getBoundingClientRect().top) / (start - end)));
      const remaining = 1 - progress;
      screen.style.transform = `translateY(${20 * remaining}px) rotateX(${5 * remaining}deg) scale(${1 - .04 * remaining})`;
    };
    stageMotion.addEventListener('change', updateStage);
    window.addEventListener('load', updateStage, {once:true});
    updateStage();
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      resetHero();
      document.querySelectorAll('main *').forEach(el => el.getAnimations().forEach(animation => animation.cancel()));
    }
  });
})();
