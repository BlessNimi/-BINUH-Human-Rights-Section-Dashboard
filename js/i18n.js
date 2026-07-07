/* BINUH HR Dashboard — English / French */
const I18N = {
  en: {
    // Brand
    'brand.title': 'BINUH Human Rights',
    'brand.sub.overview': 'Gang-related Violence — Haiti',
    'brand.sub.gender': 'Gender & Sex — Victim Analysis',
    'brand.sub.perpetrators': 'Perpetrators — Actor Attribution',
    'brand.sub.geographic': 'Geographic — Hotspot Analysis',
    'brand.sub.mara': 'Sexual Violence Involving Armed Actors (MARA)',
    'brand.sub.maps': 'Maps — Spatial Analysis',
    'brand.sub.violations': 'Violations',
    // Nav
    'nav.overview': 'Overview',
    'nav.gender': 'Gender',
    'nav.perpetrators': 'Perpetrators',
    'nav.geographic': 'Geographic',
    'nav.mara': 'Sexual Violence Involving Armed Actors',
    'nav.mara.link': 'Sexual violence involving armed actors (MARA)',
    'nav.maps': 'Maps',
    // Footer
    'footer.copy': '© BINUH Human Rights',
    'footer.copy.v6': '© BINUH Human Rights',
    'footer.json': 'Download JSON',
    'footer.csv': 'Download CSV',
    // Page titles
    'page.overview': 'Gang-related Violence in Haiti — Overview',
    'page.gender': 'Gender & Sex — Victim Analysis',
    'page.perpetrators': 'Perpetrators — Actor Attribution',
    'page.geographic': 'Geographic — Hotspot Analysis',
    'page.geographic.sub': 'By commune (Admin2)',
    'page.mara': 'Sexual Violence Involving Armed Actors — Deep Dive Analysis',
    'page.maps': 'Maps — Spatial Analysis',
    'page.demographics': 'Victims — Demographics',
    'page.violations': 'Violation Analysis',
    // Page tags
    'page.tag.overview': 'Q1 2026',
    'page.tag.gender': 'GENDER DISAGGREGATED ANALYSIS',
    'page.tag.perpetrators': 'PERPETRATOR GROUP ANALYSIS',
    'page.tag.geographic': 'COMMUNE · DEPARTMENT ANALYSIS',
    'page.tag.mara': 'SEXUAL VIOLENCE INVOLVING ARMED ACTORS (MARA)',
    'page.tag.maps': 'INTERACTIVE MAPS',
    // Disclaimers
    'disclaimer': 'Documented civilian casualties in Haiti. Data are non-exhaustive and subject to under-reporting.',
    'disclaimer.overview': 'Comprehensive analysis of conflict-related casualties documented by BINUH Human Rights Service in Haiti. Data are non-exhaustive and subject to under-reporting.',
    'disclaimer.gender': 'Breakdown of Q1 2026 victims of gang-related violence by gender and sex across all violation types, communes, and perpetrator groups.',
    'disclaimer.perpetrators': 'Analysis of casualties by alleged perpetrator: Gangs, Security Forces, and "Popular justice" actors. Sexual violence involving armed actors is tracked separately on the Sexual Violence Involving Armed Actors page.',
    'disclaimer.geographic': 'Commune-level and department-level breakdown of Q1 2026 gang-related violence casualties in Haiti. Identifies the most affected localities for targeted response and monitoring.',
    'disclaimer.mara': 'Sexual violence involving armed actors is tracked separately from main casualty data to avoid double-counting. Cases cover rape and collective rape perpetrated by gang members, Security Forces, self-defence groups, and unknown actors. Data are non-exhaustive and subject to significant under-reporting.',
    'disclaimer.map': 'Circle size reflects victim count at each location. Data are non-exhaustive.',
    // Meta labels
    'meta.period.label': 'Period:',
    'meta.period.q1_2026': 'January – March 2026',
    'meta.coverage.label': 'Coverage:',
    'meta.coverage.all': 'All Departments, 40+ Communes',
    'meta.source.label': 'Source:',
    'meta.source.binuh': 'BINUH HRS Incident Database',
    'meta.categories.label': 'Categories:',
    'meta.categories.gender': 'Men · Women · Boys · Girls',
    'meta.groups.label': 'Groups:',
    'meta.groups.perp': 'Gangs · Security Forces · "Popular justice"',
    'meta.types.label': 'Types:',
    'meta.types.mara': 'Rape · Collective Rape',
    'meta.perp.label': 'Perpetrators:',
    'meta.perp.mara': 'Gangs · Security Forces · Self-Defence Group · Unknown',
    'meta.data.label': 'Data:',
    'meta.data.commune': 'Commune-level coordinates (Admin2)',
    'meta.bubble.label': 'Bubble size:',
    'meta.bubble.size': 'Proportional to victim count',
    // KPI labels
    'kpi.total': 'Total victims',
    'kpi.label.total_casualties': 'Total Casualties',
    'kpi.sub.killed_injured': 'Killed · Injured',
    'kpi.killed': 'Killed',
    'kpi.injured': 'Injured',
    'kpi.abducted': 'Abducted',
    'kpi.mara': 'Sexual Violence Involving Armed Actors',
    'kpi.label.mara_sexual': 'Sexual Violence Involving Armed Actors',
    'kpi.sub.mara_sexual': 'Sexual violence involving armed actors',
    'kpi.male': 'Men',
    'kpi.female': 'Women',
    'kpi.boys': 'Boys',
    'kpi.girls': 'Girls',
    'kpi.communes': 'Communes',
    'kpi.top_commune': 'Top commune victims',
    'kpi.label.men': 'Men',
    'kpi.label.women': 'Women',
    'kpi.label.boys': 'Boys',
    'kpi.label.girls': 'Girls',
    'kpi.label.children': 'Children (Boys+Girls)',
    'kpi.label.total_q1': 'Total Q1 Victims',
    'kpi.sub.killed_injured_abducted': 'Killed · Injured · Abducted',
    'kpi.label.gangs': 'Gangs',
    'kpi.label.security_forces': 'Security Forces',
    'kpi.label.pop_justice': '"Popular justice"',
    'kpi.label.unknown': 'Unknown',
    'kpi.label.mara_total': 'Total Victims (Sexual Violence)',
    'kpi.sub.rape_collective': 'Rape + Collective Rape',
    'kpi.label.rape': 'Rape',
    'kpi.label.collective_rape': 'Collective Rape',
    'kpi.label.female_victims': 'Female Victims',
    'kpi.label.minors': 'Minors (0–17)',
    'kpi.label.top_commune': 'Most Affected Commune',
    'kpi.label.top_dept': 'Most Affected Department',
    'kpi.label.active_communes': 'Active Communes',
    'kpi.sub.q1_incidents': 'with Q1 2026 incidents',
    'kpi.label.total_victims': 'Total Victims',
    'kpi.label.top_pct': 'Top Commune Share',
    'kpi.sub.pct_national': '% of national Q1 total',
    // Section headings — Overview
    's.overview.kpi': 'Q1 2026 Victims',
    's.overview.breakdown': 'Q1 2026 Casualty Breakdown',
    's.overview.trends': 'Trends & Comparisons',
    's.overview.monthly': 'Monthly Breakdown — Q1 2026',
    's.overview.insights': 'Key Insights — Q1 2026',
    // Section headings — Gender
    's.gender.intro': 'Gender disaggregation across three distinct victim categories: casualties (killed & injured), abductions, and sexual violence involving armed actors (tracked separately to avoid double-counting).',
    's.gender.kpi': 'Q1 2026 — Victims by Gender / Sex',
    's.gender.overview': 'Victim Category Overview — Gender by Harm Type',
    's.gender.cross': 'Casualty & Abduction Distribution by Location and Gender',
    's.gender.distribution': 'Gender Distribution — Q1 2026',
    's.gender.deepdive': 'Gender × Violation Deep Dive',
    's.gender.commune': 'Gender by Commune — Q1 2026',
    's.gender.perpetrator': 'Gender by Perpetrator Group — Q1 2026',
    's.gender.mara': 'Sexual Violence Involving Armed Actors — By Gender & Age',
    's.gender.insights': 'Gender Analysis Insights',
    // Section headings — Perpetrators
    's.perp.kpi': 'Q1 2026 — Victims by Perpetrator Group',
    's.perp.distribution': 'Perpetrator Distribution — Q1 2026',
    's.perp.geographic': 'Geographic Attribution — Q1 2026',
    's.perp.gender': 'Gender Profile by Perpetrator Group — Q1 2026',
    's.perp.insights': 'Perpetrator Analysis Insights',
    // Section headings — MARA
    's.mara.kpi': 'Q1 2026 — Sexual Violence Involving Armed Actors',
    's.mara.trend': 'Historical Trend — Sexual Violence Involving Armed Actors',
    's.mara.perpetrator': 'Perpetrator Attribution — Q1 2026',
    's.mara.geographic': 'Geographic Distribution — Q1 2026',
    's.mara.gender_age': 'Gender & Age Profile — Q1 2026',
    's.mara.monthly': 'Monthly Breakdown — Q1 2026',
    's.mara.insights': 'Sexual Violence Involving Armed Actors — Analysis Insights',
    // Section headings — Geographic
    's.geo.kpi': 'Q1 2026 — Most Affected Areas',
    's.geo.dept': 'Department-Level Analysis — Q1 2026',
    's.geo.commune': 'Commune-Level Data — Q1 2026',
    's.geo.comparison': 'Commune Comparison — All Communes with Q1 Data',
    's.geo.table': 'Full Commune Data Table — Q1 2026',
    's.geo.insights': 'Geographic Insights — Q1 2026',
    // Badges
    'badge.q1': 'Q1 2026',
    'badge.all_quarters': 'All Quarters',
    'badge.trend': 'Trend',
    // Chart titles/subtitles — Overview
    'ct.violation_donut': 'Violation Type Distribution',
    'cs.violation_donut': 'How Q1 casualties break down by harm type — killed, injured and abducted. Abducted is shown separately from casualty totals.',
    'ct.pct_bars': 'Casualty Percentages',
    'cx.pct_bars': 'Share of each violation type among all Q1 2026 documented victims.',
    'ct.mara_qoq': 'Sexual Violence Involving Armed Actors — Quarterly Trend',
    'ct.gender_donut_ov': 'Victims by Gender / Sex',
    'cs.gender_donut_ov': 'Distribution of Q1 victims across demographic groups.',
    'ct.mara_trend_ov': 'Sexual Violence Involving Armed Actors — Quarterly Trend (All Periods)',
    'cs.mara_trend_ov': 'Sexual violence involving armed actors documented per quarter, grouped by type: Rape and Collective Rape.',
    'ct.monthly_ov': 'Monthly Victims — Q1 2026',
    'cs.monthly_ov': 'Month-by-month breakdown of victims of gang-related violence by violation type (killed, injured and abductions).',
    'ct.monthly_full': 'Monthly Casualties by Violation Type',
    'cs.monthly_full': 'January–March 2026 breakdown of victims of gang-related violence. Killings and injuries are the primary focus; abductions are tracked separately.',
    // Table headers
    'table.period': 'Period',
    'table.total': 'Total',
    'table.commune': 'Commune',
    'table.department': 'Department',
    'table.victims': 'Victims',
    'table.incidents': 'Incidents',
    'table.killed': 'Killed',
    'table.injured': 'Injured',
    'table.abducted': 'Abducted',
    'th.coll_rape': 'Coll. Rape',
    // Chart titles/subtitles — Gender
    'ct.g.casualties': 'Casualties — Gender Breakdown',
    'cs.g.casualties': 'Gender split among killed and injured victims of gang-related violence (Q1 2026).',
    'ct.g.abducted': 'Abductions — Gender Breakdown',
    'cs.g.abducted': 'Gender split among abducted victims in Q1 2026 — tracked separately from casualty totals.',
    'ct.g.mara': 'Sexual Violence — Gender Breakdown',
    'cs.g.mara': 'Gender split among victims of sexual violence involving armed actors (Q1 2026, tracked separately).',
    'ct.g.location': 'Top Communes — Victim Share',
    'cs.g.location': 'Share of Q1 2026 victims attributed to the five most affected communes.',
    'ct.g.sex': 'Overall Sex Distribution',
    'cs.g.sex': 'Male vs female breakdown across all Q1 2026 victims of gang-related violence.',
    'ct.g.age': 'Age Profile (Main Violence)',
    'cs.g.age': 'Minors (0–17) vs adults among Q1 2026 victims — based on available disaggregated data.',
    'ct.g.donut': 'Overall Gender Distribution',
    'cs.g.donut': 'Proportion of Q1 victims who are men, women, boys, or girls.',
    'ct.g.violation': 'Gender within Each Violation Type',
    'cs.g.violation': 'Stacked bars showing gender breakdown for killed, injured, and abducted victims.',
    'ct.g.pct': 'Violation Share by Gender — 100%',
    'cs.g.pct': 'Normalised bars showing what % of each violation\'s victims are men, women, boys, or girls.',
    'ct.g.profile': 'Violation Profile per Gender — % Share',
    'cs.g.profile': 'For each gender group, what % of their victims suffered each violation type.',
    'ct.g.comparison': 'Gender Shares by Violation — Comparison',
    'cs.g.comparison': 'Grouped bars comparing how each gender group is distributed across violation types.',
    'ct.g.commune': 'Victims by Commune — Gender Breakdown',
    'cs.g.commune': 'Top communes ranked by total victims, with gender segments.',
    'ct.g.commune_vuln': 'Women & Children Victims by Commune',
    'cs.g.commune_vuln': 'Women + girls + boys combined per commune — highlights hotspots for vulnerable groups.',
    'ct.g.perp': 'Gender Breakdown by Perpetrator',
    'cs.g.perp': 'Stacked bars showing men, women, boys, and girls for each perpetrator group.',
    'ct.g.perp_vuln': 'Women & Children Share by Perpetrator',
    'cs.g.perp_vuln': '% of each perpetrator group\'s victims who are women, girls, or boys.',
    'ct.g.commune_casualties': 'Casualties by Commune — Gender Breakdown',
    'cs.g.commune_casualties': 'Distribution of killed and injured victims across top communes, disaggregated by gender (Q1 2026).',
    'ct.g.commune_abducted': 'Abductions by Commune — Q1 2026',
    'cs.g.commune_abducted': 'Total abducted victims per commune, ranked by count (Q1 2026, total: 57).',
    'ct.g.mara_gender': 'Sexual Violence Involving Armed Actors — Victims by Sex',
    'cs.g.mara_gender': 'Gender breakdown of victims of sexual violence involving armed actors in Q1 2026.',
    'ct.g.mara_type': 'Sexual Violence by Type',
    'cs.g.mara_type': 'Rape vs Collective Rape — victims of gang-related sexual violence in Q1 2026.',
    'ct.g.mara_age': 'Sexual Violence — Age Breakdown',
    'cs.g.mara_age': 'Minors (0-17) vs Adults (18-59) among documented sexual violence victims in Q1 2026.',
    // Chart titles/subtitles — Perpetrators
    'ct.p.donut': 'Share by Perpetrator Group',
    'cs.p.donut': 'What % of Q1 casualties are attributed to each actor type.',
    'ct.p.violation': 'Violation Type by Perpetrator',
    'cs.p.violation': 'Killed, injured, and abducted victims caused by each perpetrator group.',
    'ct.p.pct': 'Violation Profile — 100% per Actor',
    'cs.p.pct': 'Normalised bars showing each perpetrator\'s harm mix across violation types.',
    'ct.p.commune': 'Victims by Commune — Stacked by Perpetrator',
    'cs.p.commune': 'Top communes ranked by total victims, with perpetrator breakdown.',
    'ct.p.commune_group': 'Perpetrator Share by Commune',
    'cs.p.commune_group': 'Grouped bars showing dominant perpetrator type per commune.',
    'ct.p.gender': 'Gender Breakdown by Perpetrator',
    'cs.p.gender': 'Men, women, boys, and girls victimised by each perpetrator group.',
    'ct.p.vuln': 'Women & Children % by Perpetrator',
    'cs.p.vuln': 'Share of each perpetrator group\'s victims who are women, girls, or boys.',
    // Chart titles/subtitles — MARA
    'ct.m.trend': 'Quarterly Trend — Sexual Violence Involving Armed Actors (Q3 2024 – Q1 2026)',
    'cs.m.trend': 'Total victims of sexual violence involving armed actors per quarter — stacked by type.',
    'ct.m.type_donut': 'Q1 2026 — Type Distribution',
    'cs.m.type_donut': 'Rape vs Collective Rape — share of total sexual violence involving armed actors cases in Q1 2026.',
    'ct.m.perp_donut': 'Sexual Violence Involving Armed Actors — by Perpetrator Group',
    'cs.m.perp_donut': 'Share of sexual violence involving armed actors cases attributed to each actor type in Q1 2026.',
    'ct.m.perp_bar': 'Rape & Collective Rape by Perpetrator',
    'cs.m.perp_bar': 'Breakdown of rape and collective rape cases per perpetrator group.',
    'ct.m.commune': 'Sexual Violence Involving Armed Actors — Victims by Commune',
    'cs.m.commune': 'Top affected communes — total sexual violence involving armed actors victims in Q1 2026.',
    'ct.m.commune_pct': 'Geographic Concentration',
    'cs.m.commune_pct': 'Share of total sexual violence involving armed actors cases concentrated in the top communes.',
    'ct.m.gender': 'Victims by Sex',
    'cs.m.gender': 'Female and male breakdown of sexual violence involving armed actors victims in Q1 2026.',
    'ct.m.age': 'Age Breakdown',
    'cs.m.age': 'Minors (0–17) vs Adults (18–59) among documented sexual violence involving armed actors victims.',
    'ct.m.type_gender': 'Violence Type by Sex',
    'cs.m.type_gender': 'Rape and Collective Rape disaggregated by victim sex.',
    'ct.m.monthly': 'Sexual Violence Involving Armed Actors — Cases by Month (Q1 2026)',
    'cs.m.monthly': 'January, February, and March 2026 — total sexual violence involving armed actors.',
    'ct.m.monthly_type': 'Monthly Type Split (Q1 2026)',
    'cs.m.monthly_type': 'Rape vs Collective Rape per month in Q1 2026.',
    // Chart titles/subtitles — Geographic
    'ct.geo.dept_bar': 'Total Victims by Department',
    'cs.geo.dept_bar': 'Horizontal bar ranking departments by total gang-related violence victims in Q1 2026.',
    'ct.geo.dept_donut': 'Department Share of National Total',
    'cs.geo.dept_donut': 'Donut chart showing each department\'s share of total Q1 2026 casualties.',
    'ct.geo.commune_bar': 'Top 20 Communes — Total Victims',
    'cs.geo.commune_bar': 'Horizontal bar chart ranking the most affected communes in Q1 2026.',
    'ct.geo.commune_stack': 'Top 20 Communes — Violation Breakdown',
    'cs.geo.commune_stack': 'Stacked bars showing killed, injured, and abducted for each top commune.',
    'ct.geo.scatter': 'Commune Bubble Chart — Size = Total Victims, Y = Killed',
    'cs.geo.scatter': 'Each bubble = one commune. Bubble size = total victims; Y-axis = killed count. Use to identify outliers with high killing rates.',
    // Insight headings
    'insight.h.casualties_demo': 'Casualties & Demographics',
    'insight.h.perp_sexual': 'Perpetrators & Sexual Violence',
    'insight.h.victims_demo': 'Victims & Demographics',
    'insight.h.sexual_children': 'Sexual Violence & Children',
    'insight.h.main_casualties': 'Main Violence — Casualties',
    'insight.h.sf_accountability': 'Security Forces & Accountability',
    'insight.h.patterns_scale': 'Patterns & Scale',
    'insight.h.accountability_docs': 'Accountability & Documentation',
    'insight.h.hotspots': 'Hotspots & Concentration',
    'insight.h.patterns_accountability': 'Patterns & Accountability',
    // Maps
    'map.tab.casualty': 'Casualty Map',
    'map.tab.perpetrator': 'Perpetrator Map',
    'map.tab.mara': 'Sexual Violence Involving Armed Actors',
    'map.filters.title': 'Map filters',
    'map.filters.sub': 'Refine displayed incidents',
    'map.month.all': 'All months',
    'map.month.january': 'January',
    'map.month.february': 'February',
    'map.month.march': 'March',
    'map.viol.all': 'All Violations',
    'map.viol.killed': 'Killed',
    'map.viol.injured': 'Injured',
    'map.viol.abducted': 'Abducted',
    'map.perp.all': 'All Groups',
    'map.perp.gangs': 'Gangs',
    'map.perp.pnh': 'Security Forces',
    'map.perp.popjustice': '"Popular justice"',
    'map.perp.unknown': 'Unknown',
    'map.popup.victims': 'victims',
    'map.legend.title': 'LEGEND',
    'map.summary.title': 'MAP SUMMARY',
    'map.hotspots.title': 'TOP COMMUNES (Q1)',
    'map.bubble.note': 'Bubble Size = Victims',
    'map.src': 'Data source: Human Rights Division, BINUH (Report 6.0)',
    'map.card.casualty': 'Casualty Map — Gang-related Violence (Haiti)',
    'map.card.perpetrator': 'Perpetrator Map — Victims by Perpetrator Group (Haiti)',
    'map.card.mara': 'Sexual Violence Map — Involving Armed Actors (Haiti)',
    'map.legend.perpetrator': 'PERPETRATOR LEGEND',
    'map.legend.mara': 'SEXUAL VIOLENCE LEGEND',
    'map.summary.perpetrator': 'PERPETRATOR SUMMARY',
    'map.summary.mara': 'SEXUAL VIOLENCE SUMMARY',
    'map.hotspots.perp': 'TOP COMMUNES BY PERPETRATOR',
    'map.stat.locations': 'Locations plotted',
    'map.stat.total_victims': 'Total Victims',
    'map.stat.killed': 'Killed',
    'map.stat.injured': 'Injured',
    'map.stat.abducted': 'Abducted',
    'map.stat.mara_total': 'Total sexual violence victims',
    'map.stat.rape': 'Rape',
    'map.stat.coll_rape': 'Collective Rape',
    'map.stat.female': 'Female victims',
    'map.stat.minors': 'Minors (0–17)',
    'map.legend.sexual': 'Sexual violence victims',
    'map.legend.coll_relative': 'Collective Rape (relative)',
    'btn.png': 'PNG',
    'btn.csv': 'CSV',
    'btn.png.export': 'Download PNG',
    'btn.csv.export': 'Download CSV',
    // Violations / violations keys
    'viol.killed': 'Killed',
    'viol.injured': 'Injured',
    'viol.abducted': 'Abducted',
    'gender.men': 'Men',
    'gender.women': 'Women',
    'gender.boys': 'Boys',
    'gender.girls': 'Girls',
    'age.minor': 'Minors (0–17)',
    'age.adult': 'Adults (18–59)',
    'age.elderly': 'Elderly (60+)',
    'perp.gangs': 'Gangs',
    'perp.pnh': 'Security Forces',
    'perp.popjustice': '"Popular justice"',
    'perp.selfdefence': 'Self-Defence Group',
    'perp.unknown': 'Unknown',
    'series.victims': 'Victims',
    'center.victims': 'victims',
    'insight.title': 'Key findings',
    'insight.1': '{n} victims documented in {period}.',
    'insight.2': 'Killed: {killed} ({kp}%) · Injured: {injured} · Abducted: {abducted}',
    'insight.3': 'Most affected commune: {commune} ({cv} victims).',
    'insight.4': '{mara} victims of sexual violence involving armed actors documented this quarter.',
    'data.source': 'Data source: Human Rights Section, BINUH (Report 6.0)',
    'month.january': 'January', 'month.february': 'February', 'month.march': 'March',
    'month.april': 'April', 'month.may': 'May', 'month.june': 'June',
    'month.july': 'July', 'month.august': 'August', 'month.september': 'September',
    'month.october': 'October', 'month.november': 'November', 'month.december': 'December',
  },
  fr: {
    // Brand
    'brand.title': 'Droits de l\'homme — BINUH',
    'brand.sub.overview': 'Violence liée aux gangs — Haïti',
    'brand.sub.gender': 'Genre et Sexe — Analyse des victimes',
    'brand.sub.perpetrators': 'Auteurs — Attribution des acteurs',
    'brand.sub.geographic': 'Géographie — Analyse des points chauds',
    'brand.sub.mara': 'Violence sexuelle impliquant des acteurs armés (MARA)',
    'brand.sub.maps': 'Cartes — Analyse spatiale',
    'brand.sub.violations': 'Violations',
    // Nav
    'nav.overview': 'Aperçu',
    'nav.gender': 'Genre',
    'nav.perpetrators': 'Auteurs',
    'nav.geographic': 'Géographie',
    'nav.mara': 'Violence sexuelle impliquant des acteurs armés',
    'nav.mara.link': 'Violence sexuelle impliquant des acteurs armés (MARA)',
    'nav.maps': 'Cartes',
    'nav.violations': 'Violations',
    // Footer
    'footer.copy': '© Droits de l\'homme — BINUH',
    'footer.copy.v6': '© Droits de l\'homme — BINUH · Rapport 6.0',
    'footer.json': 'Télécharger JSON',
    'footer.csv': 'Télécharger CSV',
    // Page titles
    'page.overview': 'Violence liée aux gangs en Haïti — Aperçu',
    'page.gender': 'Genre et Sexe — Analyse des victimes',
    'page.perpetrators': 'Auteurs — Attribution des acteurs',
    'page.geographic': 'Géographie — Analyse des points chauds',
    'page.geographic.sub': 'Par commune (Admin2)',
    'page.mara': 'Violence sexuelle impliquant des acteurs armés — Analyse approfondie',
    'page.maps': 'Cartes — Analyse spatiale',
    'page.demographics': 'Victimes — Démographie',
    'page.violations': 'Analyse des violations',
    // Page tags
    'page.tag.overview': 'T1 2026',
    'page.tag.gender': 'ANALYSE DÉSAGRÉGÉE PAR GENRE',
    'page.tag.perpetrators': 'ANALYSE DES GROUPES D\'AUTEURS',
    'page.tag.geographic': 'ANALYSE COMMUNE · DÉPARTEMENT',
    'page.tag.mara': 'VIOLENCE SEXUELLE IMPLIQUANT DES ACTEURS ARMÉS (MARA)',
    'page.tag.maps': 'CARTES INTERACTIVES',
    // Disclaimers
    'disclaimer': 'Victimes civiles documentées en Haïti (Rapport 6.0). Les données ne sont pas exhaustives et souffrent de sous-déclaration.',
    'disclaimer.overview': 'Analyse complète des victimes de conflits documentées par le Service des droits de l\'homme du BINUH en Haïti. Les données ne sont pas exhaustives et souffrent de sous-déclaration.',
    'disclaimer.gender': 'Répartition des victimes du T1 2026 de la violence liée aux gangs par genre et sexe, toutes violations, communes et groupes d\'auteurs confondus.',
    'disclaimer.perpetrators': 'Analyse des victimes par auteur présumé : Gangs, Forces de sécurité, et « Justice populaire ». La violence sexuelle impliquant des acteurs armés est suivie séparément sur la page Violence sexuelle impliquant des acteurs armés.',
    'disclaimer.geographic': 'Répartition des victimes du T1 2026 au niveau des communes et des départements en Haïti. Identifie les localités les plus touchées pour une réponse ciblée et un suivi.',
    'disclaimer.mara': 'La violence sexuelle impliquant des acteurs armés est suivie séparément des données de victimes pour éviter le double comptage. Les cas couvrent le viol et le viol collectif commis par des membres de gangs, les Forces de sécurité, des groupes d\'autodéfense et des acteurs inconnus. Les données ne sont pas exhaustives.',
    'disclaimer.map': 'La taille des cercles reflète le nombre de victimes à chaque emplacement. Données non exhaustives.',
    // Meta labels
    'meta.period.label': 'Période :',
    'meta.period.q1_2026': 'Janvier – Mars 2026',
    'meta.coverage.label': 'Couverture :',
    'meta.coverage.all': 'Tous les départements, 40+ communes',
    'meta.source.label': 'Source :',
    'meta.source.binuh': 'Base de données des incidents, BINUH HRS',
    'meta.categories.label': 'Catégories :',
    'meta.categories.gender': 'Hommes · Femmes · Garçons · Filles',
    'meta.groups.label': 'Groupes :',
    'meta.groups.perp': 'Gangs · Forces de sécurité · "Justice populaire"',
    'meta.types.label': 'Types :',
    'meta.types.mara': 'Viol · Viol collectif',
    'meta.perp.label': 'Auteurs :',
    'meta.perp.mara': 'Gangs · Forces de sécurité · Groupe d\'autodéfense · Inconnu',
    'meta.data.label': 'Données :',
    'meta.data.commune': 'Coordonnées au niveau commune (Admin2)',
    'meta.bubble.label': 'Taille des bulles :',
    'meta.bubble.size': 'Proportionnelle au nombre de victimes',
    // KPI labels
    'kpi.total': 'Total victimes',
    'kpi.label.total_casualties': 'Victimes totales',
    'kpi.sub.killed_injured': 'Tués · Blessés',
    'kpi.killed': 'Tués',
    'kpi.injured': 'Blessés',
    'kpi.abducted': 'Enlevés',
    'kpi.mara': 'Violence sexuelle impliquant des acteurs armés',
    'kpi.label.mara_sexual': 'Violence sexuelle impliquant des acteurs armés',
    'kpi.sub.mara_sexual': 'Violence sexuelle impliquant des acteurs armés',
    'kpi.male': 'Hommes',
    'kpi.female': 'Femmes',
    'kpi.boys': 'Garçons',
    'kpi.girls': 'Filles',
    'kpi.communes': 'Communes',
    'kpi.top_commune': 'Commune la plus touchée',
    'kpi.label.men': 'Hommes',
    'kpi.label.women': 'Femmes',
    'kpi.label.boys': 'Garçons',
    'kpi.label.girls': 'Filles',
    'kpi.label.children': 'Enfants (Garçons+Filles)',
    'kpi.label.total_q1': 'Total victimes T1',
    'kpi.sub.killed_injured_abducted': 'Tués · Blessés · Enlevés',
    'kpi.label.gangs': 'Gangs',
    'kpi.label.security_forces': 'Forces de sécurité',
    'kpi.label.pop_justice': '"Justice populaire"',
    'kpi.label.unknown': 'Inconnu',
    'kpi.label.mara_total': 'Total des victimes (violence sexuelle)',
    'kpi.sub.rape_collective': 'Viol + Viol collectif',
    'kpi.label.rape': 'Viol',
    'kpi.label.collective_rape': 'Viol collectif',
    'kpi.label.female_victims': 'Victimes féminines',
    'kpi.label.minors': 'Mineurs (0–17 ans)',
    'kpi.label.top_commune': 'Commune la plus touchée',
    'kpi.label.top_dept': 'Département le plus touché',
    'kpi.label.active_communes': 'Communes actives',
    'kpi.sub.q1_incidents': 'avec incidents T1 2026',
    'kpi.label.total_victims': 'Total victimes',
    'kpi.label.top_pct': 'Part de la commune principale',
    'kpi.sub.pct_national': '% du total national T1',
    // Section headings — Overview
    's.overview.kpi': 'Victimes T1 2026',
    's.overview.breakdown': 'Répartition des victimes T1 2026',
    's.overview.trends': 'Tendances et comparaisons',
    's.overview.monthly': 'Répartition mensuelle — T1 2026',
    's.overview.insights': 'Points clés — T1 2026',
    // Section headings — Gender
    's.gender.intro': 'Désagrégation par genre pour trois catégories de victimes : victimes (tués et blessés), enlèvements, et violence sexuelle impliquant des acteurs armés (suivie séparément pour éviter le double comptage).',
    's.gender.kpi': 'T1 2026 — Victimes par genre et sexe',
    's.gender.overview': 'Vue d\'ensemble des victimes — Genre par type de préjudice',
    's.gender.cross': 'Distribution des victimes et enlèvements par lieu et par genre',
    's.gender.distribution': 'Répartition par genre — T1 2026',
    's.gender.deepdive': 'Genre × Violation — Analyse approfondie',
    's.gender.commune': 'Genre par commune — T1 2026',
    's.gender.perpetrator': 'Genre par groupe d\'auteurs — T1 2026',
    's.gender.mara': 'Violence sexuelle impliquant des acteurs armés — Par genre et âge',
    's.gender.insights': 'Analyse de genre — Points clés',
    // Section headings — Perpetrators
    's.perp.kpi': 'T1 2026 — Victimes par groupe d\'auteurs',
    's.perp.distribution': 'Répartition des auteurs — T1 2026',
    's.perp.geographic': 'Attribution géographique — T1 2026',
    's.perp.gender': 'Profil de genre par groupe d\'auteurs — T1 2026',
    's.perp.insights': 'Analyse des auteurs — Points clés',
    // Section headings — MARA
    's.mara.kpi': 'T1 2026 — Violence sexuelle impliquant des acteurs armés',
    's.mara.trend': 'Tendance historique — Violence sexuelle impliquant des acteurs armés',
    's.mara.perpetrator': 'Attribution aux auteurs — T1 2026',
    's.mara.geographic': 'Distribution géographique — T1 2026',
    's.mara.gender_age': 'Profil genre et âge — T1 2026',
    's.mara.monthly': 'Répartition mensuelle — T1 2026',
    's.mara.insights': 'Violence sexuelle impliquant des acteurs armés — Points clés',
    // Section headings — Geographic
    's.geo.kpi': 'T1 2026 — Zones les plus touchées',
    's.geo.dept': 'Analyse départementale — T1 2026',
    's.geo.commune': 'Données communales — T1 2026',
    's.geo.comparison': 'Comparaison des communes — Toutes communes avec données T1',
    's.geo.table': 'Tableau complet des données par commune — T1 2026',
    's.geo.insights': 'Analyse géographique — Points clés T1 2026',
    // Badges
    'badge.q1': 'T1 2026',
    'badge.all_quarters': 'Tous les trimestres',
    'badge.trend': 'Tendance',
    // Chart titles/subtitles — Overview
    'ct.violation_donut': 'Répartition par type de violation',
    'cs.violation_donut': 'Répartition des victimes du T1 par type de préjudice — tués, blessés et enlevés. Les enlevés sont affichés séparément des victimes.',
    'ct.pct_bars': 'Pourcentages des victimes',
    'cx.pct_bars': 'Part de chaque type de violation parmi toutes les victimes documentées au T1 2026.',
    'ct.mara_qoq': 'Violence sexuelle impliquant des acteurs armés — Tendance trimestrielle',
    'ct.gender_donut_ov': 'Victimes par genre et sexe',
    'cs.gender_donut_ov': 'Répartition des victimes du T1 par groupes démographiques.',
    'ct.mara_trend_ov': 'Violence sexuelle impliquant des acteurs armés — Tendance trimestrielle (Toutes périodes)',
    'cs.mara_trend_ov': 'Violence sexuelle impliquant des acteurs armés documentée par trimestre. Regroupée par type : Viol et Viol collectif.',
    'ct.monthly_ov': 'Victimes mensuelles — T1 2026',
    'cs.monthly_ov': 'Répartition mensuelle des victimes de la violence liée aux gangs par type de violation (tués, blessés et enlevés).',
    'ct.monthly_full': 'Victimes mensuelles par type de violation',
    'cs.monthly_full': 'Répartition Janvier–Mars 2026 des victimes de la violence liée aux gangs. Les tués et blessés constituent la priorité ; les enlèvements sont suivis séparément.',
    // Table headers
    'table.period': 'Période',
    'table.total': 'Total',
    'table.commune': 'Commune',
    'table.department': 'Département',
    'table.victims': 'Victimes',
    'table.incidents': 'Incidents',
    'table.killed': 'Tués',
    'table.injured': 'Blessés',
    'table.abducted': 'Enlevés',
    'th.coll_rape': 'Viol coll.',
    // Chart titles/subtitles — Gender
    'ct.g.casualties': 'Victimes — Répartition par genre',
    'cs.g.casualties': 'Répartition par genre des victimes tuées et blessées de la violence liée aux gangs (T1 2026).',
    'ct.g.abducted': 'Enlèvements — Répartition par genre',
    'cs.g.abducted': 'Répartition par genre des personnes enlevées au T1 2026 — suivies séparément des victimes.',
    'ct.g.mara': 'Violence sexuelle — Répartition par genre',
    'cs.g.mara': 'Répartition par genre des victimes de violence sexuelle impliquant des acteurs armés (T1 2026, suivies séparément).',
    'ct.g.location': 'Principales communes — Part des victimes',
    'cs.g.location': 'Part des victimes du T1 2026 attribuée aux cinq communes les plus touchées.',
    'ct.g.sex': 'Répartition globale par sexe',
    'cs.g.sex': 'Répartition hommes/femmes pour toutes les victimes du T1 2026 de la violence liée aux gangs.',
    'ct.g.age': 'Profil d\'âge (Violence principale)',
    'cs.g.age': 'Mineurs (0–17) vs adultes parmi les victimes du T1 2026 — selon les données désagrégées disponibles.',
    'ct.g.donut': 'Répartition globale par genre',
    'cs.g.donut': 'Proportion des victimes du T1 qui sont des hommes, femmes, garçons ou filles.',
    'ct.g.violation': 'Genre par type de violation',
    'cs.g.violation': 'Barres empilées montrant la répartition par genre des tués, blessés et enlevés.',
    'ct.g.pct': 'Part des violations par genre — 100%',
    'cs.g.pct': 'Barres normalisées montrant le % de chaque violation par genre.',
    'ct.g.profile': 'Profil de violation par genre — % de part',
    'cs.g.profile': 'Pour chaque groupe de genre, quel % a subi chaque type de violation.',
    'ct.g.comparison': 'Répartition par genre selon la violation — Comparaison',
    'cs.g.comparison': 'Barres groupées comparant la répartition de chaque genre par violation.',
    'ct.g.commune': 'Victimes par commune — Répartition par genre',
    'cs.g.commune': 'Principales communes classées par total de victimes, avec segments de genre.',
    'ct.g.commune_vuln': 'Femmes et enfants victimes par commune',
    'cs.g.commune_vuln': 'Femmes + filles + garçons cumulés par commune — identifie les points chauds pour les groupes vulnérables.',
    'ct.g.perp': 'Répartition par genre selon l\'auteur',
    'cs.g.perp': 'Barres empilées montrant hommes, femmes, garçons et filles par groupe d\'auteurs.',
    'ct.g.perp_vuln': 'Part femmes et enfants par auteur',
    'cs.g.perp_vuln': '% des victimes de chaque groupe d\'auteurs qui sont des femmes, filles ou garçons.',
    'ct.g.commune_casualties': 'Victimes (tués et blessés) par commune — Répartition par genre',
    'cs.g.commune_casualties': 'Distribution des victimes tuées et blessées dans les principales communes, désagrégée par genre (T1 2026).',
    'ct.g.commune_abducted': 'Enlèvements par commune — T1 2026',
    'cs.g.commune_abducted': 'Total des personnes enlevées par commune, classées par nombre (T1 2026, total : 57).',
    'ct.g.mara_gender': 'Violence sexuelle impliquant des acteurs armés — Victimes par sexe',
    'cs.g.mara_gender': 'Répartition par genre des victimes de violence sexuelle impliquant des acteurs armés au T1 2026.',
    'ct.g.mara_type': 'Violence sexuelle par type',
    'cs.g.mara_type': 'Viol vs Viol collectif — victimes de violence sexuelle liée aux gangs au T1 2026.',
    'ct.g.mara_age': 'Violence sexuelle — Répartition par âge',
    'cs.g.mara_age': 'Mineurs (0-17) vs Adultes (18-59) parmi les victimes documentées au T1 2026.',
    // Chart titles/subtitles — Perpetrators
    'ct.p.donut': 'Part par groupe d\'auteurs',
    'cs.p.donut': 'Quel % des victimes du T1 est attribué à chaque type d\'acteur.',
    'ct.p.violation': 'Type de violation par auteur',
    'cs.p.violation': 'Victimes tuées, blessées et enlevées par chaque groupe d\'auteurs.',
    'ct.p.pct': 'Profil de violation — 100% par acteur',
    'cs.p.pct': 'Barres normalisées montrant la répartition des préjudices de chaque auteur.',
    'ct.p.commune': 'Victimes par commune — Empilées par auteur',
    'cs.p.commune': 'Principales communes classées par total de victimes, avec répartition par auteur.',
    'ct.p.commune_group': 'Part des auteurs par commune',
    'cs.p.commune_group': 'Barres groupées montrant le type d\'auteur dominant par commune.',
    'ct.p.gender': 'Répartition par genre selon l\'auteur',
    'cs.p.gender': 'Hommes, femmes, garçons et filles victimisés par chaque groupe d\'auteurs.',
    'ct.p.vuln': 'Femmes et enfants % par auteur',
    'cs.p.vuln': 'Part des victimes de chaque groupe d\'auteurs qui sont des femmes, filles ou garçons.',
    // Chart titles/subtitles — MARA
    'ct.m.trend': 'Tendance trimestrielle — Violence sexuelle impliquant des acteurs armés (T3 2024 – T1 2026)',
    'cs.m.trend': 'Total des victimes de violence sexuelle impliquant des acteurs armés par trimestre — empilées par type.',
    'ct.m.type_donut': 'T1 2026 — Répartition par type',
    'cs.m.type_donut': 'Viol vs Viol collectif — part du total des cas de violence sexuelle impliquant des acteurs armés au T1 2026.',
    'ct.m.perp_donut': 'Violence sexuelle impliquant des acteurs armés — par groupe d\'auteurs',
    'cs.m.perp_donut': 'Part des cas de violence sexuelle impliquant des acteurs armés attribuée à chaque type d\'acteur au T1 2026.',
    'ct.m.perp_bar': 'Viol et viol collectif par auteur',
    'cs.m.perp_bar': 'Répartition des cas de viol et viol collectif par groupe d\'auteurs.',
    'ct.m.commune': 'Violence sexuelle impliquant des acteurs armés — Victimes par commune',
    'cs.m.commune': 'Principales communes touchées — total des victimes de violence sexuelle impliquant des acteurs armés au T1 2026.',
    'ct.m.commune_pct': 'Concentration géographique',
    'cs.m.commune_pct': 'Part du total des cas MARA concentrée dans les principales communes.',
    'ct.m.gender': 'Victimes par sexe',
    'cs.m.gender': 'Répartition féminine et masculine des victimes de violence sexuelle impliquant des acteurs armés au T1 2026.',
    'ct.m.age': 'Répartition par âge',
    'cs.m.age': 'Mineurs (0–17) vs Adultes (18–59) parmi les victimes de violence sexuelle impliquant des acteurs armés documentées.',
    'ct.m.type_gender': 'Type de violence par sexe',
    'cs.m.type_gender': 'Viol et viol collectif désagrégés par sexe de la victime.',
    'ct.m.monthly': 'Violence sexuelle impliquant des acteurs armés — Cas par mois (T1 2026)',
    'cs.m.monthly': 'Janvier, février et mars 2026 — total de la violence sexuelle impliquant des acteurs armés.',
    'ct.m.monthly_type': 'Répartition mensuelle par type (T1 2026)',
    'cs.m.monthly_type': 'Viol vs Viol collectif par mois au T1 2026.',
    // Chart titles/subtitles — Geographic
    'ct.geo.dept_bar': 'Total des victimes par département',
    'cs.geo.dept_bar': 'Classement horizontal des départements par total de victimes de violence liée aux gangs au T1 2026.',
    'ct.geo.dept_donut': 'Part des départements dans le total national',
    'cs.geo.dept_donut': 'Graphique en anneau montrant la part de chaque département dans le total des victimes du T1 2026.',
    'ct.geo.commune_bar': 'Top 20 communes — Total des victimes',
    'cs.geo.commune_bar': 'Classement horizontal des communes les plus touchées au T1 2026.',
    'ct.geo.commune_stack': 'Top 20 communes — Répartition des violations',
    'cs.geo.commune_stack': 'Barres empilées montrant les tués, blessés et enlevés pour chaque commune.',
    'ct.geo.scatter': 'Graphique de bulles — Taille = Total victimes, Y = Tués',
    'cs.geo.scatter': 'Chaque bulle = une commune. Taille = total victimes ; axe Y = nombre de tués. Identifie les valeurs aberrantes avec des taux de meurtres élevés.',
    // Insight headings
    'insight.h.casualties_demo': 'Victimes et démographie',
    'insight.h.perp_sexual': 'Auteurs et violence sexuelle',
    'insight.h.victims_demo': 'Victimes et démographie',
    'insight.h.sexual_children': 'Violence sexuelle et enfants',
    'insight.h.main_casualties': 'Violence principale — Victimes',
    'insight.h.sf_accountability': 'Forces de sécurité et responsabilité',
    'insight.h.patterns_scale': 'Tendances et ampleur',
    'insight.h.accountability_docs': 'Responsabilité et documentation',
    'insight.h.hotspots': 'Points chauds et concentration',
    'insight.h.patterns_accountability': 'Tendances et responsabilité',
    // Maps
    'map.tab.casualty': 'Carte des victimes',
    'map.tab.perpetrator': 'Carte des auteurs',
    'map.tab.mara': 'Carte de la violence sexuelle impliquant des acteurs armés',
    'map.filters.title': 'Filtres de la carte',
    'map.filters.sub': 'Affiner les incidents affichés',
    'map.month.all': 'Tous les mois',
    'map.month.january': 'Janvier',
    'map.month.february': 'Février',
    'map.month.march': 'Mars',
    'map.viol.all': 'Toutes les violations',
    'map.viol.killed': 'Tués',
    'map.viol.injured': 'Blessés',
    'map.viol.abducted': 'Enlevés',
    'map.perp.all': 'Tous les groupes',
    'map.perp.gangs': 'Gangs',
    'map.perp.pnh': 'Forces de sécurité',
    'map.perp.popjustice': '"Justice populaire"',
    'map.perp.unknown': 'Inconnu',
    'map.popup.victims': 'victimes',
    'map.legend.title': 'LÉGENDE',
    'map.summary.title': 'RÉSUMÉ DE LA CARTE',
    'map.hotspots.title': 'PRINCIPALES COMMUNES (T1)',
    'map.bubble.note': 'Taille des bulles = Victimes',
    'map.src': 'Source : Division des droits de l\'homme, BINUH (Rapport 6.0)',
    'map.card.casualty': 'Carte des victimes — Violence liée aux gangs (Haïti)',
    'map.card.perpetrator': 'Carte des auteurs — Victimes par groupe d\'auteurs (Haïti)',
    'map.card.mara': 'Carte de la violence sexuelle — Impliquant des acteurs armés (Haïti)',
    'map.legend.perpetrator': 'LÉGENDE DES AUTEURS',
    'map.legend.mara': 'LÉGENDE DE LA VIOLENCE SEXUELLE',
    'map.summary.perpetrator': 'RÉSUMÉ DES AUTEURS',
    'map.summary.mara': 'RÉSUMÉ DE LA VIOLENCE SEXUELLE',
    'map.hotspots.perp': 'PRINCIPALES COMMUNES PAR AUTEUR',
    'map.stat.locations': 'Emplacements cartographiés',
    'map.stat.total_victims': 'Total victimes',
    'map.stat.killed': 'Tués',
    'map.stat.injured': 'Blessés',
    'map.stat.abducted': 'Enlevés',
    'map.stat.mara_total': 'Total victimes de violence sexuelle',
    'map.stat.rape': 'Viol',
    'map.stat.coll_rape': 'Viol collectif',
    'map.stat.female': 'Victimes féminines',
    'map.stat.minors': 'Mineurs (0–17)',
    'map.legend.sexual': 'Victimes de violence sexuelle',
    'map.legend.coll_relative': 'Viol collectif (relatif)',
    'btn.png': 'PNG',
    'btn.csv': 'CSV',
    'btn.png.export': 'Télécharger PNG',
    'btn.csv.export': 'Télécharger CSV',
    // Violations / other keys
    'viol.killed': 'Tués',
    'viol.injured': 'Blessés',
    'viol.abducted': 'Enlevés',
    'gender.men': 'Hommes',
    'gender.women': 'Femmes',
    'gender.boys': 'Garçons',
    'gender.girls': 'Filles',
    'age.minor': 'Mineurs (0–17 ans)',
    'age.adult': 'Adultes (18–59 ans)',
    'age.elderly': 'Personnes âgées (60+ ans)',
    'perp.gangs': 'Gangs',
    'perp.pnh': 'Forces de sécurité',
    'perp.security': 'Forces de sécurité',
    'perp.popjustice': '"Justice populaire"',
    'perp.selfdefence': 'Groupe d\'autodéfense',
    'perp.community': 'Acteurs communautaires / justice',
    'perp.unknown': 'Inconnu',
    'series.victims': 'Victimes',
    'center.victims': 'victimes',
    'insight.title': 'Points clés',
    'insight.1': '{n} victimes documentées au cours de {period}.',
    'insight.2': 'Tués : {killed} ({kp} %) · Blessés : {injured} · Enlevés : {abducted}',
    'insight.3': 'Commune la plus touchée : {commune} ({cv} victimes).',
    'insight.4': 'Gangs responsables de {gp} % des victimes ce trimestre.',
    'data.source': 'Source : Section des droits de l\'homme, BINUH (Rapport 6.0)',
    'month.january': 'Janvier', 'month.february': 'Février', 'month.march': 'Mars',
    'month.april': 'Avril', 'month.may': 'Mai', 'month.june': 'Juin',
    'month.july': 'Juillet', 'month.august': 'Août', 'month.september': 'Septembre',
    'month.october': 'Octobre', 'month.november': 'Novembre', 'month.december': 'Décembre',
  },
};

