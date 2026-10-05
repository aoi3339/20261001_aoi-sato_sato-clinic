(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#global-nav');
  if (!button || !nav) return;
  const mobile = window.matchMedia('(max-width: 768px)');
  const content = [...document.querySelectorAll('main, .site-footer')];
  let scrollPosition = 0;
  let open = false;

  function closeMenu(restoreFocus = true) {
    if (!open) return;
    open = false;
    nav.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'メニューを開く');
    button.querySelector('.menu-toggle-label').textContent = 'MENU';
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    content.forEach((element) => { element.inert = false; });
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    if (restoreFocus) button.focus();
  }

  function openMenu() {
    if (!mobile.matches) return;
    scrollPosition = window.scrollY;
    open = true;
    nav.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'メニューを閉じる');
    button.querySelector('.menu-toggle-label').textContent = 'CLOSE';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('menu-open');
    content.forEach((element) => { element.inert = true; });
    nav.querySelector('.mobile-nav-links a').focus();
  }

  function updateViewport() {
    if (!mobile.matches) closeMenu(false);
    button.hidden = !mobile.matches;
  }

  button.addEventListener('click', () => open ? closeMenu() : openMenu());
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    } else if (event.key === 'Tab') {
      const items = [button, ...nav.querySelectorAll('.mobile-nav-links a')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  mobile.addEventListener('change', updateViewport);
  window.addEventListener('resize', updateViewport);
  window.addEventListener('pageshow', () => closeMenu(false));
  document.body.classList.add('nav-ready');
  updateViewport();
})();
