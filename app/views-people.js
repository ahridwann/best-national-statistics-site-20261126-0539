// NusaStats views: Education, Health, Regions, and the Data tables page.
import { SOURCES, HDI_SERIES, MYS_SERIES, HDI_COMPONENTS_2025, HDI_PROVINCES, EDUCATION_BUDGET, JAVA_PROVINCES, PROVINCE_NOTES, ALL_INDICATORS, META } from "./data.js";
import { barChart, hbarChart, lineChart } from "./charts.js";

function srcLine(source, year) {
  return `<p class="src">Source: ${source} · ${year}</p>`;
}

function kpiCard(item) {
  return `<article class="kpi"><div class="kpi-value">${item.value}</div>` +
    `<div class="kpi-unit">${item.unit}</div><div class="kpi-label">${item.label}</div>` +
    `<p class="src">${item.year} · ${item.source}</p>` +
    (item.note ? `<p class="kpi-note">${item.note}</p>` : "") + `</article>`;
}

export function renderEducation() {
  const eys = HDI_SERIES.map((d) => ({ label: String(d.year), value: d.eys }));
  const mys = MYS_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  return `
  <section class="page-head">
    <p class="eyebrow">Education</p>
    <h1>Thirteen years of school — and still climbing</h1>
    <p class="lede">Indonesians can now expect 13.30 years of schooling, up from 12.98 in 2020. But adults over 25 average only 9.07 years — just past junior high — and the gap between provinces is wide.</p>
  </section>
  <section class="kpi-grid">
    ${kpiCard({ label: "Expected years of schooling", value: "13.30", unit: "years", year: "2025", source: SOURCES.bps_hdi })}
    ${kpiCard({ label: "Mean years of schooling (25+)", value: "9.07", unit: "years", year: "2025", source: SOURCES.bps_hdi, note: "2024: 8.85 · 2023: 8.77" })}
    ${kpiCard({ label: "Education budget", value: "Rp 665", unit: "trillion", year: "2024", source: SOURCES.budget_2024, note: "At least 20% of the state budget, by law" })}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Expected years of schooling</h2>
      ${lineChart(eys, { format: (v) => v.toFixed(2) + " yrs" })}
      ${srcLine(SOURCES.bps_hdi, "2020–2025")}
    </section>
    <section class="card">
      <h2>Mean years of schooling, age 25+</h2>
      ${barChart(mys, { format: (v) => v.toFixed(2) + " yrs" })}
      ${srcLine(SOURCES.bps_hdi, "2023–2025")}
    </section>
  </div>
  <section class="card">
    <h2>The schooling gap</h2>
    <p>Mean schooling ranges from 11.31 years in Jakarta — the highest of any province — to under 7.5 years in Papua. Nationally, the average adult still leaves school before completing senior high. Closing that gap is the core of Indonesia's human-development story: expected schooling has risen steadily, but the years already banked by adults move much more slowly.</p>
    ${srcLine(SOURCES.bps_hdi, "2024–2025")}
  </section>`;
}

export function bindEducation() {
  // No dynamic controls on this page beyond navigation.
}

