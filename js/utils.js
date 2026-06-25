/* BINUH HR Dashboard — shared utilities */
const C = {
  bg:'#0c1f3a', bgCard:'#122a4d', text:'#e8f1fa', textMuted:'#8ba8c4', accent:'#009EDB',
  killed:'#f43f5e', injured:'#fb923c', abducted:'#c084fc', mara:'#34d399',
  male:'#60a5fa', female:'#f472b6', boys:'#93c5fd', girls:'#f9a8d4',
  minor:'#93c5fd', adult:'#60a5fa', elderly:'#fbbf24',
  gangs:'#f43f5e', pnh:'#818cf8', popjustice:'#34d399', unknown:'#94a3b8',
};
const VIOLATIONS  = ['Killed', 'Injured', 'Abducted'];
const VIOL_KEYS   = ['killed', 'injured', 'abducted'];
const PERPS       = ['Gangs', 'PNH / HNP', 'Popular justice'];
const MARA_PERPS  = ['Gangs', 'PNH / HNP', 'Self-Defence Group', 'Unknown'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function dataSource() { return 'Data source: BINUH HRD HRS Incident Database'; }

const baseLayout = (o={}) => ({
  paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)',
  font:{color:C.textMuted,family:'Inter,system-ui,sans-serif',size:12},
  xaxis:{gridcolor:'rgba(0,158,219,0.12)',color:C.textMuted,zeroline:false},
  yaxis:{gridcolor:'rgba(0,158,219,0.12)',color:C.textMuted,zeroline:false},
  legend:{bgcolor:'rgba(0,0,0,0)',font:{size:11,color:C.textMuted},orientation:'h',x:0,y:-0.18},
  margin:{t:30,r:16,b:50,l:60}, hovermode:'closest', ...o,
});
const plotlyConfig = { displayModeBar:false, responsive:true };
function pieLayout(h=340) { return baseLayout({ height:h, margin:{t:20,r:10,b:30,l:10}, legend:{orientation:'v',x:1.02,y:0.5} }); }
function plotChart(id, traces, layout) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (!el || typeof Plotly === 'undefined') return Promise.resolve();
  return Plotly.newPlot(el, traces, layout, plotlyConfig).then(() => Plotly.Plots.resize(el));
}
function resizeCharts() {
  if (typeof Plotly === 'undefined') return;
  document.querySelectorAll('.plotly-chart').forEach(el => {
    if (el.id && el.querySelector('.js-plotly-plot')) Plotly.Plots.resize(el);
  });
}
function onDashboardReady(fn) {
  const run = () => {
    if (typeof BINUH_DATA === 'undefined') {
      console.error('BINUH_DATA not loaded. Use a local server: python3 -m http.server 8000');
      return;
    }
    const needsPlotly = document.querySelector('.plotly-chart');
    if (needsPlotly && typeof Plotly === 'undefined') {
      console.error('Plotly failed to load (CDN blocked?). Charts cannot render.');
      return;
    }
    fn();
    if (needsPlotly) requestAnimationFrame(() => requestAnimationFrame(resizeCharts));
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run);
}

const D    = typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : {};
const cur  = () => D.current  || {};
const prev = () => D.previous || {};
const mara = () => D.mara     || {};
const maraCur  = () => mara().current  || {};
const maraPrev = () => mara().previous || {};

function pct(p,w)  { return w ? Math.round(p/w*100)+'%' : '0%'; }
function pctN(p,w) { return w ? Math.round(p/w*100) : 0; }
function fmt(n)    { return (n||0).toLocaleString(); }

