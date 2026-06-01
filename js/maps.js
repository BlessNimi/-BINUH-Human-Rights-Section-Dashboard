/* Maps — Spatial Analysis page */

const TILE_URL      = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_FALLBACK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_CENTER    = [18.85, -72.65];
const MAP_ZOOM      = 9;
const HT_BOUNDS     = L.latLngBounds([[17.5, -74.5], [20.2, -71.5]]);

// Known commune centroids for MARA bubbles (no lat/lon in MARA data)
const COMMUNE_CENTROIDS = {
  'Port-au-Prince':   [18.547, -72.340],
  'Delmas':           [18.555, -72.306],
  'Cité Soleil':      [18.594, -72.310],
  'Cite Soleil':      [18.594, -72.310],
  'Croix-des-Bouquets':[18.731,-72.308],
  'Croix-Des-Bouquets':[18.731,-72.308],
  'Pétion-Ville':     [18.484, -72.316],
  'Petion-Ville':     [18.484, -72.316],
  'Tabarre':          [18.596, -72.285],
  'Cabaret':          [18.734, -72.418],
  'Kenscoff':         [18.372, -72.286],
  'Gressier':         [18.544, -72.477],
  'Carrefour':        [18.540, -72.400],
  'Arcahaie':         [18.770, -72.490],
  'Gros Morne':       [19.674, -72.633],
  'Mirebalais':       [18.741, -72.008],
  'Dessalines':       [19.181, -72.600],
  'Gonaïves':         [19.446, -72.688],
  'Gonaives':         [19.446, -72.688],
  'Saint-Marc':       [18.995, -72.693],
  'Liancourt':        [19.124, -72.536],
};

let map     = null;
let markers = [];
let tileLayer = null;
let activeTab = 'casualty';

function getTabTitle(tab) {
  return { casualty: t('map.card.casualty'), perpetrator: t('map.card.perpetrator'), mara: t('map.card.mara') }[tab] || '';
}

// Colour helpers
function violColor(v) {
  return { killed:'#f43f5e', injured:'#fb923c', abducted:'#c084fc' }[v] || '#009EDB';
}
function maraBubbleColor(type) {
  return (String(type).toLowerCase() === 'collective rape') ? '#f9a8d4' : '#ec4899';
}

// Bubble radius from victim count
function bubbleRadius(n, scale=1) {
  return Math.max(5, Math.min(38, Math.sqrt(n || 1) * 4 * scale));
}

function clearMarkers() {
  markers.forEach(m => { if (map && map.hasLayer(m)) map.removeLayer(m); });
  markers = [];
}

// ── CASUALTY MAP ────────────────────────────────────────────────────────────
function drawCasualtyMap() {
  const monthF = document.getElementById('month-filter')?.value || 'all';
  const violF  = document.getElementById('viol-filter')?.value  || 'all';
  const perpF  = document.getElementById('perp-filter')?.value  || 'all';
  const locs   = (typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D).locations || [];

  locs.forEach(loc => {
    if (monthF !== 'all' && !(loc.months || []).includes(monthF)) return;
    if (violF  !== 'all' && loc.violation   !== violF) return;
    if (perpF  !== 'all' && loc.perpetrator !== perpF) return;
    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    const r = bubbleRadius(loc.victims);
    const m = L.circleMarker([lat, lon], {
      radius: r,
      fillColor: violColor(loc.violation),
      color: '#fff', weight: 1, fillOpacity: 0.75,
    });
    m.bindTooltip(`<b>${loc.commune}</b><br>${loc.violation} · ${loc.victims} victims<br>Perpetrator: ${lblPerp(loc.perpetrator)}`, { sticky: true });
    m.bindPopup(`<b>${loc.commune}</b><br>Violation: <b>${loc.violation}</b><br>Perpetrator: <b>${lblPerp(loc.perpetrator)}</b><br>Victims: <b>${loc.victims}</b><br>Period: Q1 2026`);
    m.addTo(map);
    markers.push(m);
  });
}

