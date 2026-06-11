/* Gender & Sex analysis page renderer */
function renderGender() {
  const q  = cur();
  const g  = q.gender || {};
  const mc = maraCur();
  const fr = getLang() === 'fr';
  const casualties = (q.killed || 0) + (q.injured || 0);
  const gTotal     = (g.male||0) + (g.female||0) + (g.boys||0) + (g.girls||0);
  const children   = (g.boys||0) + (g.girls||0);

  const gLabels = fr ? ['Hommes','Femmes','Garçons','Filles'] : ['Men','Women','Boys','Girls'];

  // S1: KPIs
  const genderDist   = { male: 2029, female: 286, boys: 24, girls: 24 };
  const childrenDist = genderDist.boys + genderDist.girls;
  setKpi('kpi-total',    casualties);
  setKpi('kpi-men',      genderDist.male);
  setKpi('kpi-women',    genderDist.female);
  setKpi('kpi-boys',     genderDist.boys);
  setKpi('kpi-girls',    genderDist.girls);
  setKpi('kpi-children', childrenDist);

  const pctSub = (id, v, w) => { const e=document.getElementById(id); if(e) e.textContent=`${pctN(v,w)}% ${fr ? 'de toutes les victimes' : 'of all victims'}`; };
  pctSub('kpi-men-pct',      genderDist.male,   casualties);
  pctSub('kpi-women-pct',    genderDist.female, casualties);
  pctSub('kpi-boys-pct',     genderDist.boys,   casualties);
  pctSub('kpi-girls-pct',    genderDist.girls,  casualties);
  pctSub('kpi-children-pct', childrenDist,      casualties);

  // S2: Gender distribution charts
  const vByG    = q.by_violation_gender || {};
  const gColors = [C.male, C.female, C.boys, C.girls];

  const genderDonutVals  = [genderDist.male, genderDist.female, genderDist.boys, genderDist.girls];
  const genderDonutTotal = genderDonutVals.reduce((a,b)=>a+b,0);
  plotChart('chart-gender-donut', [donutTrace(gLabels, genderDonutVals, gColors)], {
    ...pieLayout(300),
    annotations:[{text:`<b>${fmt(genderDonutTotal)}</b><br><span style="font-size:10px">${fr ? 'Victimes' : 'Victims'}</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text,size:13}}]
  });

  const vKeys  = VIOL_KEYS;
  const vLbls  = fr ? ['Tués','Blessés','Enlevés'] : ['Killed','Injured','Abducted'];
  plotChart('chart-gender-violation', gLabels.map((lbl, i) => {
    const key = ['male','female','boys','girls'][i];
    return { name:lbl, type:'bar', x:vLbls, y:vKeys.map(v => vByG[v]?.[key] || 0), marker:{color:gColors[i]} };
  }), { ...baseLayout(), barmode:'group', height:300 });

  plotChart('chart-gender-pct', gLabels.map((lbl, i) => {
    const key = ['male','female','boys','girls'][i];
    return { name:lbl, type:'bar', x:vLbls, y:vKeys.map(v => {
      const tot = vKeys.reduce((s,k2) => s + (vByG[k2]?.[key]||0), 0);
      const vTot = Object.values(vByG[v]||{}).reduce((s,n)=>s+n,0);
      return vTot ? Math.round((vByG[v]?.[key]||0)/vTot*100) : 0;
    }), marker:{color:gColors[i]} };
  }), { ...baseLayout(), barmode:'stack', height:300, yaxis:{...baseLayout().yaxis, ticksuffix:'%', range:[0,100]} });

  // S1c: Casualties by commune by gender + Abductions by commune
  const top = sortedCommunes(10);
  if (top.length) {
    const communes = top.map(t => t[0]).reverse();
    const commData = communes.map(c => D.by_commune[c] || {});

    plotChart('chart-commune-casualties-gender', [
      { name:gLabels[0], type:'bar', orientation:'h', y:communes, x:commData.map(d=>d.gender?.male  ||0), marker:{color:C.male}   },
      { name:gLabels[1], type:'bar', orientation:'h', y:communes, x:commData.map(d=>d.gender?.female||0), marker:{color:C.female} },
      { name:gLabels[2], type:'bar', orientation:'h', y:communes, x:commData.map(d=>d.gender?.boys  ||0), marker:{color:C.boys}   },
      { name:gLabels[3], type:'bar', orientation:'h', y:communes, x:commData.map(d=>d.gender?.girls ||0), marker:{color:C.girls}  },
    ], { ...baseLayout(), barmode:'stack', height:400, margin:{l:180,r:20,t:20,b:40} });

    const abdSorted = [...top]
      .filter(t => (D.by_commune[t[0]]?.abducted || 0) > 0)
      .sort((a, b) => (D.by_commune[b[0]]?.abducted||0) - (D.by_commune[a[0]]?.abducted||0));

    if (abdSorted.length) {
      const abdComm = abdSorted.map(t => t[0]).reverse();
      const abdVals = abdComm.map(c => D.by_commune[c]?.abducted || 0);
      plotChart('chart-commune-abducted', [{
        type:'bar', orientation:'h',
        y: abdComm, x: abdVals,
        marker:{color: C.abducted},
        text: abdVals.map(v => fmt(v)), textposition:'outside',
        hovertemplate:`<b>%{y}</b><br>${fr ? 'Enlevés' : 'Abducted'}: %{x:,}<extra></extra>`,
      }], { ...baseLayout(), height:400, showlegend:false, margin:{l:180,r:60,t:20,b:40} });
    }
  }

  // S7: Insights
  const maraTotal = mc.total || 0;
  const maraFemale = mc.gender?.female || 0;
  const maraCollR  = mc.collective_rape || 0;
  const maraMinor  = mc.by_age?.minor || 0;
  const maraAdult  = mc.by_age?.adult || 0;
  const topCommune = top.length ? top[0] : null;

  const leftEl  = document.getElementById('insights-left');
  const rightEl = document.getElementById('insights-right');

  if (leftEl) leftEl.innerHTML = (fr ? [
    `<b>${fmt(casualties)}</b> victimes totales (tués et blessés) de violence liée aux gangs au T1 2026, dont <b>${pctN(g.male,gTotal)}%</b> sont des hommes.`,
    `Les femmes représentent ${pctN(g.female,gTotal)}% (${fmt(g.female||0)}), les garçons ${pctN(g.boys,gTotal)}% (${fmt(g.boys||0)}), les filles ${pctN(g.girls,gTotal)}% (${fmt(g.girls||0)}) des victimes totales.`,
    `<b>${fmt(q.abducted||0)}</b> victimes ont été enlevées au T1 2026 — ${topCommune ? `<b>${topCommune[0]}</b> est la commune la plus touchée avec ${fmt(topCommune[1].abducted||0)} enlèvements.` : ''}`,
    `<b>${fmt(children)}</b> enfants (garçons et filles) documentés comme victimes de violence liée aux gangs au T1 2026.`,
  ] : [
    `<b>${fmt(casualties)}</b> total casualties (killed and injured) from gang-related violence in Q1 2026, of which <b>${pctN(g.male,gTotal)}%</b> are men.`,
    `Women account for ${pctN(g.female,gTotal)}% (${fmt(g.female||0)}), boys ${pctN(g.boys,gTotal)}% (${fmt(g.boys||0)}), girls ${pctN(g.girls,gTotal)}% (${fmt(g.girls||0)}) of total victims.`,
    `<b>${fmt(q.abducted||0)}</b> victims were abducted in Q1 2026 — ${topCommune ? `<b>${topCommune[0]}</b> is the most affected commune with ${fmt(topCommune[1].abducted||0)} abductions.` : ''}`,
    `<b>${fmt(children)}</b> children (boys and girls) documented as victims of gang-related violence in Q1 2026.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `Violence sexuelle impliquant des acteurs armés : <b>${fmt(maraFemale)}</b> sur ${fmt(maraTotal)} victimes documentées sont des femmes (${pctN(maraFemale,maraTotal||1)}%).`,
    `Le viol collectif représente <b>${pctN(maraCollR,maraTotal||1)}%</b> de tous les cas de violence sexuelle impliquant des acteurs armés au T1 2026 (${fmt(maraCollR)} victimes).`,
    `Parmi les victimes : <b>${fmt(maraMinor)}</b> sont mineurs (0–17 ans) et <b>${fmt(maraAdult)}</b> sont adultes (18–59 ans).`,
    `Les femmes (${fmt(g.female||0)}) font face à la fois aux blessures de la violence liée aux gangs et à une exposition disproportionnée à la violence sexuelle — un risque de protection cumulé.`,
  ] : [
    `Sexual violence involving armed actors: <b>${fmt(maraFemale)}</b> of ${fmt(maraTotal)} documented victims are female (${pctN(maraFemale,maraTotal||1)}%).`,
    `Collective rape accounts for <b>${pctN(maraCollR,maraTotal||1)}%</b> of all Q1 2026 sexual violence involving armed actors cases (${fmt(maraCollR)} victims).`,
    `Among victims: <b>${fmt(maraMinor)}</b> are minors (0–17) and <b>${fmt(maraAdult)}</b> are adults (18–59).`,
    `Women (${fmt(g.female||0)}) face both gang-related violence injuries and disproportionate sexual violence exposure — a compounded protection risk.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderGender);
onDashboardReady(renderGender);