const PAGE_KEYS = {
  'index.html': { brand: 'brand.sub.overview', title: 'page.overview', disclaimer: 'disclaimer.overview' },
  'gender.html': { brand: 'brand.sub.gender', title: 'page.gender', disclaimer: 'disclaimer.gender' },
  'perpetrators.html': { brand: 'brand.sub.perpetrators', title: 'page.perpetrators', disclaimer: 'disclaimer.perpetrators' },
  'geographic.html': { brand: 'brand.sub.geographic', title: 'page.geographic', subtitle: 'page.geographic.sub', disclaimer: 'disclaimer.geographic' },
  'mara.html': { brand: 'brand.sub.mara', title: 'page.mara', disclaimer: 'disclaimer.mara' },
  'maps.html': { brand: 'brand.sub.maps', title: 'page.maps', disclaimer: 'disclaimer.map' },
  'demographics.html': { brand: 'brand.sub.demographics', title: 'page.demographics' },
  'violations.html': { brand: 'brand.sub.violations', title: 'page.violations' },
};

let currentLang = localStorage.getItem('binuh-lang') || 'en';
const pageRenderers = [];

function t(key, vars = {}) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en[key]) || key;
  Object.entries(vars).forEach(([k, v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), v); });
  return s;
}

function getLang() { return currentLang; }

