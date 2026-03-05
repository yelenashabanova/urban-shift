# Urban Shift

> Municipality-level structural shift signals for real-estate analysts and investors.

**Live demo →** [yelenashabanova.github.io/urban-shift](https://yelenashabanova.github.io/urban-shift/)

---

## What is Urban Shift?

Urban Shift ranks Italian municipalities using a transparent **Shift Score** — an interpretable index that surfaces early structural signals of urban change **before** they appear in headline prices.

It translates complex geospatial and environmental data into a clear, explainable ranking. It is not a price-prediction engine. Its purpose is to reduce uncertainty in early-stage location decisions by answering three questions in under one minute:

> **Where to look. What is changing. Why it matters.**

---

## Shift Score — Methodology

### Indicators

| Indicator | Source | Resolution | What it proxies |
|-----------|--------|------------|-----------------|
| **Imperviousness Density (IMD)** | Copernicus HRL 2018 | 10 m | Soil sealing / built-up intensity |
| **Tree Cover Density (TCD)** | Copernicus HRL 2018 | 10 m | Environmental quality / green presence |

Both are extracted via **zonal statistics** (mean per comune polygon) using the Python pipeline in `scripts/process_data.py`.

### Formula

```
ShiftScore = 0.55 × (100 − rank_IMD)  +  0.45 × rank_TCD
```

Where `rank_IMD` and `rank_TCD` are the **percentile ranks** of each comune within the full Lazio dataset (378 comuni). Percentile ranking ensures:

- Scores always span the full 0–100 range regardless of how compressed the raw data is
- The map colour gradient distinguishes municipalities meaningfully within the regional peer group
- Adding a new region in the future keeps relative rankings stable within that region

**Direction logic:**

| Component | Direction | Rationale |
|-----------|-----------|-----------|
| 100 − rank_IMD | Inverted | High sealing = mature built environment = lower transformation potential |
| rank_TCD | Direct | High tree cover = environmental quality signal = positive livability factor |

### Colour scale

The map colour runs **purple → orange → yellow → forest green**, normalised to the actual min/max scores within the loaded dataset. This ensures the full gradient is used regardless of how compressed the raw distribution is.

---

## Real Data Insights — Lazio 2018

*All figures derived from Copernicus HRL 2018 zonal statistics over 378 Lazio comuni (ISTAT 2025 boundaries).*

### Distribution summary

| Indicator | Min | p25 | Median | p75 | Max |
|-----------|-----|-----|--------|-----|-----|
| IMD (% sealed) | 0.0 | 0.6 | 1.4 | 3.2 | 32.7 |
| TCD (% tree cover) | 40.3 | 53.5 | 54.4 | 54.7 | 55.0 |
| **Shift Score** | **0.1** | **25.1** | **50.0** | **75.0** | **99.9** |

**Key finding:** Lazio is overwhelmingly rural — the median comune has only **1.4% sealed surface**. The top urbanism quartile (IMD ≥ 3.2%) accounts for just 95 of 378 comuni (25%) yet drives all of the structural contrast visible on the map.

### Highest Shift Score comuni (most open, most green)

| # | Comune | IMD | TCD | Score |
|---|--------|-----|-----|-------|
| 1 | Montenero Sabino | 0.0% | 55.0% | 99.9 |
| 2 | Varco Sabino | 0.1% | 55.0% | 99.4 |
| 3 | Vallepietra | 0.1% | 55.0% | 99.4 |
| 4 | Percile | 0.1% | 55.0% | 99.2 |
| 5 | Marcetelli | 0.1% | 55.0% | 98.8 |

→ All are small Sabine or Simbruini mountain comuni with near-zero built-up surface. High score here reflects structural openness, not urban transformation pressure.

### Lowest Shift Score comuni (most built-up)

| # | Comune | IMD | TCD | Score |
|---|--------|-----|-----|-------|
| 374 | Ciampino | 32.7% | 40.3% | 0.1 |
| 375 | Anzio | 25.3% | 43.6% | 0.4 |
| 376 | San Felice Circeo | 20.2% | 45.9% | 0.6 |
| 377 | Frosinone | 20.1% | 46.0% | 0.9 |
| 378 | Pomezia | 18.9% | 46.5% | 1.2 |

→ Ciampino (32.7% sealed) is the most intensely urbanised comune in Lazio — denser than Rome itself (17.1% IMD). Despite being a small municipality, it hosts the city airport and a dense residential grid.

### Roma

**Roma** — the region's capital — scores **2.2 / 100** (bottom 5). With 17.1% mean imperviousness across its vast territory (including the Agro Romano and green periphery), it sits at the 98th IMD percentile within Lazio. This reflects its status as the dominant urban pole: already consolidated, with limited structural openness relative to regional peers.

### Urban vs Rural split

| Group | N | Avg IMD | Avg Shift Score |
|-------|---|---------|-----------------|
| Urban (top IMD quartile, ≥3.2%) | 95 | — | 12.6 |
| Rural (bottom 3 quartiles) | 283 | — | 62.6 |

The 5× score gap between urban and rural comuni reflects the binary nature of the Lazio landscape: a handful of coastal and metropolitan municipalities absorb most of the region's built-up surface, while the interior remains structurally open.

---

## Features

- **Interactive map** — 378 Lazio comuni coloured by Shift Score (purple=low, green=high)
- **Ranked sidebar** — full leaderboard; click to select
- **Detail panel** — score with regional percentile context, both indicator bars, score formula, data attribution
- **Tooltip on hover** — comune name, Shift Score, IMD%, TCD%

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Map | Leaflet |
| Geo processing | Python · GeoPandas · Rasterio · Rasterstats · SciPy |
| Data | Copernicus HRL IMD + TCD 2018 (10 m) · ISTAT comuni 2025 |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Project status

**Stage: Real-data prototype — in active development**

### Completed
- [x] Vite + React scaffolding, GitHub Pages deployment
- [x] Interactive Leaflet map with colour-coded polygons
- [x] Ranked municipality list + detail panel
- [x] **Python geo pipeline:** ISTAT comuni → Lazio filter → IMD + TCD zonal statistics → percentile Shift Score
- [x] **Real boundaries:** ISTAT WGS84 shapefile (official, 2025)
- [x] **Real IMD indicator:** Copernicus HRL IMD 2018, 10 m resolution
- [x] **TCD indicator:** Copernicus HRL TCD 2018 (direct measurement where tiles available; modelled from IMD where not)
- [x] Data-relative colour scale (full gradient always used)
- [x] Score formula displayed inline in detail panel

### Known limitations
- TCD for Lazio currently **modelled** from IMD via linear relationship (the specific tile grid E44–E46, N19–N21 was not in the uploaded set). Score will improve once those tiles are added — re-run `scripts/process_data.py`
- Scores are static 2018 snapshots; no temporal trend yet
- Single-region (Lazio) — national expansion planned

### Next steps
- [ ] Load full TCD tiles for Lazio and re-run pipeline with measured values
- [ ] Expand to other Italian regions
- [ ] Add temporal dimension (2015 vs 2018 IMD change rate)
- [ ] Method & limitations page in the UI

---

## Running locally

```bash
cd urban-shift
npm install
npm run dev          # local dev server

npm run deploy       # build + push to GitHub Pages
```

Re-run the data pipeline (Python venv required):
```bash
# From repo root — requires geopandas, rasterio, rasterstats, scipy
.venv/bin/python3 scripts/process_data.py
```

---

## Data & security

- No personal data collected · no user accounts · no API keys in client code
- All source data is open and public (Copernicus Land Monitoring, ISTAT)
- Raw raster files are not exposed to the browser (only pre-aggregated JSON)

---

*Urban Shift is a portfolio-stage product using open data. Not intended for financial or investment advice.*
