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
  const genderDist   = { male: 1980, female: 346, boys: 31, girls: 30 };
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
    `Sur les ${fmt(casualties)} victimes totales (tuées et blessées) de violence liée aux gangs au T1 2026, 83% sont des hommes.`,
    `Les femmes représentent 14% des victimes (${fmt(genderDist.female)}), les garçons 1% (${fmt(genderDist.boys)}) et les filles 1% (${fmt(genderDist.girls)}) du total.`,
    top.length ? `Un total de ${fmt(q.abducted||0)} victimes ont été enlevées au T1 2026, la commune de ${top[0][0]} étant la plus touchée avec ${fmt(top[0][1].abducted||0)} enlèvements.` : `Un total de ${fmt(q.abducted||0)} victimes ont été enlevées au T1 2026.`,
    `Un total de ${fmt(childrenDist)} enfants (garçons et filles) ont été documentés comme victimes de violence liée aux gangs au T1 2026.`,
  ] : [
    `Of the ${fmt(casualties)} total casualties (killed and injured) from gang-related violence in Q1 2026, 83% are men.`,
    `Women account for 14% of victims (${fmt(genderDist.female)}), boys for 1% (${fmt(genderDist.boys)}), and girls for 1% (${fmt(genderDist.girls)}) of all casualties.`,
    top.length ? `A total of ${fmt(q.abducted||0)} victims were abducted in Q1 2026, with ${top[0][0]} being the most affected commune (${fmt(top[0][1].abducted||0)} abductions).` : `A total of ${fmt(q.abducted||0)} victims were abducted in Q1 2026.`,
    `A total of ${fmt(childrenDist)} children (boys and girls) were documented as victims of gang-related violence in Q1 2026.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  if (rightEl) rightEl.innerHTML = (fr ? [
    `Sur les ${fmt(maraTotal)} victimes documentées de violence sexuelle impliquant des acteurs armés, ${fmt(maraFemale)} (99,6%) sont de sexe féminin.`,
    `Le viol collectif représente ${pctN(maraCollR,maraTotal||1)}% de tous les cas du T1 2026 (${fmt(maraCollR)} victimes), indiquant l'utilisation systématique de la violence sexuelle comme outil de terreur.`,
    `Parmi les victimes de violence sexuelle documentées, ${fmt(maraMinor)} sont des mineurs (0–17 ans) et ${fmt(maraAdult)} sont des adultes (18–59 ans).`,
    `Les femmes font face à la fois aux conséquences de la violence liée aux gangs et à une exposition disproportionnée à la violence sexuelle impliquant des acteurs armés — un risque de protection cumulé nécessitant une réponse intégrée.`,
  ] : [
    `Of the ${fmt(maraTotal)} documented victims of sexual violence involving armed actors, ${fmt(maraFemale)} (99.6%) are female.`,
    `Collective rape accounts for ${pctN(maraCollR,maraTotal||1)}% of all Q1 2026 cases (${fmt(maraCollR)} victims), indicating the systematic use of sexual violence as a tool of terror.`,
    `Among documented victims of sexual violence, ${fmt(maraMinor)} are minors (0–17 years) and ${fmt(maraAdult)} are adults (18–59 years).`,
    `Women face both gang-related violence and disproportionate exposure to sexual violence involving armed actors — a compounded protection risk that requires an integrated response.`,
  ]).map(s=>`<li>${s}</li>`).join('');

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

if (typeof registerPageRenderer === 'function') registerPageRenderer(renderGender);
onDashboardReady(renderGender);
