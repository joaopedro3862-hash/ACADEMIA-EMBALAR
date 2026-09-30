(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const backToTop = document.querySelector('[data-back-to-top]');
  const yearElements = document.querySelectorAll('[data-current-year]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menu || !menuButton) return;
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  };

  const openMenu = () => {
    if (!menu || !menuButton) return;
    menu.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
    body.classList.add('menu-open');
    menu.querySelector('a')?.focus();
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
  });

  const updateScrollState = () => {
    const hasScrolled = window.scrollY > 24;
    header?.classList.toggle('is-scrolled', hasScrolled);
    if (backToTop) backToTop.hidden = window.scrollY < 640;
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  const revealElements = document.querySelectorAll('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealElements.forEach((element) => observer.observe(element));
  }

  const video = document.querySelector('[data-hero-video]');
  const videoFallback = document.querySelector('[data-video-fallback]');
  video?.addEventListener('error', () => {
    video.hidden = true;
    if (videoFallback) videoFallback.hidden = false;
  }, true);

})();

(() => { const button = document.querySelector('[data-sponsor-pause]'); const section = document.querySelector('.sponsors'); if (!button || !section) return; button.addEventListener('click', () => { const paused = section.classList.toggle('is-paused'); button.setAttribute('aria-pressed', String(paused)); button.textContent = paused ? 'Retomar movimento' : 'Pausar movimento'; }); })();

(() => {
 const ribbon = document.querySelector('.partners-ribbon');
 const button = document.querySelector('.partners-pause');
 if (!ribbon || !button) return;
 button.addEventListener('click', () => {
  const paused = ribbon.classList.toggle('is-paused');
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', paused ? 'Retomar animação dos parceiros' : 'Pausar animação dos parceiros');
  button.textContent = paused ? '▶' : 'Ⅱ';
 });
})();