function vColor(v) {
  return {Killed:C.killed,Injured:C.injured,Abducted:C.abducted,killed:C.killed,injured:C.injured,abducted:C.abducted,mara:C.mara,MARA:C.mara}[v] || C.accent;
}
function perpColor(p) {
  if (!p) return C.unknown;
  const s = String(p).toLowerCase();
  if (s.includes('gang'))    return C.gangs;
  if (s.includes('pnh') || s.includes('hnp') || s.includes('police')) return C.pnh;
  if (s.includes('justice') || s.includes('population')) return C.popjustice;
  if (s.includes('self') || s.includes('autod') || s.includes('defence')) return '#fb923c';
  return C.unknown;
}
function maraViolColor(v) {
  return { rape: '#ec4899', 'collective rape': '#f9a8d4', Rape:'#ec4899', 'Collective Rape':'#f9a8d4' }[v] || C.mara;
}
function donutTrace(labels, values, colors, hole=0.52) {
  return { type:'pie', hole, labels, values, marker:{colors,line:{color:C.bg,width:2}},
    textinfo:'percent', hovertemplate:'<b>%{label}</b><br>%{value:,}<br>%{percent}<extra></extra>' };
}
function animateCounter(el, target, dur=1200) {
  const t0=performance.now();
  const step=now=>{ const p=Math.min((now-t0)/dur,1); el.textContent=fmt(Math.round(target*(1-Math.pow(1-p,3))));
    if(p<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function setKpi(id,v){ const e=document.getElementById(id); if(e) e.dataset.count=v; }
function highlightNav(){
  const parts = window.location.pathname.split('/').filter(Boolean);
  let page = parts[parts.length-1] || 'index.html';
  if (!page.endsWith('.html')) page = 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    if ((a.getAttribute('href')||'') === page) a.classList.add('active');
  });
}
function sortedCommunes(n=15){
  const sorted = Object.entries(D.by_commune||{}).sort((a,b)=>b[1].total-a[1].total);
  return n > 0 ? sorted.slice(0,n) : sorted;
}
function changeHtml(val, pval){
  if (!pval) return '<span class="change neutral">—</span>';
  const d = Math.round((val-pval)/pval*100);
  return `<span class="change ${d>0?'up':'down'}">${d>0?'↑':'↓'} ${Math.abs(d)}%</span>`;
}
function downloadBlob(blob,fn){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=fn; a.click(); }
function downloadJSON(o,fn='binuh-data.json'){ downloadBlob(new Blob([JSON.stringify(o,null,2)],{type:'application/json'}),fn); }
function downloadCSV(rows,fn='data.csv'){
  downloadBlob(new Blob([rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')],{type:'text/csv'}),fn);
}
function initFooterDownloads(){
  const j=document.getElementById('dl-all-json'), c=document.getElementById('dl-summary-csv');
  if(j) j.onclick=e=>{e.preventDefault(); downloadJSON(BINUH_DATA);};
  if(c) c.onclick=e=>{
    e.preventDefault(); const q=cur();
    downloadCSV([[dataSource()],[],['Metric','Value'],['Total Victims',q.total],['Killed',q.killed],['Injured',q.injured],['Abducted',q.abducted],['Sexual Violence Involving Armed Actors',maraCur().total||0]],'binuh-summary.csv');
  };
}
function initCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const obs=new IntersectionObserver(en=>{ if(en[0].isIntersecting){ animateCounter(el,+el.dataset.count); obs.disconnect(); }},{threshold:0.3});
    obs.observe(el);
  });
}
window.addEventListener('load',()=>{
  document.querySelectorAll('.plotly-chart').forEach(ch=>{
    const wrap=ch.closest('.chart-wrap');
    if(wrap&&!wrap.querySelector('.chart-download-actions')) addChartDownloadButtons(wrap,ch,ch.id);
  });
});
function addChartDownloadButtons(container, chartEl, base) {
  if (!container||!chartEl||container.querySelector('.chart-download-actions')) return;
  const div=document.createElement('div');
  div.className='chart-download-actions';
  div.innerHTML=`<button type="button" class="btn-download-chart">PNG</button><button type="button" class="btn-download-data">CSV</button>`;
  div.querySelector('.btn-download-chart').onclick=()=>{
    if(typeof html2canvas==='undefined'){ Plotly.downloadImage(chartEl,{format:'png',filename:base}); return; }
    div.style.visibility='hidden';
    html2canvas(container,{useCORS:true,backgroundColor:'#122a4d',scale:2}).then(canvas=>{
      div.style.visibility=''; const a=document.createElement('a'); a.download=base+'.png'; a.href=canvas.toDataURL('image/png'); a.click();
    });
  };
  div.querySelector('.btn-download-data').onclick=()=>{
    const t=chartEl._fullData?.[0]; if(!t) return;
    let rows=[['Category','Value']];
    if(t.type==='pie') t.labels.forEach((l,i)=>rows.push([l,t.values[i]]));
    else if(t.type==='bar') rows=[['Category',t.name||'Value'],...t.x.map((x,i)=>[x,t.y[i]])];
    downloadCSV([[dataSource()],[],...rows],base+'.csv');
  };
  (container.querySelector('.chart-header')||container).appendChild(div);
}
document.addEventListener('DOMContentLoaded',()=>{ highlightNav(); initCounters(); initFooterDownloads(); });
window.addEventListener('binuh:langchange',()=>{ if(typeof applyStaticI18n==='function') applyStaticI18n(); });
