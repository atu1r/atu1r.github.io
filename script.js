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

// ---- Project detail modals ----
document.querySelectorAll('.project-card[data-project]').forEach((card) => {
  const dialog = document.getElementById('modal-' + card.dataset.project);
  if (!dialog) return;

  const open = () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
  };

  card.addEventListener('click', (e) => {
    // Let real links inside the card (e.g. the GitHub icon) behave normally.
    if (e.target.closest('a')) return;
    open();
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  // Close via the X button.
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());

  // Close when clicking the backdrop (outside the content box).
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // Pause any playing video when the dialog closes.
  dialog.addEventListener('close', () => {
    dialog.querySelectorAll('video').forEach((v) => v.pause());
  });

  // Drop media that isn't present yet so the layout stays clean.
  const mediaBox = dialog.querySelector('[data-media]');
  const dropMedia = (el) => {
    el.remove();
    if (mediaBox && !mediaBox.querySelector('img, video')) mediaBox.style.display = 'none';
  };
  dialog.querySelectorAll('.modal-shot').forEach((img) => {
    img.addEventListener('error', () => dropMedia(img));
  });
  dialog.querySelectorAll('.modal-video').forEach((video) => {
    video.addEventListener('error', () => dropMedia(video));
    video.querySelectorAll('source').forEach((s) =>
      s.addEventListener('error', () => {
        if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) dropMedia(video);
      })
    );
  });
});

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
