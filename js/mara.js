/* Sexual Violence Involving Armed Actors (MARA) page renderer */
function renderMara() {
  const mc     = maraCur();
  const mTotal = mc.total            || 0;
  const mRape  = mc.rape             || 0;
  const mCollR = mc.collective_rape  || 0;
  const mFem   = mc.gender?.female   || 0;
  const mMale  = mc.gender?.male     || 0;
  const mMinor = mc.by_age?.minor    || 0;
  const mAdult = mc.by_age?.adult    || 0;
  const maraPerp = mc.by_perpetrator || {};
  const fr = getLang() === 'fr';

  // KPIs
  setKpi('kpi-mara-total',   mTotal);
  setKpi('kpi-rape',         mRape);
  setKpi('kpi-collective',   mCollR);
  setKpi('kpi-mara-female',  mFem);
  setKpi('kpi-mara-minor',   mMinor);

  const pctSub = (id, v, w) => { const e = document.getElementById(id); if (e) e.textContent = `${pctN(v, w)}% ${fr ? 'du total' : 'of total'}`; };
  pctSub('kpi-rape-pct',        mRape,  mTotal);
  pctSub('kpi-collective-pct',  mCollR, mTotal);
  pctSub('kpi-mara-female-pct', mFem,   mTotal);
  pctSub('kpi-mara-minor-pct',  mMinor, mTotal);

  // S2: Quarterly trend
  const trend = D.mara?.quarterly_trend || [];
  if (trend.length) {
    plotChart('chart-mara-trend', [
      { name: fr ? 'Viol' : 'Rape',           type:'bar', x:trend.map(r=>r.label), y:trend.map(r=>r.rape),           marker:{color:'#ec4899'} },
      { name: fr ? 'Viol collectif' : 'Collective Rape', type:'bar', x:trend.map(r=>r.label), y:trend.map(r=>r.collective_rape), marker:{color:'#f9a8d4'} },
    ], { ...baseLayout(), barmode:'stack', height:320, xaxis:{tickangle:-35} });
  }

  // S2: Type donut
  if (mTotal > 0) {
    plotChart('chart-mara-type-donut', [donutTrace(
      fr ? ['Viol','Viol collectif'] : ['Rape', 'Collective Rape'],
      [mRape, mCollR],
      ['#ec4899', '#f9a8d4']
    )], {
      ...pieLayout(300),
      annotations:[{text:`<b>${fmt(mTotal)}</b><br><span style="font-size:10px">Sexual Violence</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
    });
  }

  // S3: Perpetrator donut
  const activePerps = MARA_PERPS.filter(p => maraPerp[p] > 0);
  if (activePerps.length) {
    plotChart('chart-mara-perp-donut', [donutTrace(
      activePerps.map(lblPerp),
      activePerps.map(p => maraPerp[p]),
      activePerps.map(perpColor)
    )], {
      ...pieLayout(280),
      annotations:[{text:`<b>${fmt(mTotal)}</b><br><span style="font-size:10px">Sexual Violence</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
    });

    plotChart('chart-mara-perp-bar', [{
      type:'bar', x:activePerps.map(lblPerp), y:activePerps.map(p => maraPerp[p]),
      marker:{color:activePerps.map(perpColor)},
      text:activePerps.map(p => fmt(maraPerp[p])), textposition:'outside',
      hovertemplate:`<b>%{x}</b><br>${fr ? 'Victimes' : 'Victims'}: %{y:,}<extra></extra>`,
    }], { ...baseLayout(), height:300, showlegend:false, yaxis:{...baseLayout().yaxis, title:{text: fr ? 'Victimes' : 'Victims', font:{color:C.textMuted}}} });
  }

  // S4: Geographic — commune breakdown
  const byCommune = mc.by_commune || {};
  const communeEntries = Object.entries(byCommune)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  if (communeEntries.length) {
    const commNames = communeEntries.map(e => e[0]).reverse();
    const commVals  = communeEntries.map(e => e[1]).reverse();

    plotChart('chart-mara-commune', [{
      type:'bar', orientation:'h',
      y: commNames, x: commVals,
      marker:{color:C.mara},
      text:commVals.map(v => fmt(v)), textposition:'outside',
      hovertemplate:`<b>%{y}</b><br>${fr ? 'Victimes' : 'Victims'}: %{x:,}<extra></extra>`,
    }], { ...baseLayout(), height:360, showlegend:false, margin:{l:180,r:60,t:20,b:40} });

  }

  // S5: Gender donut
  plotChart('chart-mara-gender', [donutTrace(
    fr ? ['Féminin','Masculin'] : ['Female', 'Male'],
    [mFem, mMale],
    [C.female, C.male]
  )], {
    ...pieLayout(260),
    annotations:[{text:`<b>${fmt(mTotal)}</b><br><span style="font-size:10px">Total</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
  });

  // S5: Age bar
  const ageLabels = fr ? ['Mineurs (0–17)', 'Adultes (18–59)'] : ['Minors (0–17)', 'Adults (18–59)'];
  const ageVals   = [mMinor, mAdult];
  const ageColors = [C.boys, C.male];
  plotChart('chart-mara-age', [{
    type:'bar', x:ageLabels, y:ageVals,
    marker:{color:ageColors},
    text:ageVals.map(v => fmt(v)), textposition:'outside',
    hovertemplate:`<b>%{x}</b><br>%{y:,} ${fr ? 'victimes' : 'victims'}<extra></extra>`,
  }], { ...baseLayout(), height:260, showlegend:false });

  // S5: Type × gender bar
  plotChart('chart-mara-type-gender', [
    { name: fr ? 'Féminin' : 'Female', type:'bar', x: fr ? ['Viol','Viol collectif'] : ['Rape','Collective Rape'], y:[mFem>0?Math.round(mFem*mRape/(mTotal||1)):0, mFem>0?Math.round(mFem*mCollR/(mTotal||1)):0], marker:{color:C.female} },
    { name: fr ? 'Masculin' : 'Male',   type:'bar', x: fr ? ['Viol','Viol collectif'] : ['Rape','Collective Rape'], y:[mMale>0?Math.round(mMale*mRape/(mTotal||1)):0, mMale>0?Math.round(mMale*mCollR/(mTotal||1)):0], marker:{color:C.male} },
  ], { ...baseLayout(), barmode:'stack', height:260 });

  // S6: Monthly
  const monthly = D.mara?.monthly || {};
  const months  = MONTHS.filter(m => monthly[m]);
  const mLabels = months.map(lblMonth);
  if (months.length) {
    plotChart('chart-mara-monthly', [{
      type:'bar', x:mLabels, y:months.map(m => monthly[m]?.total || 0),
      marker:{color:C.mara},
      text:months.map(m => fmt(monthly[m]?.total || 0)), textposition:'outside',
      hovertemplate:`<b>%{x}</b><br>%{y:,} ${fr ? 'victimes' : 'victims'}<extra></extra>`,
    }], { ...baseLayout(), height:300, showlegend:false });

    plotChart('chart-mara-monthly-type', [
      { name: fr ? 'Viol' : 'Rape',           type:'bar', x:mLabels, y:months.map(m=>monthly[m]?.rape||0),           marker:{color:'#ec4899'} },
      { name: fr ? 'Viol collectif' : 'Collective Rape', type:'bar', x:mLabels, y:months.map(m=>monthly[m]?.collective_rape||0), marker:{color:'#f9a8d4'} },
    ], { ...baseLayout(), barmode:'stack', height:300 });
  }

  // S7: Insights
  const topPerp   = [...activePerps].sort((a, b) => (maraPerp[b] || 0) - (maraPerp[a] || 0))[0];
  const topCommune = communeEntries[0];
  const mPrev = (D.mara?.previous?.total || 0);
  const trendPct = mPrev > 0 ? Math.round((mTotal - mPrev) / mPrev * 100) : null;
  const leftEl    = document.getElementById('insights-left');
  const rightEl   = document.getElementById('insights-right');

  if (leftEl) leftEl.innerHTML = (fr ? [
    `<b>${fmt(mTotal)}</b> victimes de violence sexuelle impliquant des acteurs armés documentées au T1 2026 — significativement sous-déclarées en raison de la stigmatisation et des risques de représailles.`,
    `Le viol collectif représente <b>${pctN(mCollR, mTotal || 1)}%</b> de tous les cas MARA du T1 2026 (${fmt(mCollR)} victimes), indiquant l'utilisation systématique de la violence sexuelle comme outil de terreur.`,
    `Les victimes féminines représentent <b>${pctN(mFem, mTotal || 1)}%</b> des cas documentés de violence sexuelle impliquant des acteurs armés (${fmt(mFem)} sur ${fmt(mTotal)}).`,
    mMinor > 0 ? `<b>${fmt(mMinor)}</b> victimes documentées sont des mineurs (0–17 ans), représentant ${pctN(mMinor, mTotal || 1)}% des cas du T1 2026.` : '',
  ] : [
    `<b>${fmt(mTotal)}</b> victims of sexual violence involving armed actors documented in Q1 2026 — significantly under-reported due to stigma, access constraints, and fear of reprisals.`,
    `Collective rape accounts for <b>${pctN(mCollR, mTotal || 1)}%</b> of all Q1 2026 cases (${fmt(mCollR)} victims), indicating systematic use of sexual violence as a tool of terror.`,
    `Female victims represent <b>${pctN(mFem, mTotal || 1)}%</b> of documented cases (${fmt(mFem)} of ${fmt(mTotal)}) — the gendered nature of this violence requires a dedicated protection response.`,
    mMinor > 0 ? `<b>${fmt(mMinor)}</b> documented victims are minors (0–17), representing ${pctN(mMinor, mTotal || 1)}% of Q1 2026 cases — triggering child protection obligations.` : '',
  ]).filter(Boolean).map(s => `<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    topPerp ? `<b>${lblPerp(topPerp)}</b> est le groupe le plus attribué avec <b>${fmt(maraPerp[topPerp] || 0)}</b> cas (${pctN(maraPerp[topPerp] || 0, mTotal || 1)}% du total) — les mécanismes de responsabilité doivent prioriser les cas documentés.` : '',
    topCommune ? `<b>${topCommune[0]}</b> est la commune la plus touchée avec <b>${fmt(topCommune[1])}</b> victimes de violence sexuelle impliquant des acteurs armés — ${pctN(topCommune[1], mTotal || 1)}% du total national.` : '',
    `Les auteurs inconnus représentent <b>${fmt(maraPerp['Unknown'] || 0)}</b> cas — reflétant les défis d'attribution et les risques de protection qui empêchent les survivants d'identifier les auteurs.`,
    `Forces de sécurité : <b>${fmt(maraPerp['PNH / HNP'] || 0)}</b> cas de violence sexuelle impliquant des acteurs armés documentés au T1 2026 — chaque cas impliquant des forces de l'État nécessite un suivi immédiat de responsabilité.`,
  ] : [
    topPerp ? `<b>${lblPerp(topPerp)}</b> is the most attributed perpetrator group with <b>${fmt(maraPerp[topPerp] || 0)}</b> cases (${pctN(maraPerp[topPerp] || 0, mTotal || 1)}% of total) — accountability mechanisms must prioritise documented cases.` : '',
    topCommune ? `<b>${topCommune[0]}</b> is the most affected commune with <b>${fmt(topCommune[1])}</b> victims of sexual violence involving armed actors — ${pctN(topCommune[1], mTotal || 1)}% of the national total — requiring urgent referral pathway support.` : '',
    `Unknown perpetrators account for <b>${fmt(maraPerp['Unknown'] || 0)}</b> cases — reflecting attribution challenges and protection risks preventing survivors from identifying perpetrators.`,
    `Security Forces: <b>${fmt(maraPerp['PNH / HNP'] || 0)}</b> cases of sexual violence involving armed actors documented in Q1 2026 — each case involving state security forces requires immediate accountability follow-up.`,
  ]).filter(Boolean).map(s => `<li>${s}</li>`).join('');

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderMara);
onDashboardReady(renderMara);