export function renderHealth() {
  const life = HDI_SERIES.map((d) => ({ label: String(d.year), value: d.life }));
  const hdi = HDI_SERIES.map((d) => ({ label: String(d.year), value: d.hdi }));
  const compRows = HDI_COMPONENTS_2025.map((c) => `<tr><td>${c.indicator}</td><td>${c.value}</td></tr>`).join("");
  const provRows = HDI_PROVINCES.map((p) => `<tr><td>${p.name}</td><td>${p.value.toFixed(2)}</td><td>${p.note}</td></tr>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Health</p>
    <h1>Living longer: 74.47 years</h1>
    <p class="lede">Life expectancy has risen by 1.1 years since 2020, and Indonesia's Human Development Index reached 75.90 in 2025 — firmly in the high category, but with a 30-point gap between the best and worst provinces.</p>
  </section>
  <section class="kpi-grid">
    ${kpiCard({ label: "Life expectancy", value: "74.47", unit: "years", year: "2025", source: SOURCES.bps_hdi, note: "2020: 73.37 · 2024: 74.15" })}
    ${kpiCard({ label: "Human Development Index", value: "75.90", unit: "points", year: "2025", source: SOURCES.bps_hdi, note: "High human development category" })}
    ${kpiCard({ label: "HDI, Jakarta", value: "85.05", unit: "points", year: "2025", source: SOURCES.bps_hdi, note: "Highest province" })}
    ${kpiCard({ label: "HDI, Highland Papua", value: "54.91", unit: "points", year: "2025", source: SOURCES.bps_hdi, note: "Lowest province" })}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Life expectancy, 2020–2025</h2>
      ${lineChart(life, { format: (v) => v.toFixed(2) + " yrs" })}
      ${srcLine(SOURCES.bps_hdi, "2020–2025")}
    </section>
    <section class="card">
      <h2>Human Development Index, 2020–2025</h2>
      ${lineChart(hdi, { format: (v) => v.toFixed(2) })}
      ${srcLine(SOURCES.bps_hdi, "2020–2025")}
    </section>
  </div>
  <section class="card">
    <h2>What makes up the HDI, 2025</h2>
    <table class="data-table">
      <thead><tr><th>Component</th><th>Value</th></tr></thead>
      <tbody>${compRows}</tbody>
    </table>
    ${srcLine(SOURCES.bps_hdi, "2025")}
    <p class="note">Adjusted real per capita expenditure rose from Rp 12,341,000 in 2024 to Rp 12,802,000 in 2025.</p>
  </section>
  <section class="card">
    <h2>The HDI gap between provinces</h2>
    <table class="data-table">
      <thead><tr><th>Province</th><th>HDI</th><th>Note</th></tr></thead>
      <tbody>${provRows}</tbody>
    </table>
    ${srcLine(SOURCES.bps_hdi, "2025")}
  </section>`;
}

export function bindHealth() {
  // No dynamic controls on this page beyond navigation.
}

export function renderRegions() {
  const provBars = JAVA_PROVINCES.map((p) => ({ label: p.name, value: p.pop }));
  const options = JAVA_PROVINCES.map((p) => `<option value="${p.name}">${p.name}</option>`).join("");
  const rows = JAVA_PROVINCES.map((p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.pop.toFixed(2)}</td><td>${p.area.toLocaleString("en-US")}</td><td>${p.density.toLocaleString("en-US")}</td></tr>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Regions &amp; provinces</p>
    <h1>38 provinces, one archipelago</h1>
    <p class="lede">From Jakarta, the densest province at 16,165 people per km², to South Papua, the smallest by population at about 546 thousand — pick a province to see its numbers.</p>
  </section>
  <section class="card">
    <h2>Pick a province</h2>
    <label class="field-label" for="province-select">Province on Java</label>
    <select id="province-select" class="select">
      <option value="">All of Java</option>
      ${options}
    </select>
    <div id="province-detail" class="province-detail">
      <p class="big-stat">156.93M <span>people live on Java — 56.1% of Indonesia's population.</span></p>
      <p class="note">Java has six provinces: West Java, East Java, Central Java, Banten, Jakarta and Yogyakarta. Choose one above for its population, area and density.</p>
    </div>
    ${srcLine(SOURCES.bps_prov, "mid-2024")}
  </section>
  <section class="card">
    <h2>Population of the Java provinces</h2>
    <p class="card-sub">Millions, mid-2024</p>
    ${hbarChart(provBars, { format: (v) => v.toFixed(2) + "M" })}
    ${srcLine(SOURCES.bps_prov, "mid-2024")}
    <table class="data-table">
      <thead><tr><th>Province</th><th>Capital</th><th>Population (M)</th><th>Area (km²)</th><th>Density (/km²)</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Beyond Java</h2>
      <p><strong>North Sumatra</strong> is the largest province outside Java, with ${PROVINCE_NOTES.northSumatra.pop} million people (mid-2024).</p>
      <p><strong>South Papua</strong> is the smallest province, with about 546 thousand people.</p>
      ${srcLine(SOURCES.bps_prov, "mid-2024")}
    </section>
    <section class="card">
      <h2>${META.provinces} provinces</h2>
      <p>Indonesia is divided into ${META.provinces} provinces across more than 17,000 islands. The capital moved from Jakarta to Nusantara in East Kalimantan; Jakarta remains the country's largest city and economic centre.</p>
    </section>
  </div>`;
}

export function bindRegions() {
  const select = document.getElementById("province-select");
  const detail = document.getElementById("province-detail");
  if (!select || !detail) return;
  select.addEventListener("change", () => {
    const p = JAVA_PROVINCES.find((x) => x.name === select.value);
    if (!p) {
      detail.innerHTML = `<p class="big-stat">156.93M <span>people live on Java — 56.1% of Indonesia's population.</span></p>` +
        `<p class="note">Java has six provinces: West Java, East Java, Central Java, Banten, Jakarta and Yogyakarta. Choose one above for its population, area and density.</p>`;
      return;
    }
    detail.innerHTML = `<p class="big-stat">${p.pop.toFixed(2)}M <span>people live in ${p.name} (mid-2024).</span></p>` +
      `<table class="data-table"><tbody>` +
      `<tr><td>Capital</td><td>${p.capital}</td></tr>` +
      `<tr><td>Area</td><td>${p.area.toLocaleString("en-US")} km²</td></tr>` +
      `<tr><td>Density</td><td>${p.density.toLocaleString("en-US")} people per km²</td></tr>` +
      `<tr><td>Share of Java</td><td>${((p.pop / 156.93) * 100).toFixed(1)}% of Java's population</td></tr>` +
      `</tbody></table>`;
  });
}

