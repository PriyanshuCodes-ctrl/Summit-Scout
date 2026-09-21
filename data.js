/* ============================================================
   Summit Scout — data.js
   Trek dataset, route waypoints, and small shared helpers.
   Loaded first on every page.
   ============================================================ */

const TREKS = [
  { name:'Triund', region:'Himachal Pradesh', state:'HP', alt:2850, dist:20, days:2, diff:'Beginner', score:19.8,
    img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88',
    start:'McLeod Ganj, HP', season:'Mar – Jun, Sep – Dec', permit:'None required',
    highlight:'A short ridge walk above McLeod Ganj with a straight-on view of the Dhauladhar wall.' },
  { name:'Nag Tibba', region:'Uttarakhand', state:'UK', alt:3022, dist:20, days:2, diff:'Beginner', score:20.1,
    img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88',
    start:'Pantwari, UK', season:'Oct – Jun', permit:'None required',
    highlight:"Uttarakhand's closest snow summit, with a wide view over the Bandarpoonch range." },
  { name:'Dayara Bugyal', region:'Uttarakhand', state:'UK', alt:3639, dist:20, days:4, diff:'Moderate', score:30.2,
    img:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=88',
    start:'Barsu, UK', season:'Dec – Apr, Sep – Nov', permit:'Forest entry fee at Barsu check-post',
    highlight:'A rolling alpine meadow above Barsu, framed by Bandarpoonch on clear mornings.' },
  { name:'Brahmatal', region:'Uttarakhand', state:'UK', alt:3730, dist:30, days:5, diff:'Moderate', score:37.6,
    img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=88',
    start:'Lohajung, UK', season:'Dec – Mar', permit:'Forest entry fee at Lohajung check-post',
    highlight:'A winter snow trail past a frozen alpine lake, with Trishul on the skyline.' },
  { name:'Valley of Flowers', region:'Uttarakhand', state:'UK', alt:3658, dist:38, days:6, diff:'Moderate', score:38.3,
    img:'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=88',
    start:'Govindghat, UK', season:'Jul – Sep', permit:'National Park entry permit (Ghangaria check-post)',
    highlight:'A UNESCO valley that carpets itself in wildflowers for a few short monsoon weeks.' },
  { name:'Kedarkantha', region:'Uttarakhand', state:'UK', alt:3810, dist:20, days:5, diff:'Moderate', score:41.8,
    img:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=88',
    start:'Sankri, UK', season:'Dec – Apr', permit:'Forest entry fee at Sankri check-post',
    highlight:'A snow-clad summit morning with an open 360° view, one of the most climbed winter peaks in the state.' },
  { name:'Tarsar Marsar', region:'Jammu & Kashmir', state:'JK', alt:4100, dist:45, days:7, diff:'Moderate', score:42.9,
    img:'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=88',
    start:'Aru, J&K', season:'Jul – Sep', permit:'Standard J&K trekking ID registration',
    highlight:'Twin alpine lakes tucked behind the Aru meadows, reached over one long high pass.' },
  { name:'Hampta Pass', region:'Himachal Pradesh', state:'HP', alt:4270, dist:35, days:5, diff:'Difficult', score:51.0,
    img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88',
    start:'Jobra, HP', season:'Jun – Sep', permit:'Forest entry fee at Jobra',
    highlight:'A single pass that trades the green Kullu valley for the high desert of Lahaul in one afternoon.' },
  { name:'Rupin Pass', region:'Himachal Pradesh / Uttarakhand', state:'HP/UK', alt:4650, dist:52, days:8, diff:'Difficult', score:58.8,
    img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88',
    start:'Dhaula, HP', season:'May – Jun, Sep – Oct', permit:'Forest entry fee (Himachal side)',
    highlight:'A route of hanging villages and a 2,000-foot waterfall, with snow bridges over the Rupin river in season.' },
  { name:'Kashmir Great Lakes', region:'Jammu & Kashmir', state:'JK', alt:4191, dist:65, days:7, diff:'Difficult', score:60.4,
    img:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=88',
    start:'Sonamarg, J&K', season:'Jul – Sep', permit:'Standard J&K trekking ID registration',
    highlight:'Seven high-altitude lakes strung across one long ridge-line traverse.' },
  { name:'Roopkund', region:'Uttarakhand', state:'UK', alt:5029, dist:56, days:8, diff:'Difficult', score:62.8,
    img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=88',
    start:'Lohajung, UK', season:'May – Jun, Sep – Oct', permit:'Forest entry fee at Lohajung check-post',
    highlight:'A glacial lake known for centuries-old skeletal remains, reached via the Bhagwabasa high camp.' },
  { name:'Markha Valley', region:'Ladakh', state:'LA', alt:5265, dist:80, days:9, diff:'Difficult', score:72.4,
    img:'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=88',
    start:'Chilling, Ladakh', season:'Jun – Sep', permit:'Hemis National Park entry permit',
    highlight:'A trans-Himalayan valley trek through Hemis National Park, crossing the Kongmaru La above 5,200 m.' },
  { name:'Pin Parvati Pass', region:'Himachal Pradesh', state:'HP', alt:5319, dist:100, days:11, diff:'Extreme', score:91.1,
    img:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=88',
    start:'Barshaini, HP', season:'Jul – Aug', permit:'Forest entry fee + experienced-trekker recommendation',
    highlight:'A committing glacier crossing linking the Parvati and Pin valleys, for trekkers with prior high-altitude experience.' }
];

