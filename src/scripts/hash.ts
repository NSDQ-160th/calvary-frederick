const MORE = new Set(['believe', 'faith', 'gospel', 'ministries', 'care']);
const ALIAS: Record<string, string> = { faith: 'believe' };

function applyHash(): void {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return;
  if (MORE.has(raw)) {
    const more = document.getElementById('more');
    if (more instanceof HTMLDetailsElement) more.open = true;
  }
  const el = document.getElementById(ALIAS[raw] ?? raw);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', applyHash);
window.addEventListener('hashchange', applyHash);
