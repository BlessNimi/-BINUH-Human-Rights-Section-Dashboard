/* Perpetrators page renderer */
function renderPerpetrators() {
  const q      = cur();
  const total  = q.total || 0;
  const killedInjured = (q.killed || 0) + (q.injured || 0);
  const perpQ  = q.by_perpetrator || {};
  const byPerp = D.by_perpetrator || {};
  const fr = getLang() === 'fr';

  const vLabels = fr ? ['Tués','Blessés','Enlevés'] : ['Killed','Injured','Abducted'];

  // KPIs
  const perpVals = { 'Gangs': 653, 'PNH / HNP': 1645, 'Popular justice': 89 };
  setKpi('kpi-total',      killedInjured);
  setKpi('kpi-gangs',      perpVals['Gangs']);
  setKpi('kpi-pnh',        perpVals['PNH / HNP']);
  setKpi('kpi-popjustice', perpVals['Popular justice']);

  const setSub = (id, text) => { const e = document.getElementById(id); if (e) e.textContent = text; };
  setSub('kpi-gangs-pct',      fr ? '27% des tués et blessés'  : '27% of killing and injuries');
  setSub('kpi-popjustice-pct', fr ? '4% des tués et blessés'   : '4% of killing and injuries');

  const pnhPctEl = document.getElementById('kpi-pnh-pct');
  if (pnhPctEl) pnhPctEl.innerHTML = fr
    ? '69% des tués et blessés<br><span style="font-size:0.85em;opacity:0.75">Lors d\'opérations des forces de sécurité contre des gangs</span>'
    : '69% of killing and injuries<br><span style="font-size:0.85em;opacity:0.75">During security forces operations against gangs</span>';

  const activePerps = PERPS.filter(p => p !== 'Unknown' && perpQ[p] > 0);
  if (!activePerps.length) { console.warn('No perpetrator data'); return; }

  // S2-Card1: Perpetrator donut
  plotChart('chart-perp-donut', [donutTrace(
    activePerps.map(lblPerp),
    activePerps.map(p => perpVals[p] || 0),
    activePerps.map(perpColor)
  )], {
    ...pieLayout(280),
    annotations:[{text:`<b>${fmt(killedInjured)}</b><br><span style="font-size:10px">${fr ? 'Victimes' : 'Victims'}</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
  });

  // S2-Card2: Violation by perpetrator grouped
  plotChart('chart-perp-violation', [
    { name:vLabels[0], type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p=>byPerp[p]?.killed  ||0), marker:{color:C.killed}   },
    { name:vLabels[1], type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p=>byPerp[p]?.injured ||0), marker:{color:C.injured}  },
  ], { ...baseLayout(), barmode:'group', height:280, xaxis:{tickangle:-15} });

  // S3: Most Affected Communes per Perpetrator Group
  const PERP_CHART_IDS = { 'Gangs':'chart-commune-gangs', 'PNH / HNP':'chart-commune-sf', 'Popular justice':'chart-commune-popjustice' };
  activePerps.forEach(p => {
    const chartId = PERP_CHART_IDS[p];
    if (!chartId) return;
    const entries = Object.entries(D.by_commune || {})
      .filter(([, d]) => (d.by_perpetrator?.[p] || 0) > 0)
      .sort((a, b) => (b[1].by_perpetrator?.[p]||0) - (a[1].by_perpetrator?.[p]||0))
      .slice(0, 5);
    if (!entries.length) return;
    const comms = entries.map(e => e[0]).reverse();
    const vals  = comms.map(c => D.by_commune[c]?.by_perpetrator?.[p] || 0);
    plotChart(chartId, [{
      type:'bar', orientation:'h', y:comms, x:vals,
      marker:{color:perpColor(p)},
      text:vals.map(v => fmt(v)), textposition:'outside',
      hovertemplate:`<b>%{y}</b><br>${fr ? 'Victimes' : 'Victims'}: %{x:,}<extra></extra>`,
    }], { ...baseLayout(), height:280, showlegend:false, margin:{l:180,r:60,t:20,b:30} });
  });

  // S6: Insights
  const leftEl   = document.getElementById('insights-left');
  const rightEl  = document.getElementById('insights-right');

  if (leftEl) leftEl.innerHTML = (fr ? [
    `1 645 victimes (69% du total) ont été tuées ou blessées lors d'opérations de sécurité contre des gangs menées par la Police Nationale d'Haïti, parfois soutenue par la Force de Suppression des Gangs (GSF) et une société de sécurité privée ; et lors d'exécutions sommaires impliquant du personnel de police.`,
    `653 victimes (27% du total) lors d'attaques perpétrées par des gangs, concentrées de manière disproportionnée dans des communes de Port-au-Prince et environs.`,
    `89 victimes (4% du total) lors d'actes de violence perpétrés par des groupes d'autodéfense et des membres non organisés de la population dans le cadre du mouvement de justice populaire connu sous le nom de "Bwa Kalé".`,
  ] : [
    `1,645 casualties (69% of total) occurred during security operations against gangs carried out by the Haitian National Police, sometimes supported by the Gang Suppression Force (GSF) and a private security company; and during summary executions involving police personnel.`,
    `653 victims (27% of total) during attacks carried out by gangs, disproportionately concentrated in Port-au-Prince and surrounding communes.`,
    `89 victims (4% of total) during violent acts perpetrated by self-defence groups and non-organised members of the population as part of the popular justice movement known as "Bwa Kalé".`,
  ]).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = '';

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderPerpetrators);
onDashboardReady(renderPerpetrators);
