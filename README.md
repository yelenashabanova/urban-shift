# Urban Shift

> Municipality-level opportunity signals for real-estate investors and developers.

**Live demo →** [yelenashabanova.github.io/urban-shift](https://yelenashabanova.github.io/urban-shift/)

---

## What is Urban Shift?

Urban Shift is a web application that ranks Italian municipalities using a transparent **Shift Score** — an interpretable index designed to surface early structural signals of urban change and real-estate opportunity **before** those signals are reflected in headline prices.

The product translates complex spatial and environmental data into a clear, explainable ranking. It is not a price-prediction engine and makes no valuation claims. Its purpose is to reduce uncertainty in early-stage location decisions by answering three questions in under one minute:

> **Where to look. What is changing. Why it matters.**

---

## Who is it for?

| User | Goal |
|------|------|
| **Real-estate investors & developers** | Fast municipality ranking + clear "why" to prioritize due diligence |
| **Analysts & advisors** | Inspect assumptions, review data sources, challenge methodology |

Urban Shift is designed for non-technical, time-constrained users. Every score comes with a plain-language explanation and visible data sources — no black-box outputs.

---

## How it works

The **Shift Score** is a weighted, interpretable index aggregated from open European datasets pre-processed offline to municipality level:

| Data Source | What it proxies |
|-------------|-----------------|
| **Copernicus HRL — Imperviousness Density (2018)** | Soil sealing / built-up intensity |
| **Copernicus HRL — Tree Cover Density (2018)** | Environmental quality / green presence *(coming next)* |
| **ISTAT — Administrative boundaries (2025)** | Official Italian municipal boundaries |

No raw satellite imagery is processed in the browser. Only aggregated, municipality-level outputs are exposed to the user.

**Current formula:** `Shift Score = 100 − mean imperviousness (%)` — less sealed land signals more structural transformation potential.

---

## Features (current)

- **Interactive map** — 378 Lazio comuni coloured by Shift Score (real ISTAT polygons, not simplified rectangles)
- **Ranked list** — full municipality leaderboard sorted by Shift Score
- **Detail panel** — per-municipality score, imperviousness indicator with progress bar, plain-language explanation, and data attribution
- **Tooltip on hover** — comune name, Shift Score, and Imperviousness %

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Map | Leaflet |
| Geo processing | Python · GeoPandas · Rasterio · Rasterstats |
| Data | Pre-processed GeoJSON from Copernicus + ISTAT (real data) |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Project status

**Stage: Real-data prototype — in active development**

### Completed
- [x] Project scaffolding with Vite + React
- [x] Interactive Leaflet map with colour-coded polygons
- [x] Ranked municipality list panel
- [x] Municipality detail panel (score, indicators, plain-language narrative)
- [x] Responsive layout and clean UI
- [x] Deployed to GitHub Pages
- [x] **Python geo pipeline**: ISTAT comuni filtered to Lazio (378), imperviousness extracted from 8 Copernicus IMD 2018 tiles via zonal statistics
- [x] **Real boundaries**: replaced placeholder rectangles with official ISTAT WGS84 polygons
- [x] **Real indicators**: Copernicus IMD 2018 (10m resolution) replaces all simulated data

### In progress / Next steps
- [ ] Integrate Copernicus Tree Cover Density 2018 as second indicator
- [ ] Refine Shift Score weighting when both IMD + TCD are available
- [ ] Add Method & limitations page
- [ ] Add landing page (product intro + CTA to demo)
- [ ] Expand beyond Lazio to other Italian regions

---

## Running locally

```bash
cd urban-shift

# Install JS dependencies
npm install

# Start dev server
npm run dev

# Deploy to GitHub Pages
npm run deploy
```

To re-run the geo processing pipeline (requires Python venv with geopandas, rasterio, rasterstats):

```bash
# From repo root
.venv/bin/python3 scripts/process_data.py
```

---

## Data & security

- No personal data collected
- No user accounts or authentication
- No raw Copernicus raster files exposed to the browser
- No API keys in client-side code
- All data is open and public (Copernicus, ISTAT)

---

## Transparency

The Shift Score is a **signal index**, not a forecast. Data sources are static (2018–2025 snapshots) and will not update automatically. Known limitations of satellite-derived indicators will be documented in the product's Method page (in progress).

---

*Urban Shift is a portfolio-stage product demonstrating method and insight using open data. It is not intended for financial or investment advice.*
