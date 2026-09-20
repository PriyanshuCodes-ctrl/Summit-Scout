/* ============================================================
   Summit Scout — explorer.js  (explorer.html only)
   A dedicated, full-page 3D terrain view of a trek's route,
   built with Three.js loaded from a CDN at runtime.
   ============================================================ */

function setupExplorerChrome(r) {
  const sel = document.getElementById('trekSwitcher');
  if (sel) {
    sel.innerHTML = TREKS.map(t => `<option value="${esc(t.name)}">${esc(t.name)}</option>`).join('');
    sel.value = r.name;
    sel.addEventListener('change', () => location.href = 'explorer.html?trek=' + encodeURIComponent(sel.value));
  }
  const title = document.getElementById('explorerTitle');
  if (title) title.textContent = r.name;
  const sub = document.getElementById('explorerSubtitle');
  if (sub) sub.textContent = `${esc(r.region)} · ${(WAYPOINTS[r.name] || []).length} mapped waypoints`;
  set('expAlt', r.alt.toLocaleString() + ' m');
  set('expDist', r.dist + ' km');
  set('expDays', r.days + ' days');
  const plan = document.getElementById('planCta');
  if (plan) plan.href = 'planner.html?trek=' + encodeURIComponent(r.name);
  const dossier = document.getElementById('dossierCta');
  if (dossier) dossier.href = 'trek.html?trek=' + encodeURIComponent(r.name);
}

function set(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });
}

