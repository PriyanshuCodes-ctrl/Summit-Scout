/* ============================================================
   Summit Scout — home.js  (index.html only)
   ============================================================ */

const CURATED_HOME = ['Rupin Pass', 'Kedarkantha', 'Markha Valley', 'Roopkund', 'Hampta Pass'];

function renderFeatured() {
  const box = document.getElementById('featuredRoute');
  if (!box) return;
  const r = getTrekByName('Rupin Pass');
  box.innerHTML = `
    <img src="${r.img}" alt="${esc(r.name)} mountain landscape">
    <div class="plate-head">
      <div>
        <span class="plate-eyebrow">Featured route</span>
        <h2>${esc(r.name)}</h2>
        <p class="muted">${esc(r.region)}</p>
      </div>
      <span class="tier-chip ${tierClass(r.diff)}"><i></i>${r.diff}</span>
    </div>
    <div class="plate-stats">
      <div><strong>${r.alt.toLocaleString()} m</strong><small>Max altitude</small></div>
      <div><strong>${r.dist} km</strong><small>Distance</small></div>
      <div><strong>${r.days} days</strong><small>Duration</small></div>
    </div>
    <a class="button button-primary full" href="trek.html?trek=${encodeURIComponent(r.name)}">View route dossier</a>`;
}

function renderCuratedGrid() {
  renderTrekGrid('curatedTreks', CURATED_HOME.map(getTrekByName));
}

function setupFindTrek() {
  const form = document.getElementById('findTrek');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const level = form.level.value, max = Number(form.altitude.value), days = Number(form.days.value);
    let list = TREKS.filter(r => (level === 'Any' || r.diff === level) && r.alt <= max && r.days <= days);
    let matched = true;
    if (!list.length) {
      matched = false;
      list = TREKS.filter(r => r.alt <= max).sort((a, b) => Math.abs(a.days - days) - Math.abs(b.days - days)).slice(0, 3);
    } else {
      list.sort((a, b) => Math.abs(a.days - days) - Math.abs(b.days - days));
    }
    const pick = list[0];
    const out = document.getElementById('findResult');
    if (!pick || !out) return;
    out.innerHTML = `<div class="recommendation">
      <div>
        <span class="plate-eyebrow">${matched ? 'Recommended route' : 'Closest available match'}</span>
        <h3>${esc(pick.name)}</h3>
        <p class="muted">${esc(pick.region)} · ${pick.alt.toLocaleString()} m · ${pick.days} days · ${esc(pick.season)}</p>
      </div>
      <div class="recommendation-actions">
        <a class="button button-secondary" href="#" data-save="${esc(pick.name)}">Save</a>
        <a class="button button-primary" href="trek.html?trek=${encodeURIComponent(pick.name)}">View route</a>
      </div>
    </div>`;
    wireSaveButtons(out);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderCuratedGrid();
  setupFindTrek();
});
