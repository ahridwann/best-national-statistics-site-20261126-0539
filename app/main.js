// NusaStats router: hash routes, one page per section, nav highlighting.
// No framework, no network — plain modules imported by index.html.
import { renderOverview, bindOverview, renderPopulation, bindPopulation } from "./views-overview.js";
import { renderEconomy, bindEconomy, renderEmployment, bindEmployment } from "./views-economy.js";
import { renderEducation, bindEducation, renderHealth, bindHealth, renderRegions, bindRegions, renderTables, bindTables } from "./views-people.js";

const ROUTES = {
  "/": { title: "Indonesia in Numbers", render: renderOverview, bind: bindOverview },
  "/population": { title: "Population & demographics", render: renderPopulation, bind: bindPopulation },
  "/economy": { title: "Economy", render: renderEconomy, bind: bindEconomy },
  "/employment": { title: "Employment", render: renderEmployment, bind: bindEmployment },
  "/education": { title: "Education", render: renderEducation, bind: bindEducation },
  "/health": { title: "Health", render: renderHealth, bind: bindHealth },
  "/regions": { title: "Regions & provinces", render: renderRegions, bind: bindRegions },
  "/tables": { title: "Data tables & sources", render: renderTables, bind: bindTables },
};

function currentRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1) || "/";
  return ROUTES[path] ? path : "/";
}

function render() {
  const path = currentRoute();
  const route = ROUTES[path];
  const app = document.getElementById("app");
  app.innerHTML = route.render();
  document.title = `${route.title} — NusaStats · Indonesia in Numbers`;
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const target = href.slice(1) || "/";
    a.classList.toggle("active", target === path);
    if (target === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  route.bind();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
