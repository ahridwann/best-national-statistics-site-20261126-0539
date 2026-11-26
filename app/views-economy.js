// NusaStats views: Economy and Employment.
import { SOURCES, GDP_SERIES, GDP_PER_CAPITA, INFLATION_SERIES, TRADE_2024, GDP_SECTORS, UNEMPLOYMENT_SERIES, LABOUR } from "./data.js";
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

function bindTabs(group) {
  document.querySelectorAll(`[data-tabs="${group}"]`).forEach((tabs) => {
    tabs.addEventListener("click", (event) => {
      const btn = event.target.closest("button");
      if (!btn) return;
      const card = tabs.closest(".card");
      tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      card.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== btn.dataset.tab; });
    });
  });
}

export function renderEconomy() {
  const gdpGrowth = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.growth }));
  const gdpNominal = GDP_SERIES.map((d) => ({ label: String(d.year), value: d.nominal }));
  const infl = INFLATION_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  const tradeBars = [
    { label: "Exports", value: TRADE_2024.exports },
    { label: "Imports", value: TRADE_2024.imports },
  ];
  const products = TRADE_2024.products.map((p) => ({ label: p.name, value: p.share }));
  const sectors = GDP_SECTORS.map((s) => ({ name: s.name, share: s.share }));
  const partnerRows = TRADE_2024.partners.map((p) =>
    `<tr><td>${p.name}</td><td>US$ ${p.value.toFixed(1)}B</td><td>${p.share}%</td></tr>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Economy</p>
    <h1>A US$ 1.4 trillion economy, growing about 5% a year</h1>
    <p class="lede">Indonesia is Southeast Asia's largest economy. GDP reached Rp 23,821 trillion in 2025, growing 5.11% — the sixth straight year of growth near or above 5% outside the pandemic contraction.</p>
  </section>
  <section class="kpi-grid">
    ${kpiCard({ label: "GDP (nominal)", value: "Rp 23,821", unit: "trillion", year: "2025", source: SOURCES.bps_gdp })}
    ${kpiCard({ label: "GDP growth", value: "5.11", unit: "%", year: "2025", source: SOURCES.bps_gdp, note: "2024: 5.03% · 2023: 5.05%" })}
    ${kpiCard({ label: "GDP per capita", value: "US$ 5,083", unit: "", year: "2025", source: SOURCES.bps_gdp, note: "Rp 83.7 million per person" })}
    ${kpiCard({ label: "Trade surplus", value: "US$ 31.0", unit: "billion", year: "2024", source: SOURCES.bps_trade, note: "Exports US$ 264.7B, imports US$ 233.7B" })}
  </section>
  <section class="card">
    <div class="tabs" data-tabs="econ">
      <button type="button" data-tab="growth" class="active">Growth</button>
      <button type="button" data-tab="prices">Prices</button>
      <button type="button" data-tab="trade">Trade</button>
    </div>
    <div data-panel="growth">
      <div class="card-head"><h2>GDP growth, 2020–2025</h2>
        <div class="toggle" data-toggle="gdp-chart-2">
          <button type="button" data-mode="growth" class="active">Growth %</button>
          <button type="button" data-mode="nominal">Nominal Rp trillion</button>
        </div>
      </div>
      <div id="gdp-chart-2">${lineChart(gdpGrowth, { format: (v) => v.toFixed(2) + "%" })}</div>
      ${srcLine(SOURCES.bps_gdp, "2020–2025")}
      <p class="note">Nominal GDP: Rp 15,438T (2020) · Rp 16,971T (2021) · Rp 19,589T (2022) · Rp 20,892T (2023) · Rp 22,139T (2024) · Rp 23,821T (2025).</p>
      <h3>What the economy makes</h3>
      ${donutChart(sectors, { centre: "43.8%", centreSub: "services" })}
      ${srcLine(SOURCES.cia_factbook, "2024 estimates")}
      <p class="note">Shares are estimates and do not sum to 100% because of non-allocated consumption, per the source's own note.</p>
    </div>
    <div data-panel="prices" hidden>
      <h2>Inflation is back near 2%</h2>
      ${barChart(infl, { format: (v) => v.toFixed(2) + "%" })}
      ${srcLine(SOURCES.bps_cpi, "December, year-on-year")}
      <p class="note">December 2024 inflation was 1.57% year-on-year, with the consumer price index at 106.80 — the lowest December reading since 2021. Core inflation was 2.26%; food, beverages and tobacco rose 1.90%. Bank Indonesia's target range is 1.5–3.5%.</p>
    </div>
    <div data-panel="trade" hidden>
      <h2>Trade in goods, 2024</h2>
      ${barChart(tradeBars, { format: (v) => "US$ " + v.toFixed(1) + "B" })}
      ${srcLine(SOURCES.bps_trade, "2024")}
      <h3>What Indonesia sells</h3>
      ${hbarChart(products, { format: (v) => v.toFixed(1) + "%" })}
      <p class="note">Shares of total goods exports. * "All other products" (58.9%) is arithmetic: 100 − 20.8 − 11.7 − 8.6.</p>
      <h3>Biggest buyers</h3>
      <table class="data-table">
        <thead><tr><th>Partner</th><th>Exports to</th><th>Share of exports</th></tr></thead>
        <tbody>${partnerRows}</tbody>
      </table>
      ${srcLine(SOURCES.cepii_baci, "2024")}
    </div>
  </section>
  <section class="card">
    <h2>GDP per capita</h2>
    <table class="data-table">
      <thead><tr><th>Year</th><th>Rupiah</th><th>US dollars</th></tr></thead>
      <tbody>${GDP_PER_CAPITA.map((r) => `<tr><td>${r.year}</td><td>${r.idr}</td><td>${r.usd}</td></tr>`).join("")}</tbody>
    </table>
    ${srcLine(SOURCES.bps_gdp, "2024–2025")}
  </section>`;
}

