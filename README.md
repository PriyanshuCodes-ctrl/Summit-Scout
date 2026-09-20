# Summit Scout — Himalayan Trek Intelligence

A route-planning concept for Himalayan treks: a searchable trek library, a dedicated 3D terrain explorer, a personal planner (difficulty, calories, BMI, trip budget), a side-by-side trek comparison tool, and a dashboard that remembers what you've planned and saved.

## Features

- **Route library** — 13 treks with altitude, distance, duration, difficulty score, best season, start point and permit notes. Search, filter by difficulty and sort.
- **3D Explorer** (`explorer.html`) — a dedicated full-page 3D terrain view per trek, built with Three.js. Rotate the terrain, click waypoint markers, step through camps with Prev/Next, or fly straight to the summit. Switch trek from the same page.
- **Trek dossier** (`trek.html`) — route stats, an elevation profile, a best-season strip, permit notes, and a gear checklist that remembers what you've packed (per trek, via `localStorage`).
- **Compare** (`compare.html`) — pick up to three treks and compare altitude, distance, duration, difficulty and season side by side, with a shareable URL.
- **Planner** (`planner.html`) — enter a profile (age, weight, height, fitness) to get a route-adjusted difficulty score, calorie estimate, BMI and an illustrative trip budget.
- **Dashboard** (`dashboard.html`) — surfaces your last planner result and your saved-trek shortlist, with an empty state if you haven't planned or saved anything yet.
- **Shortlist** — bookmark any trek from its card; it persists across pages and sessions via `localStorage`.

All calculations (difficulty score, calories, BMI, budget, risk context) are illustrative estimates for a demo/portfolio project — not medical, financial or route-safety advice.

## File structure

```
index.html            Home
treks.html             Trek library (search / filter / sort)
trek.html              Trek dossier (reads ?trek=<name>)
explorer.html          3D route explorer (reads ?trek=<name>)
compare.html           Trek comparison (reads ?treks=<name,name>)
planner.html           Personal planner
dashboard.html         Last plan + shortlist
about.html             Project overview
favicon.svg
assets/
  css/style.css        Full visual system
  js/data.js            Trek dataset, waypoints, shared helpers
  js/storage.js          localStorage wrapper (shortlist, checklist, last plan)
  js/nav.js               Shared header/footer, mobile menu
  js/cards.js              Route card renderer + save toggle
  js/home.js, treks.js, detail.js, explorer.js, compare.js,
  js/planner.js, dashboard.js   Page-specific logic
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Upload every file in this zip to the repository root, keeping the folder structure (`assets/css`, `assets/js`) intact.
3. In the repository, go to **Settings → Pages**, set the source branch to `main` (or your default branch) and the folder to `/ (root)`.
4. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- The site uses Unsplash photography and Google Fonts (Fraunces, Inter), and loads Three.js + OrbitControls from a CDN for the 3D Explorer — an internet connection is required for those.
- All data is client-side; there is no backend. `localStorage` is used only for per-visitor conveniences (shortlist, checklist, last plan) and is never sent anywhere.