/* Route waypoints, shared by the trek dossier and the 3D explorer */
const WAYPOINTS = {
  'Triund':['Dharamkot','Gallu Gate','Magic View','Triund Camp'],
  'Nag Tibba':['Pantwari Basecamp','Khatian','Nag Tibba Base Camp','Nag Tibba Summit Camp'],
  'Dayara Bugyal':['Barsu Basecamp','Barnala Tal','Dayara Bugyal Camp','Bakaria Top Camp'],
  'Brahmatal':['Lohajung Basecamp','Bekaltal Camp','Brahmatal Camp','Jatropani','Brahmatal Ridge'],
  'Valley of Flowers':['Govindghat Basecamp','Poolna','Ghangaria Camp','Valley Trail Camp','Hemkund Approach'],
  'Kedarkantha':['Sankri Basecamp','Juda Ka Talab Camp','Kedarkantha Base Camp','Hargaon Camp','Kedarkantha Summit'],
  'Tarsar Marsar':['Aru Basecamp','Lidderwat Camp','Sakwas Meadow','Tarsar Lake Camp','Sundarsar Camp','Marsar Lake'],
  'Hampta Pass':['Jobra Basecamp','Jwara Camp','Balu Ka Ghera','Shea Goru Camp','Hampta Pass','Chatru Camp'],
  'Rupin Pass':['Dhaula Basecamp','Sewa Camp','Jiskun Camp','Udaknal Camp','Dhanderas Camp','Rata Pani Camp','Rupin Pass'],
  'Kashmir Great Lakes':['Sonamarg Basecamp','Nichinai Camp','Vishansar Camp','Gadsar Camp','Satsar Camp','Gangbal Camp','Naranag Exit'],
  'Roopkund':['Lohajung Basecamp','Didna Camp','Ali Bedni Camp','Patar Nachauni Camp','Bhagwabasa Camp','Roopkund Summit Camp'],
  'Markha Valley':['Chilling Basecamp','Skiu Camp','Markha Camp','Hankar Camp','Nimaling Camp','Kongmaru La High Camp','Shang Sumdo Exit'],
  'Pin Parvati Pass':['Barshaini Basecamp','Kheerganga Camp','Tunda Bhuj Camp','Thakur Kuan Camp','Odi Thach Camp','Mantalai Camp','Pin Valley Camp','Mud Exit']
};

const GEAR_CHECKLIST = [
  'Layering system', 'Trekking footwear', 'Navigation backup',
  'Hydration & electrolytes', 'Headlamp & spare batteries', 'First-aid essentials'
];

const DIFF_TIERS = ['Beginner', 'Moderate', 'Difficult', 'Extreme'];
const DIFF_TIER_CLASS = { Beginner:'tier-beginner', Moderate:'tier-moderate', Difficult:'tier-difficult', Extreme:'tier-extreme' };

const imgFallback = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88';

const ALT_MIN = Math.min(...TREKS.map(t => t.alt));
const ALT_MAX = Math.max(...TREKS.map(t => t.alt));
const DIST_MAX = Math.max(...TREKS.map(t => t.dist));
const DAYS_MAX = Math.max(...TREKS.map(t => t.days));

function esc(s) {
  return String(s).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
}

function tierClass(diff) { return DIFF_TIER_CLASS[diff] || 'tier-moderate'; }

function getTrekByName(name) { return TREKS.find(r => r.name === name); }

/** Reads ?trek= from the URL, falling back to Rupin Pass so demo links always resolve. */
function getRouteFromQuery() {
  const q = new URLSearchParams(location.search).get('trek');
  return getTrekByName(q) || getTrekByName('Rupin Pass');
}

function fmtINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Turns a "Mar – Jun, Sep – Dec" style string into a set of month indices (0=Jan), wrapping the year if needed. */
function parseSeasonMonths(season) {
  const months = new Set();
  String(season).split(',').forEach(part => {
    const bits = part.trim().split('–').map(s => s.trim());
    const ai = MONTH_ABBR.indexOf(bits[0]);
    const bi = MONTH_ABBR.indexOf(bits[1] || bits[0]);
    if (ai < 0 || bi < 0) return;
    let i = ai;
    for (let guard = 0; guard < 12; guard++) {
      months.add(i);
      if (i === bi) break;
      i = (i + 1) % 12;
    }
  });
  return Array.from(months).sort((x, y) => x - y);
}