export function bindEconomy() {
  bindTabs("econ");
  const toggle = document.querySelector('[data-toggle="gdp-chart-2"]');
  if (toggle) {
    const target = document.getElementById("gdp-chart-2");
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
}

export function renderEmployment() {
  const unemp = UNEMPLOYMENT_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  const sectors = LABOUR.sectors.map((s) => ({ label: s.name, value: s.share }));
  const wages = LABOUR.wages.map((w) => ({ label: w.group, value: w.value }));
  const extremeRows = LABOUR.extremes.map((e) =>
    `<tr><td>${e.name}</td><td>${e.value.toFixed(2)}%</td><td>${e.note}</td></tr>`).join("");
  return `
  <section class="page-head">
    <p class="eyebrow">Employment</p>
    <h1>145 million people at work</h1>
    <p class="lede">Unemployment has fallen every year since the pandemic peak — from 6.49% in August 2021 to 4.85% in August 2025. But most jobs are informal, and agriculture still employs more people than any other sector.</p>
  </section>
  <section class="kpi-grid">
    ${kpiCard({ label: "Unemployment rate", value: "4.85", unit: "%", year: "Aug 2025", source: SOURCES.bps_sakernas, note: "7.47 million unemployed in Aug 2024" })}
    ${kpiCard({ label: "Labour force", value: "152.11", unit: "million", year: "Aug 2024", source: SOURCES.bps_sakernas })}
    ${kpiCard({ label: "Employed", value: "145", unit: "million", year: "2024", source: SOURCES.iza_labour })}
    ${kpiCard({ label: "Informal workers", value: "58", unit: "% of workers", year: "2024", source: SOURCES.iza_labour, note: "76% under the ICLS-17 standard" })}
  </section>
  <section class="card">
    <h2>Unemployment, August each year</h2>
    ${lineChart(unemp, { format: (v) => v.toFixed(2) + "%" })}
    ${srcLine(SOURCES.bps_sakernas, "Aug 2021 – Aug 2025")}
    <p class="note">The open unemployment rate (TPT) was 4.91% in August 2024 — 7.47 million people out of a labour force of 152.11 million — and 4.85% in August 2025.</p>
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Where people work</h2>
      <p class="card-sub">Share of employment, 2024</p>
      ${hbarChart(sectors, { format: (v) => v.toFixed(1) + "%" })}
      ${srcLine(SOURCES.iza_labour, "2024, Sakernas data")}
      <p class="note">Agriculture's share fell from 44% in 2001 to 28% in 2024; manufacturing barely moved, from 13.3% to 13.8%.</p>
    </section>
    <section class="card">
      <h2>The pay gap</h2>
      <p class="card-sub">Average monthly wage, Rp million, 2024</p>
      ${hbarChart(wages, { format: (v) => "Rp " + v.toFixed(2) + "M" })}
      ${srcLine(SOURCES.bps_sakernas, "2024")}
      <p class="note">Women earn on average Rp 2.57 million a month against Rp 3.30 million for men. 39.70% of male workers are wage employees, against 33.66% of women.</p>
    </section>
  </div>
  <section class="card">
    <h2>Unemployment is not even across the country</h2>
    <table class="data-table">
      <thead><tr><th>Province</th><th>Rate</th><th>Note</th></tr></thead>
      <tbody>${extremeRows}</tbody>
    </table>
    ${srcLine(SOURCES.bps_sakernas, "Aug 2024")}
  </section>`;
}

export function bindEmployment() {
  // No dynamic controls on this page beyond navigation.
}
