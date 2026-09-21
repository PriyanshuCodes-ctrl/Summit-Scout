/* ============================================================
   Summit Scout — detail.js  (trek.html only)
   ============================================================ */

function seasonStripHTML(r) {
  const active = new Set(parseSeasonMonths(r.season));
  const cells = MONTH_ABBR.map((m, i) => `<span class="${active.has(i) ? 'is-open' : ''}">${m}</span>`).join('');
  return `<div class="season-strip">${cells}</div>`;
}

function elevationSVG() {
  return `<svg viewBox="0 0 900 230" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="eg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="var(--rust-bright)"/><stop offset="100%" stop-color="var(--rust-bright)" stop-opacity="0"/></linearGradient></defs>
    <path d="M0 205 C80 190 100 150 170 168 C230 185 245 118 315 135 C380 150 395 92 455 112 C520 135 540 62 610 82 C690 105 720 35 780 62 C830 82 855 48 900 35 L900 230 L0 230 Z" fill="url(#eg)" opacity=".3"/>
    <path d="M0 205 C80 190 100 150 170 168 C230 185 245 118 315 135 C380 150 395 92 455 112 C520 135 540 62 610 82 C690 105 720 35 780 62 C830 82 855 48 900 35" fill="none" stroke="var(--glacier-bright)" stroke-width="4"/>
  </svg>`;
}

function explorerPreviewHTML(r) {
  return `<a class="explorer-cta" href="explorer.html?trek=${encodeURIComponent(r.name)}">
    <div class="explorer-cta-art" style="background-image:linear-gradient(160deg, rgba(21,19,14,.15), rgba(21,19,14,.85)), url('${r.img}')">
      <span class="explorer-cta-badge">3D route explorer</span>
    </div>
    <div class="explorer-cta-copy">
      <h3>Fly through ${esc(r.name)} in 3D</h3>
      <p class="muted">Rotate the terrain, jump between ${WAYPOINTS[r.name]?.length || 'each'} waypoints and fly straight to the summit marker.</p>
      <span class="route-link">Open the 3D Explorer</span>
    </div>
  </a>`;
}

function checklistHTML(r) {
  const done = new Set(getChecklist(r.name));
  const pct = Math.round((done.size / GEAR_CHECKLIST.length) * 100);
  return `<div class="checklist-progress"><div class="progress"><span style="width:${pct}%"></span></div><small>${done.size} / ${GEAR_CHECKLIST.length} packed</small></div>
  <div class="check-grid">${GEAR_CHECKLIST.map((x, i) => `<label class="check-item${done.has(i) ? ' done' : ''}"><input type="checkbox" data-check="${i}" ${done.has(i) ? 'checked' : ''}><span>${x}</span></label>`).join('')}</div>`;
}

function wireChecklist(r) {
  document.querySelectorAll('[data-check]').forEach(input => {
    input.addEventListener('change', () => {
      const done = new Set(toggleChecklistItem(r.name, Number(input.dataset.check)));
      input.parentElement.classList.toggle('done', input.checked);
      const pct = Math.round((done.size / GEAR_CHECKLIST.length) * 100);
      document.querySelector('.checklist-progress .progress span').style.width = pct + '%';
      document.querySelector('.checklist-progress small').textContent = `${done.size} / ${GEAR_CHECKLIST.length} packed`;
    });
  });
}

function relatedTreksHTML(r) {
  const rest = TREKS.filter(t => t.name !== r.name).sort((a, b) => Math.abs(a.score - r.score) - Math.abs(b.score - r.score)).slice(0, 3);
  return rest;
}

