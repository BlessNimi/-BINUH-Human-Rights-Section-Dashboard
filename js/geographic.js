/* Geographic — Hotspot Analysis page renderer */

// Haiti commune → department mapping (derived from known administrative geography)
const COMMUNE_DEPT = {
  'Port-au-Prince':        'Ouest',
  'Delmas':                'Ouest',
  'Cité Soleil':           'Ouest',
  'Cite Soleil':           'Ouest',
  'Croix-des-Bouquets':    'Ouest',
  'Croix-Des-Bouquets':    'Ouest',
  'Pétion-Ville':          'Ouest',
  'Petion-Ville':          'Ouest',
  'Tabarre':               'Ouest',
  'Carrefour':             'Ouest',
  'Kenscoff':              'Ouest',
  'Gressier':              'Ouest',
  'Arcahaie':              'Ouest',
  'Cabaret':               'Ouest',
  'Léogâne':               'Ouest',
  'Leogane':               'Ouest',
  'Grand-Goâve':           'Ouest',
  'Thomazeau':             'Ouest',
  'Ganthier':              'Ouest',
  'Cornillon/Grand-Bois':  'Ouest',
  'Gonaïves':              'Artibonite',
  'Gonaives':              'Artibonite',
  'Saint-Marc':            'Artibonite',
  'Dessalines':            'Artibonite',
  'Liancourt':             'Artibonite',
  'Petite Rivière de l\'Artibonite': 'Artibonite',
  'Petite Rivière de lArtibonite':   'Artibonite',
  'Mirebalais':            'Centre',
  'Belladère':             'Centre',
  'Belladere':             'Centre',
  'Hinche':                'Centre',
  'Thomonde':              'Centre',
  'Gros Morne':            'Artibonite',
  'L\'Estère':             'Artibonite',
  'L\'Estere':             'Artibonite',
  'Verrettes':             'Artibonite',
  'Marchand Dessalines':   'Artibonite',
  'Cap-Haïtien':           'Nord',
  'Cap-Haitien':           'Nord',
  'Quartier Morin':        'Nord',
  'Milot':                 'Nord',
  'Acul du Nord':          'Nord',
  'Limbé':                 'Nord',
  'Limbe':                 'Nord',
  'Fort Liberté':          'Nord-Est',
  'Fort Liberte':          'Nord-Est',
  'Jacmel':                'Sud-Est',
  'Cayes':                 'Sud',
  'Les Cayes':             'Sud',
  'Jérémie':               'Grand\'Anse',
  'Jeremie':               'Grand\'Anse',
  'Port-de-Paix':          'Nord-Ouest',
};

function getDept(commune) {
  return COMMUNE_DEPT[commune] || 'Other';
}

