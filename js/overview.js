/* Overview page renderer */
function renderOverview() {
  const q  = cur();
  const mc = maraCur();
  const total      = q.total || 0;
  const casualties = (q.killed || 0) + (q.injured || 0);
  const fr = getLang() === 'fr';

  // Period label
  const el = document.getElementById('page-period');
  if (el) el.textContent = fr ? 'T1 2026' : (D.meta?.period_label || 'Q1 2026');

  // KPIs — total casualties = killed + injured (abductions tracked separately)
  setKpi('kpi-total',   casualties);
  setKpi('kpi-killed',  q.killed  || 0);
  setKpi('kpi-injured', q.injured || 0);
  setKpi('kpi-abducted',q.abducted|| 0);
  setKpi('kpi-mara',    mc.total  || 0);

  const pctEl = (id, v, w) => { const e = document.getElementById(id); if (e) e.textContent = `${pctN(v,w)}% ${fr ? 'du total' : 'of total'}`; };
  pctEl('kpi-killed-pct',   q.killed,   casualties);
  pctEl('kpi-injured-pct',  q.injured,  casualties);
  pctEl('kpi-abducted-pct', q.abducted, total);

  // MARA note (generated so it can be translated)
  const noteBody = document.getElementById('mara-note-body');
  if (noteBody) {
    const n = fmt(mc.total || 0);
    if (fr) {
      noteBody.innerHTML = `<strong>Note sur la violence sexuelle impliquant des acteurs armés :</strong> Les <span class="sgbv-note-count">${n}</span> cas documentés au T1 2026 sont suivis selon une méthodologie de reporting distincte et ne sont <strong>pas inclus</strong> dans le total des victimes ci-dessus. Les inclure ensemble entraînerait un double comptage. <a class="sgbv-note-link" href="mara.html">Voir l'analyse complète →</a>`;
    } else {
      noteBody.innerHTML = `<strong>Note on sexual violence involving armed actors:</strong> The <span class="sgbv-note-count">${n}</span> cases documented in Q1 2026 are tracked through a separate reporting methodology and are <strong>not included</strong> in the total victim count above. Including them together would result in double-counting. <a class="sgbv-note-link" href="mara.html">View full analysis →</a>`;
    }
  }

  // S2-Card1: Violation donut
  const annoTotal = `<b>${fmt(casualties)}</b><br><span style="font-size:10px">${fr ? 'Victimes' : 'Casualties'}</span>`;
  plotChart('chart-violation-donut', [donutTrace(
    fr ? ['Tués', 'Blessés', 'Enlevés'] : ['Killed', 'Injured', 'Abducted'],
    [q.killed, q.injured, q.abducted],
    [C.killed, C.injured, C.abducted]
  )], {
    ...pieLayout(280),
    annotations: [{ text: annoTotal, x:0.5, y:0.5, showarrow:false, font:{color:C.text,size:13} }]
  });

  // S2-Card2: % progress bars
  const barsEl = document.getElementById('pct-bars');
  if (barsEl && total) {
    const items = fr ? [
      { label:'Tués',    val:q.killed,   color:C.killed },
      { label:'Blessés', val:q.injured,  color:C.injured },
      { label:'Enlevés', val:q.abducted, color:C.abducted },
    ] : [
      { label:'Killed',   val:q.killed,   color:C.killed },
      { label:'Injured',  val:q.injured,  color:C.injured },
      { label:'Abducted', val:q.abducted, color:C.abducted },
    ];
    barsEl.innerHTML = items.map(({label,val,color}) => {
      const p = pctN(val, total);
      return `<div class="progress-row">
        <div class="progress-label">${label}</div>
        <div class="progress-track"><div class="progress-fill" style="width:${p}%;background:${color}"></div></div>
        <div class="progress-val">${p}%</div>
      </div>`;
    }).join('');
  }

  // MARA QoQ table (last 4 quarters)
  const maraBody = document.getElementById('mara-qoq-body');
  if (maraBody) {
    const trend = (D.mara?.quarterly_trend || []).slice(-4);
    maraBody.innerHTML = trend.map(r => `<tr>
      <td>${r.label}</td>
      <td style="text-align:right;font-weight:600">${fmt(r.total)}</td>
      <td style="text-align:right;color:${C.female}">${fmt(r.rape)}</td>
      <td style="text-align:right;color:${C.girls}">${fmt(r.collective_rape)}</td>
    </tr>`).join('');
  }

  // S2-Card3: Gender donut
  const g = q.gender || {};
  const gTotal = (g.male||0)+(g.female||0)+(g.boys||0)+(g.girls||0);
  plotChart('chart-gender-donut', [donutTrace(
    fr ? ['Hommes','Femmes','Garçons','Filles'] : ['Men','Women','Boys','Girls'],
    [g.male||0, g.female||0, g.boys||0, g.girls||0],
    [C.male, C.female, C.boys, C.girls]
  )], {
    ...pieLayout(280),
    annotations: [{ text:`<b>${fmt(gTotal)}</b><br><span style="font-size:10px">${fr ? 'Total' : 'Total'}</span>`, x:0.5, y:0.5, showarrow:false, font:{color:C.text,size:13} }]
  });

  // S3-Card1: MARA quarterly trend grouped bar
  const maraTrend = D.mara?.quarterly_trend || [];
  if (maraTrend.length) {
    plotChart('chart-mara-trend', [
      { name: fr ? 'Viol' : 'Rape', type:'bar', x:maraTrend.map(r=>r.label), y:maraTrend.map(r=>r.rape), marker:{color:C.female} },
      { name: fr ? 'Viol collectif' : 'Collective Rape', type:'bar', x:maraTrend.map(r=>r.label), y:maraTrend.map(r=>r.collective_rape), marker:{color:C.girls} },
    ], { ...baseLayout(), barmode:'stack', height:320, xaxis:{tickangle:-35} });
  }

  // S3-Card2: Monthly bar
  const monthly = D.monthly || {};
  const mMonths = MONTHS.filter(m => monthly[m]);
  const mLabels = mMonths.map(lblMonth);
  if (mMonths.length) {
    plotChart('chart-monthly', [
      { name: fr ? 'Tués' : 'Killed',   type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].killed),   marker:{color:C.killed}   },
      { name: fr ? 'Blessés' : 'Injured',  type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].injured),  marker:{color:C.injured}  },
      { name: fr ? 'Enlevés' : 'Abducted', type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].abducted), marker:{color:C.abducted} },
    ], { ...baseLayout(), barmode:'stack', height:320 });
  }

  // S4: Monthly full-width grouped bar
  if (mMonths.length) {
    plotChart('chart-monthly-full', [
      { name: fr ? 'Tués' : 'Killed',   type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].killed),   marker:{color:C.killed}   },
      { name: fr ? 'Blessés' : 'Injured',  type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].injured),  marker:{color:C.injured}  },
      { name: fr ? 'Enlevés' : 'Abducted', type:'bar', x:mLabels, y:mMonths.map(m=>monthly[m].abducted), marker:{color:C.abducted}, opacity:0.7 },
    ], { ...baseLayout(), barmode:'group', height:360, legend:{orientation:'h',x:0,y:-0.18} });
  }

  // S5: Insights
  const top = sortedCommunes(5);
  const topCommune = top[0];
  const perpData = q.by_perpetrator || {};
  const gangVics = perpData['Gangs'] || 0;
  const sfVics   = perpData['PNH / HNP'] || 0;
  const leftEl  = document.getElementById('insights-left');
  const rightEl = document.getElementById('insights-right');

  if (leftEl) leftEl.innerHTML = (fr ? [
    `<b>${fmt(casualties)}</b> victimes totales (tués et blessés) de violence liée aux gangs documentées au T1 2026 en Haïti.`,
    `Les tués représentent la forme de violence la plus fréquente : <b>${fmt(q.killed)}</b> tués (${pctN(q.killed,casualties)}% des victimes), suivis de <b>${fmt(q.injured)}</b> blessés. Enlèvements : <b>${fmt(q.abducted)}</b>.`,
    topCommune ? `<b>${topCommune[0]}</b> est la commune la plus affectée avec <b>${fmt(topCommune[1].total)}</b> victimes — ${pctN(topCommune[1].total,total)}% du total national.` : '',
    `Les hommes représentent la majorité des victimes (${pctN(g.male,gTotal)}%), tandis que les femmes et les enfants représentent ensemble ${pctN((g.female||0)+(g.boys||0)+(g.girls||0),gTotal)}%.`,
  ] : [
    `<b>${fmt(casualties)}</b> total casualties (killed and injured) from gang-related violence in Haiti documented in Q1 2026.`,
    `Killing is the most prevalent harm: <b>${fmt(q.killed)}</b> killed (${pctN(q.killed,casualties)}% of casualties), followed by <b>${fmt(q.injured)}</b> injured. Abductions: <b>${fmt(q.abducted)}</b>.`,
    topCommune ? `<b>${topCommune[0]}</b> is the most affected commune with <b>${fmt(topCommune[1].total)}</b> victims — ${pctN(topCommune[1].total,total)}% of the national total.` : '',
    `Men represent the majority of victims (${pctN(g.male,gTotal)}%), while women and children together account for ${pctN((g.female||0)+(g.boys||0)+(g.girls||0),gTotal)}%.`,
  ]).filter(Boolean).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `<b>${fmt(mc.total||0)}</b> cas de violence sexuelle impliquant des acteurs armés documentés au T1 2026 — <b>${fmt(mc.rape||0)}</b> viols et <b>${fmt(mc.collective_rape||0)}</b> viols collectifs.`,
    `Les victimes de violence sexuelle impliquant des acteurs armés sont en grande majorité des femmes : <b>${fmt(mc.gender?.female||0)}</b> sur ${fmt(mc.total||0)} cas (${pctN(mc.gender?.female||0,mc.total||1)}%).`,
    `Les Forces de sécurité sont présumées responsables de <b>${fmt(sfVics)}</b> victimes (${pctN(sfVics,total)}% du total). Les Gangs : <b>${fmt(gangVics)}</b> victimes (${pctN(gangVics,total)}%).`,
    `Ces données sont suivies séparément des chiffres de victimes principaux pour éviter tout double comptage — voir la <a href="mara.html" style="color:var(--accent)">page Violence sexuelle impliquant des acteurs armés</a> pour une analyse complète.`,
  ] : [
    `<b>${fmt(mc.total||0)}</b> cases of sexual violence involving armed actors documented in Q1 2026 — <b>${fmt(mc.rape||0)}</b> rape and <b>${fmt(mc.collective_rape||0)}</b> collective rape incidents.`,
    `Victims of sexual violence involving armed actors are overwhelmingly female: <b>${fmt(mc.gender?.female||0)}</b> of ${fmt(mc.total||0)} cases (${pctN(mc.gender?.female||0,mc.total||1)}%).`,
    `Security Forces are alleged to be responsible for <b>${fmt(sfVics)}</b> victims (${pctN(sfVics,total)}% of total). Gangs: <b>${fmt(gangVics)}</b> victims (${pctN(gangVics,total)}%).`,
    `Sexual violence involving armed actors data is tracked separately from main casualty figures to avoid double-counting — see the <a href="mara.html" style="color:var(--accent)">Sexual Violence Involving Armed Actors page</a> for full analysis.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  // Run counters
  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderOverview);
onDashboardReady(renderOverview);