function setLang(lang) {
  if (!I18N[lang] || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('binuh-lang', lang);
  document.documentElement.lang = lang;
  applyStaticI18n();
  updateLangButtons();
  window.dispatchEvent(new CustomEvent('binuh:langchange'));
  pageRenderers.forEach(fn => fn());
}

function registerPageRenderer(fn) { pageRenderers.push(fn); }

function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  const page = currentPage();
  const pk = PAGE_KEYS[page];
  if (pk) {
    const brand = document.querySelector('.brand-sub');
    if (brand && pk.brand) brand.textContent = t(pk.brand);
    const title = document.querySelector('.page-title');
    if (title && pk.title) {
      const parts = t(pk.title).split(' — ');
      if (parts.length > 1) title.innerHTML = `${parts[0]} — <span>${parts.slice(1).join(' — ')}</span>`;
      else {
        const sp = t(pk.title).split(' ');
        const last = sp.pop();
        title.innerHTML = `${sp.join(' ')} <span>${last}</span>`;
      }
    }
    const sub = document.querySelector('.page-subtitle');
    if (sub && pk.subtitle) sub.textContent = t(pk.subtitle);
    const disc = document.querySelector('.page-disclaimer');
    if (disc && pk.disclaimer) disc.textContent = t(pk.disclaimer);
  }
}

