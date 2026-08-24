(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  if (menuButton && menu) {
    const setMenu = (open) => {
      menuButton.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      if (open) menu.querySelector('a')?.focus();
    };
    menuButton.addEventListener('click', () => setMenu(menu.hidden));
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); } });
  }
  const entries = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((items, currentObserver) => {
      items.forEach((item) => { if (item.isIntersecting) { item.target.classList.add('is-visible'); currentObserver.unobserve(item.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    entries.forEach((entry) => observer.observe(entry));
  } else {
    entries.forEach((entry) => entry.classList.add('is-visible'));
  }
})();