// ── PERPETRATOR MAP ──────────────────────────────────────────────────────────
function drawPerpMap() {
  const monthF = document.getElementById('month-filter')?.value || 'all';
  const perpF  = document.getElementById('perp-filter')?.value  || 'all';
  const locs   = (typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D).locations || [];

  // Aggregate by commune+perpetrator to avoid overlapping same-spot dots
  const agg = {};
  locs.forEach(loc => {
    if (monthF !== 'all' && !(loc.months || []).includes(monthF)) return;
    if (perpF  !== 'all' && loc.perpetrator !== perpF) return;
    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const key = `${loc.commune}||${loc.perpetrator}`;
    if (!agg[key]) agg[key] = { lat, lon, commune: loc.commune, perpetrator: loc.perpetrator, victims: 0 };
    agg[key].victims += loc.victims;
  });

  Object.values(agg).forEach(loc => {
    const r = bubbleRadius(loc.victims);
    const color = perpColor(loc.perpetrator);
    const m = L.circleMarker([loc.lat, loc.lon], {
      radius: r, fillColor: color, color: '#fff', weight: 1, fillOpacity: 0.75,
    });
    m.bindTooltip(`<b>${loc.commune}</b><br>${lblPerp(loc.perpetrator)}<br>${loc.victims} victims`, { sticky: true });
    m.bindPopup(`<b>${loc.commune}</b><br>Perpetrator: <b>${lblPerp(loc.perpetrator)}</b><br>Victims: <b>${loc.victims}</b><br>Period: Q1 2026`);
    m.addTo(map);
    markers.push(m);
  });
}

