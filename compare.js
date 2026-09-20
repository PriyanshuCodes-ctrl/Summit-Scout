/* ============================================================
   Summit Scout — compare.js  (compare.html only)
   ============================================================ */

const COMPARE_MAX = 3;

function compareSelection() {
  const p = new URLSearchParams(location.search).get('treks') || '';
  return p.split(',').map(s => s.trim()).filter(Boolean).map(getTrekByName).filter(Boolean).slice(0, COMPARE_MAX);
}

function pushCompareState(names) {
  const p = new URLSearchParams();
  if (names.length) p.set('treks', names.join(','));
  const qs = p.toString();
  history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
}

function barRow(label, unit, getVal, max, treks) {
  return `<div class="compare-bar-row">
    <span class="compare-bar-label">${label}</span>
    <div class="compare-bar-set">
      ${treks.map(t => `<div class="compare-bar" title="${esc(t.name)}: ${getVal(t)}${unit}">
        <div class="compare-bar-track"><div class="compare-bar-fill" style="width:${Math.max(6, (getVal(t) / max) * 100)}%"></div></div>
        <small>${getVal(t).toLocaleString()}${unit}</small>
      </div>`).join('')}
    </div>
  </div>`;
}

function renderPicker(selectedNames) {
  const box = document.getElementById('comparePicker');
  if (!box) return;
  const atMax = selectedNames.length >= COMPARE_MAX;
  box.innerHTML = TREKS.map(t => {
    const on = selectedNames.includes(t.name);
    const disabled = !on && atMax;
    return `<button type="button" class="compare-chip${on ? ' is-on' : ''}${disabled ? ' is-disabled' : ''}" data-compare-toggle="${esc(t.name)}" ${disabled ? 'disabled' : ''}>
      <img src="${t.img}" alt="" loading="lazy" onerror="this.src='${imgFallback}'">
      <span>
        <strong>${esc(t.name)}</strong>
        <small>${esc(t.region)}</small>
      </span>
      <i class="chip-check" aria-hidden="true">${on ? '✓' : '+'}</i>
    </button>`;
  }).join('');

  box.querySelectorAll('[data-compare-toggle]').forEach(btn => btn.addEventListener('click', () => {
    let names = compareSelection().map(t => t.name);
    const name = btn.dataset.compareToggle;
    if (names.includes(name)) names = names.filter(n => n !== name);
    else if (names.length < COMPARE_MAX) names.push(name);
    pushCompareState(names);
    renderCompare();
  }));
}

function renderCompare() {
  const selected = compareSelection();
  renderPicker(selected.map(t => t.name));

  const out = document.getElementById('compareResult');
  const count = document.getElementById('compareCount');
  if (count) count.textContent = `${selected.length} / ${COMPARE_MAX} selected`;
  if (!out) return;

  if (selected.length < 2) {
    out.innerHTML = `<div class="empty-state"><h3>Pick at least two treks</h3><p>Choose up to three routes above to compare altitude, distance, duration and season side by side.</p></div>`;
    return;
  }

  const rows = [
    ['Region', t => esc(t.region)],
    ['Start point', t => esc(t.start)],
    ['Max altitude', t => t.alt.toLocaleString() + ' m'],
    ['Distance', t => t.dist + ' km'],
    ['Duration', t => t.days + ' days'],
    ['Route class', t => t.diff],
    ['Difficulty score', t => `<div class="route-meter"><div class="meter-track"><div class="meter-fill ${tierClass(t.diff)}" style="width:${t.score}%"></div></div><span>${t.score.toFixed(1)} / 100</span></div>`],
    ['Best season', t => esc(t.season)],
    ['Permit note', t => esc(t.permit)]
  ];

  out.innerHTML = `
    <div class="compare-bars panel">
      <div class="field-tab">At a glance</div>
      ${barRow('Max altitude', ' m', t => t.alt, ALT_MAX, selected)}
      ${barRow('Distance', ' km', t => t.dist, DIST_MAX, selected)}
      ${barRow('Duration', ' days', t => t.days, DAYS_MAX, selected)}
    </div>
    <div class="compare-table-wrap panel">
      <table class="compare-table">
        <thead><tr><th></th>${selected.map(t => `<th><a href="trek.html?trek=${encodeURIComponent(t.name)}">${esc(t.name)}</a></th>`).join('')}</tr></thead>
        <tbody>
          ${rows.map(([label, fn]) => `<tr><th>${label}</th>${selected.map(t => `<td>${fn(t)}</td>`).join('')}</tr>`).join('')}
          <tr><th>Plan it</th>${selected.map(t => `<td><a class="button button-secondary" href="planner.html?trek=${encodeURIComponent(t.name)}">Planner</a></td>`).join('')}</tr>
        </tbody>
      </table>
    </div>`;
}

document.addEventListener('DOMContentLoaded', renderCompare);
