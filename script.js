// ---- Mobile nav toggle ----
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close the menu when a link is tapped
navLinks.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// ---- Header border on scroll ----
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Reveal sections on scroll ----
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.section, .hero');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((el) => el.classList.add('visible'));
} else {
  revealItems.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => observer.observe(el));
}

// ---- Set current year (if needed elsewhere) ----
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Boot / typing reveal in the hero terminal ----
const boot = document.getElementById('boot');
if (boot && !reduceMotion) {
  // Reveal each top-level line in sequence for a "booting" feel.
  const lines = Array.from(boot.children);
  lines.forEach((el) => (el.style.opacity = '0'));
  let i = 0;
  const revealNext = () => {
    if (i >= lines.length) return;
    const el = lines[i++];
    el.style.transition = 'opacity 0.25s ease';
    el.style.opacity = '1';
    // Prompt/command lines tick faster; content lines linger a touch longer.
    const delay = el.classList.contains('boot-line') ? 260 : 420;
    setTimeout(revealNext, delay);
  };
  revealNext();
}

// ---- Theme toggle (light / dark) ----
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const isLight = () => root.getAttribute('data-theme') === 'light';

const syncThemeBtn = () => {
  if (!themeBtn) return;
  const label = themeBtn.querySelector('.theme-toggle-label');
  const icon = themeBtn.querySelector('.theme-toggle-icon');
  if (label) label.textContent = isLight() ? 'light' : 'dark';
  if (icon) icon.textContent = isLight() ? '◑' : '◐';
  themeBtn.setAttribute('aria-pressed', String(isLight()));
};
syncThemeBtn();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = isLight() ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeBtn();
  });
}

// ---- Matrix rain backdrop ----
const canvas = document.querySelector('.matrix-canvas');
if (canvas && !reduceMotion && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  const glyphs = 'アカサタナハマヤラワ0123456789ABCDEF<>/{}[]=$#*+';
  const fontSize = 16;
  let columns, drops, dpr;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.ceil(window.innerWidth / fontSize);
    drops = Array.from({ length: columns }, () =>
      Math.floor((Math.random() * window.innerHeight) / fontSize)
    );
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let last = 0;
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (isLight()) return;          // matrix is dark-mode only
    if (now - last < 70) return;    // throttle to ~14fps for a slow rain
    last = now;

    ctx.fillStyle = 'rgba(10, 14, 20, 0.18)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = fontSize + 'px monospace';

    for (let x = 0; x < columns; x++) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const y = drops[x] * fontSize;
      // Lead glyph bright green, trail dimmer.
      ctx.fillStyle = Math.random() > 0.975 ? '#b9f5c5' : '#6ee787';
      ctx.fillText(ch, x * fontSize, y);
      if (y > window.innerHeight && Math.random() > 0.975) drops[x] = 0;
      drops[x]++;
    }
  };
  requestAnimationFrame(frame);
}
