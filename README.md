# BINUH Human Rights — Sexual Violence Dashboard

Public Q1 2026 dashboard for sexual violence incidents documented by the Human Rights Section, UN Integrated Office in Haiti (BINUH).

**Built for [GitHub Pages](https://pages.github.com/)** — static HTML/CSS/JS only, no server or build step on deploy.

## Live site

**https://mafiatun.github.io/binuh-hrd-dashboard/**

## GitHub Pages setup

1. Push this repo to GitHub
2. **Settings → Pages →** Branch **main**, folder **/**
3. Wait 1–2 minutes, open the Pages URL

See [DEPLOY.md](DEPLOY.md) for full details.

## Published data

| File | On GitHub? |
|------|------------|
| `js/data.js` | Yes — `BINUH_DATA` (pre-aggregated; what the site loads) |
| `documents/*.csv` | No — gitignored; local ETL input only |

## Local preview (recommended for testing)

**Do not** double-click HTML files (`file://`). Browsers block `data.js` and charts will stay empty.

1. Open Terminal in this project folder:

```bash
cd "/Users/mafilicious/Library/CloudStorage/OneDrive-UnitedNations/Projects/binuh-online-dasboard"
python3 -m http.server 8000
```

2. In your browser open:

- **Overview:** http://localhost:8000/index.html  
- **Geographic:** http://localhost:8000/geographic.html  
- **Perpetrators:** http://localhost:8000/perpetrators.html  

3. Stop the server with `Ctrl+C` in Terminal.

Optional — refresh data from CSV (CSV stays local, not on GitHub):

```bash
pip3 install -r requirements.txt
# Place Report_2.0.csv in documents/, then:
python3 extract_data.py
# Reload the browser (no server restart needed)
```

## Pages

Overview · Demographics · Perpetrators · Geographic · SV Types · Maps

## Disclaimer

Data are non-exhaustive and subject to underreporting.
