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

// ---- App bar elevation on scroll ----
const header = document.querySelector('.app-bar');
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

// ---- Set current year ----
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Theme toggle (light / dark) ----
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const isLight = () => root.getAttribute('data-theme') === 'light';

const syncThemeBtn = () => {
  if (!themeBtn) return;
  const icon = themeBtn.querySelector('.theme-toggle-icon');
  // Show the icon for the mode you'd switch *to*.
  if (icon) icon.textContent = isLight() ? 'dark_mode' : 'light_mode';
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