function renderGeographic() {
  const q   = cur();
  const top = sortedCommunes(20);
  const all = sortedCommunes(0); // all communes
  const totalVictims = q.total || 0;
  const fr = getLang() === 'fr';
  const vLabels = fr ? ['Tués','Blessés','Enlevés'] : ['Killed','Injured','Abducted'];

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const topCommune = top[0];
  if (topCommune) {
    const el = document.getElementById('kpi-top-commune');
    if (el) el.textContent = topCommune[0];
    const sub = document.getElementById('kpi-top-commune-sub');
    if (sub) sub.textContent = fr
      ? `${topCommune[1].total.toLocaleString()} victimes · ${pctN(topCommune[1].total, totalVictims)}% du total national`
      : `${topCommune[1].total.toLocaleString()} victims · ${pctN(topCommune[1].total, totalVictims)}% of national total`;
    const pctEl = document.getElementById('kpi-top-pct');
    if (pctEl) pctEl.textContent = pctN(topCommune[1].total, totalVictims || 1) + '%';
  }

  // Department totals
  const deptTotals = {};
  all.forEach(([c, d]) => {
    const dept = getDept(c);
    if (!deptTotals[dept]) deptTotals[dept] = { total: 0, killed: 0, injured: 0, abducted: 0 };
    deptTotals[dept].total    += d.total;
    deptTotals[dept].killed   += d.killed;
    deptTotals[dept].injured  += d.injured;
    deptTotals[dept].abducted += d.abducted;
  });
  const deptSorted = Object.entries(deptTotals).sort((a, b) => b[1].total - a[1].total).filter(([d]) => d !== 'Other');
  const topDept = deptSorted[0];
  if (topDept) {
    const el = document.getElementById('kpi-top-dept');
    if (el) el.textContent = topDept[0];
    const sub = document.getElementById('kpi-top-dept-sub');
    if (sub) sub.textContent = fr
      ? `${topDept[1].total.toLocaleString()} victimes · ${pctN(topDept[1].total, totalVictims)}% du national`
      : `${topDept[1].total.toLocaleString()} victims · ${pctN(topDept[1].total, totalVictims)}% of national`;
  }

  const communes = Object.keys(D.by_commune || {});
  const commEl = document.getElementById('kpi-communes');
  if (commEl) commEl.dataset.count = communes.length;
  const totEl = document.getElementById('kpi-total');
  if (totEl) totEl.dataset.count = (q.killed || 0) + (q.injured || 0);

  // ── S2: Department charts ──────────────────────────────────────────────────
  const DEPT_COLORS = {
    'Ouest':       '#f43f5e',
    'Artibonite':  '#fb923c',
    'Centre':      '#fbbf24',
    'Nord':        '#34d399',
    'Nord-Est':    '#60a5fa',
    'Nord-Ouest':  '#818cf8',
    'Sud':         '#a78bfa',
    'Sud-Est':     '#f472b6',
    'Grand\'Anse': '#5eead4',
    'Nippes':      '#94a3b8',
    'Other':       '#475569',
  };

  if (deptSorted.length) {
    const dNames = deptSorted.map(d => d[0]).reverse();
    const dVals  = deptSorted.map(d => d[1].total).reverse();
    const dCols  = dNames.map(d => DEPT_COLORS[d] || C.accent);

    plotChart('chart-dept-bar', [{
      type: 'bar', orientation: 'h',
      y: dNames, x: dVals,
      marker: { color: dCols },
      text: dVals.map(v => v.toLocaleString()), textposition: 'outside',
      hovertemplate: `<b>%{y}</b><br>%{x:,} ${fr ? 'victimes' : 'victims'}<extra></extra>`,
    }], { ...baseLayout(), height: 340, showlegend: false, margin: { l: 130, r: 60, t: 20, b: 40 } });

    plotChart('chart-dept-donut', [donutTrace(
      deptSorted.map(d => d[0]),
      deptSorted.map(d => d[1].total),
      deptSorted.map(d => DEPT_COLORS[d[0]] || C.accent)
    )], {
      ...pieLayout(320),
      annotations: [{ text: `<b>${fmt((q.killed || 0) + (q.injured || 0))}</b><br><span style="font-size:10px">Total</span>`, x: 0.5, y: 0.5, showarrow: false, font: { color: C.text, size: 13 } }]
    });
  }

  // ── S3: Commune charts ────────────────────────────────────────────────────
  if (top.length) {
    const names = top.map(t => t[0]).reverse();
    const tots  = top.map(t => t[1].total).reverse();

    plotChart('chart-commune-bar', [{
      type: 'bar', orientation: 'h',
      y: names, x: tots,
      marker: { color: C.accent },
      text: tots.map(v => v.toLocaleString()), textposition: 'outside',
      hovertemplate: `<b>%{y}</b><br>%{x:,} ${fr ? 'victimes' : 'victims'}<extra></extra>`,
    }], { ...baseLayout(), height: Math.max(380, names.length * 24), showlegend: false, margin: { l: 180, r: 60, t: 20, b: 40 } });

    plotChart('chart-commune-stack', [
      { name: vLabels[0], type: 'bar', orientation: 'h', y: names, x: top.map(t => t[1].killed).reverse(),   marker: { color: C.killed }   },
      { name: vLabels[1], type: 'bar', orientation: 'h', y: names, x: top.map(t => t[1].injured).reverse(),  marker: { color: C.injured }  },
      { name: vLabels[2], type: 'bar', orientation: 'h', y: names, x: top.map(t => t[1].abducted).reverse(), marker: { color: C.abducted } },
    ], { ...baseLayout(), barmode: 'stack', height: Math.max(380, names.length * 24), margin: { l: 180, r: 20, t: 20, b: 40 } });
  }

  // ── S4: Scatter / bubble ─────────────────────────────────────────────────
  if (all.length) {
    const ranked  = all.slice(0, 16);
    const xRanks  = ranked.map((_, i) => i + 1);
    const yKilled = ranked.map(t => t[1].killed);
    const sizes   = ranked.map(t => Math.max(8, Math.sqrt(t[1].total) * 4));
    const cols    = ranked.map(t => DEPT_COLORS[getDept(t[0])] || C.accent);
    const labels  = ranked.map(t => t[0]);

    plotChart('chart-commune-scatter', [{
      type: 'scatter', mode: 'markers+text',
      x: xRanks, y: yKilled,
      text: labels,
      textposition: 'top center',
      textfont: { size: 9, color: '#8ba8c4' },
      marker: { size: sizes, color: cols, opacity: 0.8, line: { color: '#fff', width: 1 } },
      hovertemplate: `<b>%{text}</b><br>${fr ? 'Rang' : 'Rank'}: %{x}<br>${fr ? 'Tués' : 'Killed'}: %{y:,}<extra></extra>`,
    }], {
      ...baseLayout(),
      height: 420,
      xaxis: { ...baseLayout().xaxis, title: { text: fr ? 'Rang commune (par victimes totales)' : 'Commune rank (by total victims)', font: { color: C.textMuted } } },
      yaxis: { ...baseLayout().yaxis, title: { text: fr ? 'Tués' : 'Killed', font: { color: C.textMuted } } },
      showlegend: false,
    });
  }

  // ── S5: Data table ────────────────────────────────────────────────────────
  const tbody = document.getElementById('commune-tbody');
  if (tbody) {
    tbody.innerHTML = all.map(([c, d], i) => `<tr>
      <td style="color:#8ba8c4">${i + 1}</td>
      <td><strong>${c}</strong></td>
      <td style="color:#8ba8c4">${getDept(c)}</td>
      <td style="text-align:right;font-weight:700">${d.total.toLocaleString()}</td>
      <td style="text-align:right;color:var(--killed,#f43f5e)">${d.killed.toLocaleString()}</td>
      <td style="text-align:right;color:var(--injured,#fb923c)">${d.injured.toLocaleString()}</td>
      <td style="text-align:right;color:#c084fc">${d.abducted.toLocaleString()}</td>
      <td style="text-align:right;color:#8ba8c4">${d.incidents}</td>
    </tr>`).join('');
  }

  // ── S6: Insights ──────────────────────────────────────────────────────────
  const leftEl  = document.getElementById('insights-left');
  const rightEl = document.getElementById('insights-right');
  const top1    = all[0];
  const top2    = all[1];
  const top5Total = all.slice(0, 5).reduce((s, t) => s + t[1].total, 0);

  if (leftEl) leftEl.innerHTML = (fr ? [
    topDept ? `<b>${topDept[0]}</b> est le département le plus affecté avec <b>${fmt(topDept[1].total)}</b> victimes — ${pctN(topDept[1].total, totalVictims || 1)}% du total national T1 2026.` : '',
    top1 ? `<b>${top1[0]}</b> est la commune la plus affectée avec <b>${fmt(top1[1].total)}</b> victimes (${pctN(top1[1].total, totalVictims || 1)}% du total national).` : '',
    top2 ? `<b>${top2[0]}</b> est la deuxième commune la plus affectée avec <b>${fmt(top2[1].total)}</b> victimes.` : '',
    top5Total ? `Les cinq communes les plus affectées totalisent <b>${fmt(top5Total)}</b> victimes — <b>${pctN(top5Total, totalVictims || 1)}%</b> de toutes les victimes du T1 2026.` : '',
  ] : [
    topDept ? `<b>${topDept[0]}</b> is the most affected department with <b>${fmt(topDept[1].total)}</b> victims — ${pctN(topDept[1].total, totalVictims || 1)}% of the national Q1 2026 total.` : '',
    top1 ? `<b>${top1[0]}</b> is the most affected commune with <b>${fmt(top1[1].total)}</b> victims (${pctN(top1[1].total, totalVictims || 1)}% of national total).` : '',
    top2 ? `<b>${top2[0]}</b> is the second most affected commune with <b>${fmt(top2[1].total)}</b> victims.` : '',
    top5Total ? `The five most affected communes account for <b>${fmt(top5Total)}</b> victims — <b>${pctN(top5Total, totalVictims || 1)}%</b> of all Q1 2026 casualties.` : '',
  ]).filter(Boolean).map(s => `<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `<b>${communes.length}</b> communes ont documenté des victimes au T1 2026, indiquant une distribution géographique étendue de la violence liée aux gangs.`,
    top1 ? `Les communes de l'aire métropolitaine de Port-au-Prince dominent la liste des points chauds — une concentration qui reflète la densité de population et l'expansion territoriale des gangs.` : '',
    `Les communes avec des taux d'enlèvement élevés en plus des tués et blessés peuvent indiquer des opérations actives de kidnapping contre rançon nécessitant une réponse dédiée.`,
    `La concentration géographique dans un nombre limité de communes fournit un cadre de priorisation pour la réponse de protection et l'allocation des ressources.`,
  ] : [
    `<b>${communes.length}</b> communes documented casualties in Q1 2026, indicating a widespread geographic distribution of gang-related violence.`,
    top1 ? `Port-au-Prince metropolitan area communes dominate the hotspot list — a concentration that reflects both population density and gang territorial expansion.` : '',
    `Communes with high abduction rates alongside killings and injuries may indicate active kidnapping-for-ransom operations requiring dedicated response.`,
    `Geographic concentration in a small number of communes provides a prioritisation framework for protection response and resource allocation.`,
  ]).filter(Boolean).map(s => `<li>${s}</li>`).join('');

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderGeographic);
onDashboardReady(renderGeographic);
