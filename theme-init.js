// Apply a stored choice before CSS. A first visit always uses the light theme.
(() => {
  let theme = 'light';
  try { if (localStorage.getItem('opengate-theme') === 'dark') theme = 'dark'; } catch {}
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
