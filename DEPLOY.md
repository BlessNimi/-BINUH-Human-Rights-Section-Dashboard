# GitHub Pages deployment

This dashboard is **static only** — everything GitHub Pages can host.

## What runs on GitHub Pages

| Included | Technology |
|----------|------------|
| HTML pages | `index.html`, `demographics.html`, etc. |
| Styles | `css/style.css` |
| Data | `js/data.js` (`BINUH_DATA` object) |
| Charts | [Plotly.js](https://plotly.com/javascript/) (CDN) |
| Maps | [Leaflet](https://leafletjs.com/) + CartoDB tiles (CDN) |
| Fonts | Google Fonts (CDN) |
| Chart export | html2canvas (CDN), optional |

## What does NOT run on GitHub Pages

| Excluded | Reason |
|----------|--------|
| `extract_data.py` | Python — local/CI only |
| `documents/*.csv` | Gitignored — never published |
| `requirements.txt` | For local ETL only |
| Node, npm, build step | Not required |

## Repo settings

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder **/ (root)**
4. Keep **`.nojekyll`** in the repo root (disables Jekyll so `_` paths work if added later)

## URL shape

Project site: `https://<user>.github.io/<repo-name>/`

All links use **relative paths** (`css/style.css`, `js/data.js`, `demographics.html`) so they work under that subpath.

## Updating published data

1. Locally: put CSV in `documents/`, run `python3 extract_data.py`
2. Commit and push **only** `js/data.js`
3. GitHub Pages rebuilds in ~1–2 minutes

## External services (browser)

The live site needs internet access for CDNs and map tiles. No backend API is used.