function initExplorer3D(r) {
  const host = document.getElementById('threeMountainMap');
  if (!host) return;

  Promise.resolve()
    .then(() => window.THREE ? null : loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js'))
    .then(() => window.THREE.OrbitControls ? null : loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'))
    .then(() => {
      const T = THREE;
      const names = WAYPOINTS[r.name] || WAYPOINTS['Rupin Pass'];
      const peak = r.alt;
      const seed = r.name.length * 0.71;
      document.getElementById('threeLoading')?.remove();

      const scene = new T.Scene();
      scene.background = new T.Color(0x120f0a);
      scene.fog = new T.Fog(0x120f0a, 55, 150);

      const camera = new T.PerspectiveCamera(48, host.clientWidth / host.clientHeight, 0.1, 300);
      camera.position.set(35, 27, 43);

      const renderer = new T.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputEncoding = T.sRGBEncoding;
      host.appendChild(renderer.domElement);

      const controls = new T.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 17;
      controls.maxDistance = 100;
      controls.maxPolarAngle = Math.PI * 0.47;

      scene.add(new T.HemisphereLight(0xb9c9a0, 0x0c0a06, 1.5));
      const sun = new T.DirectionalLight(0xffe8c2, 2.1);
      sun.position.set(-25, 45, 25);
      scene.add(sun);

      function heightAt(x, z) {
        return (Math.sin(x * 0.13 + seed) * 0.55 + Math.cos(z * 0.16 - seed) * 0.48 + Math.sin((x + z) * 0.075 + seed * 2) * 0.75 + Math.cos((x - z) * 0.055) * 0.38) * 3;
      }

      /* Terrain mesh, coloured low-to-high like a topo map: moss valley floor,
         stone mid-slope, parchment/snow near the ridgeline. */
      const geo = new T.PlaneGeometry(110, 110, 70, 70);
      const pos = geo.attributes.position;
      const colors = [];
      const low = new T.Color(0x4a5236), mid = new T.Color(0x8a7d5c), high = new T.Color(0xe7dfc9);
      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < pos.count; i++) { const zz = heightAt(pos.getX(i), pos.getY(i)); pos.setZ(i, zz); if (zz < minY) minY = zz; if (zz > maxY) maxY = zz; }
      for (let i = 0; i < pos.count; i++) {
        const t = (pos.getZ(i) - minY) / Math.max(0.001, maxY - minY);
        const c = t < 0.55 ? low.clone().lerp(mid, t / 0.55) : mid.clone().lerp(high, (t - 0.55) / 0.45);
        colors.push(c.r, c.g, c.b);
      }
      geo.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      const terrain = new T.Mesh(geo, new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.96, metalness: 0.02 }));
      terrain.rotation.x = -Math.PI / 2;
      scene.add(terrain);

      const grid = new T.GridHelper(105, 35, 0x5c5334, 0x2a2718);
      grid.position.y = -5.2;
      scene.add(grid);

      const pts = names.map((n, i) => {
        const t = i / (names.length - 1 || 1);
        const x = -35 + t * 70, z = Math.sin(t * Math.PI * 1.15) * 15 + Math.cos(t * 3.2) * 3;
        return new T.Vector3(x, heightAt(x, z) + 1.8 + t * 5, z);
      });
      const curve = new T.CatmullRomCurve3(pts);
      scene.add(new T.Mesh(new T.TubeGeometry(curve, 180, 0.42, 10, false), new T.MeshBasicMaterial({ color: 0xd97a3f })));
      scene.add(new T.Mesh(new T.TubeGeometry(curve, 180, 1.1, 8, false), new T.MeshBasicMaterial({ color: 0x8fc4d6, transparent: true, opacity: 0.14 })));

      const markers = [];
      pts.forEach((pt, i) => {
        const waypointName = names[i];
        const type = i === 0 ? 'Basecamp' : i === pts.length - 1 ? 'Summit / High Point' : 'Camp / Tent Site';
        const color = i === 0 ? 0xd9a441 : i === pts.length - 1 ? 0xc1443a : 0x8fc4d6;
        const stem = new T.Mesh(new T.CylinderGeometry(0.06, 0.06, 2.3, 8), new T.MeshBasicMaterial({ color: 0xe7dfc9 }));
        stem.position.set(pt.x, pt.y - 1.15, pt.z);
        scene.add(stem);
        const m = new T.Mesh(new T.SphereGeometry(i === pts.length - 1 ? 1 : 0.72, 20, 20), new T.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.4, roughness: 0.3 }));
        m.position.copy(pt);
        m.userData = { name: waypointName, type, index: i, point: pt.clone() };
        scene.add(m);
        markers.push(m);
      });

      let currentIndex = 0;

      function focus(m) {
        currentIndex = m.userData.index;
        const target = m.position.clone(), start = camera.position.clone(), end = target.clone().add(new T.Vector3(13, 10, 16)), t0 = performance.now();
        markers.forEach(x => x.scale.setScalar(1));
        m.scale.setScalar(1.45);
        const info = document.getElementById('threeSiteInfo');
        const approx = Math.round(1100 + (peak - 1100) * (m.userData.index / Math.max(1, names.length - 1)));
        if (info) info.innerHTML = `<div class="site-kicker">Waypoint ${m.userData.index + 1} / ${names.length}</div><h3>${esc(m.userData.name)}</h3><p>${m.userData.type}</p><div class="site-elev">${approx.toLocaleString()} m<span>approx. route elevation</span></div>`;
        document.querySelectorAll('#threeTimeline [data-waypoint]').forEach(b => b.classList.toggle('is-active', Number(b.dataset.waypoint) === m.userData.index));
        function fly(now) {
          const q = Math.min(1, (now - t0) / 800), e = 1 - Math.pow(1 - q, 3);
          camera.position.lerpVectors(start, end, e);
          controls.target.lerp(target, e);
          if (q < 1) requestAnimationFrame(fly);
        }
        requestAnimationFrame(fly);
      }

      const ray = new T.Raycaster(), mouse = new T.Vector2();
      renderer.domElement.addEventListener('pointerdown', e => {
        const b = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - b.left) / b.width) * 2 - 1;
        mouse.y = -((e.clientY - b.top) / b.height) * 2 + 1;
        ray.setFromCamera(mouse, camera);
        const hit = ray.intersectObjects(markers)[0];
        if (hit) focus(hit.object);
      });

      document.getElementById('mapReset')?.addEventListener('click', () => {
        camera.position.set(35, 27, 43);
        controls.target.set(0, 0, 0);
        markers.forEach(x => x.scale.setScalar(1));
      });
      document.getElementById('mapSummit')?.addEventListener('click', () => focus(markers[markers.length - 1]));
      document.getElementById('mapPrev')?.addEventListener('click', () => focus(markers[(currentIndex - 1 + markers.length) % markers.length]));
      document.getElementById('mapNext')?.addEventListener('click', () => focus(markers[(currentIndex + 1) % markers.length]));
      addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') focus(markers[(currentIndex + 1) % markers.length]);
        if (e.key === 'ArrowLeft') focus(markers[(currentIndex - 1 + markers.length) % markers.length]);
      });

      const tl = document.getElementById('threeTimeline');
      if (tl) {
        tl.innerHTML = names.map((n, i) => `<button type="button" data-waypoint="${i}"><span>${String(i + 1).padStart(2, '0')}</span><strong>${esc(n)}</strong><small>${i === 0 ? 'Basecamp' : i === names.length - 1 ? 'Summit / High Point' : 'Camp / Tent Site'}</small></button>`).join('');
        tl.querySelectorAll('[data-waypoint]').forEach(b => b.addEventListener('click', () => focus(markers[+b.dataset.waypoint])));
      }

      function resize() {
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      }
      addEventListener('resize', resize);

      function anim() {
        requestAnimationFrame(anim);
        const t = performance.now() * 0.002;
        markers.forEach((m, i) => { m.position.y = pts[i].y + Math.sin(t * 1.7 + i) * 0.16; });
        controls.update();
        renderer.render(scene, camera);
      }
      anim();
      focus(markers[0]);
    })
    .catch(e => {
      const x = document.getElementById('threeLoading');
      if (x) x.textContent = '3D terrain could not load. Check your internet connection and refresh — the explorer needs a live connection to fetch Three.js.';
      console.error(e);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const r = getRouteFromQuery();
  setupExplorerChrome(r);
  initExplorer3D(r);
});
