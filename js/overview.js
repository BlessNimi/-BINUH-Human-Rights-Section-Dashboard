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
  const abductedPctEl = document.getElementById('kpi-abducted-pct'); if (abductedPctEl) abductedPctEl.textContent = '';

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
    fr ? ['Tués', 'Blessés'] : ['Killed', 'Injured'],
    [q.killed, q.injured],
    [C.killed, C.injured]
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
  const genderDonutVals  = [1980, 346, 31, 30];
  const genderDonutTotal = genderDonutVals.reduce((a,b)=>a+b,0);
  plotChart('chart-gender-donut', [donutTrace(
    fr ? ['Hommes','Femmes','Garçons','Filles'] : ['Men','Women','Boys','Girls'],
    genderDonutVals,
    [C.male, C.female, C.boys, C.girls]
  )], {
    ...pieLayout(280),
    annotations: [{ text:`<b>${fmt(genderDonutTotal)}</b><br><span style="font-size:10px">${fr ? 'Total' : 'Total'}</span>`, x:0.5, y:0.5, showarrow:false, font:{color:C.text,size:13} }]
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
    `<b>${fmt(casualties)}</b> victimes totales (tués et blessés) de violence liée aux gangs documentées en Haïti au T1 2026.`,
    `Les tués représentent la forme de violence la plus fréquente : <b>${fmt(q.killed)}</b> tués (${pctN(q.killed,casualties)}% des victimes), suivis de <b>${fmt(q.injured)}</b> blessés. Enlèvements : <b>${fmt(q.abducted)}</b>.`,
    topCommune ? `<b>${topCommune[0]}</b> est la commune la plus affectée avec <b>${fmt(topCommune[1].total)}</b> victimes.` : '',
    `Les hommes représentent 83% des victimes, tandis que les femmes (14%) et les enfants (3%) représentent ensemble 17%.`,
  ] : [
    `<b>${fmt(casualties)}</b> total casualties (killed and injured) from gang-related violence in Haiti documented in Q1 2026.`,
    `Killing is the most prevalent harm: <b>${fmt(q.killed)}</b> killed (${pctN(q.killed,casualties)}% of casualties), followed by <b>${fmt(q.injured)}</b> injured. Abductions: <b>${fmt(q.abducted)}</b>.`,
    topCommune ? `<b>${topCommune[0]}</b> is the most affected commune with <b>${fmt(topCommune[1].total)}</b> victims.` : '',
    `Men represent 83% of victims, while women (14%) and children (3%) together account for 17%.`,
  ]).filter(Boolean).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `1 645 victimes (69% du total) lors d'opérations de sécurité contre des gangs menées par la Police Nationale d'Haïti, parfois soutenue par la Force de Suppression des Gangs (GSF) et une société de sécurité privée ; et lors d'exécutions sommaires impliquant du personnel de police.`,
    `653 victimes (27% du total) lors d'attaques perpetrées par des gangs. 89 victimes (4% du total) lors d'actes de violence par des groupes de justice populaire "Bwa Kalé".`,
    `<b>${fmt(mc.total||0)}</b> cas de violence sexuelle impliquant des acteurs armés documentés au T1 2026 — <b>${fmt(mc.rape||0)}</b> viols et <b>${fmt(mc.collective_rape||0)}</b> viols collectifs. 99,6% des victimes sont des femmes.`,
    `Ces données sont suivies séparément pour éviter tout double comptage — voir la <a href="mara.html" style="color:var(--accent)">page Violence sexuelle impliquant des acteurs armés</a>.`,
  ] : [
    `1,645 casualties (69% of total) occurred during security operations against gangs carried out by the Haitian National Police, sometimes supported by the Gang Suppression Force (GSF) and a private security company; and during summary executions involving police personnel.`,
    `653 victims (27% of total) during attacks carried out by gangs. 89 victims (4% of total) during violent acts by popular justice groups ("Bwa Kalé").`,
    `<b>${fmt(mc.total||0)}</b> cases of sexual violence involving armed actors documented in Q1 2026 — <b>${fmt(mc.rape||0)}</b> rape and <b>${fmt(mc.collective_rape||0)}</b> collective rape incidents. 99.6% of victims are female.`,
    `Sexual violence involving armed actors data is tracked separately to avoid double-counting — see the <a href="mara.html" style="color:var(--accent)">Sexual Violence Involving Armed Actors page</a>.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  // Run counters
  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderOverview);
onDashboardReady(renderOverview);
