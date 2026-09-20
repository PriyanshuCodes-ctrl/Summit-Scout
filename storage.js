/* ============================================================
   Summit Scout — storage.js
   Thin, error-guarded wrapper around localStorage. Every read/
   write is wrapped so the site still works if storage is
   unavailable (private browsing, disabled cookies, etc).
   ============================================================ */

const SS_KEYS = {
  saved: 'summitscout.saved',
  checklist: 'summitscout.checklist',
  lastPlan: 'summitscout.lastPlan'
};

function ssRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function ssWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

/* ---- Saved / shortlisted treks ---- */
function getSavedTreks() { return ssRead(SS_KEYS.saved, []); }

function isTrekSaved(name) { return getSavedTreks().includes(name); }

function toggleTrekSaved(name) {
  const list = getSavedTreks();
  const i = list.indexOf(name);
  if (i === -1) list.push(name); else list.splice(i, 1);
  ssWrite(SS_KEYS.saved, list);
  return list.includes(name);
}

/* ---- Gear checklist progress, kept per trek ---- */
function getChecklist(trekName) {
  const all = ssRead(SS_KEYS.checklist, {});
  return all[trekName] || [];
}

function toggleChecklistItem(trekName, index) {
  const all = ssRead(SS_KEYS.checklist, {});
  const cur = new Set(all[trekName] || []);
  if (cur.has(index)) cur.delete(index); else cur.add(index);
  all[trekName] = Array.from(cur);
  ssWrite(SS_KEYS.checklist, all);
  return all[trekName];
}

/* ---- Last planner result, read by the dashboard ---- */
function saveLastPlan(plan) { ssWrite(SS_KEYS.lastPlan, plan); }
function getLastPlan() { return ssRead(SS_KEYS.lastPlan, null); }
