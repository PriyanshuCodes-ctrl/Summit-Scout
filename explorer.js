/* ============================================================
   Summit Scout — Google Maps 3D Explorer
   Uses Google Maps JavaScript API / maps3d library.
   The built-in route geometry is intentionally illustrative.
   Load a GPX file to replace it with an actual GPS track.
   ============================================================ */

(() => {
  const trek = getRouteFromQuery();
  const switcher = document.getElementById('trekSwitcher');
  const mapHost = document.getElementById('google3dMap');
  const mapStatus = document.getElementById('mapStatus');
  const timeline = document.getElementById('routeTimeline');
  const waypointCard = document.getElementById('waypointCard');
  const gpxInput = document.getElementById('gpxInput');
  const gpxResult = document.getElementById('gpxResult');

  let map = null;
  let Map3DElement, Marker3DInteractiveElement, Marker3DElement, Polyline3DElement;
  let routePolyline = null;
  let routeMarkers = [];
  let userMarker = null;
  let currentIndex = 0;
  let currentPath = [];

  /* Approximate geographic centers only. They position the real map in the
     correct trek region; they are NOT a substitute for a verified GPX route. */
  const TREK_CENTERS = {
    'Triund': {lat:32.2595,lng:76.3260,range:15500,heading:18},
    'Nag Tibba': {lat:30.5860,lng:78.1580,range:18000,heading:26},
    'Dayara Bugyal': {lat:30.8510,lng:78.5290,range:21000,heading:18},
    'Brahmatal': {lat:30.1845,lng:79.6045,range:22500,heading:-22},
    'Valley of Flowers': {lat:30.7280,lng:79.6050,range:26000,heading:20},
    'Kedarkantha': {lat:31.0260,lng:78.1710,range:22000,heading:28},
    'Tarsar Marsar': {lat:34.1520,lng:75.1890,range:30000,heading:-18},
    'Hampta Pass': {lat:32.3010,lng:77.3860,range:30000,heading:20},
    'Rupin Pass': {lat:31.2430,lng:78.1410,range:36000,heading:24},
    'Kashmir Great Lakes': {lat:34.3660,lng:75.2920,range:42000,heading:-20},
    'Roopkund': {lat:30.2620,lng:79.7310,range:34000,heading:22},
    'Markha Valley': {lat:33.8770,lng:77.4670,range:52000,heading:28},
    'Pin Parvati Pass': {lat:31.8170,lng:77.7760,range:60000,heading:20}
  };

  const centerCfg = TREK_CENTERS[trek.name] || TREK_CENTERS['Rupin Pass'];
  const waypointNames = WAYPOINTS[trek.name] || [trek.start, trek.name];

  function fillPage() {
    document.getElementById('explorerTitle').textContent = `${trek.name} — Live 3D Map`;
    document.getElementById('explorerSubtitle').textContent = `${trek.region} · real Google terrain, camps and route navigation`;
    document.getElementById('mapRegion').textContent = trek.region;
    document.getElementById('mapTrekName').textContent = trek.name;
    document.getElementById('mapTrekStart').textContent = `Trailhead: ${trek.start}`;
    document.getElementById('mapAltitude').textContent = `${trek.alt.toLocaleString()} m`;
    document.getElementById('mapDistance').textContent = `${trek.dist} km`;
    document.getElementById('mapDuration').textContent = `${trek.days} days`;
    document.getElementById('mapDifficulty').textContent = trek.diff;
    document.getElementById('mapScore').textContent = `field score ${trek.score}`;
    const snowReady = trek.alt >= 3500 || ['Brahmatal','Kedarkantha'].includes(trek.name);
    document.getElementById('conditionTitle').textContent = snowReady ? 'Snow / cold exposure' : 'Alpine preparation';
    document.getElementById('conditionText').textContent = snowReady ? 'High sections can hold snow and ice. Pack layers and traction according to current conditions.' : 'Weather can shift quickly in mountain terrain. Carry layers, water and navigation backup.';
    buildProfileArt(trek);
    seedSnow();
    document.getElementById('planCta').href = `planner.html?trek=${encodeURIComponent(trek.name)}`;
    document.getElementById('dossierCta').href = `trek.html?trek=${encodeURIComponent(trek.name)}`;

    TREKS.forEach(t => {
      const o = document.createElement('option');
      o.value = t.name; o.textContent = t.name; o.selected = t.name === trek.name;
      switcher.append(o);
    });
    switcher.addEventListener('change', () => {
      location.href = `explorer.html?trek=${encodeURIComponent(switcher.value)}`;
    });
  }


  function buildProfileArt(t) {
    const art = document.getElementById('profileArt');
    if (!art) return;
    const bars = 7;
    art.innerHTML = Array.from({length:bars}, (_,i) => {
      const wave = 24 + Math.sin(i*1.4 + t.alt/700)*16 + (i/(bars-1))*42;
      return `<span style="height:${Math.max(22,Math.min(88,wave))}%"></span>`;
    }).join('');
  }

  function seedSnow() {
    const host = document.getElementById('snowLayer');
    if (!host || host.children.length) return;
    for (let i=0;i<34;i++) {
      const f = document.createElement('i');
      f.className = 'snowflake';
      f.style.left = `${Math.random()*100}%`;
      f.style.opacity = `${0.25 + Math.random()*0.7}`;
      f.style.animationDuration = `${8 + Math.random()*12}s`;
      f.style.animationDelay = `${-Math.random()*16}s`;
      f.style.transform = `scale(${0.5 + Math.random()*1.4})`;
      host.append(f);
    }
  }

  function buildIllustrativePath() {
    const n = waypointNames.length;
    const scale = Math.max(0.025, Math.min(0.11, trek.dist / 900));
    return waypointNames.map((name, i) => {
      const p = n <= 1 ? 0 : i / (n - 1);
      const lat = centerCfg.lat + (p - .5) * scale * 1.3 + Math.sin(p * Math.PI * 2.2) * scale * .18;
      const lng = centerCfg.lng + (p - .5) * scale * 1.6 + Math.cos(p * Math.PI * 2.6) * scale * .16;
      return { lat, lng, name, type: i === 0 ? 'base' : i === n - 1 ? 'summit' : 'camp' };
    });
  }

  function loadGoogleMaps() {
    const key = String(window.SUMMIT_SCOUT_GOOGLE_MAPS_KEY || '').trim();
    if (!key || key.includes('PASTE_YOUR')) {
      mapStatus.innerHTML = '<strong>Google Maps API key needed</strong><span>Open <code>maps-config.js</code>, paste your Google Maps API key, commit it to GitHub, then refresh. Restrict the key to your GitHub Pages domain.</span>';
      mapStatus.classList.add('show');
      return;
    }

    window.__summitScoutGoogleReady = async () => {
      try {
        await initGoogle3D();
      } catch (err) {
        console.error(err);
        mapStatus.innerHTML = `<strong>Map could not start</strong><span>${escapeHtml(err?.message || 'Check the API key, billing and Maps JavaScript API settings.')}</span>`;
        mapStatus.classList.add('show');
      }
    };

    const s = document.createElement('script');
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?loading=async&key=${encodeURIComponent(key)}&libraries=maps3d&v=weekly&callback=__summitScoutGoogleReady`;
    s.onerror = () => {
      mapStatus.innerHTML = '<strong>Google Maps failed to load</strong><span>Check your internet connection and API key restrictions.</span>';
      mapStatus.classList.add('show');
    };
    document.head.appendChild(s);
  }

  async function initGoogle3D() {
    ({ Map3DElement, Marker3DInteractiveElement, Marker3DElement, Polyline3DElement } = await google.maps.importLibrary('maps3d'));

    map = new Map3DElement({
      center: { lat: centerCfg.lat, lng: centerCfg.lng, altitude: Math.max(0, trek.alt * .15) },
      range: centerCfg.range,
      tilt: 67.5,
      heading: centerCfg.heading,
      mode: 'HYBRID'
    });
    map.className = 'gmp-live-map';
    map.setAttribute('aria-label', `${trek.name} interactive 3D terrain`);
    mapHost.prepend(map);
    mapStatus.classList.remove('show');

    currentPath = buildIllustrativePath();
    drawRoute(currentPath, false);
    buildTimeline(currentPath);
    bindControls();
  }

  function clearRoute() {
    if (!map) return;
    if (routePolyline?.parentNode === map) map.removeChild(routePolyline);
    routeMarkers.forEach(m => { if (m.parentNode === map) map.removeChild(m); });
    routeMarkers = [];
    routePolyline = null;
  }

  function drawRoute(points, fromGpx) {
    clearRoute();
    if (!points.length) return;

    routePolyline = new Polyline3DElement({
      path: points.map(p => ({lat:p.lat, lng:p.lng, ...(Number.isFinite(p.altitude) ? {altitude:p.altitude} : {})})),
      altitudeMode: fromGpx ? 'CLAMP_TO_GROUND' : 'CLAMP_TO_GROUND',
      strokeColor: '#42d7ff',
      strokeWidth: 7,
      outerColor: 'rgba(0,20,35,.72)',
      outerWidth: 11,
      geodesic: true,
      drawsOccludedSegments: true
    });
    map.append(routePolyline);

    const markerPoints = fromGpx ? sampleGpxWaypoints(points) : points;
    markerPoints.forEach((p, i) => {
      const type = p.type || (i === 0 ? 'base' : i === markerPoints.length - 1 ? 'summit' : 'camp');
      const marker = new Marker3DInteractiveElement({
        position: {lat:p.lat, lng:p.lng},
        altitudeMode: 'CLAMP_TO_GROUND',
        extruded: type === 'summit',
        sizePreserved: true,
        label: p.name || `Waypoint ${i + 1}`,
        title: p.name || `Waypoint ${i + 1}`
      });
      marker.dataset.index = String(i);
      marker.addEventListener('gmp-click', () => selectWaypoint(i, markerPoints));
      map.append(marker);
      routeMarkers.push(marker);
    });

    if (fromGpx) {
      const b = boundsOf(points);
      const c = {lat:(b.minLat+b.maxLat)/2, lng:(b.minLng+b.maxLng)/2, altitude:0};
      map.flyCameraTo({ endCamera:{center:c, range:Math.max(7000, estimateRange(b)), tilt:67.5, heading:centerCfg.heading}, durationMillis:1800 });
    }
  }

  function buildTimeline(points) {
    timeline.innerHTML = '';
    const display = points.length > 12 ? sampleGpxWaypoints(points) : points;
    display.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'route-stop' + (i === 0 ? ' active' : '');
      b.innerHTML = `<i></i><span>${escapeHtml(p.name || `Point ${i+1}`)}</span>`;
      b.addEventListener('click', () => selectWaypoint(i, display));
      timeline.append(b);
    });
  }

  function selectWaypoint(i, points) {
    const p = points[i];
    if (!p || !map) return;
    currentIndex = i;
    [...timeline.children].forEach((el, idx) => el.classList.toggle('active', idx === i));
    const kind = p.type === 'base' ? 'Basecamp / trailhead' : p.type === 'summit' ? 'High point / summit' : 'Camp / waypoint';
    waypointCard.innerHTML = `<span class="site-kicker">${kind}</span><h3>${escapeHtml(p.name || `Waypoint ${i+1}`)}</h3><p>${Number.isFinite(p.altitude) ? `${Math.round(p.altitude).toLocaleString()} m elevation · ` : ''}${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}</p>`;
    map.flyCameraTo({
      endCamera: { center:{lat:p.lat,lng:p.lng,altitude:Number.isFinite(p.altitude)?p.altitude:0}, range:1800, tilt:72, heading:(centerCfg.heading + i*18)%360 },
      durationMillis: 1200
    });
  }

  function bindControls() {
    const setActiveMode = id => ['mode3d','modeSatellite','modeTop'].forEach(x => document.getElementById(x).classList.toggle('active', x===id));
    document.getElementById('mode3d').onclick = () => { map.mode='HYBRID'; map.tilt=67.5; map.range=Math.min(map.range || centerCfg.range, centerCfg.range); setActiveMode('mode3d'); };
    document.getElementById('modeSatellite').onclick = () => { map.mode='SATELLITE'; map.tilt=58; setActiveMode('modeSatellite'); };
    document.getElementById('modeTop').onclick = () => { map.mode='HYBRID'; map.tilt=0; map.heading=0; setActiveMode('modeTop'); };

    document.getElementById('mapReset').onclick = () => map.flyCameraTo({ endCamera:{center:{lat:centerCfg.lat,lng:centerCfg.lng,altitude:0},range:centerCfg.range,tilt:67.5,heading:centerCfg.heading}, durationMillis:1300 });
    document.getElementById('mapSummit').onclick = () => {
      const pts = currentPath.length ? currentPath : buildIllustrativePath();
      const p = pts[pts.length-1];
      map.flyCameraTo({ endCamera:{center:{lat:p.lat,lng:p.lng,altitude:Number.isFinite(p.altitude)?p.altitude:0},range:2200,tilt:76,heading:centerCfg.heading+35}, durationMillis:1700 });
    };
    document.getElementById('mapFullscreen').onclick = async () => {
      if (!document.fullscreenElement) await mapHost.requestFullscreen?.(); else await document.exitFullscreen?.();
    };
    document.getElementById('mapLocate').onclick = locateUser;
  }

  function locateUser() {
    if (!navigator.geolocation) return alert('Location is not supported by this browser.');
    navigator.geolocation.getCurrentPosition(pos => {
      const p = {lat:pos.coords.latitude,lng:pos.coords.longitude};
      if (userMarker?.parentNode === map) map.removeChild(userMarker);
      userMarker = new Marker3DElement({position:p, altitudeMode:'CLAMP_TO_GROUND', label:'You are here', sizePreserved:true});
      map.append(userMarker);
      map.flyCameraTo({endCamera:{center:{...p,altitude:0},range:4000,tilt:58,heading:0},durationMillis:1400});
    }, err => alert(`Could not get your location: ${err.message}`), {enableHighAccuracy:true,timeout:10000,maximumAge:30000});
  }

  gpxInput.addEventListener('change', async () => {
    const file = gpxInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const pts = parseGpx(text);
      if (pts.length < 2) throw new Error('No GPX track points were found.');
      currentPath = pts;
      drawRoute(pts, true);
      buildTimeline(pts);
      const gain = elevationGain(pts);
      gpxResult.innerHTML = `<strong>Real GPX loaded:</strong> ${escapeHtml(file.name)} · ${pts.length.toLocaleString()} track points${gain ? ` · +${Math.round(gain).toLocaleString()} m gain` : ''}`;
    } catch (err) {
      console.error(err);
      gpxResult.textContent = `Could not read GPX: ${err.message}`;
    } finally {
      gpxInput.value = '';
    }
  });

  function parseGpx(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('The selected file is not valid GPX/XML.');
    const nodes = [...doc.querySelectorAll('trkpt, rtept')];
    return nodes.map((n,i) => {
      const lat = Number(n.getAttribute('lat'));
      const lng = Number(n.getAttribute('lon'));
      const ele = Number(n.querySelector('ele')?.textContent);
      return { lat, lng, altitude:Number.isFinite(ele)?ele:undefined, name:`Track point ${i+1}` };
    }).filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lng));
  }

  function sampleGpxWaypoints(points) {
    const target = Math.min(8, Math.max(3, waypointNames.length));
    if (points.length <= target) return points.map((p,i) => ({...p,name:waypointNames[i] || p.name,type:i===0?'base':i===points.length-1?'summit':'camp'}));
    const out = [];
    for (let i=0;i<target;i++) {
      const idx = Math.round((points.length-1) * i/(target-1));
      out.push({...points[idx], name:waypointNames[i] || (i===0?'Route start':i===target-1?'Route finish':`Waypoint ${i+1}`), type:i===0?'base':i===target-1?'summit':'camp'});
    }
    return out;
  }

  function boundsOf(points) {
    return points.reduce((b,p)=>({minLat:Math.min(b.minLat,p.lat),maxLat:Math.max(b.maxLat,p.lat),minLng:Math.min(b.minLng,p.lng),maxLng:Math.max(b.maxLng,p.lng)}),{minLat:90,maxLat:-90,minLng:180,maxLng:-180});
  }
  function estimateRange(b) {
    const latKm = (b.maxLat-b.minLat)*111;
    const lngKm = (b.maxLng-b.minLng)*90;
    return Math.max(latKm,lngKm)*1600;
  }
  function elevationGain(points) {
    let gain=0, prev=null;
    points.forEach(p=>{ if(!Number.isFinite(p.altitude)) return; if(prev!==null && p.altitude>prev) gain += p.altitude-prev; prev=p.altitude; });
    return gain;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  fillPage();
  loadGoogleMaps();
})();
