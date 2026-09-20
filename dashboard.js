/* ============================================================
   Summit Scout — dashboard.js  (dashboard.html only)
   ============================================================ */

function renderPlanSection() {
  const plan = getLastPlan();
  const host = document.getElementById('planSection');
  if (!host) return;

  if (!plan) {
    host.innerHTML = `<div class="panel empty-state">
      <h3>You haven't planned a trek yet</h3>
      <p>Run a profile through the planner to see your difficulty score, calorie estimate and trip budget here.</p>
      <a class="button button-primary" href="planner.html">Open the trek planner</a>
    </div>`;
    return;
  }

  const r = getTrekByName(plan.trek) || TREKS[0];
  const checked = getChecklist(r.name).length;
  const gearPct = Math.round((checked / GEAR_CHECKLIST.length) * 100);
  const highRisk = r.alt > 3500 && plan.bmi < 18.5;

  host.innerHTML = `
  <div class="panel">
    <div class="title">
      <div><div class="field-tab">Selected route</div><h2>${esc(r.name)}</h2></div>
      <a class="muted" href="planner.html?trek=${encodeURIComponent(r.name)}">Edit profile →</a>
    </div>
    <div class="dash-score">
      <div class="ring" style="background:conic-gradient(var(--rust-bright) 0 ${plan.score}%, rgba(243,238,225,.08) ${plan.score}%)">
        <div class="ring-inner"><div><strong>${plan.score}</strong><small>Difficulty</small></div></div>
      </div>
      <div>
        <div class="field-tab">Route signal</div>
        <h2>Structured planning metrics</h2>
        <p class="muted large">${esc(r.name)} · ${r.alt.toLocaleString()} m · ${r.dist} km · ${r.days} days · best ${esc(r.season)}.</p>
        <div class="progress"><span style="width:${Math.min(100, plan.score)}%"></span></div>
        <p class="footnote">Difficulty score reflects your profile against the Summit Scout route dataset.</p>
      </div>
    </div>
  </div>

  <div class="dash-grid-3">
    <div class="panel metric-panel">
      <div class="field-tab">Energy</div>
      <h2>Estimated calories</h2>
      <div class="metric-big">${plan.cal.toLocaleString()} kcal</div>
      <p class="muted">Reference estimate for a full trekking day.</p>
    </div>
    <div class="panel metric-panel">
      <div class="field-tab">Body profile</div>
      <h2>BMI</h2>
      <div class="metric-big">${plan.bmi}</div>
      <p class="muted">${plan.age}y · ${plan.weight}kg · ${plan.height}cm · ${plan.fitness}</p>
    </div>
    <div class="panel metric-panel">
      <div class="field-tab">Trip cost</div>
      <h2>Budget estimate</h2>
      <div class="metric-big">${fmtINR(plan.budget)}</div>
      <p class="muted">${r.days} days at an illustrative per-day rate.</p>
    </div>
  </div>

  <div class="${highRisk ? 'alert' : 'alert-ok'}">
    <b>${highRisk ? '⚠ Risk context' : '✓ Standard context'}</b>
    <p>${highRisk ? 'High altitude (>3,500 m) combined with a low BMI may increase altitude-sickness risk. This is a project rule, not a medical assessment.' : 'No elevated project-level risk flags for this profile and route.'}</p>
  </div>

  <div class="panel">
    <div class="title"><h2>Gear checklist</h2><span class="muted">${checked} / ${GEAR_CHECKLIST.length}</span></div>
    <div class="progress"><span style="width:${gearPct}%"></span></div>
    <p class="muted large">${GEAR_CHECKLIST.join(' · ')}</p>
    <a class="button button-secondary full" href="trek.html?trek=${encodeURIComponent(r.name)}">Open preparation checklist →</a>
  </div>`;
}

function renderShortlistSection() {
  const host = document.getElementById('shortlistSection');
  if (!host) return;
  const saved = getSavedTreks().map(getTrekByName).filter(Boolean);
  if (!saved.length) {
    host.innerHTML = `<div class="panel empty-state">
      <h3>No treks saved yet</h3>
      <p>Tap the bookmark icon on any route card to build a shortlist you can return to here.</p>
      <a class="button button-primary" href="treks.html">Browse all treks</a>
    </div>`;
    return;
  }
  host.innerHTML = `<div class="grid" id="shortlistGrid"></div>`;
  renderTrekGrid('shortlistGrid', saved);
}

function renderDashboard() {
  renderPlanSection();
  renderShortlistSection();
}

document.addEventListener('DOMContentLoaded', renderDashboard);
document.addEventListener('ss:shortlist-changed', renderShortlistSection);