function currentPage() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  let page = parts[parts.length - 1] || 'index.html';
  if (!page.endsWith('.html')) page = 'index.html';
  return page;
}

function initLangSwitcher() {
  document.querySelectorAll('.navbar').forEach(nav => {
    if (nav.querySelector('.lang-switch')) return;
    const links = nav.querySelector('.nav-links');
    const div = document.createElement('div');
    div.className = 'lang-switch';
    div.innerHTML = '<button type="button" class="lang-btn" data-lang="en" aria-label="English">EN</button><button type="button" class="lang-btn" data-lang="fr" aria-label="Français">FR</button>';
    div.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
    if (links) nav.insertBefore(div, links);
    else nav.appendChild(div);
  });
  updateLangButtons();
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function lblViol(key) {
  const k = String(key).toLowerCase();
  return t({ killed: 'viol.killed', injured: 'viol.injured', abducted: 'viol.abducted' }[k] || 'viol.killed');
}

function lblPerp(name) {
  if (!name) return t('perp.unknown');
  if (name === 'Gangs') return t('perp.gangs');
  if (name === 'PNH / HNP') return t('perp.pnh');
  if (name === 'Popular justice') return t('perp.popjustice');
  if (name === 'Self-Defence Group') return t('perp.selfdefence');
  if (name === 'Unknown') return t('perp.unknown');
  return name;
}

function lblGender(g) {
  return t({ male: 'gender.men', female: 'gender.women', boys: 'gender.boys', girls: 'gender.girls', Men: 'gender.men', Women: 'gender.women', Boys: 'gender.boys', Girls: 'gender.girls' }[g] || 'gender.men');
}

function lblMonth(m) {
  return t('month.' + String(m).toLowerCase()) || m;
}

function lblAge(i) {
  return [t('age.minor'), t('age.adult'), t('age.elderly')][i] || '';
}

function violLabelList() { return ['killed', 'injured', 'abducted'].map(lblViol); }

function genderLabelList() { return ['male', 'female', 'boys', 'girls'].map(lblGender); }

function enhanceChartWraps(meta) {
  Object.entries(meta).forEach(([chartId, keys]) => {
    const chart = document.getElementById(chartId);
    if (!chart) return;
    const wrap = chart.closest('.chart-wrap');
    if (!wrap) return;
    let header = wrap.querySelector('.chart-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'chart-header';
      wrap.insertBefore(header, chart);
    }
    if (!header.querySelector('.chart-title')) {
      const tEl = document.createElement('div');
      tEl.className = 'chart-title';
      tEl.setAttribute('data-i18n', keys.title);
      header.appendChild(tEl);
    } else {
      header.querySelector('.chart-title').setAttribute('data-i18n', keys.title);
    }
    let sub = wrap.querySelector('.chart-subtitle');
    if (!sub) {
      sub = document.createElement('p');
      sub.className = 'chart-subtitle';
      header.appendChild(sub);
    }
    sub.setAttribute('data-i18n', keys.sub);
    let ex = wrap.querySelector('.chart-explain');
    if (!ex) {
      ex = document.createElement('p');
      ex.className = 'chart-explain';
      wrap.insertBefore(ex, chart);
    }
    ex.setAttribute('data-i18n', keys.explain);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  initLangSwitcher();
  applyStaticI18n();
});
