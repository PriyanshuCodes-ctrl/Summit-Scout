/* ============================================================
   Summit Scout — treks.js  (treks.html only)
   ============================================================ */

const SORTS = {
  'score-asc':  { label: 'Difficulty: easiest first', fn: (a, b) => a.score - b.score },
  'score-desc': { label: 'Difficulty: hardest first', fn: (a, b) => b.score - a.score },
  'alt-asc':    { label: 'Altitude: low to high', fn: (a, b) => a.alt - b.alt },
  'alt-desc':   { label: 'Altitude: high to low', fn: (a, b) => b.alt - a.alt },
  'days-asc':   { label: 'Duration: shortest first', fn: (a, b) => a.days - b.days },
  'name-asc':   { label: 'Name: A to Z', fn: (a, b) => a.name.localeCompare(b.name) }
};

function trekState() {
  const p = new URLSearchParams(location.search);
  return {
    diff: p.get('difficulty') || 'All',
    q: p.get('q') || '',
    sort: SORTS[p.get('sort')] ? p.get('sort') : 'score-asc'
  };
}

function pushTrekState(state) {
  const p = new URLSearchParams();
  if (state.diff !== 'All') p.set('difficulty', state.diff);
  if (state.q) p.set('q', state.q);
  if (state.sort !== 'score-asc') p.set('sort', state.sort);
  const qs = p.toString();
  history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
}

function renderTreksPage() {
  const grid = document.getElementById('allTreks');
  if (!grid) return;
  const state = trekState();

  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === state.diff));
  const search = document.getElementById('trekSearch');
  if (search && search.value !== state.q) search.value = state.q;
  const sortSel = document.getElementById('trekSort');
  if (sortSel) sortSel.value = state.sort;

  const q = state.q.trim().toLowerCase();
  let list = TREKS.filter(r =>
    (state.diff === 'All' || r.diff === state.diff) &&
    (!q || r.name.toLowerCase().includes(q) || r.region.toLowerCase().includes(q))
  );
  list = list.slice().sort(SORTS[state.sort].fn);

  renderTrekGrid('allTreks', list);
  const count = document.getElementById('trekCount');
  if (count) count.textContent = list.length + (list.length === 1 ? ' trek' : ' treks');
}

function setupTreksControls() {
  const sortSel = document.getElementById('trekSort');
  if (sortSel) {
    sortSel.innerHTML = Object.entries(SORTS).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
  }
  document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
    const state = trekState();
    state.diff = b.dataset.filter;
    pushTrekState(state);
    renderTreksPage();
  }));
  document.getElementById('trekSearch')?.addEventListener('input', e => {
    const state = trekState();
    state.q = e.target.value;
    pushTrekState(state);
    renderTreksPage();
  });
  sortSel?.addEventListener('change', e => {
    const state = trekState();
    state.sort = e.target.value;
    pushTrekState(state);
    renderTreksPage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupTreksControls();
  renderTreksPage();
});