// ── MARA MAP ─────────────────────────────────────────────────────────────────
function drawMaraMap() {
  const maraCommune = (typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D).mara?.current?.by_commune || {};

  Object.entries(maraCommune).forEach(([commune, count]) => {
    const coords = COMMUNE_CENTROIDS[commune];
    if (!coords) return;
    const r = bubbleRadius(count, 1.2);
    const m = L.circleMarker(coords, {
      radius: r, fillColor: '#ec4899', color: '#fff', weight: 1, fillOpacity: 0.8,
    });
    m.bindTooltip(`<b>${commune}</b><br>Sexual violence victims: ${count}`, { sticky: true });
    m.bindPopup(`<b>${commune}</b><br>Sexual violence involving armed actors: <b>${count} victims</b><br>Period: Q1 2026`);
    m.addTo(map);
    markers.push(m);
  });
}

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
function updateSidebar() {
  const D2 = typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D;
  const locs = D2.locations || [];
  const q    = D2.current   || {};
  const mc   = D2.mara?.current || {};

  const titleEl    = document.getElementById('map-card-title');
  const legTitle   = document.getElementById('legend-title');
  const legItems   = document.getElementById('legend-items');
  const legSizes   = document.getElementById('legend-sizes');
  const sumTitle   = document.getElementById('summary-title');
  const sumEl      = document.getElementById('sidebar-summary');
  const hotTitle   = document.getElementById('hotspots-title');
  const hotEl      = document.getElementById('sidebar-hotspots');

  if (titleEl) titleEl.textContent = getTabTitle(activeTab);

  const dot  = (color, label) => `<div class="legend-item"><div class="legend-dot" style="background:${color}"></div>${label}</div>`;
  const szLi = (r, label) => `<div class="legend-item"><div class="legend-circle" style="width:${r*2}px;height:${r*2}px"></div><span style="color:#8ba8c4">${label}</span></div>`;
  const statRow = (label, val) => `<div class="stat-row"><span class="stat-label">${label}</span><span class="stat-val">${val}</span></div>`;

  if (activeTab === 'casualty') {
    if (legTitle)  legTitle.textContent  = t('map.legend.title');
    if (legItems)  legItems.innerHTML    = dot('#f43f5e', t('viol.killed')) + dot('#fb923c', t('viol.injured')) + dot('#c084fc', t('viol.abducted'));
    if (legSizes)  legSizes.innerHTML    = szLi(5,'1–10') + szLi(10,'10–50') + szLi(18,'50+');
    if (sumTitle)  sumTitle.textContent  = t('map.summary.title');
    if (sumEl) {
      const shown = markers.length;
      sumEl.innerHTML = statRow(t('map.stat.locations'), shown)
        + statRow(t('map.stat.total_victims'), (q.total||0).toLocaleString())
        + statRow(t('map.stat.killed'), (q.killed||0).toLocaleString())
        + statRow(t('map.stat.injured'), (q.injured||0).toLocaleString())
        + statRow(t('map.stat.abducted'), (q.abducted||0).toLocaleString());
    }
    if (hotTitle)  hotTitle.textContent  = t('map.hotspots.title');
    if (hotEl) {
      const top = Object.entries(D2.by_commune||{}).sort((a,b)=>b[1].total-a[1].total).slice(0,5);
      hotEl.innerHTML = top.map(([c,d],i) =>
        `<div class="hotspot-item"><span class="hotspot-rank">${i+1}.</span>${c}<span class="hotspot-count">${d.total}</span></div>`
      ).join('');
    }

  } else if (activeTab === 'perpetrator') {
    if (legTitle)  legTitle.textContent  = t('map.legend.perpetrator');
    if (legItems)  legItems.innerHTML    = PERPS.map(p => dot(perpColor(p), lblPerp(p))).join('');
    if (legSizes)  legSizes.innerHTML    = szLi(5,'1–10') + szLi(10,'10–50') + szLi(18,'50+');
    if (sumTitle)  sumTitle.textContent  = t('map.summary.perpetrator');
    if (sumEl) {
      const perpTotals = q.by_perpetrator || {};
      sumEl.innerHTML = statRow(t('map.stat.total_victims'), (q.total||0).toLocaleString())
        + PERPS.filter(p => perpTotals[p]).map(p => statRow(lblPerp(p), (perpTotals[p]||0).toLocaleString())).join('');
    }
    if (hotTitle)  hotTitle.textContent  = t('map.hotspots.perp');
    if (hotEl) {
      const top = Object.entries(D2.by_commune||{}).sort((a,b)=>b[1].total-a[1].total).slice(0,5);
      hotEl.innerHTML = top.map(([c,d],i) => {
        const topPerp = PERPS.sort((a,b)=>(d.by_perpetrator?.[b]||0)-(d.by_perpetrator?.[a]||0))[0];
        return `<div class="hotspot-item"><span class="hotspot-rank">${i+1}.</span>${c} — ${lblPerp(topPerp)}<span class="hotspot-count">${d.total}</span></div>`;
      }).join('');
    }

  } else {
    if (legTitle)  legTitle.textContent  = t('map.legend.mara');
    if (legItems)  legItems.innerHTML    = dot('#ec4899', t('map.legend.sexual')) + dot('#f9a8d4', t('map.legend.coll_relative'));
    if (legSizes)  legSizes.innerHTML    = szLi(5,'1–5') + szLi(10,'5–20') + szLi(18,'20+');
    if (sumTitle)  sumTitle.textContent  = t('map.summary.mara');
    if (sumEl) {
      sumEl.innerHTML = statRow(t('map.stat.mara_total'), (mc.total||0).toLocaleString())
        + statRow(t('map.stat.rape'), (mc.rape||0).toLocaleString())
        + statRow(t('map.stat.coll_rape'), (mc.collective_rape||0).toLocaleString())
        + statRow(t('map.stat.female'), (mc.gender?.female||0).toLocaleString())
        + statRow(t('map.stat.minors'), (mc.by_age?.minor||0).toLocaleString());
    }
    if (hotTitle)  hotTitle.textContent  = t('map.hotspots.title');
    if (hotEl) {
      const byC = mc.by_commune || {};
      const top = Object.entries(byC).sort((a,b)=>b[1]-a[1]).slice(0,5);
      hotEl.innerHTML = top.map(([c,v],i) =>
        `<div class="hotspot-item"><span class="hotspot-rank">${i+1}.</span>${c}<span class="hotspot-count">${v}</span></div>`
      ).join('');
    }
  }
}

