const DEMO_CHARTS = {
  'chart-sex-donut': { title: 'chart.sex.title', sub: 'chart.sex.sub', explain: 'chart.sex.explain' },
  'chart-age-bar': { title: 'chart.age.title', sub: 'chart.age.sub', explain: 'chart.age.explain' },
  'chart-gender-monthly': { title: 'chart.gender_monthly.title', sub: 'chart.gender_monthly.sub', explain: 'chart.gender_monthly.explain' },
};

function renderDemographics() {
  enhanceChartWraps(DEMO_CHARTS);
  applyStaticI18n();

  const q = cur();
  setKpi('kpi-male', q.gender.male);
  setKpi('kpi-female', q.gender.female);
  setKpi('kpi-boys', q.gender.boys);
  setKpi('kpi-girls', q.gender.girls);

  plotChart('chart-sex-donut', [donutTrace(
    genderLabelList(), [q.gender.male, q.gender.female, q.gender.boys, q.gender.girls],
    [C.male, C.female, C.boys, C.girls]
  )], pieLayout(340));

  plotChart('chart-age-bar', [{
    type: 'bar', x: [lblAge(0), lblAge(1), lblAge(2)],
    y: [q.by_age.minor, q.by_age.adult, q.by_age.elderly],
    marker: { color: [C.minor, C.adult, C.elderly] },
  }], { ...baseLayout(), height: 360 });

  const months = MONTHS.filter(m => D.monthly?.[m]);
  plotChart('chart-gender-monthly', [
    { name: lblGender('male'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].gender.male), type: 'bar', marker: { color: C.male } },
    { name: lblGender('female'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].gender.female), type: 'bar', marker: { color: C.female } },
    { name: lblGender('boys'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].gender.boys), type: 'bar', marker: { color: C.boys } },
    { name: lblGender('girls'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].gender.girls), type: 'bar', marker: { color: C.girls } },
  ], { ...baseLayout(), barmode: 'stack', height: 400 });

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

registerPageRenderer(renderDemographics);
onDashboardReady(renderDemographics);
