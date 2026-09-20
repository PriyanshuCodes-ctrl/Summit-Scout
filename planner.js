/* ============================================================
   Summit Scout — planner.js  (planner.html only)
   ============================================================ */

const PER_DAY_RATE = { Beginner: 1400, Moderate: 1800, Difficult: 2200, Extreme: 2800 };

function estimateBudget(r) {
  const rate = PER_DAY_RATE[r.diff] || 1800;
  const permitBuffer = /none/i.test(r.permit) ? 0 : 900;
  return rate * r.days + permitBuffer;
}

function setupPlanner() {
  const sel = document.getElementById('trek');
  if (!sel) return;
  sel.innerHTML = TREKS.map(x => `<option value="${esc(x.name)}">${esc(x.name)}</option>`).join('');
  const r = getRouteFromQuery();
  sel.value = r.name;
  document.querySelectorAll('[data-route-name]').forEach(e => e.textContent = r.name);

  sel.addEventListener('change', () => location.href = 'planner.html?trek=' + encodeURIComponent(sel.value));
  document.getElementById('analysisForm')?.addEventListener('submit', e => { e.preventDefault(); runAnalysis(); });
  runAnalysis();
}

function runAnalysis() {
  const r = getRouteFromQuery();
  const age = Math.max(10, Number(document.getElementById('age')?.value) || 21);
  const w = Math.max(30, Number(document.getElementById('weight')?.value) || 65);
  const h = Math.max(100, Number(document.getElementById('height')?.value) || 170);
  const fitness = document.getElementById('fitness')?.value || 'Moderate';

  const bmi = w / Math.pow(h / 100, 2);
  const bonus = { Beginner: 7, Moderate: 3, Good: 0, Excellent: -3 }[fitness] || 0;
  const score = Math.max(10, Math.min(99, r.score + bonus + (bmi < 18.5 ? 5 : 0)));
  const cal = Math.round(1240 * w / 65 * (r.score / 58.8));
  const budget = estimateBudget(r);
  const highRisk = r.alt > 3500 && bmi < 18.5;

  set('rScore', score.toFixed(1));
  set('rCal', cal.toLocaleString());
  set('rBmi', bmi.toFixed(1));
  set('rBudget', fmtINR(budget));

  const t = document.getElementById('analysisText');
  if (t) t.textContent = `${r.name} · ${r.alt.toLocaleString()} m maximum altitude · ${r.dist} km route · ${r.days} days. Best attempted ${r.season}. Estimates are for project demonstration.`;

  const risk = document.getElementById('plannerRisk');
  if (risk) {
    risk.innerHTML = highRisk
      ? `<b>⚠ Risk context</b><p>High altitude (&gt;3,500 m) combined with a low BMI may increase altitude-sickness risk. This is a project rule, not a medical assessment.</p>`
      : `<b>✓ Standard context</b><p>No elevated project-level risk flags for this profile and route. Always consult a doctor before high-altitude travel.</p>`;
    risk.classList.toggle('alert', highRisk);
    risk.classList.toggle('alert-ok', !highRisk);
  }

  saveLastPlan({ trek: r.name, age, weight: w, height: h, fitness, score: Number(score.toFixed(1)), cal, bmi: Number(bmi.toFixed(1)), budget, ts: Date.now() });
}

function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

document.addEventListener('DOMContentLoaded', setupPlanner);
