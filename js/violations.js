const VIOL_CHARTS = {
  'chart-viol-bar': { title: 'chart.viol_bar.title', sub: 'chart.viol_bar.sub', explain: 'chart.viol_bar.explain' },
  'chart-viol-donut': { title: 'chart.viol_donut.title', sub: 'chart.viol_donut.sub', explain: 'chart.viol_donut.explain' },
  'chart-viol-monthly': { title: 'chart.viol_monthly.title', sub: 'chart.viol_monthly.sub', explain: 'chart.viol_monthly.explain' },
};

function renderViolations() {
  enhanceChartWraps(VIOL_CHARTS);
  applyStaticI18n();

  const q = cur();
  const labels = violLabelList();
  const vals = [q.killed, q.injured, q.abducted];
  const cols = [C.killed, C.injured, C.abducted];

  plotChart('chart-viol-bar', [{
    type: 'bar', x: labels, y: vals, marker: { color: cols },
  }], { ...baseLayout(), height: 380 });

  plotChart('chart-viol-donut', [donutTrace(labels, vals, cols)], pieLayout(360));

  const months = MONTHS.filter(m => D.monthly?.[m]);
  plotChart('chart-viol-monthly', [
    { name: lblViol('killed'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].killed), type: 'bar', marker: { color: C.killed } },
    { name: lblViol('injured'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].injured), type: 'bar', marker: { color: C.injured } },
    { name: lblViol('abducted'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].abducted), type: 'bar', marker: { color: C.abducted } },
  ], { ...baseLayout(), barmode: 'stack', height: 400 });
}

registerPageRenderer(renderViolations);
onDashboardReady(renderViolations);