export function renderTables() {
  const rows = ALL_INDICATORS.map((r) =>
    `<tr><td>${r.indicator}</td><td>${r.value}</td><td>${r.year}</td><td>${r.source}</td></tr>`).join("");
  const sourceList = Object.entries(SOURCES).map(([key, text]) => `<li>${text}</li>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Data tables &amp; sources</p>
    <h1>Every figure, in one table</h1>
    <p class="lede">All ${ALL_INDICATORS.length} headline figures used on this site. Click a column heading to sort; type in the filter box to find a figure. Each row names its source — check any number against the publication it came from.</p>
  </section>
  <section class="card">
    <div class="table-tools">
      <label class="field-label" for="table-filter">Filter figures</label>
      <input id="table-filter" class="input" type="search" placeholder="Type to filter, e.g. GDP, poverty, 2024…" autocomplete="off">
    </div>
    <table class="data-table sortable" id="all-indicators">
      <thead><tr><th data-sort="0">Indicator</th><th data-sort="1">Value</th><th data-sort="2">Year</th><th data-sort="3">Source</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="note" id="table-count">${ALL_INDICATORS.length} figures shown.</p>
  </section>
  <section class="card">
    <h2>Sources</h2>
    <ul class="source-list">${sourceList}</ul>
    <p class="note">Figures are shown exactly as published by their sources. Where a share is calculated from published numbers it is marked with an asterisk and explained on its page. NusaStats is independent and not affiliated with Statistics Indonesia (BPS) or the United Nations.</p>
  </section>`;
}

export function bindTables() {
  const input = document.getElementById("table-filter");
  const table = document.getElementById("all-indicators");
  const count = document.getElementById("table-count");
  if (!table) return;
  const body = table.querySelector("tbody");
  const total = body.querySelectorAll("tr").length;
  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      body.querySelectorAll("tr").forEach((row) => {
        const match = row.textContent.toLowerCase().includes(q);
        row.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (count) count.textContent = `${shown} of ${total} figures shown.`;
    });
  }
  table.querySelectorAll("th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const col = Number(th.dataset.sort);
      const asc = th.dataset.dir !== "asc";
      table.querySelectorAll("th").forEach((h) => delete h.dataset.dir);
      th.dataset.dir = asc ? "asc" : "desc";
      const rows = Array.from(body.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const va = a.children[col].textContent.trim();
        const vb = b.children[col].textContent.trim();
        return asc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
      rows.forEach((r) => body.appendChild(r));
    });
  });
}
