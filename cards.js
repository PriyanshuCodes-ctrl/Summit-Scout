/* ============================================================
   Summit Scout — cards.js
   The "route index card" — the one card type reused across the
   site — plus the save/shortlist toggle that powers it.
   ============================================================ */

const BOOKMARK_SVG = `<svg viewBox="0 0 20 24" width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 1.5h16a.5.5 0 0 1 .5.5v20.2c0 .43-.5.66-.83.38L10 15.9l-7.67 6.68a.5.5 0 0 1-.83-.38V2a.5.5 0 0 1 .5-.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`;

function meterHTML(trek) {
  const pct = Math.max(4, Math.min(100, trek.score));
  return `<div class="route-meter" title="Difficulty score ${trek.score.toFixed(1)} of 100">
    <div class="meter-track"><div class="meter-fill ${tierClass(trek.diff)}" style="width:${pct}%"></div></div>
    <span>${trek.score.toFixed(1)} difficulty score</span>
  </div>`;
}

function routeCardHTML(trek) {
  const saved = isTrekSaved(trek.name);
  return `<article class="route-card">
    <div class="route-card-media">
      <a href="trek.html?trek=${encodeURIComponent(trek.name)}" tabindex="-1" aria-hidden="true">
        <img src="${trek.img}" alt="${esc(trek.name)} mountain landscape" loading="lazy" onerror="this.src='${imgFallback}'">
      </a>
      <span class="media-overlay"></span>
      <button class="save-toggle${saved ? ' is-saved' : ''}" data-save="${esc(trek.name)}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from shortlist' : 'Save to shortlist'}">${BOOKMARK_SVG}</button>
      <span class="tier-chip ${tierClass(trek.diff)}"><i></i>${trek.diff}</span>
    </div>
    <div class="route-card-body">
      <a class="route-card-head" href="trek.html?trek=${encodeURIComponent(trek.name)}">
        <h3>${esc(trek.name)}</h3>
        <span class="route-region">${esc(trek.region)}</span>
      </a>
      <p class="route-highlight">${esc(trek.highlight)}</p>
      <div class="route-stats">
        <div><b>${trek.alt.toLocaleString()} m</b><small>Altitude</small></div>
        <div><b>${trek.dist} km</b><small>Distance</small></div>
        <div><b>${trek.days} days</b><small>Duration</small></div>
      </div>
      ${meterHTML(trek)}
      <a class="route-link" href="trek.html?trek=${encodeURIComponent(trek.name)}">View route dossier</a>
    </div>
  </article>`;
}

function wireSaveButtons(scope) {
  (scope || document).querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const name = btn.dataset.save;
      const nowSaved = toggleTrekSaved(name);
      btn.classList.toggle('is-saved', nowSaved);
      btn.setAttribute('aria-pressed', String(nowSaved));
      btn.setAttribute('aria-label', nowSaved ? 'Remove from shortlist' : 'Save to shortlist');
      if (!btn.childElementCount) btn.textContent = nowSaved ? 'Saved ✓' : 'Save';
      document.dispatchEvent(new CustomEvent('ss:shortlist-changed'));
    });
  });
}

function renderTrekGrid(containerId, list) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = list.map(routeCardHTML).join('') ||
    `<div class="empty-state"><h3>No treks match yet</h3><p>Try widening the altitude, duration or difficulty filters.</p></div>`;
  wireSaveButtons(box);
}
