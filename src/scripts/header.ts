const header = document.querySelector<HTMLElement>('[data-header]');
if (!header) {
  // Header is on every page; nothing to wire if markup is missing.
} else {
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const sheet = header.querySelector<HTMLElement>('[data-menu]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');

  const setOpen = (open: boolean) => {
    if (!toggle || !sheet) return;
    toggle.setAttribute('aria-expanded', String(open));
    sheet.hidden = !open;
    document.body.classList.toggle('is-menu-open', open);
    if (open) {
      const first = sheet.querySelector<HTMLElement>('a, button');
      first?.focus();
    } else {
      toggle.focus();
    }
  };

  toggle?.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  sheet?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
    if (event.key !== 'Tab' || !toggle || !sheet || sheet.hidden) return;
    const nodes = [...sheet.querySelectorAll<HTMLElement>('a, button')];
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  if (hero) {
    const sync = () => {
      const top = hero.getBoundingClientRect().top;
      const bottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle('is-over-hero', top < 72 && bottom > 0);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
  }
}
