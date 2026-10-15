// src/components/palette.js
/**
 * Theme-aware monochrome palette for canvas drawing.
 * Values are read from the --chart-* CSS custom properties and cached per theme.
 */

const cache = { theme: null, values: null };

function readVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function current() {
  const theme = document.documentElement.getAttribute('data-theme') || '';
  if (!cache.values || cache.theme !== theme) {
    cache.theme = theme;
    cache.values = {
      ink: readVar('--chart-ink', '#fafafa'),
      c2: readVar('--chart-2', '#a3a3a3'),
      c3: readVar('--chart-3', '#6b6b6b'),
      grid: readVar('--chart-grid', '#2a2a2a'),
      muted: readVar('--chart-muted', '#7a7a7a'),
      bg: readVar('--chart-bg', '#000000')
    };
  }
  return cache.values;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function alpha(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const C = {
  get ink() { return current().ink; },
  get c2() { return current().c2; },
  get c3() { return current().c3; },
  get grid() { return current().grid; },
  get muted() { return current().muted; },
  get bg() { return current().bg; },
  a(a) { return alpha(current().ink, a); },
  a3(a) { return alpha(current().c3, a); },
  a2(a) { return alpha(current().c2, a); }
};