// ── TOGGLE FILTER VISIBILITY ─────────────────────────────────────────────────
function updateFilterVisibility() {
  const violSel = document.getElementById('viol-filter');
  const perpSel = document.getElementById('perp-filter');
  if (violSel) violSel.style.display = activeTab === 'casualty' ? '' : 'none';
  if (perpSel) perpSel.style.display = activeTab === 'mara'     ? 'none' : '';
}

// ── MAIN UPDATE ───────────────────────────────────────────────────────────────
function updateMap() {
  if (!map || typeof L === 'undefined') return;
  clearMarkers();
  if (activeTab === 'casualty')    drawCasualtyMap();
  else if (activeTab === 'perpetrator') drawPerpMap();
  else drawMaraMap();

  if (markers.length) {
    try { map.fitBounds(L.featureGroup(markers).getBounds().pad(0.15)); }
    catch(e) { map.setView(MAP_CENTER, MAP_ZOOM); }
  } else {
    map.setView(MAP_CENTER, MAP_ZOOM);
  }
  updateSidebar();
}

// ── BUILD MAP ─────────────────────────────────────────────────────────────────
function buildMap() {
  if (typeof L === 'undefined') { console.error('Leaflet not loaded'); return; }
  const container = document.getElementById('map-container');
  if (!container) return;

  if (map) { map.remove(); map = null; tileLayer = null; markers = []; }

  map = L.map('map-container', { center: MAP_CENTER, zoom: MAP_ZOOM, maxBounds: HT_BOUNDS, minZoom: 7 });
  tileLayer = L.tileLayer(TILE_URL, { attribution: '© OpenStreetMap contributors © CARTO', maxZoom: 19 });
  tileLayer.addTo(map);
  tileLayer.on('tileerror', () => {
    if (map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(TILE_FALLBACK, { attribution: '© OpenStreetMap', maxZoom: 19 });
    tileLayer.addTo(map);
  });

  updateMap();
  setTimeout(() => map?.invalidateSize(), 150);
}

// ── EXPORT ───────────────────────────────────────────────────────────────────
function exportCSV() {
  const D2  = typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D;
  let rows  = [['Commune', 'Violation', 'Perpetrator', 'Victims', 'Period']];
  if (activeTab === 'mara') {
    rows = [['Commune', 'Sexual Violence Victims', 'Period']];
    Object.entries(D2.mara?.current?.by_commune || {}).forEach(([c,v]) => rows.push([c, v, 'Q1 2026']));
  } else {
    (D2.locations || []).forEach(l => rows.push([l.commune, l.violation, lblPerp(l.perpetrator), l.victims, 'Q1 2026']));
  }
  downloadCSV(rows, `binuh-${activeTab}-map.csv`);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof BINUH_DATA === 'undefined') return;

  // Tab switching
  document.querySelectorAll('.map-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      updateFilterVisibility();
      updateMap();
    });
  });

  // Filters
  ['month-filter', 'viol-filter', 'perp-filter'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateMap);
  });

  // Export buttons
  document.getElementById('btn-png-export')?.addEventListener('click', () => {
    if (map) map.invalidateSize();
    alert('PNG export: use your browser\'s screenshot or the Plotly PNG buttons on other pages.');
  });
  document.getElementById('btn-csv-export')?.addEventListener('click', exportCSV);

  buildMap();

  window.addEventListener('binuh:langchange', () => {
    applyStaticI18n();
    updateSidebar();
  });
});