function renderDetail() {
  const r = getRouteFromQuery();
  const box = document.getElementById('detail');
  if (!box) return;
  document.title = `${r.name} | Summit Scout`;
  const terrain = r.score > 70 ? 'High-altitude mixed terrain' : r.score > 50 ? 'Alpine mountain terrain' : r.score > 35 ? 'Alpine meadow & trail' : 'Established mountain trail';
  const gain = Math.round(r.alt * 0.42 / 10) * 10;
  const saved = isTrekSaved(r.name);

  box.innerHTML = `
  <section class="detail-hero" style="background-image:linear-gradient(100deg, rgba(21,19,14,.94) 10%, rgba(21,19,14,.55) 55%, rgba(21,19,14,.15) 100%), url('${r.img}')">
    <div class="container detail-hero-inner">
      <div>
        <a class="back-link" href="treks.html">← All treks</a>
        <div class="field-tab">${esc(r.diff)} route · ${esc(r.region)}</div>
        <h1>${esc(r.name)}</h1>
        <p>${esc(r.highlight)}</p>
        <div class="detail-hero-actions">
          <button class="button button-secondary${saved ? ' is-saved' : ''}" id="saveDetail" data-save="${esc(r.name)}">${saved ? 'Saved to shortlist ✓' : '+ Save to shortlist'}</button>
          <a class="button button-secondary" href="compare.html?treks=${encodeURIComponent(r.name)}">Add to compare</a>
        </div>
      </div>
      <div class="hero-score">
        <small>Difficulty score</small>
        <strong>${r.score}</strong>
        <span>/ 100</span>
      </div>
    </div>
  </section>

  <main class="container detail-main">
    <div class="detail-grid">
      <section>
        <div class="stat-strip">
          <div><small>Max altitude</small><b>${r.alt.toLocaleString()} m</b></div>
          <div><small>Distance</small><b>${r.dist} km</b></div>
          <div><small>Duration</small><b>${r.days} days</b></div>
          <div><small>Route class</small><b>${r.diff}</b></div>
          <div><small>Start point</small><b>${esc(r.start)}</b></div>
          <div><small>Best season</small><b>${esc(r.season)}</b></div>
        </div>

        ${explorerPreviewHTML(r)}

        <div class="panel">
          <div class="field-tab">Route profile</div>
          <h2>Elevation &amp; planning profile</h2>
          <div class="elevation">${elevationSVG()}<div class="elevation-labels"><span>${esc(r.start)}</span><span>Mid-route</span><span>${r.alt.toLocaleString()} m high point</span></div></div>
          <div class="profile-grid">
            <div><small>Altitude gain</small><b>${gain.toLocaleString()} m*</b></div>
            <div><small>Terrain profile</small><b>${terrain}</b></div>
            <div><small>Field estimate</small><b>${r.days} trekking days</b></div>
          </div>
          <p class="footnote">*Altitude gain is a planning estimate in this demo and is not a verified route GPX measurement.</p>
        </div>

        <div class="panel">
          <div class="field-tab">Season &amp; permits</div>
          <h2>When to go</h2>
          <p class="muted large">${esc(r.name)} is typically trekked <b>${esc(r.season)}</b>. Conditions vary year to year — confirm with a local operator before booking.</p>
          ${seasonStripHTML(r)}
          <p class="footnote"><b>Permit note:</b> ${esc(r.permit)}. This is illustrative planning information, not a permit guarantee.</p>
        </div>

        <div class="panel" id="checklistPanel">
          <div class="field-tab">Preparation</div>
          <div class="title"><h2>Gear checklist</h2></div>
          ${checklistHTML(r)}
        </div>
      </section>

      <aside>
        <div class="panel sticky-card">
          <div class="field-tab">Plan this trek</div>
          <h2>Build your personal estimate</h2>
          <p class="muted large">Use your profile to calculate a route-specific score, calorie estimate, BMI and rough trip budget.</p>
          <a class="button button-primary full" href="planner.html?trek=${encodeURIComponent(r.name)}">Open trek planner</a>
          <a class="button button-secondary full" href="explorer.html?trek=${encodeURIComponent(r.name)}">Open 3D explorer</a>
        </div>
        <div class="panel">
          <div class="field-tab">Live context</div>
          <h2>Weather module</h2>
          <div class="weather-large"><strong>8°</strong><span>Partly cloudy</span></div>
          <div class="weather-list"><span>Wind <b>12 km/h</b></span><span>Humidity <b>68%</b></span><span>Visibility <b>10 km</b></span></div>
          <p class="footnote">Demo snapshot. Connect a weather API for live route conditions.</p>
        </div>
      </aside>
    </div>

    <div class="section-head">
      <div><div class="field-tab">You might also plan</div><h2>Treks of a similar profile</h2></div>
      <a class="muted" href="treks.html">Browse all treks →</a>
    </div>
    <div class="grid" id="relatedTreks"></div>
  </main>`;

  wireChecklist(r);
  wireSaveButtons(box);
  renderTrekGrid('relatedTreks', relatedTreksHTML(r));
}

document.addEventListener('DOMContentLoaded', renderDetail);
