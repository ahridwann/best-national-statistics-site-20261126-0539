// NusaStats views: Overview and Population.
// Each view returns an HTML string; bind() wires its controls after render.
import { HEADLINES, GLANCE, GDP_SERIES, AGE_GROUPS, JAVA_PROVINCES, META, SOURCES, POP_SERIES } from "./data.js";
import { barChart, hbarChart, lineChart, donutChart } from "./charts.js";

function srcLine(source, year) {
  return `<p class="src">Source: ${source} · ${year}</p>`;
}

function kpiCard(item) {
  return `<article class="kpi"><div class="kpi-value">${item.value}</div>` +
    `<div class="kpi-unit">${item.unit}</div><div class="kpi-label">${item.label}</div>` +
    `<p class="src">${item.year} · ${item.source}</p>` +
    (item.note ? `<p class="kpi-note">${item.note}</p>` : "") + `</article>`;
}

export function renderOverview() {
  const gdpGrowth = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.growth }));
  const gdpNominal = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.nominal }));
  const age = AGE_GROUPS.map((d) => ({ name: d.name, share: d.share, derived: d.derived }));
  const topProv = JAVA_PROVINCES.slice(0, 5).map((p) => ({ label: p.name, value: p.pop }));
  const glance = GLANCE.map((g) =>
    `<li><span class="glance-value">${g.value}</span><span class="glance-label">${g.label}</span><span class="glance-year">${g.year} · ${g.source}</span></li>`).join("");
  const cards = [
    { href: "#/population", title: "Population", text: "284 million people across 38 provinces — who they are, where they live, and how the country is ageing." },
    { href: "#/economy", title: "Economy", text: "GDP, growth, prices and trade — the size of the economy and what Indonesia buys and sells." },
    { href: "#/employment", title: "Employment", text: "Jobs, unemployment and wages — who works, in which sectors, and what they earn." },
    { href: "#/education", title: "Education", text: "Years of schooling and the education budget — how long Indonesians stay in school." },
    { href: "#/health", title: "Health", text: "Life expectancy and human development — how long people live, and how well." },
    { href: "#/regions", title: "Regions", text: "The provinces, from West Java's 50 million people to South Papua's 546 thousand." },
  ].map((c) => `<a class="explore-card" href="${c.href}"><h3>${c.title}</h3><p>${c.text}</p><span class="explore-link">Open section →</span></a>`).join("");

  return `
  <section class="hero">
    <p class="eyebrow">National statistics · ${META.country}</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The figures of a nation of 284 million people — population, economy, jobs, schools and health — gathered in one place, each with its source and year.</p>
    <p class="hero-meta">Updated ${META.updated} · Figures from Statistics Indonesia (BPS) and the United Nations · All figures in English, values as published</p>
  </section>
  <section class="kpi-grid">${HEADLINES.map(kpiCard).join("")}</section>
  <section class="card">
    <h2>At a glance</h2>
    <ul class="glance">${glance}</ul>
  </section>
  <section class="card">
    <div class="card-head"><h2>Gross domestic product</h2>
      <div class="toggle" data-toggle="gdp-chart">
        <button type="button" data-mode="growth" class="active">Growth %</button>
        <button type="button" data-mode="nominal">Nominal Rp trillion</button>
      </div>
    </div>
    <div id="gdp-chart">${lineChart(gdpGrowth, { format: (v) => v.toFixed(2) + "%" })}</div>
    ${srcLine(SOURCES.bps_gdp, "2020–2025")}
    <p class="note">GDP per capita rose from Rp 78.62 million (US$ 4,960) in 2024 to Rp 83.7 million (US$ 5,083) in 2025. The economy has grown about 5% a year since the 2020 contraction of 2.07%.</p>
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Who Indonesians are</h2>
      <p class="card-sub">Age structure, 2024</p>
      ${donutChart(age, { centre: "30.1", centreSub: "median age, yrs" })}
      ${srcLine(SOURCES.un_wpp, "2024")}
      <p class="note">* The 15–64 share (68.1%) is arithmetic: 100 − 24.6 − 7.3. Indonesia's median age was 30.1 years in 2024.</p>
    </section>
    <section class="card">
      <h2>Largest provinces</h2>
      <p class="card-sub">Population, millions, mid-2024</p>
      ${hbarChart(topProv, { format: (v) => v.toFixed(2) })}
      ${srcLine(SOURCES.bps_prov, "mid-2024")}
      <p class="note">Five of the six largest provinces are on Java. West Java alone has more people than Spain.</p>
    </section>
  </div>
  <section>
    <h2>Explore the data</h2>
    <div class="explore-grid">${cards}</div>
  </section>
  <section class="card about">
    <h2>About this site</h2>
    <p>NusaStats is an independent guide to Indonesia's official statistics. It is not affiliated with Statistics Indonesia (BPS): every figure is credited to the publication that released it, with its year, so you can check it yourself. Figures are shown exactly as published; where a share is calculated from published numbers it is marked with an asterisk.</p>
  </section>`;
}

