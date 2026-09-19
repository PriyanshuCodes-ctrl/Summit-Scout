const TREKS=[
{name:'Triund',region:'Himachal Pradesh',alt:2850,dist:20,days:2,diff:'Beginner',score:19.8,img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88'},
{name:'Nag Tibba',region:'Uttarakhand',alt:3022,dist:20,days:2,diff:'Beginner',score:20.1,img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88'},
{name:'Dayara Bugyal',region:'Uttarakhand',alt:3639,dist:20,days:4,diff:'Moderate',score:30.2,img:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=88'},
{name:'Brahmatal',region:'Uttarakhand',alt:3730,dist:30,days:5,diff:'Moderate',score:37.6,img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=88'},
{name:'Valley of Flowers',region:'Uttarakhand',alt:3658,dist:38,days:6,diff:'Moderate',score:38.3,img:'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=88'},
{name:'Kedarkantha',region:'Uttarakhand',alt:3810,dist:20,days:5,diff:'Moderate',score:41.8,img:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=88'},
{name:'Tarsar Marsar',region:'Jammu & Kashmir',alt:4100,dist:45,days:7,diff:'Moderate',score:42.9,img:'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=88'},
{name:'Hampta Pass',region:'Himachal Pradesh',alt:4270,dist:35,days:5,diff:'Difficult',score:51.0,img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88'},
{name:'Rupin Pass',region:'Himachal Pradesh / Uttarakhand',alt:4650,dist:52,days:8,diff:'Difficult',score:58.8,img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88'},
{name:'Kashmir Great Lakes',region:'Jammu & Kashmir',alt:4191,dist:65,days:7,diff:'Difficult',score:60.4,img:'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=88'},
{name:'Roopkund',region:'Uttarakhand',alt:5029,dist:56,days:8,diff:'Difficult',score:62.8,img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=88'},
{name:'Markha Valley',region:'Ladakh',alt:5265,dist:80,days:9,diff:'Difficult',score:72.4,img:'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=88'},
{name:'Pin Parvati Pass',region:'Himachal Pradesh',alt:5319,dist:100,days:11,diff:'Extreme',score:91.1,img:'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=88'}
];

const ROUTE_SITES={
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

// Reference coordinates used only to request a nearby weather snapshot.
const WEATHER_POINTS={
'Triund':[32.259,76.329],'Nag Tibba':[30.589,78.161],'Dayara Bugyal':[30.658,78.528],
'Brahmatal':[30.145,79.603],'Valley of Flowers':[30.728,79.604],'Kedarkantha':[31.018,78.171],
'Tarsar Marsar':[34.126,75.163],'Hampta Pass':[32.258,77.373],'Rupin Pass':[31.363,78.164],
'Kashmir Great Lakes':[34.330,75.343],'Roopkund':[30.262,79.732],'Markha Valley':[33.900,77.400],
'Pin Parvati Pass':[31.839,77.820]
};

const imgFallback='https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88';
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function getRoute(){const q=new URLSearchParams(location.search).get('trek');return TREKS.find(r=>r.name===q)||TREKS.find(r=>r.name==='Rupin Pass');}
function routeSites(r){return ROUTE_SITES[r.name]||ROUTE_SITES['Rupin Pass'];}
function routeElevations(r){const n=routeSites(r).length;const start=Math.max(1500,Math.round(r.alt*.43/50)*50);return Array.from({length:n},(_,i)=>Math.round((start+(r.alt-start)*Math.pow(i/(n-1||1),1.08))/10)*10);}
function routeDistances(r){const n=routeSites(r).length;return Array.from({length:n},(_,i)=>+(r.dist*(i/(n-1||1))).toFixed(1));}

function card(r){return `<article class="trek-card"><a href="trek.html?trek=${encodeURIComponent(r.name)}"><div class="image-wrap"><img src="${r.img}" onerror="this.src='${imgFallback}'" alt="${esc(r.name)} mountain landscape"><span class="card-badge">${r.diff}</span></div><div class="card-body"><div class="card-head"><div><h3>${esc(r.name)}</h3><p>⌖ ${esc(r.region)}</p></div><span class="round-arrow">↗</span></div><div class="meta"><span>▲ <b>${r.alt.toLocaleString()} m</b><small>Altitude</small></span><span>⌁ <b>${r.dist} km</b><small>Distance</small></span><span>◷ <b>${r.days} days</b><small>Duration</small></span><span>◈ <b>${r.score}</b><small>Score</small></span></div></div></a></article>`;}
function renderAllTreks(filter='All'){const box=document.getElementById('allTreks');if(!box)return;const list=TREKS.filter(r=>filter==='All'||r.diff===filter);box.innerHTML=list.map(card).join('');const count=document.getElementById('trekCount');if(count)count.textContent=list.length+' treks';}
function setupFilters(){document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderAllTreks(b.dataset.filter);}));}
function setupFindTrek(){const form=document.getElementById('findTrek');if(!form)return;form.addEventListener('submit',e=>{e.preventDefault();const level=form.level.value,max=Number(form.altitude.value),days=Number(form.days.value);let list=TREKS.filter(r=>(level==='Any'||r.diff===level)&&r.alt<=max&&r.days<=days);if(!list.length)list=TREKS.filter(r=>r.alt<=max).sort((a,b)=>Math.abs(a.days-days)-Math.abs(b.days-days)).slice(0,3);else list.sort((a,b)=>Math.abs(a.days-days)-Math.abs(b.days-days));const r=list[0]||TREKS[0];document.getElementById('findResult').innerHTML=`<div class="recommendation"><div><span class="eyebrow">Recommended route</span><h3>${esc(r.name)}</h3><p>${esc(r.region)} · ${r.alt.toLocaleString()} m · ${r.days} days</p></div><a class="button button-primary" href="trek.html?trek=${encodeURIComponent(r.name)}">View trek →</a></div>`;});}

function mountainMap(r){
  const names=routeSites(r), elevs=routeElevations(r), dists=routeDistances(r);
  return `<section class="mountain-explorer" id="mountainExplorer">
    <div class="mountain-explorer-head container">
      <div><div class="section-kicker">MOUNTAIN NAVIGATION</div><h2>Explore ${esc(r.name)} in 3D</h2><p>Rotate the terrain, inspect stages and connect the route with the elevation profile.</p></div>
      <div class="explorer-actions">
        <div class="view-switch" aria-label="Map view"><button class="active" data-map-view="3d">3D Terrain</button><button data-map-view="topo">Topographic</button><button data-map-view="route">Route View</button></div>
        <button class="icon-button" id="mapReset" type="button" title="Reset view">↺</button>
        <button class="icon-button" id="mapFullscreen" type="button" title="Fullscreen">⛶</button>
      </div>
    </div>
    <div class="mission-bar container">
      <div class="mission-left"><span class="pulse-dot"></span><div><small>ROUTE STAGE</small><strong id="progressStage">${esc(names[0])}</strong></div></div>
      <div class="mission-progress"><div class="mission-progress-top"><span id="progressText">Waypoint 1 of ${names.length}</span><b id="progressPercent">0%</b></div><div class="progress-rail"><span id="progressFill" style="width:0%"></span></div></div>
      <button class="button button-secondary compact" id="mapSummit" type="button">Focus High Point ▲</button>
    </div>
    <div class="mountain-explorer-shell">
      <div class="true3d-stage" id="threeMountainMap"><div class="true3d-loading" id="threeLoading">Loading 3D terrain…</div><div class="terrain-overlay topo-overlay"></div><div class="true3d-hud"><span>Drag · rotate</span><span>Scroll · zoom</span><span>Marker · inspect</span></div><div class="map-compass">N</div></div>
      <aside class="route-sidebar" id="threeSiteInfo">
        <div class="sidebar-top"><span class="live-dot"></span> ROUTE INTELLIGENCE</div>
        <div class="sidebar-title"><span class="site-kicker">SELECTED WAYPOINT</span><h3>${esc(names[0])}</h3><p>Basecamp / route start</p></div>
        <div class="sidebar-kpis"><div><small>ELEVATION</small><strong>${elevs[0].toLocaleString()} m</strong></div><div><small>ROUTE DISTANCE</small><strong>${dists[0]} km</strong></div></div>
        <div class="stage-meter"><span>Route progress</span><b>0%</b><div><i style="width:0%"></i></div></div>
        <div class="true3d-legend"><div><i class="legend-dot base"></i><span>Basecamp</span></div><div><i class="legend-dot camp"></i><span>Camp / Waypoint</span></div><div><i class="legend-dot summit"></i><span>Summit / High Point</span></div></div>
        <a class="button button-primary full" href="planner.html?trek=${encodeURIComponent(r.name)}">Plan This Trek →</a>
      </aside>
    </div>
    <div class="route-strip container" id="threeTimeline"></div>
    <div class="container"><p class="map-disclaimer">The 3D terrain and stage positions are visualization features. Route points in this demo are not a substitute for an official GPX track, local guidance or current safety information.</p></div>
  </section>`;
}

function elevationPanel(r){
  const names=routeSites(r), elevs=routeElevations(r), dists=routeDistances(r);
  const min=Math.min(...elevs), max=Math.max(...elevs), W=900,H=260,padX=42,padY=30;
  const pts=elevs.map((e,i)=>{const x=padX+(W-padX*2)*(i/(elevs.length-1||1));const y=H-padY-(H-padY*2)*((e-min)/(max-min||1));return [x,y];});
  const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=line+` L ${pts[pts.length-1][0]} ${H-padY} L ${pts[0][0]} ${H-padY} Z`;
  const dots=pts.map((p,i)=>`<g class="elev-dot" data-elev-waypoint="${i}" tabindex="0"><circle cx="${p[0]}" cy="${p[1]}" r="7"></circle><text x="${p[0]}" y="${p[1]-15}" text-anchor="middle">${esc(names[i])}</text></g>`).join('');
  return `<div class="panel pro-elevation"><div class="panel-head"><div><div class="section-kicker">INTERACTIVE ELEVATION</div><h2>Route profile</h2></div><span class="sync-badge">↔ Synced with 3D map</span></div><div class="elevation-pro"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs><linearGradient id="elevFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#31dfb5" stop-opacity=".34"/><stop offset="100%" stop-color="#31dfb5" stop-opacity="0"/></linearGradient></defs><path class="elev-area" d="${area}"/><path class="elev-line" d="${line}"/>${dots}</svg></div><div class="elev-axis"><span>0 km</span><span>${(r.dist/2).toFixed(0)} km</span><span>${r.dist} km</span></div><p class="footnote">Click a waypoint on the graph to focus the same location in the 3D explorer. Elevations are route-planning estimates in this demo.</p></div>`;
}

function campsiteCards(r){
  const names=routeSites(r), elevs=routeElevations(r), dists=routeDistances(r);
  return `<div class="panel camp-panel"><div class="panel-head"><div><div class="section-kicker">STAGE EXPLORER</div><h2>Camps & waypoints</h2></div><span class="muted">Tap any stage</span></div><div class="camp-card-grid">${names.map((n,i)=>{
    const type=i===0?'Basecamp':i===names.length-1?'High point':'Camp / waypoint';
    const next=i<names.length-1?+(dists[i+1]-dists[i]).toFixed(1):0;
    return `<button class="camp-card" type="button" data-camp-index="${i}"><span class="camp-index">${String(i+1).padStart(2,'0')}</span><span class="camp-type">${type}</span><strong>${esc(n)}</strong><span class="camp-meta">▲ ${elevs[i].toLocaleString()} m · ${dists[i]} km</span>${next?`<span class="camp-next">Next stage ${next} km →</span>`:'<span class="camp-next summit-text">Route high point</span>'}</button>`;
  }).join('')}</div></div>`;
}

function weatherCard(r){return `<div class="panel weather-pro"><div class="panel-head"><div><div class="section-kicker">MOUNTAIN WEATHER</div><h2>Current conditions</h2></div><span class="weather-status" id="weatherStatus">Loading…</span></div><div class="weather-primary"><div><strong id="weatherTemp">--°</strong><span id="weatherDesc">Fetching reference weather</span></div><div class="weather-icon">☁</div></div><div class="weather-metrics"><div><small>FEELS LIKE</small><b id="weatherFeels">--°</b></div><div><small>WIND</small><b id="weatherWind">-- km/h</b></div><div><small>HUMIDITY</small><b id="weatherHumidity">--%</b></div><div><small>PRECIP.</small><b id="weatherRain">-- mm</b></div></div><div class="weather-risk"><span>Weather context</span><b id="weatherRisk">Checking conditions…</b></div><p class="footnote">Reference-point weather from Open-Meteo. Mountain conditions can change rapidly; verify local/official forecasts before travel.</p></div>`;}

function gearPanel(){const gear=['Layering system','Trekking footwear','Navigation backup','Hydration & electrolytes','Headlamp & spare batteries','First-aid essentials','Rain protection','Warm gloves / beanie'];return `<div class="panel gear-pro"><div class="panel-head"><div><div class="section-kicker">PREPARATION</div><h2>Smart gear checklist</h2></div><div class="gear-score"><strong id="gearCount">0 / ${gear.length}</strong><span>packed</span></div></div><div class="gear-progress"><span id="gearProgress" style="width:0%"></span></div><div class="check-grid">${gear.map((x,i)=>`<label class="check-item"><input type="checkbox" data-check="${i}"><span>${x}</span><i>✓</i></label>`).join('')}</div></div>`;}

function renderDetail(){
  const r=getRoute(),box=document.getElementById('detail');if(!box)return;
  document.title=`${r.name} | Summit Scout`;
  const terrain=r.score>70?'High-altitude mixed terrain':r.score>50?'Alpine mountain terrain':r.score>35?'Alpine meadow & trail':'Established mountain trail';
  const gain=Math.round(r.alt*.42/10)*10;
  box.innerHTML=`<section class="detail-hero" style="background-image:linear-gradient(90deg,rgba(2,9,15,.96),rgba(2,9,15,.42)),url('${r.img}')"><div class="container detail-hero-inner"><div><a class="back-link" href="treks.html">← All treks</a><div class="eyebrow">${esc(r.diff)} route · ${esc(r.region)}</div><h1>${esc(r.name)}</h1><p>A cinematic trek workspace combining 3D terrain, stage progress, elevation, weather and preparation tools.</p></div><div class="hero-score"><small>Difficulty score</small><strong>${r.score}</strong><span>/ 100</span></div></div></section>
  <main class="container detail-main"><div class="stat-strip pro-stats"><div><small>MAX ALTITUDE</small><b>${r.alt.toLocaleString()} m</b></div><div><small>DISTANCE</small><b>${r.dist} km</b></div><div><small>DURATION</small><b>${r.days} days</b></div><div><small>ROUTE CLASS</small><b>${r.diff}</b></div></div>${mountainMap(r)}
  <div class="detail-pro-grid"><section>${elevationPanel(r)}${campsiteCards(r)}${gearPanel()}</section><aside>${weatherCard(r)}<div class="panel plan-card-pro"><div class="section-kicker">TREK PLANNER</div><h2>Turn the route into your plan</h2><p class="muted large">Use your profile to calculate project-demo difficulty, calorie and BMI estimates.</p><div class="mini-stats"><span><small>Terrain</small><b>${terrain}</b></span><span><small>Planning gain</small><b>${gain.toLocaleString()} m*</b></span></div><a class="button button-primary full" href="planner.html?trek=${encodeURIComponent(r.name)}">Open Trek Planner →</a><a class="button button-secondary full" href="dashboard.html?trek=${encodeURIComponent(r.name)}">Open Analytics Dashboard</a><p class="footnote">*Planning estimate; not verified GPX ascent.</p></div></aside></div></main>`;
  bindMountainMap(r);bindDetailUI(r);loadWeather(r);
}

function bindDetailUI(r){
  const names=routeSites(r);
  document.querySelectorAll('[data-check]').forEach(x=>x.addEventListener('change',()=>{x.parentElement.classList.toggle('done',x.checked);const checked=document.querySelectorAll('[data-check]:checked').length,total=document.querySelectorAll('[data-check]').length;const c=document.getElementById('gearCount'),p=document.getElementById('gearProgress');if(c)c.textContent=`${checked} / ${total}`;if(p)p.style.width=`${Math.round(100*checked/Math.max(1,total))}%`;}));
  document.querySelectorAll('[data-camp-index],[data-elev-waypoint]').forEach(el=>{const go=()=>window.Summit3D?.focusIndex(Number(el.dataset.campIndex ?? el.dataset.elevWaypoint));el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')go();});});
  document.querySelectorAll('[data-map-view]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-map-view]').forEach(x=>x.classList.remove('active'));b.classList.add('active');window.Summit3D?.setView(b.dataset.mapView);}));
  document.getElementById('mapFullscreen')?.addEventListener('click',()=>{const el=document.getElementById('mountainExplorer');if(!document.fullscreenElement)el?.requestFullscreen?.();else document.exitFullscreen?.();});
  window.addEventListener('summit-waypoint',e=>{const i=e.detail.index,pct=Math.round(100*i/Math.max(1,names.length-1));document.querySelectorAll('[data-camp-index]').forEach((c,idx)=>c.classList.toggle('active',idx===i));document.querySelectorAll('[data-elev-waypoint]').forEach((c,idx)=>c.classList.toggle('active',idx===i));const stage=document.getElementById('progressStage'),text=document.getElementById('progressText'),per=document.getElementById('progressPercent'),fill=document.getElementById('progressFill');if(stage)stage.textContent=names[i];if(text)text.textContent=`Waypoint ${i+1} of ${names.length}`;if(per)per.textContent=pct+'%';if(fill)fill.style.width=pct+'%';});
}

async function loadWeather(r){
  const status=document.getElementById('weatherStatus');
  const point=WEATHER_POINTS[r.name];if(!point){if(status)status.textContent='Unavailable';return;}
  try{
    const [lat,lon]=point;
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`;
    const res=await fetch(url);if(!res.ok)throw new Error('weather');const data=await res.json(),c=data.current||{};
    const code=Number(c.weather_code||0);const desc=code===0?'Clear sky':code<=3?'Partly cloudy':code<=48?'Cloud / fog':code<=67?'Rain or drizzle':code<=77?'Snow':code<=82?'Rain showers':'Storm conditions';
    const risk=(Number(c.wind_speed_10m)>35||Number(c.precipitation)>4)?'Elevated — check local forecast':(Number(c.temperature_2m)<0?'Cold conditions — layer carefully':'Monitor before departure');
    document.getElementById('weatherTemp').textContent=Math.round(c.temperature_2m)+'°';document.getElementById('weatherDesc').textContent=desc;document.getElementById('weatherFeels').textContent=Math.round(c.apparent_temperature)+'°';document.getElementById('weatherWind').textContent=Math.round(c.wind_speed_10m)+' km/h';document.getElementById('weatherHumidity').textContent=Math.round(c.relative_humidity_2m)+'%';document.getElementById('weatherRain').textContent=Number(c.precipitation||0).toFixed(1)+' mm';document.getElementById('weatherRisk').textContent=risk;if(status){status.textContent='Live reference';status.classList.add('online');}
  }catch(e){if(status)status.textContent='Could not load';const d=document.getElementById('weatherDesc');if(d)d.textContent='Check internet connection';}
}

function bindMountainMap(r){initTrue3D(r);}
function setupPlanner(){const sel=document.getElementById('trek');if(!sel)return;sel.innerHTML=TREKS.map(x=>`<option value="${esc(x.name)}">${esc(x.name)}</option>`).join('');const r=getRoute();sel.value=r.name;document.querySelectorAll('[data-route-name]').forEach(e=>e.textContent=r.name);sel.addEventListener('change',()=>location.href='planner.html?trek='+encodeURIComponent(sel.value));document.getElementById('analysisForm')?.addEventListener('submit',e=>{e.preventDefault();runAnalysis();});runAnalysis();}
function runAnalysis(){const r=getRoute();const w=Math.max(30,Number(document.getElementById('weight')?.value)||65),h=Math.max(100,Number(document.getElementById('height')?.value)||170);const bmi=w/Math.pow(h/100,2);const fit=document.getElementById('fitness')?.value||'Moderate';const bonus={Beginner:7,Moderate:3,Good:0,Excellent:-3}[fit]||0;const score=Math.max(10,Math.min(99,r.score+bonus+(bmi<18.5?5:0)));const cal=Math.round(1240*w/65*(r.score/58.8));const s=document.getElementById('rScore');if(s)s.textContent=score.toFixed(1);const c=document.getElementById('rCal');if(c)c.textContent=cal.toLocaleString();const b=document.getElementById('rBmi');if(b)b.textContent=bmi.toFixed(1);const t=document.getElementById('analysisText');if(t)t.textContent=`${r.name} · ${r.alt.toLocaleString()} m maximum altitude · ${r.dist} km route · ${r.days} days. Estimates are intended for project demonstration.`;}
function setupDashboard(){const r=getRoute();document.querySelectorAll('[data-dash-name]').forEach(e=>e.textContent=r.name);const score=document.getElementById('dashScore');if(score)score.textContent=r.score.toFixed(1);const bar=document.getElementById('dashBar');if(bar)bar.style.width=Math.min(100,r.score)+'%';const title=document.getElementById('dashRoute');if(title)title.textContent=r.name;}

function initTrue3D(r){
  const host=document.getElementById('threeMountainMap');if(!host)return;
  function load(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
  Promise.resolve().then(()=>window.THREE?null:load('https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js')).then(()=>window.THREE.OrbitControls?null:load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js')).then(()=>{
    const T=THREE,names=routeSites(r),elevs=routeElevations(r),dists=routeDistances(r),peak=r.alt,seed=r.name.length*.71;
    host.querySelector('#threeLoading')?.remove();
    const scene=new T.Scene();scene.background=new T.Color(0x04131d);scene.fog=new T.Fog(0x04131d,62,160);
    const camera=new T.PerspectiveCamera(48,host.clientWidth/host.clientHeight,.1,300);camera.position.set(35,27,43);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(host.clientWidth,host.clientHeight);renderer.outputEncoding=T.sRGBEncoding;host.appendChild(renderer.domElement);
    const controls=new T.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.06;controls.minDistance=17;controls.maxDistance=110;controls.maxPolarAngle=Math.PI*.49;
    scene.add(new T.HemisphereLight(0xb9efff,0x061018,1.45));const sun=new T.DirectionalLight(0xffffff,2.25);sun.position.set(-25,45,25);scene.add(sun);
    function y(x,z){return (Math.sin(x*.13+seed)*.55+Math.cos(z*.16-seed)*.48+Math.sin((x+z)*.075+seed*2)*.75+Math.cos((x-z)*.055)*.38)*3;}
    const g=new T.PlaneGeometry(110,110,90,90),p=g.attributes.position;for(let i=0;i<p.count;i++)p.setZ(i,y(p.getX(i),p.getY(i)));g.computeVertexNormals();
    const terrainMat=new T.MeshStandardMaterial({color:0x0b3141,roughness:.94,metalness:.04});const terrain=new T.Mesh(g,terrainMat);terrain.rotation.x=-Math.PI/2;scene.add(terrain);
    const grid=new T.GridHelper(105,35,0x16485a,0x0d3040);grid.position.y=-5.2;scene.add(grid);
    const pts=names.map((n,i)=>{const t=i/(names.length-1||1),x=-35+t*70,z=Math.sin(t*Math.PI*1.15)*15+Math.cos(t*3.2)*3;return new T.Vector3(x,y(x,z)+1.8+t*5,z)});
    const curve=new T.CatmullRomCurve3(pts);const routeGlow=new T.Mesh(new T.TubeGeometry(curve,180,1.1,8,false),new T.MeshBasicMaterial({color:0x19d8b0,transparent:true,opacity:.12}));scene.add(routeGlow);const routeLine=new T.Mesh(new T.TubeGeometry(curve,180,.42,10,false),new T.MeshBasicMaterial({color:0x65e5ff}));scene.add(routeLine);
    const markers=[];pts.forEach((pt,i)=>{const type=i===0?'Basecamp':i===pts.length-1?'Summit / High Point':'Camp / Waypoint',color=i===0?0xf3ce69:i===pts.length-1?0xff6875:0x19d8b0;const stem=new T.Mesh(new T.CylinderGeometry(.06,.06,2.3,8),new T.MeshBasicMaterial({color:0x8fefff}));stem.position.set(pt.x,pt.y-1.15,pt.z);scene.add(stem);const m=new T.Mesh(new T.SphereGeometry(i===pts.length-1?1:.72,20,20),new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.5,roughness:.3}));m.position.copy(pt);m.userData={name,type,index:i,point:pt.clone()};scene.add(m);markers.push(m);});
    function sidebar(i){const pct=Math.round(100*i/Math.max(1,names.length-1)),type=i===0?'Basecamp / Route Start':i===names.length-1?'Summit / High Point':'Camp / Waypoint',next=i<names.length-1?+(dists[i+1]-dists[i]).toFixed(1):0;const info=document.getElementById('threeSiteInfo');if(!info)return;info.innerHTML=`<div class="sidebar-top"><span class="live-dot"></span> ROUTE INTELLIGENCE</div><div class="sidebar-title"><span class="site-kicker">WAYPOINT ${i+1} / ${names.length}</span><h3>${esc(names[i])}</h3><p>${type}${next?` · ${next} km to next stage`:''}</p></div><div class="sidebar-kpis"><div><small>ELEVATION</small><strong>${elevs[i].toLocaleString()} m</strong></div><div><small>ROUTE DISTANCE</small><strong>${dists[i]} km</strong></div></div><div class="stage-meter"><span>Route progress</span><b>${pct}%</b><div><i style="width:${pct}%"></i></div></div><div class="true3d-legend"><div><i class="legend-dot base"></i><span>Basecamp</span></div><div><i class="legend-dot camp"></i><span>Camp / Waypoint</span></div><div><i class="legend-dot summit"></i><span>Summit / High Point</span></div></div><a class="button button-primary full" href="planner.html?trek=${encodeURIComponent(r.name)}">Plan This Trek →</a>`;}
    function focusIndex(i){i=Math.max(0,Math.min(markers.length-1,Number(i)||0));const m=markers[i],target=m.position.clone(),start=camera.position.clone(),end=target.clone().add(new T.Vector3(13,10,16)),t0=performance.now();markers.forEach(x=>x.scale.setScalar(1));m.scale.setScalar(1.45);sidebar(i);document.querySelectorAll('[data-waypoint]').forEach((b,idx)=>b.classList.toggle('active',idx===i));window.dispatchEvent(new CustomEvent('summit-waypoint',{detail:{index:i,name:names[i]}}));function fly(now){const q=Math.min(1,(now-t0)/700),e=1-Math.pow(1-q,3);camera.position.lerpVectors(start,end,e);controls.target.lerp(target,e);if(q<1)requestAnimationFrame(fly);}requestAnimationFrame(fly);}
    function setView(mode){host.dataset.view=mode;terrainMat.wireframe=mode==='topo';grid.visible=mode!=='3d';if(mode==='topo'){camera.position.set(0,72,.01);controls.target.set(0,0,0);}else if(mode==='route'){camera.position.set(0,42,58);controls.target.set(0,1,0);}else{camera.position.set(35,27,43);controls.target.set(0,0,0);}controls.update();}
    const ray=new T.Raycaster(),mouse=new T.Vector2();renderer.domElement.addEventListener('pointerdown',e=>{const b=renderer.domElement.getBoundingClientRect();mouse.x=((e.clientX-b.left)/b.width)*2-1;mouse.y=-((e.clientY-b.top)/b.height)*2+1;ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects(markers)[0];if(hit)focusIndex(hit.object.userData.index);});
    document.getElementById('mapReset')?.addEventListener('click',()=>setView('3d'));document.getElementById('mapSummit')?.addEventListener('click',()=>focusIndex(markers.length-1));
    const tl=document.getElementById('threeTimeline');if(tl){tl.innerHTML=names.map((n,i)=>`<button type="button" data-waypoint="${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(n)}</strong><small>${i===0?'Basecamp':i===names.length-1?'High Point':'Camp / Waypoint'}</small></button>`).join('');tl.querySelectorAll('[data-waypoint]').forEach(b=>b.onclick=()=>focusIndex(+b.dataset.waypoint));}
    function resize(){camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight);}addEventListener('resize',resize);
    function anim(){requestAnimationFrame(anim);const t=performance.now()*.002;markers.forEach((m,i)=>{m.position.y=pts[i].y+Math.sin(t*1.7+i)*.16;});controls.update();renderer.render(scene,camera);}anim();
    window.Summit3D={focusIndex,setView,reset:()=>setView('3d'),summit:()=>focusIndex(markers.length-1)};focusIndex(0);
  }).catch(e=>{const x=document.getElementById('threeLoading');if(x)x.textContent='3D map could not load. Check your internet connection and refresh.';console.error(e);});
}

function init(){renderAllTreks();setupFilters();setupFindTrek();renderDetail();setupPlanner();setupDashboard();document.querySelectorAll('img').forEach(i=>i.addEventListener('error',()=>i.src=imgFallback,{once:true}));}
document.addEventListener('DOMContentLoaded',init);
