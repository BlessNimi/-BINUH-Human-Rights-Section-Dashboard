/* Perpetrators page renderer */
function renderPerpetrators() {
  const q      = cur();
  const total  = q.total || 0;
  const perpQ  = q.by_perpetrator || {};
  const byPerp = D.by_perpetrator || {};
  const fr = getLang() === 'fr';

  const vLabels = fr ? ['Tués','Blessés','Enlevés'] : ['Killed','Injured','Abducted'];

  // KPIs
  setKpi('kpi-total',      total);
  setKpi('kpi-gangs',      perpQ['Gangs']            || 0);
  setKpi('kpi-pnh',        perpQ['PNH / HNP']        || 0);
  setKpi('kpi-popjustice', perpQ['Population Justice']|| 0);

  const pctSub = (id, v) => { const e=document.getElementById(id); if(e) e.textContent=`${pctN(v,total)}% ${fr ? 'des victimes T1' : 'of total Q1 victims'}`; };
  pctSub('kpi-gangs-pct',      perpQ['Gangs']            || 0);
  pctSub('kpi-pnh-pct',        perpQ['PNH / HNP']        || 0);
  pctSub('kpi-popjustice-pct', perpQ['Population Justice']|| 0);

  const activePerps = PERPS.filter(p => p !== 'Unknown' && perpQ[p] > 0);
  if (!activePerps.length) { console.warn('No perpetrator data'); return; }

  // S2-Card1: Perpetrator donut
  plotChart('chart-perp-donut', [donutTrace(
    activePerps.map(lblPerp),
    activePerps.map(p => perpQ[p]),
    activePerps.map(perpColor)
  )], {
    ...pieLayout(280),
    annotations:[{text:`<b>${fmt(total)}</b><br><span style="font-size:10px">${fr ? 'Victimes' : 'Victims'}</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
  });

  // S2-Card2: Violation by perpetrator grouped
  plotChart('chart-perp-violation', [
    { name:vLabels[0], type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p=>byPerp[p]?.killed  ||0), marker:{color:C.killed}   },
    { name:vLabels[1], type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p=>byPerp[p]?.injured ||0), marker:{color:C.injured}  },
    { name:vLabels[2], type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p=>byPerp[p]?.abducted||0), marker:{color:C.abducted} },
  ], { ...baseLayout(), barmode:'group', height:280, xaxis:{tickangle:-15} });

  // S3: Most Affected Communes per Perpetrator Group
  const PERP_CHART_IDS = { 'Gangs':'chart-commune-gangs', 'PNH / HNP':'chart-commune-sf', 'Population Justice':'chart-commune-popjustice' };
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
  const gangVics = perpQ['Gangs']     || 0;
  const sfVics   = perpQ['PNH / HNP'] || 0;
  const popVics  = perpQ['Population Justice'] || 0;
  const leftEl   = document.getElementById('insights-left');
  const rightEl  = document.getElementById('insights-right');
  const topPerp  = [...activePerps].sort((a,b)=>(perpQ[b]||0)-(perpQ[a]||0))[0];

  if (leftEl) leftEl.innerHTML = (fr ? [
    `<b>${lblPerp(topPerp)}</b> est présumé responsable du plus grand nombre de victimes au T1 2026 : <b>${fmt(perpQ[topPerp]||0)}</b> (${pctN(perpQ[topPerp]||0,total)}% du total).`,
    `Les Forces de sécurité : <b>${fmt(sfVics)}</b> victimes (${pctN(sfVics,total)}%) — les tués attribués aux forces de sécurité constituent une préoccupation majeure en matière de responsabilité.`,
    `Les Gangs : <b>${fmt(gangVics)}</b> victimes (${pctN(gangVics,total)}%) — principalement concentrés dans les communes de Port-au-Prince et environs.`,
    `La Justice populaire représente <b>${fmt(popVics)}</b> victimes (${pctN(popVics,total)}%) au T1 2026.`,
  ] : [
    `<b>${lblPerp(topPerp)}</b> is alleged to be responsible for the most victims in Q1 2026: <b>${fmt(perpQ[topPerp]||0)}</b> (${pctN(perpQ[topPerp]||0,total)}% of total).`,
    `Security Forces: <b>${fmt(sfVics)}</b> victims (${pctN(sfVics,total)}%) — killings attributed to security forces represent a critical accountability concern.`,
    `Gangs: <b>${fmt(gangVics)}</b> victims (${pctN(gangVics,total)}%) — disproportionately concentrated in Port-au-Prince and surrounding communes.`,
    `Population Justice actors account for <b>${fmt(popVics)}</b> victims (${pctN(popVics,total)}%) in Q1 2026.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `Responsabilité des Forces de sécurité : <b>${fmt(sfVics)}</b> victimes attribuées au T1 2026 (${pctN(sfVics,total)}% du total) — chaque cas nécessite documentation et suivi.`,
    `La perpétration par les gangs représente <b>${fmt(gangVics)}</b> victimes — la plus grande part des victimes documentées de violence liée aux gangs en Haïti.`,
    `Justice populaire : <b>${fmt(popVics)}</b> victimes — reflète des réponses communautaires à l'insécurité pouvant elles-mêmes constituer des violations des droits de l'homme.`,
    `Pour les violences sexuelles impliquant des acteurs armés, voir la <a href="mara.html" style="color:var(--accent)">page Violence Sexuelle Impliquant des Acteurs Armés</a> — suivies séparément pour éviter le double comptage.`,
  ] : [
    `Security Forces accountability: <b>${fmt(sfVics)}</b> victims attributed to security forces in Q1 2026 (${pctN(sfVics,total)}% of total) — each case requires documentation and follow-up.`,
    `Gang perpetration accounts for <b>${fmt(gangVics)}</b> victims — the largest share of documented casualties from gang-related violence in Haiti.`,
    `Population Justice actors: <b>${fmt(popVics)}</b> victims — reflecting community-based responses to insecurity that may themselves constitute human rights violations.`,
    `For sexual violence involving armed actors, see the <a href="mara.html" style="color:var(--accent)">Sexual Violence Involving Armed Actors page</a> — tracked separately to avoid double-counting.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderPerpetrators);
onDashboardReady(renderPerpetrators);