export function bindOverview() {
  const toggle = document.querySelector('[data-toggle="gdp-chart"]');
  if (!toggle) return;
  const target = document.getElementById("gdp-chart");
  const gdpGrowth = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.growth }));
  const gdpNominal = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.nominal }));
  toggle.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    toggle.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    target.innerHTML = btn.dataset.mode === "nominal"
      ? lineChart(gdpNominal, { format: (v) => "Rp " + v.toLocaleString("en-US") + "T" })
      : lineChart(gdpGrowth, { format: (v) => v.toFixed(2) + "%" });
  });
}

export function renderPopulation() {
  const popLine = POP_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  const age = AGE_GROUPS.map((d) => ({ name: d.name, share: d.share, derived: d.derived }));
  const provBars = JAVA_PROVINCES.map((p) => ({ label: p.name, value: p.pop }));
  const provRows = JAVA_PROVINCES.map((p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.pop.toFixed(2)}</td><td>${p.area.toLocaleString("en-US")}</td><td>${p.density.toLocaleString("en-US")}</td></tr>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Population &amp; demographics</p>
    <h1>284 million people, 38 provinces</h1>
    <p class="lede">Indonesia is the world's fourth most populous country. Its population grew from 270.20 million at the 2020 census to 284.44 million by mid-2025.</p>
  </section>
  <section class="kpi-grid">
    ${kpiCard({ label: "Population", value: "284.44", unit: "million", year: "mid-2025", source: SOURCES.bps_pop, note: "BPS projection 2020–2050" })}
    ${kpiCard({ label: "2020 census", value: "270.20", unit: "million", year: "2020", source: SOURCES.bps_census })}
    ${kpiCard({ label: "Median age", value: "30.1", unit: "years", year: "2024", source: SOURCES.un_wpp })}
    ${kpiCard({ label: "Urban share", value: "59.0", unit: "%", year: "2024", source: SOURCES.un_wpp, note: "Density: 156 people per km²" })}
  </section>
  <section class="card">
    <div class="tabs" data-tabs="pop">
      <button type="button" data-tab="growth" class="active">Growth over time</button>
      <button type="button" data-tab="age">Age structure</button>
      <button type="button" data-tab="islands">Where people live</button>
    </div>
    <div data-panel="growth">
      <h2>Population growth, 2020–2025</h2>
      ${lineChart(popLine, { format: (v) => v.toFixed(1) + "M" })}
      ${srcLine(SOURCES.bps_pop, "2020–2025")}
    </div>
    <div data-panel="age" hidden>
      <h2>Age structure, 2024</h2>
      ${donutChart(age, { centre: "24.6%", centreSub: "aged 0–14" })}
      ${srcLine(SOURCES.un_wpp, "2024")}
      <p class="note">* The 15–64 share (68.1%) is arithmetic: 100 − 24.6 − 7.3. About 7.3% of Indonesians are 65 or older.</p>
    </div>
    <div data-panel="islands" hidden>
      <h2>Java holds most of the country</h2>
      <p class="big-stat">56.1% <span>of Indonesians live on Java — about 7% of the land area.</span></p>
      ${srcLine(SOURCES.bps_pop, "2023")}
      <p class="note">Java's mid-2024 population was 156.93 million, making it the world's most populous island. The other large islands — Sumatra, Kalimantan, Sulawesi and Papua — share the remaining 43.9%.</p>
    </div>
  </section>
  <section class="card">
    <h2>Provinces of Java</h2>
    <p class="card-sub">Population in millions, mid-2024</p>
    ${hbarChart(provBars, { format: (v) => v.toFixed(2) + "M" })}
    ${srcLine(SOURCES.bps_prov, "mid-2024")}
    <table class="data-table">
      <thead><tr><th>Province</th><th>Capital</th><th>Population (M)</th><th>Area (km²)</th><th>Density (/km²)</th></tr></thead>
      <tbody>${provRows}</tbody>
    </table>
    <p class="note">Jakarta, at 16,165 people per km², is the densest province; East Java, at 870, the least dense on the island.</p>
  </section>`;
}

export function bindPopulation() {
  document.querySelectorAll('[data-tabs="pop"]').forEach((tabs) => {
    tabs.addEventListener("click", (event) => {
      const btn = event.target.closest("button");
      if (!btn) return;
      const card = tabs.closest(".card");
      tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      card.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== btn.dataset.tab; });
    });
  });
}
