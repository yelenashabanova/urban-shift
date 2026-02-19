# Urban Shift

> Neighborhood-level opportunity signals for real-estate investors and developers.

**Live demo →** [yelenashabanova.github.io/urban-shift](https://yelenashabanova.github.io/urban-shift/)

---

## What is Urban Shift?

Urban Shift is a web application that ranks city neighborhoods using a transparent **Shift Score** — an interpretable index designed to surface early structural signals of urban change and real-estate opportunity **before** those signals are reflected in headline prices.

The product translates complex spatial, environmental, and urban data into a clear, explainable ranking. It is not a price-prediction engine and makes no valuation claims. Its purpose is to reduce uncertainty in early-stage location decisions by answering three questions in under one minute:

> **Where to look. What is changing. Why it matters.**

---

## Who is it for?

| User | Goal |
|------|------|
| **Real-estate investors & developers** | Fast neighborhood ranking + clear "why" to prioritize due diligence |
| **Analysts & advisors** | Inspect assumptions, review data sources, challenge methodology |

Urban Shift is designed for non-technical, time-constrained users. Every score comes with a plain-language explanation and visible data sources — no black-box outputs.

---

## How it works

The **Shift Score** is a weighted, interpretable index aggregated from open European datasets pre-processed offline to neighborhood (municipality) level:

| Data Source | What it proxies |
|-------------|-----------------|
| **Copernicus HRL — Imperviousness Density (2018)** | Construction intensity / soil sealing |
| **Copernicus HRL — Tree Cover Density (2018)** | Environmental quality / green presence |
| **ISTAT — Administrative boundaries (2025)** | Spatial units for aggregation and ranking |

No raw satellite imagery is processed in the browser. Only aggregated, neighborhood-level outputs are exposed to the user.

---

## Features (MVP — Rome)

- 🗺️ **Interactive map** — neighborhood polygons colored by Shift Score
- 📋 **Ranked list** — sortable neighborhood leaderboard
- 📌 **Detail panel** — per-neighborhood Shift Score, top contributing drivers, and a short human-readable explanation
- 🔍 **Method page** — data sources, assumptions, known limitations (credibility anchor)

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Map | Leaflet / react-leaflet |
| Data | Static pre-processed GeoJSON (mock data for MVP) |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Project status

**Stage: MVP / Prototype — in active development**

### Completed ✅
- [x] Project scaffolding with Vite + React
- [x] Interactive Leaflet map with Rome neighborhood polygons
- [x] Shift Score color-coding on map polygons
- [x] Ranked neighborhood list panel
- [x] Neighborhood detail panel (score, drivers, plain-language narrative)
- [x] Responsive layout and clean UI
- [x] Deployed to GitHub Pages

### In progress / Next steps 🔜
- [ ] Replace mock data with real processed Copernicus + ISTAT indicators for Rome
- [ ] Add method & limitations page
- [ ] Add landing page (product intro + CTA to demo)
- [ ] Expand to additional Italian cities
- [ ] Refine Shift Score weighting and driver categories (amenities, accessibility, mixed-use signals)

---

## What Urban Shift is explicitly NOT

Urban Shift v1 is **not**:
- An automated valuation model
- A price prediction tool
- A real-time monitoring system
- A causal model

It is a **signal index** — a structured way to surface neighborhoods that may warrant deeper investigation, grounded in open data and transparent methodology.

---

## Running locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Deploy to GitHub Pages
npm run deploy
```

---

## Data & security

- No personal data collected
- No user accounts or authentication
- No raw Copernicus files exposed to the browser
- No API keys in client-side code
- All data is open, public, or synthetic (v1)

---

## Transparency

The Shift Score is a **signal index**, not a forecast. Data sources are static (2018–2025 snapshots) and will not update automatically. Known limitations of satellite-derived indicators are documented in the product's Method page (in progress).

---

*Urban Shift is a portfolio-stage product demonstrating method and insight using open data. It is not intended for financial or investment advice.*
