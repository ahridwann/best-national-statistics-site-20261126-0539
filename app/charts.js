// NusaStats charts: hand-built inline SVG, no libraries, no network.
// Every builder takes plain data and returns an SVG string. Colours come
// from the site palette so charts and layout stay one design.

export const PALETTE = ["#0E7C7B", "#E9A23B", "#C4502B", "#4A6FA5", "#7A4E6E", "#4E7A3A"];

function esc(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Vertical bar chart. data: [{label, value}]. valueLabel formats a value.
export function barChart(data, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 44, padR = 12, padT = 14, padB = 30;
  const max = Math.max(...data.map((d) => d.value), 1);
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const bw = Math.min(46, (iw / data.length) * 0.62);
  const step = iw / data.length;
  const fmt = opts.format || ((v) => String(v));
  let bars = "";
  let labels = "";
  data.forEach((d, i) => {
    const bh = Math.max(2, (d.value / max) * ih);
    const x = padL + i * step + (step - bw) / 2;
    const y = padT + ih - bh;
    const color = PALETTE[i % PALETTE.length];
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${color}"><title>${esc(d.label)}: ${esc(fmt(d.value))}</title></rect>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#1C2420">${esc(fmt(d.value))}</text>`;
    labels += `<text x="${(padL + i * step + step / 2).toFixed(1)}" y="${(padT + ih + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="#4A5560">${esc(d.label)}</text>`;
  });
  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const y = padT + ih - f * ih;
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#E3DED2" stroke-width="1"/><text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#8A938E">${esc(fmt(max * f))}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart">${grid}${bars}${labels}<line x1="${padL}" y1="${padT + ih}" x2="${w - padR}" y2="${padT + ih}" stroke="#C9C2B2" stroke-width="1"/></svg>`;
}

// Horizontal bar chart, best for ranked lists. data: [{label, value}].
export function hbarChart(data, opts = {}) {
  const w = opts.width || 560;
  const rowH = opts.rowHeight || 34;
  const padL = opts.labelWidth || 150;
  const padR = 56;
  const h = rowH * data.length + 10;
  const max = Math.max(...data.map((d) => d.value), 1);
  const fmt = opts.format || ((v) => String(v));
  const rows = data.map((d, i) => {
    const y = 5 + i * rowH;
    const bw = ((d.value / max) * (w - padL - padR)).toFixed(1);
    const color = PALETTE[i % PALETTE.length];
    return `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="12" fill="#1C2420">${esc(d.label)}</text>` +
      `<rect x="${padL}" y="${y}" width="${bw}" height="20" rx="3" fill="${color}"><title>${esc(d.label)}: ${esc(fmt(d.value))}</title></rect>` +
      `<text x="${padL + Number(bw) + 8}" y="${y + 15}" font-size="12" font-weight="700" fill="#1C2420">${esc(fmt(d.value))}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Horizontal bar chart">${rows}</svg>`;
}

// Line chart. data: [{label, value}]. Handles negative values.
export function lineChart(data, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 260;
  const padL = 44, padR = 16, padT = 16, padB = 30;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const vals = data.map((d) => d.value);
  let min = Math.min(...vals, 0);
  let max = Math.max(...vals);
  if (min > 0) min = 0;
  const span = max - min || 1;
  const x = (i) => padL + (i / (data.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / span) * ih;
  const fmt = opts.format || ((v) => String(v));
  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const dots = data.map((d, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" fill="#0B3D3A" stroke="#F7F3EA" stroke-width="2"><title>${esc(d.label)}: ${esc(fmt(d.value))}</title></circle>` +
    `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#1C2420">${esc(fmt(d.value))}</text>`
  ).join("");
  const xlabels = data.map((d, i) =>
    `<text x="${x(i).toFixed(1)}" y="${(padT + ih + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="#4A5560">${esc(d.label)}</text>`
  ).join("");
  const zeroY = y(0);
  const zeroLine = min < 0 ? `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${w - padR}" y2="${zeroY.toFixed(1)}" stroke="#C9C2B2" stroke-width="1"/>` : "";
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Line chart"><polyline points="${points}" fill="none" stroke="#0E7C7B" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${zeroLine}${dots}${xlabels}</svg>`;
}

// Donut chart with a centre label. data: [{name, share}].
export function donutChart(data, opts = {}) {
  const size = opts.size || 220;
  const r = 82;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((s, d) => s + d.share, 0) || 1;
  let acc = 0;
  const slices = data.map((d, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.share;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const color = PALETTE[i % PALETTE.length];
    return `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${color}"><title>${esc(d.name)}: ${esc(d.share)}%</title></path>`;
  }).join("");
  const hole = `<circle cx="${cx}" cy="${cy}" r="52" fill="#F7F3EA"/>`;
  const centre = `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="800" fill="#0B3D3A">${esc(opts.centre || "")}</text>` +
    `<text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="10" fill="#4A5560">${esc(opts.centreSub || "")}</text>`;
  const legend = data.map((d, i) =>
    `<span class="legend-item"><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(d.name)} — <strong>${esc(d.share)}%</strong>${d.derived ? " *" : ""}</span>`
  ).join("");
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart">${slices}${hole}${centre}</svg><div class="legend">${legend}</div></div>`;
}
