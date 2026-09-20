/* ============================================================
   Summit Scout — nav.js
   Builds the header and footer once and injects them into
   every page's #site-header / #site-footer placeholders, so
   the site chrome lives in exactly one place.
   ============================================================ */

const NAV_LINKS = [
  { page: 'home', href: 'index.html', label: 'Home' },
  { page: 'treks', href: 'treks.html', label: 'Treks' },
  { page: 'explorer', href: 'explorer.html', label: '3D Explorer' },
  { page: 'compare', href: 'compare.html', label: 'Compare' },
  { page: 'planner', href: 'planner.html', label: 'Planner' },
  { page: 'dashboard', href: 'dashboard.html', label: 'Dashboard' },
  { page: 'about', href: 'about.html', label: 'About' }
];

const LOGOMARK = `<svg class="logo-mark" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M2 32 14 8l6 11 4-6 14 19H2Z" fill="url(#ssPeakFill)"/>
  <path d="M2 32 14 8l6 11 4-6 14 19" stroke="var(--parchment)" stroke-width="1.1" stroke-linejoin="round" opacity=".35"/>
  <path d="M8 22.5c4.2-1.6 8-1.6 12 .4 4-2 7.4-2 11.6-.2" stroke="var(--rust-bright)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <defs><linearGradient id="ssPeakFill" x1="2" y1="8" x2="36" y2="32" gradientUnits="userSpaceOnUse">
    <stop stop-color="var(--parchment)"/><stop offset="1" stop-color="var(--paper-dim)"/>
  </linearGradient></defs>
</svg>`;

function ctaForPage(page) {
  if (page === 'planner') return { href: 'treks.html', label: 'Browse treks' };
  if (page === 'explorer') return { href: 'planner.html', label: 'Plan this trek' };
  return { href: 'planner.html', label: 'Plan a trek' };
}

function headerHTML(activePage) {
  const cta = ctaForPage(activePage);
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}"${l.page === activePage ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`
  ).join('');
  return `
  <div class="container nav">
    <a class="logo" href="index.html" aria-label="Summit Scout home">
      ${LOGOMARK}
      <span class="logo-text"><strong>Summit <em>Scout</em></strong><small>Himalayan field intelligence</small></span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="primaryNav" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <nav id="primaryNav">${links}</nav>
    <div class="nav-right">
      <div class="weather-chip" title="Demo weather snapshot">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" stroke-linecap="round"/></svg>
        <span><b>16°C</b><small>Thane, MH</small></span>
      </div>
      <a class="button button-primary nav-cta" href="${cta.href}">${cta.label}</a>
    </div>
  </div>`;
}

function footerHTML() {
  return `
  <div class="container footer-grid">
    <div class="footer-brand">
      ${LOGOMARK}
      <p>Summit Scout is a route-planning concept for Himalayan treks — structured trek data, personal estimates and a 3D route explorer in one place.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="treks.html">All treks</a>
      <a href="explorer.html">3D Explorer</a>
      <a href="compare.html">Compare routes</a>
    </div>
    <div>
      <h4>Plan</h4>
      <a href="planner.html">Trek planner</a>
      <a href="dashboard.html">Dashboard</a>
    </div>
    <div>
      <h4>Project</h4>
      <a href="about.html">About Summit Scout</a>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>Summit Scout · Himalayan Field Intelligence</span>
    <span>Trek data on this site is illustrative and for demonstration only — always confirm routes, permits and conditions with local authorities before travel.</span>
  </div>`;
}

function injectChrome() {
  const page = document.body.dataset.page || '';
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = headerHTML(page);
  if (footer) footer.innerHTML = footerHTML();

  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    addEventListener('keydown', e => {
      if (e.key === 'Escape') { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  let lastScrollY = window.scrollY;
  const headerEl = document.querySelector('header');
  if (headerEl) {
    addEventListener('scroll', () => {
      headerEl.classList.toggle('is-scrolled', window.scrollY > 8);
      lastScrollY = window.scrollY;
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', injectChrome);
