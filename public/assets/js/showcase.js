/* Real product previews and event photography. No account data or remote embeds. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  document.querySelectorAll('[data-select-tab]').forEach(link => {
    link.addEventListener('click', () => {
      const tab = document.getElementById(link.dataset.selectTab);
      if (!tab) return;
      tab.click();
      tab.focus({ preventScroll: true });
    });
  });

  // A small, pointer-driven change in perspective. Never auto-rotates or captures scroll.
  document.querySelectorAll('[data-depth]').forEach(stage => {
    const reset = () => {
      stage.style.removeProperty('--tilt-x');
      stage.style.removeProperty('--tilt-y');
    };
    let frame = 0;
    stage.addEventListener('pointermove', event => {
      if (reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        stage.style.setProperty('--tilt-x', ((.5 - (event.clientY - rect.top) / rect.height) * 5).toFixed(2) + 'deg');
        stage.style.setProperty('--tilt-y', (((event.clientX - rect.left) / rect.width - .5) * 5).toFixed(2) + 'deg');
      });
    });
    stage.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); reset(); });
    reduced.addEventListener('change', reset);
  });

  document.querySelectorAll('[data-tabs]').forEach(group => {
    group.addEventListener('showcase:change', event => {
      if (reduced.matches) return;
      const panel = document.getElementById(event.detail.tab.getAttribute('aria-controls'));
      if (!panel) return;
      panel.getAnimations().forEach(animation => animation.cancel());
      panel.animate([{ opacity: .3, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'cubic-bezier(.2,.7,.3,1)' });
    });
  });

  document.querySelectorAll('.pd-scenario').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.pd-scenario').forEach(other => { if (other !== detail) other.open = false; });
    });
  });

  // Native dialog supplies focus containment, Escape dismissal and focus restoration.
  let dialog;
  document.querySelectorAll('[data-image-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.className = 'photo-dialog';
        dialog.setAttribute('aria-labelledby', 'photo-dialog-title');
        dialog.innerHTML = '<div class="photo-dialog-top"><h2 id="photo-dialog-title">A closer look</h2><form method="dialog"><button type="submit" autofocus aria-label="Close image">Close <span aria-hidden="true">×</span></button></form></div><img alt=""><p class="photo-dialog-caption"></p>';
        document.body.append(dialog);
        dialog.addEventListener('click', event => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
        });
      }
      const image = dialog.querySelector('img');
      image.src = button.dataset.imageZoom;
      image.alt = button.querySelector('img')?.alt || button.dataset.caption || '';
      dialog.querySelector('.photo-dialog-caption').textContent = button.dataset.caption || '';
      dialog.showModal();
    });
  });
})();
